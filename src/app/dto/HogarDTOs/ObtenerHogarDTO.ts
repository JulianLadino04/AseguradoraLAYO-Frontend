import { Aseguradora } from '../Enums/Aseguradora';

export interface ObtenerHogarDTO {
  id: string;
  aseguradora: Aseguradora;
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: Date; // LocalDateTime se traduce a Date en TypeScript
  valorComercial: number; // float en Java se convierte a number
  valorElectrico: number;
  valorMuebles: number;
}
