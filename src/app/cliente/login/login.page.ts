import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email: string = null;
  private pws: string = null;

  constructor(public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }
  onSubmit(form) {
    this.login();
  }
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws)
     .then(
       res => {
         console.log(res);
       }
       , 
       err =>{
         console.log("Usuario não localizado" + err);
       }
     ).catch(
       err => {
         console.log("Erro ao conectar");''
       }
     )
}
}
