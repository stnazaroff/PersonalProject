use profile;
CREATE TABLE USER(
	id int auto_increment,
    user_name VARCHAR(60),
	first_name VARCHAR(60),
    last_name VARCHAR(60),
    address VARCHAR(80),
    Primary key(id)
);

insert into USER (id, user_name, first_name, last_name, address) values (1, 'billy_bob', 'Billy', 'Bob', '555 Spring Rd');
Select * from user;