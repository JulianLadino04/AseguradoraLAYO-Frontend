import { Aseguradora } from "../Enums/Aseguradora";
import { TipoVehiculo } from "../Enums/TipoVehiculo";

export interface ObtenerAutosDTO {
    id: string;
    aseguradora: Aseguradora; 
    numeroPlaca: string;
    nombre: string;
    cedula: string;
    email: string;
    telefono: string;
    ciudadCirculacion: string;
    tipo: TipoVehiculo; 
    fechaNacimiento: Date;
  }
  