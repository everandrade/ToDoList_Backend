const log = (req, res, next) => {
    console.log(req.method)
    console.log(req.path)
    console.log(req.body)
    console.log(req.params)
    next()
}

export default log