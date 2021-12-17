const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    let token = req.headers.authorization
    console.log(token)
    if (!token) {
        res.status(401).json({
            message: 'unauthorized'
        })
        return;
    }

    let data = jwt.verify(token, 'secret')
    //console.log('ramamamamamamam', data)  //test
    if (!data) {
        res.status(401).json({
            message: 'unauthorized'
        })
        return;
    } else {
        req.currentUser = data;
        console.log(req.currentUser)
        next();
    }
}

module.exports = validateToken;