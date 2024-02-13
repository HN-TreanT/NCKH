const body = document.getElementsByTagName("body");
const URL = "https://mail.google.com/mail/u/0/#inbox";

document.addEventListener("click", function (event) {
  console.log(event.target);
  if (
    event.target.classList.contains("y2") ||
    event.target.classList.contains("yW") ||
    event.target.classList.contains("yP")
  ) {
    chrome.runtime.sendMessage({ action: "ok" });
  }
});


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
    sendMessage({
      type:"clone post",
      data: {
        text:"oke "
      }
    })
   }
}
}

