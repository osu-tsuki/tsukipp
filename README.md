# tsukirxpp!

tsukirxpp! is a browser extension that allows you to calculate relax pp
values for a beatmap without manually downloading the beatmap.

### Setup

Clone the repository and run the following commands.
```
yarn
```

### Chromium-based browsers

 - Run `yarn start:chrome`. This will create a `build/` directory to the repository root.
 - Open up Chrome and navigate to `chrome://extensions`.
 - Enable `Developer mode`.
 - Click the `Load unpacked` button and select the previously mentioned `build` directory. 
 - The extension is now ready to go!

All the changes made are compiled automatically as long as the `yarn start:chrome` script is running.

To build a production version of the package, run `yarn build:chrome`.

### Firefox

 - Run `yarn start:firefox`. This will create a `build/` directory to the repository root.
 - Open up Firefox and navigate to `about:debugging#/runtime/this-firefox`.
 - Click the `Load Temporary Add-on` button and select any file in the previously mentioned directory.
 - The extension is now ready to go!

All the changes made are compiled automatically as long as the `yarn start:firefox` script is running.

To build a production version of the package, run `yarn build:firefox`.

### Production builds

Run `yarn build:all`. Two files, `tsukirxpp-chrome.zip` and `tsukirxpp-firefox.zip`, are generated.

## Installing

Chrome/Chromium: [Install from Google WebStore](https://chrome.google.com/webstore/detail/ezpp/aimihpobjpagjiakhcpijibnaafdniol)

Firefox: [Install from addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/ezpp/)

