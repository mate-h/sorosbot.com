export const apiHost = "https://api";
export const host = import.meta.env.VITE_VIRTUAL_HOST;
export const codeHost= `https://code.${host}`;
export const cookieDomain = `${host}`;

console.log('config', {host, apiHost, codeHost, cookieDomain});