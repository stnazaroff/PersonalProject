const user_name = sessionStorage.getItem("user_name");
const welcomeMessage = document.getElementById("welcome_message");
welcomeMessage.innerHTML = "Welcome, " + user_name + "!";

$.ajax({
  url: "/getuser/" + user_name,
  type: "GET",
  success: function (result) {
    console.log(result); // Check if the result object contains the expected user data
    document.getElementById("user_name").innerHTML = result[0].user_name;
    document.getElementById("first_name").innerHTML = result[0].first_name;
    document.getElementById("last_name").innerHTML = result[0].last_name;
    document.getElementById("address").innerHTML = result[0].address;
  },
  error: function (error) {
    console.log(error);
  },
});
