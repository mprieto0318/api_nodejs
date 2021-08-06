const express = require('express')
const mysql = require('mysql')
const myConn = require('express-myconnection')


const app = express()


app.set('port', process.env.PORT || 9000)


// - - - - - - - - - - - - - - - - - -
// - - -  MIDDLEWARES - - - - - - - 
// - - - - - - - - - - - - - - - - - -
const dbOpstions = {
    host: 'remotemysql.com',
    port: 3306,
    user: 'OEnxQ1gPID',
    password: '4FtZIY7l0D',
    database: 'OEnxQ1gPID'
}
app.use(myConn(mysql, dbOpstions, 'single'))

app.use(express.json())

// - - - - - - - - - - - - - - - - - -
// - - -  ROUTES - - - - - - - 
// - - - - - - - - - - - - - - - - - -
app.use('/', require('./routes'))


// - - - - - - - - - - - - - - - - - -
// - - -  SERVER RUNNING - - - - - - - 
// - - - - - - - - - - - - - - - - - -

app.listen(app.get('port'), () => {
    console.log("server running on port ", app.get('port'));
})