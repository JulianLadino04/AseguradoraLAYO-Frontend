import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { CambiarPasswordDTO } from '../../dto/CuentaDTOs/CambiarPasswordDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {

  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private publicoService: PublicoService) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      codigoVerificacion: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      passwordNueva: ['', [Validators.required, Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
    })
  }

  public cambiarPassword() {
    // Suponemos que el formulario contiene un campo para la nueva contraseña
    const cambioPasswordDTO = this.registroForm.value as CambiarPasswordDTO;
  
    this.publicoService.cambiarPassword(cambioPasswordDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Contraseña cambiada',
          text: 'La contraseña se ha cambiado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.respuesta || 'Ocurrió un error al cambiar la contraseña',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
  public volver(){
    this.router.navigate(['/enviar-codigo']);
   }
}
