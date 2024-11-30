require('dotenv').config();
const port = process.env.PORT || 3001;

const cors = require('cors');

const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const libroRouter = require('./routes/libroRouter');
const usuarioRouter = require('./routes/usuarioRouter');
const pedidoRouter = require('./routes/pedidoRouter');
const adminRouter = require('./routes/adminRouter');

app.use('/api', libroRouter);
app.use('/api/usuario', usuarioRouter);
app.use('/api/pedido', pedidoRouter)
app.use('/api/admin', adminRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});