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
})
