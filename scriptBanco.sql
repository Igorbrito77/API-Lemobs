drop database if exists bancolemobs;
create database bancolemobs;

\c bancolemobs


create table endereco (
				id INT GENERATED ALWAYS AS IDENTITY primary key,
				rua VARCHAR (255),
				numero INT,
				bairro VARCHAR(255)
);

create table aluno (
			id INT GENERATED ALWAYS AS IDENTITY primary key,
			nome VARCHAR(255),
			matricula VARCHAR(45),
			nota FLOAT,
			endereco_id INT references endereco(id)
);



insert into endereco (rua, numero, bairro) values('Jacomelote', 327, 'Corumbá');
insert into endereco (rua, numero, bairro) values('Rua da Baiana', 336, 'Monte Castelo');
insert into endereco (rua, numero, bairro) values('Conde de Irajá', 622, 'Bairro Botafogo');
insert into endereco (rua, numero, bairro) values('Rua Tranquilona', 444, 'Corumbá');
insert into endereco (rua, numero, bairro) values('Rua de boas', 565, 'Corumbá');


insert into aluno (nome, matricula, nota, endereco_id) values ('Igor', '11111', 9.5, 1);
insert into aluno (nome, matricula, nota, endereco_id) values ('Marcia', '22222',7.8, 2);
insert into aluno (nome, matricula, nota, endereco_id) values ('Lucas', '33333', 5.7, 3);
insert into aluno (nome, matricula, nota, endereco_id) values ('Júnior', '44444', 10, 4);
insert into aluno (nome, matricula, nota, endereco_id) values ('Augusto', '55555', 5.8, 4);
insert into aluno (nome, matricula, nota, endereco_id) values ('Pedro', '66666', 4.5, 5);
insert into aluno (nome, matricula, nota, endereco_id) values ('Paulo', '77777', 7.2, 5);
