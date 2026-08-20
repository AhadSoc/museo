const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = path.join(
  __dirname,
  "public",
  "artworks"
);

const artworks = [
  {
    input: "last-supper-full.jpg",
    output: "last-supper.jpg",
    detail: "last-supper-detail.jpg",
  },

  {
    input: "mona-lisa-full.jpg",
    output: "mona-lisa.jpg",
    detail: "mona-lisa-detail.jpg",
  },

  {
    input: "school-of-athens-full.jpg",
    output: "school-of-athens.jpg",
    detail: "school-of-athens-detail.jpg",
  },

  {
    input: "arnolfini-portrait-full.jpg",
    output: "arnolfini-portrait.jpg",
    detail: "arnolfini-portrait-detail.jpg",
  },

  {
    input: "lady-with-an-ermine-full.jpg",
    output: "lady-with-an-ermine.jpg",
    detail: "lady-with-an-ermine-detail.jpg",
  },

  {
    input: "oath-of-the-horatii-full.jpg",
    output: "oath-of-the-horatii.jpg",
    detail: "oath-of-the-horatii-detail.jpg",
  },

  {
    input: "washington-crossing-the-delaware-full.jpg",
    output: "washington-crossing-the-delaware.jpg",
    detail: "washington-crossing-the-delaware-detail.jpg",
  },

  {
    input: "death-of-socrates-full.jpg",
    output: "death-of-socrates.jpg",
    detail: "death-of-socrates-detail.jpg",
  },

  {
    input: "napoleon-crossing-the-alps-full.jpg",
    output: "napoleon-crossing-the-alps.jpg",
    detail: "napoleon-crossing-the-alps-detail.jpg",
  },

  {
    input: "death-of-marat-full.jpg",
    output: "death-of-marat.jpg",
    detail: "death-of-marat-detail.jpg",
  },

  {
    input: "starry-night-full.jpg",
    output: "starry-night.jpg",
    detail: "starry-night-detail.jpg",
  },

  {
    input: "girl-with-a-pearl-earring-full.jpg",
    output: "girl-with-a-pearl-earring.jpg",
    detail: "girl-with-a-pearl-earring-detail.jpg",
  },

  {
    input: "the-night-watch-full.jpg",
    output: "the-night-watch.jpg",
    detail: "the-night-watch-detail.jpg",
  },

  {
    input: "american-gothic-full.jpg",
    output: "american-gothic.jpg",
    detail: "american-gothic-detail.jpg",
  },

  {
    input: "great-wave-off-kanagawa-full.jpg",
    output: "great-wave-off-kanagawa.jpg",
    detail: "great-wave-off-kanagawa-detail.jpg",
  },

  {
    input: "the-kiss-full.jpg",
    output: "the-kiss.jpg",
    detail: "the-kiss-detail.jpg",
  },

  {
    input: "wanderer-above-the-sea-of-fog-full.jpg",
    output: "wanderer-above-the-sea-of-fog.jpg",
    detail: "wanderer-above-the-sea-of-fog-detail.jpg",
  },

  {
    input: "las-meninas-full.jpg",
    output: "las-meninas.jpg",
    detail: "las-meninas-detail.jpg",
  },

  {
    input: "whistlers-mother-full.jpg",
    output: "whistlers-mother.jpg",
    detail: "whistlers-mother-detail.jpg",
  },

  {
    input: "the-scream-full.jpg",
    output: "the-scream.jpg",
    detail: "the-scream-detail.jpg",
  },

  {
    input: "impression-sunrise-full.jpg",
    output: "impression-sunrise.jpg",
    detail: "impression-sunrise-detail.jpg",
  },

  {
    input: "sunday-afternoon-la-grande-jatte-full.jpg",
    output: "sunday-afternoon-la-grande-jatte.jpg",
    detail: "sunday-afternoon-la-grande-jatte-detail.jpg",
  },

  {
    input: "the-hay-wain-full.jpg",
    output: "the-hay-wain.jpg",
    detail: "the-hay-wain-detail.jpg",
  },

  {
    input: "tower-of-babel-full.jpg",
    output: "tower-of-babel.jpg",
    detail: "tower-of-babel-detail.jpg",
  },
];


async function optimizeImages() {

  console.log("\n");
  console.log("====================================");
  console.log("       🎨 MUSEO IMAGE OPTIMIZER");
  console.log("====================================");
  console.log("\n");


  for (const artwork of artworks) {

    const inputPath = path.join(
      inputFolder,
      artwork.input
    );

    const outputPath = path.join(
      inputFolder,
      artwork.output
    );

    const detailPath = path.join(
      inputFolder,
      artwork.detail
    );


    if (!fs.existsSync(inputPath)) {

      console.log(
        `❌ MISSING: ${artwork.input}`
      );

      console.log(
        "   Make sure the filename is exactly correct.\n"
      );

      continue;
    }


    try {

      console.log(
        `⏳ Optimizing ${artwork.input}...`
      );


      /*
       =====================================
       THUMBNAIL
       =====================================
      */

      await sharp(inputPath)
        .rotate()
        .resize({
          width: 1000,
          height: 1000,
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({
          quality: 78,
          mozjpeg: true,
        })
        .toFile(outputPath);


      /*
       =====================================
       DETAIL IMAGE
       =====================================
      */

      await sharp(inputPath)
        .rotate()
        .resize({
          width: 1800,
          height: 1800,
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({
          quality: 82,
          mozjpeg: true,
        })
        .toFile(detailPath);


      const originalSize =
        fs.statSync(inputPath).size;

      const thumbnailSize =
        fs.statSync(outputPath).size;

      const detailSize =
        fs.statSync(detailPath).size;


      const originalMB =
        originalSize / 1024 / 1024;

      const thumbnailMB =
        thumbnailSize / 1024 / 1024;

      const detailMB =
        detailSize / 1024 / 1024;


      const reduction =
        (
          1 -
          thumbnailSize /
            originalSize
        ) * 100;


      console.log(
        `✅ ${artwork.output}`
      );

      console.log(
        `   Original: ${originalMB.toFixed(2)} MB`
      );

      console.log(
        `   Thumbnail: ${thumbnailMB.toFixed(2)} MB`
      );

      console.log(
        `   Detail: ${detailMB.toFixed(2)} MB`
      );

      console.log(
        `   Reduced: ${reduction.toFixed(1)}%`
      );

      console.log("");

    } catch (error) {

      console.log(
        `❌ ERROR: ${artwork.input}`
      );

      console.error(error);

      console.log("");

    }
  }


  console.log(
    "===================================="
  );

  console.log(
    "✨ OPTIMIZATION COMPLETE"
  );

  console.log(
    "====================================\n"
  );
}


optimizeImages();