const userService = require("../services/userServices");


const getUsers = (req, res) => {

    const users = userService.getAllUsers();

    res.json(users);

};


const createUser = (req, res) => {

    const user = userService.createUser(req.body);

    res.status(201).json(user);

};


module.exports = {
    getUsers,
    createUser
};