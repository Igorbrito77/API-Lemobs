var promise = require('bluebird');

var options = {
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
        var dados;

        await db.many('select endereco.bairro , count(*) as total_alunos,  avg(aluno.nota) as media_notas from aluno inner join endereco' 
        + ' on aluno.endereco_id = endereco.id group by endereco.bairro order by count(*) desc ;').then(data =>{
            dados = data
           
        });
      
        await db.one('select count(id) from aluno').then(data =>{
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
        return next(error);
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
            status: 'Sucesso',
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
    cadastrarAluno : cadastrarAluno
};
