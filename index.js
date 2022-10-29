const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 7001;


app.get('/', (req, res) => {
    res.send('My Server is running.............');
})
app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: "Shabana", email: "shabana@gmail.com" },
    { id: 2, name: "Bobita", email: "bobita@gmail.com" },
    { id: 3, name: "Shabnoor", email: "shabnoor@gmail.com" },
    { id: 4, name: "Shabila", email: "shabila@gmail.com" },
    { id: 5, name: "Purnima", email: "purnima@gmail.com" },
];

// User-Name: dbUser1
// Password: JizQPshzPGKsDJBT
const uri = "mongodb+srv://dbUser1:JizQPshzPGKsDJBT@cluster0.vvll70g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const userCollection = client.db('simpleNode').collection('users');

    app.get('/users', async (req, res) => {
        const cursor = userCollection.find({});
        const users = await cursor.toArray();
        res.send(users);
    })

    app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await userCollection.insertOne(user)
        console.log(result);
        user._id = result.insertedId;
        res.send(user)
    })

}
run().catch(console.dir);



// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         const search = req.query.name;
//         const filtered = users.filter(u => u.name.toLocaleLowerCase().indexOf(search) >= 0)
//         res.send(filtered);
//     }
//     else {
//         res.send(users);
//     }
// })

// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user);
//     res.send(user)
// })

app.listen(port, () => {
    console.log('Node Server is running on Port: ', port);
})