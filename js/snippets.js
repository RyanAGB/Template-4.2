
//put a break on a nav item
$(document).ready(function(){
    (function() {
        var target = $('.navbar-nav li:eq(2) a').html(),
            setValue = target.indexOf(' '),
            length = target.length,
            startStr = target.substring(0, setValue),
            endStr = target.substring(setValue,  length),
            newStr = startStr.concat('<br>', endStr);

        $('.navbar-nav li:eq(2) a').html(newStr);

        var target2 = $('.navbar-nav li:eq(3) a').html(),
            setValue2 = target2.indexOf('/')+1,
            length2 = target2.length,
            startStr2 = target2.substring(0, setValue2),
            endStr2 = target2.substring(setValue2,  length2),
            newStr2 = startStr2.concat('<br>', endStr2);

        $('.navbar-nav li:eq(3) a').html(newStr2);
    })();
});


//hashtag for tabs

$(document).ready(function(){
    //Location Hash
    if(window.location.hash) {
      if ($('body#lpg-services').is('*') || $('body#additional-automotive-services').is('*')) {
        var hash = window.location.hash;
        tabShow(hash);
      };
    }

    if ($('body#lpg-services').is('*')) {
        var hash = window.location.hash;
        $('.navbar .navbar-nav > li:eq(2) .dropdown-menu a').click(function(e) {
            $('#tab-items a[href="'+hash+'"]').tab('show');
        });
    }

}); 

function tabShow(hash) {
    $('#tab-items a[href="'+hash+'"]').tab('show');
    var height = $('.tab-content').offset().top,
        scrollPh = height - 50,
        win = $(window).width();
    if (win > 991) {
        $("html, body").animate({ scrollTop: height}, 200);
    } else if (win < 992) {
        $("html, body").animate({ scrollTop: scrollPh}, 200);
    }
}