const express = require("express");
const app = express();
const path = require("path"); 

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const domain = 'http://localhost:3000/'

app.use(express.static(path.join(__dirname, 'public'))); 


app.get('/admin', async (req, res) =>{
    try {
        const data = await prisma.application.findMany({
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
    } catch {

    }
})

module.exports = app;