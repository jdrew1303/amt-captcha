var captchagen = require('captchagen');
var fs = require('fs');

var dataFilePath = './output/data.csv';
var imageOutputDir = './output/images/';
var imageUrlPrefix = 'http://localhost:3000/';
var times = +process.argv[2];

// remove old images
fs.readdirSync(imageOutputDir).forEach((file) => {
  if (file.match(/\.png$/)) {
    fs.unlinkSync(imageOutputDir + file);
  }
})

// generate images
var generateCaptcha = (filename) => {
  var captcha = new captchagen.Captcha();
  captcha.use(captchagen.drawBackground);
  captcha.use(captchagen.drawText);
  captcha.use(captchagen.drawLines);
  captcha.generate();

  captcha.buffer((e, buffer) => {
    var filePath = imageOutputDir + filename;
    fs.writeFile(filePath, buffer);
  });

  return captcha;
};
var captchas = [];
for (var i = 0; i < times; ++i) {
  var filename = i.toString() + '.png';
  var captcha = generateCaptcha(filename);
  captchas.push(captcha);
  console.log(captcha.text(), filename);
}

// generate csv
var header = ['image', 'answer'].join(',');
var body = captchas.map((captcha, i) => [
  imageUrlPrefix + i.toString() + '.png',
  captcha.text()
].join(','));
var data = header + '\n' + body.join('\n');
fs.writeFile(dataFilePath, data);
