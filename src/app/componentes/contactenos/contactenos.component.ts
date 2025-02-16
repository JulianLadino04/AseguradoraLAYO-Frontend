import { Component } from '@angular/core';
import { RegistroComponent } from "../registro/registro.component";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-contactenos',
  standalone: true,
  imports: [RegistroComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './contactenos.component.html',
  styleUrl: './contactenos.component.css'
})
export class ContactenosComponent {
  isLoggedIn: boolean = false;

  constructor(
    private tokenService: TokenService,
  ) {
  }

  ngOnInit() {
    this.tokenService.getIsLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
