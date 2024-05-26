const express = require("express");
const session = require('express-session');
const app = express();
const path = require("path"); 
const ejs = require('ejs');
const fs = require('fs');
const bodyParser = require('body-parser');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(bodyParser.json());

app.use(session({
    secret: 'tregfdjy',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }   
}));


function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }

}

app.get('/login',  async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const bcrypt = require('bcryptjs');
app.post('/login', async (req, res) => {

    const { login, password } = req.body;

    const admin = await prisma.admin.findUnique({
        where: {login}
    })
   if ( admin.password === password) {
    req.session.user = admin;
    res.redirect('/admin')
   }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error logging out');
        }
        res.redirect('/login');
    });
});
app.post('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        await prisma.application.delete({
            where: {
                id: parseInt(req.body.id)
            }
        });
        res.status(204).send(); 
    } catch (error) {
        console.error('Ошибка при удалении заявки:', error);
        res.status(500).send('Внутренняя ошибка сервера');
    }
});
app.get('/admin', isAuthenticated, async (req, res) =>{
  
    const { sortType } = req.query;

    let filter = {};
    
    if (sortType) {
        if (sortType.includes(',')) {
            // If there are multiple sortTypes separated by commas
            const sortTypes = sortType.split(',').map(Number);
            filter.type = { in: sortTypes };
        } else {
            // If there's only one sortType
            filter.type = parseInt(sortType, 10);
        }
    }
    try {
        const data = await prisma.application.findMany({
            where: filter,
            orderBy:{
                createdAt: 'desc'
            }
        });
        if (!data) {
            return res.status(404).send('data non found.')
        }
        const adminPath = path.join(__dirname, 'public', 'admin.ejs');

        const template = fs.readFileSync(adminPath, 'utf-8');
        
        const renderedHTML = ejs.render(template, { data });

        res.send(renderedHTML);
    } catch (error) {
        console.log('Error', error)
        res.status(500).send('Internal server error.')
    }
})

app.post('/api/send', async (req, res) => {
    try {
        const { type, name, email,desc, phone,from,to } = req.body;

        const FormData = await prisma.application.create({
            data: {
                type, 
                name, 
                email,
                desc,
                phone,
                from,
                to
            }
        })
        return res.status(200).json({ status: 200, message: "Success" });
    } catch (e) {
        console.error("Error:", e);
        return res
            .status(500)
            .send({ status: 500, message: "Internal server error" });
    }
})


// module.exports = app;


app.listen(3000, () => {
    console.log('server start')
});