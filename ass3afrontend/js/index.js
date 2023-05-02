let fname = document.getElementById("name");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let submit = document.getElementById("button");

const postData = async () => {
  if (!fname.value || !phone.value || !email.value) {
    return;
  }

  const data = {
    name: fname.value,
    phone: phone.value,
    email: email.value,
  };
  console.log(data);

  try {
    console.log(data);
    const response = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData);
    window.location.reload();
  } catch (error) {
    alert("Something went wrong.Please try again later.");
  }
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  postData();
});
