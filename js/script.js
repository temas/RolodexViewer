$(function() {
    console.log("Let's make it loud");
    var cur = 0;
    // Initial positions
    $("li").each(function(idx) {
        $(this).css("-webkit-transform", "rotateX(" + cur + "deg)");
        $(this).data("startRotate", cur);
        console.log("-webkit-transform:rotateX(" + cur + "deg) translateY(50px)");
        cur += (360 / 10);
    });
    // Now spin that shit
    $("li").animate({top:100}, {duration:2000, step:function(now, fx) {
        console.log((360 * fx.pos + $(fx.elem).data("startRotate")) % 360);
        //translate3d(0px, 50px, 50px) 
        $(fx.elem).css("-webkit-transform", "rotateY(45deg) rotateX(" + (360 * fx.pos + $(fx.elem).data("startRotate")) % 360 + "deg)");// rotateZ(45deg)");
    }});
});
