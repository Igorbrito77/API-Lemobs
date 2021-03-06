var promise = require('bluebird');
const secret = require('./secret');
var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var user = 'postgres'; // usuário do banco
var nameDatabase = 'bancolemobs';  // nome do banco de dados
var connectionString = 'postgres://' + user+ ':' +secret.DATABASE_PASSWORD + '@localhost:5432/' + nameDatabase;
var db = pgp(connectionString);


//get - retorna as informações de um aluno específico, tendo o seu id como parâmetro
function listar(req, res, next){

    (async() => { 

        try{
            var aluno, endereco;

            await db.one('select * from aluno where id = $1', req.params.id).then(data =>{
                aluno = data; 
            });

            await db.one('select * from endereco where id = $1', aluno.endereco_id).then(data =>{
                endereco = data;
            })

            res.status(200)
            .json({
                status: 'Successo',
                data: {"aluno " : {"nome" : aluno.nome, "matricula" : aluno.matricula,
                "nota" : aluno.nota, "endereco" : endereco}},
                message: 'Aluno retornado'
            });

        }
        catch(error){
            return res.status(400).send();
        }
    })();
}

//post - cadastra um novo aluno e seu respectivo endereço no banco de dados
function inserir(req, res, next) {
    console.log(req.body.aluno.matricula);
    (async() => { 

        try{

            var id_aluno, num_matriculados;

            await db.one('select count(*) from aluno where matricula = $1', req.body.aluno.matricula).then(data =>{
                num_matriculados = data.count
            });

            if(num_matriculados > 0)
                return res.status(401).send({error : 'Matrícula já cadastrada'});

            await  db.one('insert into endereco (rua, numero, bairro) ' +
            'values( ${rua}, ${numero}, ${bairro}) returning id', req.body.endereco).then(data =>{
                id_aluno = data.id;
            });

            await  db.none('insert into aluno (nome, matricula, nota, endereco_id)' +
            'values( ${nome}, ${matricula}, ${nota},' +  id_aluno + ')' , req.body.aluno);

            res.status(200)
            .json({
                status: 'Sucesso',
                message: 'Aluno cadastrado'
            });

        }
        catch(error){
            return res.status(400).send();
        }
    })();
  }

//get - retorna todas as informações gerais 
 function infoGerais(req, res, next){
 
    (async() => { 
        
        try{
            
            var num_alunos;
            var media;
            var dados;

            await db.many('select endereco.bairro , count(*) as total_alunos,  avg(aluno.nota) as media_notas from aluno inner join endereco' 
            + ' on aluno.endereco_id = endereco.id group by endereco.bairro order by count(*) desc ;').then(data =>{
                dados = data
            
            });
        
            await db.one('select count(*) from aluno').then(data =>{
                num_alunos = data.count;
            });

            await  db.one('select avg(nota) from aluno').then(data =>{
                media = data.avg;
            });
            
            res.status(201)      
            .json({
                status: 'Successo',
                data:{"total_alunos" : num_alunos , "media_total" : media, "info_bairros" :  dados},
                message: 'Informações gerais retornadas'
            });
        
        }
        catch(error){
            return res.status(500).send();
        }
    
    })();
 }


module.exports = {
    alunoListar : listar,
    alunoInserir : inserir,
    infoGeraisListar : infoGerais
};
