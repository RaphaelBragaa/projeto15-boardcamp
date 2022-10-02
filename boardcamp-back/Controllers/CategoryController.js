import connection from "../src/db/db.js";
import CategorySchema from "../schemas/CategorySchema.js";

export async function GetCategory (req,res){
    try{
         const categorias = await connection.query('SELECT * FROM categories;')
        res.send(categorias.rows)
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }     
}

export async function PostCategory(req,res){   
    const InsertCategory = req.body
    console.log(InsertCategory)
    
    const validation = CategorySchema.validate( InsertCategory,{abortEarly:true})
    if(validation.error){
        console.log(validation.error.details)
     return  res.sendStatus(400)
        
    }

      const search = await connection.query('SELECT * FROM categories WHERE name = $1',[InsertCategory.name])
     
      if(search.rowCount > 0){
         return res.sendStatus(409)
     }

    try{
       await connection.query('INSERT INTO categories (name) VALUES ($1)',[InsertCategory.name]) 
       res.sendStatus(201)
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
    

}