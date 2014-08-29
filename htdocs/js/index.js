window.addEventListener("load", function() {

    //activate slides
    $("#slides").slidesjs({
        width: 960,
        height: 305
    });

    //handle click on slides
    $('#slides img').click( function() {
        var url =$(this).data('href');
        if(url) {
            window.open(url, "_blank");
        }
    });

    //handle collapsing sections
    setupCollapsibles();


    function setupCollapsibles() {
        $(".desc").hide();
        $(".open-close").click(function(){
          if ($(this).is(".current"))
          {
           $(this).removeClass("current");
           $(this).next(".desc").slideUp(400);
          }
          else
          {
           $(".desc").slideUp(400);
           $(".open-close").removeClass("current");

           $(this).addClass("current");
           $(this).next(".desc").slideDown(400);
          }
         });

    }
});

