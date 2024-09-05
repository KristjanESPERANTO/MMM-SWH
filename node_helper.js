const NodeHelper = require("node_helper");
const Log = require("logger");
const {JSDOM} = require("jsdom");

const identifier = [];

module.exports = NodeHelper.create({
  start () {
    Log.log("Node Helper started for MMM-SWH");
  },

  socketNotificationReceived (notification, payload) {
    if (notification === "GET_SLIDESHOW_DATA") {
      if (!identifier.includes(payload.identifier)) {
        identifier.push(payload.identifier);
        this.fetchSlideshowData(payload);
      }
    }
  },

  async fetchSlideshowData (payload) {
    try {
      const url = payload.url;
      const response = await fetch(url);
      const body = await response.text();
      const dom = new JSDOM(body);

      const {document} = dom.window;
      const objects = [];
      const imgElements = document.getElementsByClassName("slider-box");

      Array.from(imgElements).forEach((imgContainer) => {
        const object = {};
        const img = imgContainer.querySelector("img");
        const urla = imgContainer.querySelector("a");

        object.src = img.getAttribute("data-lazy") || img.src;
        object.url = urla.getAttribute("href");

        if (object.src.startsWith("/")) {
          object.src = url + object.src;
        }

        if (object.url.startsWith("/")) {
          object.url = url + object.url;
        }

        if (!object.url.startsWith("http")) {
          object.url = `${url}/${object.url}`;
        }

        if (object.url.endsWith("/")) {
          object.url = object.url.slice(0, -1);
        }

        if (object.url.length > payload.maxUrlLength) {
          Log.debug(`URL ${object.url} is to long. Use default URL instead.`);
          object.url = payload.shortUrl;
        }

        if (object.src !== undefined && object.url !== undefined) {
          objects.push(object);
        }
      });

      Log.debug(objects);

      const result = {};
      result.identifier = payload.identifier;
      result.objects = objects;

      this.sendSocketNotification("SLIDESHOW_DATA", result);
    } catch (error) {
      Log.error("Error fetching slideshow data:", error);
    }
  }
});
