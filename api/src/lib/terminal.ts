import { DockerContainer } from "../api";
import http from "http";

const isValidId = (id: string) => /^[0-9a-zA-Z]+$/.test(id.trim());
const isValidString = (id: string) => /^[a-zA-Z]+$/.test(id.trim());

const Terminal = (command: string) =>
  new Promise<string>((resolve, reject) => {
    let options = {
      socketPath: '/var/run/docker.sock',
      path: `/v1.26/containers/json`,
      method: 'GET'
    };
    let clientRequest = http.request(options, (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk; 
        });
        res.on('end', () => {
            resolve(rawData);
        });
    });
    clientRequest.on('error', (e) => {
        console.log(e);
    });
    clientRequest.end();
  });

export const safeTerminal = {
  allContainers: async () => {
    const result = await Terminal(`/var/run/docker.sock docker ps -a --format '{{json .}}'`);
    return JSON.parse(result) as DockerContainer[]
  }
}