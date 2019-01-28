const errors = require('restify-errors')
const mkdirp = require('mkdirp')
const fs = require('fs')
const uuid = require('uuid')
const aws = require('aws-sdk')

const rekognition = new aws.Rekognition();

exports.upload = async (req, res, next) => {
    const file = req.files.image
    const filename = file.name.split('.')
    const extension = filename[filename.length - 1]
    const isImage = file.type.startsWith('image/')
    if (isImage) {
        try {
            let upload = await (function(err) {
                let readImage = fs.createReadStream(file.path)
                if (err) {
                    return next(new errors.BadRequestError())
                }
                let new_path = `./uploads/${uuid.v4()}.${extension}`
                mkdirp('./uploads')
                let outImage = fs.createWriteStream(new_path)
                readImage.pipe(outImage)

                // Pull base64 representation of image from file system
                fs.readFile('./uploads/reniImage.jpg', 'base64', (err, data) => {

                    const buffer = new Buffer(data, 'base64');

                    rekognition.detectLabels({
                        Image: {
                            Bytes: buffer
                        }
                    }).promise()
                        .then((res) => {

                            // Get the labels that rekognition sent back
                            console.log(res);

                            //TO DO: Save Data to MongoDB database 

                        });

                });
            })()
        } catch ( err ) {
            throw err
        }
    } else {
        return next(new errors.InvalidContentError('This file type is not allowed!'))
    }
}
