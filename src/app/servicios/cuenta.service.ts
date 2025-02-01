import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditarCuentaDTO } from '../dto/CuentaDTOs/EditarCuentaDTO';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';
import { Environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private authURL = Environment.BACKEND_URL;

  constructor(private http: HttpClient) { }

  // Método para editar una cuenta
  public editarCuenta(cuentaDTO: EditarCuentaDTO): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(this.authURL, { ...cuentaDTO, action: "updateUser" }, { headers });
  }

  // Método para eliminar una cuenta
  public eliminarCuenta(token: string): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(this.authURL, { token: token, action: "deleteUser" }, { headers });
  }

  // Método para obtener la cuenta por token
  public obtenerCuenta(token: string): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(this.authURL, { token: token, action: "getUser" }, { headers });
  }

}
