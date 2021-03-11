document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
      console.info("DOM loaded");
  }
  //CREATE
  const createBurgerBtn = document.getElementById("burger-create");
  if (createBurgerBtn) {
      createBurgerBtn.addEventListener("submit", (e) => {
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
              const newEatenState = {
                  devoured: devour,
              };

              fetch(`/api/burgers/${id}`, {
                  method: 'PUT',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newEatenState),                
              }).then((response) => {
                  if (response.ok) {
                      console.log(`changed eaten to: ${devour}`);
                      location.reload('/');
                  } else {
                      alert('something went wrong!');
                  }
              });
          });
      });
  }

  //DELETE
  const deleteBtn = document.querySelectorAll('.deleteBtn');

  deleteBtn.forEach((button) => {
      button.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          fetch(`/api/burgers/${id}`, {
              method: 'DELETE',
          }).then((res) => {
                  console.log(res);
                  console.log(`Deleted burger: ${id}`);
                  location.reload();                
          });
      });
  })  
});


// // Make sure we wait to attach our handlers until the DOM is fully loaded.
// document.addEventListener('DOMContentLoaded', (event) => {
//     if (event) {
//       console.info('DOM loaded');
//     }
  
//     // UPDATE
//     const devourBurgerBtn = document.querySelectorAll('.devour-burger');
  
//     // Set up the event listener for the create button
//     if (devourBurgerBtn) {
//       devourBurgerBtn.forEach((button) => {
//         button.addEventListener('click', (e) => {
//           // Grabs the id of the element that goes by the name, "id"
//           const id = parseInt(e.target.getAttribute('data-id'));
         
//           fetch(`/api/burgers/${id}`, {
//             method: 'PUT',
//             headers: {
//               Accept: 'application/json',
//               'Content-Type': 'application/json',
//             },
  
//             // make sure to serialize the JSON body
//           }).then((response) => {
//             // Check that the response is all good
//             // Reload the page so the user can see the new quote
//             if (response.ok) {
//               console.log(`changed burger to: devoured`);
//               location.reload('/');
//             } else {
//               alert('something went wrong!');
//             }
//           });
//         });
//       });
//     }
  
//     // CREATE
//     const createBurg = document.getElementById('burger-create');
  
//     if (createBurg) {
//       createBurg.addEventListener('submit', (e) => {
//         e.preventDefault();
  
//         // Grabs the value of the textarea that goes by the name, "quote"
//         const newBurg = {
//           burger_name: document.getElementById('add_burg').value.trim(),
        
//         };
  
//         // Send POST request to create a new quote
//         fetch('/api/burgers', {
//           method: 'POST',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
  
//           // make sure to serialize the JSON body
//           body: JSON.stringify(newBurg),
//         }).then(() => {
//           // Empty the form
//           document.getElementById('add_burg').value = '';
  
//           // Reload the page so the user can see the new quote
//           console.log('Created a new Burger!');
//           location.reload();
//         });
//       });
//     }
// });

  
  