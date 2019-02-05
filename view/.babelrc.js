 module.exports = {
   plugins: [
     [
       'transform-decorators-legacy'
       'transform-es2015-modules-commonjs',
       'babel-plugin-module-resolver',
       {
         alias: {
           components: './src/components',
         },
       },
     ],
   ],
 };
