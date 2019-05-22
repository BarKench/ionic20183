import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor (private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list<Cliente[]>("clientes").valueChanges();
  }
  save(cliente:Cliente){
    return this.db.list("clientes").push(cliente);
  }
}
