const express = require('express');
const cors = require('cors');

const db = require('./db');

const app = express();

app.use(cors());

app.use(express.json());


// LOGIN API

app.post('/api/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const sql = `
    
        SELECT *
        FROM users
        WHERE email = ?
        AND password = ?
        AND status = 1
    
    `;

    db.query(sql, [email, password], (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: 'Database Error'

            });

        }

        if (result.length > 0) {

            res.json({

                success: true,
                message: 'Login Success',
                user: result[0]

            });

        } else {

            res.status(401).json({

                success: false,
                message: 'Invalid Email Or Password'

            });

        }

    });

});



app.listen(3000, () => {

    console.log('Server Running : http://localhost:3000');

});