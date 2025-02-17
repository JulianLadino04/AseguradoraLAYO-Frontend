import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';
import { Environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private baseURL = Environment.BACKEND_URL;

  constructor(private http: HttpClient) { }

  // Métodos para listar

  public listarAutos(token: string): Observable<MensajeDTO> {
    return this.listarPorTipo(token, 0);
  }

  public listarHogar(token: string): Observable<MensajeDTO> {
    return this.listarPorTipo(token, 1);
  }

  private listarPorTipo(token: string, tipo: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(`${this.baseURL}`, { token: token, action: "getSegurosByTipo", tipo: tipo }, { headers: headers });
  }

  public listarProteccionCredito(token: string): Observable<MensajeDTO> {
    return this.listarPorTipo(token, 2);
  }

  public listarPyme(token: string): Observable<MensajeDTO> {
    return this.listarPorTipo(token, 3);
  }

  public listarResponsabilidadCivil(token: string): Observable<MensajeDTO> {
    return this.listarPorTipo(token, 4);
  }

  public listarSalud(token: string): Observable<MensajeDTO> {
    return this.listarPorTipo(token, 5);
  }

  public listarSoat(token: string): Observable<MensajeDTO> {
    return this.listarPorTipo(token, 7);
  }

  public listarVida(token: string): Observable<MensajeDTO> {
    return this.listarPorTipo(token, 6);
  }

  public listarPeticiones(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.baseURL}/peticion/listar`);
  }

  public listarAfiliaciones(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.baseURL}/afiliaciones/listar`);
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

  public eliminarAfiliacion(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.baseURL}/afiliaciones/eliminar/${id}`);
  }
}
