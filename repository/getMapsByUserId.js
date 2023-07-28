const { Map } = require("../models/map.model");

const getMapsByUserId = async (userId) => {
    const data = await Map.find({ userId })
        .populate({
            path: 'buggyMapId',
            select: '-_id unlocked active uiIndex price'
        });
    let myMaps = data.map(item => {
        const { _id, buggyMapId, theme, setting } = item;
        let map = buggyMapId.toObject();
        map = { ...map, id: _id, theme: theme, setting: setting };
        return map;
    });

    return myMaps;
}

module.exports = getMapsByUserId;