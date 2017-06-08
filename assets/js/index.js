function isMobile() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function wipeOutNonMobile() {
  $('.not-mobile').remove();
  $('.cogent-spacing').remove();
  $('.for-mobile').show();
  $('.navbar-fixed-top').attr('id','navbar-mobile-fix');
}

$(document).ready(function() {
  var color = {r:0, g:0, b:0};
  mobileMenuButtonHover();
  chooseGradient(hourNow());
  anchorTagScroll();
  if (isMobile()) {
    wipeOutNonMobile();
  } else {
    cloudControl();
    // floatHeroBlimp();
    $("html").niceScroll();

    sectionAnimations();
    bestPlaceAnimation();
    buildingAnimation();
    foregroundClouds();
    releaseKites();
  }
})


function releaseKites() {
  var height = window.innerHeight;
  var width = window.innerWidth;
  var anim_params = {
    "kite1": {
      start: {
        x: 0,
        y: height - 200,
        angle: 10
      },
      end: {
        x: width * 1/3,
        y: -500,
        angle: -5,
        length: 0.25
      }

    },
    "kite2": {
      start: {
        x: width * 3 / 4,
        y: height - 200,
        angle: 20
      },
      end: {
        x: width * 2 / 3,
        y: -700,
        angle: -10,
        length: 0.25
      }
    }
  }
  var released = false;
  $(window).scroll(function(){

    if(($(window).scrollTop() + $(window).height() > $(document).height() - 200) && !released) {
      $('.kites').each(function(){
        var id = $(this).attr('id');
        $(this).animate({path : new $.path.bezier(anim_params[id])}, 9000, function(){
          $(this).remove();
        });
      });
      released = true;
    }

  });
}


function foregroundClouds(){

    var tween1 = TweenMax.to('#foreground-cloud1',1,{top:'-100%'});
    var scene1 = new ScrollMagic.Scene({
        triggerElement: '#cloud-trigger1',
        offset: 0,
        duration: '600%'
    }).setTween(tween1);
    controller.addScene(scene1);

    var tween2 = TweenMax.to('#foreground-cloud2',1,{top:'-100%'});
    var scene2 = new ScrollMagic.Scene({
        triggerElement: '#cloud-trigger2',
        offset: 500,
        duration: '600%'
    }).setTween(tween2);
    controller.addScene(scene2);

    var tween3 = TweenMax.to('#foreground-cloud3',1,{top:'-100%'});
    var scene3 = new ScrollMagic.Scene({
        triggerElement: '#cloud-trigger3',
        offset: 500,
        duration: '600%'
    }).setTween(tween3);
    controller.addScene(scene3);

}

function anchorTagScroll() {
  var ORDER = [ '#about', '#services'];
  var currentIDX = Math.floor(window.scrollY / window.innerHeight);
  var currentSection = ORDER[currentIDX];

  $('a[href*="#"]').click(function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    var targetIDX = ORDER.indexOf(target);
    var difference = Math.abs(targetIDX - currentIDX);
    if (difference > 1) {
      $('html, body').animate({ scrollTop: $(target).offset().top }, 0);
    } else {
      $('html, body').animate({ scrollTop: $(target).offset().top }, 1000);
    }
    currentIDX = targetIDX;
  })
}

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
         + rgbString(gradient[2]) + ')' ;
}

function setBackground(gradient) {
  $(document.body).css('background', gradientString(gradient));
}

function floatHeroBlimp() {
  var radians = 0;
  var multiplier = .333; //the NUMBER OF THE BEAST
  (function moveRandom() {
    var moveAmount = "-=" + Math.cos(radians) * multiplier + "%";
    $('#hero-blimp').animate({top: moveAmount}, 100, function() {
      moveRandom();
      radians += .1;
    })
  })();
}


// function randomTchotchkes(){
//   var tchotchkeArr = [
//     {
//       id: "balloon1",
//       in: {
//         anim:{top:"100%", position:"absolute"},
//         time:400
//       },
//       out: {
//         anim: {top:"-100%"},
//         time: 400
//       }
//
//     }
//     // {
//     //   id: "balloon2",
//     //   in: {
//     //     anim: __,
//     //     time: __
//     //   },
//     //   out: {
//     //     anim: __,
//     //     time: __
//     //   }
//     // },
//     // {
//     //   id: "birds",
//     //   in: {
//     //     anim: __,
//     //     time: __
//     //   },
//     //   out: {
//     //     anim: __,
//     //     time: __
//     //   }
//     // },
//     // {
//     //   id: "kite1",
//     //   in: {
//     //     anim: __,
//     //     time: __
//     //   },
//     //   out: {
//     //     anim: __,
//     //     time: __
//     //   }
//     // },
//     // {
//     //   id: "kite2",
//     //   in: {
//     //     anim: __,
//     //     time: __
//     //   },
//     //   out: {
//     //     anim: __,
//     //     time: __
//     //   }
//     // }
//   ];
//
//   controller = new ScrollMagic.Controller();
//   tchotchkeArr.forEach(function(tchotchke){
//     console.log(tchotchke);
//     var tweenIn = TweenMax.from('#'+tchotchke.id, .5, tchotchke.in.anim);
//     var tweenOut = TweenMax.to('#'+tchotchke.id, .5, tchotchke.out.anim);
//     var sceneIn = new ScrollMagic.Scene({
//       triggerElement: "#trigger-" + tchotchke.id,
//       duration: tchotchke.in.time
//     }).setTween(tweenIn);
//     // var sceneOut = new ScrollMagic.Scene({
//     //   triggerElement: "#trigger-" + tchotchke.id,
//     //   duration: tchotchke.out.time
//     // }).setTween(tweenOut);
//
//     controller.addScene([sceneIn]);
//
//   });
//
// }

