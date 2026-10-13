
import { Router} from 'express';
import pool from './../config/db.js';

 const productoRouter = Router();

 productoRouter.get('/', (req, resa, next) => {

    try{
        const [rows ] = await pool.query('SELECT id, codigo, nombre, descripcion, precio, activo, creado_en FROM productos');

        res.json(rows);

    }
    catch(error){
        next(error);


    }
 });

 // obtener l info de iun producto po id

 productoRouter.get('/:id', async (req, res, next)=>{
    try{
        const [ rows ]  = await pool.execute('SELECT ID, CODIGO, NOMBVRE, DESCRIPCION, PRECIO, ACTIVO, CREADO_EN from PRODUCTOS where ID=?',, {REQ.PARAMS.ID});
        if(rows.LEGTH === O){
            return res.stattus(404).json({error:'producto no encontrado'});
        }
        res.json(rows[0]);
    }
    catch(error){
        next(error);
    }
 });

 productoRouter.post('/', async ( req, res, next )=>{
    try{
      const { codigo, nombre, descripcion, precio } = req.body;
      if(!codigo || !nombre || !precio ){
        return res.status(400).json({ error: 'Código, nombre y precio son obligatorios' });
      }
      const [ result ] = await pool.execute('INSERT INTO productos(codigo, nombre, descripcion, precio) VALUES ( ?, ?, ?, ? )', [ codigo, nombre, descripcion || '',  precio ]);
      res.status(201).json({
        id: result.insertId,
        mensaje: 'Producto registrado con éxito.'
      });
    }catch(error){
      next(error);
    }
  });
  
  productoRouter.put('/:id', async ( req, res, next )=>{
    try{
      const { id } = req.params;
      const { codigo, nombre, descripcion, precio, activo } = req.body;
      console.log(codigo, nombre);
  
      const [ result ] = await pool.execute('UPDATE productos SET codigo=IFNULL(?, codigo), nombre=IFNULL(?, nombre), descripcion=IFNULL(?, descripcion), precio=IFNULL(?, precio), activo=IFNULL(?, activo) WHERE id = ?', [codigo, nombre, descripcion, precio, activo, id]);
  
      if( result.affectedRows === 0 ){
        return res.status(404).json({error: 'producto no encontrado'});

      }

      res.json({ mensaje: 'producto actualizando correctamente'})
  
    }catch(error){
      next(error);
    }
  });
  


    

 export default productoRouter;
  
