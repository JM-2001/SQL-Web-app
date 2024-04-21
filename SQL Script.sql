BEGIN TRANSACTION;
DROP TABLE IF EXISTS "Employee";
CREATE TABLE IF NOT EXISTS "Employee" (
	"EmpSSN"	VARCHAR(9) NOT NULL CHECK(LENGTH("EmpSSN") = 9),
	"DOB"	DATE,
	"FName"	TEXT,
	"Mint"	TEXT,
	"LName"	TEXT,
	"Address"	TEXT,
	PRIMARY KEY("EmpSSN")
);
DROP TABLE IF EXISTS "Dependent";
CREATE TABLE IF NOT EXISTS "Dependent" (
	"Name"	VARCHAR(255),
	"Relationship"	TEXT,
	"EmpSSN"	VARCHAR(9) NOT NULL,
	FOREIGN KEY("EmpSSN") REFERENCES "Employee"("EmpSSN") ON DELETE CASCADE,
	PRIMARY KEY("Name","EmpSSN")
);
DROP TABLE IF EXISTS "hourlyEmp";
CREATE TABLE IF NOT EXISTS "hourlyEmp" (
	"hourlyPay"	FLOAT CHECK("hourlyPay" >= 7.50),
	"EmpSSN"	VARCHAR(9) NOT NULL,
	FOREIGN KEY("EmpSSN") REFERENCES "Employee"("EmpSSN") ON DELETE CASCADE,
	PRIMARY KEY("EmpSSN")
);
DROP TABLE IF EXISTS "salariedEmp";
CREATE TABLE IF NOT EXISTS "salariedEmp" (
	"monthlySalary"	FLOAT,
	"EmpSSN"	VARCHAR(9) NOT NULL,
	FOREIGN KEY("EmpSSN") REFERENCES "Employee"("EmpSSN") ON DELETE CASCADE,
	PRIMARY KEY("EmpSSN")
);
DROP TABLE IF EXISTS "Department";
CREATE TABLE IF NOT EXISTS "Department" (
	"deptNum"	INT NOT NULL,
	"deptName"	TEXT,
	"numEmp"	INT,
	PRIMARY KEY("deptNum")
);
DROP TABLE IF EXISTS "Works_in";
CREATE TABLE IF NOT EXISTS "Works_in" (
	"EmpSSN"	VARCHAR(9) NOT NULL,
	"deptNum"	INT NOT NULL,
	FOREIGN KEY("EmpSSN") REFERENCES "Employee"("EmpSSN") ON DELETE CASCADE,
	FOREIGN KEY("deptNum") REFERENCES "Department"("deptNum") ON DELETE CASCADE,
	UNIQUE("EmpSSN")
);
DROP TABLE IF EXISTS "Locations";
CREATE TABLE IF NOT EXISTS "Locations" (
	"Locations"	VARCHAR(255),
	"deptNum"	INT NOT NULL,
	FOREIGN KEY("deptNum") REFERENCES "Department"("deptNum") ON DELETE CASCADE,
	PRIMARY KEY("Locations","deptNum")
);
DROP TABLE IF EXISTS "Projects";
CREATE TABLE IF NOT EXISTS "Projects" (
	"projName"	VARCHAR(255) NOT NULL,
	"projNum"	INT NOT NULL,
	"projDesc"	TEXT,
	PRIMARY KEY("projName","projNum")
);
DROP TABLE IF EXISTS "Works_on";
CREATE TABLE IF NOT EXISTS "Works_on" (
	"EmpSSN"	VARCHAR(9) NOT NULL,
	"projName"	VARCHAR(255) NOT NULL,
	"projNum"	INT NOT NULL,
	FOREIGN KEY("projName","projNum") REFERENCES "Projects"("projName","projNum") ON DELETE CASCADE,
	FOREIGN KEY("EmpSSN") REFERENCES "Employee"("EmpSSN") ON DELETE CASCADE
);
DROP TABLE IF EXISTS "Participates_in";
CREATE TABLE IF NOT EXISTS "Participates_in" (
	"deptNum"	INT NOT NULL,
	"projName"	VARCHAR(255) NOT NULL,
	"projNum"	INT NOT NULL,
	FOREIGN KEY("deptNum") REFERENCES "Department"("deptNum") ON DELETE CASCADE,
	FOREIGN KEY("projName","projNum") REFERENCES "Projects"("projName","projNum") ON DELETE CASCADE
);
DROP TABLE IF EXISTS "Works_Project_in";
CREATE TABLE IF NOT EXISTS "Works_Project_in" (
	"EmpSSN"	VARCHAR(9) NOT NULL,
	"deptNum"	INT NOT NULL,
	"projName"	VARCHAR(255) NOT NULL,
	"projNum"	INT NOT NULL,
	FOREIGN KEY("EmpSSN") REFERENCES "Employee"("EmpSSN") ON DELETE CASCADE,
	FOREIGN KEY("projName","projNum") REFERENCES "Projects"("projName","projNum") ON DELETE CASCADE,
	FOREIGN KEY("deptNum") REFERENCES "Department"("deptNum") ON DELETE CASCADE
);
DROP TABLE IF EXISTS "Manages";
CREATE TABLE IF NOT EXISTS "Manages" (
	"EmpSSN"	VARCHAR(9) NOT NULL,
	"deptNum"	INT NOT NULL,
	FOREIGN KEY("EmpSSN") REFERENCES "salariedEmp"("EmpSSN") ON DELETE CASCADE,
	FOREIGN KEY("deptNum") REFERENCES "Department"("deptNum") ON DELETE CASCADE,
	UNIQUE("EmpSSN"),
	UNIQUE("deptNum")
);
INSERT INTO "Employee" ("EmpSSN","DOB","FName","Mint","LName","Address") VALUES ('123456789','1990-05-15','John','A','Doe','123 Main St'),
 ('987654321','1992-08-20','Jane','B','Smith','456 Elm St'),
 ('234567890','1985-02-10','Michael','C','Johnson','789 Oak St'),
 ('345678901','1988-11-30','Emily','D','Williams','101 Pine St'),
 ('456789012','1990-01-30','Alex','C','Smith','103 Pine St'),
 ('567890123','1988-02-10','Joanna','E','Sabaria','101 Westgate St'),
 ('678901234','1970-05-20','Andy','Z','Xiao','4330 Meadow St'),
 ('789012345','1995-10-30','Jake','A','Hill','619 Florida St'),
 ('890123456','1993-12-20','Finn','H','Martin','1 Treehill Ln'),
 ('901234567','1997-09-20','Lesie','S','Pringle','10 Lobby Rd'),
 ('854234492','2003-07-25','Preston','M','Moore','83577 Violeta Loop'),
 ('513239906','2005-04-07','Luetta','S','Rice','518 Vi Camp'),
 ('680535740','1966-01-10','Josh','S','Skiles','0510 Kunde Summit'),
 ('381246863','1989-07-13','Carroll','A','Kautzer','130 Torp Walk'),
 ('561372222','1991-06-07','Delcie','L','Buckridge','2917 Leffler Trace'),
 ('671395621','1984-05-03','Raina','V','Price','3477 Block Isle'),
 ('787957513','1988-06-27','Raymon','A','Morar','59901 Stamm Valley'),
 ('716413533','2003-03-16','Theresia','T','Kreiger','977 Fisher Mount'),
 ('284543860','1963-03-22','Ruthanne','V','Fisher','3755 Frances Island'),
 ('601374449','1992-08-26','Lashawnda','J','Fahey','50884 Dach Street'),
 ('960373009','1964-07-05','Shea','R','Moen','68927 Matthew Plains'),
 ('205981081','1999-03-15','Dulcie','A','Jakubowski','3887 Oren Plaza'),
 ('166684045','1982-03-22','Rosalee','E','Lang','16040 Green Orchard'),
 ('817561721','1995-05-17','Otha','S','Spencer','70487 Lonnie Cliffs'),
 ('890595323','1965-06-21','Adolph','M','Kessler','285 Gusikowski Flat'),
 ('611295466','1994-04-03','Tomika','J','Armstrong','948 Harvey Street'),
 ('600114339','1989-04-21','Sherika','W','Volkman','71135 Nieves Coves'),
 ('227489365','1987-01-31','Hunter','R','Walter','138 Hane Ferry'),
 ('132642066','2003-01-25','Trish','J','Spinka','2667 Truman Ford'),
 ('988664109','1962-02-08','Long','A','Feest','9533 Abbott Course'),
 ('931318339','2003-12-16','Loren','T','Leuschke','3993 Donnelly Club'),
 ('260827502','1973-11-12','Luciano','R','Ward','533 Lemke Keys'),
 ('147451887','1993-04-06','See','C','Marvin','188 Clyde Avenue'),
 ('294774459','1969-10-08','Adam','D','Emard','7630 Yost Summit'),
 ('553922726','1994-09-26','Jesica','B','Bergstrom','72238 Cyril Mountains'),
 ('398119219','1963-07-13','Colette','C','Yost','872 Su Ford'),
 ('884972898','1960-03-16','Claude','J','Von','9357 Hickle Rapid'),
 ('246229265','1985-08-03','Ronnie','M','Rosenbaum','9194 Bradtke Mountain'),
 ('926268942','1972-09-03','Cedrick','V','Witting','7945 Remona Prairie'),
 ('108468326','1986-12-06','Hoyt','L','Strosin','1291 Dessie Knoll'),
 ('198512420','1968-09-15','Dan','C','Sipes','74668 Senger Burg'),
 ('804767330','1981-01-30','Robin','J','Harvey','964 Bahringer Parkway'),
 ('940267790','1966-08-23','Burton','M','Will','349 Louis Lane'),
 ('736387743','2000-07-06','Ernie','C','Kemmer','160 Tashina Highway'),
 ('602708180','1997-05-31','Damion','A','Conn','924 Windler Curve'),
 ('627231791','1965-06-13','Jerome','L','Murray','02540 Kling Gateway'),
 ('172688489','2006-01-19','Winston','S','Kuhic','211 Gerlach Station'),
 ('400314516','1981-06-12','Patricia','M','Hayes','9945 Reggie Pines'),
 ('608361871','1989-01-05','Carol','H','Morar','9435 Theo Extensions'),
 ('661831582','1973-09-01','Ranee','J','Hyatt','905 Carmella Hills');
