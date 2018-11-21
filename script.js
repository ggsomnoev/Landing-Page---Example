// Slow transition to section location
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: "smooth" });
    });
});

/* Toggle class in the main menu */
// $('.nav-menu > li').click(function(){
//     $(this).children('a').toggleClass('active');
//     $(this).siblings('li').children('a').removeClass('active');
// });
function prevSiblings(target) {
    var siblings = [], n = target;
    while (n = n.previousElementSibling) siblings.push(n);
    return siblings;
}

function nextSiblings(target) {
    var siblings = [], n = target;
    while (n = n.nextElementSibling) siblings.push(n);
    return siblings;
}

function siblings(target) {
    var prev = prevSiblings(target) || [],
        next = nextSiblings(target) || [];
    return prev.concat(next);
}

document.querySelectorAll('.nav-menu > li').forEach(link => {

    let sibs = siblings(link);
    sibs.forEach(x => {
        x.childNodes[0].classList.remove('active');
    });

    link.addEventListener('click', function (e) {
        e.preventDefault();
        let linkChild = link.childNodes[0];
        linkChild.classList.add('active');
    });
});

//Layout change CID forstart on ascii layout China
let surveyId = "20158";
let authToken = document.cookie.split(';').filter((item) => item.includes('APIToken='))[0].replace(" APIToken=", "");
let newData = {
    "surveyId": surveyId,
    "method": "dataexport-layoutitem-update",
    "request": [{
        "id": "68395614",
        "forceStart": ""
    }]
}

fetch("https://api.cmix.com/", {
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken
    },
    "credentials": "include",
    "referrer": "https://www.cmix.com/survey/datadownload?svy=" + surveyId,
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": JSON.stringify(newData),
    "method": "POST",
    "mode": "cors"
}).then(function (resp) {
    return resp.json();
}).then(function (json) {
    console.log(JSON.stringify(json));
});

surveyId = "20158"
authToken = document.cookie.split(';').filter((item) => item.includes('APIToken='))[0].replace(" APIToken=", "");

fetch("https://api.cmix.com/",
    {
        "credentials": "include",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken
        }, 
        "referrer": "https://www.cmix.com/survey/datadownload?svy=20286",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": "{\"surveyId\":\"20286\",\"method\":\"dataexport-layout-get\",\"request\":null}",
        "method": "POST",
        "mode": "cors"
    }).then(function (resp) {
        return resp.json();
    }).then(function (json) {
        console.log(JSON.stringify(json));
    });


let resp = {
    "outcome": "SUCCESS",
    "response": [
        { "id": "75416", "name": "Tack-ons" },
        { "id": "75414", "name": "1000 | CE" },
        { "id": "75418", "name": "All_Vars" },
        { "id": "75410", "name": "1001 | OE" },
        { "id": "75412", "name": "Default" },
        { "id": "75406", "name": "OEs with Tackons" },
        { "id": "75404", "name": "ASCII Layout v2" },
        { "id": "75408", "name": "CH Active Data" }
    ]
}