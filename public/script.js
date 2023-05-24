  
  // Example AJAX request to fetch user data
  fetch("/users")
    .then((response) => response.json())
    .then((data) => {
      console.log("User data:", data);
      ${data.id};
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
    });