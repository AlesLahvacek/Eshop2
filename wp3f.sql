-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Pon 04. bře 2024, 11:41
-- Verze serveru: 10.4.24-MariaDB
-- Verze PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `wp3f`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `objednavka`
--

CREATE TABLE `objednavka` (
  `id` int(11) NOT NULL,
  `jmeno` varchar(45) NOT NULL,
  `prijmeni` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefon` varchar(45) NOT NULL,
  `adresa` varchar(45) NOT NULL,
  `produkty` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`produkty`)),
  `vyrizena` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Vypisuji data pro tabulku `objednavka`
--

INSERT INTO `objednavka` (`id`, `jmeno`, `prijmeni`, `email`, `telefon`, `adresa`, `produkty`, `vyrizena`) VALUES
(1, 'tonda', 'malý', 'tonda@lul.com', '987654321', 'velka 123', '[\"5\",\"9\"]', 0),
(2, 'petr', 'kopo', 'kopo@kekw.cz', '456789123', 'adrese 456', '[\"4\",\"0\",\"1\"]', 1),
(5, 'fsafd', 'asdfsa', 'asdf@asdf.com', '321654987', 'dbob 654', '[\"11\"]', 0),
(10, ' dv dfb ', 'df db', 'fgb@fgfg.cz', '456123789', 'kok 123', '[\"1\",\"1\"]', 0);

-- --------------------------------------------------------

--
-- Struktura tabulky `objednavky`
--

CREATE TABLE `objednavky` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `produkt_id` int(11) NOT NULL,
  `jmeno` varchar(45) NOT NULL,
  `prijmeni` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefon` varchar(45) NOT NULL,
  `adresa` varchar(45) NOT NULL,
  `vyrizena` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabulky `produkt`
--

CREATE TABLE `produkt` (
  `produkt_id` int(11) NOT NULL,
  `nazev` varchar(45) NOT NULL,
  `cena` decimal(10,0) NOT NULL,
  `img` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Vypisuji data pro tabulku `produkt`
--

INSERT INTO `produkt` (`produkt_id`, `nazev`, `cena`, `img`) VALUES
(0, 'ananas', '160', 'ananas.jpg'),
(1, 'jablko', '100', 'jablko cervene.jpg'),
(2, 'jablko golden', '100', 'golden.jpg'),
(3, 'hruška', '110', 'hruska.jpg'),
(4, 'meloun', '180', 'meloun.jpg'),
(5, 'mrkev', '80', 'mrkev.jpg'),
(6, 'okurka', '90', 'okurka.jpg'),
(7, 'rajče', '75', 'rajce.jpg'),
(8, 'salát čínský', '70', 'salat.jpg'),
(9, 'salát hlávkový', '105', 'salatV.jpg'),
(10, 'víno zelené', '115', 'vino.jpg'),
(11, 'víno červené', '115', 'vinoc.jpg');

-- --------------------------------------------------------

--
-- Struktura tabulky `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Vypisuji data pro tabulku `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `admin`) VALUES
(1, 'admin', 'admin', 1),
(2, 'tonda', '1234', 0),
(3, 'lejmo', '12345', 0),
(5, 'test2', '56789', 0);

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `objednavka`
--
ALTER TABLE `objednavka`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ID` (`id`);

--
-- Indexy pro tabulku `objednavky`
--
ALTER TABLE `objednavky`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `produkt_id` (`produkt_id`);

--
-- Indexy pro tabulku `produkt`
--
ALTER TABLE `produkt`
  ADD PRIMARY KEY (`produkt_id`);

--
-- Indexy pro tabulku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `objednavka`
--
ALTER TABLE `objednavka`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `objednavky`
--
ALTER TABLE `objednavky`
  ADD CONSTRAINT `objednavky_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `objednavky_ibfk_2` FOREIGN KEY (`produkt_id`) REFERENCES `produkt` (`produkt_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
