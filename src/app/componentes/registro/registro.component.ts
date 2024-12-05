import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControlOptions } from '@angular/forms'; // Importa AbstractControlOptions
import { Router } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { CrearCuentaDTO } from '../../dto/CuentaDTOs/CrearCuentaDTO';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'] // Cambiado styleUrl a styleUrls
})
export class RegistroComponent {

  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private publicoService: PublicoService) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(7)]],
      confirmaPassword: ['', [Validators.required]] // Agrega el campo para confirmar contraseña
    }, { validators: this.passwordsMatchValidator } as AbstractControlOptions);
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;

    // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
    return password === confirmaPassword ? null : { passwordsMismatch: true };
  }

  public registrar() {
    const crearCuenta = this.registroForm.value as CrearCuentaDTO;
    
    this.publicoService.crearCuenta(crearCuenta).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Cuenta creada',
          text: 'La cuenta se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        
        // Verifica si el correo es admin@gmail.com
        if (crearCuenta.correo === 'admin@gmail.com') {
          // Si es admin, redirige al login
          this.router.navigate(['/login']);
        } else {
          // Si no es admin, redirige a la página de Activar Cuenta
          this.router.navigate(['/activar-cuenta']);
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.respuesta,
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