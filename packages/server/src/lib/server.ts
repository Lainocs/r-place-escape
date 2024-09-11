import { createRouter, useCORS } from 'fets';
import type { IncomingMessage, ServerResponse } from 'http';

interface ServerContext {
  req: IncomingMessage;
  res: ServerResponse;
}

export const router = createRouter<ServerContext>({
  plugins: [useCORS({ origin: '*' })]
});
