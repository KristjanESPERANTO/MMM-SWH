/* eslint-disable no-console */
/* eslint-disable id-length */
/* eslint-disable max-statements */
const {JSDOM} = require("jsdom");
const fetch = global.fetch;

const sites = [
  {name: "bäder", url: "https://baden-in-halle.de"},
  {name: "evh", url: "https://evh.de"},
  {name: "hafen", url: "https://ct-hs.de"},
  {name: "havag", url: "https://havag.com"},
  {name: "hws", url: "https://hws-halle.de"},
  {name: "itc", url: "https://itc-halle.de"},
  {name: "maya mare", url: "https://mayamare.de"},
  {name: "netz halle", url: "https://netzhalle.de"},
  {name: "swh", url: "https://swh.de"}
];

// ANSI colors for terminal output
const colors = {
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m"
};

async function checkSite (site) {
  try {
    const r = await fetch(site.url, {redirect: "follow"});
    const text = await r.text();
    const dom = new JSDOM(text);
    const d = dom.window.document;

    const sliderBox = d.getElementsByClassName("slider-box").length;
    const carouselItem = d.getElementsByClassName("carousel-item").length;
    const etImage = d.getElementsByClassName("et_pb_image_0").length;

    // Determine detected pattern
    let pattern = "";
    let status = "";
    if (sliderBox > 0) {
      pattern = "slider-box (alt)";
      status = `${colors.green}✓${colors.reset}`;
    } else if (carouselItem > 0) {
      pattern = "carousel-item (neu)";
      status = `${colors.green}✓${colors.reset}`;
    } else if (etImage > 0) {
      pattern = "et_pb_image_0 (maya)";
      status = `${colors.green}✓${colors.reset}`;
    } else {
      pattern = "KEINS GEFUNDEN";
      status = `${colors.red}✗${colors.reset}`;
    }

    const total = sliderBox + carouselItem + etImage;

    return {
      name: site.name,
      url: site.url,
      sliderBox,
      carouselItem,
      etImage,
      total,
      pattern,
      status,
      error: null
    };
  } catch (e) {
    return {
      name: site.name,
      url: site.url,
      sliderBox: 0,
      carouselItem: 0,
      etImage: 0,
      total: 0,
      pattern: "FEHLER",
      status: `${colors.red}✗${colors.reset}`,
      error: e.message
    };
  }
}

function printTable (results) {
  // Simplified column-less output for better terminal compatibility
  const sep = colors.dim + "─".repeat(70) + colors.reset;

  console.log("");
  console.log(`${colors.bold}${colors.cyan}MMM-SWH Site Pattern Checker${colors.reset}`);
  console.log(sep);
  console.log("");

  for (const r of results) {
    const statusIcon = r.total > 0 && !r.error ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;

    // Pattern coloring
    let patternStr;
    if (r.error) {
      patternStr = `${colors.red}FEHLER: ${r.error}${colors.reset}`;
    } else if (r.pattern === "KEINS GEFUNDEN") {
      patternStr = `${colors.red}${r.pattern}${colors.reset}`;
    } else {
      patternStr = `${colors.green}${r.pattern}${colors.reset}`;
    }

    console.log(`${statusIcon} ${colors.bold}${r.name.padEnd(12)}${colors.reset} ${colors.dim}${r.url}${colors.reset}`);
    console.log(`   Muster: ${patternStr}`);

    const counts = [];
    if (r.sliderBox > 0) {
      counts.push(`slider-box: ${colors.green}${r.sliderBox}${colors.reset}`);
    }
    if (r.carouselItem > 0) {
      counts.push(`carousel-item: ${colors.green}${r.carouselItem}${colors.reset}`);
    }
    if (r.etImage > 0) {
      counts.push(`et_pb_image_0: ${colors.green}${r.etImage}${colors.reset}`);
    }
    if (counts.length === 0) {
      counts.push(`${colors.dim}keine Elemente gefunden${colors.reset}`);
    }

    console.log(`   Gefunden: ${counts.join(", ")}`);
    console.log("");
  }

  console.log(sep);

  // Summary
  const working = results.filter((r) => r.total > 0 && !r.error).length;
  const broken = results.filter((r) => r.total === 0 || r.error).length;
  console.log(`${colors.green}✓ Funktioniert: ${working}${colors.reset}  ${colors.red}✗ Nicht erkannt: ${broken}${colors.reset}`);
  console.log("");
}

(async () => {
  console.log(`${colors.dim}Lade Seiten...${colors.reset}`);
  const results = [];

  for (const s of sites) {
    const result = await checkSite(s);
    results.push(result);
    process.stdout.write(`${colors.dim}.${colors.reset}`);
  }
  console.log("");

  printTable(results);
})();
