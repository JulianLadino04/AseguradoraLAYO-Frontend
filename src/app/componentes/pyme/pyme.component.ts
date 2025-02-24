import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCotizacionPymeDTO } from '../../dto/PymeDTOs/CrearCotizacionPymeDTO';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Aseguradora } from '../../dto/Enums/Aseguradora';
import { TipoInmueble } from '../../dto/Enums/TipoInmueble';
import { CommonModule, Location } from '@angular/common';
import { AdminPymeComponent } from "../admin-pyme/admin-pyme.component";
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-cotizacion-pyme',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, AdminPymeComponent],
  templateUrl: './pyme.component.html',
  styleUrls: ['./pyme.component.css']
})
export class PymeComponent {
  viewForm: boolean = false;
  viewFormBtn: string = "Solicitar Cotización";

  cotizacionPymeForm!: FormGroup;
  aseguradoras: string[] = Object.keys(Aseguradora);
  tiposInmuebles: string[] = Object.keys(TipoInmueble);

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
    this.cotizacionPymeForm = this.formBuilder.group({
      aseguradora: ['', Validators.required],
      valorMercancia: ['', [Validators.required, Validators.min(0)]],
      valorMaquinaria: ['', [Validators.required, Validators.min(0)]],
      valorComercial: ['', [Validators.required, Validators.min(0)]],
      valorElectrico: ['', [Validators.required, Validators.min(0)]],
      valorMuebles: ['', [Validators.required, Validators.min(0)]],
      tipoPyme: ['', Validators.required]
    });
  }

  public crearCotizacionPyme(): void {
    const cotizacionPymeData = this.cotizacionPymeForm.value as CrearCotizacionPymeDTO;

    // Verificar si algún campo es nulo o vacío
    for (let control in this.cotizacionPymeForm.controls) {
      if (this.cotizacionPymeForm.controls[control].value == null || this.cotizacionPymeForm.controls[control].value === '') {
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
      this.clienteService.crearCotizacionPyme(cotizacionPymeData, token).subscribe({
        next: (data) => {
          if (!data.error) {
            Swal.fire({
              title: 'Éxito',
              text: 'Cotización Pyme creada correctamente',
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
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error inesperado',
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
    return this.cotizacionPymeForm.controls[campo].valid && this.cotizacionPymeForm.controls[campo].touched;
  }

  volver(): void {
    this.location.back();
  }

  toggleVerForm() {
    this.viewForm = !this.viewForm;
    this.viewFormBtn = this.viewForm ? "Ocultar" : "Solicitar Cotización";
  }
}
