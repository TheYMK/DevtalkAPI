// ============================================================
//                  Importations
// ============================================================
const express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	cors = require('cors'),
	mongoose = require('mongoose');
require('dotenv').config();

// route importations
const authRoutes = require('./routes/api/auth');
const userRoutes = require('./routes/api/user');
const formRoutes = require('./routes/api/form');
// express app initialization
const app = express();

// ============================================================
//                    Database Connection
// ============================================================
mongoose
	.connect(process.env.DATABASE_CLOUD, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() => console.log('====> DATABASE CONNECTED'));

// ============================================================
//                   Middlewares
// ============================================================
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// cors - (works only in browser to browser communication)
if (process.env.NODE_ENV === 'development') {
	app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// ============================================================
//                      Route Middlewares
// ============================================================
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', formRoutes);
// ============================================================
//                          Server
// ============================================================

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`====> EcomWork Server running on port ${port}...`);
});
