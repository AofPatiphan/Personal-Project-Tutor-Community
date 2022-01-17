const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dbtlgaii3',
    api_key: '219816337589839',
    api_secret: 'I6r4bFjU1QXNhpbcDkUcOGOegyA',
});

const uploadImage = async (req, res, next) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'tutor',
            use_filename: true,
        });
        res.status(201).json({ url: uploadResponse.url });
    } catch (err) {
        next(err);
    }
};

const uploadImagePost = async (req, res, next) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'tutor',
            use_filename: true,
        });
        res.status(201).json({ url: uploadResponse.url });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    uploadImage,
    uploadImagePost,
};
