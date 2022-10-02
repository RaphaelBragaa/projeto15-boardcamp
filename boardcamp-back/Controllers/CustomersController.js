import connection from "../src/db/db.js";
import CustomerSchema from "../Schemas/CustomerSchema.js"

export async function GetCustomer(req,res){
    const {cpf} = req.query
    try{
        if(cpf){
            const params = []
            let cpfs =''

            params.push(`${cpf}%`);
            cpfs += `WHERE cpf ILIKE $${params.length}`;

            const search = await connection.query(  `
            SELECT * FROM customers ${cpfs} `,
            params)
            res.send(search.rows)
        }else{
            const games = await connection.query('SELECT * FROM customers;')
                res.send(games.rows)
        }    
    }catch(error){
        console.log(error);
        return res.sendStatus(500)
    }
        }

export async function GetCustomerId(req,res){
    const {id} =req.params

    try{
        const search = await connection.query(`SELECT * FROM customers WHERE id = $1`, [id])
        if(search.rowCount === 0){
          return  res.sendStatus(404)
        }else{
            res.send(search.rows)
        }
    }catch(error){
        console.log(error)
    }
}

export async function PostCustomer(req,res){
    try{
        const InsertClient = req.body
        console.log(InsertClient)
        const validation = CustomerSchema.validate(InsertClient,{AbortEarly:true})
        if(validation.error){
            console.log(validation.error.details)
            return res.sendStatus(400)
        }
        
        const search = connection.query('SELECT * FROM customers WHERE cpf = $1',[InsertClient.cpf])
        if(search.rowCount >= 1){
            return res.sendStatus(409)
        }else{
            await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)',[
                InsertClient.name,
                InsertClient.phone,
                InsertClient.cpf,
                InsertClient.birthday    
                ])
          return  res.sendStatus(201)
        }

    }catch(error){
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function PutCustomer(req,res){
    try{
        const update = req.body
        const validation = CustomerSchema.validate(update,{AbortEarly:true})
        if(validation.error){
            console.log(validation.error.details)
            return res.sendStatus(400)
        }

        const search = await connection.query('SELECT * FROM customers WHERE cpf = $1',[update.cpf])
        if(search.rowCount >= 1){
            return res.sendStatus(409)
        }else{
            await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)',[
                update.name,
                update.phone,
                update.cpf,
                update.birthday    
                ])
            return res.sendStatus(201)
        }

    }catch(error){
        console.log(error)
        return res.sendStatus(500)
    }
}
    