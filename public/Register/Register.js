document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const form = event.target;
    const data = {
      user_name: form.elements.user_name.value,
      pass: form.elements.pass.value,
      first_name: form.elements.first_name.value,
      last_name: form.elements.last_name.value,
      address: form.elements.address.value,
    };
    $.ajax({
      url: "/specificuser/" + data.user_name,
      type: "GET",
      success: function (result) {
        if (result === "Username already exists. Please pick another username") {
          alert("Username already exists");
          form.reset();
          event.preventDefault();
        } else {
          $.ajax({
            url: "/createuser",
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (result) {
              window.location.href = "../index.html";
              form.reset();
            },
            error: function (error) {
              console.log(error);
            },
          });
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  });