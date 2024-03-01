const getCsrfCookie = () => {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("XSRF-TOKEN="))
    ?.split("=")[1]
    .replace("%3D", "=");
};

export default getCsrfCookie;
