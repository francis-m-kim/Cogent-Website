$(document).ready(function() {
    submitHandler();
})

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
