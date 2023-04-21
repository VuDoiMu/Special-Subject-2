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

function addEventButton() {
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
}

addEventButton();
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
const addBook = document.getElementById("add-book");
if(addBook) {
  addBook.addEventListener("click", () => {
    console.log("click");
    window.location.replace("http://localhost:3500/admin/add-book");
  });
}


const addTagBtn = document.getElementById('add-tag-btn');
const addTagFormSubmit = document.getElementById('add-tag-form');

if(addTagBtn) {
  addTagBtn.addEventListener('click', function () {
  addTagFormSubmit.classList.remove('hidden');
});
}

if(addTagFormSubmit) {
  addTagFormSubmit.addEventListener('submit', async function (e) {
  e.preventDefault();

  const tagNameInput = document.getElementById('tag-name');
  const tagDescriptionInput = document.getElementById('tag-description');
  const tagName = tagNameInput.value.trim();
  const tagDescription = tagDescriptionInput.value.trim();
  console.log(tagDescription);
  const url = 'http://localhost:3500/tag';
  
  let data = "";
  try {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: tagName, description: tagDescription })
  });
  data = await response.json();
} catch (error) {
  console.error(error);
}
  const tag = data.tag;
  console.log(tag);
  // Get the table body element
  const tableBody = document.querySelector('#tbody');

  // Create a new table row element
  const row = document.createElement('tr');

  // Create the cells for the row
  const nameCell = document.createElement('th');
  nameCell.setAttribute('scope', 'row');
  nameCell.textContent = tag.name;

  const countCell = document.createElement('th');
  countCell.setAttribute('scope', 'row');
  countCell.textContent = tag.books.length;

  const descriptionCell = document.createElement('th');
  descriptionCell.setAttribute('scope', 'row');
  descriptionCell.textContent = tag.description;

  const buttonCell = document.createElement('th');
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('id', 'btn-delete');
  deleteButton.setAttribute('class', 'btn btn-danger deleteTagButton');
  deleteButton.setAttribute('data-tag-id', tag._id);
  deleteButton.textContent = 'X';
  buttonCell.appendChild(deleteButton);

  // Add the cells to the row
  row.appendChild(nameCell);
  row.appendChild(countCell);
  row.appendChild(descriptionCell);
  row.appendChild(buttonCell);

  // Add the row to the table body
  tableBody.insertBefore(row, tableBody.childNodes[0]);
  addEventButton();
  addTagFormSubmit.reset();
  addTagFormSubmit.classList.add('hidden');
});
}
