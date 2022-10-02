import express from 'express';
import {GetCustomer, GetCustomerId, PostCustomer, PutCustomer} from '../Controllers/CustomersController.js'

const router = express.Router()

router.get('/customers',(GetCustomer))
router.get('/customers/:id',(GetCustomerId))
router.post('/customers',(PostCustomer))
router.put('/customers/:id',(PutCustomer))
export default router

