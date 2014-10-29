
Logit = {};

Logit.createLogger = function (options) {
   options = options || {};
   var defaultMetaData = _.defaults(options.defaultMetaData || {},  { app_name: 'logit' });
   var logstashOptions = _.defaults(options.logstashOptions || {}, {
         level: 'info',
         port: 28777,
         node_name: 'logit-node-name',
         host: '127.0.0.1'
   });

   var winston = Npm.require('winston');
   Npm.require('winston-logstash');

   var logger = new (winston.Logger)({
     transports: [
       new (winston.transports.Console)( {level: 'silly'}),
       new (winston.transports.Logstash)(logstashOptions)
     ]
   });

   var log = {
      options: {
         defaultMetaData: defaultMetaData,
         logstashOptions: logstashOptions
      }
   };

   var addDefaultMetaData = function (args, f) {
      var argsLength = args.length;

      if (typeof args[argsLength - 1] !== 'object' ) {
         args.push(defaultMetaData);
      } else {
         _.extend(args[argsLength - 1], defaultMetaData);
      }
      f.apply(null, args);
   };

   log.silly = function () {
      var args = [].slice.apply(arguments);
      addDefaultMetaData(args, logger.silly);
   };

   log.verbose = function () {
      var args = [].slice.apply(arguments);
      addDefaultMetaData(args, logger.verbose);
   };

   log.info = function () {
      var args = [].slice.apply(arguments);
      addDefaultMetaData(args, logger.info);
   };

   log.warn = function () {
      var args = [].slice.apply(arguments);
      addDefaultMetaData(args, logger.warn);
   };

   log.error = function () {
      var args = [].slice.apply(arguments);
      addDefaultMetaData(args, logger.error);
   };

   return log;
};