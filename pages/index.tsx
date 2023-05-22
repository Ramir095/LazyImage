import { Inter } from "next/font/google";
import { LazyImage } from "@/components/LazyImage";
import { useState } from "react";
import { random } from "lodash"
import type { MouseEventHandler } from "react";

const inter = Inter({ subsets: ["latin"] } );

// const number = () => Math.floor(Math.random() * 123) + 1;
// lo refactorizamos usando una libreria llamada lodash
const number = () => random(1, 123); // genera un numero desde el 1 hasta el 123

// generamos un id unico
const generateId = () => Math.random().toString(36).substr(2, 9);

type ImageItem = { id: string; url: string };

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]); // Cómo le decimos al estado con que trabajara? Dentro de GENERICOS podemos modificarlo para indicar que tipos manejará el estado tanto para "images" como para "setImages" => <ImageItem[]> ó array<ImageItem>

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const newImageItem: ImageItem = { // Aclaramos que la objeto debe ser igual a el objeto ImageItem!
      id: generateId(),
      url: `https://randomfox.ca/images/${number()}.jpg`,
    };

    setImages([...images, newImageItem]);
  };

  return (
    <div>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <button onClick={addNewFox} className="bg-gradient-to-l from-cyan-500 to-[#0070f4] text-[white] px-3 py-1 rounded">Add new fox</button>
        {images &&
          images.map(({ id, url }, index) => (
            <figure key={id} className="p-4">
              <LazyImage
                src={url}
                width={500}
                title="Random Fox"
                className="rounded bg-slate-500"
                onClick={() => {
                  console.log("holi!");
                }}
                onLazyLoad={(img) => {
                  console.log(`Image #${index + 1} cargada. Nodo:`, img);
                }}
              />
            </figure>
          ))}
      </main>
    </div>
  );
}
