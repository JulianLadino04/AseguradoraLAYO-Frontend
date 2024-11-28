import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';
import { EditarCuentaDTO } from '../dto/CuentaDTOs/EditarCuentaDTO';
import { InformacionCuentaDTO } from '../dto/CuentaDTOs/InformacionCuentaDTO';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private authURL = "http://localhost:8080/api/cuenta";

  constructor(private http: HttpClient) { }

  // Método para editar una cuenta
  public editarCuenta(cuentaDTO: EditarCuentaDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.authURL}/editar-perfil`, cuentaDTO);
  }

  // Método para eliminar una cuenta
  public eliminarCuenta(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.authURL}/eliminar/${id}`);
  }

  // Método para obtener la cuenta por ID
  public obtenerCuentaPorId(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/obtener/${id}`);
  }

}
