
const { Console } = require('console');
const express = require('express');
const { url } = require('inspector');
const path = require('path');
const port = 8000;

const db =require('./config/mongoose');

const Task = require('./models/task');

const app = express(); 


app.set('views', path .join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.urlencoded());

app.use(express.static('assets'));




app.get('/', function(request, response) { 
    
    Task.find({}, function( err, tasks) {
        if(err) {
            console.log('Error in fetching contacts from db');
            return;
        }
        
        return response.render('home', {
            title : "To DO App",
            contact_list: tasks 
        });
    });
    
}); 



app.post('/create-task', function(request, response) {
    
    Task.create({
        task: request.body.my_task,
        category: request.body.category,
        time: request.body.given_time,
        date: request.body.due_date     
    },

    function(err, newTask) {
       
        if(err) {
            console.log('error in creating a task!');
            return;
        }
   
        console.log('*******', newTask);

        return response.redirect('back');
    });

});



app.get('/delete-task', function(request, response) {

    let id =request.query.id; 
    
    Task.findByIdAndDelete(id, function(err) {
       
        if(err) {
            Console.log('error in deleting an object from database');
            return;
        }

        return response.redirect('back');

    });

});


app.listen(port, function(err) { 
    if(err) {
        console.log('Error in running the server', err);
        return;
    }
    console.log('Yup! My Express Server is running on Port:', port);
}); 
