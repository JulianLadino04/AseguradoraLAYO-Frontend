import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCotizacionProteccionCreditoDTO } from '../../dto/ProteccionCreditoDTOs/CrearCotizacionProteccionCreditoDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Aseguradora } from '../../dto/Enums/Aseguradora';
import { AdminProteccionCreditoComponent } from "../admin-proteccion-credito/admin-proteccion-credito.component";
import { CommonModule, Location } from '@angular/common';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-proteccion-credito',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, AdminProteccionCreditoComponent],
  templateUrl: './proteccion-credito.component.html',
  styleUrls: ['./proteccion-credito.component.css']
})
export class ProteccionCreditoComponent {
  viewFormBtn: string = "Solicitar Cotización";

  proteccionCreditoForm!: FormGroup;
  aseguradoras: string[] = Object.keys(Aseguradora);
  viewForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private location: Location,
    private tokenService: TokenService
  ) {
    this.crearFormulario();
  }

  private crearFormulario(): void {
    this.proteccionCreditoForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
      deuda: ['', [Validators.required, Validators.min(0)]]
    });
  }

  public crearProteccionCredito(): void {
    const proteccionCreditoData = this.proteccionCreditoForm.value as CrearCotizacionProteccionCreditoDTO;

    // Verificar si algún campo es nulo o vacío
    for (let control in this.proteccionCreditoForm.controls) {
      if (this.proteccionCreditoForm.controls[control].value == null || this.proteccionCreditoForm.controls[control].value === '') {
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
      this.clienteService.crearCotizacionProteccionCredito(proteccionCreditoData, token).subscribe({
        next: (data) => {
          if (!data.error) {
            Swal.fire({
              title: 'Éxito',
              text: 'Protección de crédito creada correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              window.location.reload();
            });
          } else {
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
            text: error.toString() || 'Ocurrió un error inesperado',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    else {
      this.router.navigate(["/signin"], { replaceUrl: true, queryParams: { source: "Debes iniciar sesión" } });
    }
  }

  public campoEsValido(campo: string): boolean {
    return this.proteccionCreditoForm.controls[campo].valid && this.proteccionCreditoForm.controls[campo].touched;
  }

  volver(): void {
    this.location.back();
  }

  toggleVerForm() {
    this.viewForm = !this.viewForm;
    this.viewFormBtn = this.viewForm ? "Ocultar" : "Solicitar Cotización";
  }
}
