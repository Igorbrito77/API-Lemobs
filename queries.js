var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:bancoblz@localhost:5432/bancolemobs';
var db = pgp(connectionString);


async function getAluno(req, res, next){

    try{
        var id_aluno = parseInt(req.params.id);
        var dados;

        await db.one('select * from aluno where id = $1', id_aluno).then(data =>{
            dados = data; 
        });

        res.status(200)
        .json({
            status: 'success',
            data: dados,
            message: 'Aluno retornado'
        });

    }
    catch(error){
        return next(err);
    }
}


 async function informacoesGerais(req, res, next){
     
    try{
        
        var num_alunos;
        var media;

        await db.one('select count(id) from aluno').then(data =>{
            num_alunos = data.count;
        });

        await  db.one('select avg(nota) from aluno').then(data =>{
            media = data.avg;
        });

        res.status(200)      
        .json({
            status: 'successo',
            data: {"Total de alunos" : num_alunos, "Média das notas" : media },
            message: 'Total de alunos matriculados retornado'
        });
    
    }
    catch(error){
        return next(error);
    }
 }


async function informacoesBairro(req, res, next){

    try{

        var num_alunos;
        var media;
        
        await db.one('select count(*) as num_alunos from aluno inner join  endereco'+ 
        ' on aluno.endereco_id = endereco.id and endereco.bairro = $1', req.params.bairro).then(data=>{
            num_alunos = data.num_alunos;
        });

        await  db.one('select avg(aluno.nota) as media from aluno inner join  endereco' + 
        ' on aluno.endereco_id = endereco.id and endereco.bairro = $1', req.params.bairro).then(function(data){
            media = data.media;
        });

        res.status(200)
        .json({
            status: 'successo',
            data: {"Total de alunos matriculados" : num_alunos, "Média dos alunos" : media },
            message: 'Informação dos alunos matriculados no bairro retornadas'
        });

    }
    catch(error){
        return next(err);
    }
}


 async function cadastrarAluno(req, res, next) {

    try{

        var id_aluno;

        await  db.one('insert into endereco (rua, numero, bairro) ' +
        'values( ${rua}, ${numero}, ${bairro}) returning id', req.body.endereco).then(data =>{
            id_aluno = data.id;
        });

        await  db.none('insert into aluno (nome, matricula, nota, endereco_id)' +
        'values( ${nome}, ${matricula}, ${nota},' +  id_aluno + ')' , req.body.aluno);

        res.status(200)
        .json({
            status: 'sucesso',
            message: 'Aluno cadastrado'
        });

    }
    catch(error){
        return next(error);
    }
  }

  
module.exports = {
    getAluno : getAluno,
    informacoesGerais : informacoesGerais,
    informacoesBairro : informacoesBairro,
    cadastrarAluno : cadastrarAluno
};
