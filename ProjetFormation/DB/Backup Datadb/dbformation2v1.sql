-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 12 juin 2023 à 22:42
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
  `nom` varchar(100) NOT NULL,
  `actif` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idCategories`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`idCategories`, `nom`, `actif`) VALUES
(1, 'Informatique', 1),
(2, 'Gastronomie', 1);

-- --------------------------------------------------------

--
-- Structure de la table `diplomes`
--

DROP TABLE IF EXISTS `diplomes`;
CREATE TABLE IF NOT EXISTS `diplomes` (
  `idDiplomes` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(150) NOT NULL,
  `formationIdFormations` int NOT NULL,
  PRIMARY KEY (`idDiplomes`),
  UNIQUE KEY `REL_b767796b87486be2198f6bfb46` (`formationIdFormations`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `diplomesutilisateurs`
--

DROP TABLE IF EXISTS `diplomesutilisateurs`;
CREATE TABLE IF NOT EXISTS `diplomesutilisateurs` (
  `idDiplomesUtilisateurs` int NOT NULL AUTO_INCREMENT,
  `diplomeEIdDiplomes` int NOT NULL,
  `diplomeUIdUtilisateurs` int NOT NULL,
  PRIMARY KEY (`idDiplomesUtilisateurs`),
  KEY `FK_05c5c613a488229151bae828638` (`diplomeEIdDiplomes`),
  KEY `FK_7532e903a36913b088813db2e61` (`diplomeUIdUtilisateurs`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `formations`
--

DROP TABLE IF EXISTS `formations`;
CREATE TABLE IF NOT EXISTS `formations` (
  `idFormations` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(150) NOT NULL,
  `infos` varchar(1000) DEFAULT NULL,
  `disponibilite` tinyint(1) NOT NULL DEFAULT '1',
  `dateheureLimiteInscription` timestamp NOT NULL,
  `dateheureQuestionnaire` timestamp NOT NULL,
  `categoriesIdCategories` int NOT NULL,
  `utilisateursIdUtilisateurs` int NOT NULL,
  `statut` enum('En cours','terminé','Annulé') NOT NULL DEFAULT 'En cours',
  PRIMARY KEY (`idFormations`),
  KEY `FK_72ef91194649c5a7ca9182c54d5` (`categoriesIdCategories`),
  KEY `FK_e480ed1b638392e89d55f084a8f` (`utilisateursIdUtilisateurs`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `formations`
--

INSERT INTO `formations` (`idFormations`, `nom`, `infos`, `disponibilite`, `dateheureLimiteInscription`, `dateheureQuestionnaire`, `categoriesIdCategories`, `utilisateursIdUtilisateurs`, `statut`) VALUES
(3, 'miaou', '', 0, '2023-05-31 09:34:42', '2023-06-01 09:34:44', 1, 2, 'En cours');

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
-- Déchargement des données de la table `payslabo`
--

INSERT INTO `payslabo` (`idPaysLabo`, `denomination`, `fKIdValeursLaboIdValeursLabo`) VALUES
(1, 'République démocatrice du Congo', 22),
(2, 'Yémen', 23),
(3, 'Soudan du Sud', 24),
(4, 'République centrafricaine', 25),
(5, 'Nigéria', 26),
(6, 'Soudan', 27),
(7, 'Afghanistan', 28),
(8, 'Ethiopie', 29),
(9, 'Haiti', 29),
(10, 'Niger', 30);

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `idPermissions` int NOT NULL AUTO_INCREMENT,
  `action` varchar(150) NOT NULL,
  `type` varchar(150) NOT NULL,
  PRIMARY KEY (`idPermissions`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `permissions`
--

INSERT INTO `permissions` (`idPermissions`, `action`, `type`) VALUES
(1, 'Add', 'Formations'),
(2, 'Update', 'Formations'),
(3, 'ActivDesactiv', 'Formations'),
(4, 'Read', 'Utilisateurs'),
(5, 'Read', 'Categories'),
(6, 'Add', 'Categories'),
(7, 'Update', 'Categories'),
(8, 'ActivDesactiv', 'Categories'),
(9, 'Read', 'Diplomes'),
(10, 'Add', 'Diplomes'),
(11, 'Update', 'Diplomes'),
(13, 'Read', 'Questions'),
(14, 'Add', 'Questions'),
(15, 'Update', 'Questions'),
(16, 'ActivDesactiv', 'Questions'),
(17, 'Read', 'Reponses'),
(18, 'Add', 'Reponses'),
(19, 'Update', 'Reponses'),
(21, 'Read', 'Roles'),
(22, 'Add', 'Roles'),
(23, 'Update', 'Roles'),
(24, 'ActivDesactiv', 'Roles'),
(25, 'Read', 'Syllabus'),
(26, 'Add', 'Syllabus'),
(27, 'Update', 'Syllabus'),
(28, 'ActivDesactiv', 'Syllabus'),
(29, 'Read', 'Formations'),
(30, 'Add', 'Utilisateurs'),
(31, 'ActivDesactiv', 'Utilisateurs'),
(32, 'Update', 'Utilisateurs');

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
-- Déchargement des données de la table `projetslabo`
--

INSERT INTO `projetslabo` (`idProjetsLabo`, `nom`, `fKIdValeursLaboIdValeursLabo`, `fKIdAnneesLaboIdAnneesLabo`) VALUES
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
-- Structure de la table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `idQuestions` int NOT NULL AUTO_INCREMENT,
  `question` varchar(250) NOT NULL,
  `cote` decimal(5,2) NOT NULL,
  `actif` tinyint(1) NOT NULL DEFAULT '1',
  `formationsIdFormations` int DEFAULT NULL,
  PRIMARY KEY (`idQuestions`),
  KEY `FK_527e8ad9e3822cb4ac92b6121de` (`formationsIdFormations`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `reponses`
--

DROP TABLE IF EXISTS `reponses`;
CREATE TABLE IF NOT EXISTS `reponses` (
  `idReponses` int NOT NULL AUTO_INCREMENT,
  `reponse` varchar(250) DEFAULT NULL,
  `coteAttribue` decimal(5,2) DEFAULT NULL,
  `utilisateursIdUtilisateurs` int NOT NULL,
  `questionsIdQuestions` int NOT NULL,
  PRIMARY KEY (`idReponses`),
  KEY `FK_f845311d62e3770ea13fe9a766e` (`questionsIdQuestions`),
  KEY `FK_dd2a42b2b640281545a0a605c54` (`utilisateursIdUtilisateurs`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `idRoles` int NOT NULL AUTO_INCREMENT,
  `denomination` varchar(70) NOT NULL,
  `actif` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idRoles`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`idRoles`, `denomination`, `actif`) VALUES
