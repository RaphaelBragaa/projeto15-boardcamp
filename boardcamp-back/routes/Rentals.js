import express from 'express';
import { GetRentals, PostRentals } from '../Controllers/RentalsController.js';

const router = express.Router()

router.get('/rentals', (GetRentals))
router.post('/rentals', (PostRentals))

export default router;

