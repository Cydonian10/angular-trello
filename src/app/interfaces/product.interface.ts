export interface IProduct {
  id:number,
  description:string,
  images:string[],
  price:500,
  title:string,
  category:ICategory
}

export interface ICategory {
  id:number,
  name:string,
  image:string
}