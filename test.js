let surveyId = "20286";
let authToken = document.cookie.split(';').filter((item) => item.includes('APIToken='))[0].replace("APIToken=", "");
let url = "https://api.cmix.com/";

let data = {
    "surveyId": surveyId
};

let header = {
    method: "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken
    },
    "credentials": "include",
    "referrer": "https://www.cmix.com/survey/datadownload?svy=" + surveyId,
    "referrerPolicy": "no-referrer-when-downgrade",
    "mode": "cors"
}

//Get Layout IDs
data.request = null;
data.method = "dataexport-layout-get";

header.body = JSON.stringify(data);

fetch(url, header).then((r) => { return r.json() }).then((j) => { console.log(j.response) });

// Example response output
// [
//     { "id": "75416", "name": "Tack-ons" },
//     { "id": "75414", "name": "1000 | CE" },
//     { "id": "75418", "name": "All_Vars" },
//     { "id": "75410", "name": "1001 | OE" },
//     { "id": "75412", "name": "Default" },
//     { "id": "75406", "name": "OEs with Tackons" },
//     { "id": "75404", "name": "ASCII Layout v2" },
//     { "id": "75408", "name": "CH Active Data" }
// ]

//Get ASCII Layout variable IDs(the active ones)
data.request = {
    "layoutId": "75404",
    "unused": false
};
data.method = "dataexport-layoutitem-get";

header.body = JSON.stringify(data);

fetch(url, header).then((r) => { return r.json() }).then((j) => { console.log(j.response) });

// Example response output
// [
//     { id: "68751839", type: "CHOICE", systemVariableId: "1", questionId: null, variableId: null, … },
//     { id: "68751840", type: "CHOICE", systemVariableId: "2", questionId: null, variableId: null, … },
//     ....
// ]


//Layout change CID forstart to 9001 on ascii layout (test auto_layout survey)
//It's OVER 9000!!!
data.request = [{
    "id": "68751839",
    "forceStart": "9001"
}];
data.method = "dataexport-layoutitem-update";

header.body = JSON.stringify(data);

fetch(url, header).then((r) => { return r.json() }).then((j) => { console.log(j.response) });






//MORE REQUEST RESULTS ON THE LAYOUTS...

//Get Survey variables data
data.request = null;
data.method = "variable-get";
header.body = JSON.stringify(data);

fetch(url, header).then((r) => { return r.json() }).then((j) => { console.log(j.response) });

//Get get default variables layout
data.request = null;
data.method = "systemvariable-get";

header.body = JSON.stringify(data);

fetch(url, header).then((r) => { return r.json() }).then((j) => { console.log(j.response) });

fetch("https://api.cmix.com/", { "credentials": "include", "headers": {}, "referrer": "https://www.cmix.com/survey/datadownload?svy=20286", "referrerPolicy": "no-referrer-when-downgrade", "body": "{\"surveyId\":\"20286\",\"method\":\"systemvariable-get\",\"request\":null}", "method": "POST", "mode": "cors" });



fetch("https://survey-api.cmix.com/surveys/20937/locales", {
    "credentials": "include",
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,bg;q=0.8",
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMyYjc3NjM4NTRlNWZiYmMwMmYwMTU1Yjg4ZjU1OGE5YmFjNDUxMzUxZGU3YmZjYWIyZWIxZWEzM2JmNjZiODZiOTJkM2E3ZTVjYTFjZDI3In0.eyJhdWQiOiJDTUlYIEF1dGgiLCJqdGkiOiIzMmI3NzYzODU0ZTVmYmJjMDJmMDE1NWI4OGY1NThhOWJhYzQ1MTM1MWRlN2JmY2FiMmViMWVhMzNiZjY2Yjg2YjkyZDNhN2U1Y2ExY2QyNyIsIm5iZiI6MTUzOTQ2MjcwNCwiZXhwIjoxNTQyMTQ0NzY0LCJzdWIiOiIzNjU0Iiwic2NvcGVzIjpbXX0.Tam8DKhEqpPlPCFWLIRv92izTmKZmaacNHh5VsO7m5LnMN866cdsTI_CnIZorkN7Scuax0MXe0u818rh_i4OSyZmBkQrEGxPznp431-gBOI_Zer7cnfXS_zXryD-VV0QfQk7MDqLQ9vvdyc4HLkDucHgL7DhQnpvPeYXB08NNGwuTed2S62lJE7-8v6ofD-lVvAJQxSoLe1pEhtLsiy7GWrk0wlQ9Tu78IaZEqFi9pfKWm9lYbWBFUjsI3X1vj-hZuSAkr4SUTFUVxAS5shLCszgJJEXJlsTI0btTWsIw2GgrC3zn-zwVls01R8zBibHFo6qM5Q-dEo9HCKhC29jCv1z2ENNrB1QV9iy4WxjdxocBldyL0_sxy96kUNvDfLYt-dfi6IkyUhFmBlyhazsiY8kVgSVyiIV6-PeZFD62q6Iyld4tly8q40CTjRgmIWj_S9cKV6XUGQnXGxCPkhTA0KfmfmXUYHXF5jpQKvymYPVLhOEtSAePXiiUq-gNCwgBZ1TLY9xDITasBZLe6jXO6y9TLKZ-3wRHVQCRxyKUcmgbILOE1NVSzA3hArIO5PX6QIeSn2j9SKDSX9uvVu7OsbzqrsgcIMF09oJq__UMTOzy83iS9UCwYee5C-IfKCcfOPQ0UVrMEthsAKLaMoKPBZlAHrQkawbEe04Q-Gh_yI"
    },
    "referrer": "https://launchpad.cmix.com/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors"
}).then(resp => resp.json()).then(json => console.log(json));


