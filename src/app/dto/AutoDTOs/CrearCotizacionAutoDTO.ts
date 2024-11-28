import { Aseguradora } from "../Enums/Aseguradora";
import { TipoVehiculo } from "../Enums/TipoVehiculo";

export interface CrearCotizacionAutoDTO {
  aseguradora: Aseguradora;
  placa: string;
  nombre: string;
  cedula: string;
  correo: string;
  direccion: string;  
  telefono: string;  
  ciudadCirculacion: string;
  tipo: TipoVehiculo;
  fechaNacimiento: Date; // LocalDateTime de Java se traduce a Date en TypeScript
}
