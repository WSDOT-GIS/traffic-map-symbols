/**
 * Utilities for dealing with cookies.
 */



const maxDays = 3650;

/**
 * Sets a cookie
 * 
 * @param name name
 * @param val value
 */
export const setCookie = (name: string, val: string): void => {
    const date = new Date();
    // Set it expire in days
    date.setTime(date.getTime() + (maxDays * 24 * 60 * 60 * 1000));
    // Set it
    document.cookie = `${name}=${val}; expires=${date.toUTCString()}; path=/`;
    
}

/**
 * Gets a cookie matching the given name.
 * 
 * @param name Name of cookie.
 * @returns a string of the value corresponding to the given name.
 */
export const getCookie = (name: string): string => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
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

/**
 * Checks to see if a cookie for the given name exits.
 * 
 * @param name A cookie name
 * @returns A boolean value indicating if the cookie exists.
 */
export const checkCookie = (name: string): boolean => {
    if (getCookie(name)) return true;
    else return false;
}

/**
 * Deletes the cookie corresponding to the input name.
 * 
 * @param name The name of the cookie to delete.
 */
export const deleteCookie = (name: string): void => {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = `${name}=; expires=${date.toUTCString()}; path=/`;
}

// const getBytes = (val: string): number => {
//     const escaped_string = encodeURI(val);
//     let count: number;
//     if (escaped_string.indexOf("%") != -1) {
//         count = escaped_string.split("%").length - 1;
//         count = count == 0 ? 1 : count;
//         count = count + (escaped_string.length - (count * 3));
//     }
//     else {
//         count = escaped_string.length;
//     }

//     return count;


// }
