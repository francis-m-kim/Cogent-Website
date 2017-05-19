$(document).ready(function() {
  var color = {r:0, g:0, b:0};
  var s = skrollr.init({
    forceHeight: true,
    render: function(data) {}
  });

  anchorTagScroll();
  mobileMenuButtonHover();
  contactButtons();
  chooseGradient(hourNow());
  // cloudControl();

  sectionAnimations();


})


function sectionAnimations() {
  SECTIONS = ["about", "services", "jobs"]
  ANIMPARAMS = {
    "#about-image": {
      in: {
        bezier: {
          type: "soft",
          curviness: .75,
          values:
          [
            {left: "50%", top:"50%"},
            {left:"100%", top:"30%"},
            {left:"200%", top:"20%"}
          ],
          autoRotate: true
        }
      },
      out: {
        bezier: {
          type: "soft",
          curviness: .75,
          values:
          [
            {left: "50%", top:"50%"},
            {left:"25%", top:"70%"},
            {left:"-50%", top:"80%"}
          ],
          autoRotate: false
        }
      },
      duration: 200
    },
    "#services-image": {
      in: {left: "-50%"},
      out: {left: "150%"},
      duration: 200
    },
    "#jobs-image": {
      in: {left: "-50%"},
      out: {left: "150%"},
      duration: 300
    }
  }

  var controller = new ScrollMagic.Controller();

  SECTIONS.forEach(function(section) {
    var imageID = "#" + section + "-image";
    var tweenIn = TweenMax.from(imageID, 1, ANIMPARAMS[imageID].in)
    var tweenOut = TweenMax.to(imageID, 1, ANIMPARAMS[imageID].out)

    var sceneIn = new ScrollMagic.Scene({
      triggerElement: "#trigger-" + section + "-in",
      duration: ANIMPARAMS[imageID].duration
    }).setTween(tweenIn);

    var sceneOut = new ScrollMagic.Scene({
      triggerElement: "#trigger-" + section + "-out",
      offset: 400,
      duration: ANIMPARAMS[imageID].duration
    }).setTween(tweenOut)

    controller.addScene([sceneIn, sceneOut]);
  })
}

function anchorTagScroll() {
  var ORDER = ['#home', '#about', '#services', '#jobs', '#contact'];
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

function contactButtons() {
  $('.join-button, #contact').click(function() {
    var address = 'jobs@cogentworld.com';
    var subject = 'Hello Cogent World';
    var url = "mailto:" + address + "?subject=" + subject;
    var newTab = window.open(url, '_blank');
    newTab.focus();
  })
}


function map (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function randomize(num, ambit) {
  return (num + ambit/2) - Math.random() * ambit;
}

function cloudControl() {
  var LOOP_TIME = 10000;

  function move($cloud, amount, time) {
    $cloud.animate({left: amount}, time, "linear", function() {
      $cloud.remove();
    })
  }

  $('.clouds').each(function() {
    move($(this), "+=100%", randomize(LOOP_TIME, 5000));

    var path = $(this).attr('src');
    var classes = $(this).attr("class");
    var container = $(this).parent();

    (function createNewCloud() {
      var newCloud = $('<img>').attr('src', path)
                               .addClass(classes)
                               .css('left', randomize(-50, 25) + "%")
                               .css('top', randomize(0, 50) + "%");
      container.prepend(newCloud);
      move(newCloud, "+=200%", LOOP_TIME * 2);
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
