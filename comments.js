const form = document.querySelector("form");

form.addEventListener("submit", userCommented);

function userCommented(evt) {
  evt.preventDefault();
  console.log(form.elements.username.value);
  console.log(form.elements.content.value);

  const payload = {
    username: form.elements.username.value,
    content: form.elements.content.value,
  };

  document.querySelector(".form").disabled = true;

  fetch("https://kea21s-6eb0.restdb.io/rest/comments", {
    method: "POST",
    headers: {
      "x-apikey": "606d606af55350043100752e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log(response);
      document.querySelector(".form").disabled = false;
      form.elements.username.value = "";
      form.elements.content.value = "";
      document.querySelector(".hidden").classList.remove("hidden");
    })
    .catch((err) => {
      console.error(err);
    });
}