(1, 'Professeur', 1),
(2, 'Etudiant', 1),
(3, 'Administrateur', 1);

-- --------------------------------------------------------

--
-- Structure de la table `rolespermissions`
--

DROP TABLE IF EXISTS `rolespermissions`;
CREATE TABLE IF NOT EXISTS `rolespermissions` (
  `idRolespermissions` int NOT NULL AUTO_INCREMENT,
  `rolesIdRoles` int NOT NULL,
  `permissionsIdPermissions` int NOT NULL,
  PRIMARY KEY (`idRolespermissions`),
  KEY `FK_91b1690227b995e5f82242b4b08` (`rolesIdRoles`),
  KEY `FK_198c4f9d72d824cb54e11672100` (`permissionsIdPermissions`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `syllabus`
--

DROP TABLE IF EXISTS `syllabus`;
CREATE TABLE IF NOT EXISTS `syllabus` (
  `idSyllabus` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(150) NOT NULL,
  `chemin` varchar(255) NOT NULL,
  `actif` tinyint(1) NOT NULL DEFAULT '1',
  `formationsIdFormations` int DEFAULT NULL,
  PRIMARY KEY (`idSyllabus`),
  KEY `FK_f7d9338fe598d03d5b6597689a9` (`formationsIdFormations`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `syllabus`
--

INSERT INTO `syllabus` (`idSyllabus`, `nom`, `chemin`, `actif`, `formationsIdFormations`) VALUES
(1, 'Le syllabus de la formation', 'www.miamiam.php', 1, 3),
(2, 'eeeee', 'zezeaazeazezea', 1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `idUtilisateurs` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `NRN` varchar(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `sexe` enum('masculin','feminin','x') NOT NULL DEFAULT 'x',
  `actif` tinyint(1) NOT NULL DEFAULT '1',
  `roleIdRoles` int NOT NULL,
  PRIMARY KEY (`idUtilisateurs`),
  UNIQUE KEY `IDX_69813a01d3f155ad62f3b4a694` (`mail`),
  KEY `FK_3c62ba31706a8512a060cb7f3ec` (`roleIdRoles`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`idUtilisateurs`, `nom`, `prenom`, `mail`, `NRN`, `password`, `sexe`, `actif`, `roleIdRoles`) VALUES
(1, 'Bauduin', 'Axel', 'axelbauduin@gmail.com', '55555555555', '$2a$08$.JdSPohDelo.ZBKc9N66xua8ouUb4hfuoMsNDp76FChiLDzf9T7.K', 'masculin', 1, 3),
(2, 'Laporte', 'Jean', 'jl@gmail.com', '92091014755', '$2a$08$.JdSPohDelo.ZBKc9N66xua8ouUb4hfuoMsNDp76FChiLDzf9T7.K', 'masculin', 1, 1),
(3, 'Geerts', 'Quentin', 'qg@gmail.com', '92091045885', '$2b$08$laUBNgudsoPLFisCdJ1Vvu7CMnxkEMha0y5kFsJIQBXycCiMkEuM6', 'masculin', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurscategories`
--

DROP TABLE IF EXISTS `utilisateurscategories`;
CREATE TABLE IF NOT EXISTS `utilisateurscategories` (
  `idUtilisateursCategories` int NOT NULL AUTO_INCREMENT,
  `categoriesIdCategories` int NOT NULL,
  `utilisateursIdUtilisateurs` int NOT NULL,
  PRIMARY KEY (`idUtilisateursCategories`),
  KEY `FK_8301509af4b879b4967e5903ff4` (`categoriesIdCategories`),
  KEY `FK_7e06f742bb43e8afe3346bd1776` (`utilisateursIdUtilisateurs`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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
-- Déchargement des données de la table `valeurslabo`
--

INSERT INTO `valeurslabo` (`idValeursLabo`, `valeur`) VALUES
(1, 97.70),
(2, 65.30),
(6, 18.20),
(7, 1.20),
(8, 95.30),
(9, 74.20),
(13, 15.80),
(14, 0.60),
(15, 93.10),
(16, 93.40),
(20, 16.20),
(21, 3.00),
(22, 95.00),
(23, 90.00),
(24, 80.00),
(25, 70.00),
(26, 53.00),
(27, 40.00),
(28, 39.00),
(29, 35.00),
(30, 34.00);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `diplomes`
--
ALTER TABLE `diplomes`
  ADD CONSTRAINT `FK_b767796b87486be2198f6bfb461` FOREIGN KEY (`formationIdFormations`) REFERENCES `formations` (`idFormations`);

--
-- Contraintes pour la table `diplomesutilisateurs`
--
ALTER TABLE `diplomesutilisateurs`
  ADD CONSTRAINT `FK_05c5c613a488229151bae828638` FOREIGN KEY (`diplomeEIdDiplomes`) REFERENCES `diplomes` (`idDiplomes`),
  ADD CONSTRAINT `FK_7532e903a36913b088813db2e61` FOREIGN KEY (`diplomeUIdUtilisateurs`) REFERENCES `utilisateurs` (`idUtilisateurs`);

--
-- Contraintes pour la table `formations`
--
ALTER TABLE `formations`
  ADD CONSTRAINT `FK_72ef91194649c5a7ca9182c54d5` FOREIGN KEY (`categoriesIdCategories`) REFERENCES `categories` (`idCategories`),
  ADD CONSTRAINT `FK_e480ed1b638392e89d55f084a8f` FOREIGN KEY (`utilisateursIdUtilisateurs`) REFERENCES `utilisateurs` (`idUtilisateurs`);

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

--
-- Contraintes pour la table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `FK_527e8ad9e3822cb4ac92b6121de` FOREIGN KEY (`formationsIdFormations`) REFERENCES `formations` (`idFormations`);

--
-- Contraintes pour la table `reponses`
--
ALTER TABLE `reponses`
  ADD CONSTRAINT `FK_dd2a42b2b640281545a0a605c54` FOREIGN KEY (`utilisateursIdUtilisateurs`) REFERENCES `utilisateurs` (`idUtilisateurs`),
  ADD CONSTRAINT `FK_f845311d62e3770ea13fe9a766e` FOREIGN KEY (`questionsIdQuestions`) REFERENCES `questions` (`idQuestions`);

--
-- Contraintes pour la table `rolespermissions`
--
ALTER TABLE `rolespermissions`
  ADD CONSTRAINT `FK_198c4f9d72d824cb54e11672100` FOREIGN KEY (`permissionsIdPermissions`) REFERENCES `permissions` (`idPermissions`),
  ADD CONSTRAINT `FK_91b1690227b995e5f82242b4b08` FOREIGN KEY (`rolesIdRoles`) REFERENCES `roles` (`idRoles`);

--
-- Contraintes pour la table `syllabus`
--
ALTER TABLE `syllabus`
  ADD CONSTRAINT `FK_f7d9338fe598d03d5b6597689a9` FOREIGN KEY (`formationsIdFormations`) REFERENCES `formations` (`idFormations`);

--
-- Contraintes pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `FK_3c62ba31706a8512a060cb7f3ec` FOREIGN KEY (`roleIdRoles`) REFERENCES `roles` (`idRoles`);

--
-- Contraintes pour la table `utilisateurscategories`
--
ALTER TABLE `utilisateurscategories`
  ADD CONSTRAINT `FK_7e06f742bb43e8afe3346bd1776` FOREIGN KEY (`utilisateursIdUtilisateurs`) REFERENCES `utilisateurs` (`idUtilisateurs`),
  ADD CONSTRAINT `FK_8301509af4b879b4967e5903ff4` FOREIGN KEY (`categoriesIdCategories`) REFERENCES `categories` (`idCategories`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
