import { Component } from '@angular/core';
import { RegistroComponent } from "../registro/registro.component";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contactenos',
  standalone: true,
  imports: [RegistroComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './contactenos.component.html',
  styleUrl: './contactenos.component.css'
})
export class ContactenosComponent {

}
