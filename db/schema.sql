CREATE SCHEMA `burgers_db` ;

CREATE TABLE `burgers_db`.`burgers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `burger_name` VARCHAR(100) NOT NULL,
  `devoured` BLOB NOT NULL,
  `date` TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`id`));

