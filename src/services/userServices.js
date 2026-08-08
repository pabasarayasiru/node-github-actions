let users = [
    {
        id: 1,
        name: "John"
    }
];


function getAllUsers(){

    return users;

}


function createUser(data){

    const user = {
        id: users.length + 1,
        name: data.name
    };


    users.push(user);

    return user;

}


module.exports = {
    getAllUsers,
    createUser
};