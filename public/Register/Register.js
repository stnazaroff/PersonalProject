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
              window.location.href = "../Login/Login.html";
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

//   fetch(`/specificuser/${data.user_name}`)
//     .then((response) => response.json())
//     .then((result) => {
//         console.log(result);
//       if (result.exists) {
//         // Username already exists, display an error message or take appropriate action
//         form.reset();
//       } else {
//         // Username does not exist, proceed with registration
//         fetch("/createuser", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         })
//           .then((response) => response.json())
//           .then((result) => {
//             // Handle the response data
//             window.location.href = "../Login/Login.html"; // Redirect to the login page
//             // Clear the form
//             form.reset();
//           })
//           .catch((error) => {
//             // Handle any errors
//             console.error("Error:", error);
//           });
//       }
//     })
//     .catch((error) => {
//       // Handle any errors
//       console.error("Error:", error);
//     });
// });
