import { Aseguradora } from '../Enums/Aseguradora';

export interface CrearCotizacionProteccionCreditoDTO {
  aseguradora: Aseguradora;
  valorDeuda: number; // float en Java se convierte a number
}
