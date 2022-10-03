import express from 'express';
import cors from 'cors';
import CategoriesRoute from '../routes/Categories.js' 
import GamesRoute from '../routes/Games.js'
import CustomerRoute from '../routes/Customers.js'
import RentalsRoute from '../routes/Rentals.js'




const server=express()
server.use(cors())
server.use(express.json())


server.use(CategoriesRoute)
server.use(GamesRoute)
server.use(CustomerRoute)
server.use(RentalsRoute)

  



  server.listen(4000,()=>{
    console.log('Server está rodando !')
  })
