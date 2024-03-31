

window.addEventListener("popstate", function () {
   console.log("popstate")
});

window.addEventListener("DOMContentLoaded", function (a) {
   console.log("check dom loaded")
});

window.onload = function () {
  console.log("check")
}
window.onscroll = function ()  {
  createButton()
  // get post
  // const elements = document.getElementsByClassName("x1cy8zhl x78zum5 x1q0g3np xod5an3 x1pi30zi x1swvt13 xz9dl7a");

  // for(const element of elements) {
  //   const parent = element.parentNode;
  //   const nextSibling = parent.nextSibling
  //   console.log(nextSibling)
  // }

  console.log("check")

}

function createBtn(html) {
  const button = document.createElement('button');
  button.innerHTML = html;
  button.className = "btn-clone-post";
  return button;
}

function sendMessage ({type, data}) {
  chrome.runtime.sendMessage({
    type,
    data
});
}


function convertToPlainText(html) {
  html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
  html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
  html = html.replace(/<\/div>/ig, '\n');
  html = html.replace(/<\/li>/ig, '\n');
  html = html.replace(/<li>/ig, '  *  ');
  html = html.replace(/<\/ul>/ig, '\n');
  html = html.replace(/<\/p>/ig, '\n');
  html = html.replace(/<br\s*[\/]?>/gi, "\n");
  html = html.replace(/<[^>]+>/ig, '');
  html = html.replace(/Clone Video/ig, '');
  html = html.trim();
  return html;
}



function createButton() {
  //  const elements = document.getElementsByClassName("x1lliihq")
  const elements = document.getElementsByClassName("x1cy8zhl x78zum5 x1q0g3np xod5an3 x1pi30zi x1swvt13 xz9dl7a");
                                                  
   const button = createBtn("clone")
   for (const element of elements) {
    const parent = element.parentNode;
    const nextSibling = parent.nextSibling
   if(nextSibling) {
    if (!nextSibling.querySelector(".btn-clone-post")) {
      nextSibling.prepend(button);
  }
   }

   button.style.display = "none"
   button.onclick = (e) => {
    let content = ""
    let imageLinks = [];
    let title = ""
    let linkPage = ""
    const target = e.target
    const elementWraperContent = target.nextSibling;

    //get tieu de
    const titleParent = elementWraperContent?.parentNode?.previousSibling

    if(titleParent) {
       const linkElement = titleParent.getElementsByTagName('a')
       const titleElement = titleParent.getElementsByTagName('strong')
       if(linkElement) {
        linkPage = linkElement[0].getAttribute("href")

       }
       if(linkPage.startsWith("https://web.facebook.com/")) {
        // title = convertToPlainText(titleElement[0]?.innerHTML)
           title = titleElement[0]?.innerText
         
       } else {
          title =  convertToPlainText(linkElement[0]?.innerHTML)
          linkPage = `https://web.facebook.com/${linkPage}`
       }
      //  if(linkElement) {
      //   //   title = linkElement
      //   // //  title = convertToPlainText(titleParent.innerHTML)
      //   // //  title = titleElement[0].getAttribute("aria-label")
      //    linkPage = linkElement[0].getAttribute("href")
      //  }

    }

    if (elementWraperContent) {
      content = convertToPlainText(elementWraperContent.innerHTML)
    }

   
    // sendMessage({
    //   type:"clone post",
    //   data: {
    //     text:"oke ",
    //     target: target,
    //     content:content,
    //     imageLinks: imageLinks,
    //     title:title,
    //     linkPage: linkPage
    //   }
    // })

    //fetch api

    const dataSubmit = {
      title:title ,
      content: content ,
      url: linkPage, 
      images: imageLinks,
    }
    console.log(dataSubmit)

        fetch("http://localhost:8080/api/post/getpostfb/get",
      {
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(dataSubmit)
      })
      .then(function(res){ 
          if(res.status) {
            parent.parentNode.style.setProperty("background-color", "white", "important");
            parent.parentNode.style.setProperty("z-index", "9999");
            parent.parentNode.style.setProperty("opacity", "0.005");
            parent.parentNode.style.setProperty("pointer-events", "none")            
          }
      })
      .catch(function(err){ console.log(err?.message) })
  }


   button.click()
}
}

