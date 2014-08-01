workspace
=========

Implementation of single page app with async module definition.

node_self_lmd.js is a nodejs file, that scans all modules for 'require' words and creates dependences map for each module. By the way it creates every module, so if it trys to use async method to get server data, this request also includes to the module dependence map;

app/src/vendor/require.js file uses the map file of dependencies and rewrites the request for new module by adding all its dependencies, so all nessesary data could be retrieved with one request. 
