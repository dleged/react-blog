const serve = require('serve');
const server = serve('./build', {
  port: 5000,
  ignore: ['node_modules']
});
