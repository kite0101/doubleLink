var http = require('http');
var express = require('express');
var http = require("http");
var app = express();
function arrayIntToString(arrayInt){
    var strData='';
    for (var i=0; i<arrayInt.length;i++){
        strData+=String.fromCharCode(arrayInt[i]);
    }
    return strData;
}
app.post('/getHtml',function(request, response) {
    
    var msg = {
        data: null
    };
    request.on('data', function(data) {                
        var dataRecvJSON=JSON.parse(arrayIntToString(data));    
        response.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
        var content="";
        //http://www.sitepoint.com/making-http-requests-in-node-js/
        var requestHTML = require("request");
 
        requestHTML({
            uri: dataRecvJSON.url,
            method: "GET",          
        }, function(errorHTML, responseHTML, bodyHTML) {
            response.end(JSON.stringify({"url": dataRecvJSON.url ,"body": bodyHTML+"", "version": "0.0.1", "type":"x","status": "true","code":0 }));
        });      
    });   
});
app.listen(8081);
