//Parte de validar o login e conexão com o banco de dados
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: ''
});

db.connect((err) => {
  if (err) {
    console.log('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com sucesso');
  }
});

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === 'raquelgabi.nasci1815@gmail.com' && senha === '12345') {
    const token = jwt.sign({ email }, 'segredo', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

//Conexão de rotas para API 
function verificaToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, 'segredo', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Falha na autenticação do token' });
    }

    req.usuarioId = decoded.id;
    next();
  });
}

app.get('/dados-protegidos', verificaToken, (req, res) => {
  res.json({ mensagem: 'Informações protegidas por token' });
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

  
app.post('/alimentos', verificaToken, (req, res) => {
    const { nome, categoria, preco } = req.body;
    const query = 'INSERT INTO alimentos (nome, categoria, preco) VALUES (?, ?, ?)';
    db.query(query, [nome, categoria, preco], (err, resultado) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao adicionar alimento' });
      } else {
        res.json({ id: resultado.insertId, mensagem: 'Alimento adicionado com sucesso' });
      }
    });
  });

app.get('/alimentos', verificaToken, (req, res) => {
    const query = 'SELECT * FROM alimentos';
    db.query(query, (err, resultados) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao buscar alimentos' });
      } else {
        res.json(resultados);
      }
    });
  });
  
  app.get('/alimentos/:id', verificaToken, (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM alimentos WHERE id = ?';
    db.query(query, [id], (err, resultados) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao buscar alimento' });
      } else {
        if (resultados.length > 0) {
          res.json(resultados[0]);
        } else {
          res.status(404).json({ error: 'Alimento não encontrado' });
        }
      }
    });
  });
  
  app.put('/alimentos/:id', verificaToken, (req, res) => {
    const id = req.params.id;
    const { nome, categoria, preco } = req.body;
    const query = 'UPDATE alimentos SET nome = ?, categoria = ?, preco = ? WHERE id = ?';
    db.query(query, [nome, categoria, preco, id], (err) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao editar alimento' });
      } else {
        res.json({ mensagem: 'Alimento editado com sucesso' });
      }
    });
  });
  
  app.delete('/alimentos/:id', verificaToken, (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM alimentos WHERE id = ?';
    db.query(query, [id], (err) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao deletar alimento' });
      } else {
        res.json({ mensagem: 'Alimento deletado com sucesso' });
      }
    });
  });

  function login1() {
    const email = document.getElementById('exampleInputEmail1').value;
    const senha = document.getElementById('exampleInputPassword1').value;
  
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        // Armazenar o cadastro de forma segura 
        localStorage.setItem('token', data.token);
        window.location.href = 'crud.html';
      } else {
        alert('Credenciais inválidas');
      }
    })
    .catch(error => {
      console.error('Erro ao fazer login:', error);
    });
  }
function login(){
  window.location.href = "crud.html"
}

//Funções do CRUD

function cadastrarAlimento() {
    const nome = document.getElementById('nome').value;
    const categoria = document.getElementById('categoria').value;
    const preco = document.getElementById('preco').value;
  
    fetch('http://localhost:3000/alimentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({ nome, categoria, preco })
    })
    .then(response => response.json())
    .then(data => {
      alert(data.mensagem);
      // Aparece a lista dos alimentos cadastrados
      window.location.href = 'alimentos.html';
    })
    .catch(error => {
      console.error('Erro ao adicionar alimento:', error);
    });
  }
function listarAlimentos() {
    fetch('http://localhost:3000/alimentos', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(data => {
      const alimentosLista = document.getElementById('alimentos-lista');
      alimentosLista.innerHTML = '';
      
      data.forEach(alimento => {
        const li = document.createElement('li');
        li.textContent = `${alimento.nome} - ${alimento.categoria} - R$${alimento.preco}`;
      })

        //do lado dos alimentos listados, esse botão que é para editar
        const editarButton = document.createElement('button');
        editarButton.textContent = 'Editar';
        editarButton.addEventListener('click', () => editar(alimento.id));
        li.appendChild(editarButton);

        //Assim como o de edição, um botão para deletar o item
        const deletarButton = document.createElement('button');
        deletarButton.textContent = 'Deletar';
        deletarButton.addEventListener('click', () => deletarAlimento(alimento.id));  //deletarAlimento() será refenciado na próxima função para conex
        li.appendChild(deletarButton);
        
        alimentosLista.appendChild(li);
    })
    .catch(error => {
      console.error('Erro ao buscar alimentos:', error);
    });
    
}
function deletarAlimento(id) {
  const confirmacao = confirm('Deseja realmente deletar este alimento?');

  if (confirmacao) {
    fetch(`http://localhost:3000/alimentos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(data => {
      alert(data.mensagem);
      listarAlimentos();//Nova lista
    })
    .catch(error => {
      console.error('Erro ao deletar alimento:', error);
    });
  }
}
function editar(id) {
  fetch(`http://localhost:3000/alimentos/${id}`, {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  })
  .then(response => response.json())
  .then(alimento => {
    document.getElementById('nome').value = alimento.nome;
    document.getElementById('categoria').value = alimento.categoria;
    document.getElementById('preco').value = alimento.preco;

    const salvarButton = document.createElement('button');
    salvarButton.textContent = 'Salvar Edição';
    salvarButton.addEventListener('click', () => salvarEdicaoAlimento(id));
    document.getElementById('editar-form').appendChild(salvarButton);
  })
  .catch(error => {
    console.error('Erro ao buscar alimento para edição:', error);
  });
}

//Salvar edição de alimento
function salvarEdicaoAlimento(id) {
  const nome = document.getElementById('nome').value;
  const categoria = document.getElementById('categoria').value;
  const preco = document.getElementById('preco').value;

  fetch(`http://localhost:3000/alimentos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify({ nome, categoria, preco })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.mensagem);
    window.location.href = 'alimentos.html';
  })
  .catch(error => {
    console.error('Erro ao salvar edição de alimento:', error);
  });
}

