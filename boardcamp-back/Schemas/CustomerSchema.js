import joi from 'joi'

const CustomerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().length(11).required(),
    birthday: joi.date().required(),
})

export default CustomerSchema;