import express from 'express';
import cors from 'cors';
import CategoriesRoute from '../routes/Categories.js' 




const server=express()
server.use(cors())
server.use(express.json())


server.use(CategoriesRoute)

  



  server.listen(4001,()=>{//MUDAR PARA PORTA 4000 NÃO ESQUEÇA !!!!
    console.log('Server está rodando !')
  })
