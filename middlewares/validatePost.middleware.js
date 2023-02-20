const validatePost = (req, res, next) => {
    const { device } = req.body
    if (device === "Laptop" || device === "Mobile" || device === "Tablet") {
        next();
    } else if (req.method === "PATCH") {
        if (device === undefined) {
            next()
        } else if (device === "Laptop" || device === "Mobile" || device === "Tablet") {
            next()
        } else {
            res.status(400).json({ "message": "Plesase provide correct options for device!" })
        }
    } else {
        res.status(400).json({ "message": "Plesase provide correct options for device!" })
    }
}

module.exports = { validatePost }