const { User } = require('../models/index');

// exports.getById = async (id) => {
//     // const user = await User.findOne({ where: { id: id } });
//     // return user.GetParentId();
// };

const getById = async (id) => {
    const user = await User.findOne({ where: { id: id } });
    return user;
};

module.exports = { getById };
