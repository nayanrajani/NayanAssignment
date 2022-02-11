const fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "./files");

// REad the directory and list all files

fs.readdir(dirPath, (err, files) => {
  if (err) {
    return;
  }

  files.forEach((file, i) => {
    fs.stat(`${dirPath}/${file}`, (err, stat) => {
      if (err) {
        console.log(`Some Error ${err.message}`);
        return;
      }
      if(stat.isFile()) {
          console.log(file);
          
          console.log(`Data From File is = ${fs.readFileSync(`${dirPath}/${file}`)}`);
      }
      else{
        if(stat.isDirectory()){
            fs.readdir(`${dirPath}/${file}`, (err, files1) => {
            if (err) {
              console.log(`The error inside subfolder = ${err.message}`);
              return;
            }
            files1.forEach((file1, i) => {
              fs.stat(`${dirPath}/${file}/${file1}`, (err, stat) => {
                if (err) {
                  console.log(`Some Error ${err.message}`);
                  return;
                }
                if(stat.isFile()) {
                    console.log(`${file}/${file1}`);

                    console.log(`Data From File is = ${fs.readFileSync(`${dirPath}/${file}/${file1}`)}`);
                }
              });
            });
          });
        }
      }
    });
  });
});


















































// const fs = require('fs');
// const path = require("path");

// // directory path
// const Directory = path.join(__dirname, "./../Nodejs");

// //Read all Folder and subfolders from Directory
// fs.readdir(Directory, (err, Folder) => {
//   if (err) {
//     return;
//   }

//   //iterate over all Folder and folder under Directory
//   Folder.forEach((Subfile, i) => {
//     fs.stat(`${Directory}/${Subfile}`, (err, stat) => {
//       if (err) {
//         console.log(`Error Occured = ${err.message}`);
//         return;
//       }
//       //check if Subfile and read it
//       else if(stat.isFile()) {
//           console.log(`${Subfile}`);
//             console.log(`Data From File is = ${fs.readFileSync(`${Directory}/${Subfile}`)}`);
//       }
//       //if subfolder then call ReadFiles function which read Folder in subfolder
//       else{
//         let p = path.join(Directory, `./${Subfile}`);
//         ReadFiles(p);
//       }
    
//     });
//   });
// });

// let ReadFiles = (p)=>{

//   fs.readdir(p, (err, Folder) => {
//     if (err) {
//       return;
//     }
//     //iterate over subfolder
//     Folder.forEach((f, i) => {
//       fs.stat(`${p}/${f}`, (err, stat) => {
//         if (err) {
//           console.log(`Error Occured = ${err.message}`);
//           return;
//         }
//         else if(stat.isFile()) {
//             console.log(`${f}`);
//         }
//         //if under subfolder there is another folder then again we call ReadFiles function to read all Folder
//       else{
//         p = path.join(p, `./${f}`);
//         ReadFiles(p);
//       }
//       });
//     });
//   });
// }


