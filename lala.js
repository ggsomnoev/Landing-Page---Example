const fetch = require("node-fetch")


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
).then((res) => {
    console.log(res.headers);
    fetch("https://auth.cmix.com/login",
        {
            "credentials": "include",
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "accept-language": "en-US,en;q=0.9,bg;q=0.8", "cache-control": "max-age=0",
                "content-type": "application/x-www-form-urlencoded", "upgrade-insecure-requests": "1"
            },
            "referrer": "https://auth.cmix.com/",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": "_token=uwWyXuYe8qkPKUboC45xplrSSp4nlSvpZfc7lBOP&email=cmixautomation%40gmail.com&password=123456",
            "method": "POST",
            "mode": "cors"
        }
    ).then(res => {
        console.log("********************");
        console.log(res);
    });
});


