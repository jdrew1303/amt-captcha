var captchagen = require('captchagen');
var fs = require('fs');

var dataFilePath = './output/data.csv';
var imageOutputDir = './output/images/';
var imageUrlPrefix = 'http://localhost:3000/';
var times = +process.argv[2];

// generate images
var captchas = [];
for (var i = 0; i < times; ++i) {
  var captcha = captchagen.create();
  var filePath = imageOutputDir + i.toString() + '.png';
  console.log(captcha.text(), filePath);

  captcha.generate();

  captcha.buffer((e, buffer) => {
    fs.writeFile(filePath, buffer);
  });

  captchas.push(captcha);
}

// generate csv
var header = ['image', 'answer'].join(', ');
var body = captchas.map((captcha, i) => [
  imageUrlPrefix + i.toString() + '.png',
  captcha.text()
].join(', '));
var data = header + '\n' + body.join('\n');
fs.writeFile(dataFilePath, data);
