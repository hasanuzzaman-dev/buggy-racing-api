const { Map } = require('../models/map.model');
const getAllMapForSignup = async () => {

    const maps = await Map.find(
        { deletedAt: null, active: true },
    ).select({
        unlocked: 1,
        price: 1,
        active: 1,
        uiIndex: 1,
        theme: 1,
        setting: 1,
        createdAt: 1,
        deletedAt: 1,
        updatedAt: 1,
    });

    return maps;
}

module.exports = getAllMapForSignup;