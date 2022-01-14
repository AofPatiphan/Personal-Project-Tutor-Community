module.exports = (sequelize, Datatypes) => {
    const Post = sequelize.define(
        'Post',
        {
            postContent: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            like: {
                type: Datatypes.DECIMAL,
                defaultValue: 0,
            },
        },
        {
            underscored: true,
        }
    );

    Post.associate = (models) => {
        Post.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
        });

        Post.hasMany(models.Comment, {
            foreignKey: {
                name: 'postId',
                allowNull: false,
            },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
        });
    };

    return Post;
};
