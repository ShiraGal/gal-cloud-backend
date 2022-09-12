// const { error, log } = require("console");
const fs = require("fs"); 
const { ErrorModel } = require("./helpers/errorModel");



//_______________________________________________________create folder

function createFolder(folderName){
   
      console.log("try to fs folder");
      console.log(folderName);
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync("./uploads/"+folderName);
        console.log("!!!!");
      }else{
        throw new ErrorModel(
          400,
          "folder name is exist. Enter new name")
      }
  
  }
  //_______________________________________________________ read folder
  
  function readFolder(folderName) {
    try{
        console.log("logic folder read "+folderName);
        let folderPath = "./uploads/"+folderName
        let inFolder = fs.readdirSync(folderPath);
        console.log(inFolder);
        return inFolder
    }
    catch(error){
      console.log("can't read");
    }
  }
  //________________________________________________________read all folders

  function readall() {
    try{
        let inFolder = fs.readdirSync("./uploads");
        const foldersOnly =[];
        const filsOnly = [];
        inFolder.forEach(f => {
          if(fs.lstatSync("./uploads/"+f).isDirectory()){
            foldersOnly.push(f)
          }else{
            filsOnly.push(f)
          }
        })
        console.log("inFolder= "+inFolder);
        console.log("foldersOnly= "+foldersOnly);
        console.log("filsOnly= "+filsOnly);
        return {foldersOnly , filsOnly}
    }
    catch(error){
      console.log("can't read");
    }
  }
//________________________________________________________delete folders

function remove(folderPath){
  console.log("logic folder remove "+folderPath);
  try{
   fs.rmdirSync("./"+folderPath);
    // console.log("after fs");
    // return inFolder
}
catch(error){
  console.log("can't remove");
}
}


  module.exports = {createFolder, readFolder, readall, remove };