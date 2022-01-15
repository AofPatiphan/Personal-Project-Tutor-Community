module.exports = (sequelize, Datatypes) => {
    const About = sequelize.define(
        'About',
        {
            picture: {
                type: Datatypes.STRING,
            },
            charactor: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            underscored: true,
        }
    );

    About.associate = (models) => {
        About.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
        });
    };

    return About;
};
