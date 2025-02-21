import { Aseguradora } from "../Enums/Aseguradora";
import { TipoVehiculo } from "../Enums/TipoVehiculo";

export interface CrearCotizacionAutoDTO {
  aseguradora: Aseguradora;
  placa: string;
  ciudad: string;
  tipoVehiculo: TipoVehiculo;
}
