# Rploce - Escape's fullstack software engineering interview

## Description

You are developing a clone of the [r/place](https://www.reddit.com/r/place/) reddit event place.

You have been assigned the following business requirements:

- People can visit a web page, select a pixel on a canvas, and attach a color to that pixel on the canvas.
- Assigning a color is a rate-limited operation, it can happen once every x minutes for a given IP.
- When browsing the page, you see on each pixel of the canvas the last color that was assigned to it.

## Assessment

We ask you to provide **clean, idiomatic and formatted code**, as well as a **clean git history**. These elements **will be part of the assessment**.

We ask you to provide **pragmatic** solutions to meet the below requirements:

- For instance, solving this test and matching our business requirements does not necessarily require to setup a database system.
- You should focus on solutions working **locally**, without worrying about moving it to any kind of production environment.
- You are not forced to stick with the current choice of libraries, but you won't have extra time to complete the test if you decide to change them.

## Delivery

## Exercises

- You have to complete exercise 1 first, but exercises 2, 3, and 4 can be completed independently.
- For each exercise, the estimated of time to spend on it is indicated.

### Exercise 1: A basic collaborative canvas (40min)

The first step requires you to modify the existing codebase to provide a basic interactive canvas:

- It is possible to chose the color of cells in the canvas
- The color of the cell should be persisted and survive a server restart
- The color selected for the canvas' cell should be displayed in the website
- No need to provide rate-limiting
- No need to provide server-side authentication

## Exercise 2: Improvements on the application (40min)

- It is possible to update the color of tile without using the mouse
  _Hint: It might be required to still leverage the mouse for selecting a color in the native color picker input_
- The frontend display is a bit less ugly, and color transitions are animated
- It is possible to leverage external libraries to achieve this result

## Exercise 3: Improvements on the server (1h40min)

- With two windows opened, if I update the color of a tile on the first window, I should see the change reflected in the second window with any page reload
- It is possible to leverage external libraries to achieve this result
- No need to provide authentication
- _Bonus_: Rate limiting is implemented

If you decide to leverage websockets, we provide the following code for accepting a websocket connection on the server side, using [socket.io](https://socket.io/)

```ts
import { App } from "uWebSockets.js"; # yarn add uNetworking/uWebSockets.js#v20.30.0
import { Server } from "socket.io";

const io = new Server();

io.on("connection", (socket) => {
  console.log("received connection");
  socket.emit("hello", "world");
});

// Make sure to create a different app than the API's app
const wss = App();
io.attachApp(wss);

wss.listen(3004, () => {
  console.info(`WSS is listening on http://localhost:3004`);
});
```

If you decide to leverage server sent events, your server can return event-stream responses like so:

```ts
router.route({
  path: CANVAS_PATH,
  method: 'GET',
  schemas: {
    responses: {
      200: {
        type: 'string'
      } as const
    }
  },
  handler() {
    // FeTS' `Response` does not allow to return anything else than a plain object, because it is a proxy.
    // See https://github.com/ardatan/feTS/blob/7334d3086ec95dcd69cadc2be0b6447087a0696e/packages/fets/src/Response.ts#L80
    return new globalThis.Response(
      new ReadableStream({
        async start(controller) {
          while (true) {
            controller.enqueue(
              'data: ' + new Date().toISOString() + '\r\n\r\n'
            );
            await setTimeout(1000);
          }
        }
      }),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          Connection: 'keep-alive',
          'Cache-Control': 'no-cache'
        }
      }
    );
  }
});
```
