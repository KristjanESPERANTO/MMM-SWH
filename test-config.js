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
        company: "bäder",
        slideInterval: 10000
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_left",
      config: {
        company: "evh",
        slideInterval: 11250
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_left",
      config: {
        company: "hafen",
        slideInterval: 12500
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_center",
      config: {
        company: "havag",
        slideInterval: 13750
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_center",
      config: {
        company: "hws",
        slideInterval: 15000
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_center",
      config: {
        company: "ITC",
        slideInterval: 16250
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_right",
      config: {
        company: "maya mare",
        showHeader: true
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_right",
      config: {
        company: "netz halle",
        slideInterval: 17250
      }
    },
    {
      disabled: false,
      module: "MMM-SWH",
      position: "top_right",
      config: {
        company: "swh",
        slideInterval: 18500
      }
    }
  ]
};

/** ************* DO NOT EDIT THE LINE BELOW ************* **/
if (typeof module !== "undefined") {
  module.exports = config;
}
