import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCotizacionSaludDTO } from '../../dto/SaludDTOs/CrearCotizacionSaludDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Aseguradora } from '../../dto/Enums/Aseguradora';
import { CommonModule, Location } from '@angular/common';
import { AdminSaludComponent } from "../admin-salud/admin-salud.component";
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-cotizacion-salud',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, AdminSaludComponent],
  templateUrl: './salud.component.html',
  styleUrls: ['./salud.component.css']
})
export class SaludComponent {
  cotizacionSaludForm!: FormGroup;
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
    this.cotizacionSaludForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
    });
  }

  public crearCotizacionSalud(): void {
    const cotizacionData = this.cotizacionSaludForm.value as CrearCotizacionSaludDTO;

    for (let control in this.cotizacionSaludForm.controls) {
      if (this.cotizacionSaludForm.controls[control].value == null || this.cotizacionSaludForm.controls[control].value === '') {
        Swal.fire({
          icon: 'error',
          title: 'Campos Obligatorios',
          text: 'Todos los campos son obligatorios.',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
    }

    const token = this.tokenService.getToken();
    if (token)
      this.clienteService.crearCotizacionSalud(cotizacionData, token).subscribe({
        next: (data) => {
          if (!data.error)
            Swal.fire({
              title: 'Éxito',
              text: 'Cotización de Salud creada correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              window.location.reload();
            });
          else {
            if (data.respuesta === "Sesión expirada" || data.respuesta === "Token inválido") {
              this.tokenService.logout("Debes iniciar sesión");
            } else
              Swal.fire({
                title: 'Error',
                text: data.respuesta || 'Ha ocurrido un error inesperado',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
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
    return this.cotizacionSaludForm.controls[campo].valid && this.cotizacionSaludForm.controls[campo].touched;
  }

  volver(): void {
    this.location.back();
  }
}
