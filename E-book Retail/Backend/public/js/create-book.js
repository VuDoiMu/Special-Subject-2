// New version
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
  console.log(formData.get("images"));
  fetch("http://localhost:3500/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// // create AJAX object
// const ajax = new XMLHttpRequest();

// // 1st parameter = method, GET/POST
// // 2nd parameter = path to server file
// // 3rd parameter = asynchronous
// ajax.open("POST", "/test", true);

// // when status of request changes
// ajax.onreadystatechange = function () {
//   // operation is completed
//   if (this.readyState == 4) {
//     // response from server is okay
//     if (this.status == 200) {
//       // response from server
//       console.log(this.responseText);
//     }
//   }
// };

// // send AJAX request

// ajax.send(formData);
//OLD VERSION

// document.getElementById("btn-create").addEventListener("click", async (e) => {
//   e.preventDefault();

//   const name = document.querySelector("[name='name']").value;

//   const author = document.querySelector("[name='author']").value;
//   const description = document.querySelector("[name='description']").value;

//   const artist = document.querySelector("[name='artist']").value;
//   const publisher = document.querySelector("[name='publisher']").value;
//   const price = document.querySelector("[name='price']").value;
//   const saleRate = document.querySelector("[name='discountRate']").value;
//   const pageCount = document.querySelector("[name='pageCount']").value;

//   const inputs = document.getElementsByClassName("item-label");
//   const tag = [];
//   for (let i = 0; i < inputs.length; i++) {
//     tag.push(inputs[i].innerHTML);
//   }
//   const fileCover = document.querySelector("#file-cover");
//   const fileContent = document.querySelector("#file-content");
//   const coverForm = new FormData();
//   const contentForm = new FormData();

//   coverForm.append("cover", fileCover.files[0]);
//   console.log(coverForm[0]);
//   for (let i = 0; i < fileContent.files.length; i++) {
//     contentForm.append(i + 1 + "", fileContent.files[i]);
//   }
//   console.log(contentForm);
// console.log(contentForm.get("1"));
// console.log(contentForm.get("2"));

//   // http://localhost:3500/management
//   const addBook = await fetch(`http://localhost:3500/management`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: name,
//       cover: coverForm,
//       author: author,
//       description: description,
//       content: contentForm,
//       artist: artist,
//       publisher: publisher,
//       price: price,
//       saleRate: saleRate,
//       pageCount: saleRate,
//       tag: tag,
//       images: { image: coverForm, content: contentForm },
//     }),
//     formdata: { contentForm, coverForm },
//   })
//     .then((response) => response.json())
//     .then((data) => (message = data.message));
//   if (message === "A book with this name is already exist!") {
//     alert(`A book with this name is already exist!`);
//   } else {
//     window.setTimeout(() => {
//       location.assign("/admin/management");
//     }, 1000);
//     alert(`You just added ${name}`);
//   }
// });
// const fileInput = document.querySelector("#file-cover");
// const imagePreview = document.querySelector("#image-preview");

// fileInput.addEventListener("change", function () {
//   const file = this.files[0];

//   if (file) {
//     const reader = new FileReader();

//     reader.addEventListener("load", function () {
//       imagePreview.setAttribute("src", this.result);
//       imagePreview.style.display = "block";
//     });

//     reader.readAsDataURL(file);
//   }
// });

// // // function uploadImages(e) {
// // //   // prevent the form from reloading the page
// // //   e.preventDefault()

// // //   // get form tag
// // //   const form = e.target

// // //   // create form data object from <form>
// // //   const formData = new FormData(form)

// // //   // create AJAX object
// // //   const ajax = new XMLHttpRequest()

// // //   // 1st parameter = method, GET/POST
// // //   // 2nd parameter = path to server file
// // //   // 3rd parameter = asynchronous
// // //   ajax.open("POST", "/uploadImages", true)

// // //   // when status of request changes
// // //   ajax.onreadystatechange = function () {
// // //       // operation is completed
// // //       if (this.readyState == 4) {
// // //           // response from server is okay
// // //           if (this.status == 200) {
// // //               // response from server
// // //               console.log(this.responseText)
// // //           }
// // //       }
// // //   }

// // //   // send AJAX request
// // //   ajax.send(formData)
// // // }
