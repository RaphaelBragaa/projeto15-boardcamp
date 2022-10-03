import express from 'express';
import { GetRentals, PostRentals, DeleteRentals } from '../Controllers/RentalsController.js';

const router = express.Router()

router.get('/rentals', (GetRentals))
router.post('/rentals', (PostRentals))
router.delete('/rentals/:id', (DeleteRentals))

export default router;

