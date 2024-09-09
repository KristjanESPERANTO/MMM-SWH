# MMM-SWH

**MMM-SWH** is a module for [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror) to display advertising images from the websites of SWH or its daughter companies.

_Disclaimer_: Before using this module, you must ensure that you are authorised to use the content from SWH (or one of its daughter companies) on your device.

## Installation

Just clone the module into your modules folder of your MagicMirror² and execute `npm ci` in the module’s directory:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/KristjanESPERANTO/MMM-SWH
cd MMM-SWH
npm ci
```

## Update

Go to the module’s folder inside MagicMirror modules folder and pull the latest version from GitHub and install:

```bash
cd ~/MagicMirror/modules/MMM-MMM-SWH
git pull
npm ci
```

## Configuration

These are the possible options:

<!-- prettier-ignore-start -->
| Option            | Description                                                                                                        |
|-------------------|--------------------------------------------------------------------------------------------------------------------|
| `updateInterval`  | Interval (in milliseconds) to get the images from the website. Default: `60 * 60 * 1000` (1 hour).                 |
| `slideInterval`   | Interval (in milliseconds) to switch between the images. Default: `15 * 1000` (15 seconds).                        |
| `url`             | URL to get the images. Default: `"https://swh.de"`. Possible values: `"https://swh.de"` and `"https://havag.com"`. |
| `shortUrl`        | Short URL which will be used if the URL is to long. Default: `"www.swh.de"`.                                       |
| `maxUrlLength`    | Maximal URL length. If a URL is shorter the `shortUrl` will be used. Default: `50` (characters).                   |
| `header`          | Interval (in milliseconds) to get the images from the website. Default: `60 * 60 * 1000` (1 hour).                 |
| `showHeader`      | Show header (`true`) or not (`false`). Default: `true`.                                                            |
| `animationSpeed`  | Speed of the update animation.<br>**Possible values:** `0` - `5000`<br>**Default value:** `2000`<br>**Unit:** `milliseconds`|
<!-- prettier-ignore-end -->

Here is an example for an entry in `config.js`

```javascript
    {
      module: "MMM-SWH",
      position: "top_right",
      config: {
        updateInterval: 60* 60 *1000,
        slideInterval: 15* 1000,
        url: "https://swh.de",
        shortUrl: "swh.de",
        maxUrlLength: 50,
        showHeader: false
      }
    },
```

## Contributing

If you find any problems, bugs or have questions, please [open a GitHub issue](https://github.com/KristjanESPERANTO/MMM-SWH/issues) in this repository.

Pull requests are of course also very welcome 🙂

## To Do

- NETZ HALLE
- Simplify configuration by selecting a company rather than entering every detail.