INSERT INTO "Dependent" ("Name","Relationship","EmpSSN") VALUES ('Alex Doe','Child','123456789'),
 ('Jenna W. Smith','Child','987654321'),
 ('Kevin Q. Smith','Child','987654321'),
 ('Cathy E. Johnson','Parent','234567890'),
 ('Maddy Wilson','Parent','345678901'),
 ('Jake Wilson','Parent','345678901'),
 ('Sonia Williams','Child','345678901'),
 ('Dixie Smith','Child','456789012'),
 ('Jackie Sabaria','Child','567890123'),
 ('Henry Sabaria','Child','567890123'),
 ('Kang Xiao','Child','678901234'),
 ('Fred Martin','Child','890123456'),
 ('Penny Smith','Child','123456789'),
 ('Jackie Q. Smith','Child','987654321'),
 ('Vennie Q. Smith','Child','987654321');
INSERT INTO "hourlyEmp" ("hourlyPay","EmpSSN") VALUES (25.5,'123456789'),
 (19.75,'987654321'),
 (22.25,'234567890'),
 (12.75,'345678901'),
 (20.0,'901234567');
INSERT INTO "salariedEmp" ("monthlySalary","EmpSSN") VALUES (45000.0,'456789012'),
 (75000.0,'567890123'),
 (55500.0,'678901234'),
 (80000.0,'789012345'),
 (95000.0,'890123456');
