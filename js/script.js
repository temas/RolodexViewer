$(function() {
    console.log("Let's make it loud");
    var cur = 0;
    // Initial positions
    $("li").each(function(idx) {
        $(this).css("-webkit-transform", "rotateY(10deg) rotateX(" + cur + "deg)");
        $(this).data("curRotate", cur);
        cur += (360 / 10);
    });
    // Now spin that shit
    $(document).mousedown(function() {
      $("li").animate({top:100}, {duration:200, step:function(now, fx) {
          var cur = ((360/10) * fx.pos + $(fx.elem).data("curRotate")) % 360;
          $(fx.elem).css("-webkit-transform", "rotateY(10deg) rotateX(" + cur + "deg)");
          if (fx.pos >= 1.0) $(fx.elem).data("curRotate", cur);
          cur = parseInt(cur);
          if (cur <= 90) {
              $(fx.elem).css("z-index", 90 - cur);
          } else if (cur > 90 && cur <= 180) {
              $(fx.elem).css("z-index", cur - 90);
          } else if (cur > 180 && cur <= 270) {
              $(fx.elem).css("z-index", cur);
          } else {
              $(fx.elem).css("z-index", 180 + 360 - cur);
          }

      }});
    });
});
