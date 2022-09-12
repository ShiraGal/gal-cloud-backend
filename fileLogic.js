const { error, log } = require("console");
const fs = require("fs");
const { send } = require("process");
const { ErrorModel } = require("./helpers/errorModel");


//_________________________________
function isExist(filePath) {
  console.log("exist??");
  return fs.existsSync(filePath);
}
function isValidName(filename = "") {
  return ["/", "\\", "*", ":", "|", "?", "<", ">", '"'].find((char) =>
    filename.includes(char)
  )
    ? false
    : true;
}
function isValidExtantions(filename = "") {
  let ext = filename.slice(filename.lastIndexOf(".") + 1);
  console.log(filename);
  return ["pdf", "jpg", "docx", "mp3"].find((char) => ext == char)
    ? true
    : false;
}
//_________________________________
function isValid(req, res, next) {
  try {
    let filename = req.file.originalname;
    console.log("file name= " + filename);
    if (isValidName(filename) && isValidExtantions(filename)) {
      console.log("it is valid");
      next();
    } else {
      console.log("not valid");
      throw new ErrorModel(
        400,
        "file type not valid, file types available for upload - pdf, jpg, docx, mp3"
      );
    }
  } catch (err) {
    res.status(err.status || 400).json(err.message);
  }
}

//_______________________________________________________create file
function create(path, content) {
  console.log("logic");
  try {
    if (!isExist(path)) {
      console.log("under isExist--- " + path);
      fs.writeFileSync(path, content);
    } else {
      console.log("create");
      throw error;
    }
  } catch (error) {}
}

//_______________________________________________________ read details
const readDetails = (filePath) => {
  console.log("in logic Details");
  let res = fs.statSync(filePath);
  if (!res) throw new ErrorModel(400, "No details");
  return res;
};
//_______________________________________________________ add to file
// const update = (filename, content) => {
//   try {
//     if (isExist(filename)) {
//       fs.appendFileSync(filename, content);
//     } else {
//       throw error;
//     }
//   } catch (error) {
//     console.log("can't add");
//   }
// };

//_______________________________________________________ dounload file
const read = (filePath) => {
  try {
    console.log("in logic read");
    if (isExist(filePath)) {
      console.log("in if logic read");
      let res = fs.readFileSync(filePath, { encoding: "utf8" });
      return res;
    } else {
      throw error;
    }
  } catch (error) {
    console.log("can't read");
  }
};
//______________________________________________________delete file
const remove = (filePath) => {
  try {
    console.log("in if logic remove  " + filePath);
    fs.unlinkSync("./" + filePath);
  } catch (error) {
    console.log("can't remove");
  }
};
//_______________________________________________________ rename file
const rename = (newPath, pastPath) => {
  try {
    console.log("in logic rename!  " + newPath);
    let res = fs.renameSync(`./${pastPath}`, `./${newPath}`);
    return res;
  } catch (error) {
    console.log("can't rename...");
  }
};


module.exports = { create, read,  remove, isValid, rename, readDetails };
