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
    } else if (notification === "GET_NEW_SLIDESHOW_DATA") {
      if (!identifier.includes(payload.identifier)) {
        identifier.push(payload.identifier);
        this.fetchNewSlideshowData(payload);
      }
    } else if (notification === "GET_MAIN_IMAGE") {
      identifier.push(payload.identifier);
      this.fetchMainImage(payload);
    }
  },

  async fetchSlideshowData (payload) {
    try {
      const url = payload.url;
      const response = await fetch(url);
      const body = await response.text();
      const dom = new JSDOM(body);
      const document = dom.window.document;
      const objects = [];
      let imgElements = document.getElementsByClassName("slider-box");
      // fallback: some pages use 'carousel-item' markup (bootstrap-like sliders)
      if (imgElements.length === 0) {
        imgElements = document.getElementsByClassName("carousel-item");
      }

      Array.from(imgElements).forEach((imgContainer) => {
        const object = {};
        const img = imgContainer.querySelector("img");
        const urla = imgContainer.querySelector("a");

        object.src = img && (img.getAttribute("data-lazy") || img.getAttribute("data-lazy-src") || img.src);
        object.url = urla ? urla.getAttribute("href") : payload.shortUrl;

        if (object.src && object.src.startsWith("/")) {
          object.src = url + object.src;
        }

        if (object.url && object.url.startsWith("/")) {
          object.url = url + object.url;
        }

        if (object.url && !object.url.startsWith("http") && !object.url.startsWith("www")) {
          object.url = `${url}/${object.url}`;
        }

        if (object.url.endsWith("/")) {
          object.url = object.url.slice(0, -1);
        }

        if (!object.url) {
          object.url = payload.shortUrl;
        }

        if (object.url.length > payload.maxUrlLength) {
          Log.debug(`URL ${object.url} is too long. Use default URL instead.`);
          object.url = payload.shortUrl;
        }

        if (object.src && object.url) {
          objects.push(object);
        }
      });

      Log.debug(`Fetched slides from ${url} -> ${objects.length} items`, objects);

      const result = {};
      result.identifier = payload.identifier;
      result.objects = objects;
      Log.debug(`Sending SLIDESHOW_DATA for ${payload.identifier} (${url}) with ${objects.length} items`);
      this.sendSocketNotification("SLIDESHOW_DATA", result);
    } catch (error) {
      Log.error("Error fetching slideshow data:", error);
    }
  },

  async fetchNewSlideshowData (payload) {
    try {
      const url = payload.url;
      const response = await fetch(url);
      const body = await response.text();
      const dom = new JSDOM(body);
      const document = dom.window.document;
      const objects = [];
      let imgElements = document.getElementsByClassName("carousel-item");
      // fallback to old slider markup if no carousel items are found
      if (imgElements.length === 0) {
        imgElements = document.getElementsByClassName("slider-box");
      }

      Array.from(imgElements).forEach((imgContainer) => {
        if (imgContainer.classList.contains("h-100")) {
          return;
        }

        const object = {};
        const img = imgContainer.querySelector("img");

        if (img) {
          const urla = imgContainer.querySelector("a");

          object.src = img && (img.getAttribute("data-lazy") || img.getAttribute("data-lazy-src") || img.src);
          object.url = urla ? urla.getAttribute("href") : payload.shortUrl;

          if (object.src && object.src.startsWith("/")) {
            object.src = url + object.src;
          }

          if (object.url && object.url.startsWith("/")) {
            object.url = url + object.url;
          }

          if (object.url && !object.url.startsWith("http") && !object.url.startsWith("www")) {
            object.url = `${url}/${object.url}`;
          }

          if (object.url && object.url.endsWith("/")) {
            object.url = object.url.slice(0, -1);
          }

          if (!object.url) {
            object.url = payload.shortUrl;
          }

          if (object.url.length > payload.maxUrlLength) {
            Log.debug(`URL ${object.url} is too long. Use default URL instead.`);
            object.url = payload.shortUrl;
          }

          if (object.src && object.url) {
            objects.push(object);
          }
        }
      });

      Log.debug(`Fetched new slideshow from ${url} -> ${objects.length} items`, objects);

      const result = {};
      result.identifier = payload.identifier;
      result.objects = objects;
      Log.debug(`Sending SLIDESHOW_DATA for ${payload.identifier} (${url}) with ${objects.length} items`);
      this.sendSocketNotification("SLIDESHOW_DATA", result);
    } catch (error) {
      Log.error("Error fetching slideshow data:", error);
    }
  },

  async fetchMainImage (payload) {
    try {
      const url = payload.url;
      const response = await fetch(url);
      const body = await response.text();
      const dom = new JSDOM(body);
      const document = dom.window.document;
      const objects = [];
      const imgElements = document.getElementsByClassName("et_pb_image_0");

      if (imgElements.length > 0) {
        Array.from(imgElements).forEach((imgContainer) => {
          const object = {};
          const img = imgContainer.querySelector("img");

          if (!img) {
            return;
          }

          object.src = img.getAttribute("data-lazy") || img.getAttribute("data-lazy-src") || img.src;

          if (object.src && object.src.startsWith("http")) {
            object.url = payload.shortUrl;
            objects.push(object);
          }
        });

        const result = {};
        result.identifier = payload.identifier;
        result.objects = objects;

        Log.debug(`Sending SLIDESHOW_DATA (main image) for ${payload.identifier} (${url}) with ${objects.length} items`);
        this.sendSocketNotification("SLIDESHOW_DATA", result);
      }
    } catch (error) {
      Log.error("Error fetching image:", error);
    }
  }
});
