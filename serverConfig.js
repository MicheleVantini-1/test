// MODULE where to put all the constants
// of the application

// all the headers that will be set in the 
// http response header 
var headers = {};

// with this we allow any origin to access the resource
headers["Access-Control-Allow-Origin"] = "*"; 
// allowed methods
headers["Access-Control-Allow-Methods"] = "POST, GET"; 
headers["Access-Control-Allow-Credentials"] = false;
headers["Access-Control-Max-Age"] = '86400';
//types of headers that are allowed
headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"; 
// the format of the response 
headers["Content-Type"] = "text/html";

// EXPORTS
exports.headers = headers;

