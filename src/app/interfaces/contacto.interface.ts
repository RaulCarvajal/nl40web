import { puestos } from './puestos.interface';

export interface contacto {
    id_contacto : number,
    fk_id_puesto : number,
    apellidos : string,
    nombres : string,
    email : string,
    telefono : number,
    nombre_usuario : string,
    contraseña : string,
    tipo_usuario : string,
    estatus_registro : number,
    cat_puestos : puestos
};