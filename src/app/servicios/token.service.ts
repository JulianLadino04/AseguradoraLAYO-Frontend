import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = "AuthToken";
const EMAIL = "Email";
const EXP = "Expiration";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(private router: Router, private cookieService: CookieService) {
    // Inicializa el estado de autenticación al verificar si hay un token en el sessionStorage
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.isLogged());
  }

  public setLogin(token: string, exp: string, email: string) {
    this.cookieService.set(TOKEN_KEY, token);
    this.cookieService.set(EMAIL, email);
    this.cookieService.set(EXP, exp);
    this.isLoggedInSubject.next(true);  // Emitir que el usuario ha iniciado sesión
  }

  public getToken(): string | null {
    return this.cookieService.get(TOKEN_KEY);
  }

  public isLogged(): boolean {
    return !!this.getToken();  // Retorna true si el token está presente, de lo contrario false
  }

  public getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  public hasExpiredLogin(): boolean {
    const exp = this.cookieService.get(EXP);
    if (!exp) return true;
    const expDate = new Date(exp);
    return expDate < new Date();
  }

  public logout() {
    this.cookieService.delete(TOKEN_KEY);
    this.cookieService.delete(EMAIL);
    this.cookieService.delete(EXP);
    this.isLoggedInSubject.next(false);  // Emitir que el usuario ha cerrado sesión
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }

  private decodePayload(token: string): any {
    const payload = token!.split(".")[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
  }

  public getIDCuenta(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.id;
    }
    return "";
  }

  public getRol(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.rol;
    }
    return "";
  }

  public getCorreo(): string {
    return this.cookieService.get(EMAIL);
  }

  public getNombre(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.nombre;
    }
    return "";
  }

  public getTelefono(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      console.log(values.telefono);
      return values.telefono;
    }
    return "";
  }

  public getDireccion(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      console.log(values.direccion);
      return values.direccion;
    }
    return "";
  }
}
