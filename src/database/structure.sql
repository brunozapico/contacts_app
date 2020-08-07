-- MySQL Workbench Forward Engineering

SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT;
SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS;
SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION;
SET NAMES utf8;
SET @OLD_TIME_ZONE=@@TIME_ZONE ;
SET TIME_ZONE='+00:00';
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO';
SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0;

-- -----------------------------------------------------
-- Schema contacts_app
-- -----------------------------------------------------

DROP DATABASE IF EXISTS `contacts_app`;
CREATE DATABASE `contacts_app`;
USE `contacts_app`;

-- Tables

CREATE TABLE IF NOT EXISTS `contacts_app`.`users` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(100) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(100) DEFAULT 'img/user/avatar/no_avatar.png',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC));

CREATE TABLE `contacts_app`.`contacts` (
    `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `full_name` VARCHAR(100) NOT NULL,
    `number` VARCHAR(20) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    INDEX `user_idx` (`user_id` ASC),
    CONSTRAINT `user_id`
		FOREIGN KEY (`user_id`)
		REFERENCES `contacts_app`.`users` (`id`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION);

-- Test Users
INSERT INTO users (full_name, username, password) VALUES ('Test User', 'test', 'test');
INSERT INTO users (full_name, username, password) VALUES ('Cesaro Antyukhin', 'cantyukhin0', 'NmlL66');
INSERT INTO users (full_name, username, password) VALUES ('Min Janssen', 'mjanssen1', 'sTjTxDUVOKB');
INSERT INTO users (full_name, username, password) VALUES ('Ailyn Sirette', 'asirette2', 'BALXc9BSHNz');
INSERT INTO users (full_name, username, password) VALUES ('Bard Traske', 'btraske3', '9ZNqQnLpEqb');
INSERT INTO users (full_name, username, password) VALUES ('Phyllys Hendrik', 'phendrik4', '8v0fDHDQX');
INSERT INTO users (full_name, username, password) VALUES ('Sophey Manuely', 'smanuely5', 'vHdMGvsE');
INSERT INTO users (full_name, username, password) VALUES ('Trever Rumsey', 'trumsey6', 'AH9ZzrR6a');
INSERT INTO users (full_name, username, password) VALUES ('Ola Willes', 'owilles7', 'PYz1S5zV7t');
INSERT INTO users (full_name, username, password) VALUES ('Shanda Quiddihy', 'squiddihy8', 'NTxoL7');
INSERT INTO users (full_name, username, password) VALUES ('Amaleta Salasar', 'asalasar9', 'ugIzPmfJQF4m');
INSERT INTO users (full_name, username, password) VALUES ('Augustus Jouhan', 'ajouhana', 'jgtsj6cu');
INSERT INTO users (full_name, username, password) VALUES ('Jenica Rosten', 'jrostenb', 'Q7wBo1sqFL');
INSERT INTO users (full_name, username, password) VALUES ('Jocelin Edgecumbe', 'jedgecumbec', 'jXHVGWMyx');
INSERT INTO users (full_name, username, password) VALUES ('Mireille Tofano', 'mtofanod', 'lU3eHg');
INSERT INTO users (full_name, username, password) VALUES ('Dodi Rodenburgh', 'drodenburghe', 'oR3k1v');
INSERT INTO users (full_name, username, password) VALUES ('Alanson Seiler', 'aseilerf', 'axvpaIY5IWBD');
INSERT INTO users (full_name, username, password) VALUES ('Addy McIlvoray', 'amcilvorayg', 'B0KkzEpv4o');
INSERT INTO users (full_name, username, password) VALUES ('Ruthanne Liversedge', 'rliversedgeh', 'ck03W2bNeVqp');
INSERT INTO users (full_name, username, password) VALUES ('Kenton Jemmison', 'kjemmisoni', 'RjAShGu');
INSERT INTO users (full_name, username, password) VALUES ('Lotta Adcock', 'ladcockj', '7M3VoyyL0r');
INSERT INTO users (full_name, username, password) VALUES ('Letitia Molyneux', 'lmolyneuxk', 'Im07YkBw');
INSERT INTO users (full_name, username, password) VALUES ('Nalani Littleton', 'nlittletonl', '6fFrJl');
INSERT INTO users (full_name, username, password) VALUES ('Heidi Smullen', 'hsmullenm', 'WZQT75');
INSERT INTO users (full_name, username, password) VALUES ('Klarrisa Foux', 'kfouxn', 'S5IeacXgYSBI');
INSERT INTO users (full_name, username, password) VALUES ('Ame Summerell', 'asummerello', '7veDK01yHOcP');
INSERT INTO users (full_name, username, password) VALUES ('Alena Tremayle', 'atremaylep', 'XRrhMLRd');
INSERT INTO users (full_name, username, password) VALUES ('Gerty Derbyshire', 'gderbyshireq', 'VSRp3a1HI7');
INSERT INTO users (full_name, username, password) VALUES ('Turner France', 'tfrancer', 'tXO1st');
INSERT INTO users (full_name, username, password) VALUES ('Libby Eshelby', 'leshelbys', 'XPAHA4aN');
INSERT INTO users (full_name, username, password) VALUES ('Kerrie Jepperson', 'kjeppersont', 'bAaewI6Sko');
INSERT INTO users (full_name, username, password) VALUES ('Padraig Flaonier', 'pflaonieru', '3t0lavzF0p5');
INSERT INTO users (full_name, username, password) VALUES ('Sal Del Checolo', 'sdelv', 'X77SoSKwRWUN');
INSERT INTO users (full_name, username, password) VALUES ('Dallis Jefferys', 'djefferysw', 'KqfgUYeVDGr');
INSERT INTO users (full_name, username, password) VALUES ('Lorilyn Ceschini', 'lceschinix', 'ssfRVJs7O');
INSERT INTO users (full_name, username, password) VALUES ('Hortense Seago', 'hseagoy', 'BbTizji');
INSERT INTO users (full_name, username, password) VALUES ('Clotilda Bunney', 'cbunneyz', 'nh9N0y');
INSERT INTO users (full_name, username, password) VALUES ('Ambros Thoms', 'athoms10', 'FGAWIKQ1KS5K');
INSERT INTO users (full_name, username, password) VALUES ('Torry Headon', 'theadon11', '4iOpE5Q');
INSERT INTO users (full_name, username, password) VALUES ('Edee Mosson', 'emosson12', 'beHzg4');
INSERT INTO users (full_name, username, password) VALUES ('Sean Vinsen', 'svinsen13', 'KgJADRRP');
INSERT INTO users (full_name, username, password) VALUES ('Fraser Kingett', 'fkingett14', 'f3mM6UAyeC');
INSERT INTO users (full_name, username, password) VALUES ('Amalita Skirvane', 'askirvane15', '4RbG49RF28');
INSERT INTO users (full_name, username, password) VALUES ('Mab Kellegher', 'mkellegher16', 'PEDpiLeJfn3');
INSERT INTO users (full_name, username, password) VALUES ('Dot de Werk', 'dde17', 'Tf7BblF7bxT');
INSERT INTO users (full_name, username, password) VALUES ('Kiel Colicot', 'kcolicot18', 'hj59uAVGH2');
INSERT INTO users (full_name, username, password) VALUES ('Suellen Chiswell', 'schiswell19', 'Mykngp');
INSERT INTO users (full_name, username, password) VALUES ('Rouvin Inglefield', 'ringlefield1a', '810fWuz');
INSERT INTO users (full_name, username, password) VALUES ('Yurik Miranda', 'ymiranda1b', 'RUAUnz');
INSERT INTO users (full_name, username, password) VALUES ('Morlee Rosellini', 'mrosellini1c', 'xVPFOmRwGAA');
INSERT INTO users (full_name, username, password) VALUES ('Mycah Cahn', 'mcahn1d', 'Pe7vMD59KDVm');
INSERT INTO users (full_name, username, password) VALUES ('Shae Janczyk', 'sjanczyk1e', 'GG6GQkLIe71X');
INSERT INTO users (full_name, username, password) VALUES ('Feliks Ankrett', 'fankrett1f', '21Jldd');
INSERT INTO users (full_name, username, password) VALUES ('Tybie Bowyer', 'tbowyer1g', 'kuwM83SG');
INSERT INTO users (full_name, username, password) VALUES ('Nikoletta Acory', 'nacory1h', 'Muc4yF');
INSERT INTO users (full_name, username, password) VALUES ('Willi Eberdt', 'weberdt1i', 'xW4rcow');
INSERT INTO users (full_name, username, password) VALUES ('Cairistiona Bukac', 'cbukac1j', 'r7zLDC4gY');
INSERT INTO users (full_name, username, password) VALUES ('Demott De Courtney', 'dde1k', 'bjVI1XfhC');
INSERT INTO users (full_name, username, password) VALUES ('Ole Megarry', 'omegarry1l', 'OYLFJP');
INSERT INTO users (full_name, username, password) VALUES ('Demetri Skalls', 'dskalls1m', 'rNrZgI');
INSERT INTO users (full_name, username, password) VALUES ('Trenna Du Fray', 'tdu1n', 'bTqxsswYpq');
INSERT INTO users (full_name, username, password) VALUES ('Web Derisly', 'wderisly1o', 'WZFuQUEUyTgT');
INSERT INTO users (full_name, username, password) VALUES ('Ardella Hanscombe', 'ahanscombe1p', '9P2KEifq2');
INSERT INTO users (full_name, username, password) VALUES ('Sanford Norwell', 'snorwell1q', 'e8FGOjMc2mw');
INSERT INTO users (full_name, username, password) VALUES ('Raychel Canto', 'rcanto1r', '7ej62hbbR');
INSERT INTO users (full_name, username, password) VALUES ('Alphard Bresman', 'abresman1s', '3OpjpyBJUp');
INSERT INTO users (full_name, username, password) VALUES ('Mimi Twinterman', 'mtwinterman1t', 'dREszXih');
INSERT INTO users (full_name, username, password) VALUES ('Vicki Schachter', 'vschachter1u', '40HZQxiS8p');
INSERT INTO users (full_name, username, password) VALUES ('Baxie Nannizzi', 'bnannizzi1v', 'Q2Kq60QpL');
INSERT INTO users (full_name, username, password) VALUES ('Deny Delleschi', 'ddelleschi1w', 'VGVjaSW');
INSERT INTO users (full_name, username, password) VALUES ('Elias Bosman', 'ebosman1x', 'RVMxcU7ZE');
INSERT INTO users (full_name, username, password) VALUES ('Averyl Le Hucquet', 'ale1y', 'P5WTcQp');
INSERT INTO users (full_name, username, password) VALUES ('Moyra Rallings', 'mrallings1z', 'kvPvI4');
INSERT INTO users (full_name, username, password) VALUES ('Linzy Baggs', 'lbaggs20', 'VjbWSrMC');
INSERT INTO users (full_name, username, password) VALUES ('Fern holmes', 'fholmes21', 'PaQFGlfrctG');
INSERT INTO users (full_name, username, password) VALUES ('Arvy Cockshut', 'acockshut22', 'iqBmaKDlJ7p');
INSERT INTO users (full_name, username, password) VALUES ('Giovanna Hamblin', 'ghamblin23', 'SDt81H77');
INSERT INTO users (full_name, username, password) VALUES ('Cele Goodson', 'cgoodson24', 'wXoaU4F5Coj');
INSERT INTO users (full_name, username, password) VALUES ('Betsey Rispen', 'brispen25', 'hPn8rd26cQxb');
INSERT INTO users (full_name, username, password) VALUES ('Yank Reyner', 'yreyner26', 'm3yyq1rdh');
INSERT INTO users (full_name, username, password) VALUES ('Marga Dethloff', 'mdethloff27', 'fCX7YciSVw7');
INSERT INTO users (full_name, username, password) VALUES ('Randell Tanser', 'rtanser28', 'oTpNC37bgBoW');
INSERT INTO users (full_name, username, password) VALUES ('Virgina Mation', 'vmation29', 'zhBPfu');
INSERT INTO users (full_name, username, password) VALUES ('Tana Boadby', 'tboadby2a', 'ffEKgSYzpHq');
INSERT INTO users (full_name, username, password) VALUES ('Mathias Mc Meekin', 'mmc2b', 'kaSm0G');
INSERT INTO users (full_name, username, password) VALUES ('Neely Philippou', 'nphilippou2c', '3dOQGQ');
INSERT INTO users (full_name, username, password) VALUES ('Thibaut Littlecote', 'tlittlecote2d', '9M4EAh51G');
INSERT INTO users (full_name, username, password) VALUES ('Freeman Pisculli', 'fpisculli2e', 'LwF9SXg');
INSERT INTO users (full_name, username, password) VALUES ('Clarita Paynter', 'cpaynter2f', 'plfondm1b');
INSERT INTO users (full_name, username, password) VALUES ('Ruperto Le Moucheux', 'rle2g', 'FxkGGw');
INSERT INTO users (full_name, username, password) VALUES ('Kathie Downie', 'kdownie2h', 'DdkHTONDt');
INSERT INTO users (full_name, username, password) VALUES ('Florina Blabber', 'fblabber2i', 'NWSp4jy');
INSERT INTO users (full_name, username, password) VALUES ('Erica Elfe', 'eelfe2j', 'WQslbOrnNCzn');
INSERT INTO users (full_name, username, password) VALUES ('Darin York', 'dyork2k', 'MHTE4GOokN');
INSERT INTO users (full_name, username, password) VALUES ('Fabian Brunsdon', 'fbrunsdon2l', '7hP2awlXa');
INSERT INTO users (full_name, username, password) VALUES ('Manya MacBarron', 'mmacbarron2m', 'rJyiJ4');
INSERT INTO users (full_name, username, password) VALUES ('Kimmie Battisson', 'kbattisson2n', 'kENQNOdRmxj9');
INSERT INTO users (full_name, username, password) VALUES ('Orland Crowne', 'ocrowne2o', 'NGSQoa7');
INSERT INTO users (full_name, username, password) VALUES ('Aeriela Heap', 'aheap2p', 'IMdBMSdWbAHc');
INSERT INTO users (full_name, username, password) VALUES ('Orland Jecks', 'ojecks2q', 'lkSLvfo');
INSERT INTO users (full_name, username, password) VALUES ('Casar Murrhardt', 'cmurrhardt2r', '4uEHmWu');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;