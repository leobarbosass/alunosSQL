use db_video_locadora;

show tables;

desc tbl_classificacao;

select * from tbl_classificacao;

#tabela do sexo
insert into tbl_sexo (sigla, descricao)
	values ('M', 'Masculino');

#tabela de classificacao
insert into tbl_classificacao (nome, classificacao, caracteristica)
	values ('10', 'Exibição em qualquer horário', 'Conteúdo violento ou linquagem inapropriada para criancas, ainda que em menor intensidade.'),
		   ('12', 'Não recomendado para menores de 12 anos.', 'As cenas podem conter agressão física, consumo de drogas e insinuação sexual'),
           ('14', 'Não recomendado para menores de 14 anos', 'Conteúdos mais acentuados com violência e ou linguagem sexual.'),
           ('16', 'Não recomendado para menores de 16 anos', 'Conteúdos de sexo ou violência mais intensos, com cenas de tortura, suicídio, estupro ou nudez total.'),
           ('18', 'Não recomendado para menores de 18 anos', 'Conteúdos violentos e sexuais extremos. Cenas de sexo, incesto ou atos repetidos de tortura, multilação ou abuso sexual.');

#caso de o erro de data too long quer dizer que o varchar tem menos letras do que voce quer colocar
alter table tbl_classificacao
	modify column classificacao varchar(80) not null,
    modify column caracteristica varchar(150) not null;
    
