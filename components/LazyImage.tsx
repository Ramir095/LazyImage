import { useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from "react";

// propiedades que recibimos del componente padre. LazyImageProps, ImageNative y Props son types de typeScript y va con mayuscula. Se puede usar un Type o "Interface"
type LazyImageProps = { 
  src: string
  onLazyLoad?: (img: HTMLImageElement) => void // reto
};
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNative; // unificamos los tipos para usarlos desde un unico Props

export const LazyImage = ({ src, onLazyLoad, ...imgProps }: Props): JSX.Element => { // aclaramos que va a DEVOLVER react => osea un : JSX.ELEMENT
  // con imgProps estoy diciendo que todo las props que vengan aparte de los ya desestrucurados guardalos en imgProps
  const node = useRef<HTMLImageElement>(null); // Lo inicializamos en null ya que el tipo de dato que useRef() devuelve por defecto es UNDEFINED, mientras que el elemento <img> solo acepta referencias de tipo null cuando no estan asignadas > Clase 9 uso de referencias.
  const [currentSrc, setCurrentSrc] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  ); // imagen de 320x320 que es transparente

  useEffect(() => {
    // 1) creamos un nuevo observador utilizando la web api y lo configuramos para que cada vez que haya una intersección haga un console.log
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !node.current) {
          return;
        }
        setCurrentSrc(src);
        if (typeof onLazyLoad === "function") {
          onLazyLoad(node.current);
        }
      });
    });

    // 2) aseguramos que el observador esta observando nuestro nodo
    if (node.current) {
      observer.observe(node.current);
    }

    // 3) desconectar de nuestro componente al momento que react retire nuestro componente o haya un reenderizado
    return () => {
      observer.disconnect();
    };
  }, [src, onLazyLoad]);

  return (
    <img
      ref={node}
      src={currentSrc}
      alt="imagen del zorro"
      {...imgProps}
    />
  );
};

//  import type { FunctionComponent, FC } from 'react' importaciones de tipos que se necesataban cuando se iniciaba con typescript anteriormente

//-------------------------------------------------------------------------

// FORMA IMPLICITA
// export const LazyImage = () => {
//   return (
//     <div>LazyImage</div>
//   )
// }

//-------------------------------------------------------------------------

// Pregunta de entrevista: El codigo de la linea 12 es typeScript o js? Es typeScript, un superset de js, es decir que typeScript esta por encima a js

// OPCIONES ANTIGUAS
// export const LazyImage: FunctionComponent = () => {
//   return (
//     <div>LazyImage</div>
//   )
// }

// export const LazyImage: FC = () => {
//   return (
//     <div>LazyImage</div>
//   )
// }
