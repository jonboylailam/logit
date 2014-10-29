Package.describe({
   name: 'jonlailam:logit',
   summary: 'A Meteor package which uses winston and logstash to get logs into elasticsearch over tcp',
   version: '0.0.1',
   git: 'https://github.com/jonboylailam/logit.git'
});

Package.onUse(function (api) {
   api.versionsFrom('METEOR@0.9.3');
   api.addFiles('./src/logit.js', ['server']);
   api.export('Logit');
});

Package.onTest(function (api) {
   api.use('tinytest');
   api.use('jonlailam:logit');
   api.addFiles('./test/logit-tests.js', ['server']);
});


Npm.depends({
   "winston": "0.7.3",
   "winston-logstash": "0.1.10"
});

