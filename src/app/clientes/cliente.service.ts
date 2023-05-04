import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, catchError, throwError } from 'rxjs';
import { map, tap, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndpoint: string = 'http://localhost:8080/api/clientes';

  private HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getClientes(page: number): Observable<any> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
      tap((response: any) => {
        
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map((response:any) => {    
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.createAt = formatDate(
            cliente.createAt,
            'dd-MM-yyyy',
            'en-US'
          );
          return cliente;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach((cliente) => {
          console.log(cliente.nombre);
        });
      })
    );
  }

  create(cliente: Cliente): Observable<any> {
    return this.http
      .post<any>(this.urlEndpoint, cliente, { headers: this.HttpHeaders })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }

          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, {
        headers: this.HttpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }

          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndpoint}/${id}`, {
        headers: this.HttpHeaders,
      })
      .pipe(
        catchError((e) => {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
