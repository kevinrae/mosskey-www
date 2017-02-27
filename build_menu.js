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

function parsetree(data) {
  var row, txt = "";
  var depth;
//  var parentrht, grandparentrht;
  var stack = [];
  txt += '<ul class="dropdown-menu">';

  /// nested function//////////////////////////////////////////
  function close_tags_for_last_child_in_tree(stack, rht) {
    var parentrht = stack.pop();
    if (parentrht - rht == 1) {           // last child in tree 
      txt += '</ul></li>';                // close tags
      close_tags_for_last_child_in_tree(stack, parentrht);
    } else { 
      stack.push(parentrht);
    }
  }
  //////////////////////////////////////////////////////////

  for (row in data) {
    console.log(data[row]);
    if (data[row].rht - data[row].lft > 1) { // parent test
      txt += '<li class="dropdown-submenu">';
      txt += '<a class="character" data-id="' + data[row].id; 
      txt += ' name="' + data[row].name + '">';
      //////////////////////////////////////////////////////////
      // indent logic for tree display - short-term work around 
      // until we can get dynamic dropdown submenus working
      for (i = 1; i < data[row].depth; i++){
        txt += " . ";
      } ///////////////////////////////////////////////////////
      txt += data[row].name;
//      txt += ' data-id: '+ data[row].id;
      txt += ' lft: '+ data[row].lft;
      txt += ' rht: '+ data[row].rht;
//      txt += ' depth: '+ data[row].depth;
      txt += '</a>'; 
      txt += '<ul class="dropdown-menu">';
      // store rht value in stack for parents
      stack.push(data[row].rht);
      } else {
      // leaf test
      txt += '<li><a class="character" data-id="' + data[row].id; 
      txt += '" href="#"';
      txt += ' name="' + data[row].name + '">';
      //////////////////////////////////////////////////////////
      // indent logic for tree display - short-term work around 
      // until we can get dynamic dropdown submenus working
      for (i = 1; i < data[row].depth; i++){
        txt += " . ";
      } ///////////////////////////////////////////////////////
      txt += data[row].name;
//      txt += ' data-id: '+ data[row].id;
      txt += ' lft: '+ data[row].lft;
      txt += ' rht: '+ data[row].rht;
//      txt += ' depth: '+ data[row].depth;
      txt += '</a></li>'; 

      close_tags_for_last_child_in_tree(stack, data[row].rht);
/*
      parentrht = stack.pop();
      if (parentrht - data[row].rht == 1) { // last child in tree 
        txt += '</ul></li>';                // close tags
      //////////////////////////////////////////////////////////
      // check to see if we need to close a grandparent too
      // note - only works for 3-level trees...
        grandparentrht = stack.pop();
        if (grandparentrht - parentrht == 1){
          txt += '</ul></li>';                // close tags
        } else {
          stack.push(grandparentrht); // replace parent.rht in stack 
        } //////////////////////////////////////////////////////
      } else {
        stack.push(parentrht); // replace parent.rht in stack 
      }
*/
    }
  }  
  txt += '</ul>';
  $('#dynamic_menu_button').after(txt);
}

//http://stackoverflow.com/questions/6692538/generate-unordered-list-from-json-data
//http://stackoverflow.com/questions/11128700/create-a-ul-and-fill-it-based-on-a-passed-array

//cannot add onclick attribute to href here and expect this variable to get properly scoped
function format_unordered_list_menu(data) {
  var row, txt = "";
  var depth;
  txt += '<ul class=dropdown-menu>';
  for (row in data) {
    // leaf test
    // parent test
    // store rht value in stack for parents
    // if (parent.rht - data[row].rht == 1) // close the </ul>


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
