var express = require('express');
var router = express.Router();
var db = require('../database/queries');
//var doc = require('../documentacao');

/**
 * @swagger
* definitions:
*  Aluno: 
*              type: object 
*              properties: 
*                  nome:
*                      type: string
*                  matricula: 
*                      type: string
*                  nota: 
*                      type: number
*                      format: double 
*  Endereco:
*           type: object 
*           properties: 
*                  rua:
*                      type: string
*                  numero: 
*                      type: integer
*                  bairro: 
*                      type: string 
*/

 /**
 * @swagger
 * /escola/alunos/{id}:
 *   get:
 *     tags:
 *        - Escola
 *     description: Retorna os dados de um aluno por id
 *     produces:
 *         - application/json
 *     parameters:
 *         - name: id
 *           description: Id do aluno matriculado
 *           in: path
 *           required: true
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *       400:
 *         description: Erro de sintaxe
 *       404:
 *         description: Não encontrado
 *       500:
 *         description: Erro intreno de servidor (Internal Server Error)
 */


 /**
 * @swagger
 * /escola/informacoes:
 *   get:
 *     tags:
 *       - Escola
 *     description: Retorna as informações gerais
 *     produces:
 *        - application/json
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Não encontrado
 *       500:
 *         description: Erro intreno de servidor (Internal Server Error)
*/

 /**
 * @swagger
* /escola/cadastrarAluno/:
*   post:
*     tags:
*       - Escola
*     description: Cadastra um novo aluno
*     produces:
*       - application/json
*     parameters:
*       - name: dados
*         description: Parâmetros para o cadastro de um aluno
*         in: body
*         required: true
*         schema:
*           type: object
*           properties: 
*              aluno: 
*                $ref: '#/definitions/Aluno'
*              endereco: 
*                $ref: '#/definitions/Endereco'
*           example:      
*              {aluno : { nome : Ana, matricula : "12345", nota : 9.7}, endereco: {rua : Rua Brasil, numero : 456, bairro : Campo Grande}}
*     responses:
*           200:
*               description: Sucesso
*           400:
*               description: Sintaxe incorreta
*           404:
*                description: Não encontrado
*           500:
*               description: Erro interno de servidor (Internal Server Error)
*/


 

router.get('/escola/alunos/:id', db.alunoListar);
router.get('/escola/informacoes', db.infoGeraisListar);
router.post('/escola/cadastrarAluno', db.alunoInserir); 


module.exports = router;
