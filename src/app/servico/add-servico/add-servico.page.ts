import { Component, OnInit } from '@angular/core';
import { Servico } from '../servico';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router'
import { ServicoService } from '../servico.service'


@Component({
  selector: 'app-add-servico',
  templateUrl: './add-servico.page.html',
  styleUrls: ['./add-servico.page.scss'],
})
export class AddServicoPage implements OnInit {
  private servico: Servico;

  constructor(private servicoService: ServicoService, public alertController: AlertController, private router: Router ) { }

  ngOnInit() {
    this.servico = new Servico;
  }
  onSubmit(form) {
    this.servicoService.save(this.servico).then(
      res => {
        this.presentAlert("Aviso",this.servico.nome +", você se cadastrou com sucesso!");
        form.reset();
        this.servico = new Servico;
        this.router.navigate(['/tabs/tab3'])
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
