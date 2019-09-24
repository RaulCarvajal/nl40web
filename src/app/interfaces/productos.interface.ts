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