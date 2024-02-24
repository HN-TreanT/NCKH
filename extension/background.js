// chrome.runtime.onConnect.addListener(function (port) {
//   console.assert(port.name == "popup");
//   port.onMessage.addListener(function (msg) {
//     console.log(msg.type);
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, {
//         type: msg.type,
//       });
//     });
//   });
// });

chrome.runtime.onMessage.addListener(async function (message, callback) {
    const {data, type} = message
    console.log(data)
    const dataSubmit = {
        title: data?.title || undefined ,
        content: data?.content || "",
        url: data?.linkPage || "", 
        images: data?.imageLinks || [],
    }
    fetch("http://localhost:8080/api/post",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(dataSubmit)
        })
        .then(function(res){ console.log(res) })
        .catch(function(err){ console.log(err?.message) })
})
