function init() {
  $('a.character').click( addCharacter );
  $(document).on('click', '#character-panel-ul-id a.remove_character', removeCharacter)
  $(document).ready( makeCharacterMenu);
}

function addCharacter() {
  // need to prevent populating the panel with duplicate entries.  Need magic logic for this.
  var CharacterName = $(this).prop('id');
  $('#character-panel-ul-id').prepend('<li id='+CharacterName+'>'+CharacterName+'<a class="remove_character" id='+CharacterName+' href="#">[X]</a></li>');
}

function removeCharacter() {
    $(this).parent().remove();
}

function clickButton() {
    var s = document.createElement("script");
    s.src = "jsonp-new.php";
    document.body.appendChild(s);
}

function myFUNC(myObj) {
  var x, txt = "";
  txt += "<table>";
  for (x in myObj) {
    txt += "<tr><td>" + myObj[x].id + "</td><td>"+ myObj[x].name + "</td><td>" + myObj[x].lft + "</td><td>" + myObj[x].rht + "</td></tr>";
  }
  txt += "</table>";
  document.getElementById("dynamic_menu").innerHTML = txt;
}


function makeCharacterMenu() {
  $(".dropdown").prepend("<pre> THIS IS A TEST</pre>");
}
