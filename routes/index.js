const express = require('express')
const routes = express.Router()

// - - - - - - - - - - - - - - - - - -
// - - -  GET USERS - - - - - - - 
// - - - - - - - - - - - - - - - - - -
routes.get('/', (req, res) => {
 
    req.getConnection((err, conn) => {
        if(err) return res.send(err)

        conn.query('SELECT * FROM users', (err, rows) => {

            let response = {}
 
            if(err) { 
                response.status = 'ERROR', 
                response.result = err

                return response;
            }
            res.json(rows)
        })
    })
})

// - - - - - - - - - - - - - - - - - -
// - - -  CREATE USER - - - - - - - 
// - - - - - - - - - - - - - - - - - -
routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {

        try {
            if(err) return res.send(err)
 
            conn.query('INSERT INTO users set ?', [req.body], (err, rows) => {

                let response = ''

                if(err) { 
                    response = err
                    console.log(response)
                    res.status(500).json(response)
                } 

                if(rows.length == 0) {
                    response = 'No se pudo insertar el registro.'
                    console.log(response)
                    res.status(401).send(response)

                }else {
                    // response.status = 'SUCCESS', 
                    response = 'Inserted record ID.' + rows.insertId
                    console.log(response)
                    res.status(201).json(response)
                }
            })
        }
        catch (e) {
          console.log("entering catch block");
          console.log(e);
          console.log("leaving catch block");
        }
    })
   
})


// - - - - - - - - - - - - - - - - - -
// - - -  CREATE USER - - - - - - - 
// - - - - - - - - - - - - - - - - - -
routes.post('/signup', (req, res) => {
    req.getConnection((err, conn) => {

        try {
            if(err) return res.send(err)
  
            conn.query('INSERT INTO users set ?', [req.body], (err, rows) => {

                let response = ''

                if(err) { 
                    response = err
                    console.log(response)
                    res.status(500).json(response)
                } 

                if(rows.length == 0) {
                    response = 'No se pudo insertar el registro.'
                    console.log(response)
                    res.status(401).send(response)

                }else {
                    // response.status = 'SUCCESS', 
                    response = 'Inserted record ID.' + rows.insertId
                    console.log(response)
                    res.status(201).json(response)
                }
            })
        }
        catch (e) {
          console.log("entering catch block");
          console.log(e);
          console.log("leaving catch block");
        }
    })
   
})


// - - - - - - - - - - - - - - - - - -
// - - -  DELETE USER - - - - - - - 
// - - - - - - - - - - - - - - - - - -
routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
            if(err) return res.send(err)

            conn.query('DELETE FROM users WHERE _id = ?', [req.params.id], (err, rows) => {
                let response = ''

                if(err) { 
                    response = err
                    console.log(response)
                    res.status(500).json(response)
                } 

                if(rows.length == 0) {
                    response = 'The record to delete was not found ID.' + req.params.id
                    console.log(response)
                    res.status(401).send(response)

                }else {
                    // response.status = 'SUCCESS', 
                    response = 'Deleted record ID.' + req.params.id
                    console.log(response)
                    res.status(200).json(response)
                }
            })
        })
  
})

// - - - - - - - - - - - - - - - - - -
// - - -  UPDATE USER - - - - - - - 
// - - - - - - - - - - - - - - - - - -
routes.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
            if(err) return res.send(err)

            conn.query('UPDATE users set ? WHERE _id = ?', [req.body, req.params.id], (err, rows) => {
                let response = ''

                if(err) { 
                    response = err
                    console.log(response)
                    res.status(500).json(response)
                } 

                if(rows.length == 0) {
                    response = 'Record not found to update ID.' + req.params.id
                    console.log(response)
                    res.status(401).send(response)

                }else {
                    // response.status = 'SUCCESS', 
                    response = 'Record updated ID.' + req.params.id
                    console.log(response)
                    res.status(200).json(response)
                }
                
            })
        })
  
})



// - - - - - - - - - - - - - - - - - -
// - - -  LOGIN - - - - - - - 
// - - - - - - - - - - - - - - - - - -
routes.post('/login', (req, res) => {
 
    req.getConnection((err, conn) => {
        if(err) return res.send(err)

        conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [req.body.email, req.body.password], (err, rows) => {
            
            let response = ''

            if(err) { 
                response = err
                console.log(response)
                res.status(500).json(response)
            } 

            if(rows.length == 0) {
                response = 'The wrong username or password'
                console.log(response)
                res.status(401).send(response)

            }else {
                // response.status = 'SUCCESS', 
                response = rows[0]
                console.log(response)
                res.status(200).json(response)
            }
        })
    })
})


module.exports = routes 