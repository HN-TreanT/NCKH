

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

   button.onclick = (e) => {
    let content = ""
    let imageLinks = [];
    const target = e.target
    const elementWraperContent = target.nextSibling;

    if (elementWraperContent) {
      content = convertToPlainText(elementWraperContent.innerHTML)
    }

    const elementWrapperImage = elementWraperContent.nextSibling
    if(elementWrapperImage) {
      const images = elementWrapperImage.querySelectorAll("img")
      images.forEach(image => {
        if(image.classList.length) imageLinks.push(image.getAttribute("src")) 
        
      });
    }
    sendMessage({
      type:"clone post",
      data: {
        text:"oke ",
        target: target,
        content:content,
        imageLinks: imageLinks
      }
    })
   }
}
}

