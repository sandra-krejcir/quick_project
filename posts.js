const form = document.querySelector("form");

form.addEventListener("submit", userSubmitted);

function userSubmitted(evt) {
  evt.preventDefault();
  console.log(form.elements.category.value);
  console.log(form.elements.title.value);
  console.log(form.elements.username.value);
  console.log(form.elements.content.value);

  const payload = {
    category: form.elements.category.value,
    title: form.elements.title.value,
    username: form.elements.username.value,
    content: form.elements.content.value,
  };

  document.querySelector("button").disabled = true;
  fetch("https://kea21s-6eb0.restdb.io/rest/posts", {
    method: "POST",
    headers: {
      "x-apikey": "11d1bb4cb0487a83daeb6f416bcb0b5deea97",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log(response);
      document.querySelector("button").disabled = false;
      form.elements.category.value = "";
      form.elements.title.value = "";
      form.elements.username.value = "";
      form.elements.content.value = "";
      document.querySelector("p.hidden").classList.remove("hidden");
    })
    .catch((err) => {
      console.error(err);
    });
}
