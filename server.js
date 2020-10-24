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

// express app initialization
const app = express();

// ============================================================
//                          Server
// ============================================================
