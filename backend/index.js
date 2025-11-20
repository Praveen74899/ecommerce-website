// server.js or app.js
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const userRoutes = require('./routes/adminroute/route')
// const routes = require('./routes/userroute/route');
const routes = require('./routes/userroute/route');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1', userRoutes);
app.use("/api/v1/user", routes);

app.use((req, res) => {
    return res.status(404).json({
        message: "Page Not Found"
    });
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on port ${PORT}`);
});


