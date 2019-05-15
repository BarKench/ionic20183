import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.page.html',
  styleUrls: ['./add-cliente.page.scss'],
})
export class AddClientePage implements OnInit {

  private cliente:Cliente;

  constructor() { }

  ngOnInit() {
    this.cliente = new Cliente;
  }
  onSubmit(form){
    console.log(form);
  }
}
