export const formatEpoch = (epoch: number, isTime?: boolean): string => {
    /* IT said date will be in UTC, so removed the workaround below. If necessary simply
              change all the methods to UTC... methods. */
    /* The date value is in local time, so do not let JS do time conversion.
       By using the UTC... functions, we can get the date as is without conversion. */
    const date = new Date(epoch);
    let text = `${formatDateTimePart(date.getMonth() + 1)}/${formatDateTimePart(
        date.getDate()
    )}/${date.getFullYear()}`;
    if (isTime) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        // Check whether AM or PM
        const ampm = hours >= 12 ? "PM" : "AM";
        // Find current hour in AM-PM Format
        hours = hours % 12;
        // To display "0" as "12"
        hours = hours ? hours : 12;
        text += ` ${formatDateTimePart(hours)}:${formatDateTimePart(minutes)} ${ampm}`;
    }
    return text;
}

const formatDateTimePart = (part: number) => {
    return ("0" + part).slice(-2);
};

export const fetchJson = async (url: string, isUnicode?: boolean): Promise<unknown> => {
    const response = await fetch(url, { cache: "no-store" });
    let json: unknown;
    if (isUnicode) {
        json = await response.json();
    }
    else {
        const buffer = await response.arrayBuffer();
        /* I think the data is in Windows-1252 (or ISO-8859-1). 
           The method: response.json() by always encode everything in UTF-8, so that mess up some characters.
           To avoid this, decode the buffer with specific encoding instead. */
        const decoder = new TextDecoder('windows-1252');
        const text = decoder.decode(buffer);
        json = JSON.parse(text);
    }
    return json;
}

/**
 * Determines the media size
 * @returns s: small, l:large (add more as needed)
 */
export const getMediaSize = (): "s" | "l" => {
    if (window.matchMedia("(max-width: 600px)").matches
        || window.matchMedia("(max-height: 400px)").matches) {
        return "s"
    }
    else {
        return "l"
    }
}

export const WebMercator = {
    "wkid": 3857
}
/**
 * Check browser and its version to determine if ArcGIS JS API supports it or not according to ESRI website:
 * https://developers.arcgis.com/javascript/latest/system-requirements/
 * @returns 
 */
export const getBrowserSupportInfo = (): { supported: boolean, browser: string } => {
    const info = getBrowserInfo();
    let isSupported = false;
    switch(info.browserName) {
        case "Chrome":
            isSupported = info.majorVersion >= 93;
            break;
        case "Edge":
            isSupported = info.majorVersion >= 93;
            break;
        case "Firefox":
            isSupported = info.majorVersion >= 93;
            break;
        case "Safari":
            isSupported = info.majorVersion >= 14;
            break;
        default:
            isSupported = false;
            break;
    }

    return { supported: isSupported, browser: info.browserName + " " + info.fullVersion };
}

const getBrowserInfo = (): { browserName: string, fullVersion: string, majorVersion: number } => {

    const nAgt = navigator.userAgent;
    let browserName = "";
    let fullVersion = "";
    let majorVersion: number;
    let nameOffset, verOffset, ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
        (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    console.log(''
        + 'Browser name  = ' + browserName + '\n'
        + 'Full version  = ' + fullVersion + '\n'
        + 'Major version = ' + majorVersion + '\n'
        + 'navigator.userAgent = ' + navigator.userAgent
    )

    return { browserName: browserName, fullVersion: fullVersion, majorVersion: majorVersion }

}


