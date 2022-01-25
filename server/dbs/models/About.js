module.exports = (sequelize, Datatypes) => {
    const About = sequelize.define(
        'About',
        {
            caption: {
                type: Datatypes.STRING,
            },
            charactor: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            subject: {
                type: Datatypes.STRING,
            },
            level: {
                type: Datatypes.STRING,
            },
            gender: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            phoneNumber: {
                type: Datatypes.STRING,
            },
            educationLevel: {
                type: Datatypes.STRING,
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
            },
        });
    };

    return About;
};
