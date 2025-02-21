import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCotizacionVidaDTO } from '../../dto/VidaDTOs/CrearCotizacionVidaDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Aseguradora } from '../../dto/Enums/Aseguradora';
import { CommonModule, Location } from '@angular/common';
import { AdminVidaComponent } from "../admin-vida/admin-vida.component";
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-cotizacion-vida',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, AdminVidaComponent],
  templateUrl: './vida.component.html',
  styleUrls: ['./vida.component.css']
})
export class VidaComponent {
  cotizacionVidaForm!: FormGroup;
  aseguradoras: string[] = Object.keys(Aseguradora);
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
    this.cotizacionVidaForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
    });
  }

  public crearCotizacionVida(): void {
    const cotizacionData = this.cotizacionVidaForm.value as CrearCotizacionVidaDTO;

    for (let control in this.cotizacionVidaForm.controls) {
      if (this.cotizacionVidaForm.controls[control].value == null || this.cotizacionVidaForm.controls[control].value === '') {
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
      this.clienteService.crearCotizacionVida(cotizacionData, token).subscribe({
        next: (data) => {
          if (!data.error)
            Swal.fire({
              title: 'Éxito',
              text: 'Cotización de seguro de vida creada correctamente',
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
    else {
      this.tokenService.logout("Debes iniciar sesión");
    }
  }

  public campoEsValido(campo: string): boolean {
    return this.cotizacionVidaForm.controls[campo].valid && this.cotizacionVidaForm.controls[campo].touched;
  }

  volver(): void {
    this.location.back();
  }
}
