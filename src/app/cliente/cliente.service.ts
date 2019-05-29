import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { Cliente } from './cliente';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private db: AngularFireDatabase) { 
  }

  getAll() {
    return this.db.list('clientes').snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
  }

  save(cliente: Cliente) {
    return this.db.list("clientes").push(cliente)
      // .then(
      //   res => {
      //     cliente.id = res.key;
      //     res.set(cliente);
      //   }
      // );
  }
  remover(key){
   return this.db.list("clientes").remove(key);
  }

  update(key, cliente:Cliente){
    return this.db.list("clientes").update(key, cliente);
  }
  get(key){
    return this.db.list<Cliente>("clientes/"+key).valueChanges();
  }
}
