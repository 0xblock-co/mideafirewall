export function createCookie(name: string, value: string, days: any) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  } else {
    expires = "";
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
}
export function setCookieWithJwtExp(name, value, jwtToken) {
  const payload = JSON.parse(atob(jwtToken.split(".")[1]));
  const expirationTime = new Date(payload.exp * 1000); // Convert "exp" to milliseconds
  document.cookie = `${name}=${value};expires=${expirationTime.toUTCString()};path=/`;
}

export function readCookie(name: string) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
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

export function eraseCookie(name: string) {
  createCookie(name, "", -1);
}
