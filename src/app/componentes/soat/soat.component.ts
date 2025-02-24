import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearSoatDTO } from '../../dto/SoatDTOs/CrearSoatDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Aseguradora } from '../../dto/Enums/Aseguradora';
import { TipoVehiculo } from '../../dto/Enums/TipoVehiculo';
import { CommonModule, Location } from '@angular/common';
import { AdminSoatComponent } from "../admin-soat/admin-soat.component";
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-cotizacion-soat',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, AdminSoatComponent],
  templateUrl: './soat.component.html',
  styleUrls: ['./soat.component.css']
})
export class SoatComponent {
  cotizacionSoatForm!: FormGroup;
  aseguradoras: string[] = Object.keys(Aseguradora);
  tiposVehiculo: string[] = Object.keys(TipoVehiculo);
  isChecked: boolean = false;
  btnText: string = "Solicitar Cotización";

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
    this.cotizacionSoatForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
      tipoVehiculo: ['', Validators.required],
      placa: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[A-Za-z0-9]*$')]],
    });
  }

  public crearCotizacionSoat(): void {
    const cotizacionData = this.cotizacionSoatForm.value as CrearSoatDTO;

    for (let control in this.cotizacionSoatForm.controls) {
      if (this.cotizacionSoatForm.controls[control].value == null || this.cotizacionSoatForm.controls[control].value === '') {
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
      this.clienteService.crearCotizacionSoat(cotizacionData, token).subscribe({
        next: (data) => {
          if (!data.error)
            Swal.fire({
              title: 'Éxito',
              text: 'Cotización de SOAT creada correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              window.location.reload();
            });
          else {
            if (data.respuesta === "Sesión expirada" || data.respuesta === "Token inválido") {
              this.tokenService.logout("Debes iniciar sesión");
              return;
            }
            Swal.fire({
              title: 'Error',
              text: data.respuesta || 'Ocurrió un error inesperado',
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
    return this.cotizacionSoatForm.controls[campo].valid && this.cotizacionSoatForm.controls[campo].touched;
  }

  volver(): void {
    this.location.back();
  }
}