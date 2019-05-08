var express = require('express');
var router = express.Router();
var db = require('../queries');

/**
 * @swagger
   Aluno: 
*              type: object 
*              required: true
*                  -nome
*                  -matricula
*                  -nota
*              properties: 
*                  nome:
*                      type: string
*                  matricula: 
*                      type: integer
*                  nota: 
*                      type: number
*                      format: double 
*/

 /**
 * @swagger
 * definitions:
 *   Endereco:
 *           type: object 
 *           required: true
 *                  -rua
 *                  -numero
 *                  -bairro
 *           properties: 
 *                  nome:
 *                      rua: string
 *                  numero: 
 *                      type: integer
 *                  bairro: 
 *                      type: string 
 */

 /**
 * @swagger
 * definitions:
 *   ResponseList:
 *       200:
 *         description: Sucess
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */


 /**
 * @swagger
 * /escola/alunos/{id}:
 *   get:
 *     tags:
 *       - Alunos
 *     description: Retorna os dados de um aluno específico
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id (registro) do aluno matriculado
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Sucess
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */


 /**
 * @swagger
 * /escola/informacoes:
 *   get:
 *     tags:
 *       - Alunos
 *     description: Retorna o número total de alunos e a média de todas as notas
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Sucess
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
*/

 /**
 * @swagger
* /escola/cadastrarAluno/:
*   post:
*     tags:
*       - Alunos
*     description: Cadastrar um novo aluno através dos seus dados e endereço
*     produces:
*       - application/json
*     parameters:
*       - name: body
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
*              {aluno : { nome : Ana, matricula : 12345, nota : 9.7}, endereco: {rua : Rua Brasil, numero : 456, bairro : Campo Grande}}
*     responses:
*           200:
*               description: Sucess
*           400:
*               description: Bad Request
*           401:
*                description: Unauthorized
*           403:
*               description: Forbidden
*           404:
*                description: Not found
*           500:
*               description: Internal Server Error
*/


 

router.get('/escola/alunos/:id', db.alunoListar);
router.get('/escola/informacoes', db.infoGeraisListar);
router.post('/escola/cadastrarAluno', db.alunoInserir); 


module.exports = router;
