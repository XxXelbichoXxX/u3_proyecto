import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  public loginForm: FormGroup;


  constructor(public formBuilder: FormBuilder, public router: Router, public loginService: LoginService, public toastController: ToastController) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  public async login() {
    const user = this.loginForm.value;
    if (this.loginService.validateUser(user)) {
      this.router.navigate(['/tabs/tab1']);
    }
    else{
        const toast = await this.toastController.create({
        message: 'Credenciales Incorrectas',
        duration: 2000,
        position: 'bottom'
      })
      toast.present();
      this.loginForm.reset();
    }
  }

}
