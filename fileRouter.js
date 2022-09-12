const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();
//{ dest : 'uploads/'};

const fileLogic = require("./fileLogic");



// ======================================================================read details
router.get("/readDetails", async (req, res) => {
  console.log("in router readDetails file");
  console.log(req.query.key +"  --filePath from readDetails router");
  try {
    let filePath = req.query.key;
    const details = fileLogic.readDetails("./"+filePath);
    console.log("after logic readDetails == " );
    res.send(details);
  } catch (err) {
    res.status(err.status || 400).json(err.message || "error");
  }
});

// ======================================================================upload file
router.post(
  "/upload",
  upload.single("myFile"),
  fileLogic.isValid,
  async (req, res, next) => {
    console.log("in router upload file");
    const pathHere = req.headers.path
    const { file } = req;
    const path = `${pathHere}/${file.originalname}`
    console.log(path); 
    try {
      // console.log(req);
      fileLogic.create(path, file.buffer);
      console.log("in try upload");
      res.send("Ok");
    } catch (error) {
      console.log("router error");
      res.status(400).send(error);
    }
  }
);

// =====================================================================dounload file
router.get("/download", async (req, res) => {
  console.log("in router read file");
  try {
    console.log(req.query.key +"  --filePath from router");
    let filePath = req.query.key;
    fileLogic.read(filePath);
    // console.log("after logic==" + openFile);
    res.download(filePath)
  } catch (err) {
    res.status(400).json(err || "errpr");
  }
});

// ======================================================================delete file
router.get("/remove", async (req, res) => {
  console.log("in router delete file");
  try {
    console.log(req.query.key +"  --filePath from remove router");
    let filePath = req.query.key;
    fileLogic.remove(filePath);
    console.log("after logic remove ==");
    res.send(true)
  } catch (err) {
    res.status(400).json(err || "errpr");
  }
});


// ======================================================================rename file
router.put("/rename", async (req, res) => {
  console.log("in router rename file");
 
  console.log(req.body);
  console.log(req.body.pastPath +"  --pastPath");
  console.log(req.body.newPath +"  --newPath");
  try {
    let pastPath = req.body.pastPath;
    let newPath = req.body.newPath;
    fileLogic.rename(newPath, pastPath);
    console.log("after logic rename!");
    res.send(newPath)
  } catch (err) {
    res.status(400).json(err || "errpr");
  }
})
  

module.exports = router;
