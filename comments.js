const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

fetch(
  "https://kea21s-6eb0.restdb.io/rest/posts/" + id + "?fetchchildren=true",
  {
    method: "GET",
    headers: {
      "x-apikey": "606d606af55350043100752e",
    },
  }
)
  .then((res) => res.json())
  .then((response) => {
    showPost(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showPost(post) {
  console.log(post);
  document.querySelector("h4").textContent = `| ${post.category} |`;
  document.querySelector("h2").textContent = post.title;
  document.querySelector(
    ".info"
  ).textContent = `${post.username}, ${post.date}`;
  document.querySelector(".content").textContent = post.content;

  const template = document.querySelector("#commentForm").content;

  post.comments.forEach((comment) => {
    console.log(comment);
    const copy = template.cloneNode(true);
    copy.querySelector("h3").textContent = comment.username;
    copy.querySelector("#theComm").textContent = comment.content;
    const parent = document.querySelector(".no_comment");
    parent.appendChild(copy);
  });
  if (post.comments.length == 0) {
    const copy = template.cloneNode(true);
    copy.querySelector("h3").textContent =
      "Oh, looks like there's no comments yet. ";
    copy.querySelector("#theComm").textContent = "Be the first to leave one :)";
    const parent = document.querySelector(".no_comment");
    parent.appendChild(copy);
  }
}

const form = document.querySelector("form");

form.addEventListener("submit", userCommented);

function userCommented(evt) {
  evt.preventDefault();

  const payload = {
    username: form.elements.username.value,
    content: form.elements.content.value,
    date: Date().toLocaleString(),
  };

  console.log(payload);

  fetch(`https://kea21s-6eb0.restdb.io/rest/posts/${id}/comments`, {
    method: "POST",
    headers: {
      "x-apikey": "606d606af55350043100752e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".form").disabled = false;
      form.elements.username.value = "";
      form.elements.content.value = "";
      document.querySelector("p.hidden").classList.remove("hidden");
      const template = document.querySelector("#commentForm").content;
      const copy = template.cloneNode(true);
      copy.querySelector("h3").textContent = data.username;
      copy.querySelector("#theComm").textContent = data.content;
      const parent = document.querySelector("main");
      parent.appendChild(copy);
    });
}
