export interface estatificacion {
    tamano_empresa : string,
    nivel_ventas : string,
    detalle_ventas : string,
    sector : string,
    tipo_empresa : string,
    certificaciones : string,
    software : string
}

export interface estatificacion_table {
    fk_id_tamaño : number,
    fk_id_nivel_ventas : number,
    fk_id_detalle_ventas : number,
    fk_id_sector : number,
    fk_id_tipo_empresa : number,
    id_estat_empresa : number
}

export interface cert_emp {
    fk_id_empresa :  number,
    fk_id_cert :  number,
    id_cert_emp :  number
}

export interface soft_emp {
    fk_id_empresa :  number,
    fk_id_sw :  number,
    id_sw_emp :  number
}