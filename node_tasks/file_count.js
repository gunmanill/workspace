module.exports = function (grunt) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');

  grunt.registerMultiTask('file-count', 'file-count', function () {
    var that = this;

    var files = grunt.file.expand({
      filter: function (filepath) {
        if (grunt.file.isFile(filepath)) {
          return filepath;
        }
      }
    }, this.data.srcFile);
    var includeArr = [];
    var excludeFileArr = [];

    files.forEach(function(filePath){
      var filePathArr = filePath.split('/'),
        fileName = filePathArr[filePathArr.length - 1];

      fileName = fileName.split('.')[0]

      that.data.appStylePath.forEach(function(stylePath){
        var readFile = grunt.file.read(stylePath, {encoding: 'utf-8'});
        readFile = readFile.toString();

        var dataArr = readFile.match(fileName.toString());
        if (!_.isNull(dataArr) && (_.isArray(dataArr) && dataArr.length)) {
          includeArr.push(dataArr)
        } else {
          excludeFileArr.push(fileName);
        }
      });
    });




    console.log(files.length);
    console.log(includeArr.length);
    console.log(excludeFileArr);
  });
};