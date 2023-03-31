let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
};
let message;
//DELETE BOOK

let deleteButtons = document.getElementsByClassName("deleteButton");

for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", async function (e) {
    const deleteBook = await fetch(
      `http://localhost:3500/management/${this.name}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => (message = res));
    if (message) {
      window.setTimeout(() => {
        location.assign("/admin-management");
        alert(`You just deleted a book`);
      }, 1000);
    }
  });
}

// CREATE BOOK

document.getElementById("btn-create").addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.querySelector("[name='name']").value;
  const cover = document.querySelector("[name='cover']").value;
  const author = document.querySelector("[name='author']").value;
  const description = document.querySelector("[name='description']").value;
  const content = document.querySelector("[name='content']").value;
  const artist = document.querySelector("[name='artist']").value;
  const publisher = document.querySelector("[name='publisher']").value;
  const price = document.querySelector("[name='price']").value;
  const saleRate = document.querySelector("[name='discountRate']").value;
  const pageCount = document.querySelector("[name='pageCount']").value;

  const inputs = document.getElementsByClassName("item-label");
  const tag = [];
  for (let i = 0; i < inputs.length; i++) {
    tag.push(inputs[i].innerHTML);
  }

  const addBook = await fetch(`http://localhost:3500/management`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      cover: cover,
      author: author,
      description: description,
      content: { content: content },
      artist: artist,
      publisher: publisher,
      price: price,
      saleRate: saleRate,
      pageCount: saleRate,
      tag: tag,
    }),
  })
    .then((response) => response.json())
    .then((data) => (message = data.message));
  if (message === "A book with this name is already exist!") {
    alert(`A book with this name is already exist!`);
  } else {
    window.setTimeout(() => {
      location.assign("/admin-management");
    }, 1000);
    alert(`You just added ${name}`);
  }
});

// UPDATE BOOK

let updateButtons = document.getElementsByClassName("updateButton");

for (let i = 0; i < updateButtons.length; i++) {
  updateButtons[i].addEventListener("click", async function (e) {
    window.location.href =
      await `http://localhost:3500/admin/update/${this.name}`;

    
  });
}
