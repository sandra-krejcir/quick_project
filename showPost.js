const url = "https://kea21s-6eb0.restdb.io/rest/posts";

const options = {
  headers: {
    "x-apikey": "606d606af55350043100752e",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((data) => listPosts(data));

function listPosts(data) {
  data.forEach(showPost);
}

function showPost(post) {
  if (post.approved) {
    console.log(post);
    const template = document.querySelector("#allPosts").content;
    const copy = template.cloneNode(true);
    copy.querySelector("h4").textContent = post.category;
    copy.querySelector("h2").textContent = post.title;
    copy.querySelector(
      ".info"
    ).textContent = `written by ${post.username}, ${post.date}`;
    copy.querySelector(".content").textContent = post.content;
    const parent = document.querySelector("main");
    parent.appendChild(copy);
  }
}
