# NCCountdownWebApp

The NC Countdown Web App is built using:

- Angular CLI version 18.2.1.
- TypeScript 5.5.2

## Deployed version

A deployed version of the app can be found at:
[Github pages](https://kristiansensofia.github.io/nc-challenge-web-app/)

## Run locally (development server)

Instructions using Terminal:

1. Clone the repository.
2. `cd nc-challenge-web-app`.
3. Run `npm install` to install dependencies.
4. Run `ng serve --open` to start a dev server and automatically open the app in a web browser.
5. To stop the dev server run `ctrl + z`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

`ng build --base-href="https://kristiansensofia.github.io/nc-challenge-web-app/"`

## Deploy

Run `npx angular-cli-ghpages --dir=dist/nc-countdown-web-app/browser` to deploy the project to Github pages.

## Optional goals

How to improve this solution:

1. Write a different fail safe for date picker.
   Background: The `min` attribute on `input type=date` is not supported on iOS devices iPhone and iPad. Hence my implemented fail safe, for the user to not be able to pick a past date, doesn't work on iPhone/iPad, but does work on desktop.
2. Write a fail safe for the textfit component styling, by setting the correct CSS properties and values with JavaScript if they are not already set.
   Background: Altering the style in the CSS document of the textfit component will break it.
