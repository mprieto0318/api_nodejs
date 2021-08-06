const express = require('express')
const mysql = require('mysql')
const myConn = require('express-myconnection')


const app = express()


app.set('port', process.env.PORT || 9000)


// - - - - - - - - - - - - - - - - - -
// - - -  MIDDLEWARES - - - - - - - 
// - - - - - - - - - - - - - - - - - -
const dbOpstions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'concierto_29'
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