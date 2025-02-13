import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { LoginDTO } from '../../dto/CuentaDTOs/LoginDTO';
import { PublicoService } from '../../servicios/publico.service';
import { EnviarCodigoDTO } from '../../dto/CuentaDTOs/EnviarCodigoDTO';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private publicoService: PublicoService,
    private loc: Location,
    private tokenService: TokenService
  ) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userCode: ['', [Validators.required, Validators.pattern("\\d{6}")]]
    });
  }
  gotoRegister() {
    const loginDTO = this.loginForm.value as LoginDTO;
    this.router.navigate(['/signup'], { queryParams: { email: loginDTO.email } });
  }

  volver() {
    this.loc.back();
  }

  generarCodigo() {

    const dto = this.loginForm.value as EnviarCodigoDTO;

    this.publicoService.enviarCodigo(dto).subscribe({
      next: (data) => {
        if (data.error) {
          console.error("Error al enviar código:", data.respuesta);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.respuesta || 'Error desconocido',
            confirmButtonText: 'Registrarme',
            showDenyButton: true,
            showConfirmButton: data.respuesta === "Usuario no encontrado",
            denyButtonText: "Cerrar"
          }).then(onfulfilled => {
            if (onfulfilled.isConfirmed) {
              this.gotoRegister();
            }
          });
        } else {
          Swal.fire({
            title: 'Código de seguridad enviado',
            text: 'Revisa tu bandeja de entrada e inicia sesión',
            icon: 'success',
            confirmButtonText: "Cerrar",
          });

        }
      },
    });
  }

  login() {

    const dto = this.loginForm.value as LoginDTO;
    this.publicoService.iniciarSesion(dto).subscribe({
      next: (data) => {
        if (data.error) {
          this.loginForm.get('userCode')?.setValue('');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.respuesta || 'Error desconocido',
            confirmButtonText: 'Registrarme',
            showDenyButton: true,
            showConfirmButton: data.respuesta === "Correo no encontrado",
            denyButtonText: "Cerrar"
          }).then(onfulfilled => {
            if (onfulfilled.isConfirmed) {
              this.gotoRegister();
            }
          });
        } else {
          Swal.fire({
            title: 'Inicio de Sesión Correcto',
            text: 'Las credenciales son válidas',
            icon: 'success',
            confirmButtonText: "Cerrar",
          });

          this.tokenService.setLogin(data.respuesta.token, data.respuesta.date, data.respuesta.email);
          this.router.navigate(['/']);
        }
      },
    });

  }
}
