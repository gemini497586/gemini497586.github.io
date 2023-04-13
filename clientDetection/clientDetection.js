import { detectIncognito } from "./detectIncognito.min.js";

/**
 * JavaScript Client Detection
 */
export const clientDetection = {
  // 瀏覽器
  getBrowser: () => {
    let nAgt = navigator.userAgent;
    let browser = "unknown";
    let version = "";
    let supplier, verOffset, ix;
  
    if (nAgt.indexOf("AppleWebKit") != -1) {
      nAgt = nAgt.substring(nAgt.indexOf("AppleWebKit"));
    }

    // Brave
    // navigator.brave && await navigator.brave.isBrave()
  
    // Legacy Edge
    if ((verOffset = nAgt.indexOf("Edge")) != -1) {
      browser = "Edge";
      version = nAgt.substring(verOffset + 5);
      supplier = "Microsoft";
    }
    // Edge (Chromium)
    else if ((verOffset = nAgt.indexOf("Edg")) != -1 ||
      (verOffset = nAgt.indexOf("edg")) != -1
    ) {
      browser = "Edge";
      version = nAgt.substring(verOffset + 4);
      supplier = "Microsoft";
      // Edge for iOS
      if ((verOffset = nAgt.indexOf("EdgiOS")) != -1) {
        version = nAgt.substring(verOffset + 7);
      }
    }
    // Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset = nAgt.indexOf("Opera")) != -1 ||
      (verOffset = nAgt.indexOf("opera")) != -1 ||
      (verOffset = nAgt.indexOf("OPERA")) != -1
    ) {
      browser = "Opera";
      version = nAgt.substring(verOffset + 6);
      supplier = "Opera";
      if ((verOffset = nAgt.indexOf("Version")) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Opera Next
    else if ((verOffset = nAgt.indexOf("OPR")) != -1 ||
      (verOffset = nAgt.indexOf("opr")) != -1
    ) {
      browser = "Opera";
      version = nAgt.substring(verOffset + 4);
      supplier = "Opera";
    }
    // Opera for iOS
    else if ((verOffset = nAgt.indexOf("OPT")) != -1) {
      browser = "Opera";
      version = nAgt.substring(verOffset + 4);
      supplier = "Opera";
    }
    // DuckDuckGo
    else if ((verOffset = nAgt.indexOf("DuckDuckGo")) != -1) {
      browser = "DuckDuckGo";
      version = nAgt.substring(verOffset + 11);
      supplier = "DuckDuckGo";
    }
    // Vivaldi
    else if ((verOffset = nAgt.indexOf("Vivaldi")) != -1) {
      browser = "Vivaldi";
      version = nAgt.substring(verOffset + 8);
      supplier = "Vivaldi";
    }
    // Aloha
    else if ((verOffset = nAgt.indexOf("Aloha")) != -1) {
      browser = "Aloha";
      version = nAgt.substring(verOffset + 6);
      supplier = "Aloha Mobile";
      if ((verOffset = nAgt.indexOf("AlohaBrowser")) != -1) {
        version = nAgt.substring(verOffset + 13);
      }
    }
    // Samsung
    else if ((verOffset = nAgt.indexOf("SamsungBrowser")) != -1 ||
      (verOffset = nAgt.indexOf("samsungbrowser")) != -1
    ) {
      browser = "Samsung Internet";
      version = nAgt.substring(verOffset + 15);
      supplier = "Samsung";
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1 ||
    (verOffset = nAgt.indexOf("FireFox")) != -1 ||
    (verOffset = nAgt.indexOf("firefox")) != -1
    ) {
      browser = "Firefox";
      version = nAgt.substring(verOffset + 8);
      supplier = "Mozilla";
    }
    // Firefox for iOS
    else if ((verOffset = nAgt.indexOf("FxiOS")) != -1) {
      browser = "Firefox";
      version = nAgt.substring(verOffset + 6);
      supplier = "Mozilla";
    }
    // Google App
    else if ((verOffset = nAgt.indexOf("GSA")) != -1) {
      browser = "Google App";
      version = nAgt.substring(verOffset + 4);
      supplier = "Google";
    }
    // Chromium
    else if ((verOffset = nAgt.indexOf("Chromium")) != -1) {
      browser = "Chromium";
      version = nAgt.substring(verOffset + 9);
      supplier = "Google";
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browser = "Chrome";
      version = nAgt.substring(verOffset + 7);
      supplier = "Google";
    }
    // Chrome for iOS
    else if ((verOffset = nAgt.indexOf("CriOS")) != -1) {
      browser = "Chrome";
      version = nAgt.substring(verOffset + 6);
      supplier = "Google";
    }
    // Safari
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browser = "Safari";
      version = nAgt.substring(verOffset + 7);
      supplier = "Apple";
    }
    // Other browsers
    else {
      browser = "unknown";
      version = nAgt.substring(nAgt.lastIndexOf("/") + 1) || "";
    }
  
    // trim the version string
    if ((ix = version.indexOf(";")) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(" ")) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(")")) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf("/")) != -1) version = version.substring(ix + 1);//最後執行
    
    return {supplier: supplier, browserName: browser, browserVersion: version};
  },
  
  // OPERATING_SYSTEM 作業系統 Window/Linux/OS X
  getOS: () => {
    const nAgt = navigator.userAgent;
    let os = "";
    let osVersion = "";
    let clientStrings = [
      { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
      { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
      { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
      { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
      { s: "Windows Vista", r: /Windows NT 6.0/ },
      { s: "Windows Server 2003", r: /Windows NT 5.2/ },
      { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
      { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
      { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
      { s: "Windows 98", r: /(Windows 98|Win98)/ },
      { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
      { s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
      { s: "Windows CE", r: /Windows CE/ },
      { s: "Windows 3.11", r: /Win16/ },
      { s: "Android", r: /Android/ },
      { s: "Open BSD", r: /OpenBSD/ },
      { s: "Sun OS", r: /SunOS/ },
      { s: "Chrome OS", r: /CrOS/ },
      { s: "Linux", r: /(Linux|X11(?!.*CrOS))/ },
      { s: "iOS", r: /(iPhone)/ },
      { s: "iPadOS", r: /(iPad)/ },
      { s: "iPod", r: /(iPod)/ },
      { s: "Mac OS X", r: /Mac OS X/ },
      { s: "Mac OS", r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: "QNX", r: /QNX/ },
      { s: "UNIX", r: /UNIX/ },
      { s: "BeOS", r: /BeOS/ },
      { s: "OS/2", r: /OS\/2/ },
      { s: "Search Bot", r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ },
    ];
    for (let id in clientStrings) {
      const cs = clientStrings[id];
      if (cs.r.test(nAgt)) {
        os = cs.s;
        break;
      }
    }

    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1];
      os = "Windows";
    }

    switch (os) {
      case "Mac OS":
      case "Mac OS X":
      case "Android":
        osVersion =
          /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)[1];
        break;

      case "iOS":
      case "iPadOS":
      case "iPod":
        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nAgt);
        osVersion = osVersion[1] + "." + osVersion[2] + "." + (osVersion[3] | 0);
        break;
    }

    return {os: os, osVersion: osVersion}
  },

  // INCOGNITO_MODE 無痕模式(Y/N)
  getIncognitoMode: async () => {
    let incognitoMode;
    const result = await detectIncognito();
    if (result.isPrivate === true) {
      incognitoMode = "Y";
    } else if (result.isPrivate === false){
      incognitoMode = "N";
    } else {
      // 若套件未來失效，或回傳 Boolean 以外的值，則重新抓條件。
      incognitoMode = "unknown";
    }
    return incognitoMode;
  },

  // 取得所有資訊
  getAll: async () => {
    const os = clientDetection.getOS();
    const browser = clientDetection.getBrowser();
    const incognitoMode = await clientDetection.getIncognitoMode();
    const detection  = {
      supplier: browser.supplier,
      browserName: browser.browserName,
      browserVersion: browser.browserVersion,
      os: os.os,
      osVersion: os.osVersion,
      incognitoMode: incognitoMode
    };
    return detection;
  },
};