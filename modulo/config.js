/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OBJETIVO: Arquivo responsável pela configuracao de variaveis, constantes e mensagens do sistema, mensagem erro) //
// AUTOR: Leonardo Barbosa Santos                                                                                  //
// DATA: 13/10/2022                                                                                                //
// VERSAO: 1.0                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const MESSAGE_ERROR = {
    REQUIRED_FIELDS   : 'Existem campos obrigatorios que devem ser preenchidos',
    INVALID_EMAIL     : 'O e-mail informado nao é valido',
    CONTENT_TYPE      : 'O cabecalho nao possui um content-type válido!',
    EMPTY_BODY        : 'O body da requisicao nao pode estar vazio!',
    NOT_FOUND_DB      : 'Nao foram encontrados registros no banco de dados'
}   

const MESSAGE_SUCESS = {
    INSERT_ITEM       : 'Item criado com sucesso no Banco de Dados',
    UPDATE_ITEM       : 'Item criado com sucesso no Banco de Dados',
    DELETE_ITEM       : 'Item criado com sucesso no Banco de Dados',
}

module.exports = {
    MESSAGE_ERROR,
    MESSAGE_SUCESS
}