///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OBJETIVO: Arquivo responsável pela manipulacao de dados com o Banco de Dados(Insert, Update, Select e Delete) //
// AUTOR: Leonardo Barbosa Santos                                                                                //
// DATA: 27/10/2022                                                                                              //
// VERSAO: 1.0                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modulo/config.js')


const listarCursos = async function () {
    let dadosCursosJSON = {}

    const { selectAllCursos } = require('../model/DAO/curso.js')

    const dadosCursos = await selectAllCursos()

    if (dadosCursos) {
        dadosCursosJSON.cursos = dadosCursos
        return dadosCursosJSON
    } else {
        return false
    }
}

const novoCurso = async function (curso) {

    if (curso.nome == '' || curso.nome == undefined || curso.carga_horaria == '' || curso.carga_horaria == undefined || curso.icone == '' || curso.icone == undefined || curso.sigla == '' || curso.sigla == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }

      
    } else {

    
        const novoCurso = require('../model/DAO/curso.js')
        const result = await novoCurso.insertCurso(curso)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }

    }

}

const atualizarCurso = async function (curso) {

    if (curso.id == '' || curso.id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {

    }

    if (curso.nome == '' || curso.nome == undefined || curso.carga_horaria == '' || curso.carga_horaria == undefined || curso.icone == '' || curso.icone == undefined || curso.sigla == '' || curso.sigla == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }

    } else {

        const atualizarCurso = require('../model/DAO/curso.js')
        const result = atualizarCurso.updateCurso(curso)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return {
                status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB
            }

        }
    }
}

const excluirCurso = async function (id) {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {

        //validacao para verificar se o id existe no banco de dados
        const buscaByCurso = await buscarCurso(id)
        //valida se foi encontrado um registro valido
        if (buscaByCurso) {

            //chamar a funcao update (atualizar) na MODEL
            const deletarCurso = require('../model/DAO/curso.js')
            const result = await deletarCurso.deleteCurso(id)


            if (result) {
                return { status: 201, message: MESSAGE_SUCCESS.DELETE_ITEM }
            } else {
                return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
            }
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }

    }

}

const buscarCurso = async function (id) {
    let dadosCursosJSON = {}

    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {

        const { selectByIdCurso } = require('../model/DAO/curso.js')

        const dadosCursos = await selectByIdCurso(id)

        if (dadosCursos) {

            dadosCursosJSON.alunos = dadosCursos

            return dadosCursosJSON
        } else {
            return false
        }
    }
}

module.exports = {
    listarCursos,
    novoCurso,
    atualizarCurso,
    excluirCurso,
    buscarCurso
}
