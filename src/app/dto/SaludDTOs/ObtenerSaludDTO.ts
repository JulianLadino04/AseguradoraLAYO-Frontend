import { Aseguradora } from '../Enums/Aseguradora';

export interface ObtenerSaludDTO {
  id: string;
  aseguradora: Aseguradora;
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: Date; // LocalDateTime en Java se traduce a Date en TypeScript
}
