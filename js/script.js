function getPhoto(contact, fullsize) {
  var url = 'img/silhouette.png';
  if(contact.photos && contact.photos.length) {
    url = contact.photos[0];
    //twitter
    if(fullsize && url.match(/_normal\.(jpg||png)/) && !url.match(/.*default_profile_([0-9])_normal\.png/)) {
      url = url.replace(/_normal\.(jpg||png)/, '.$1');
    }
    else if(url.indexOf('https://graph.facebook.com/') === 0) {
      if(fullsize)
        url += "?return_ssl_resources=true&type=large";
      else
        url += "?return_ssl_resources=true&type=square";
      }
  }
  return url;
}

$(function() {
    console.log("Let's make it loud");
    var cur = 0;
    var elemCount;
    var spinDistance;

    var spinDirection = 0;

    var spinIt = function(cb) {
      $({steps:0}).animate({steps:100}, {duration:200, easing:"linear", step:function(now, fx) {
          $("li").each(function(idx) {
            var elem = $(this);
            var cur = elem.data("curRotate");
            if (spinDirection == 1) {
              cur = spinDistance * fx.pos + cur;
            } else if (spinDirection == -1) {
              cur = cur - spinDistance * fx.pos;
              if (cur < 0) cur = 300 - (-cur);
            }
            cur = cur % 300;
            var rotation = "rotateX(" + cur + "deg)";
            if (spinDirection != 0 && spinDistance > (300/elemCount)) rotation = "rotateY(20deg) " + rotation;
            elem.css("-webkit-transform", rotation);
            if (fx.pos >= 1.0) elem.data("curRotate", cur);
            cur = parseInt(cur);
            if (cur <= 90) {
                elem.css("z-index", 90 - cur);
            } else if (cur > 90 && cur <= 180) {
                elem.css("z-index", cur - 90);
            } else if (cur > 180 && cur <= 270) {
                elem.css("z-index", cur);
            } else {
                elem.css("z-index", 180 + 360 - cur);
            }
          });
      }, complete:function() {
          if (cb) cb();
          if (spinDirection != 0) setTimeout(spinIt, 0);
      }
    });
  };

    $("#scrollUp").hover(function() { 
        var wasSpinning = spinDirection != 0;
        spinDirection = 1;
        spinDistance = (300/elemCount) * 3;
        if (!wasSpinning) spinIt();
    }, function() { spinDirection = 0; });
    $("#scrollDown").hover(function() {
        var wasSpinning = spinDirection != 0;
        spinDirection = -1;
        spinDistance = (300/elemCount) * 3;
        if (!wasSpinning) spinIt();
    }, function() { spinDirection = 0; });
    $("#scrollUpOne").click(function() {
        var wasSpinning = spinDirection != 0;
        spinDirection = 1;
        spinDistance = (300/elemCount);
        if (!wasSpinning) spinIt(function() { spinDirection = 0; });
    });
    $("#scrollDownOne").click(function() {
        var wasSpinning = spinDirection != 0;
        spinDirection = -1;
        spinDistance = (300/elemCount);
        if (!wasSpinning) spinIt(function() { spinDirection = 0; });
    });
    
    // Initial positions
    console.log(baseUrl);
    $.getJSON(baseUrl + "/Me/contacts/", {all:true}, function(data) {
      for (var i = 0; i < data.length; ++i) {
        if (!data[i].name) continue;
        $("<li><div class='namecard'><img src='" + getPhoto(data[i]) + "' /><div class='name'>" + data[i].name + "</div></div></li>").appendTo("ul");
      }

      elemCount = $("li").length;

      $("li").each(function(idx) {
          $(this).css("-webkit-transform", "rotateX(" + cur + "deg)");
          $(this).data("curRotate", cur);
          cur += (300 / elemCount);
      });
      spinIt();
    });

});
