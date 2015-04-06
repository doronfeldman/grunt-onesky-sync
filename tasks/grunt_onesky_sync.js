/*
 * grunt-onesky-sync
 * https://github.com/doronfeldman/onesky-sync
 *
 * Copyright (c) 2015 Doron Feldman
 * Licensed under the MIT license.
 */

'use strict';

var _               = require('underscore'),
    request         = require('request'),
    crypto          = require('crypto'),
    apiRoot         ='https://platform.api.onesky.io/1/';

module.exports = function(grunt) {
    grunt.registerMultiTask('grunt_onesky_sync', 'Syncronize translations from onesky', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            authFile: 'onesky.json',
            langDestination: '/',
            projectId: ''
        });

        var oneSkyKeys = grunt.file.readJSON(options.authFile);

        var createRequest = function(method, path, data) {
            var time = Math.floor(Date.now() / 1000);
            var devHash = crypto.createHash('md5').update(time + oneSkyKeys.secretKey).digest('hex');

            request = {
                url: apiRoot + path,
                method: method,
                headers: {
                    "content-type": "application/json"
                },
                qs: {
                    'api_key': oneSkyKeys.publicKey,
                    'timestamp': time,
                    'dev_hash': devHash
                }
            };

            if (data) {
                if (method === 'POST') {
                    request.json = data;
                } else {
                    request.qs = _.extend(request.qs, data);
                }
            }

            return request;
        };

        var done = this.async();
        request(createRequest("GET", "projects/"+options.projectId+"/translations/multilingual", {'source_file_name': 'Manually input', file_format: 'I18NEXT_MULTILINGUAL_JSON'}), function(error, response, body){
            if (response.statusCode === 200) {
                var resObject = JSON.parse(body);
                for (var key in resObject) {
                    if (resObject.hasOwnProperty(key)) {
                        var translations = resObject[key].translation;
                        var fileName = key.replace("-", "_").toLowerCase();
                        grunt.file.write(options.langDestination + fileName + ".json", JSON.stringify(translations));
                        grunt.log.ok("Translation Downloaded: " + options.langDestination + fileName + ".json");
                    }
                }
            }
            done();
        });
    });
};
