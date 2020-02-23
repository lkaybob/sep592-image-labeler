const fs = require("fs");
let result = fs.readdirSync("/Users/lkaybob/Desktop/dogs/dogs");
fs.writeFileSync("./result", JSON.stringify(result));
