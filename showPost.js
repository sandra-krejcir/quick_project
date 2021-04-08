const url = "https://kea21s-6eb0.restdb.io/rest/posts";
fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    listPosts(data);
  });

function listPosts(data) {
  data.forEach(showPost);
}

function showPost(post) {
  console.log(post);
  const template = document.querySelector("#allPosts").content;
  const copy = template.cloneNode(true);
  copy.querySelector("h4").textContent = post.category;
  copy.querySelector("h2").textContent = post.title;
  copy.querySelector(
    ".info"
  ).textContent = `written by ${post.username}, ${post.date}`;
  copy.querySelector(".content").textContent = post.content;
}
