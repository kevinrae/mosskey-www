/* https://css-tricks.com/snippets/javascript/get-url-variables/

Usage
Example URL:
http://www.example.com/index.php?id=1&image=awesome.jpg

Calling getQueryVariable("id") - would return "1".
Calling getQueryVariable("image") - would return "awesome.jpg".

*/
function getQueryVariable(variable)
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

function init () {
  var id = "";
  id = getQueryVariable("id");
  console.log(id);
  detail(id);
  show_all_characters(id);
}

function show_all_characters(x) {
    var url = "show_all_characters_for_taxa_id.php";
    var name = "";
    console.log("show all characters id: " +x);
    $.ajax({
    type: "POST",
    url: url,
    data: { id : x },
    success: function (res){
      console.log(res);
      var o = "";
      if (res === 'NULL') { 
        $('#result_list').html("<li>No matches</li>");
      } else {
      var obj = JSON.parse(res);
        for (var i in obj) {
           name       = obj[i].Name;
           iseye      = obj[i].isEye;
           ishandlens = obj[i].isHandLens;
           isscope    = obj[i].isScope;
           o += "<li>" + name;
           if (iseye === '1') {
             o += " <span class=\"glyphicon glyphicon-eye-open\" aria-hidden=\"true\" title=\"View by Eye\"></span>";
           }
           if (ishandlens === '1') {
             o += " <span class=\"glyphicon glyphicon-zoom-in\" aria-hidden=\"true\" title=\"View with Hand Lens\"></span>";
           }
           if (isscope === '1') {
             o += " <span class=\"glyphicon glyphicon-pawn\" aria-hidden=\"true\" title=\"View with Scope\"></span>";
          }
           o += "</li>";
        }
        console.log(o);
        $('.characters ul').append(o);
      }
    },
    error: function( jqXhr, textStatus, errorThrown ){
      console.log(errorThrown);
    }
  });
}

function detail(idd) {
    var url = "taxa_detail.php";
    var name, authority, description, taxa_url, taxa_timestamp, url_timestamp, url_type = "";
    console.log("inside detail id: " +idd);

    $.ajax({
    type: "POST",
    url: url,
    data: { id : idd },
    success: function (res){
      console.log(res);
      var o = "";
      if (res === 'NULL') { 
        $('#result_list').html("<li>No matches</li>");
      } else {
      var obj = JSON.parse(res);
        for (var i in obj) {
           name = obj[i].Name;
//           obj[i].auth !== null ? authority = obj[i].auth : authority = "none";
//           description = obj[i].descr;
           obj[i].taxa_timestamp !== null ? taxa_timestamp = obj[i].taxa_timestamp : taxa_timestamp = "none";  
           obj[i].URL_timestamp !== null ? url_timestamp = obj[i].URL_timestamp : url_timestamp = "none";
//           url_type = obj[i].type;                   
           url_name = obj[i].url;
           if (url_name !== null) { 
             $('.url').html('<p><a href="'+ url_name+'">' + url_name + '</a></p>');
           }
           o += " name: " + name;
//           o += " authority: " + authority;
//           o += " description: " + description;
           o += " taxa_timestamp: " + taxa_timestamp;
           o += " url_timestamp: " + url_timestamp;
//           o += " url_type: " + url_type;
           o += " url_name: " + url_name;
        }
        console.log(o);

        $('.page-header h1').html(name);
//        $('.description').html(description);
        $('.timestamps').append("<p> Taxa timestamp: " + taxa_timestamp+ "</p>");
//        $('.authority').html("<p>Authority: " +authority+ "</p>");
        $('.timestamps').append(" URL timestamp: " + url_timestamp);
      }
    },
    error: function( jqXhr, textStatus, errorThrown ){
      console.log(errorThrown);
    }
  });
}

