import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { Servico } from '../servico';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-add-servico',
  templateUrl: './add-servico.page.html',
  styleUrls: ['./add-servico.page.scss'],
})
export class AddServicoPage implements OnInit {

  private servico: Servico;
  private id = null;
  

  constructor(
    private servicoService: ServicoService,
    public alertController: AlertController,
    private router:Router,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.servico = new Servico;
    this.id = this.activeRouter.snapshot.paramMap.get("id");
    if (this.id != null) {
      this.edit(this.id);
    } else {
      this.id = null;
    }
  }

  onSubmit(form) {
    if (this.id == null) {
      this.servicoService.save(this.servico)
        .then(
          res => {
            this.presentAlert("Aviso", this.servico.id + ". Já tá salvo!");
            form.reset();
            this.servico = new Servico;
            this.router.navigate(['/tabs/tab3']);
          },
          err => {
            this.presentAlert("Erro!!!", "Ops!! Deu erro ao salvar!" + err);
          }
        )
    } else {
      this.servicoService.update(this.id, this.servico)
        .then(
          res => {
            this.id = null;
            this.presentAlert("Aviso", this.servico.id + ". Foi atualizado!");
            form.reset();
            this.servico = new Servico;
            this.router.navigate(['/tabs/tab3']);
          },
          err => {
            this.presentAlert("Erro!!!", "Ops!! Deu erro na atualização!" + err);
          }
        );
    }
  }
  edit(key) {
    this.servicoService.get(key)
      .subscribe(
        res => {
          this.servico = res;
          //console.log(res);
        },
        err => {
          console.log(err);
        }
      );
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
