import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public username: string = "";
  public products: Product[] = [];
  public productsFounds: Product[] = [];
  public filter = [
    "Abarrotes",
    "Frutas y Verduras",
    "Limpieza",
    "Farmacia",
  ];

  public colors = [
    {
      type: "Abarrotes",
      color: "primary"
    },
    {
      type: "Frutas y Verduras",
      color: "secondary"
    },
    {
      type: "Limpieza",
      color: "warning"
    },
    {
      type: "Farmacia",
      color: "danger"
    }
  ];

  constructor(private cartService: CartService, private router: Router, private ProductService: ProductService, public alertController: AlertController, private activateRoute: ActivatedRoute) {
    this.products = this.ProductService.getProducts();
    this.productsFounds = this.products;
    this.activateRoute.paramMap.subscribe(params => {
      const usernameParam = params.get('username');
      if (usernameParam !== null) {
        this.username = usernameParam;
      }
    });
  }
  async presentAlert(i: number) {
    const alert = await this.alertController.create({
      header: '¡ATENCIÓN!',
      message: '¿Deseas eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.ProductService.removeProduct(i);
          }
        }
      ]
    });
    await alert.present();
  }
  public getColor(type: string): string {
    const itemFound = this.colors.find((element) => {
      return element.type === type;
    });
    let color = itemFound && itemFound.color ? itemFound.color : "";
    return color;
  }

  public filterProducts(): void {
    console.log(this.filter);
    this.productsFounds = this.products.filter(
      item => {
        return this.filter.includes(item.type);
      }
    );
  }

  public addToCart(product: Product, i: number) {
    product.photo = product.photo + i;
    this.cartService.addToCart(product);
    console.log(this.cartService.getCart());
  }

  public openAddProductPage() {
    this.router.navigate(['/add-product']);
  }
  public openEditProductPage(product: Product, i: number) {
    this.router.navigate(['/edit-product', product.name, i]);
  }
}
