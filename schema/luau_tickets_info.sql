-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 31, 2020 at 12:12 AM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tribunal`
--

-- --------------------------------------------------------

--
-- Table structure for table `luau_tickets_info`
--

CREATE TABLE `luau_tickets_info` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `event_date` varchar(10) NOT NULL,
  `venmo_recipient` varchar(128) NOT NULL,
  `admin_name` varchar(128) NOT NULL,
  `admin_email` varchar(128) NOT NULL,
  `super_email` varchar(128) NOT NULL,
  `price` int(2) NOT NULL,
  `luau_open` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `luau_tickets_info`
--

INSERT INTO `luau_tickets_info` (`id`, `description`, `event_date`, `venmo_recipient`, `admin_name`, `admin_email`, `super_email`, `price`, `luau_open`) VALUES
(1, 'So I can see something', '1/23/2020', 'CEASTribunal', 'admin', 'admin@admin.com', 'admin@admin.com', 20, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `luau_tickets_info`
--
ALTER TABLE `luau_tickets_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `luau_tickets_info`
--
ALTER TABLE `luau_tickets_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
