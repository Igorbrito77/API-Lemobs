var promise = require('bluebird');
const secret = require('./secret');
// var options = {
//   promiseLib: promise
// };

//var pgp = require('pg-promise')(options);
var user = 'postgres';
var nameDatabase = 'bancolemobs';

//var connectionString = 'postgres://' + user+ ':' +secret.DATABASE_PASSWORD + '@localhost:5432/' + nameDatabase;
//var db = pgp(connectionString);

//get - retorna as informação de um aluno, tendo o seu id como parâmetro


const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://ohvmyywuzmgvnq:5a8214bded32e2d20a7add6a54e5526f81a655c2ba1ad9af618c77231c3560a0@ec2-184-72-237-95.compute-1.amazonaws.com:5432/damemcf2iu8o46',
  //connectionString : 'postgres://' + user+ ':' +secret.DATABASE_PASSWORD + '@localhost:5432/' + nameDatabase,
  ssl: true
});

client.connect();


function listar(req, res, next){

    (async() => { 

        try{
            var dados;
            var query_str = 'select * from aluno where id =' + req.params.id;

            await client.query(query_str).then(data =>{
                dados = data.rows; 
            });

            res.status(200)
            .json({
                status: 'Successo',
                data: dados,
                message: 'Aluno retornado'
            });

        }
        catch(error){
            return res.status(400);
        }
    })();
}

//post - insere um novo aluno no banco de dados
function inserir(req, res, next) {
   
    (async() => { 

        try{

           var id_endereco;
           var num_alunos;
            
            var query_str =`select count(*) from aluno where matricula = '` + req.body.aluno.matricula + `'`;
            var query_str2 = `insert into endereco (rua, numero, bairro) ` +
             `values('` + req.body.endereco.rua + `','` + req.body.endereco.numero + `', '`+ req.body.endereco.bairro +
             `') returning id`;     
          
            await client.query(query_str).then(data =>{
                num_alunos = data.rows[0].count; 
            });

            if(num_alunos > 0)
                return res.status(401).send({error : 'Aluno já matriculado'});

            await  client.query(query_str2).then(data =>{
                id_endereco = data.rows[0].id;
            });

            var query_str3 = `insert into aluno (nome, matricula, nota, endereco_id) `+
            `values( '` + req.body.aluno.nome + `', '` + req.body.aluno.matricula + `', `+ req.body.aluno.nota + `, ` + id_endereco + `)`;

            await  client.query(query_str3);

            res.status(200)
            .json({
                status: 'Sucesso',
                data : id_endereco,
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

            await client.query('select endereco.bairro , count(*) as total_alunos,  avg(aluno.nota) as media_notas from aluno inner join endereco' 
            + ' on aluno.endereco_id = endereco.id group by endereco.bairro order by count(*) desc ;').then(data =>{
                dados = data.rows;
            });
        
            await client.query('select count(*) from aluno').then(data =>{
                num_alunos = data.rows;
            });

            await  client.query('select avg(nota) from aluno').then(data =>{
                media = data.rows;
            });
            
            res.status(201)      
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
    //teste : teste,
    alunoListar : listar,
    alunoInserir : inserir,
    infoGeraisListar : infoGerais
};

