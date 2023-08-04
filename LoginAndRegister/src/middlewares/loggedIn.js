const loggedIn = (req, res, next) => {
    if(req.session.email) next()
    else res.redirect('../user/login')
}

const notLoggedIn = (req, res, next) => {
    if(!req.session.email) next()
    else res.redirect('http://localhost:8080/views/')
}

module.exports = {loggedIn, notLoggedIn};