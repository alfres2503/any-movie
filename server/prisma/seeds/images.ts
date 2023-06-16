import fs from "fs"; //sirve para leer el contenido de un archivo de imagen en bytes y luego se almacena en la base de datos.

export const images = [
  {
    id_product: 1,
    image: fs.readFileSync("IMAGES/prod1img1.jpg"),
  },
  {
    id_product: 1,
    image: fs.readFileSync("IMAGES/prod1img2.jpg"),
  },
  {
    id_product: 2,
    image: fs.readFileSync("IMAGES/prod2img1.jpg"),
  },
  {
    id_product: 3,
    image: fs.readFileSync("IMAGES/prod3img1.jpg"),
  },
  {
    id_product: 3,
    image: fs.readFileSync("IMAGES/prod3img2.jpg"),
  },
];

/* model image {
id         Int     @id @default(autoincrement())
id_product Int
image      Bytes
product    product @relation(fields: [id_product], references: [id])
}*/
