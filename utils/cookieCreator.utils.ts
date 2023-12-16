function createCookie(name, value, timeToExpire) {
    let expires = "";
    if (timeToExpire) {
        const date = new Date(timeToExpire * 1000);
        expires = `; expires=${date.toUTCString()}`;
    } else {
        expires = "";
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
}

function readCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

// Example Usage
// createCookie('myCookie', 'cookieValue', 3600); // Create a cookie that expires in 1 hour
// const cookieValue = readCookie('myCookie'); // Read the value of the cookie
// eraseCookie('myCookie'); // Delete the cookie
