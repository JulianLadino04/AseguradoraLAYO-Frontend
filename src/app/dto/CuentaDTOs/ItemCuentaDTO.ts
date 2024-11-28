import { EstadoCuenta } from "../Enums/EstadoCuenta";
import { Rol } from "../Enums/Rol";

export interface ItemCuentaDTO {
    id : string,
    nombre : string,
    email : string,
    telefono : string,
    estadoCuenta : EstadoCuenta,
    rol : Rol
}
