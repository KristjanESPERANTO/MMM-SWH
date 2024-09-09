// MagicMirror²-Konfiguration

// eslint-disable-next-line prefer-const
let config = {
  address: "127.0.0.1",
  port: 8080,
  basePath: "/",
  ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],
  useHttps: false,
  language: "de",

  logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
  timeFormat: 24,
  units: "metric",
  modules: [
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_left",
      config: {
        header: "HAVAG",
        slideInterval: 10000,
        url: "https://havag.com",
        shortUrl: "www.havag.com",
        showHeader: true
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_left",
      config: {
        header: "SWH",
        slideInterval: 12000,
        url: "https://swh.de",
        shortUrl: "www.swh.de",
        showHeader: true
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_left",
      config: {
        header: "EVH",
        slideInterval: 14000,
        url: "https://evh.de",
        shortUrl: "www.evh.de",
        showHeader: true
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_right",
      config: {
        header: "HWS",
        slideInterval: 16000,
        url: "https://hws-halle.de",
        shortUrl: "www.hws-halle.de",
        showHeader: true
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_right",
      config: {
        header: "ITC",
        slideInterval: 18000,
        url: "https://itc-halle.de",
        shortUrl: "www.itc-halle.de",
        showHeader: true
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_right",
      config: {
        header: "Hafen",
        slideInterval: 20000,
        url: "https://ct-hs.de",
        shortUrl: "www.ct-hs.de",
        showHeader: true
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_right",
      config: {
        header: "Bäder",
        slideInterval: 22000,
        url: "https://baden-in-halle.de",
        shortUrl: "baden-in-halle.de",
        showHeader: true
      }
    },
    {
      disabled: true,
      module: "MMM-SWH",
      position: "top_right",
      config: {
        header: "NETZ HALLE",
        slideInterval: 24000,
        url: "https://netzhalle.de",
        shortUrl: "www.netzhalle.de",
        showHeader: true
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_left",
      config: {
        header: "Maya mare",
        slideInterval: 26000,
        url: "https://www.mayamare.de",
        shortUrl: "www.mayamare.de",
        showHeader: true
      }
    }
  ]
};

/** ************* DO NOT EDIT THE LINE BELOW ************* **/
if (typeof module !== "undefined") {
  module.exports = config;
}
