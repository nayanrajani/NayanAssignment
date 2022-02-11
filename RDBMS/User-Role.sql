use hospital;

Create Table user(
	UserId int Primary Key,
    UserName varchar(200)  Not Null unique,
    Password varchar(200)  Not Null unique,
    Roles varchar(100)
) ;

DELETE FROM `hospital`.`user` WHERE (`UserId` = '3');
ALTER TABLE user ADD COLUMN Roles varchar(100);

select * from user;
insert into user values(1 ,'mahesh@msit.com', 'Pas@123');
insert into user values(2,'nayan@ok.com', 'Okay@1234');
insert into user values(3,'harsh@gmail.com', 'Pass@123');
insert into user values(4,'arun@gmail.com', 'Pss@123', 'Doctor');


Create Table role(
	RoleId int primary key auto_increment,
    RoleName varchar(200)  Not Null
) ;
select * from role;
insert into role(RoleName) values('Admin');
insert into role(RoleName) values('Operator');
insert into role(RoleName) values('Doctor');









Create Table userinrole(
	RelationId int Primary Key unique,
    UserId int Not Null,
    RoleId int Not Null,
    
    foreign key (UserId) references user (UserId),
    foreign key (RoleId) references role (RoleId)
) ;
select * from userinrole;
insert into userinrole values(1, 1, 1);
insert into userinrole values(2, 2, 2);
insert into userinrole values(3, 3, 3);