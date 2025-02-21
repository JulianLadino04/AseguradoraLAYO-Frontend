import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';
import { CrearCotizacionHogarDTO } from '../dto/HogarDTOs/CrearCotizacionHogarDTO';
import { CrearCotizacionPymeDTO } from '../dto/PymeDTOs/CrearCotizacionPymeDTO';
import { CrearCotizacionSaludDTO } from '../dto/SaludDTOs/CrearCotizacionSaludDTO';
import { CrearCotizacionVidaDTO } from '../dto/VidaDTOs/CrearCotizacionVidaDTO';
import { CrearSoatDTO } from '../dto/SoatDTOs/CrearSoatDTO';
import { CrearCotizacionAutoDTO } from '../dto/AutoDTOs/CrearCotizacionAutoDTO';
import { CrearCotizacionProteccionCreditoDTO } from '../dto/ProteccionCreditoDTOs/CrearCotizacionProteccionCreditoDTO';
import { CrearCotizacionResponsabilidadCivilDTO } from '../dto/ResponsabillidadCivilDTOs/CrearCotizacionResponsabilidadCivilDTO';
import { CrearPeticionDTO } from '../dto/PeticionDTOs/CrearPeticionDTO';
import { CrearAfiliacionDTO } from '../dto/AfiliacionesDTOs/CrearAfiliacionDTO';
import { Environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseURL = Environment.BACKEND_URL;

  constructor(private http: HttpClient) { }

  // Crear Cotización para Autos
  public crearCotizacionAuto(cotizacionAutoDTO: CrearCotizacionAutoDTO, token: string): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(`${this.baseURL}`, { ...cotizacionAutoDTO, token: token, action: "addSeguro", tipoSeguro: 0 }, { headers: headers });
  }

  // Crear Cotización para Hogar
  public crearCotizacionHogar(cotizacionHogarDTO: CrearCotizacionHogarDTO, token: string): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(`${this.baseURL}`, { ...cotizacionHogarDTO, token: token, action: "addSeguro", tipoSeguro: 1 }, { headers: headers });
  }

  // Crear Cotización para Protección de Crédito
  public crearCotizacionProteccionCredito(cotizacionProteccionDTO: CrearCotizacionProteccionCreditoDTO, token: string): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(`${this.baseURL}`, { ...cotizacionProteccionDTO, token: token, action: "addSeguro", tipoSeguro: 2 }, { headers: headers });
  }

  // Crear Cotización para Pyme
  public crearCotizacionPyme(cotizacionPymeDTO: CrearCotizacionPymeDTO, token: string): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(`${this.baseURL}`, { ...cotizacionPymeDTO, token: token, action: "addSeguro", tipoSeguro: 3 }, { headers: headers });
  }

  // Crear Cotización para Responsabilidad Civil
  public crearCotizacionResponsabilidadCivil(cotizacionResponsabilidadCivilDTO: CrearCotizacionResponsabilidadCivilDTO, token: string): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(`${this.baseURL}`, { ...cotizacionResponsabilidadCivilDTO, token: token, action: "addSeguro", tipoSeguro: 4 }, { headers: headers });
  }

  // Crear Cotización para Salud
  public crearCotizacionSalud(cotizacionSaludDTO: CrearCotizacionSaludDTO, token: string): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(`${this.baseURL}`, { ...cotizacionSaludDTO, token: token, action: "addSeguro", tipoSeguro: 5 }, { headers: headers });
  }

  // Crear Cotización para Vida
  public crearCotizacionVida(cotizacionVidaDTO: CrearCotizacionVidaDTO, token: string): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(`${this.baseURL}`, { ...cotizacionVidaDTO, token: token, action: "addSeguro", tipoSeguro: 6 }, { headers: headers });
  }

  // Crear Cotización para Soat
  public crearCotizacionSoat(soatDTO: CrearSoatDTO, token: string): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(`${this.baseURL}`, { ...soatDTO, token: token, action: "addSeguro", tipoSeguro: 7 }, { headers: headers });
  }

  // Crear Peticion
  public crearPeticion(peticionDTO: CrearPeticionDTO, token: string): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(`${this.baseURL}`, { ...peticionDTO, token: token, action: "crearPeticion" }, { headers: headers });
  }

  // Crear Afiliación
  public crearAfiliacion(afiliacionDTO: CrearAfiliacionDTO, token: string): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(`${this.baseURL}`, { ...afiliacionDTO, token: token, action: "crearAfiliacionTraslado" }, { headers: headers });
  }

}
