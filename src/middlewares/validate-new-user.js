import * as yup from 'yup'

const validation = yup.object().shape(
    {
        name:
            yup.string("Name must be a string!").
                required("Name is required!"),
        cpf:
            yup.string("CPF must be a string!").
                max(11, "CPF must have 11 characters!").
                min(11, "CPF must have 11 characters!").
                required("CPF is required!"),
        password:
            yup.string("Password must be a string!").
                min(8, "Password must be at least 8 characters!").
                required("Password is required!")
    })

const validateNewUser = (req, res, next) => {
    try {
        validation.validateSync(req.body)
        next()
    } catch (error) {
        res.status(400).json(({ message: error.message }))
    }
}

export default validateNewUser