var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

const Users = require("../Users");

const mongoUri =
   "mongodb+srv://angelref:12project@isit422-1.zvzlh.mongodb.net/ToDoISITDB?retryWrites=true&w=majority";

mongoose.set('useFindAndModify', false);

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(mongoUri, options).then(
  () => {
    console.log("conntected to mongo....!");
  },
  err => {
    console.log("trouble to connect to mongo", err);
  }
);

router.get('/', function(req, res) {
  res.sendFile('index.html');
 
});

router.get('/GetUsers', function(req, res) {
  Users.find({}, (err, AllToDos) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(AllToDos);
  });
});

router.post('/CreateUsers', function(req, res) {

    let oneNewToDo = new Users(req.body);  
    console.log(req.body);
    oneNewToDo.save((err, todo) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
      console.log(todo);
      res.status(201).json(todo);
      }
    });
});

router.delete('/DeleteUsers/:id', function (req, res) {
  Users.deleteOne({ _id: req.params.id }, (err, note) => { 
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "user is deleted" });
  });
});

router.put('/UserApprouved', function (req, res) {
  var which = (req.body)._id;  
  Users.findOneAndUpdate(
    { _id: which },  
    { completed: true },
    //{ new: false }, 
    (err, users) => {
      if (err) {
        res.status(500).send(err);
    }
    res.status(200).json(users);
    })
  });

module.exports = router;
