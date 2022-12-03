-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 03, 2022 at 08:58 PM
-- Server version: 8.0.31-0ubuntu0.22.04.1
-- PHP Version: 8.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clearance`
--

-- --------------------------------------------------------

--
-- Table structure for table `dean_clearance`
--

CREATE TABLE `dean_clearance` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `signed_by` int NOT NULL,
  `status` varchar(244) NOT NULL,
  `date_created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dean_clearance`
--

INSERT INTO `dean_clearance` (`id`, `user_id`, `signed_by`, `status`, `date_created`) VALUES
(1, 1, 1, 'approved', '2022-12-03 08:26:55.678826');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int NOT NULL,
  `department` varchar(255) NOT NULL,
  `school_id` int NOT NULL,
  `date_created` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `department`, `school_id`, `date_created`) VALUES
(3, 'Super admin', 1, '2022-02-21 13:51:41.000000'),
(4, 'Super admin', 1, '2022-02-21 13:51:42.000000');

-- --------------------------------------------------------

--
-- Table structure for table `departmentaldues`
--

CREATE TABLE `departmentaldues` (
  `id` int NOT NULL,
  `student_id` int NOT NULL,
  `first_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `second_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `third_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `fourth_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `fifth_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Not Aprroved',
  `date_created` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departmentaldues`
--

INSERT INTO `departmentaldues` (`id`, `student_id`, `first_yr`, `second_yr`, `third_yr`, `fourth_yr`, `fifth_yr`, `status`, `date_created`) VALUES
(1, 1, 'deptDues/myfile_1669633822773.png', 'deptDues/myfile_1669633822774.png', 'deptDues/myfile_1669633822778.png', 'deptDues/myfile_1669633822779.png', 'deptDues/myfile_1669633822780.png', 'Approved', '2022-11-28 11:10:22');

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `id` int NOT NULL,
  `level` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `library_clearance`
--

CREATE TABLE `library_clearance` (
  `id` int NOT NULL,
  `student_id` int NOT NULL,
  `first_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `second_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `third_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `fourth_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `fifth_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Not Aprroved',
  `date_created` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `medical_clearance`
--

CREATE TABLE `medical_clearance` (
  `id` int NOT NULL,
  `student_id` int NOT NULL,
  `first_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `second_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `third_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `fourth_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `fifth_yr` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Not Aprroved',
  `date_created` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `medical_clearance`
--

INSERT INTO `medical_clearance` (`id`, `student_id`, `first_yr`, `second_yr`, `third_yr`, `fourth_yr`, `fifth_yr`, `status`, `date_created`) VALUES
(1, 1, 'medical/myfile_1669582903846.png', 'medical/myfile_1669582903852.png', 'medical/myfile_1669582903855.png', 'medical/myfile_1669582903857.png', 'medical/myfile_1669582903858.png', 'Approved', '2022-11-27 21:01:43');

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `Id` int NOT NULL,
  `student_Id` int NOT NULL,
  `course_Id` int NOT NULL,
  `level_Id` int NOT NULL,
  `semester_Id` int NOT NULL,
  `registered` tinyint NOT NULL DEFAULT '0',
  `session_Id` varchar(80) NOT NULL,
  `date_created` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `id` int NOT NULL,
  `school` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school`
--

INSERT INTO `school` (`id`, `school`) VALUES
(1, 'School of Engineering Technology'),
(2, 'School of Information and Computer Science'),
(3, 'School of Agricultural Technology'),
(4, 'School of Health Technology');

-- --------------------------------------------------------

--
-- Table structure for table `schoolfees`
--

CREATE TABLE `schoolfees` (
  `id` int NOT NULL,
  `student_id` int NOT NULL,
  `first_yr` varchar(255) NOT NULL,
  `second_yr` varchar(255) NOT NULL,
  `third_yr` varchar(255) NOT NULL,
  `fourth_yr` varchar(255) NOT NULL,
  `fifth_yr` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schoolfees`
--

INSERT INTO `schoolfees` (`id`, `student_id`, `first_yr`, `second_yr`, `third_yr`, `fourth_yr`, `fifth_yr`, `status`, `date_created`) VALUES
(1, 1, 'schFees/myfile_1669633345840.png', 'schFees/myfile_1669633345842.png', 'schFees/myfile_1669633345847.png', 'schFees/myfile_1669633345848.png', 'schFees/myfile_1669633345849.png', 'Approved', '2022-11-28 11:02:25');

-- --------------------------------------------------------

--
-- Table structure for table `studentAffairs_clearance`
--

CREATE TABLE `studentAffairs_clearance` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `signed_by` int NOT NULL,
  `status` varchar(244) NOT NULL,
  `date_created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `reg_number` varchar(255) NOT NULL,
  `course_adviser` varchar(244) DEFAULT NULL,
  `project_supervisor` varchar(244) DEFAULT NULL,
  `grad_year` varchar(244) DEFAULT NULL,
  `dept_admin` varchar(244) DEFAULT NULL,
  `department` int DEFAULT NULL,
  `password` varchar(225) NOT NULL,
  `status` varchar(244) NOT NULL,
  `date_created` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `reg_number`, `course_adviser`, `project_supervisor`, `grad_year`, `dept_admin`, `department`, `password`, `status`, `date_created`) VALUES
(1, '', '1234567890', NULL, NULL, NULL, NULL, NULL, '$2a$12$iP7JFnikRIzpFoxuwg4Q3OTNwmHPRjPWS9sszqJPHj/qcflYwgLLO', 'Approved', '2022-05-18 19:22:36');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` smallint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `password`, `type`) VALUES
(1, 'Super admin', '$2a$12$Wg0m25PbILHr3vdfaGTbW.UokDxdFpn1LrdKv9Pma9OczPgdwJbSS', 0),
(3, 'normal admin', '$2a$10$e2mrbxxmw6rezAtMwd7j6u/OW7BwRl5fz6RLkIAUAq611q7VLcCwy', 2),
(4, 'xzvxcvcxv', '$2a$10$dVeUn7Qjz6cdt/iqVISD7O/bUi42aI4XTyg7czpJyc00bJzDOdGEK', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dean_clearance`
--
ALTER TABLE `dean_clearance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departmentaldues`
--
ALTER TABLE `departmentaldues`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `library_clearance`
--
ALTER TABLE `library_clearance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medical_clearance`
--
ALTER TABLE `medical_clearance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schoolfees`
--
ALTER TABLE `schoolfees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `studentAffairs_clearance`
--
ALTER TABLE `studentAffairs_clearance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dean_clearance`
--
ALTER TABLE `dean_clearance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `departmentaldues`
--
ALTER TABLE `departmentaldues`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `library_clearance`
--
ALTER TABLE `library_clearance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medical_clearance`
--
ALTER TABLE `medical_clearance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `schoolfees`
--
ALTER TABLE `schoolfees`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `studentAffairs_clearance`
--
ALTER TABLE `studentAffairs_clearance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
