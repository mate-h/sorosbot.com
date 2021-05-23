import { safeTerminal } from '../lib/terminal';
import {server} from '..';

server.get('/docker', async (request, reply) => {
  return safeTerminal.allContainers();
});