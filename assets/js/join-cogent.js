$(document).ready(function() {
    submitHandler();
})



function submitHandler() {
  var resume;
  $('#file').on('change', function() {
      resume = this.files[0];
  });

  $('#submit').click(function() {
    var name = $('#name').val();
    var email = $('#email').val();
    var field = $('#field').val();
    var textarea = $('#textarea').val();

    if (!name) { shake($('#name')) }
    if (!email || !isEmail(email)) { shake($('#email')) }
    if (!field) { shake($('#field')) }
    if (!textarea) { shake($('#textarea')) }

    if (name && email && isEmail(email) && field && textarea) {
      document.getElementById("join-cogent-form").submit();
    }
  })

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function shake($element) {
    ($element).parent().effect( "shake", {distance: 5, times:2}, 500 );
  }

  function joinCogent(name, email, field, resume, textarea) {
    console.log(name, email, field, resume, textarea);
    $.ajax({
      url: 'join-cogent.php',
      type: 'POST',
      data: {
        name: name,
        email: email,
        field: field,
        resume: resume.name,
        text: textarea
      },
      success: function(result) {
        console.log(result);
      }
    })
  }
}
