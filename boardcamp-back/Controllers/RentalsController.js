import connection from "../src/db/db.js";
import SchemaRentals from "../Schemas/RentalSchema.js"





// export async function GetRentals(req,res){
//     const { CustomerId, GameId} = req.query
//     try{
//         const params =[]
//         const conditions = []
       
//     }catch(error){

//     }
// }

export async function PostRentals(req,res){
    const InsertRental = req.body
    try{
        const validation = SchemaRentals.validate(InsertRental,{AbortEarly:true})
        if(validation.error){
            console.log(validation.error.details)
            return res.sendStatus(400)
        }

        const searchId = await connection.query('SELECT * FROM customers WHERE id = $1',[InsertRental.customerId])
  
        const searchGameId = await connection.query('SELECT * FROM games WHERE id = $1',[InsertRental.gameId])
       
        if(!searchId || !searchGameId){
            return res.sendStatus(400)
        }

       
        
        const originalPrice = searchGameId.rows[0].pricePerDay * Number(InsertRental.daysRented)
        
        console.log(InsertRental.daysRented)

        await connection.query(`INSERT INTO rentals (
            "customerId", "gameId", "rentDate", 
            "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, NOW(), $3, null, $4, null)`,[
            InsertRental.customerId,
            InsertRental.gameId,
            InsertRental.daysRented,
            originalPrice
            ])

          

       return res.sendStatus(201)

        
    }catch(error){
        console.log(error)
        return res.sendStatus(500)
    }
}
