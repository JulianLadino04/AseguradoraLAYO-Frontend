import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCotizacionHogarDTO } from '../../dto/HogarDTOs/CrearCotizacionHogarDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Aseguradora } from '../../dto/Enums/Aseguradora';
import { CommonModule, Location } from '@angular/common';
import { AdminHogarComponent } from "../admin-hogar/admin-hogar.component";
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-hogar',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, AdminHogarComponent],
  templateUrl: './hogar.component.html',
  styleUrl: './hogar.component.css'
})
export class HogarComponent {

  cotizacionHogarForm!: FormGroup;
  aseguradoras: string[] = Object.keys(Aseguradora);
  viewForm: boolean = false;
  viewFormBtn: string = "Solicitar Cotización";

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
    this.cotizacionHogarForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
      valorComercial: ['', [Validators.required, Validators.min(0)]],
      valorElectrico: ['', [Validators.required, Validators.min(0)]],
      valorMuebles: ['', [Validators.required, Validators.min(0)]]
    });
  }

  public crearCotizacionHogar(): void {
    const cotizacionData = this.cotizacionHogarForm.value as CrearCotizacionHogarDTO;

    // Verificar si algún campo es nulo o vacío
    for (let control in this.cotizacionHogarForm.controls) {
      if (this.cotizacionHogarForm.controls[control].value == null || this.cotizacionHogarForm.controls[control].value === '') {
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
      this.clienteService.crearCotizacionHogar(cotizacionData, token).subscribe({
        next: (data) => {
          if (!data.error)
            Swal.fire({
              title: 'Éxito',
              text: 'Cotización de hogar creada correctamente',
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
            text: error.toString() || 'Ocurrió un error inesperado',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    else {

    }
  }

  toggleVerForm() {
    this.viewForm = !this.viewForm;
    this.viewFormBtn = this.viewForm ? "Ocultar" : "Solicitar Cotización";
  }

  public campoEsValido(campo: string): boolean {
    return this.cotizacionHogarForm.controls[campo].valid && this.cotizacionHogarForm.controls[campo].touched;
  }


  volver(): void {
    this.location.back();
  }
}
