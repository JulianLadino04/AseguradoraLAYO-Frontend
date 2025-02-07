import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/TokenDTOs/MensajeDTO';
import { LoginDTO } from '../dto/CuentaDTOs/LoginDTO';
import { CrearCuentaDTO } from '../dto/CuentaDTOs/CrearCuentaDTO';
import { CambiarPasswordDTO } from '../dto/CuentaDTOs/CambiarPasswordDTO';
import { EnviarCodigoDTO } from '../dto/CuentaDTOs/EnviarCodigoDTO';
import { TokenDTO } from '../dto/TokenDTOs/TokenDTO';
import { Environment } from '../../environments/environment';



@Injectable({
 providedIn: 'root'
})
export class PublicoService {


 private publicoURL = Environment.BACKEND_URL;


 constructor(private http: HttpClient) { }

 public crearCuenta(cuentaDTO: CrearCuentaDTO): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(`${this.publicoURL}`, { ...cuentaDTO, action: "signUp" }, { headers });
 }
 
 public iniciarSesion(loginDTO: LoginDTO): Observable<MensajeDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<MensajeDTO>(`${this.publicoURL}`, { ...loginDTO, action: "validateCode" }, { headers: headers });
 }

public cambiarPassword(CambiarPasswordDTO: CambiarPasswordDTO): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.publicoURL}/cambiar-password`, CambiarPasswordDTO);
}

public enviarCodigo(enviarCodigoDTO: EnviarCodigoDTO): Observable<MensajeDTO> {
    
   const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
   return this.http.post<MensajeDTO>(`${this.publicoURL}`, { ...enviarCodigoDTO, action: "sendVerificationCode" }, { headers: headers });
}

public refresh(tokenDTO: TokenDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.publicoURL}/refresh`, tokenDTO);
   }

}

