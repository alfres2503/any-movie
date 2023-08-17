import fs from "fs";

export const images = [
  {
    id_product: 1,
    image: Buffer.from(fs.readFileSync("IMAGES/prod1img1.jpg")).toString(
      "base64"
    ),
  },
  {
    id_product: 1,
    image: Buffer.from(fs.readFileSync("IMAGES/prod1img2.jpg")).toString(
      "base64"
    ),
  },
  {
    id_product: 2,
    image: Buffer.from(fs.readFileSync("IMAGES/prod2img1.jpg")).toString(
      "base64"
    ),
  },
  {
    id_product: 3,
    image: Buffer.from(fs.readFileSync("IMAGES/prod3img1.jpg")).toString(
      "base64"
    ),
  },
  {
    id_product: 4,
    image: Buffer.from(fs.readFileSync("IMAGES/prod4img1.jpg")).toString(
      "base64"
    ),
  },
];
