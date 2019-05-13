DROP DATABASE IF EXISTS KCPD_Crime_Data_2018_db;

CREATE DATABASE KCPD_Crime_Data_2018_db;
USE KCPD_Crime_Data_2018_db;

CREATE TABLE Crime_Data_2018 (
	Report_No varchar(15),
    Reported_Date varchar(10),
    Reported_Time varchar(5),
    Offense int(4),
    IBRS varchar(3),
    Description varchar(30),
    Beat int(5),
    Address varchar(50),
    City varchar(15),
    Zip_Code varchar(5),
    Rep_Dist varchar(6),
    Area varchar(4),
    DVFlag varchar(1),
    Invl_No int(2),
    Involvement varchar(3),
    Race varchar(1),
    Sex varchar(1),
    Age varchar(3),
    Firearm_Used_Flag varchar(1),
    Location varchar(100),
    Lat_Lng varchar(25),
    Lat varchar(15),
    Lng varchar(15)
);