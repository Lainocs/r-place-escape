# r/ploce

Instructions for the test can be found in [the subject.md file](./subject.md)

# Setup

1. Clone this repository
   You are provided with a monorepo containing two packages:

   - A package `server` written using [feTS](https://the-guild.dev/openapi/fets)
   - A package `website` with a frontend written in pure HTML/CSS/JS

2. Install the necessary dependencies

   - The following codebase lives in a [Node.Js](https://nodejs.org) project. Thus, `Node 20` is required to run it.
   - **This challenge uses Parcel, which has known issues under Node.js 22.**. If you decide to use Node >= 22, you may encounter issues with Parcel, but you can still try to develop the frontend without a development server.
   - We recommend using [Volta](https://volta.sh/) to manage Node.js versions

3. Install the repository dependencies

   ```sh
   npm install
   ```

4. Start the development server

   ```sh
   npm run dev --workspace=@rploce/server
   ```

   The following log should appear `Server is listening on http://localhost:3003`, and you should be able to browse `http://localhost:3003/canvas` and retrieve the canvas JSON.

5. Browse the website

   ```sh
   npm run dev --workspace=@rploce/website
   ```

   The following log should appear `Server running at http://localhost:1234`, and you should be able to browse `http://localhost:1234` to visit the website.
