/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OBJETIVO: Arquivo responsável pela manipulacao de recebimento, tratamento e retorno de dados entre api e model) //
// AUTOR: Leonardo Barbosa Santos                                                                                  //
// DATA: 06/10/2022                                                                                                //
// VERSAO: 1.0                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const novoAluno = async function(aluno){

    if(aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == '' || aluno.rg == undefined || aluno.cpf == '' || 
                           aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' || aluno.data_nascimento == undefined){
        return false
    //validacao para verificar email valido
    }else if (!aluno.email.includes('@')){
        return false
    }else{//chamar a funcao insert criada na MODEL
        const novoAluno = require('../model/DAO/aluno.js')
        const result = novoAluno.insertAluno(aluno)

        if(result){
            return true
        }else{
            return false
        }
    }
}
const atualizarAluno = async function(aluno){

}
const excluirAluno = async function(id){

}
const listarAluno = async function(){
    let dadosAlunosJSON = {}

    const { selectAllAlunos } = require('../model/DAO/aluno.js')

    const dadosAlunos = await selectAllAlunos()

    if (dadosAlunos){
            //Conversao do tipo de dados BigInt para int ???????
            dadosAlunos.reverse().forEach(element => {
                element.id = Number(element.id)
            })
            //Criamos uma chave alunos no jSON para retornar o array de alunos
            dadosAlunosJSON.alunos = dadosAlunos
        return dadosAlunosJSON
    }else{
        return false
    }
}

module.exports = {
    listarAluno,
    novoAluno
}