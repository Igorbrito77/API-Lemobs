var express = require('express');
var router = express.Router();
var db = require('../queries');

/**
 * @swagger
 * definitions:
 *   Aluno:
 *     properties:
 *       nome:
 *         type: string
 *       matricula:
 *         type: string
 *       nota:
 *         type: float
 */

 /**
 * @swagger
 * definitions:
 *   Endereco:
 *     properties:
 *       rua:
 *         type: string
 *       numero:
 *         type: integer
 *       bairro:
 *         type: string
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
 *         description: Aluno retornado
 *         schema:
 *           $ref: '#/definitions/Aluno'
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
 *         description: Dados gerais retornados
 *         schema:
 *           $ref: '#/definitions/Aluno'
 */


  /**
 * @swagger
 * /escola/informacoes/{bairro}:
 *   get:
 *     tags:
 *       - Alunos
 *     description: Retorna o número total de alunos e a média de todas as notas por bairro
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bairro
 *         description: Nome do bairro
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Dados gerais do bairro retornados
 *         schema:
 *           $ref: '#/definitions/Aluno'
 */
 

 /**
 * @swagger
 * /escola/cadastrarAluno/:
 *   post:
 *     tags:
 *       - Alunos
 *     description: Cadastra um novo aluno através dos seus dados e endereço
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: aluno
 *         description: Json de Aluno e Endereço
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Aluno'
 *     responses:
 *       200:
 *         description: Aluno cadastrado
 */

router.get('/escola/alunos/:id', db.getAluno);
router.get('/escola/informacoes', db.informacoesGerais);
router.get('/escola/informacoes/:bairro', db.informacoesBairro);
router.post('/escola/cadastrarAluno', db.cadastrarAluno); 


module.exports = router;
