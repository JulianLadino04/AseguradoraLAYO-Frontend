import { Aseguradora } from '../Enums/Aseguradora';
import { TipoVehiculo } from '../Enums/TipoVehiculo';

export interface ObtenerSoatDTO {
  id: string;
  numeroPlaca: string;
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  direccion: string;
  aseguradora: Aseguradora;
  tipo: TipoVehiculo;
}
