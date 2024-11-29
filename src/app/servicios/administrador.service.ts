import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private baseURL = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  // Métodos para listar

  public listarAutos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.baseURL}/autos/listar`);
  }

  public listarHogar(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.baseURL}/hogar/listar`);
  }

  public listarProteccionCredito(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.baseURL}/proteccion-credito/listar`);
  }

  public listarPyme(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.baseURL}/pyme/listar`);
  }

  public listarResponsabilidadCivil(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.baseURL}/responsabilidad-civil/listar`);
  }

  public listarSalud(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.baseURL}/salud/listar`);
  }

  public listarSoat(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.baseURL}/soat/listar`);
  }

  public listarVida(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.baseURL}/vida/listar`);
  }

  public listarPeticiones(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.baseURL}/peticion/listar`);
  }

  // Métodos para eliminar

  public eliminarAuto(placa: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.baseURL}/autos/eliminar/${placa}`);
  }

  public eliminarHogar(cedula: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.baseURL}/hogar/eliminar/${cedula}`);
  }

  public eliminarProteccionCredito(cedula: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.baseURL}/proteccion-credito/eliminar/${cedula}`);
  }

  public eliminarPyme(cedula: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.baseURL}/pyme/eliminar/${cedula}`);
  }

  public eliminarResponsabilidadCivil(cedula: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.baseURL}/responsabilidad-civil/eliminar/${cedula}`);
  }

  public eliminarSalud(cedula: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.baseURL}/salud/eliminar/${cedula}`);
  }

  public eliminarVida(cedula: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.baseURL}/vida/eliminar/${cedula}`);
  }

  public eliminarSoat(placa: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.baseURL}/soat/eliminar/${placa}`);
  }

  public eliminarPeticion(cedula: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.baseURL}/peticion/eliminar/${cedula}`);
  }
}
