///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OBJETIVO: Arquivo responsável pela manipulacao de dados com o Banco de Dados(Insert, Update, Select e Delete) //
// AUTOR: Leonardo Barbosa Santos                                                                                //
// DATA: 27/10/2022                                                                                              //
// VERSAO: 1.0                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Funcao para inserir um novo registro no Banco de dados

const selectAllCursos = async function() {
    const { PrismaClient } = require('@prisma/client') //IMPORT DA CLASSE PrismaClient, que é responsavel pelas interacoes com o BD

    const prisma = new PrismaClient() //INSTANCIA DA CLASSE PrismaClient
                                                        //order by para ordenar de acordo com crescente e drecrescente (nome, id, etc)
    const rsCursos = await prisma.$queryRaw `select cast(id as float) as id, nome, carga_horaria, icone, sigla from tbl_curso order by id desc` //Cria um objeto do tipo RecordSet (rsAlunos) para receber os dados do BD
                                                                    //as é para trocar a coluna do ID
    if(rsCursos.length > 0){
        return rsCursos
    }
    else{
        return false
    }
}

const insertCurso = async function(curso) {
    try{

        const { PrismaClient } = require('@prisma/client') //IMPORT DA CLASSE PrismaClient, que é responsavel pelas interacoes com o BD

        const prisma = new PrismaClient() //INSTANCIA DA CLASSE PrismaClient

        let sql = `insert into tbl_curso (nome, carga_horaria, icone, sigla)
                values( '${curso.nome}', '${curso.carga_horaria}', '${curso.icone}', '${curso.sigla}')`

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

const updateCurso = async function(curso) {
    try{

        const { PrismaClient } = require('@prisma/client') 

        const prisma = new PrismaClient()

        let sql = `update tbl_curso set nome =                  '${curso.nome}',
                                        carga_horaria =         '${curso.carga_horaria}', 
                                        icone =                 '${curso.icone}', 
                                        sigla =                 '${curso.sigla}' where id = ${curso.id}`

        const result = await prisma.$executeRawUnsafe (sql)
        if(result){
            return true
        }else{
            return false
        }
     

    } catch (error){
        return false
    }
}

const deleteCurso = async function(id) {
    try{

        const { PrismaClient } = require('@prisma/client') //IMPORT DA CLASSE PrismaClient, que é responsavel pelas interacoes com o BD

        const prisma = new PrismaClient() //INSTANCIA DA CLASSE PrismaClient

        let sql = `delete from tbl_curso where id = '${id}'`

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

const selectByIdCurso = async function(id) {
    const { PrismaClient } = require('@prisma/client') //IMPORT DA CLASSE PrismaClient, que é responsavel pelas interacoes com o BD

    const prisma = new PrismaClient() //INSTANCIA DA CLASSE PrismaClient
                                                        //order by para ordenar de acordo com crescente e drecrescente (nome, id, etc)
    let sql = `select cast(id as float) as id, nome, carga_horaria, icone, sigla from tbl_curso where id = ${id}` 
    const rsCurso = await prisma.$queryRawUnsafe(sql) //Cria um objeto do tipo RecordSet (rsAlunos) para receber os dados do BD
                                                                    //as é para trocar a coluna do ID
    if(rsCurso.length > 0){
        return rsCurso 
    }
    else{
        return false
    }
}

module.exports = {
    selectAllCursos,
    insertCurso,
    updateCurso,
    deleteCurso,
    selectByIdCurso
}