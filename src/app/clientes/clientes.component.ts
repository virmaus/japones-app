import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    let page = 0;
    this.clienteService
      .getClientes(page).pipe(
        tap(response => {
          console.log('ClienteService: tap 3');
          (response.content as Cliente[]).forEach(cliente => 
            console.log(cliente.nombre));
        })
      )
      .subscribe(response => {
        this.clientes = response.content as Cliente[];
      });
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire('Eliminado!', `Cliente ${cliente.nombre} eliminado correctamente.`, 'success');
          }
        )
      }
    });
  }
}
