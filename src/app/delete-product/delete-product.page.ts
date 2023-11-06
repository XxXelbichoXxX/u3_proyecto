import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.page.html',
  styleUrls: ['./delete-product.page.scss'],
})
export class DeleteProductPage implements OnInit {
  public index:any;
  constructor(private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.index = this.activateRoute.snapshot.paramMap.get('i');
  }

  async borrar(){
    this.productService.removeProduct(this.index);
    const toast = await this.toastController.create({
      message: 'Producto Borrado',
      duration: 2000,
      position: 'top'
    });
    toast.present();
    this.router.navigate(['/tabs/tab1']);
  }

  cancelar(){
    this.router.navigate(['/tabs/tab1']);
  }

}
