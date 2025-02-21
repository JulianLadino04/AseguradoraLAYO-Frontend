import { Aseguradora } from '../Enums/Aseguradora';

export interface CrearCotizacionHogarDTO {
  aseguradora: Aseguradora;
  valorComercial: number; // float en Java se convierte a number
  valorElectrico: number;
  valorMuebles: number;
}
