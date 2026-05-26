const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

let latestSignal = null;

// TEST API
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Render backend running'
  });
});

// TRADINGVIEW GET DATA
app.get('/tradingview-webhook', (req, res) => {
  res.json({
    success: true,
    latestSignal: latestSignal
  });
});

// TRADINGVIEW POST DATA
app.post('/tradingview-webhook', (req, res) => {
  latestSignal = req.body;

  console.log('TRADINGVIEW SIGNAL RECEIVED');
  console.log(latestSignal);

  res.json({
    success: true,
    message: 'TradingView signal received',
    data: latestSignal
  });
});

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server Running on port ' + PORT);
});