// Cache selectors
var lastId,
    topMenu = $("#site-nav"),
    topMenuHeight = topMenu.outerHeight(),
    // All list items
    menuItems = topMenu.find("ul a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      o = href === "#" ? 0 : $(href).offset().top-topMenuHeight+180;
  $('html, body').stop().animate({
      scrollTop: o
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";

   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }
});

$(document).on('click', '.js-menu', function(e){
  if ( $(window).width() < 961 ) {
    e.preventDefault();
    $('div[data-shift]').toggleClass('shift');
    $('div[data-shift-nav]').toggleClass('shift-nav');
    // $('.js-no-shift').toggleClass('shift');
  }
});

// $(document).on('click', '.js-about', function(e){
//   e.preventDefault();
//   $("html, body").animate({ scrollTop: 0 }, "fast");
// });
