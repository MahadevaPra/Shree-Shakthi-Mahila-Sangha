-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Mar 18, 2025 at 06:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
(0, 3, '12', 1234567984, 'prasad@gmail.com', 'Prasad@123'),
(0, 4, '24Ma12', 2146875416, 'gujdhsgfviu@gmail.com', '$2a$10$5KlwMo/UCRvXlWbvqaZZA.dyz8uxO0rWLwiAJ9j.Mm7j8bbMeNDQi');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `Mem_id` int(30) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Savings` int(50) NOT NULL,
  `Loan` int(50) NOT NULL,
  `Ac_number` int(20) NOT NULL,
  `saved_at` datetime DEFAULT current_timestamp(),
  `loan_given_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`Mem_id`, `Name`, `Savings`, `Loan`, `Ac_number`, `saved_at`, `loan_given_at`, `created_at`) VALUES
(1, 'prasad', 300, -10000, 123456, '2025-03-11 13:40:15', '2025-03-11 13:40:15', '2025-03-11 13:37:59'),
(5, 'basamma', 200, 0, 2147483647, '2025-03-11 13:35:58', NULL, '2025-03-11 13:37:59'),
(6, 'basamma', 200, 0, 1234567890, '2025-03-11 13:35:58', NULL, '2025-03-11 13:37:59'),
(12, 'Sagar', 200, 0, 145893548, '2025-03-11 13:45:12', NULL, '2025-03-11 13:45:12'),
(23, 'sanagamma', 200, 0, 0, '2025-03-11 13:35:58', NULL, '2025-03-11 13:37:59');

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
-- Dumping data for table `s_total`
--

INSERT INTO `s_total` (`T_members`, `T_money`, `T_loan`) VALUES
(4, 900, -10000);

-- --------------------------------------------------------

--
-- Table structure for table `userfeedback`
--

CREATE TABLE `userfeedback` (
  `feedback_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `feedback_text` text NOT NULL,
  `problem_text` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userfeedback`
--

INSERT INTO `userfeedback` (`feedback_id`, `user_id`, `feedback_text`, `problem_text`, `created_at`) VALUES
(1, '1', 'hi', 'Nothing', '2025-03-11 13:44:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`Mem_id`);

--
-- Indexes for table `userfeedback`
--
ALTER TABLE `userfeedback`
  ADD PRIMARY KEY (`feedback_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `userfeedback`
--
ALTER TABLE `userfeedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