INSERT INTO "Department" ("deptNum","deptName","numEmp") VALUES (101,'Engineering',5),
 (102,'Human Resources',2),
 (103,'Marketing',2),
 (104,'IT',1);
INSERT INTO "Works_in" ("EmpSSN","deptNum") VALUES ('890123456',101),
 ('456789012',102),
 ('678901234',103),
 ('789012345',104),
 ('567890123',101),
 ('123456789',101),
 ('234567890',101),
 ('901234567',101),
 ('345678901',102),
 ('987654321',103);
INSERT INTO "Locations" ("Locations","deptNum") VALUES ('main campus room 101, main campus room 102, main campus room 103',101),
 ('main campus room 105',102),
 ('main campus room 104',103),
 ('main campus room 106',104);
INSERT INTO "Projects" ("projName","projNum","projDesc") VALUES ('Product Robotics',5,'Creating a robot for assisting elderly'),
 ('Product Gadget',6,'Creating gadgets for existing robotics'),
 ('Product Picker',7,'Creating a product that will help pick products in warehouses'),
 ('HR: Hiring',8,'HR is hiring more employees'),
 ('IT: Revamp Infrastructure',9,'IT is updating the infrastructure');
INSERT INTO "Works_on" ("EmpSSN","projName","projNum") VALUES ('890123456','Product Robotics',5),
 ('890123456','Product Gadget',6),
 ('890123456','Product Picker',7),
 ('567890123','Product Robotics',5),
 ('123456789','Product Robotics',5),
 ('234567890','Product Gadget',6),
 ('901234567','Product Picker',7),
 ('345678901','HR: Hiring',8),
 ('456789012','HR: Hiring',8),
 ('789012345','IT: Revamp Infrastructure',9);
INSERT INTO "Participates_in" ("deptNum","projName","projNum") VALUES (101,'Product Robotics',5),
 (101,'Product Gadget',6),
 (101,'Product Picker',7),
 (102,'HR: Hiring',8),
 (104,'IT: Revamp Infrastructure',9);
INSERT INTO "Works_Project_in" ("EmpSSN","deptNum","projName","projNum") VALUES ('890123456',101,'Product Robotics',5),
 ('890123456',101,'Product Gadget',6),
 ('890123456',101,'Product Picker',7),
 ('567890123',101,'Product Robotics',5),
 ('123456789',101,'Product Robotics',5),
 ('234567890',101,'Product Gadget',6),
 ('901234567',101,'Product Picker',7),
 ('345678901',102,'HR: Hiring',8),
 ('456789012',102,'HR: Hiring',8),
 ('789012345',104,'IT: Revamp Infrastructure',9);
INSERT INTO "Manages" ("EmpSSN","deptNum") VALUES ('890123456',101),
 ('456789012',102),
 ('678901234',103),
 ('789012345',104);
COMMIT;
