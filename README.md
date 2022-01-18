# Sound Recorder

This is a sound recording application created in ReactJS. It is a learning exercise. Buyer beware.

This is, in many ways, a recreation of this [dictaphone web application](https://github.com/mdn/web-dictaphone/).
However, with this version, I plan on making it a [PWA](https://create-react-app.dev/docs/making-a-progressive-web-app/)
so you can install it on your device and use it without an Internet connection.

## Live Demo

You can see a [live demo here](https://tedsecretsource.github.io/sound-recorder/) of the current development version.

# Gettins Started

First of all, you have to clone this project into your repository and install the dependecies with:

```bash
npm install
```

## Starting scripts

When the dependecies installation are done, to check the interface of the project run:

```bash
npm run start
```

and for launch the test run:

```bash
npm run test
```

## Methodology used

Different tools were used to develop this project as:

- [Trello](https://trello.com/b/FTI9W1kT/secret-source-challenge) to manage the tasks to be developed on the project.

- [Figma](https://www.figma.com/file/p8Yf4aLTFtVLPRBbgJKPAW/secret-source-challenge?node-id=0%3A1) to define the views and components that will be part of the user interface.

- [Firebase](https://firebase.google.com/) to store the recordings of the application. In this case you should add the credentials of your own firebase project to be able to have firebase to save your recordings.

If you want to work with your firebase project, you need to create a `.env` document out of the src folder where store your firebase credentials.

## Libraries used

- [redux-thunk](https://www.npmjs.com/package/redux-thunk).

- [sass](https://www.npmjs.com/package/sass).

- [react-mic](https://www.npmjs.com/package/react-mic).

- [react-h5-audio-player](https://www.npmjs.com/package/react-h5-audio-player).

- [storybook](https://storybook.js.org/).

- [styles-components](https://www.npmjs.com/package/styled-components).

- [classnames](https://www.npmjs.com/package/classnames).
