const users = [];

const addUser = ({id, name, room})=>{
    // taking and trimming all whitespaces
    name = name.trim().toLowerCase(); 
    room = room.trim().toLowerCase();

    // checking if there's a user in the array 
    const checkUser = users.find((user)=> user.name === name && user.room === room)

    if (checkUser) {
        return {error: "the user has already been taken"}
    }

    const user = {
        id, 
        name, 
        room
    }

    users.push(user)

    return {
        user
    }
}

const removeUserbyId = (id)=>{
    // finding the user by the id
    const index = users.findIndex((user)=> user.id === id)

    if (index !== -1 ) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => users.find((user) => user.id === id );

const getUsersInRoom = (room)=> users.find((user) => user.room === room)

module.exports = {
    addUser, 
    getUser, 
    getUsersInRoom, 
    removeUserbyId
}