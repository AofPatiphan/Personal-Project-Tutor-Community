module.exports = (sequelize, Datatypes) => {
    const Post = sequelize.define(
        'Post',
        {
            caption: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            pictureUrl: {
                type: Datatypes.STRING,
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
            },
        });

        Post.hasMany(models.Comment, {
            foreignKey: {
                name: 'postId',
            },
        });
        Post.hasMany(models.Like, {
            foreignKey: {
                name: 'postId',
            },
        });
    };

    return Post;
};
