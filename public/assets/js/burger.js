document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }
  //CREATE
  const createBurgerBtn = document.getElementById("create-form");
  if (createBurgerBtn) {
    createBurgerBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "quote"
      const newBurger = {
        burger_name: document.getElementById("add").value.trim(),
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
        document.getElementById("add").value = "";

        // Reload the page so the user can see the new quote
        console.log("Created a new burger!");
        location.reload();
      });
    });
  }

  //UPDATE
  const devourBtn = document.querySelectorAll('.eat');
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
          body: JSON.stringify(newEatenState),
        }).then((response) => {
          if (response.ok) {
            console.log(`changed devoured to: ${devoured}`);
            location.reload('/');
          } else {
            alert('something went wrong!');
          }
        });
      });
    });
  };

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



