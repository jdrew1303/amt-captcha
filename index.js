var captchagen = require('captchagen');
var fs = require('fs');

var outputDir = './output/';
var captcha = captchagen.create();
var filePath = outputDir + captcha.text() + '.png';
console.log(filePath);

captcha.generate();

captcha.buffer(function(e, buffer) {
  fs.writeFile(filePath, buffer, function() {
    console.log('done');
  });
});
