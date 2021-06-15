const maxDays = 30;

export const setCookie = (name: string, val: string): void => {
    const date = new Date();
    const value = val;

    // Set it expire in days
    date.setTime(date.getTime() + (maxDays * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

export const getCookie = (name: string): string => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    let cookieValue = "";
    if (parts.length == 2) {
        const partsPop = parts.pop();
        if (partsPop) {
            const val = partsPop.split(";").shift();
            if (val) { cookieValue = val;}
        }
    }
    return cookieValue;
}

export const checkCookie = (name: string): boolean => {
    if (getCookie(name)) return true;
    else return false;
}

export const deleteCookie = (name: string): void => {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}