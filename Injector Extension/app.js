// Get The URL
const site = window.location.hostname

// alert("Injector - The JavaScript has been injected to: " + site + " 🤖")

// Add Custom CSS - Function
const Add_Custom_Style = css => document.head.appendChild(document.createElement("style")).innerHTML = css

// Create Custom Element - Function
function Create_Custom_Element(tag, attr_tag, attr_name, value) {
    const custom_element = document.createElement(tag)
    custom_element.setAttribute(attr_tag, attr_name)
    custom_element.innerHTML = value
    document.body.append(custom_element)
}

if (site.includes("youtube.com")) {
    //alert(window.location.href)
    window.onload = init;

    var element;

    function init() {
        element = document.querySelector('[aria-label="Next video"]');
        //element.click();

    }

    let prevUrl = undefined;
    let tryCount = 0;
    setInterval(() => {
        const currUrl = window.location.href;
        if (currUrl != prevUrl) {
            // URL changed
            prevUrl = currUrl;
            let data = {videoId: currUrl.replaceAll("https://www.youtube.com/shorts/", "")};
            console.log(JSON.stringify(data));
            var xmlhttp = new XMLHttpRequest();
            //xmlhttp.open("POST", "http://localhost:8081/api/v1/shorts/insertShorts", false);
            xmlhttp.open("POST", "https://foxytool.com/api/v1/shorts/insertShorts", false);
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
            xmlhttp.send(JSON.stringify(data));
            console.log("new page " + currUrl);
            tryCount = 0;
        }else {
            console.log("same page " + currUrl);
            element = document.querySelector('[aria-label="Next video"]');
            tryCount++;
            if(!element){
                element = document.querySelector('[aria-label="Next video"]');
                console.log("click null " + tryCount);
                //window.location = 'https://youtube.com/shorts';
            }
            if (tryCount > 3){
                window.location = 'https://youtube.com/shorts';
            }
        }
    }, 3000);

    function callbackFunction(xmlhttp) {
        if(!element){
            console.log("click null");
            //window.location = 'https://youtube.com/shorts';
        }else {
            console.log("click work");
            element = document.querySelector('[aria-label="Next video"]');
            element.click();
        }

    }
}