let cache = [];

const fetchLinks = () => {
    fetch("https://woopy.alexiis.fr/websites.json").then(res => {
        res.json().then(j => {
            cache = j;
        })
    }).catch(err => {
        console.log("Une erreur est survenue.", err);
    })
}

fetchLinks();
setInterval(fetchLinks, 60*60*1000)

chrome.tabs.onUpdated.addListener(function(activeInfo) { //Dès qu'on change de tab, ou qu'on va sur un nouveau
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => { //On récupère l'URL
        const tabId = activeInfo.tabId;
        var url = tabs[0].url; //On la stocke dans la variable "URL"

        if(url.startsWith("https://www.")) { //Si elle commence par https://www.
            var domain = url.substring(12); //On enlève 12 caractères
            var cleared = domain.split('/')[0];
            var count = cleared.length;
            var data = domain.substring(count);

            if(checkurl(cleared)) {
                chrome.tabs.update(tabId ,{url:checkurl(cleared) + data});
            }
        } if(url.startsWith("https://")) { //Si elle commence par https://
            var domain = url.substring(8); //On enlève 8 caractères
            var cleared = domain.split('/')[0];
            var count = cleared.length;
            var data = domain.substring(count);

            if(checkurl(cleared)) {
                chrome.tabs.update(tabId ,{url:checkurl(cleared) + data});
            }
        } else if(url.startsWith("http://www.")) { //Si elle commence par http://www.
            var domain = url.substring(11); //On enlève 11 caractères
            var cleared = domain.split('/')[0];
            var count = cleared.length;
            var data = domain.substring(count);

            if(checkurl(cleared)) {
                chrome.tabs.update(tabId ,{url:checkurl(cleared) + data});
            }
        } else if(url.startsWith("http://")) { //Si elle commence par http://
            var domain = url.substring(7); //On enlève 7 caractères
            var cleared = domain.split('/')[0];
            var count = cleared.length;
            var data = domain.substring(count);

            if(checkurl(cleared)) {
                chrome.tabs.update(tabId ,{url:checkurl(cleared) + data});

            }
        }  else if(url.startsWith("www.")) { //Si elle commence par www.
            var domain = url.substring(4); //On enlève 4 caractères
            var cleared = domain.split('/')[0];
            var cleared = domain.split('/')[0];
            var count = cleared.length;
            var data = domain.substring(count);

            if(checkurl(cleared)) {
                chrome.tabs.update(tabId ,{url:checkurl(cleared) + data});
            }
        } else { //Sinon
            return console.log(url);
        }

        function checkurl(url){
            let is = false;

            for (let u of cache) {
                if (u.link == url) is = u.url;
            }

            if(url === "free.woopy") {is = "http://elaxis.html-5.me/woopy";}
            if(url === "koro.baka") {is = "https://krbk.dev";}
            if(url === "neto.centre") {is = "https://netocentre.fr";}
            if(url === "alexii.s") {is = "https://alexiis.fr";}
            if(url === "goog.le") {is = "https://google.com"}
            if(url === "dev.woopy") {is = "http://elaxis.html-5.me/woopy/devlogs"}
            if(url === "d.is" || url === "d.i") {is="https://discord.gg/"}
            if(url === "dream.art") {is="https://app.wombo.art/"}

            return is;
        }
    });
});
