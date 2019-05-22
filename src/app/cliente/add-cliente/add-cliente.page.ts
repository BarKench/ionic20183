import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { AlertController } from '@ionic/angular';

import {Router} from '@angular/router'

import { ClienteService } from '../cliente.service'

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.page.html',
  styleUrls: ['./add-cliente.page.scss'],
})
export class AddClientePage implements OnInit {

  private cliente: Cliente;
  private pws: Cliente;
  private c: Cliente;


  constructor(private clienteService: ClienteService, public alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.cliente = new Cliente;
  }
  onSubmit(form) {
    this.clienteService.save(this.cliente).then(
      res => {
        this.presentAlert("Aviso",this.cliente.nome +", você se cadastrou com sucesso!");
        form.reset();
        this.cliente = new Cliente;
        this.router.navigate(['/tabs/tab2'])
      },
      err => {
        this.presentAlert("Erro", "Erro ao cadastrar" + err);
      }
    )
  }
  async presentAlert(titulo:string, texto:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: texto,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
