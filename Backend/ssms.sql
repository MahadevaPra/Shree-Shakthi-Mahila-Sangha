-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2024 at 08:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ssms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_info`
--

CREATE TABLE `admin_info` (
  `id` int(11) NOT NULL,
  `S_id` int(11) NOT NULL,
  `User_id` varchar(255) NOT NULL,
  `Phone_num` bigint(20) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_info`
--

INSERT INTO `admin_info` (`id`, `S_id`, `User_id`, `Phone_num`, `Email`, `Password`) VALUES
(0, 2, '1', 1234567984, 'prasuprasu148@gmail.com', 'Prasad@1234'),
(0, 2, '3', 123546877, 'prasad@gmail.com', 'Sangha@123'),
(0, 2, '55842', 1234567984, 'mahadevaprasadcs23@gmail.com', 'Soma@321'),
(0, 2, '3', 1234567984, 'isagards22@gmail.com', 'Prasad@1234'),
(0, 3, '12', 1234567984, 'prasad@gmail.com', 'Prasad@123');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `Mem_id` int(30) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Savings` int(50) NOT NULL,
  `Loan` int(50) NOT NULL,
  `Ac_number` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`Mem_id`, `Name`, `Savings`, `Loan`, `Ac_number`) VALUES
(1, 'prasad', 100, 0, 123456),
(5, 'basamma', 200, 0, 2147483647),
(6, 'basamma', 200, 0, 1234567890),
(23, 'sanagamma', 200, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `s_total`
--

CREATE TABLE `s_total` (
  `T_members` int(10) NOT NULL,
  `T_money` int(10) NOT NULL,
  `T_loan` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`Mem_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
