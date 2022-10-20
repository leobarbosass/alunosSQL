#Permite visualizar todos os databases existentes no BD
show databases;

#Permite apagar um database e toda sua estrutura de tabelas e dados
drop database db_lions_chool;

#Permite criar um database
create database db_lion_school;

#Permite que voce use o database
use db_lion_school;

#Permite visualizar todas as tabelas existentes dentro de um database
show tables;

#Permite apagar uma tabela
drop table tbl_alubo;

create table tbl_aluno (
	id int UNSIGNED not null auto_increment primary key,
    nome varchar(100) not null,
    foto varchar(100) not null,
    sexo varchar(1),
    rg varchar(15) not null,
    cpf varchar(18) not null,
    email varchar(256) not null,
    telefone varchar(20),
    celular varchar(18),
	data_nascimento date not null,
    unique index(id)
);

create table tbl_curso (
	id int UNSIGNED not null auto_increment primary key,
    nome varchar(50) not null,
    carga_horaria int not null,
    icone varchar(100),
    sigla varchar(5),
    unique index(id)
);

create table tbl_aluno_curso (
	id int UNSIGNED not null auto_increment primary key,
    id_aluno int UNSIGNED not null,
    id_curso int UNSIGNED not null,
    matricula varchar(15) not null,
    status_aluno varchar(10) not null,
    
    #Programacao para definir uma chave estrangeira
    foreign key (id_aluno) #define qual o atributo sera uma FK
		references tbl_aluno (id), #define de onde virá a PK
	foreign key (id_curso) #define qual o atributo sera uma FK
		references tbl_curso (id), #define de onde virá a PK
	unique index (id)
);

#Permite visualizar todos os dados de todas colunas de uma tabela
select * from tbl_aluno;


insert into tbl_aluno (nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento)
	values('José da Silva', 'https://akamai.sscdn.co/uploadfile/letras/fotos/b/a/1/f/ba1f76df9cef65f760e654a1c600a553.jpg', 'F',
			'34.456.666-1', '540.955.690.09', 'antony@gmail.com', '996336638', '11 996336638', '2006-03-01');

insert into tbl_aluno (nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento)
	values('Antony gaBriela', 'https://akamai.sscdn.co/uploadfile/letras/fotos/b/a/1/f/ba1f76df9cef65f760e654a1c600a553.jpg', 'F',
			'34.456.666-1', '527.566.908.69', 'toniBANANINHA@gmail.com', '996336638', '11 991899895', '2006-02-27');
            
 
#Permite alterar um valor da tabela
update tbl_aluno set rg = '35.444.555.2' where id = 2;
update tbl_aluno set email = 'tonyemolo@gmail.com' where id = 2;

#Permite apagar um registro de uma tabela
delete from tbl_aluno where id = 1;