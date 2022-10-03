import connection from "../src/db/db.js";
import SchemaRentals from "../Schemas/RentalSchema.js"
import dayjs from "dayjs";

const tempo=dayjs().format('HH:MM:ss')


export async function GetRentals(req,res){
    const { CustomerId, GameId} = req.query
    try{
        const params =[]
        const conditions = []
       
    }catch(error){

    }
}

export async function PostRentals(req,res){
    const InsertRental = req.body
    try{
        const validation = SchemaRentals.validate(InsertRental,{AbortEarly:true})
        if(validation.error){
            console.log(validation.error.details)
            return res.sendStatus(400)
        }

        const searchId = connection.query('SELECT * FROM customers WHERE id = $1',[InsertRental.customerId])
        const searchGameId = connection.query('SELECT * FROM games WHERE id = 1$',[InsertRental.gameId])
        if(!searchId || !searchGameId){
            return res.sendStatus(400)
        }

        await connection.query('INSERT INTO rentals (customerId, gameId, rentDate, daysRented, daysRented, returnDate, originalPrice, delayFee) VALUES ($1, $2, $3, $4, $5, $6, $7)'[
            InsertRental.customerId,
            InsertRental.gameId,
            ])
    }catch(error){

    }
}