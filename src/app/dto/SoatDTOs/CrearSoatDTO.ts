import { Aseguradora } from '../Enums/Aseguradora';
import { TipoVehiculo } from '../Enums/TipoVehiculo';

export interface CrearSoatDTO {
  placa: string;
  nombre: string;
  cedula: string;
  telefono: string; 
  direccion: string; 
  correo: string;
  aseguradora: Aseguradora;
  tipo: TipoVehiculo;
}
