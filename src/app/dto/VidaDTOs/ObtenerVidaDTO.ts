import { Aseguradora } from '../Enums/Aseguradora';

export interface ObtenerVidaDTO {
  id: string;
  aseguradora: Aseguradora;
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  direccion: string;
  ocupacion: string;
  fechaNacimiento: Date; 
}
