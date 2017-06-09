$(document).ready(function() {
  submitHandler();
  iconPlaceholders();
  categoryHandler();


  ////////////////////////////////////////////////////////
  function categoryHandler() {
    $('#choose-influencer, #choose-agency').click(function() {
      var id = $(this).attr('id');
      if (id === 'choose-influencer') {
        changeInputColor('red');
      } else if (id === "choose-agency") {
        changeInputColor('blue');
      }
    })
  }

  function changeInputColor(color) {
    var other = color === 'blue' ? 'red' : 'blue';
    $('.make3d-input').each(function(input) {
      console.log(this);
      $(this).addClass(color);
      $(this).removeClass(other);
    })
    $('button').addClass(color);
    $('button').removeClass(other);

  }

  function iconPlaceholders() {
    var socialIcons = {
      instagram: "&#xf16d;",
      facebook: "&#xf082;",
      youtube: "&#xf167;",
      twitter: "&#xf099;",
    }

    function isLetter(str) {
      return str.length === 1;
    }

    $('.icon-holder').on('keydown', function(e) {
      var input = $(this);
      if(input.val().length === 0 && isLetter(e.key)) {
        input.removeClass('empty');
      } else if (input.val().length === 1 && e.which === 8) {
        input.addClass('empty');
      } else if ((input.val().length === document.getSelection().toString().length) && e.which === 8) {
        input.addClass('empty');
      }
    })
  }

  function submitHandler() {
    $('#submit').click(function() {
      var name = $('#name').val();
      var email = $('#email').val();
      var textarea = $('#textarea').val();

      if (!name) { shake($('#name')) }
      if (!email || !isEmail(email)) { shake($('#email')) }
      if (!textarea) { shake($('#textarea')) }

      if (name && email && isEmail(email) && textarea) {
        // sendEmail(name, email, textarea);
        document.getElementById("contact-us-form").submit();
      }
    })

    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }

    function shake($element) {
      ($element).parent().effect( "shake", {distance: 5, times:2}, 500 );
    }

    function sendEmail(name, email, textarea) {
      $.ajax({
        url: 'contact-us.php',
        type: 'POST',
        data: {
          name: name,
          email: email,
          text: textarea
        },
        success: function(result) {
          // window.location.replace('/');
        }
      })
    }
  }
})
