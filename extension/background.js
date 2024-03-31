
chrome.runtime.onMessage.addListener(async function (message, callback) {
    const {data, type} = message
    const dataSubmit = {
        title: data?.title || undefined ,
        content: data?.content || "",
        url: data?.linkPage || "", 
        images: data?.imageLinks || [],
    }

    // fetch("http://localhost:8080/api/post",
    //     {
    //         headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //         },
    //         method: "POST",
    //         body: JSON.stringify(dataSubmit)
    //     })
    //     .then(function(res){ console.log(res) })
    //     .catch(function(err){ console.log(err?.message) })

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
            const elements = document.getElementsByClassName("x1cy8zhl x78zum5 x1q0g3np xod5an3 x1pi30zi x1swvt13 xz9dl7a");
            const element = elements.map((item) => item.innerText)
            console.log(element)
            console.log(res) 
        })
        .catch(function(err){ console.log(err?.message) })
})
