export interface producto_basico {
    id_producto : number,
    nombre : string,
    fk_id_empresa : number
}

export interface producto{
    id_producto : number,
    nombre : string,
    descripcion : string,
    origen : string,
    posicionamiento : string,
    marca : string,
    partnership : string,
    tecnologias : string,
    value_driver : string,
    industry_lever : string,
    caso_exito : string,
    referencia : string
}

export interface producto_tabla{
    id_producto : number,
    fk_id_posicionamiento : number,
    fk_id_empresa : number,
    fk_id_origen : number,
    fk_id_marca_nivelp: number,
    nombre : string,
    descripcion : string,
    caso_exito : string,
    referencia : string,
    partnership : string
}

export interface producto_tecnologias{
    fk_id_producto : number,
    fk_id_tecnologia : number,
    id_tec_prod : number
}
