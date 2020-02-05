'use strict';

/**
 * @type {dw.io.File}
 */
const File = require('dw/io/File');
/**
 * @type {dw.system.Status}
 */
const Status = require('dw/system/Status');
/**
 * @type {dw.system.Logger}
 */
const Logger = require('dw/system/Logger');

function getRootDir() {
    var siteID = require('dw/system/Site').current.ID;
    return File.getRootDirectory(File.DYNAMIC + File.SEPARATOR + siteID);
}

/**
 * Write template to directory
 * @param {string} filename
 * @param {string} content
 * @returns {dw.system.Status}
 */
function writeTemplate(filename, content) {
    var relFilePath = filename.substring(0, filename.lastIndexOf(File.SEPARATOR));
    var baseFilename = filename.substring(filename.lastIndexOf(File.SEPARATOR)+1);
    var dir;
    if (relFilePath) {
        dir = new File(getRootDir(), relFilePath);
    } else {
        dir = getRootDir();
    }
    dir.mkdirs();
    var file = new File(dir, baseFilename);
    file.createNewFile();

    var fWriter = new dw.io.FileWriter(file);
    fWriter.write( content );
    fWriter.flush();
    fWriter.close();

    return new Status( Status.OK );
}

exports.writeTemplate = writeTemplate;
