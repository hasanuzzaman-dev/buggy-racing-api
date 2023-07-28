const User = require("../models/user.model");

const getUserById = async (id) => {
    const user = await User.findOne(
        { _id: id, deletedAt: null },

    ).select({
        _id: 1,
        email: 1,
        socialLoginId: 1,
        fullName: 1,
        gender: 1,
        age: 1,
        avatar: 1,
        country: 1,
        flag: 1,
        totalPlayedGame: 1,
        gameWin: 1,
        rank: 1,
        money: 1,

    });
    return user;
}

module.exports = getUserById;