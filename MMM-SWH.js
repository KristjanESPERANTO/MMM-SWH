/* global Log Module*/

Module.register("MMM-SWH", {
  defaults: {
    updateInterval: 60 * 60 * 1000,
    slideInterval: 15 * 1000,
    url: "https://swh.de",
    shortUrl: "www.swh.de",
    maxUrlLength: 50,
    header: "MMM-SWH",
    showHeader: false
  },

  start () {
    Log.info(`Starting module: ${this.name} with identifier: ${this.identifier}`);
    this.images = [];
    this.currentIndex = 0;
    this.getData();

    setInterval(() => {
      this.getData();
    }, this.config.updateInterval);
  },

  getData () {
    const options = {
      identifier: this.identifier,
      url: this.config.url,
      shortUrl: this.config.shortUrl,
      maxUrlLength: this.config.maxUrlLength
    };
    this.sendSocketNotification("GET_SLIDESHOW_DATA", options);
  },

  socketNotificationReceived (notification, payload) {
    if (notification === "SLIDESHOW_DATA") {
      if (payload.identifier === this.identifier) {
        this.images = payload.objects;
        this.updateDom();
        this.startSlideshow();
      }
    }
  },

  startSlideshow () {
    if (this.images.length > 0) {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateDom();
      }, this.config.slideInterval);
    }
  },

  getDom () {
    const wrapper = document.createElement("div");

    this.headingElement = document.createElement("header");
    this.headingElement.innerHTML = this.config.header;

    wrapper.className = "slideshow-container";

    if (this.images.length > 0) {
      const img = document.createElement("img");
      img.classList.add("mmm-swh-img");
      img.src = this.images[this.currentIndex].src;

      const moreInfo = document.createElement("div");
      moreInfo.classList.add("mmm-swh-moreInfo");
      moreInfo.innerText = "Mehr Informationen unter: ";

      const url = document.createElement("div");
      url.classList.add("mmm-swh-url");
      url.innerText = this.images[this.currentIndex].url;

      if (this.config.showHeader) {
        wrapper.appendChild(this.headingElement);
      }
      wrapper.appendChild(img);
      wrapper.appendChild(moreInfo);
      wrapper.appendChild(url);
    } else {
      wrapper.innerHTML = "Keine Bilder verfügbar";
    }

    return wrapper;
  },

  getStyles () {
    return ["MMM-SWH.css"];
  }
});
