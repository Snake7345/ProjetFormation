-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- H√¥te : 127.0.0.1:3306
-- G√©n√©r√© le : mar. 21 f√©v. 2023 √† 23:47
-- Version du serveur : 8.0.30
-- Version de PHP : 8.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de donn√©es : `dbformation2`
--

-- --------------------------------------------------------

--
-- Structure de la table `anneeslabo`
--

DROP TABLE IF EXISTS `anneeslabo`;
CREATE TABLE IF NOT EXISTS `anneeslabo` (
  `idAnneesLabo` int NOT NULL AUTO_INCREMENT,
  `annee` int NOT NULL,
  PRIMARY KEY (`idAnneesLabo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- D√©chargement des donn√©es de la table `anneeslabo`
--

INSERT INTO `anneeslabo` (`idAnneesLabo`, `annee`) VALUES
(1, 2019),
(2, 2020),
(3, 2021);

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `idCategories` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(10) NOT NULL,
  `actif` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idCategories`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- D√©chargement des donn√©es de la table `categories`
--

INSERT INTO `categories` (`idCategories`, `nom`, `actif`) VALUES
(1, 'miaou', 1);

-- --------------------------------------------------------

--
-- Structure de la table `payslabo`
--

DROP TABLE IF EXISTS `payslabo`;
CREATE TABLE IF NOT EXISTS `payslabo` (
  `idPaysLabo` int NOT NULL AUTO_INCREMENT,
  `denomination` varchar(100) NOT NULL,
  `fKIdValeursLaboIdValeursLabo` int NOT NULL,
  PRIMARY KEY (`idPaysLabo`),
  KEY `FK_eaea4829276e0059b4526ac30bb` (`fKIdValeursLaboIdValeursLabo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

--
-- D√©chargement des donn√©es de la table `payslabo`
--

INSERT INTO `payslabo` (`idPaysLabo`, `denomination`, `fKIdValeursLaboIdValeursLabo`) VALUES
(1, 'RÈpublique dÈmocatrice du Congo', 22),
(2, 'YÈmen', 23),
(3, 'Soudan du Sud', 24),
(4, 'RÈpublique centrafricaine', 25),
(5, 'NigÈria', 26),
(6, 'Soudan', 27),
(7, 'Afghanistan', 28),
(8, 'Ethiopie', 29),
(9, 'Haiti', 29),
(10, 'Niger', 30);

-- --------------------------------------------------------

--
-- Structure de la table `projetslabo`
--

DROP TABLE IF EXISTS `projetslabo`;
CREATE TABLE IF NOT EXISTS `projetslabo` (
  `idProjetsLabo` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `fKIdValeursLaboIdValeursLabo` int NOT NULL,
  `fKIdAnneesLaboIdAnneesLabo` int NOT NULL,
  PRIMARY KEY (`idProjetsLabo`),
  KEY `FK_43d6452917f90ea8c4d2e2b799c` (`fKIdValeursLaboIdValeursLabo`),
  KEY `FK_f7d8d78491a79a3bf1cef199e4e` (`fKIdAnneesLaboIdAnneesLabo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

--
-- D√©chargement des donn√©es de la table `projetslabo`
--

INSERT INTO `projetslabo` (`idProjetsLabo`, `nom`, `fKIdValeursLaboIdValeursLabo`, `fKIdAnneesLaboIdAnneesLabo`) VALUES
(1, 'ConsÈquences des conflits', 1, 1),
(2, 'ConsÈquences des conflits', 8, 2),
(3, 'ConsÈquences des conflits', 15, 3),
(4, 'Catastrophes mÈdicales', 2, 1),
(5, 'Catastrophes mÈdicales', 9, 2),
(6, 'Catastrophes mÈdicales', 16, 3),
(7, 'Victimes d\'exclusion des soins ou de violences', 6, 1),
(8, 'Victimes d\'exclusion des soins ou de violences', 13, 2),
(9, 'Victimes d\'exclusion des soins ou de violences', 20, 3),
(10, 'Catastrophes naturelles et humaines', 7, 1),
(11, 'Catastrophes naturelles et humaines', 14, 2),
(12, 'Catastrophes naturelles et humaines', 21, 3);

-- --------------------------------------------------------

--
-- Structure de la table `valeurslabo`
--

DROP TABLE IF EXISTS `valeurslabo`;
CREATE TABLE IF NOT EXISTS `valeurslabo` (
  `idValeursLabo` int NOT NULL AUTO_INCREMENT,
  `valeur` decimal(5,2) NOT NULL,
  PRIMARY KEY (`idValeursLabo`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;

--
-- D√©chargement des donn√©es de la table `valeurslabo`
--

INSERT INTO `valeurslabo` (`idValeursLabo`, `valeur`) VALUES
(1, '97.70'),
(2, '65.30'),
(6, '18.20'),
(7, '1.20'),
(8, '95.30'),
(9, '74.20'),
(13, '15.80'),
(14, '0.60'),
(15, '93.10'),
(16, '93.40'),
(20, '16.20'),
(21, '3.00'),
(22, '95.00'),
(23, '90.00'),
(24, '80.00'),
(25, '70.00'),
(26, '53.00'),
(27, '40.00'),
(28, '39.00'),
(29, '35.00'),
(30, '34.00');

--
-- Contraintes pour les tables d√©charg√©es
--

--
-- Contraintes pour la table `payslabo`
--
ALTER TABLE `payslabo`
  ADD CONSTRAINT `FK_eaea4829276e0059b4526ac30bb` FOREIGN KEY (`fKIdValeursLaboIdValeursLabo`) REFERENCES `valeurslabo` (`idValeursLabo`);

--
-- Contraintes pour la table `projetslabo`
--
ALTER TABLE `projetslabo`
  ADD CONSTRAINT `FK_43d6452917f90ea8c4d2e2b799c` FOREIGN KEY (`fKIdValeursLaboIdValeursLabo`) REFERENCES `valeurslabo` (`idValeursLabo`),
  ADD CONSTRAINT `FK_f7d8d78491a79a3bf1cef199e4e` FOREIGN KEY (`fKIdAnneesLaboIdAnneesLabo`) REFERENCES `anneeslabo` (`idAnneesLabo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
