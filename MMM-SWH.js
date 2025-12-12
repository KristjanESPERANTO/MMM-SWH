/* global Log Module*/

const companies = {
  bäder: {shortUrl: "www.baden-in-halle.de", url: "https://baden-in-halle.de", header: "Bäder Halle"},
  evh: {shortUrl: "www.evh.de", url: "https://evh.de", header: "Energieversorgung Halle"},
  hafen: {shortUrl: "www.ct-hs.de", url: "https://ct-hs.de", header: "Container Terminal Halle (Saale)"},
  havag: {shortUrl: "www.havag.com", url: "https://havag.com", header: "Hallesche Verkehrs-AG"},
  hws: {shortUrl: "www.hws-halle.de", url: "https://hws-halle.de", header: "Hallesche Wasser und Stadtwirtschaft"},
  itc: {shortUrl: "www.itc-halle.de", url: "https://itc-halle.de", header: "IT-Consult Halle"},
  "maya mare": {shortUrl: "www.mayamare.de", url: "https://mayamare.de", header: "Maya mare"},
  "netz halle": {shortUrl: "www.netzhalle.de", url: "https://netzhalle.de", header: "NETZ HALLE"},
  swh: {shortUrl: "www.swh.de", url: "https://swh.de", header: "Stadtwerke Halle"}
};

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
    const companyKey = this.config.company?.toLowerCase() || "swh";
    const companyData = companies[companyKey] || companies.swh;

    this.shortUrl = this.config.shortUrl || companyData.shortUrl;
    this.url = this.config.url || companyData.url;
    this.header = this.config.header || companyData.header;

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
