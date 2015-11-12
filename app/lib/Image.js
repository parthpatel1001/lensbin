
'use strict';

/**
 * Created by parthpatel1001 on 11/3/15.
 */
class Image {
    constructor(fs) {
        this.fs = fs
    }

    get_pictures(path,then){
        this.fs.readdir(path,function(err,items){
            then(items);
        });
    }
}