export const isMobile = (): boolean => {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
    }
    else { return false; }
}

export const isSmallMedia = (): boolean => {
    const isLargeMedia = window.matchMedia(
        "(min-width: 576px) and (min-height: 576px)"
    );
    return !isLargeMedia.matches;
}