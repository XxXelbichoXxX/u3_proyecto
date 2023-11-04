import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];
  public productArray:any[]=[];

  constructor() {
    this.products.push({
      name: "Aguacate",
      price: 100,
      description: "Lorem ipsum dolor sit amet.",
      type: "Frutas y Verduras",
      photo: "https://picsum.photos/500/300?random",
    });
    this.products.push({
      name: "Coca Cola",
      price: 20,
      description: "Lorem ipsum dolor sit amet.",
      type: "Abarrotes",
      photo: "https://picsum.photos/500/300?random"
    });
    this.products.push({
      name: "Jabón Zote",
      price: 40,
      description: "Lorem ipsum dolor sit amet.",
      type: "Limpieza",
      photo: "https://picsum.photos/500/300?random"
    });
    this.products.push({
      name: "Aspirina",
      price: 50,
      description: "Lorem ipsum dolor sit amet.",
      type: "Farmacia",
      photo: "https://picsum.photos/500/300?random"
    });
   }

   public getProducts():Product[]{
     return this.products;
   }
   

   public addProduct(product:Product):Product[]{
     this.products.push(product);
     return this.products;
   }

   public removeProduct(pos:number):Product[]{
     this.products.splice(pos,1);
     return this.products;
   }

   public updateProduct(pos:number, product:Product):Product[]{
     this.products[pos] = product;
     return this.products;
   }
}
