function init() {
  $('a.character').click( addCharacter );
  $(document).on('click', '#character-panel-ul-id a.remove_character', removeCharacter)
//  $(document).ready( makeCharacterMenu);
  $('a.character').click(function() {
    var id = $(this).attr('id');
    var name = $(this).text();
    alert('id:'+id+' name:'+name);
  });
}

function addCharacter() {
  // need to prevent populating the panel with duplicate entries.  Need magic logic for this.
  console.log($(this));
  var CharacterName = $(this).prop("id");
  $('#character-panel-ul-id').prepend('<li id="'+CharacterName+'">'+CharacterName+'<a class="remove_character" id="'+CharacterName+'" href="#">[X]</a></li>');
}

function addCharacterToPanel() {
//  console.log($(this));
//  console.log(this);
  var id = $(this).attr('id');
  var name = $(this).text();
  $('#character-panel-ul-id').prepend('<li id="'+id+'">'+name+'<a class="remove_character" id="'+id+'" href="#">[X]</a></li>');
}

function removeCharacter() {
    $(this).parent().remove();
}

function clickButton() {
//function makeCharacterMenu() {
    var s = document.createElement("script");
//    s.src = "jsonp-new.php";
    s.src = "character-tree-depth.php";
    document.body.appendChild(s);
}

function myFUNC(myObj) {
  var row, txt = "";
  txt += "<table>";
  for (row in myObj) {
    txt += "<tr>";
    txt += "<td>" + myObj[row].id + "</td>";
    txt += "<td>" + myObj[row].name + "</td>";
    txt += "<td>" + myObj[row].lft + "</td>";
    txt += "<td>" + myObj[row].rht + "</td>";
    txt += "<td>" + myObj[row].depth + "</td>";
    txt += "</tr>";
  }
  txt += "</table>";
  document.getElementById("dynamic_menu").innerHTML = txt;
}

function format_unordered_list_menu(data) {
  var row, txt = "";
  txt += '<ul class=dropdown-menu>';
  for (row in data) {
    if (data[row].rht - data[row].lft == 1) {// leaf node?
      txt += '<li><a class="character" id="' + data[row].id + '" href="#" onclick="addCharacterToPanel()" name="' + data[row].name + '">'+ data[row].name + '</a></li>'; 
    // parent?
    }
  }
  txt += "</ul>";
  $('#dynamic_menu_button').after(txt);
}

//function makeCharacterMenu() {
//  $(".dropdown").prepend("<pre> THIS IS A TEST</pre>");
//}
