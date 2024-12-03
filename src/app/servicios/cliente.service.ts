import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';
import { CrearCotizacionHogarDTO } from '../dto/HogarDTOs/CrearCotizacionHogarDTO';
import { CrearCotizacionPymeDTO } from '../dto/PymeDTOs/CrearCotizacionPymeDTO';
import { CrearCotizacionSaludDTO } from '../dto/SaludDTOs/CrearCotizacionSaludDTO';
import { CrearCotizacionVidaDTO } from '../dto/VidaDTOs/CrearCotizacionVidaDTO';
import { CrearSoatDTO } from '../dto/SoatDTOs/CrearSoatDTO';
import { CrearCotizacionAutoDTO } from '../dto/AutoDTOs/CrearCotizacionAutoDTO';
import { CrearCotizacionProteccionCreditoDTO } from '../dto/ProteccionCreditoDTOs/ObtenerProteccionCreditoDTO';
import { CrearCotizacionResponsabilidadCivilDTO } from '../dto/ResponsabillidadCivilDTOs/CrearCotizacionResponsabilidadCivilDTO';
import { CrearPeticionDTO } from '../dto/PeticionDTOs/CrearPeticionDTO';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseURL = 'http://localhost:8080/api/cliente';

  constructor(private http: HttpClient) { }

  // Crear Cotización para Autos
  public crearCotizacionAuto(cotizacionAutoDTO: CrearCotizacionAutoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.baseURL}/autos/cotizar`, cotizacionAutoDTO);
  }

  // Crear Cotización para Hogar
  public crearCotizacionHogar(cotizacionHogarDTO: CrearCotizacionHogarDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.baseURL}/hogar/cotizar`, cotizacionHogarDTO);
  }

  // Crear Cotización para Protección de Crédito
  public crearCotizacionProteccionCredito(cotizacionProteccionDTO: CrearCotizacionProteccionCreditoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.baseURL}/proteccion-credito/cotizar`, cotizacionProteccionDTO);
  }

  // Crear Cotización para Pyme
  public crearCotizacionPyme(cotizacionPymeDTO: CrearCotizacionPymeDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.baseURL}/pyme/cotizar`, cotizacionPymeDTO);
  }

  // Crear Cotización para Responsabilidad Civil
  public crearCotizacionResponsabilidadCivil(cotizacionResponsabilidadCivilDTO: CrearCotizacionResponsabilidadCivilDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.baseURL}/responsabilidad-civil/cotizar`, cotizacionResponsabilidadCivilDTO);
  }

  // Crear Cotización para Salud
  public crearCotizacionSalud(cotizacionSaludDTO: CrearCotizacionSaludDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.baseURL}/salud/cotizar`, cotizacionSaludDTO);
  }

  // Crear Cotización para Vida
  public crearCotizacionVida(cotizacionVidaDTO: CrearCotizacionVidaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.baseURL}/vida/cotizar`, cotizacionVidaDTO);
  }

  // Crear Cotización para Soat
  public crearCotizacionSoat(soatDTO: CrearSoatDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.baseURL}/soat/cotizar`, soatDTO);
  }

  // Crear Peticion
  public crearPeticion(peticionDTO: CrearPeticionDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.baseURL}/peticion/crear`, peticionDTO);
  }
  public obtenerEnumsAseguradora(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.baseURL}/aseguradoras`);
  }
  
  public obtenerEnumsTipoVehiculo(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.baseURL}/tipos-vehiculo`);
  }
  
  public obtenerEnumsTipoInmueble(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.baseURL}/tipos-inmueble`);
  }
  

}
