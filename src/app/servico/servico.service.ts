import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Servico } from './servico';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor (private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list<Servico[]>("servicos").valueChanges();
  }
  save(servico:Servico){
    return this.db.list("servicos").push(servico);
  }
}
