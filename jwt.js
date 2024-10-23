const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: "Token not found" });
    //extract the jwt token from the requrest header
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).json({ error: "unauthorized" });

    try {
        //verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        //attached to the user information to the request object.
        req.user = decoded;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "invalid Token" })

    }
}

//function to generate jwt token
const generateToken = (userData) => {
    //generate a new jwt token using user data.
    return jwt.sign({userData}, process.env.JWT_SECRET, { expiresIn: 30000 });
}


module.exports = { jwtAuthMiddleware, generateToken };   