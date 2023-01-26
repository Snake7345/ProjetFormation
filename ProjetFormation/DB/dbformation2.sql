-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 23 jan. 2023 à 14:34
-- Version du serveur : 8.0.31
-- Version de PHP : 8.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dbformation2`
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
-- Déchargement des données de la table `anneeslabo`
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
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`idCategories`, `nom`, `actif`) VALUES
(1, 'miaou', 1);

-- --------------------------------------------------------

--
-- Structure de la table `projetslabo`
--

DROP TABLE IF EXISTS `projetslabo`;
CREATE TABLE IF NOT EXISTS `projetslabo` (
  `idProjetsLabo` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `fKIdValeursLaboIdValeursLabo` int NOT NULL,
  `fKIdAnneesLaboIdAnneesLabo` int NOT NULL,
  PRIMARY KEY (`idProjetsLabo`),
  KEY `FK_43d6452917f90ea8c4d2e2b799c` (`fKIdValeursLaboIdValeursLabo`),
  KEY `FK_f7d8d78491a79a3bf1cef199e4e` (`fKIdAnneesLaboIdAnneesLabo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `projetslabo`
--

INSERT INTO `projetslabo` (`idProjetsLabo`, `nom`, `valeur_id`, `annee_id`) VALUES
(1, 'Conséquences des conflits', 1, 1),
(2, 'Conséquences des conflits', 8, 2),
(3, 'Conséquences des conflits', 15, 3),
(4, 'Catastrophes médicales', 2, 1),
(5, 'Catastrophes médicales', 9, 2),
(6, 'Catastrophes médicales', 16, 3),
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `valeurslabo`
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
(21, '3.00');

--
-- Contraintes pour les tables déchargées
--

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
