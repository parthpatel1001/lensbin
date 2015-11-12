var $ = require('jquery');
var holder = document.getElementById('main-pane-holder');
var AWS = require('aws-sdk'); 
var fs = require('fs');

// TODO rename this shit
$window = $('.window'),
$placeHolder = $('.landing-placeholder'),
$imageGrid = $(".wrap"),
$imageTileTemplate = $('.image-tile'),
$accessKey = $("#access-key"),
$keySecret = $("#key-secret"),
$bucket = $("#bucket"),
$keyPrefix = $("#key-prefix");

var Uploader = function(){
	var _files = [];
	
	this.setFiles = function(files) {
		_files = files;
		return this;
	};

	this.createImageTiles = function($template,$imageGrid) {
		var i, im;
		for (i in _files) {
			im = $template.clone(),
			innerBox = im.children('.boxInner');
		    innerBox.children('img').attr('src',_files[i].path);
		    innerBox.children('.titleBox').text(name);
		    $imageGrid.append(im);
	    	im.show();
		}
	};

	this.uploadFiles = function(bucket,keyPrefix,s3Client,fs,path){
		console.log('opening',path);
		fs.readFile(path,function(err,data){
			if (err) {
				alert(err); return;
			}

			var params = {
				Bucket: bucket,
				// TODO check if last char of input is /
				// TODO remove directory structure of file name, just leave the name of the file
				Key: keyPrefix + '/' + path,
				Body: data
			};

			s3Client.putObject(params,function(err,data) {
				if(err) {
					alert(err); return;
				}

				console.log('Success',data);
			});
		});
	};

	this.uploadAllFiles = function(bucket,keyPrefix,s3Client,fs) {
		var i, path;
		for(i in _files) {
			path = _files[i].path;
			if(path) {
				this.uploadFiles(bucket,keyPrefix,s3Client,fs,_files[i].path);	
			} else {
				console.log('invalid path');
			}
			
		}
	};
};

var uploader = new Uploader(), s3;

holder.ondragover = function () {
    $window.addClass('file-hover');
    return false;
};

holder.ondragleave = function(){
    $window.removeClass('file-hover');
    return false;
};

holder.ondragend = function () {
    $window.removeClass('file-hover');
    return false;
};

holder.ondrop = function (e) {
	/*
		stuff e has:
		lastModified: 1446970997000
		lastModifiedDate: Sun Nov 08 2015 03:23:17 GMT-0500 (EST)
		name: "Screenshot 2015-11-08 03.23.18.png"
		path: "/Users/parthpatel1001/Dropbox/Screenshots/Screenshot 2015-11-08 03.23.18.png"
		size: 542029
		type: "image/png"
		webkitRelativePath: ""
	*/
	$window.removeClass('file-hover');
    $placeHolder.hide();
	uploader
		.setFiles(e.dataTransfer.files)
		.createImageTiles($imageTileTemplate,$imageGrid);
    
    return false;
};

$("#submit-upload").click(function(){
	AWS.config.update({
		accessKeyId: $accessKey.val(), 
		secretAccessKey: $keySecret.val()
	});
	s3 = new AWS.S3();
	uploader.uploadAllFiles(
		$bucket.val(),
		$keyPrefix.val(),
		s3,
		fs
	);
});