import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  public index:any;
  public name: any;
  public product: Product[]=[];
  public price: number=0;
  public description?: string="";
  public type: string="";
  public photo: string="";

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastController: ToastController,
    private router: Router, 
    private activateRoute: ActivatedRoute
  ) {
  }


  ngOnInit() {
    this.name = this.activateRoute.snapshot.paramMap.get('name');
    this.index = this.activateRoute.snapshot.paramMap.get('i');
    this.product= this.productService.getProducts();

    this.name = this.product[this.index].name;
    this.price = this.product[this.index].price;
    this.description = this.product[this.index].description;
    this.type = this.product[this.index].type;
    this.photo = this.product[  this.index].photo;
  }

  async guardarCambios() {
    // Aquí puedes actualizar el objeto product con los valores editados
    // Por ejemplo:
    const editedProduct = {
      name: this.name,
      price: this.price,
      description: this.description,
      type: this.type,
      photo: this.photo,
    };
    // Luego, puedes enviar editedProduct al servicio o realizar las operaciones necesarias.
    this.productService.updateProduct(this.index,editedProduct);
    const toast = await this.toastController.create({
      message: 'Producto Añadido',
      duration: 2000,
      position: 'top'
    });
    toast.present();
    this.router.navigate(['/tabs/tab1']);
  }
}
