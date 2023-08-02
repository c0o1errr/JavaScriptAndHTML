//https://developer.mozilla.org/ru/docs/Web/API/Window/navigator

function checkBrowser() {
    var sBrowser, sUsrAg = navigator.userAgent;
    var resolution = (screen.width + "x"+screen.height);
    if (sUsrAg.indexOf("Firefox") > -1) {
        sBrowser = "Mozilla Firefox";
    } else if (sUsrAg.indexOf("Opera") > -1) {
        sBrowser = "Opera";
    } else if (sUsrAg.indexOf("Trident") > -1) {
        sBrowser = "Microsoft Internet Explorer";
    } else if (sUsrAg.indexOf("Edge") > -1) {
         sBrowser = "Microsoft Edge";
    } else if (sUsrAg.indexOf("Chrome") > -1) {
        sBrowser = "Google Chrome or Chromium";
    } else if (sUsrAg.indexOf("Safari") > -1) {
        sBrowser = "Apple Safari";
    } else {
        sBrowser = "unknown";
    }
alert("You are using <" + sBrowser + "> with screen resolution: <" + resolution + ">.");
}
