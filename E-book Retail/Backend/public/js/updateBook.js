// document
//   .getElementById("btn-submit-update")
//   .addEventListener("click", async (e) => {
//     e.preventDefault();
//     const id = document.getElementById("bookId").innerHTML;
//     const name = document.querySelector("[name='updateName']").value;
//     const cover = document.querySelector("[name='updateCover']").value;
//     const author = document.querySelector("[name='updateAuthor']").value;
//     const description = document.querySelector(
//       "[name='updateDescription']"
//     ).value;
//     const content = document.querySelector("[name='updateContent']").value;
//     const artist = document.querySelector("[name='updateArtist']").value;
//     const publisher = document.querySelector("[name='updatePublisher']").value;
//     const price = document.querySelector("[name='updatePrice']").value;
//     const saleRate = document.querySelector(
//       "[name='updateDiscountRate']"
//     ).value;
//     const pageCount = document.querySelector("[name='updatePageCount']").value;

//     const inputs = document.getElementsByClassName("item-label");
//     const tag = [];
//     for (let i = 0; i < inputs.length; i++) {
//       tag.push(inputs[i].innerHTML);
//     }
//     console.log(id, tag, price);
//     const updateBook = await fetch(`http://localhost:3500/management`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id,
//         name: name,
//         cover: cover,
//         author: author,
//         description: description,
//         content: { content: content },
//         artist: artist,
//         publisher: publisher,
//         price: price,
//         saleRate: saleRate,
//         pageCount: pageCount,
//         tag: tag,
//       }),
//     })
//       .then((response) => response.json())
//       .then((res) => (message = res));
//     if (message) {
//       window.setTimeout(() => {
//         location.assign("/admin/management");
//         alert(`You just update a book`);
//       }, 1000);
//     }
//   });

document.getElementById("add-form").onsubmit = function () {
  uploadImages(event);
};

async function uploadImages(event) {
  // prevent the form from reloading the page
  event.preventDefault();
  // get form tag
  const form = event.target;
  console.log(form);
  // create form data object from <form>
  const formData = new FormData(form);

  const tag = [];
  const inputs = document.getElementsByClassName("item-label");
  for (let i = 0; i < inputs.length; i++) {
    tag.push(inputs[i].innerHTML);
  }
  formData.append("tag", tag);
  console.log(formData.get("tag"));
  const id = document.getElementById("bookId").innerHTML;
  fetch("http://localhost:3500/uploadBook", {
    method: "POST",
    body: { formData, id },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert(`You just update a book`);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(` ${error}`);
    });
}
