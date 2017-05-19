

$(document).ready(function() {
  var color = {r:0, g:0, b:0};
  var s = skrollr.init({
    render: function(data) {
      // console.log(data);
    }
  });
  anchorTagScroll();
  mobileMenuButtonHover();
  contactButtons();
  // chooseGradient(hourNow());
  // cloudControl();

  // wiggleBlimp();

  // animateServiceItems();
  animateShit()

})

function anchorTagScroll() {
  $('a[href*="#"]').click(function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    if (target != 'contact') {
      $('.navbar-toggle').trigger('click'); //or MAYBE NOT
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 1000);
    }
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

function contactButtons() {
  $('.join-button, #contact').click(function() {
    var address = 'jobs@cogentworld.com';
    var subject = 'Hello Cogent World';
    var url = "mailto:" + address + "?subject=" + subject;
    var newTab = window.open(url, '_blank');
    newTab.focus();
  })
}


function wiggleBlimp() {
  var rotation = 0;
  var ambit = 20;
  var ANIM_TIME = 500;

  function turnRight(blimp){
    rotation += Math.random() * ambit;
    blimp.css("transform", "rotateY("+rotation+"deg)");
    setTimeout(function() { turnLeft(blimp) }, ANIM_TIME)
  }
  function turnLeft(blimp){
    rotation -= Math.random() * ambit;
    blimp.css("transform", "rotateY("+rotation+"deg)")
    setTimeout(function() { turnRight(blimp) }, ANIM_TIME)
  }
  turnRight($('.hero-blimp'))
}


function cloudControl() {
  var LOOP_TIME = 10000;

  function move($cloud, amount, time) {
    $cloud.animate({left: amount}, time, "linear", function() {
      $cloud.remove();
    })
  }

  $('.clouds').each(function() {
    move($(this), "+=100%", LOOP_TIME);

    var path = $(this).attr('src');
    var classes = $(this).attr("class");
    var container = $(this).parent();

    (function createNewCloud() {
      var newCloud = $('<img>').attr('src', path).addClass(classes).css('left', '-100%');
      container.prepend(newCloud);
      move(newCloud, "+=200%", LOOP_TIME * 2);
      setTimeout(createNewCloud, LOOP_TIME);
    })();
  })
}

// SERVICE ITEMS ANIMATION

// function animateServiceItems() {
//   var radius = 300;
//   var numItems = $('.services-item').size();
//
//   function getCoordinates(idx, radius) {
//     var vector = {left: 0, top: 0};
//     var increment = 360 / numItems;
//     var angle = radians(increment * idx);
//     vector.left = Math.cos(angle) * radius;
//     vector.top = Math.sin(angle) * radius;
//     return vector;
//   }
//
//   $('.services-item').each(function(idx) {
//     var vector = getCoordinates(idx, radius);
//     console.log(vector);
//     $(this).animate(vector, 2000)
//   })
// }
//
// function radians(degrees) {
//   return degrees * Math.PI / 180;
// };


// SET BACKGROUND ACCORDING TO TIME OF DAY

function hourNow() {
  return (new Date).getHours();
}
function makeURL(path, fileName) {
  return 'url('  + path + fileName + ')';
}
// function setBackground(hour) {
//   var imagePath = 'assets/new_img/backgrounds/';
//   if (hour < 6) {
//     $(document.body).css('background-image', makeURL(imagePath, 'test-night.jpg'));
//   } else if (hour < 12){
//     $(document.body).css('background-image', makeURL(imagePath, 'test-morning.jpg'));
//   } else if (hour < 18){
//     $(document.body).css('background-image', makeURL(imagePath, 'test-afternoon.jpg'));
//   } else {
//     $(document.body).css('background-image', makeURL(imagePath, 'test-evening.jpg'));
//   }
// }

function chooseGradient(hour) {
  var gradient;
  var GRADIENTS = {
    morning: [
      { r: 128, g: 56, b: 96 },
      { r: 240, g: 150, b: 124 },
      { r: 133, g: 166, b: 180 }
    ],
    afternoon: [
      { r: 0, g: 81, b: 136 },
      { r: 95, g: 197, b: 244 },
      { r: 205, g: 178, b: 143 }
    ],
    evening: [
      { r: 87, g: 56, b: 53 },
      { r: 197, g: 90, b: 52 },
      { r: 242, g: 165, b: 57 }
    ],
    night: [
      { r: 39, g: 26, b: 54 },
      { r: 9, g: 39, b: 58 },
      { r: 102, g: 118, b: 142 }
    ]
  }

  if (hour < 6) {
    gradient = GRADIENTS.night;
  } else if (hour < 12){
    gradient = GRADIENTS.morning;
  } else if (hour < 18){
    gradient = GRADIENTS.afternoon;
  } else {
    gradient = GRADIENTS.evening;
  }
  setBackground(gradient);
  setHeader(gradient);
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

function setHeader(gradient) {
  console.log(gradient);
}









function animateShit() {
  // TweenLite.to('.hero-blimp', 2, {width: 500, height: 2000})
    // TweenLite.from('.hero-blimp', 3, {paddingLeft: '500px'});
    // thisTween = TweenLite.fromTo(photo, 1.5, {width:0, height:0}, {width:100, height:200});
    // TweenLite.to('.hero-blimp', 1, {
    //   paused: true,
    //   delay: 2,
    //   onComplete: function() {
    //     console.log('do shit');
    //   }
    // })
    var timeline = new TimelineLite();
    var body = document.querySelector('body');
    timeline.to(body, 2, {backgroundColor: "rgb(0, 100, 140)"});
    // timeline.to('.cogent-definition-box', 2, {bezier:[{left:100, top:250}, {left:300, top:0}, {left:500, top:400}], ease:Power1.easeInOut});
    timeline.play();

    TweenMax.to('.cogent-definition-box', 2, {
      bezier: {
        type: "soft",
        values:[{x:10, y:30}, {x:-30, y:20}, {x:-40, y:10}, {x:30, y:20}, {x:10, y:30}],
        autoRotate: true
      },
      ease: Linear.easeNone,
      repeat: -1
    }, "start+=3");
    // var blimp = new TweenLite.from('.cogent-definition-box', 2, {left: "0%"});
    // blimp.pause();
    // setTimeout(function(){
    //   blimp.resume();
    // }, 1000)
  // thing = $('.hero-blimp');
  // var tween = TweenLite.to(thing, 2, {
  //  x: 1000,
  //  ease: Power1.easeInOut,
  //  delay: 1,
  //  onComplete: function() {
  //    console.log('hello');
  //  },
  // });
}
