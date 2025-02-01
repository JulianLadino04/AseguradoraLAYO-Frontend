import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';

@Component({
  selector: 'app-activar-cuenta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './activar-cuenta.component.html',
  styleUrl: './activar-cuenta.component.css'
})
export class ActivarCuentaComponent {
  
  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private publicoService: PublicoService, private loc: Location) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      codigo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  public activarCuenta() {
    // const activarCuentaDTO = this.registroForm.value as ActivarCuentaDTO; // Asegúrate de tener un DTO adecuado para esta operación
    
    // this.publicoService.activarCuenta(activarCuentaDTO).subscribe({
    //   next: (data) => {
    //     Swal.fire({
    //       title: 'Cuenta activada',
    //       text: 'La cuenta se ha activado correctamente',
    //       icon: 'success',
    //       confirmButtonText: 'Aceptar'
    //     });
    //     this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
    //   }
    // });
  }

  public volver(){
    this.loc.back();
   }
}



