module.exports = (sequelize, Datatypes) => {
    const Comment = sequelize.define(
        'Comment',
        {
            commentContent: {
                type: Datatypes.STRING,
                // allowNull: false,
                // validate: {
                //     notEmpty: true,
                // },
            },
        },
        {
            underscored: true,
        }
    );

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
            },
        });

        Comment.belongsTo(models.Post, {
            foreignKey: {
                name: 'postId',
            },
        });
    };

    return Comment;
};
