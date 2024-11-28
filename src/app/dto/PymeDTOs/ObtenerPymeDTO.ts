import { Aseguradora } from '../Enums/Aseguradora';
import { TipoInmueble } from '../Enums/TipoInmueble';

export interface ObtenerPymeDTO {
  id: string;
  aseguradora: Aseguradora;
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: Date; // LocalDateTime en Java se traduce a Date en TypeScript
  valorMercancia: number; // float en Java se convierte a number
  valorMaquinaria: number;
  valorComercial: number;
  valorElectrico: number;
  valorMuebles: number;
  tipo: TipoInmueble;
}
