  // get form data
  let fullName = document.getElementById("fullName")
  let email = document.getElementById("email")
  let telephone = document.getElementById("phone")
  let message = document.getElementById("message")
  document.querySelector('form[name="contact"]').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => alert('Thank you for your message!'))
      .catch((error) => alert(error));
  });
document.getElementById("contactForm").addEventListener("submit", (e)=> {
  e.preventDefault()
  let formData = {
    fullName: fullName.value,
    email: email.value,
    telephone: telephone.value,
    message: message.value,
  }

  let xhr = new XMLHttpRequest()
  xhr.open('POST', '/')
  xhr.setRequestHeader('content-type', 'application.json')
  xhr.onload = function() {
    console.log(xhr.responseText)
    if(xhr.responseText == 'success') {
      alert('Email was sent.')
      fullName.value = ''
      email.value = ''
      telephone.value = ''
      message.value = ''

    }else {
      alert('Something went wrong, please try it again.')
    }
  }
  xhr.send(JSON.stringify(formData))
})