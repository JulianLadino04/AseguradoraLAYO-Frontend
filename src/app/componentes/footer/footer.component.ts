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

      const token = this.tokenService.getToken();
      if (token) {
        this.clienteService.crearPeticion(peticion, token).subscribe({
          next: (response) => {
            if (!response.error) {
              Swal.fire({
                title: 'Petición creada',
                text: 'La petición se ha creado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.footerForm.reset(); // Limpia el formulario
            } else {
              Swal.fire({
                title: 'Error',
                text: response.respuesta || 'Ocurrió un error al enviar la petición',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          }
        });
      }
    } else {
      Swal.fire({
        title: 'Error de autenticación',
        text: 'Por favor, inicia sesión y vuelve a intentarlo',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
