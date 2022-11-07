///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OBJETIVO: Arquivo responsável pela manipulacao de dados com o Banco de Dados(Insert, Update, Select e Delete) //
// AUTOR: Leonardo Barbosa Santos                                                                                //
// DATA: 06/10/2022                                                                                              //
// VERSAO: 1.0                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Funcao para inserir um novo registro no Banco de dados
const insertAluno = async function(aluno){
    try{

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

    } catch (error){
        return false
    }
}

const updateAluno = async function(aluno){
    try{

        const { PrismaClient } = require('@prisma/client') //IMPORT DA CLASSE PrismaClient, que é responsavel pelas interacoes com o BD

        const prisma = new PrismaClient() //INSTANCIA DA CLASSE PrismaClient

        let sql = `update tbl_aluno set nome =                  '${aluno.nome}',
                                        foto =                  '${aluno.foto}', 
                                        sexo =                  '${aluno.sexo}', 
                                        rg =                    '${aluno.rg}', 
                                        cpf =                   '${aluno.cpf}', 
                                        email =                 '${aluno.email}', 
                                        telefone =              '${aluno.telefone}', 
                                        celular =               '${aluno.celular}', 
                                        data_nascimento =       '${aluno.data_nascimento}' 
                                        where id =              '${aluno.id}'`

        //executa o script sql no banco de dados (.$executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql)
        
        //verifica se o script foi executado com sucesso no BD
        if(result){
            return true
        }else{
            return false
        }

    } catch (error){
        return false
    }
}

const deleteAluno = async function(id){
    try{

        const { PrismaClient } = require('@prisma/client') //IMPORT DA CLASSE PrismaClient, que é responsavel pelas interacoes com o BD

        const prisma = new PrismaClient() //INSTANCIA DA CLASSE PrismaClient

        let sql = `delete from tbl_aluno  where id = '${id}'`

        //executa o script sql no banco de dados (.$executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql)
        
        //verifica se o script foi executado com sucesso no BD
        if(result){
            return true
        }else{
            return false
        }

    } catch (error){
        return false
    }
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

const selectByIdAluno = async function(id){
    const { PrismaClient } = require('@prisma/client') //IMPORT DA CLASSE PrismaClient, que é responsavel pelas interacoes com o BD

    const prisma = new PrismaClient() //INSTANCIA DA CLASSE PrismaClient
                                                        //order by para ordenar de acordo com crescente e drecrescente (nome, id, etc)
    let sql = `select cast(id as float) as id, nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento from tbl_aluno where id = ${id}` 

    const rsAluno = await prisma.$queryRawUnsafe(sql) //Cria um objeto do tipo RecordSet (rsAlunos) para receber os dados do BD
                                                                    //as é para trocar a coluna do ID
    if(rsAluno.length > 0){
        return rsAluno
    }
    else{
        return false
    }
}

//Funcao para retornar o ultimo ID gerado no Banco de Dados
const selectLastId = async function(){
    const { PrismaClient } = require('@prisma/client') //IMPORT DA CLASSE PrismaClient, que é responsavel pelas interacoes com o BD

    const prisma = new PrismaClient() //INSTANCIA DA CLASSE PrismaClient

    //Script para buscar o ultimo ID gerado no banco d dados
    let sql = `select cast(id as float) as id from tbl_aluno order by id desc limit 1`

    const id = await prisma.$queryRawUnsafe(sql) //Cria um objeto do tipo RecordSet (rsAlunos) para receber os dados do BD
                                                                    //as é para trocar a coluna do ID
    if(id.length > 0){
        return id
    }
    else{
        return false
    }

}

module.exports = {
    selectAllAlunos,
    insertAluno,
    updateAluno,
    deleteAluno,
    selectByIdAluno,
    selectLastId
}