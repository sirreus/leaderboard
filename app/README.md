# Leaderboard

This is the Client application for the Leaderboard project. Built on **React** + **TS** and **Material UI** as a component library.

## About app

This app has two tabs one for the table and a second one for Settings. The Leaderboard tab displays a table with user data fetched via WebSocket ( [Socket.io](https://socket.io/) ). The data is randomly generated on the server (Emitter app) by [Faker-js](https://fakerjs.dev/). The table filling regarding its size. When the table is filled newly fetched data from the server will be compared with existing data in the table by `score` and added if `newUser.score` is greater than minScore in the table, and this `looser` will be removed from the table.

On the Settings tab, the user can change the amount displaying data (table size), which is shown in a short info block in the app header.

## To run the App locally

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
