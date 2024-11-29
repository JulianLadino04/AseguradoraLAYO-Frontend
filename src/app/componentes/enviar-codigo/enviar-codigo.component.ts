import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import Swal from 'sweetalert2';
import { EnviarCodigoDTO } from '../../dto/CuentaDTOs/EnviarCodigoDTO';

@Component({
  selector: 'app-enviar-codigo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './enviar-codigo.component.html',
  styleUrl: './enviar-codigo.component.css'
})
export class EnviarCodigoComponent {

  enviarForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,  private publicoService: PublicoService) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.enviarForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  public enviarCodigo() {
    
    const enviarCodigoDTO = this.enviarForm.value as EnviarCodigoDTO ;

    this.publicoService.enviarCodigo(enviarCodigoDTO).subscribe({
      next: (data) => {
          // Verifica si el mensaje es accesible en `data.mensaje`
          console.log("Respuesta exitosa:", data);
  
          Swal.fire({
              title: 'Código Enviado',
              text: data.respuesta || 'El código se ha enviado correctamente',
              icon: 'success',
              confirmButtonText: 'Continuar'
          });
          this.router.navigate(['/cambiar-password']);
      },
      error: (error) => {
          const errorMessage = error?.error?.mensaje || 'Hubo un problema al enviar el código. Inténtelo de nuevo más tarde.';
          console.error("Error en la solicitud:", error);
  
          Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'Aceptar'
          });
      }
  });  
}
public volver(){
  this.router.navigate(['/login']);
}
}
