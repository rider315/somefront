$(function () {
  // Smooth Scrolling
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000
        );
        return false;
      }
    }
  });
});

function validateAndRedirect() {
  console.log("Run");
  var phone = document.getElementById("Phone").value.trim();
  var name = document.getElementById("Your").value.trim();
  var phoneError = document.getElementById("phone-error");
  var nameError = document.getElementById("name-error");

  phoneError.textContent = "";
  nameError.textContent = "";

  if (phone === "") {
    phoneError.textContent = "Phone number is required.";
    return;
  }
  if (name === "") {
    nameError.textContent = "Name is required.";
    return;
  }

  // Make a POST request to the backend server
  fetch("https://jttfront-gamma.vercel.app/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone: phone, name: name }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Redirect to confirmation page
      window.location.href = "confirmation.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
