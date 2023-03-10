/**
 * JavaScript Client Detection
 */
const clientDetection = {
  // 瀏覽器
  getBrowser: () => {
    const nAgt = navigator.userAgent;
    let browser, version, supplier, nameOffset, verOffset, ix;

    // Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
      browser = "Opera";
      version = nAgt.substring(verOffset + 6);
      supplier = "Opera";
      if ((verOffset = nAgt.indexOf("Version")) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf("OPR")) != -1) {
      browser = "Opera";
      version = nAgt.substring(verOffset + 4);
      supplier = "Opera";
    }
    // Legacy Edge
    else if ((verOffset = nAgt.indexOf("Edge")) != -1) {
      browser = "Microsoft Legacy Edge";
      version = nAgt.substring(verOffset + 5);
      supplier = "Microsoft Corporation";
    }
    // Edge (Chromium)
    else if ((verOffset = nAgt.indexOf("Edg")) != -1) {
      browser = "Microsoft Edge";
      version = nAgt.substring(verOffset + 4);
      supplier = "Microsoft Corporation";
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browser = "Chrome";
      version = nAgt.substring(verOffset + 7);
      supplier = "Google Inc.";
    }
    // Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browser = "Safari";
      version = nAgt.substring(verOffset + 7);
      supplier = "Apple Inc.";
      if ((verOffset = nAgt.indexOf("Version")) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browser = "Firefox";
      version = nAgt.substring(verOffset + 8);
      supplier = "Mozilla Corporation";
    }
    // Other browsers
    else if (
      (nameOffset = nAgt.lastIndexOf(" ") + 1) <
      (verOffset = nAgt.lastIndexOf("/"))
    ) {
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
      if (browser.toLowerCase() == browser.toUpperCase()) {
        browser = navigator.appName;
      }
    }
    // trim the version string
    if ((ix = version.indexOf(";")) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(" ")) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(")")) != -1) version = version.substring(0, ix);

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
      {
        s: "Windows NT 4.0",
        r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
      },
      { s: "Windows CE", r: /Windows CE/ },
      { s: "Windows 3.11", r: /Win16/ },
      { s: "Android", r: /Android/ },
      { s: "Open BSD", r: /OpenBSD/ },
      { s: "Sun OS", r: /SunOS/ },
      { s: "Chrome OS", r: /CrOS/ },
      { s: "Linux", r: /(Linux|X11(?!.*CrOS))/ },
      { s: "iOS", r: /(iPhone|iPad|iPod)/ },
      { s: "Mac OS X", r: /Mac OS X/ },
      { s: "Mac OS", r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: "QNX", r: /QNX/ },
      { s: "UNIX", r: /UNIX/ },
      { s: "BeOS", r: /BeOS/ },
      { s: "OS/2", r: /OS\/2/ },
      {
        s: "Search Bot",
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
      },
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
      // os = "Windows";
    }

    switch (os) {
      case "Mac OS":
      case "Mac OS X":
      case "Android":
        osVersion =
          /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)[1];
        break;

      case "iOS":
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