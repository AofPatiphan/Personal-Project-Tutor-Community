module.exports = (sequelize, Datatypes) => {
    const Friend = sequelize.define(
        'Friend',
        {
            status: {
                type: Datatypes.ENUM('FRIEND', 'PENDONG'),
            },
        },
        {
            underscored: true,
        }
    );

    Friend.associate = (models) => {
        Friend.belongsTo(models.User, {
            foreignKey: {
                name: 'request_to_id',
            },
        });

        Friend.belongsTo(models.User, {
            foreignKey: {
                name: 'request_by_id',
            },
        });
    };

    return Friend;
};
