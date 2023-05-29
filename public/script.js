document.getElementById("LoginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const form = event.target;
    const data = {
      user_name: form.elements.user_name.value,
      pass: form.elements.pass.value,
    };
    $.ajax({
      url: "/login/" + data.user_name + "/" + data.pass + "/",
      type: "GET",
      success: function (result) {
        if (result === "Invalid username or password") {
            alert("Invalid username or password");
            form.reset();
            event.preventDefault();
        } else {
            window.location.href = "../Home/Home.html";
            form.reset();
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  });

document.getElementById("RegisterPage").addEventListener("click", function () {
  window.location.href = "./Register/Register.html";
});
