import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import Swal from 'sweetalert2';
import { LoginDTO } from '../../dto/CuentaDTOs/LoginDTO';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private publicoService: PublicoService,
    private tokenService: TokenService
  ) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]]
    });
  }

  login() {
    const loginDTO = this.loginForm.value as LoginDTO;

    this.publicoService.iniciarSesion(loginDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Inicio de Sesión Correcto',
          text: 'Las credenciales son válidas',
          icon: 'success',
          confirmButtonText: "Ingresar",
        });

        this.tokenService.setToken(data.respuesta.token);
        const userRole = this.tokenService.getRol();  

        if (userRole === 'ADMINISTRADOR') {
          this.router.navigate(['/cotizaciones-admin']);
        } else if (userRole === 'CLIENTE') {
          this.router.navigate(['/pagina-principal']);
        }
      },
      error: (error) => {
        // Mejor manejo de errores
        console.error("Error en el inicio de sesión:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.respuesta || 'Error desconocido',
          confirmButtonText: 'Reintentar',
        });
      },
    });
}


  public campoEsValido(campo: string): boolean {
    return this.loginForm.controls[campo].valid && this.loginForm.controls[campo].touched;
  }
  
  public abrirVentanaRecuperacion(){
    this.router.navigate(['/enviar-codigo']);
  }

  public abrirVentanaRegistro(){
    this.router.navigate(['/registro']);
  }
}


