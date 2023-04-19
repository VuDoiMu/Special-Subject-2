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
        location.assign("/admin/management");
        alert(`You just deleted a book`);
      }, 1000);
    }
  });
}

let deleteTagButtons = document.getElementsByClassName("deleteTagButton");

for (let i = 0; i < deleteTagButtons.length; i++) {
  deleteTagButtons[i].addEventListener("click", async function (e) {
    const id = e.target.getAttribute("data-tag-id");
    console.log(id);
    const deleteTag = await fetch(
      `http://localhost:3500/tag/${id}`,
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
        location.assign("/admin/category/1");
        alert(`You just deleted a book`);
      }, 1000);
    }
  });
}

// CREATE BOOK

// UPDATE BOOK

let updateButtons = document.getElementsByClassName("updateButton");

for (let i = 0; i < updateButtons.length; i++) {
  updateButtons[i].addEventListener("click", async function (e) {
    window.location.href =
      await `http://localhost:3500/admin/update/${this.name}`;
  });
}


// logoutVar.addEventListener("click", async (e) => {
//   const sendData = await fetch("http://localhost:3500/auth/logout", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   });)

document.getElementById("add-book").addEventListener("click", () => {
  console.log("click");
  window.location.replace("http://localhost:3500/admin/add-book");
});
