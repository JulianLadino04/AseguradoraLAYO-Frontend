import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'AseguradoraLayo';
  isLogged = false;
  email: string = "";

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    // Suscribirse a los cambios de autenticación
    this.tokenService.getIsLoggedIn().subscribe(isLoggedIn => {
      this.isLogged = isLoggedIn; // Sincroniza solo isLogged, no es necesario usar isLoggedIn
      this.email = isLoggedIn ? this.tokenService.getCorreo() : "";
    });
  }

  public logout() {
    this.tokenService.logout();
    this.isLogged = false; // Reiniciar el estado de autenticación
    this.email = "";
    this.router.navigate(['/login']); // Redirigir al inicio después de logout
  }
}
