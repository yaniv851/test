const express = require('express');
const app = express();
const csv = require('csv-parser');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const { v4: uuidv4 } = require('uuid');

// Parse JSON request bodies
app.use(express.json());

let users = [];
let chats = [];
let mentors = [];
const messages = [];



// Read the CSV file and store the data in an array of objects
fs.createReadStream('RegisterDB.csv')
    .pipe(csv())
    .on('data', (data) => {
        users.push(data);
    })
    .on('end', () => {
        console.log('register csv database file successfully processed');
        console.log('users:', users);  // added log

    });

// Read the CSV file and store the data in an array of objects
// fs.createReadStream('Chat.csv')
//     .pipe(csv())
//     .on('data', (data) => {
//         chats.push(data);
//     })
//     .on('end', () => {
//         console.log('register csv database file successfully processed');
//         console.log('chats:', chats);  // added log

//     });


// app.get('/api/messages', (req, res) => {
//     res.json(chats);
// })


app.post('/api/users', (req, res) => {
    const newUser = req.body;
    const isDuplicate = users.some(user => user.fullName === newUser.fullName);
    if (!isDuplicate) {
        users.push(newUser);
        const ws = fs.createWriteStream('RegisterDB.csv', { flags: 'a' });
        ws.write(`${newUser.fullName},${newUser.password},${newUser.isMentor}\n`);
        ws.end();
    }
    res.json(users);
});

app.post('/api/chats', (req, res) => {
    const newMessage = req.body;
    chats.push(newMessage);
    console.log('newMessage:', newMessage);
    const ws = fs.createWriteStream('Chat.csv', { flags: 'a' });
    ws.write(`${newMessage.text},${newMessage.sender},${newMessage.recipient}\n`);
    ws.end();
    res.json(chats);
});

app.get('/api/chats', (req, res) => {
    res.json(chats);
})

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.post('/api/mentors', (req, res) => {
    const newMentor = req.body;
    mentors.push(newMentor);
    const ws = fs.createWriteStream('MentorDB.csv', { flags: 'a' });
    ws.write(`${newMentor.fullName},${newMentor.password}\n`);
    ws.end();
    res.json(mentors);
});

app.get('/api/mentors', (req, res) => {
    res.json(mentors);
})

app.get('/api/users/:fullName', (req, res) => {
    const fullName = req.params.fullName;
    const user = users.find(u => u.fullName === fullName);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Define API route for login
app.post('/api/users/login', (req, res) => {
    const { fullName, password } = req.body;
    let userExists = false;
  
    // Parse the CSV file and check if user exists
    fs.createReadStream('RegisterDB.csv')
      .pipe(csv())
      .on('data', (row) => {
        if (row.fullName === fullName && row.password === password) {
          userExists = true;
        }
      })
      .on('end', () => {
        // Return response indicating whether user exists
        if (userExists) {
          res.json({ success: true });
        } else {
          res.json({ success: false, error: 'Invalid credentials' });
        }
      });
  });
  

// Start the server on port 3002
app.listen(3002, () => {
    console.log('Server started on port 3002 nice!');
});
