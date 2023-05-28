document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const form = event.target;
    const data = {
      user_name: form.elements.user_name.value,
      first_name: form.elements.first_name.value,
      last_name: form.elements.last_name.value,
      address: form.elements.address.value,
    };

    fetch("/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the response data
        console.log(result);
        // Clear the form
        form.reset();
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  });