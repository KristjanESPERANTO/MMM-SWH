/* global Log Module*/

Module.register("MMM-SWH", {
  defaults: {
    updateInterval: 60 * 60 * 1000,
    slideInterval: 15 * 1000,
    maxUrlLength: 45,
    showHeader: true,
    showMoreInfo: true,
    animationSpeed: 1500 // Refresh animation speed in milliseconds
  },

  start () {
    Log.info(`Starting module: ${this.name} with identifier: ${this.identifier}`);
    this.config.company = this.config.company.toLowerCase();
    switch (this.config.company) {
      case "bäder":
        this.shortUrl = this.config.shortUrl ? this.config.shortUrl : "www.baden-in-halle.de";
        this.url = this.config.url ? this.config.url : "https://baden-in-halle.de";
        this.header = this.config.header ? this.config.header : "Bäder Halle";
        break;
      case "evh":
        this.shortUrl = this.config.shortUrl ? this.config.shortUrl : "www.evh.de";
        this.url = this.config.url ? this.config.url : "https://evh.de";
        this.header = this.config.header ? this.config.header : "Energieversorgung Halle";
        break;
      case "hafen":
        this.shortUrl = this.config.shortUrl ? this.config.shortUrl : "www.ct-hs.de";
        this.url = this.config.url ? this.config.url : "https://ct-hs.de";
        this.header = this.config.header ? this.config.header : "Container Terminal Halle (Saale)";
        break;
      case "havag":
        this.shortUrl = this.config.shortUrl ? this.config.shortUrl : "www.havag.com";
        this.url = this.config.url ? this.config.url : "https://havag.com";
        this.header = this.config.header ? this.config.header : "Hallesche Verkehrs-AG";
        break;
      case "hws":
        this.shortUrl = this.config.shortUrl ? this.config.shortUrl : "www.hws-halle.de";
        this.url = this.config.url ? this.config.url : "https://hws-halle.de";
        this.header = this.config.header ? this.config.header : "Hallesche Wasser und Stadtwirtschaft";
        break;
      case "itc":
        this.shortUrl = this.config.shortUrl ? this.config.shortUrl : "www.itc-halle.de";
        this.url = this.config.url ? this.config.url : "https://itc-halle.de";
        this.header = this.config.header ? this.config.header : "IT-Consult Halle";
        break;
      case "maya mare":
        this.shortUrl = this.config.shortUrl ? this.config.shortUrl : "www.mayamare.de";
        this.url = this.config.url ? this.config.url : "https://mayamare.de";
        this.header = this.config.header ? this.config.header : "Maya mare";
        break;
      case "netz halle":
        this.shortUrl = this.config.shortUrl ? this.config.shortUrl : "www.netzhalle.de";
        this.url = this.config.url ? this.config.url : "https://netzhalle.de";
        this.header = this.config.header ? this.config.header : "NETZ HALLE";
        break;
      default:
        this.company = "swh";
        this.shortUrl = this.config.shortUrl ? this.config.shortUrl : "www.swh.de";
        this.url = this.config.url ? this.config.url : "https://swh.de";
        this.header = this.config.header ? this.config.header : "Stadtwerke Halle";
        break;
    }

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
      url: this.url,
      shortUrl: this.shortUrl,
      maxUrlLength: this.config.maxUrlLength
    };
    if (this.header === "Maya mare") {
      this.sendSocketNotification("GET_MAIN_IMAGE", options);
    } else if (this.header === "Bäder Halle") {
      this.sendSocketNotification("GET_NEW_SLIDESHOW_DATA", options);
    } else {
      this.sendSocketNotification("GET_SLIDESHOW_DATA", options);
    }
  },

  socketNotificationReceived (notification, payload) {
    if (notification === "SLIDESHOW_DATA") {
      if (payload.identifier === this.identifier) {
        this.images = payload.objects;
        this.updateDom(this.config.animationSpeed);

        if (this.images.length > 1 && !this.slideshowInterval) {
          this.startSlideshow();
        }
      }
    }
  },

  startSlideshow () {
    this.slideshowInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.updateDom(this.config.animationSpeed);
    }, this.config.slideInterval);
  },

  getDom () {
    const wrapper = document.createElement("div");

    this.headingElement = document.createElement("header");
    this.headingElement.innerHTML = this.header;

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

      if (this.config.showMoreInfo) {
        wrapper.appendChild(moreInfo);
        wrapper.appendChild(url);
      }
    } else {
      wrapper.innerHTML = "Lade ...";
    }

    return wrapper;
  },

  getStyles () {
    return ["MMM-SWH.css"];
  }
});