let designSurveys = [];
//let liveSurveys = [];

//Gets Surveys in Design
fetch("https://survey-api.cmix.com/surveys?sortColumn=DATE_CREATED&sortDirection=desc&generalTextSearch=Theatrical%20Tracker%20&onlyMyProjects=0&onlyMyFavorites=0&page=1&paginate=1&itemsPerPage=32&details=1", {
    "credentials": "include",
    "headers":
    {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,bg;q=0.8",
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMyYjc3NjM4NTRlNWZiYmMwMmYwMTU1Yjg4ZjU1OGE5YmFjNDUxMzUxZGU3YmZjYWIyZWIxZWEzM2JmNjZiODZiOTJkM2E3ZTVjYTFjZDI3In0.eyJhdWQiOiJDTUlYIEF1dGgiLCJqdGkiOiIzMmI3NzYzODU0ZTVmYmJjMDJmMDE1NWI4OGY1NThhOWJhYzQ1MTM1MWRlN2JmY2FiMmViMWVhMzNiZjY2Yjg2YjkyZDNhN2U1Y2ExY2QyNyIsIm5iZiI6MTUzOTQ2MjcwNCwiZXhwIjoxNTQyMTQ0NzY0LCJzdWIiOiIzNjU0Iiwic2NvcGVzIjpbXX0.Tam8DKhEqpPlPCFWLIRv92izTmKZmaacNHh5VsO7m5LnMN866cdsTI_CnIZorkN7Scuax0MXe0u818rh_i4OSyZmBkQrEGxPznp431-gBOI_Zer7cnfXS_zXryD-VV0QfQk7MDqLQ9vvdyc4HLkDucHgL7DhQnpvPeYXB08NNGwuTed2S62lJE7-8v6ofD-lVvAJQxSoLe1pEhtLsiy7GWrk0wlQ9Tu78IaZEqFi9pfKWm9lYbWBFUjsI3X1vj-hZuSAkr4SUTFUVxAS5shLCszgJJEXJlsTI0btTWsIw2GgrC3zn-zwVls01R8zBibHFo6qM5Q-dEo9HCKhC29jCv1z2ENNrB1QV9iy4WxjdxocBldyL0_sxy96kUNvDfLYt-dfi6IkyUhFmBlyhazsiY8kVgSVyiIV6-PeZFD62q6Iyld4tly8q40CTjRgmIWj_S9cKV6XUGQnXGxCPkhTA0KfmfmXUYHXF5jpQKvymYPVLhOEtSAePXiiUq-gNCwgBZ1TLY9xDITasBZLe6jXO6y9TLKZ-3wRHVQCRxyKUcmgbILOE1NVSzA3hArIO5PX6QIeSn2j9SKDSX9uvVu7OsbzqrsgcIMF09oJq__UMTOzy83iS9UCwYee5C-IfKCcfOPQ0UVrMEthsAKLaMoKPBZlAHrQkawbEe04Q-Gh_yI"
    },
    "referrer": "https://launchpad.cmix.com/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors"
}).then(resp => resp.json()).then(json => {
    designSurveys = [];
    for (let survey of json.data) {
        if (survey.status == "DESIGN") {
            designSurveys.push(survey);
        }
        // else if(survey.status == "LIVE") {
        //     liveSurveys.push(survey);
        // }
    }

    console.log(designSurveys);
    // console.log(liveSurveys);
    for (let survey of designSurveys) {
        console.log(survey.id + " => " + survey.name + " => " + survey.status);
    }
});



fetch("https://www.cmix.com/login",
    {
        "credentials": "include",
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "accept-language": "en-US,en;q=0.9,bg;q=0.8", "cache-control": "max-age=0", "upgrade-insecure-requests": "1"
        },
        "referrer": "https://auth.cmix.com/",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors"
    }
).then(res => console.log(res));

