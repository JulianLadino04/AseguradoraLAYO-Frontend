import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuentaService } from '../../servicios/cuenta.service';
import { InformacionCuentaDTO } from '../../dto/CuentaDTOs/InformacionCuentaDTO';
import { EditarCuentaDTO } from '../../dto/CuentaDTOs/EditarCuentaDTO';
import { TokenService } from '../../servicios/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfilForm!: FormGroup;
  email!: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private cuentaService: CuentaService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerInformacionCuenta();
  }

  private crearFormulario(): void {
    this.perfilForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]], // Acepta solo números
      address: ['', [Validators.required]],
      email: [{ value: '', disabled: true }],
      ocupacion: ['', [Validators.required]],
    });
  }


  private obtenerInformacionCuenta(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.cuentaService.obtenerCuenta(token).subscribe({
        next: (data) => {
          if (!data.error) {
            const cuenta: InformacionCuentaDTO = data.respuesta.user;
            this.perfilForm.patchValue({
              id: cuenta.id,
              name: cuenta.name,
              phone: cuenta.phone,
              address: cuenta.address,
              email: cuenta.email
            });
          } else {
            // logout
            if (data.respuesta == "Sesión expirada") {
              this.tokenService.logout();
            } else
              Swal.fire({
                title: 'Error',
                text: data.respuesta,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
          }
        }
      });
    }
  }

  public editarPerfil(): void {
    // Verificar si el formulario es válido
    const token = this.tokenService.getToken();
    if (this.perfilForm.valid && token) {
      // Usar getRawValue() para enviar campos deshabilitados
      const nuevoPerfil = this.perfilForm.getRawValue() as EditarCuentaDTO;

      nuevoPerfil.token = token;

      // Realizar la solicitud para editar la cuenta
      this.cuentaService.editarCuenta(nuevoPerfil).subscribe({
        next: (data) => {
          // Si la solicitud es exitosa, mostrar un mensaje
          if (!data.error) {
            Swal.fire({
              title: 'Perfil actualizado',
              text: 'La información de la cuenta ha sido actualizada con éxito',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              // Redirigir a la página deseada después del éxito
              this.router.navigate(['/']);
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: data.respuesta,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        }
      });
    } else {
      if (!token) {
        this.tokenService.logout("Debes iniciar sesión");
        return;
      }
      // Mostrar los errores de validación del formulario
      console.log('Errores de validación del formulario:', this.perfilForm.errors);

      // Mostrar un mensaje de advertencia si el formulario no es válido
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos requeridos antes de continuar.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }



  public eliminarCuenta(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción. ¿Quieres eliminar tu cuenta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      const token = this.tokenService.getToken();
      if (!token) {
        Swal.fire({
          title: 'Error',
          text: "Debes iniciar sesión",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.tokenService.logout("Debes iniciar sesión");
        })
        return;
      }
      if (result.isConfirmed) {
        this.cuentaService.eliminarCuenta(token).subscribe({
          next: (data) => {
            if (!data.error)
              Swal.fire({
                title: 'Cuenta eliminada',
                text: 'Tu cuenta ha sido eliminada exitosamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then(() => {
                this.tokenService.logout();
              });
            else {
              Swal.fire({
                title: 'Error',
                text: data.respuesta || 'Error al eliminar la cuenta',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          }, error: (e) => { console.error({ e }) },
        });
      }
    });
  }
}
