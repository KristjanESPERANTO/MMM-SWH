# MMM-SWH

**MMM-SWH** is a module for [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror) to display advertising images from the websites of SWH or its daughter companies.

_Disclaimer_: Before using this module, you must ensure that you are authorised to use the content from SWH (or one of its daughter companies) on your device.

## Screenshot

Blurred screenshot of the module with all companies:

![Screenshot](screenshot.png)

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
cd ~/MagicMirror/modules/MMM-SWH
git pull
npm ci
```

## Configuration

These are the possible options:

| Option           | Description                                                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `company`        | The company to show: `"bäder"`, `"evh"`, `"hafen"`, `"havag"`, `"hws"`, `"itc"`, `"maya mare"`, `"netz halle"` or `"swh"`.    |
| `updateInterval` | Interval (in milliseconds) to get the images from the website. Default: `60 * 60 * 1000` (1 hour).                            |
| `slideInterval`  | Interval (in milliseconds) to switch between the images. Default: `15 * 1000` (15 seconds).                                   |
| `showHeader`     | Show header (`true`) or not (`false`). Default: `true`.                                                                       |
| `showMoreInfo`   | Show part with URL or not. `true` or `false`. Default: `true`.                                                                |
| `animationSpeed` | Speed of the update animation.<br>**Possible values:** `0` - `5000`<br>**Default value:** `2000`<br>**Unit:** `milliseconds`. |

Here is a minimal example for an entry in your `config.js`:

```javascript
    {
      module: "MMM-SWH",
      position: "top_right",
      config: {
        company: "havag",
        showHeader: true
      }
    },
```

## Contributing

If you find any problems, bugs or have questions, please [open a GitHub issue](https://github.com/KristjanESPERANTO/MMM-SWH/issues) in this repository.

Pull requests are very welcome 🙂

## Troubleshooting

If images are not loading for a specific company, you can check if the website structure has changed by running:

```bash
npm run check-sites
```

This script checks all supported websites and shows which HTML patterns are detected. If a site shows "KEINS GEFUNDEN" (none found), the website structure may have changed and the module needs to be updated.
