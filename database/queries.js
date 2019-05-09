var promise = require('bluebird');
//const secret = require('./secret');
var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var pg = require('pg');
//var user = 'postgres';
//var nameDatabase = 'bancolemobs';

//var connectionString = 'postgres://' + user+ ':' +secret.DATABASE_PASSWORD + '@localhost:5432/' + nameDatabase;
//var connectionString = 'postgres://vdhnbzazjnhtiu:220472865290e1f04c1a99aa10065b44f7afa76e3fb3af44b27c5ed15082f402@ec2-184-72-237-95.compute-1.amazonaws.com:5432/d3rng3cims4eus'

//var db = pgp(connectionString);
var db = pg(process.env.DATABASE_URL)

//get - retorna as informação de um aluno, tendo o seu id como parâmetro
function listar(req, res, next){

    (async() => { 

        try{
            var dados;

            await db.one('select * from aluno where id = $1', req.params.id).then(data =>{
                dados = data; 
            });

            res.status(200)
            .json({
                status: 'Successo',
                data: dados,
                message: 'Aluno retornado'
            });

        }
        catch(error){
            return res.status(400).send();
        }
    })();
}

//post - insere um novo aluno no banco de dados
function inserir(req, res, next) {
    console.log(req.body.aluno.matricula);
    (async() => { 

        try{

            var id_aluno, num_matriculados;

            await db.one('select count(*) from aluno where matricula = $1', req.body.aluno.matricula).then(data =>{
                num_matriculados = data.count
            });

            if(num_matriculados > 0)
                return res.status(401).send({error : 'Aluno já matriculado'});

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
            
            res.status(200)      
            .json({
                status: 'Successo',
                data:{"Total de alunos" : num_alunos , "Média total" : media, "Dados dos bairros" :  dados},
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
