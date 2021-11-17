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
    const response = await fetch(url,{cache:"no-store" });
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


