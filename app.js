// Para manipular o acesso a Banco de Dados podemos utilizar o prisma
// Para instalar o prisma deve seguir os seguintes comandos:
// npm install prisma --save
// npx prisma
// npx prisma init
// npm install @prisma/client

/////////////////////////////////////////////////////////////////////
// OBJETIVO: API responsável pela manipulacao de dadosdo back-end. //
// AUTOR: Leonardo Barbosa Santos                                  //
// DATA: 10/10/2022                                                //
// VERSAO: 1.0                                                     //
/////////////////////////////////////////////////////////////////////

//import das bibliotecas (API)
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('./modulo/config.js')

const app = express()

//config de cors para liberar o acesso a API
app.use((request, response, next) => {
    response.header('Access-Coltrol-Allow-Origin', '*')
    response.header('Access-Coltrol-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    app.use(cors())
    next()
})

//Permite receber um json nas requisicoes
const jsonParser = bodyParser.json()

//EndPoint para listar todos os alunos
app.get('/alunos', cors(), async function (request, response) {

    let statusCode
    let message

    //import do arquivo controllerAluno
    const controllerAluno = require('./controller/controllerAluno.js')

    //Retorna  todos os alunos existentes no BD
    const dadosAlunos = await controllerAluno.listarAluno()

    if (dadosAlunos) {
        statusCode = 200
        message = dadosAlunos
    } else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //APARECER NO TERMINAL
    //console.log(message)

    //APARECER NO POSTMAN
    response.status(statusCode)
    response.json(message)

})

//EndPoint para inserir um novo aluno
app.post('/aluno', cors(), jsonParser, async function (request, response) {
    let statusCode
    let message
    let headerContentType

    //recebe um tipo de content-type que foi enviado da requisicao
    //application/json
    headerContentType = request.headers['content-type']

    //validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //recebe do corpo da mensagem o conteudo
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
            //import do arquivo da controller
            const controllerAluno = require('./controller/controllerAluno.js')
            //chama a funcao novoAluno da controller e encaminha os dados do body
            const novoAluno = await controllerAluno.novoAluno(dadosBody)

            statusCode = novoAluno.status
            message = novoAluno.message

        } else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }

    } else {
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    response.status(statusCode)
    response.json(message)

})

//EndPoint para atualizar um novo aluno
app.put('/aluno/:id', cors(), jsonParser, async function (request, response) {
    let statusCode
    let message
    let headerContentType

    //recebe um tipo de content-type que foi enviado da requisicao
    //application/json
    headerContentType = request.headers['content-type']

    //validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //recebe do corpo da mensagem o conteudo
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
            //recebe o id enviado por parametro na requisicao
            let id = request.params.id

            if (id != '' && id != undefined) {

                //adiciona o id no json que chegou no corpo da requisicao
                dadosBody.id = id

                //import do arquivo da controller
                const controllerAluno = require('./controller/controllerAluno.js')
                //chama a funcao atualizar da controller e encaminha os dados do body
                const atualizarAluno = await controllerAluno.atualizarAluno(dadosBody)

                statusCode = atualizarAluno.status
                message = atualizarAluno.message
            } else {
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }

        } else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }

    } else {
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    response.status(statusCode)
    response.json(message)

})

app.delete('/alunos/:id', cors(), jsonParser, async function (request, response) {
    let statusCode
    let message

    let id = request.params.id

    if (id != '' && id != undefined) {


        const controllerAluno = require('./controller/controllerAluno.js')
        const excluirAluno = await controllerAluno.excluirAluno(id)

        statusCode = excluirAluno.status
        message = excluirAluno.message
    } else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.status(statusCode)
    response.json(message)

})

//ativa o servidor para receber requisicoes http
app.listen(8080, function () {
    console.log('Servidor aguardando requisicoes')
})