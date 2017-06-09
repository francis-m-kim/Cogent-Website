function isMobile() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function wipeOutNonMobile() {
  $('.not-mobile').remove();
  $('.for-mobile').show();
}

$(document).ready(function() {
    if(isMobile()) {
      wipeOutNonMobile();
    } else {
      cloudControl();
    }
    var color = {r:0, g:0, b:0};
    chooseGradient(hourNow());
    mobileMenuButtonHover();
})

function mobileMenuButtonHover() {
  $('.mobile_menu_btn')
    .mouseenter(function() {
      $('.mobile_menu_btn span').addClass('hovered');
    })
    .mouseleave(function() {
      $('.mobile_menu_btn span').removeClass('hovered');
    })
}


function map(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function randomize(num, ambit) {
    return (num + ambit/2) - Math.random() * ambit;
}

function cloudControl() {
    var LOOP_TIME = 100000;

    function move($cloud, amount, time) {
        $cloud.animate({left: amount}, time, "linear", function() {
            $cloud.remove();
        })
    }

    $('.clouds').each(function() {
        move($(this), "-=100%", randomize(LOOP_TIME, 5000));

        var path = $(this).attr('src');
        var classes = $(this).attr("class");
        var container = $(this).parent();

        (function createNewCloud() {
            var newCloud = $('<img>').attr('src', path)
                .addClass(classes)
                .css('left', randomize(150, 25) + "%")
                .css('top', randomize(0, 50) + "%");
            container.prepend(newCloud);
            move(newCloud, "-=200%", LOOP_TIME * 2);
            setTimeout(createNewCloud, randomize(LOOP_TIME, 1000));
        })();
    })
}

// SET BACKGROUND ACCORDING TO TIME OF DAY

function hourNow() {
    return (new Date).getHours();
}

function chooseGradient(hour) {
  var gradient;
  var GRADIENTS = {
    morning: [
      { r: 49, g: 53, b: 95 },
      { r: 160, g: 84, b: 107 },
      { r: 237, g: 116, b: 55 }
    ],
    afternoon: [
      { r: 1, g: 81, b: 137 },
      { r: 55, g: 142, b: 194 },
      { r: 95, g: 197, b: 243 }
    ],
    evening: [
      { r: 36, g: 19, b: 53 },
      { r: 155, g: 45, b: 75 },
      { r: 230, g: 130, b: 75 }
    ],
    night: [
      { r: 39, g: 19, b: 54 },
      { r: 10, g: 10, b: 50 },
      { r: 30, g: 30, b: 50 }
    ]
  }

  if (hour < 6) {
    gradient = GRADIENTS.night;
  } else if (hour < 9){
    gradient = GRADIENTS.morning;
  } else if (hour < 18){
    gradient = GRADIENTS.afternoon;
  } else if (hour < 21){
    gradient = GRADIENTS.evening;
  } else {
    gradient = gradient = GRADIENTS.night;
  }
  setBackground(gradient);
}

function rgbString(color) {
    return "rgb(" + color.r + ","+ color.g + "," + color.b + ")";
}

function gradientString(gradient) {
    return 'linear-gradient('
        + rgbString(gradient[0]) + ','
        + rgbString(gradient[1]) + ','
        + rgbString(gradient[2]) + ')'
        + 'fixed' ;
}

function setBackground(gradient) {
    $(document.body).css('background', gradientString(gradient));
}
