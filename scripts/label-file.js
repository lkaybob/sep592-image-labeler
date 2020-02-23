const fs = require("fs");
const prefix = "/Users/lkaybob/Downloads/cats/cats/";
const filePath = "/Users/lkaybob/Downloads/2019-05-27T23_36_19_94234_all_namespaces_kind_cats_cats_processed.json";
// const fileInfo = JSON.parse(fs.readFileSync(filePath));
const fileInfo = JSON.parse(fs.readFileSync(filePath)).slice(6511);

let cute = [];
let notCute = [];


// 폴더 만들기
fs.mkdirSync(`${ prefix }/0`);
fs.mkdirSync(`${ prefix }/1`);

// 분류
fileInfo.forEach((element) => {
  if (element.cuteness) {
    cute.push(element.name);
  } else {
    notCute.push(element.name);
  }
});

// fs.renameSync(oldPath, newPath)
cute.forEach((element) => {
  fs.renameSync(`${prefix}/${element}`, `${prefix}/1/${element}`)
});

notCute.forEach((element) => {
  fs.renameSync(`${prefix}/${element}`, `${prefix}/0/${element}`)
});
