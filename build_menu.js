function init() {
  $('a.character').click( addCharacterToSelectedPanel );
  $(document).on('click', '#selected_characters a.remove_character', removeCharacter)
}

function addCharacterToSelectedPanel() {
  console.log(this);
  var id = $(this).data('id');
  var name = $(this).text();
  if ($('#selected_characters li').find("[data-selected-id='"+id+"']" ).length) {  
    alert('you already selected :' + name);
  } else {
   $('#selected_characters').prepend('<li data-selected-id="'+id+'">'+name+'<a class="remove_character" data-selected-id="'+id+'" href="#"> [X]</a></li>');
  }
}

function removeCharacter() {
    $(this).parent().remove();
}

//$("ul#theList").append("<li><a href='url-here'>Link Text</a></li>");
function makeUL (data) {
  var ul = $('<ul>');
  return ul;
}

//http://stackoverflow.com/questions/6692538/generate-unordered-list-from-json-data
//http://stackoverflow.com/questions/11128700/create-a-ul-and-fill-it-based-on-a-passed-array

//cannot add onclick attribute to href here and expect this variable to get properly scoped
function format_unordered_list_menu(data) {
  var row, txt = "";
  var depth;
  txt += '<ul class=dropdown-menu>';
  for (row in data) {
//    if (data[row].rht - data[row].lft == 1) {// leaf node?
      txt += '<li><a class="character" data-id="' + data[row].id; 
      txt += '" href="#"';
      txt += ' name="' + data[row].name + '">';
      //////////////////////////////////////////////////////////
      // indent logic for tree display - short-term work around until we can get dynamic dropdown submenus working
      for (i = 1; i < data[row].depth; i++){
        txt += " . ";
      }
      //////////////////////////////////////////////////////////
      txt += data[row].name;
      txt += ' data-id: '+ data[row].id;
      txt += ' lft: '+ data[row].lft;
      txt += ' rht: '+ data[row].rht;
      txt += ' depth: '+ data[row].depth;
      txt += '</a></li>'; 
//    } else { // parent?
//      txt += '<li class="dropdown-submenu"><a class="character" id="' + data[row].id + '" href="#" onclick="addCharacterToPanel()" name="' + data[row].name + '">'+ data[row].name + '</a>';
//      txt += '<ul class="dropdown-menu">'; 
//    }
  }
  txt += "</ul>";
  $('#dynamic_menu_button').after(txt);
}
