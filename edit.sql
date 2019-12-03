SELECT * FROM db_sgp2.catalogo_modelos;

/*CREAR*/
USE `db_sgp2`;
DROP procedure IF EXISTS `spInsertarModelos`;

DELIMITER $$
USE `db_sgp2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spInsertarModelos`
(
	IN _descripcion_modelo VARCHAR(150),
	IN _estado CHAR(1)	
)
BEGIN
	INSERT INTO catalogo_modelos
	(
		descripcion_modelo,
		estado
	)
	VALUES
	( 
		_descripcion_modelo,
		_estado
	);
	SELECT LAST_INSERT_ID() id_modelo;
END$$

DELIMITER ;

/*OBTENER TODOS*/
USE `db_sgp2`;
DROP procedure IF EXISTS `spObtenerListaModelos`;

DELIMITER $$
USE `db_sgp2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spObtenerListaModelos`()
BEGIN
	SELECT 
		id_modelo,
		descripcion_modelo,
		estado,
		IF(estado = 'A',"ACTIVO","INACTIVO") AS estado_str
	FROM catalogo_modelos
	WHERE estado <> 'E';
END$$

DELIMITER ;
CALL spObtenerListaModelos();
/*OBTENER UNO*/
USE `db_sgp2`;
DROP procedure IF EXISTS `spObtenerModeloPorId`;

DELIMITER $$
USE `db_sgp2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spObtenerModeloPorId`
(
	IN _id INT
)
BEGIN
	SELECT 
		id_modelo,
		descripcion_modelo,
		estado,
		IF(estado = 'A',"ACTIVO","INACTIVO") AS estado_str
	FROM catalogo_modelos
	WHERE id_modelo = _id;
END$$

DELIMITER ;

/*ACTUALIZAR*/
USE `db_sgp2`;
DROP procedure IF EXISTS `spActualizarModelo`;

DELIMITER $$
USE `db_sgp2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spActualizarModelo`
(
	IN _id_modelo INT,
	IN _descripcion_modelo VARCHAR(150),
	IN _estado CHAR(1)	
)
BEGIN
	UPDATE catalogo_modelos
	SET
		descripcion_modelo = _descripcion_modelo,
		estado = _estado
	WHERE id_modelo = _id_modelo;
END$$

DELIMITER ;

/*ELIMINAR*/
USE `db_sgp2`;
DROP procedure IF EXISTS `spEliminarModelo`;

DELIMITER $$
USE `db_sgp2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `spEliminarModelo`
(
	IN _id_modelo INT
)
BEGIN
	UPDATE catalogo_modelos
	SET
		estado = 'E'
	WHERE id_modelo = _id_modelo;
END$$

DELIMITER ;