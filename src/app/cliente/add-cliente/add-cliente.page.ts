import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';


import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.page.html',
  styleUrls: ['./add-cliente.page.scss'],
})
export class AddClientePage implements OnInit {

  private cliente: Cliente;

  constructor(
    private clienteService: ClienteService,
    public alertController: AlertController,
    private router:Router,
    private activeRouter: ActivatedRoute
  ) {
   
   }

  ngOnInit() {
    this.cliente = new Cliente;
    this.cliente.id = this.activeRouter.snapshot.paramMap.get("id");
    if(this.cliente.id != null){
      this.edit(this.cliente.id);
    }
  }

  onSubmit(form) {
    this.clienteService.save(this.cliente)
      .then(
        res => {
          this.presentAlert("Aviso", this.cliente.nome + ". Já tá salvo!");
          console.log(this.cliente);
          form.reset();
          this.cliente = new Cliente;
          this.router.navigate(['/tabs/tab2']);
        },
        err => {
          this.presentAlert("Erro!!!", "Ops!! Deu erro!" + err);
        }
      );
  }

  edit(key){
    this.clienteService.get(key)
    .subscribe(
      res=>{
        this.cliente = res[0];
        this.cliente = key;
      }
    )
  }

  //Alertas ----------------------------------------------
  async presentAlert(titulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }
  
}
