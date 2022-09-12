const express = require("express");
const router = express.Router();
const multer = require("multer");
// const upload = multer();
const folderLogic = require("./folderLogic");


// ======================================================================יצירת תקייה
router.post("/", async (req, res) => {
    try {
      console.log(req.body.folderName);
      await folderLogic.createFolder(req.body.folderName);
      res.send("new folder seccess");
    } catch (error) {
      console.log("router folder error");
      res.status(error.status || 400).json(error.message);
    }
  });
  // ======================================================================קריאת תקייה
  router.get("/:query", async (req, res) => {
    console.log("in router read folder");
    try {
      let folderName = req.params.query;
      console.log(folderName+ "  the folder");
      if(folderName === "uploads"){
        let myfolders = folderLogic.readall().foldersOnly;
        let myOutFils = folderLogic.readall().filsOnly;
       res.send({myfolders, myOutFils});
      }else{
        let openFolder = folderLogic.readFolder(folderName);
        console.log("after logic==" + folderName);
        console.log(openFolder);
        if(openFolder){
          res.send(openFolder);
        }else{
          throw err
        }
      }
    } catch (err) {
      res.status(400).json(err || "errpr");
    }
  });

  // ======================================================================מחיקת תקייה
  router.get("/", async (req, res) => {
    console.log("bliiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    try {
      console.log(req.query.key +"  --folderPath to delete");
      let folderPath = req.query.key;
      folderLogic.remove(folderPath);
      console.log("after logic remove ==");
      res.send(true)
    } catch (err) {
      res.status(400).json(err || "errpr");
    }
  });
  
  

  module.exports = router;