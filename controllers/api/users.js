//to store all of the functions defined here so we can export them to an object:
module.exports = {
    create
};

function create(req, res) {
    // Baby step...
    res.json({
        user: {
            //we do not send the password b/c of security reasons!
            name: req.body.name,
            email: req.body.email
        }
    });
}
