import multer from "multer";
import path from "path";
import fs from "fs";


const schoolFeesPath = path.join(__dirname, "./public/schFees");
const deptDuesPath = path.join(__dirname, "./public/deptDues");
const libraryPath = path.join(__dirname, "./public/library");
const medicalPath = path.join(__dirname, "./public/medical")
//const jobPath = path.join(__dirname, "../public/jobs")


const schoolFeesStorage = multer.diskStorage({
    destination: (req, files, cb) => {
        //check if the public folder exists if not create it
        createFolder();
        cb(null, schoolFeesPath);
    },
    filename: (req, files, cb) => {
        const ext = files.mimetype.split("/")[1];
        cb(null, `${files.fieldname}_${Date.now()}.${ext}`);
    },
});


const deptDuesStorage = multer.diskStorage({
    destination: (req, files, cb) => {
        //check if the public folder exists if not create it

        createFolder();
        cb(null, deptDuesPath);
    },
    filename: (req, files, cb) => {
        const ext = files.mimetype.split("/")[1];
        cb(null, `${files.fieldname}_${Date.now()}.${ext}`);
    }
});


const libraryStorage = multer.diskStorage({
    destination: (req, files, cb) => {
        //check if the public folder exists if not create it

        createFolder();
        cb(null, libraryPath);
    },
    filename: (req, files, cb) => {
        const ext = files.mimetype.split("/")[1];
        cb(null, `${files.fieldname}_${Date.now()}.${ext}`);
    }


});

const medicalStorage = multer.diskStorage({
    destination: (req, files, cb) => {
        //check if the public folder exists if not create it

        createFolder();
        cb(null, medicalPath);
    },
    filename: (req, files, cb) => {
        const ext = files.mimetype.split("/")[1];
        cb(null, `${files.fieldname}_${Date.now()}.${ext}`);
    }


});

// const JobStorage = multer.diskStorage({
//     destination: (req, files, cb) => {
//         //check if the public folder exists if not create it

//         createFolder();
//         cb(null, jobPath);
//     },
//     filename: (req, files, cb) => {
//         const ext = files.mimetype.split("/")[1];
//         cb(null, `${files.fieldname}_${Date.now()}.${ext}`);
//     }
// })

const courseFilter = (req: any, files: any, cb: any) => {
    if (
        files.mimetype.split("/")[1] === "jpeg" ||
        files.mimetype.split("/")[1] === "png"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Not a supported file"), false);
    }
};

const profileImageFilter = (req: any, files: any, cb: any) => {
    if (files.mimetype.split("/")[1] === "png" || files.mimetype.split("/")[1] === "jpg" || files.mimetype.split("/")[1] === "jpeg" || files.mimetype.split("/")[1] === "pdf") {
        cb(null, true);
    } else {
        cb(new Error("Not a supported file"), false);
    }
};

const proposalFilter = (req: any, files: any, cb: any) => {
    if (files.mimetype.split("/")[1] === "jpeg" || files.mimetype.split("/")[1] === "jpg" || files.mimetype.split("/")[1] === "png" || files.mimetype.split("/")[1] === "pdf") {
        cb(null, true);
    } else {
        cb(new Error("Not a supported file"), false);
    }
};

const serviceFilter = (req: any, files: any, cb: any) => {
    if (files.mimetype.split("/")[1] === "png" || files.mimetype.split("/")[1] === "jpg" || files.mimetype.split("/")[1] === "jpeg" || files.mimetype.split("/")[1] === "pdf") {
        cb(null, true);
    } else {
        cb(new Error("Not a supported file"), false);
    }
};

const jobFilter = (req: any, files: any, cb: any) => {
    if (files.mimetype.split("/")[1] === "png" || files.mimetype.split("/")[1] === "jpg" || files.mimetype.split("/")[1] === "jpeg" || files.mimetype.split("/")[1] === "pdf") {
        cb(null, true);
    } else {
        cb(new Error("Not a supported file"), false);
    }
}

//error checking
export const ErrorMulterChecking = (multerUploadFunction: any) => {
    return (req: any, res: any, next: any) => {
        multerUploadFunction(req, res, (err: any) => {
            // handle Multer error
            if (err && err.name && err.name === "MulterError") {
                return res.json({
                    error: `File upload error:${err.message}`
                }).status(500)
            }
            // handle other errors
            if (err) {

                return res.json({
                    error: `Some went wrong when trying to upload file:${err.message}`
                }).status(500)

            }

            next();
        });
    };
};



//upload files 

export const schoolfeesUpload = multer({
    storage: schoolFeesStorage,
    fileFilter: profileImageFilter,
});

export const deptDuesUpload = multer({
    storage: deptDuesStorage,
    fileFilter: courseFilter,
});

export const medicalUpload = multer({
    storage: medicalStorage,
    fileFilter: proposalFilter,
});

export const libraryUpload = multer({
    storage: libraryStorage,
    fileFilter: serviceFilter
})

// export const jobUpload = multer({
//     storage: JobStorage,
//     fileFilter: jobFilter
// })


export const createFolder = () => {

    if (!fs.existsSync(path.join(__dirname, "./public"))) {
        fs.mkdirSync(path.join(__dirname, "./public"));
    }

    if (!fs.existsSync(path.join(__dirname, "./public/deptDues"))) {
        fs.mkdirSync(path.join(__dirname, "./public/deptDues"));
        //create a .gitignore file in the public folder
        fs.writeFileSync(
            path.join(__dirname, "./public/.gitignore"),
            "*\n!.gitignore"
        );
    }

    if (!fs.existsSync(path.join(__dirname, "./public/schFees"))) {
        fs.mkdirSync(path.join(__dirname, "./public/schFees"));
        //create a .gitignore file in the public folder
        fs.writeFileSync(
            path.join(__dirname, "./public/.gitignore"),
            "*\n!.gitignore"
        );
    }

    if (!fs.existsSync(path.join(__dirname, "./public/library"))) {
        fs.mkdirSync(path.join(__dirname, "./public/library"));
        //create a .gitignore file in the public folder
        fs.writeFileSync(
            path.join(__dirname, "./public/.gitignore"),
            "*\n!.gitignore"
        );
    }

    if (!fs.existsSync(path.join(__dirname, "./public/medical"))) {
        fs.mkdirSync(path.join(__dirname, "./public/medical"));
        //create a .gitignore file in the public folder
        fs.writeFileSync(
            path.join(__dirname, "./public/.gitignore"),
            "*\n!.gitignore"
        );
    }

    // if (!fs.existsSync(path.join(__dirname, "../public/jobs"))) {
    //     fs.mkdirSync(path.join(__dirname, "../public/jobs"));
    //     //create a .gitignore file in the public folder
    //     fs.writeFileSync(
    //         path.join(__dirname, "../public/.gitignore"),
    //         "*\n!.gitignore"
    //     );
    // }


    // if (!fs.existsSync(path.join(__dirname, "../public/jobs"))) {
    //     fs.mkdirSync(path.join(__dirname, "../public/jobs"));
    //     //create a .gitignore file in the public folder
    //     fs.writeFileSync(
    //         path.join(__dirname, "../public/.gitignore"),
    //         "*\n!.gitignore"
    //     );
    // }
}
