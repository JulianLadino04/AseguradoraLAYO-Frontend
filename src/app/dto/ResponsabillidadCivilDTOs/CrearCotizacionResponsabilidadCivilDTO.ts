import { Aseguradora } from '../Enums/Aseguradora';

export interface CrearCotizacionResponsabilidadCivilDTO {
  aseguradora: Aseguradora;
  direccion: string;
  ocupacion: string;
  ciudad: string;
}
