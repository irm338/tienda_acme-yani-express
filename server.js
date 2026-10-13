
import express from 'express';
import 'dotenv/config';

import productoRouter from './routes/productos.router.js';

const server = express();

const PORT = process.env.SERVER_PORT || 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Aquí van las rutas
server.use('/productos', productoRouter);

// Manejo de error ruta no existente
server.use((req, res)=>{
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo erorr golbal (Cualquier otro error que ocurra)
server.use((err, req, res)=>{
  console.log('Error interno: ', err)
});

server.listen( PORT, ()=> console,log('Server running en http://localhgost:${PORT}'));
