var $ = require('jquery');
var holder = document.getElementById('main-pane-holder');
$window = $('.window'),
$placeHolder = $('.landing-placeholder'),
$imageGrid = $(".wrap"),
$imageTileTemplate = $('.image-tile');

var create_image_tile = function(path,name){
    var im = $imageTileTemplate.clone(),
        innerBox = im.children('.boxInner');
	    innerBox.children('img').attr('src',path);
	    innerBox.children('.titleBox').text(name);
	    $imageGrid.append(im);
	    im.show();
};

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
    $window.removeClass('file-hover');
    $placeHolder.hide();
    var i = 0, files = e.dataTransfer.files;
    for (i; i < files.length; i++) {
        console.log('File ',files[i].path);
        create_image_tile(files[i].path,files[i].name);
    }
    return false;
};