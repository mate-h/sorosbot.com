export const apiHost = "http://api"; //process.env["API_HOST"];
export const codeHost = `https://code.${process.env['HOST']}`; //process.env["CODE_HOST"];
export const cookieDomain = `.${process.env['HOST']}`;
console.log('config', {apiHost, codeHost, cookieDomain});