document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
      console.info("DOM loaded");
  }
  //CREATE
  const createBurgerBtn = document.getElementById("burger-create");
  if (createBurgerBtn) {
      createBurgerBtn.addEventListener("click", (e) => {
          e.preventDefault();

          // Grabs the value of the textarea that goes by the name, "quote"
          const newBurger = {
              burger_name: document.getElementById("add_burg").value.trim(),
          };

          // Send POST request to create a new quote
          fetch("/api/burgers", {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },

              // make sure to serialize the JSON body
              body: JSON.stringify(newBurger),
          }).then(() => {
              // Empty the form
              document.getElementById("add_burg").value = "";

              // Reload the page so the user can see the new quote
              console.log("Created a new burger!");
              location.reload();
          });
      });
  }

  //UPDATE
  const devourBtn = document.querySelectorAll('devour-burger');
  if (devourBtn) {
      devourBtn.forEach((button) => {
          button.addEventListener('click', (e) => {
              const id = e.target.getAttribute('data-id')
              const devour = e.target.getAttribute('data-devour');
              const newdevour = {
                  devoured: devour,
              };

              fetch(`/api/burgers/${id}`, {
                  method: 'PUT',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newdevour),                
              }).then((response) => {
                  if (response.ok) {
                      console.log(`changed eaten to: ${devoured}`);
                      location.reload('/');
                  } else {
                      alert('something went wrong!');
                  }
              });
          });
      });
  }
 
});


  
  