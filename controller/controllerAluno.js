/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OBJETIVO: Arquivo responsável pela manipulacao de recebimento, tratamento e retorno de dados entre api e model) //
// AUTOR: Leonardo Barbosa Santos                                                                                  //
// DATA: 06/10/2022                                                                                                //
// VERSAO: 1.0                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')

const novoAluno = async function(aluno){

    if(aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == '' || aluno.rg == undefined || aluno.cpf == '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' || aluno.data_nascimento == undefined){

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}

    //validacao para verificar email valido
    }else if (!aluno.email.includes('@')){

        return {status: 400, message:MESSAGE_ERROR.INVALID_EMAIL}

    }else{

        //chamar a funcao insert criada na MODEL
        const novoAluno = require('../model/DAO/aluno.js')
        const result = await novoAluno.insertAluno(aluno)

        if(result){
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        }else{
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }

    }
}

const atualizarAluno = async function(aluno){

    if(aluno.id == '' || aluno.id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }else{
        
    }

    if(aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == '' || aluno.rg == undefined || aluno.cpf == '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' || aluno.data_nascimento == undefined ){

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}

    //validacao para verificar email valido
    }else if (!aluno.email.includes('@')){

        return {status: 400, message:MESSAGE_ERROR.INVALID_EMAIL}

    }else{

        //chamar a funcao update (atualizar) na MODEL
        const atualizarAluno = require('../model/DAO/aluno.js')
        const result = await atualizarAluno.updateAluno(aluno)

        if(result){
            return {status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        }else{
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }

    }
}

const excluirAluno = async function(id){

    if(id == '' || id == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }else{

        //chamar a funcao update (atualizar) na MODEL
        const deletarAluno = require('../model/DAO/aluno.js')
        const result = await deletarAluno.deleteAluno(id)


        if(result){
            return {status: 201, message: MESSAGE_SUCCESS.DELETE_ITEM}
        }else{
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}


const listarAluno = async function(){
    let dadosAlunosJSON = {}

    const { selectAllAlunos } = require('../model/DAO/aluno.js')

    const dadosAlunos = await selectAllAlunos()

    if (dadosAlunos){
            //Conversao do tipo de dados BigInt para int ???????
            // dadosAlunos.reverse().forEach(element => {
              //  element.id = Number(element.id)
            //})

            //Criamos uma chave alunos no jSON para retornar o array de alunos
            dadosAlunosJSON.alunos = dadosAlunos
        return dadosAlunosJSON
    }else{
        return false
    }
}

module.exports = {
    listarAluno,
    novoAluno,
    atualizarAluno,
    excluirAluno
}