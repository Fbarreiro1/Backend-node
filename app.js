import express from 'express';
import ProductManager from "./ProductManager.js";
const app = express()
const port = 3000

const prod1 = new ProductManager();


app.get('/products', async (req, res) => {
  try  {
    let { limit } = req.query;
     limit = parseInt(limit)
    
   
    const prods = await prod1.getProducts();
    
     if(!limit || limit > prods.length || limit < 1) {
      
      return res.send(prods);
    } 
   
   const iterar = (limit) => {
    const prodslimitado = [];
    let i = 0;
      while(i < limit) {
        prodslimitado.push(prods[i]);
      i++
    }
    return prodslimitado;
  }

  const prodslimitado = iterar(limit);

  return res.send(prodslimitado)
   }
    //res.status(200)
   catch(error) {
      error }
    })

app.get('/products/:id', async (req, res) => {
  try  {
    const { id } = req.params;
     
    const prods = await prod1.getProductsById(id);
      
    return res.send(prods)
  }
    catch(error) {
      error
    }
  
})

app.listen(port, () => {
  console.log(`Escuchando el puerto: ${port}`)
})