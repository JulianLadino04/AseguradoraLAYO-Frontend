import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCotizacionResponsabilidadCivilDTO } from '../../dto/ResponsabillidadCivilDTOs/CrearCotizacionResponsabilidadCivilDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Aseguradora } from '../../dto/Enums/Aseguradora';
import { AdminResponsabilidadCivilComponent } from "../admin-responsabilidad-civil/admin-responsabilidad-civil.component";
import { CommonModule, Location } from '@angular/common';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-cotizacion-responsabilidad-civil',
  standalone: true,
  imports: [ReactiveFormsModule, AdminResponsabilidadCivilComponent, FormsModule, CommonModule],
  templateUrl: './responsabilidad-civil.component.html',
  styleUrls: ['./responsabilidad-civil.component.css']
})
export class ResponsabilidadCivilComponent {
  cotizacionResponsabilidadCivilForm!: FormGroup;
  isChecked: boolean = false;
  btnText: string = "Solicitar Cotización";
  aseguradoras: string[] = Object.keys(Aseguradora);

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private location: Location,
    private tokenService: TokenService
  ) {
    this.crearFormulario();
  }

  toggleShowing() {
    this.isChecked = !this.isChecked;
    this.btnText = this.isChecked ? "Ocultar" : "Solicitar Cotización";
  }

  private crearFormulario(): void {
    this.cotizacionResponsabilidadCivilForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
      ocupacion: ['', [Validators.required, Validators.maxLength(50)]],
      ciudad: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  public crearCotizacionResponsabilidadCivil(): void {
    const cotizacionData = this.cotizacionResponsabilidadCivilForm.value as CrearCotizacionResponsabilidadCivilDTO;

    // Verificar si algún campo es nulo o vacío
    for (let control in this.cotizacionResponsabilidadCivilForm.controls) {
      if (this.cotizacionResponsabilidadCivilForm.controls[control].value == null || this.cotizacionResponsabilidadCivilForm.controls[control].value === '') {
        Swal.fire({
          icon: 'error',
          title: 'Campos Obligatorios',
          text: 'Todos los campos son obligatorios.',
          confirmButtonText: 'Aceptar'
        });
        return; // Detener la ejecución si algún campo está vacío
      }
    }
    const token = this.tokenService.getToken();
    if (token)
      this.clienteService.crearCotizacionResponsabilidadCivil(cotizacionData, token).subscribe({
        next: (data) => {
          if (!data.error)
            Swal.fire({
              title: 'Éxito',
              text: 'Cotización de Responsabilidad Civil creada correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              window.location.reload();
            });
          else {
            if (data.respuesta === "Sesión expirada" || data.respuesta === "Token inválido") {
              this.tokenService.logout("Debes iniciar sesión");
            } else {
              Swal.fire({
                title: 'Error',
                text: data.respuesta || 'Ocurrió un error inesperado',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          }
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error.respuesta || 'Ocurrió un error inesperado',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    else this.tokenService.logout("Debes iniciar sesión");
  }

  public campoEsValido(campo: string): boolean {
    return this.cotizacionResponsabilidadCivilForm.controls[campo].valid && this.cotizacionResponsabilidadCivilForm.controls[campo].touched;
  }

  volver(): void {
    this.location.back();
  }
} 
