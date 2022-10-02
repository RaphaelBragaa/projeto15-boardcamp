import connection from "../src/db/db.js";
import GameSchema from "../Schemas/GameSchema.js";

export async function GetGames(req,res){
  const {name} = req.query
 try{
  if(name){
    const params = []
    let names =''

    params.push(`${name}%`);
    names += `WHERE games.name ILIKE $${params.length}`;

    const search = await connection.query(  `
    SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON categories.id=games."categoryId"
    ${names} `, params
  )
  res.send(search.rows)
  }else{
     const games = await connection.query('SELECT * FROM games;')
        res.send(games.rows)
  }    
    }catch(error){
        console.log(error);
        return res.sendStatus(500)
    }
}

export async function PostGames(req,res){
    try{
    const InsertGame = req.body
    

     const validation = GameSchema.validate(InsertGame,{AbortEarly:true})
     if(validation.error){
         console.log(validation.error.details)
         return res.sendStatus(400)
     }

  const searchId = await connection.query('SELECT * FROM categories WHERE id = $1',[InsertGame.categoryId])
    if(searchId.rowCount === 0){
         return res.sendStatus(400)
    }
     const searchName = await connection.query('SELECT * FROM games WHERE name = $1',[InsertGame.name])
     if(searchName.rowCount > 0){
         return res.sendStatus(409)
     }

        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',[
            InsertGame.name ,
            InsertGame.image ,
           InsertGame.stockTotal , 
            InsertGame.categoryId ,
            InsertGame.pricePerDay
        ])
        res.sendStatus(201)
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }



}


