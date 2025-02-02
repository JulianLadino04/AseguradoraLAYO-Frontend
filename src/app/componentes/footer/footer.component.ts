import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../servicios/token.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  footerForm!: FormGroup;
  isLogged = false;
  email: string = "";

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.footerForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }],
      asegurar: ['', [Validators.required, Validators.maxLength(15)]],
      mensaje: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.tokenService.getIsLoggedIn().subscribe(isLoggedIn => {
      this.isLogged = isLoggedIn;
      this.email = isLoggedIn ? this.tokenService.getCorreo() : "";
    });
  }

  public crearPeticion() {
    if (this.footerForm.valid) {
      const peticion = this.footerForm.value; // Captura los valores del formulario como un objeto DTO

      this.clienteService.crearPeticion(peticion).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Petición creada',
            text: 'La petición se ha creado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.footerForm.reset(); // Limpia el formulario
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error?.respuesta || 'Ocurrió un error al enviar la petición',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos correctamente',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
