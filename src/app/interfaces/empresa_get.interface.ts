export interface empresa_get {
    nombre : string,
    razon_social : string,
    rfc : string,
    web : string,
    linkedin : string,
    facebook : string,
    twitter : string,
    instagram : string,
    fecha_creacion : string,
    nombre_contacto : string,
    puesto_contacto : string,
    email_contacto : string,
    telefono_contacto : string,
    cobertura_nacional :string,
    cobertura_internacional : string
}

export interface empresa_table {
    nombre : string,
    razon_social : string,
    rfc : string,
    web : string,
    linkedin : string,
    facebook : string,
    twitter : string,
    instagram : string,
    fecha_creación : string,
    descripcion_oferta_valor : string,
    sectores_atendidos : string,
    principales_clientes : string,
    orgs_emp : org_emp[],
    cobertura : cobertura
}

interface org_emp {
    fk_id_empresa : number,
    fk_id_org : number,
    id_orgs_emp : number
}
interface cobertura {
    id_cobertura : number,
    internacional : string,
    nacional : string
}