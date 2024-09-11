import { router } from './lib/server.js';
import { createServer } from 'http';

import './routes';

createServer(router).listen(3003, () => {
  console.log('Server listening at http://localhost:3003');
});
