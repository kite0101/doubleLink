function scriptsDoubleLink(scripts){
    var ret=[]
    for(var i=0; i< scripts.length;i++){
        var type=scripts[i].getAttribute("type");
        if(type!= undefined && type=="double-link"){
            ret.push(scripts[i]);
        }
    }
    return ret;
}
$( document ).ready(function() {
    //==============================exemplo de leitura de xml===========================
    var xml = '<rss version="2.0"><channel><title>RSS Title</title></channel></rss>';
    try {        
        var xmlobj= (new DOMParser()).parseFromString(xml, "text/html");
        var title = xmlobj.getElementsByTagName("title")[0].innerHTML;
        alert(title);
    }
    catch(err) {
        alert("erro");
    }
    alert("acerto");
    //=======================================fim========================================
    $('a.doubleLink').bind('click', function (){
        
        //http://templth.wordpress.com/2011/06/07/manipulating-json-and-xml-with-node-js/
        //=====================requisitando a pagina html que foi clicada==================
        //================================para o servidor nodejs===========================
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8081/getHtml',
            async:false,
            data: JSON.stringify({"url":$(this).attr("href"),"version":"0.0.1", "type": "x"}),
            success: function(data) {               
                var ret=JSON.parse(data);                
                var htmlObj= (new DOMParser()).parseFromString(ret.body, "text/html");
                var scripts=scriptsDoubleLink(htmlObj.getElementsByTagName("script"));
                var paramJsonOfServerDoubleLinkPage=scripts[0].innerHTML;
                alert(paramJsonOfServerDoubleLinkPage);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
            }
        });
        var ola435="3";
        //=========================================fim=====================================
    });
});
