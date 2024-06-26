const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

let initial_path = path.join(__dirname, "");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/home', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "edit.html"));
})

// upload link
app.post('/img', (req, res) => {
    let file = req.files.image;
    let date = new Date();

    let imagename = date.getDate() + date.getTime() + file.name;
    
    let path = 'img/' + imagename;

    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            res.json(`img/${imagename}`)
        }
    })
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "berita.html"));
})

app.use((req, res) => {
    res.json("404");
})

app.listen("3000", () => {
    console.log('listening....');
})