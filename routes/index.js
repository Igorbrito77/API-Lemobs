var express = require('express');
var router = express.Router();
var db = require('../database/queries');

/**
 * @swagger
* definitions:
*  Dados:      
*              properties:
*                 aluno:
*                    schema:
*                      type: object 
*                      $ref: '#/definitions/Aluno'
*                 endereco:
*                    schema:
*                      type: object 
*                      $ref: '#/definitions/Dados'
*
*  Aluno: 
*              properties: 
*                  nome:
*                      type: string
*                  matricula: 
*                      type: string
*                  nota: 
*                      type: number
*                      format: float 
*  
*  Endereco:
*              properties: 
*                   rua:
*                       type: string
*                   numero: 
*                       type: integer
*                   bairro: 
*                       type: string 
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
 *         description: Sucess
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
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
 *         description: Sucess
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
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
*           properties: 
*              Dados:
*                type: object 
*                $ref: '#/definitions/Dados'
*           example:      
*              {aluno : { nome : Ana, matricula : "12345", nota : 9.7}, endereco: {rua : Rua Brasil, numero : 456, bairro : Campo Grande}}
*     responses:
*           200:
*               description: Sucess
*           201:
*               description: Created
*           400:
*               description: Bad Request
*           404:
*                description: Not Found
*           500:
*               description: Internal Server Error
*/


router.get('/escola/alunos/:id', db.alunoListar);
router.get('/escola/informacoes', db.infoGeraisListar);
router.post('/escola/cadastrarAluno', db.alunoInserir); 


module.exports = router;
