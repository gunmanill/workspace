module.exports = function (grunt) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');

  grunt.registerMultiTask('fucking-images', 'fucking-images', function () {
    var that = this;

    var outputImages = grunt.file.expand({
      filter: function (filepath) {
        if (grunt.file.isFile(filepath)) {
          return filepath;
        }
      }
    }, this.data.srcImg);


    var outputHaml = grunt.file.expand({
      filter: function (filepath) {
        if (grunt.file.isFile(filepath)) {
          return filepath;
        }
      }
    }, this.data.srcFiles);


    outputHaml.forEach(function (hamlPath) {

      outputImages.forEach(function (imagePath) {
        var splitFile = imagePath.split('/'),
          imageName = splitFile[splitFile.length - 1];

        var readHAML = grunt.file.read(hamlPath, {encoding: 'utf-8'});
        readHAML = readHAML.toString();

        var dataArr = readHAML.match(imageName.toString());
        if (!_.isNull(dataArr) && (_.isArray(dataArr) && dataArr.length)) {
          grunt.file.copy(__dirname + '/' + imagePath, __dirname + '/' + that.data.copyImages + '/' + imageName);
          return;
        }
      });
    });
  });

};