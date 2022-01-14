module.exports = (sequelize, Datatypes) => {
    const Comment = sequelize.define(
        'Comment',
        {
            commentContent: {
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

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
        });

        Comment.belongsTo(models.Post, {
            foreignKey: {
                name: 'postId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
        });
    };

    return Comment;
};
