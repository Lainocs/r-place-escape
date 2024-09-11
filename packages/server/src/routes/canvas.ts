import { Response } from 'fets';
import { router } from '../lib/server.js';
import { canvas, updateCanvas } from '../lib/canvas.js';

type Canvas = string[][];

const CANVAS_PATH = '/canvas';
const CANVAS_UPDATE_PATH = '/canvas/update';

router.route({
  path: CANVAS_PATH,
  method: 'GET',
  schemas: {
    responses: {
      200: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      } as const
    }
  },
  handler() {
    return Response.json(canvas);
  }
});

router.route({
  path: CANVAS_UPDATE_PATH,
  method: 'POST',
  schemas: {
    body: {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    } as const,
    responses: {
      200: {
        type: 'string'
      } as const
    }
  },
  async handler(req) {
    const body = await req.json();
    const newCanvas: Canvas = body;
    updateCanvas(newCanvas);
    return Response.json('Canvas updated successfully');
  }
});
