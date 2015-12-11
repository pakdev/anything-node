'use strict';

const ffi = require('ffi');
const child_process = require('child_process');

(function() {
    var Everything;

    Everything = (function() {
        function Everything() {
            this._lib = ffi.Library('./../../lib/Everything64.dll', {
                'Everything_SetSearchA': ['void', ['string']],
                'Everything_SetRegex': ['void', ['bool']],
                'Everything_SetMax': ['void', ['ulong']],
                'Everything_QueryA': ['bool', ['bool']],
                'Everything_IsVolumeResult': ['bool', ['ulong']],
                'Everything_IsFolderResult': ['bool', ['ulong']],
                'Everything_IsFileResult': ['bool', ['ulong']],
                'Everything_GetNumResults': ['ulong', []],
                'Everything_GetResultPathA': ['string', ['ulong']],
                'Everything_GetResultFileNameA': ['string', ['ulong']],
                'Everything_GetResultFullPathNameA': ['ulong', ['ulong', 'string', 'ulong']],
                'Everything_GetLastError': ['ulong', []]
            });
        }

        function getBasename(path) {
            return path.split(/[\\/]/).pop();
        }

        Everything.prototype.getApplications = function() {
            this._lib.Everything_SetSearchA('*.lnk');
            this._lib.Everything_QueryA(true);

            let applications = {};
            let buf = new Buffer(260);

            for (let i = 0; i < this._lib.Everything_GetNumResults(); i++) {
                this._lib.Everything_GetResultFullPathNameA(i, buf, buf.length);
                let path = buf.toString();
                let filename = getBasename(path).trim();
                if (!(filename in applications)) {
                    applications[filename] = path;
                }
                buf.fill(0);
            }

            return applications;
        }

        Everything.prototype.launch = function(path) {
            console.log('launching:', path);
            child_process.exec(`"${path}"`, (error, stdOut, stdErr) => {
                // console.log(error);
            });
        }

        return Everything;
    })();

    module.exports = Everything;
}).call(this);