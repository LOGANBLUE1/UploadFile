const File = require('../models/File');
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req,res) => {
    try{
        if(!req.files.file){
            console.log('file is null');
        }
        const file = req.files.file;
        console.log("File aa gayi -> ",file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log(path);

        file.mv(path, (err) => { 
            if (err) return console.log(err); 
            console.log(`File successfully moved!!`); 
          }); 

        res.json({
            success:true,
            message:"Local file uploaded successfully"
        })
    }
    catch(e){
        console.error("Could not upload image",e);
    };
};



function isFileTypeSuppoted(type, supportedType){
    return supportedType.includes(type);
}

async function uploadCloudToCloudinary(file, folder,quality){
    const options = {folder};
    options.resource_type = "auto";
    if(quality){
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req,res) => {
    try{
        //fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log("File --->", file);

        //validation
        const supportedType = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSuppoted(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }

        //file format supported ha
        const response = await uploadCloudToCloudinary(file, "FileUploadFol");
        console.log("response -> ", response);

        const fileData = await File.create({//saving data to db
            name, tags, email, imageUrl:response.secure_url
        });


        // const filedata = await 
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message: "Image successfully Uploaded"
        })

    }
    catch(e){
        console.error(e);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        });
    };
};


exports.videoUpload = async (req, res) => {
    try{
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log("File --->", file);

        const supportedType = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("Filetype -->",fileType);

        if(!isFileTypeSuppoted(fileType,supportedType)){
            console.log("shit");
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }

        const response = await uploadCloudToCloudinary(file, "FileUploadFol");
        console.log("response -> ", response);

        const fileData = await File.create({//saving data to db
            name, tags, email, imageUrl:response.secure_url
        });


        // const filedata = await 
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message: "Video successfully Uploaded"
        })
    }
    catch(e){
        console.error(e);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        });
    }
};

exports.imageReducerUpload = async (req,res) => {
    try{
        //fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log("File --->", file);

        //validation
        const supportedType = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSuppoted(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }

        //file format supported ha
        const response = await uploadCloudToCloudinary(file, "FileUploadFol",90);
        console.log("response -> ", response);

        const fileData = await File.create({//saving data to db
            name, tags, email, imageUrl:response.secure_url
        });


        // const filedata = await 
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message: "Image successfully Uploaded"
        })

    }
    catch(e){
        console.error(e);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        });
    };
}