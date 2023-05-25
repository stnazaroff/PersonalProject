function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

function signOut() {    
  var auth2 = gapi.auth2.getAuthInstance();
//   console.log(typeof auth2);
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}

//   // Example AJAX request to fetch user data
//   fetch("/users")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("User data:", data);
//       ${data.id};
//     })
//     .catch((error) => {
//       console.log("Error fetching user data:", error);
//     });
