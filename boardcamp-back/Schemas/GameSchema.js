import joi from 'joi'

const GameSchema = joi.object({
    name:joi.string().required(),
    image:joi.string().required(),
    stockTotal: joi.number().greater(0),
    categoryId: joi.number().greater(0),
    pricePerDay:joi.number().greater(0),
})

export default GameSchema