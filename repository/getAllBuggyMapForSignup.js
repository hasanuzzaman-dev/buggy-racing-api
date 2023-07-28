const { BuggyMap } = require('../models/buggyMap.model');
const getAllBuggyMapForSignup = async () => {

    const maps = await BuggyMap.find(
        { deletedAt: null, active: true },
    ).select({
        _id: 1,

    });

    return maps;
}

module.exports = getAllBuggyMapForSignup;