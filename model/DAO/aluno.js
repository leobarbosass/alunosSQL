///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OBJETIVO: Arquivo responsável pela manipulacao de dados com o Banco de Dados(Insert, Update, Select e Delete) //
// AUTOR: Leonardo Barbosa Santos                                                                                //
// DATA: 06/10/2022                                                                                              //
// VERSAO: 1.0                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Funcao para inserir um novo registro no Banco de dados
const insertAluno = async function(aluno){
    const { PrismaClient } = require('@prisma/client') //IMPORT DA CLASSE PrismaClient, que é responsavel pelas interacoes com o BD

    const prisma = new PrismaClient() //INSTANCIA DA CLASSE PrismaClient

    let sql = `insert into tbl_aluno (nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento)
               values( '${aluno.nome}', '${aluno.foto}', '${aluno.sexo}', '${aluno.rg}', '${aluno.cpf}', '${aluno.email}', '${aluno.telefone}', '${aluno.celular}', '${aluno.data_nascimento}')`

    //executa o script sql no banco de dados (.$executeRawUnsafe permite encaminhar uma variavel contendo o script)
    const result = await prisma.$executeRawUnsafe (sql)
    
    //verifica se o script foi executado com sucesso no BD
    if(result){
        return true
    }else{
        return false
    }
}

const updateAluno = async function(aluno){

}

const deleteAluno = async function(id){

}

const selectAllAlunos = async function(aluno){
    const { PrismaClient } = require('@prisma/client') //IMPORT DA CLASSE PrismaClient, que é responsavel pelas interacoes com o BD

    const prisma = new PrismaClient() //INSTANCIA DA CLASSE PrismaClient
                                                        //order by para ordenar de acordo com crescente e drecrescente (nome, id, etc)
    const rsAlunos = await prisma.$queryRaw `select cast(id as float) as id, nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento from tbl_aluno order by id desc` //Cria um objeto do tipo RecordSet (rsAlunos) para receber os dados do BD
                                                                    //as é para trocar a coluna do ID
    if(rsAlunos.length > 0){
        return rsAlunos
    }
    else{
        return false
    }
}

//console.log(selectAllAlunos())

module.exports = {
    selectAllAlunos,
    insertAluno
}