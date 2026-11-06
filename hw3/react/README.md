# HW3 React: Tic Tac Toe

Local React project using Vite for the tic tac toe tutorial.

## Run locally

From the repository root:

```powershell
cd hw3/react
npm.cmd install
npm.cmd run dev
```

Open the local URL printed in the terminal. Press Ctrl+C to stop the server.
The install command is only needed after cloning or when dependencies change.
Use `npm` instead of `npm.cmd` in terminals that support it.

## Working through the tutorial

- `App.jsx`: the tutorial component (originally `App.js`). JSX uses the `.jsx` extension in this setup.
- `styles.css`: styles for the squares and game layout.
- `main.jsx`: mounts the component in the page.
- `index.html`: the HTML page containing the React root.

Save changes while the development server is running to see them in the browser.
When the tutorial imports another component containing JSX, use a `.jsx` file for it too.

## Build

```powershell
npm.cmd run build
npm.cmd run preview
```

The build command checks that the app can be bundled and writes the production
files to `dist/`. The preview command serves that build locally.
Keep source files and `package-lock.json` in Git; `node_modules/` and `dist/` are ignored.
