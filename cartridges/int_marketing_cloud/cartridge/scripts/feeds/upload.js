'use strict';

/**
 * @module feeds/upload
 */

/**
 * @type {dw.io.File}
 */
const File = require('dw/io/File');
/**
 * @type {dw.svc.LocalServiceRegistry}
 */
const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
/**
 * @type {dw.system.Status}
 */
const Status = require('dw/system/Status');

function sftpUpload(params, stepExecution) {
    /**
     * @type {dw.svc.FTPService}
     */
    var sftpService = registerSFTP(params.SFTPServiceID);
    var siteID = require('dw/system/Site').current.ID;
    var dirName = File.IMPEX + File.SEPARATOR + 'mccfeeds' + File.SEPARATOR + siteID;
    var exportFile = new File(dirName + File.SEPARATOR + params.ExportFileName);
    var fileName = params.AddDateExtension ? siteID +'_'+ params.ExportFileName.split('.').join('_' + new Date().toISOString().split('T')[0] + '.') : siteID +'_'+ params.ExportFileName;

    var returnStatus;
    try {
        var uploadStatus = sftpService.call(
            {
                exportFile: exportFile,
                filename: fileName,
                targetPath: params.TargetPath
            }
            );
        if (uploadStatus.ok) {
            returnStatus = new Status(Status.OK);
        } else {
            returnStatus = new Status(Status.ERROR, uploadStatus.status, uploadStatus.errorMessage);
        }
    } catch (e) {
        returnStatus = new Status(Status.ERROR, 'EXCEPTION', e.toString());
    }
    return returnStatus;
}

/**
 * @param {string} serviceID
 * @returns {dw.svc.FTPService}
 */
function registerSFTP(serviceID) {
    return LocalServiceRegistry.createService(serviceID, {
        /**
         * @param {dw.svc.FTPService} svc
         * @param {Object} params
         */
        createRequest: function (svc, params) {
            svc.setOperation('putBinary', params.targetPath + params.filename, params.exportFile);
        },
        parseResponse: function (svc, uploadStatus) {
            return uploadStatus;
        },
        mockCall: function (svc, params) {}
    });
}

exports.sftpUpload = sftpUpload;
