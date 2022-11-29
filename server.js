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

app.get('/workouts', (req, res) => {
  fs.readFile('./workouts.json', 'utf8', (err, workoutsJson) => {
      if (err) {
          console.log("File read failed in GET /workouts: "+ err);
          res.status(500).send('File read failed');
          return;
      }
      console.log("GET: /workouts");
      res.send(workoutsJson);
  });
});

app.get('/schedule', (req, res) => {
  fs.readFile('./schedule.json', 'utf8', (err, scheduleJson) => {
      if (err) {
          console.log("File read failed in GET /schedule: "+ err);
          res.status(500).send('File read failed');
          return;
      }
      console.log("GET: /schedule");
      res.send(scheduleJson);
  });
});

app.get('/schedule/:weekNumber', (req, res) => {
  fs.readFile('./schedule.json', 'utf8', (err, scheduleJson) => {
      if (err) {
          console.log("File read failed in GET /schedule/" + req.params.weekNumber + ": "+ err);
          res.status(500).send('File read failed');
          return;
      }
      var schedules = JSON.parse(scheduleJson);
      var schedule = schedules.find(scheduletmp => scheduletmp.weekNumber == req.params.weekNumber);
      if (!schedule) {
          console.log("Can't find schedule with weekNumber: " + req.params.weekNumber);
          res.status(500).send('Cant find schedule with weekNumber: ' + req.params.weekNumber);
          return;
      }
      var scheduleJSON = JSON.stringify(schedule);
      console.log("GET /schedule/" + req.params.weekNumber);
      res.send(scheduleJSON);
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

app.post('/schedules', (req, res) => {
  fs.readFile('./schedules.json', 'utf8', (err, scheduleJson) => {
      if (err) {
          console.log("File read failed in POST /schedule: "+ err);
          res.status(500).send('File read failed');
          return;
      }
      var schedules = JSON.parse(scheduleJson);
      var schedule = schedules.find(scheduletmp => scheduletmp.index_nr == req.body.index_nr);
      if (!schedule) {
        schedules.push(req.body);
          var newList = JSON.stringify(schedules);
          fs.writeFile('./schedule.json', newList, err => {
              if (err) {
                  console.log("Error writing file in POST /schedule: "+ err);
                  res.status(500).send('Error writing file schedule.json');
              } else {
                  res.status(201).send(req.body);
                  console.log("Successfully wrote file schedule.json and added new schedule with index = " + req.body.index_nr);
              }
          });
      } else {
          console.log("schedule by index = " + req.body.index_nr + " already exists");
          res.status(500).send('schedule by index = ' + req.body.index_nr + ' already exists');
          return;
      }
  });
});

app.post('/accounts', (req, res) => {
  fs.readFile('./accounts.json', 'utf8', (err, accountsJson) => {
      if (err) {
          console.log("File read failed in POST /accounts: "+ err);
          res.status(500).send('File read failed');
          return;
      }
      var accounts = JSON.parse(accountsJson);
      var account = accounts.find(accounttmp => accounttmp.index_nr == req.body.index_nr);
      if (!account) {
        accounts.push(req.body);
          var newList = JSON.stringify(accounts);
          fs.writeFile('./accounts.json', newList, err => {
              if (err) {
                  console.log("Error writing file in POST /accounts: "+ err);
                  res.status(500).send('Error writing file accounts.json');
              } else {
                  res.status(201).send(req.body);
                  console.log("Successfully wrote file accounts.json and added new account with index = " + req.body.index_nr);
              }
          });
      } else {
          console.log("account by index = " + req.body.index_nr + " already exists");
          res.status(500).send('account by index = ' + req.body.index_nr + ' already exists');
          return;
      }
  });
});

app.put('/schedule/:index_nr', (req, res) => {
  fs.readFile('./schedule.json', 'utf8', (err, scheduleJson) => {
      if (err) {
          console.log("File read failed in PUT /schedule/" + req.params.index_nr+": "+ err);
          res.status(500).send('File read failed');
          return;
      }
      var schedules = JSON.parse(scheduleJson);
      var scheduleBody = schedules.find(scheduletmp => scheduletmp.index_nr == req.body.index_nr);
      if (scheduleBody && scheduleBody.index_nr != req.params.index_nr) {
          console.log("schedule by index_nr = " + scheduleBody.index_nr + " already exists"+req.params.index_nr);
          res.status(500).send('schedule by index_nr = ' + scheduleBody.index_nr + ' already exists');
          return;
      }
      var schedule = schedules.find(scheduletmp => scheduletmp.index_nr == req.params.index_nr);
      if (!schedule) {
        schedules.push(req.body);
          var newList = JSON.stringify(schedules);
          fs.writeFile('./schedule.json', newList, err => {
              if (err) {
                  console.log("Error writing file in PUT /schedule/" + req.params.index_nr+": "+err);
                  res.status(500).send('Error writing file schedule.json');
              } else {
                  res.status(201).send(req.body);
                  console.log("Successfully wrote file schedule.json and added new schedule with index_nr = " + req.body.index_nr);
              }
          });
      } else {
          for (var i = 0; i < schedules.length; i++) {
              if (schedules[i].index_nr == schedule.index_nr) {
                schedules[i] = req.body;
              }
          }
          var newList = JSON.stringify(schedules);
          fs.writeFile('./schedules.json', newList, err => {
              if (err) {
                  console.log("Error writing file in PUT /schedule/" + req.params.index+": "+ err);
                  res.status(500).send('Error writing file schedule.json');
              } else {
                  res.status(200).send(req.body);
                  console.log("Successfully wrote file schedule.json and edit schedule with old index = " + req.params.index);
              }
          });
      }
  });
});

app.put('/users/:index_nr', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, usersJson) => {
        if (err) {
            console.log("File read failed in PUT /users/" + req.params.index_nr+": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var users = JSON.parse(usersJson);
        var userBody = users.find(usertmp => usertmp.index_nr == req.body.index_nr);
        if (userBody && userBody.index_nr != req.params.index_nr) {
            console.log("user by index_nr = " + userBody.index_nr + " already exists"+req.params.index_nr);
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
