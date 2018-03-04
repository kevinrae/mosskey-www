$(document).ready(function(){
//  $(".navigation").load("navigation.html"); 
  $(".footer").load("footer.html");

// doesn't work :( /////////////////////////////
  $(".nav a").on("click", function(){
     $(".nav").find(".active").removeClass("active");
     $(this).parent().addClass("active");
  });
////////////////////////////////////////////////

});
