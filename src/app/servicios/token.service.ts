import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    // Inicializa el estado de autenticación al verificar si hay un token en el sessionStorage
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.isLogged());
  }

  public setToken(token: string) {
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.isLoggedInSubject.next(true);  // Emitir que el usuario ha iniciado sesión
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    return !!this.getToken();  // Retorna true si el token está presente, de lo contrario false
  }

  public getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  public logout() {
    window.sessionStorage.clear();
    this.isLoggedInSubject.next(false);  // Emitir que el usuario ha cerrado sesión
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }

  public login(token: string) {
    this.setToken(token);
    this.router.navigate(["/"]);
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
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.sub;
    }
    return "";
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
