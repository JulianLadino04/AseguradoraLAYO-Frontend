import { Aseguradora } from '../Enums/Aseguradora';
import { TipoInmueble } from '../Enums/TipoInmueble';

export interface CrearCotizacionPymeDTO {
  aseguradora: Aseguradora;
  valorMercancia: number; // float en Java se convierte a number
  valorMaquinaria: number;
  valorComercial: number;
  valorElectrico: number;
  valorMuebles: number;
  tipoPyme: TipoInmueble;
}
