import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Server with users');
});

app.get('/users', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, usersJson) => {
        if (err) {
            console.log("File read failed in GET /users: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        console.log("GET: /users");
        res.send(usersJson);
    });
});

app.get('/accounts', (req, res) => {
  fs.readFile('./accounts.json', 'utf8', (err, accountsJson) => {
      if (err) {
          console.log("File read failed in GET /accounts: "+ err);
          res.status(500).send('File read failed');
          return;
      }
      console.log("GET: /accounts");
      res.send(accountsJson);
  });
});

app.get('/users/:index', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, usersJson) => {
        if (err) {
            console.log("File read failed in GET /users/" + req.params.index + ": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var users = JSON.parse(usersJson);
        var user = users.find(usertmp => usertmp.index_nr == req.params.index);
        if (!user) {
            console.log("Can't find user with index: " + req.params.index);
            res.status(500).send('Cant find user with index: ' + req.params.index);
            return;
        }
        var userJSON = JSON.stringify(user);
        console.log("GET /users/" + req.params.index);
        res.send(userJSON);
    });
});

app.post('/users', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, usersJson) => {
        if (err) {
            console.log("File read failed in POST /users: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var users = JSON.parse(usersJson);
        var user = users.find(usertmp => usertmp.index_nr == req.body.index_nr);
        if (!user) {
            users.push(req.body);
            var newList = JSON.stringify(users);
            fs.writeFile('./users.json', newList, err => {
                if (err) {
                    console.log("Error writing file in POST /users: "+ err);
                    res.status(500).send('Error writing file users.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file users.json and added new user with index = " + req.body.index_nr);
                }
            });
        } else {
            console.log("user by index = " + req.body.index_nr + " already exists");
            res.status(500).send('user by index = ' + req.body.index_nr + ' already exists');
            return;
        }
    });
});

app.put('/users/:index', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, usersJson) => {
        if (err) {
            console.log("File read failed in PUT /users/" + req.params.index_nr+": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var users = JSON.parse(usersJson);
        var userBody = users.find(usertmp => usertmp.index_nr == req.body.index_nr);
        if (userBody && userBody.index_nr != req.params.index_nr) {
            console.log("user by index_nr = " + suserBody.index_nr + " already exists");
            res.status(500).send('user by index_nr = ' + userBody.index_nr + ' already exists');
            return;
        }
        var user = users.find(usertmp => usertmp.index_nr == req.params.index_nr);
        if (!user) {
            users.push(req.body);
            var newList = JSON.stringify(users);
            fs.writeFile('./users.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /users/" + req.params.index_nr+": "+err);
                    res.status(500).send('Error writing file users.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file users.json and added new user with index_nr = " + req.body.index_nr);
                }
            });
        } else {
            for (var i = 0; i < users.length; i++) {
                if (users[i].index_nr == user.index_nr) {
                    users[i] = req.body;
                }
            }
            var newList = JSON.stringify(users);
            fs.writeFile('./users.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /users/" + req.params.index+": "+ err);
                    res.status(500).send('Error writing file users.json');
                } else {
                    res.status(200).send(req.body);
                    console.log("Successfully wrote file users.json and edit user with old index = " + req.params.index);
                }
            });
        }
    });
});

app.delete('/users/:index', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, usersJson) => {
        if (err) {
            console.log("File read failed in DELETE /users: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var users = JSON.parse(usersJson);
        var userIndex = users.findIndex(usertmp => usertmp.index_nr == req.params.index);
        if (userIndex != -1) {
            users.splice(userIndex, 1);
            var newList = JSON.stringify(users);
            fs.writeFile('./users.json', newList, err => {
                if (err) {
                    console.log("Error writing file in DELETE /users/" + req.params.index+": "+ err);
                    res.status(500).send('Error writing file users.json');
                } else {
                    res.status(204).send();
                    console.log("Successfully deleted user with index = " + req.params.index);
                }
            });
        } else {
            console.log("user by index = " + req.params.index + " does not exists");
            res.status(500).send('user by index = ' + req.params.index + ' does not exists');
            return;
        }
    });
});

app.listen(7777, () => console.log("Server address http://localhost:7777"));

//node -r esm server.js
