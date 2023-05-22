// Acá vienen cada una de las funciones y types que quiero que typeScript cargue para lodash
declare module "lodash"{ // existe modulo llamada lodash
  export function random(lower: number, upper: number): number;
}