function sectionAnimations() {
    var aboutServicesDuration = window.innerHeight * (5/6);
    var aboutServicesOffset = aboutServicesDuration * (7/4);
    console.log(aboutServicesOffset);

    SECTIONS = ["about", "services", "contact"]
    ANIMPARAMS = {
    "#about-image": {
      in: {
        left: "150%"
      },
      out: {
        left: "-54%"
      },
      duration: aboutServicesDuration * .65,
      offset: aboutServicesOffset * .597,
      ease: SlowMo.ease.config(0.3, 0.7, false)
    },
    "#services-image": {
         in: {left: "-50%"},
         out: {left: "150%"},
         duration: aboutServicesDuration * .65,
         offset: aboutServicesDuration * .597,
         ease:Power3.easeInOut
       },
    "#contact-image": {
      in: {top: "100%"},
      offset: aboutServicesDuration * (5/4),
      duration: aboutServicesDuration * (4/5),
      ease: Sine.easeOut
    }
  }

  controller = new ScrollMagic.Controller();

  SECTIONS.forEach(function(section) {
    var imageID = "#" + section + "-image";
    var tweenIn = TweenMax.from(imageID, .5, ANIMPARAMS[imageID].in);
    var tweenOut = TweenMax.to(imageID, .5, ANIMPARAMS[imageID].out);

    var sceneIn = new ScrollMagic.Scene({
      triggerElement: "#trigger-" + section + "-in",
      duration: ANIMPARAMS[imageID].duration
    }).setTween(tweenIn);

    var sceneOut = new ScrollMagic.Scene({
      triggerElement: "#trigger-" + section + "-out",
      offset: ANIMPARAMS[imageID].offset,
      duration: ANIMPARAMS[imageID].duration
    }).setTween(tweenOut)

    controller.addScene([sceneIn, sceneOut]);
  })
}

function bestPlaceAnimation() {
  var tweenIn = TweenMax.staggerFrom('.bestplace', .1, {opacity: 0, marginTop: '5%'}, .2)
  var sceneIn = new ScrollMagic.Scene({
    triggerElement: "#trigger-jobs-out",
    offset: 0,
    duration: 300
  }).setTween(tweenIn);

  var jobsImage = document.querySelector('#jobs-image')

  var tweenOut = TweenMax.to(jobsImage, 1, {position: 'absolute'});
  var sceneOut = new ScrollMagic.Scene({
    triggerElement: "#trigger-jobs-out",
    offset: 0,
    duration: 10
  }).setTween(tweenOut);

  // var upAnimation = newTimelineMax()
  //   .to(".move-up", .1, {y: "75"})

  // var sceneUp = new ScrollMagic.Scene({
  //   triggerElement: ".move-up",
  //   duration: "500", // measures how many pixels , animations is going to take
  // }).setPin(".move-up")
  //   // .setTween(upAnimation)
  //   .addIndicators()
  //     .addTo(controller)


      // THIS WAS THE ORIGINAL CODE



  controller.addScene([sceneIn, sceneOut]);
}




function buildingAnimation() {
  var tweenContainer = TweenMax.from('.footer', .1, {opacity: 1, bottom: '-700px'})
  var sceneContainer = new ScrollMagic.Scene({
    triggerElement: "#trigger-footer-in",
    offset: 0,
    duration: 300,
    ease: Power4.easeIn
  }).setTween(tweenContainer);
  controller.addScene([sceneContainer]);

  var buildings = ["#front", "#mid", "#back"];
  buildings.forEach(function(building, idx) {
    var tweenBuilding = TweenMax.from(building, .1, {bottom: 80 * idx + "px"});
    var sceneBuilding = new ScrollMagic.Scene({
      triggerElement: "#trigger-footer-in",
      offset: 250,
      duration: 300,
      ease: Bounce.easeInOut
    }).setTween(tweenBuilding);
    controller.addScene([sceneBuilding]);
  })

  var tweenIcons = TweenMax.from('.icon-container', .1, {opacity: 0})
  var sceneIcons = new ScrollMagic.Scene({
    triggerElement: "#trigger-footer-in",
    offset: 300,
    duration: 100,
    ease: Power1.easeIn
  }).setTween(tweenIcons);
  controller.addScene([sceneIcons]);


}
