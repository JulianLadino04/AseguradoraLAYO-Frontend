import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Unieventos';
  isLogged = false;
  email: string = "";
  rol: string = "";
  currentRoute: string = ""; // Nueva variable para la ruta actual
  isLoggedIn = false;

  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit() {
    // Suscribirse a los cambios de autenticación
    this.tokenService.getIsLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.isLogged = isLoggedIn; // Sincronizar con isLogged para compatibilidad con el HTML
      if (isLoggedIn) {
        this.email = this.tokenService.getCorreo(); // Asegúrate de tener este método en tu servicio
        this.rol = this.tokenService.getRol(); // Asegúrate de tener este método en tu servicio
      } else {
        this.email = "";
        this.rol = "";
      }
    });

    // Suscribirse a los cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  public logout() {
    this.tokenService.logout();
    this.isLogged = false;
    this.isLoggedIn = false;
    this.email = "";
    this.rol = "";
  }
}
