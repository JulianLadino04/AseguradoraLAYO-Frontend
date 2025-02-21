import { Aseguradora } from '../Enums/Aseguradora';
import { TipoVehiculo } from '../Enums/TipoVehiculo';

export interface CrearSoatDTO {
  placa: string;
  aseguradora: Aseguradora;
  tipo: TipoVehiculo;
}
