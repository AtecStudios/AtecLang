var fs = require('fs');
var colors = require('colors');
var searchPath = "./";

fs.readdir(searchPath, {}, function(err,files){
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    console.log(colors.green("[ATEC] Found ATEC file: " + file));
    ParseFile(file);
  }
});

function ParseFile(name){
  var path = searchPath + name;
  console.log("[ATEC] Parsing ATEC file: " + name);
  if(!name){
    console.log(colors.red("[ATEC] Name not passed in!"));
    return;
  }

  if(!path){
    console.log(colors.red("[ATEC] Path not passed in!"));
    return;
  }

  fs.readFile(path, function (err, data) {

    var rawString

    if (err) {
      throw err;
    }

    rawString = data.toString();
    if (!CheckAtecCount(rawString)) {
      var parsed;
      parsed = rawString.replace(/ATEC/g, "");
      fs.writeFile(path.replace(/atec/g, "js"), parsed, function(err, data) {
        if (err) {
          return console.log(err);
        }
        console.log("[ATEC Parser] Parsed Succesfully!");
      });
    }
    });

}
function CheckAtecCount(raw)
{
  var lines = raw.split('\n');
  var failed = false;
  for(var i = 0;i < lines.length;i++){
    //code here using lines[i] which will give you each line
    if(i != lines.length - 1){
      if(!lines[i].includes("ATEC")){
        failed = true;
        console.log("ATEC NO FOUND on line: " + i + 1);
      }
    }
  }
  return failed;
}
