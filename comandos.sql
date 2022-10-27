#cria um novo database
create database db_video_locadora;

#mostra todos os databases
show databases;

#apaga um database
drop database db_video_locadora;

#escolhe qual o database será utilizado
use db_video_locadora;

#visualizar as tabelas existentes
show tables;

#apaga uma tabela
drop table tbl_filme;

#visualizar a estrutura de uma tabela
desc tbl_ator;

#renomeia a tabela
alter table tbl_filme rename tbl_filme2;

#apagar uma constraint de uma tabela
alter table tbl_ator_diretor
	drop foreign key FK_sexo_ator_diretor;

#criar uma nova constraint em uma tabela
alter table tbl_filme
	add constraint FK_classificacao_filme
		foreign key (id_classificacao)
        references tbl_classificacao (id);

#criar uma nova tabela (sempre comecar com uma tabela que nao recebe chave estrangeira)

# add    -   adicionar
# drop   -   apagar
# modify -   modificar
# change -   modificar

#############################################################|
															#|
#um exemplo de como apagar um atributo de uma coluna     	#|
alter table tbl_sexo 									 	#|
	drop column descricao;     							 	#|
															#|
#um exemplo de como apagar um atributo de uma coluna	 	#|
alter table tbl_ator_diretor								#|
	add column descricao varchar(30);					 	#|
															#|
#um exemplo de como modificar um atributo de uma coluna		#|
alter table tbl_sexo									 	#|
	modify column descricao varchar(31);				 	#|
															#|
#um exemplo de como renomear e mudar um atributo da coluna	#|
alter table tbl_sexo									 	#|
	change descricao descricao varchar(32);				 	#|
															#|
#############################################################|	


create table tbl_genero (
	id int not null auto_increment primary key,
    nome varchar(45) not null,
    unique index(id)
);

create table tbl_classificacao (
	id int not null auto_increment,
    nome varchar(20) not null,
    classificacao varchar(30) not null,
    caracteristica varchar(80) not null,
    unique index(id),
    primary key(id)
);

create table tbl_nacionalidade (
	id int not null auto_increment primary key,
    nacionalidade varchar(45) not null,
    unique index(id)
);

create table tbl_sexo (
	id int not null auto_increment primary key,
    sigla varchar(6),
    descricao varchar(30),
    unique index(id)
);

create table tbl_filme (
	id int not null auto_increment primary key,
    nome varchar(50) not null,
    nome_original varchar(50),
    duracao time,
    sinopse text,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(200),
    id_classificacao int not null, #atributo para receber a FK
    constraint FK_classificacao_filme #é apenas um nome para a FK
		foreign key (id_classificacao)	#identifica quem sera a FK
		references tbl_classificacao (id),  #de onde virá a PK
        unique index(id)
        );

create table tbl_filme_genero (
	id int not null auto_increment primary key,
    id_genero int not null,
    constraint FK_genero_filme
		foreign key(id_genero)
        references tbl_genero (id),
        
	id_filme int not null,
    constraint FK_filme_genero
		foreign key(id_filme)
        references tbl_filme (id),
        unique index(id)
);

create table tbl_ator_diretor (
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    nome_artistico varchar(80),
    data_nascimento date not null,
    data_falecimento date,
    foto varchar(150),
    
    id_sexo int not null,
    constraint FK_sexo_ator_diretor
		foreign key(id_sexo)
        references tbl_sexo(id),
	unique index(id)
);

create table tbl_diretor (
	id int not null auto_increment primary key,
    quantidade_filmes int,
    biografia text,
    ano_inicio_carreira year,
    
    id_ator_diretor int not null,
    constraint FK_diretor_ator_diretor
		foreign key(id_ator_diretor)
        references tbl_ator_diretor(id),
	unique index(id)
);

create table tbl_ator (
	id int not null auto_increment primary key,
    quantidade_filmes int,
    biografia text,
    ano_inicio_carreira year,
    
    id_ator_diretor int not null,
    constraint FK_ator_ator_diretor
		foreign key(id_ator_diretor)
        references tbl_ator_diretor(id),
	unique index(id)
);

create table tbl_filme_diretor (
	id int not null auto_increment primary key,
    
    id_diretor int not null,
    constraint FK_diretor_filme
		foreign key(id_diretor)
        references tbl_diretor (id),
    
    id_filme int not null,
    constraint FK_filme_diretor
		foreign key(id_filme)
        references tbl_filme (id),
	unique index(id)
);
	
create table tbl_filme_ator (
	id int not null auto_increment primary key,
    
    id_ator int not null,
    constraint FK_ator_filme
		foreign key(id_ator)
        references tbl_ator (id),
    
    id_filme int not null,
    constraint FK_filme_ator
		foreign key(id_filme)
        references tbl_filme (id),
	unique index(id)
);
	
create table tbl_ator_diretor_nacionalidade(
	id int not null auto_increment primary key,
    
    id_ator_diretor int not null,
    constraint FK_ator_diretor_nacionalidade
		foreign key(id_ator_diretor)
        references tbl_ator_diretor (id),
        
	id_nacionalidade int not null,
    constraint FK_nacionalidade_ator_diretor
		foreign key(id_nacionalidade)
        references tbl_nacionalidade (id),
	unique index (id)
);


