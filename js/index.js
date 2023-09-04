// let mydev;
let search = document.getElementById("search");
let mydev = document.getElementById("rowData");
let loading = document.querySelector(".load");

// start sideBar
// new WOW().init();
let clickCount = 0;
// Open

function openNav() {
  $(".side-nav-menu").animate({ left: 0 }, 500);
  $(".open-close-icon").addClass("fa-x");
  $(".open-close-icon").removeClass("fa-align-justify");
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 150
      );
  }
}

// close

function closeNav() {
  let navWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate({ left: -navWidth }, 500);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".links li").eq(i).removeClass("fadeInUp");
  }
  $(".links li").animate(
    {
      top: 300,
    },
    500
  );
}

$(".iconCo").click(function (e) {
  if (clickCount % 2 === 0) {
    openNav();
  } else {
    closeNav();
  }
  clickCount++;
});

// End sidebar

// get catCat

$("#cat").click(function (e) {
  closeNav();
  getCat();
});

async function getCat() {
  mydev.innerHTML = "";
  $(".load").removeClass("d-none");
  closeNav();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let myRes = await response.json();
  console.log(myRes.categories);
  displayCat(myRes.categories);
  $(".load").addClass("d-none");
}

function displayCat(data) {
  let temp = "";
  for (let i = 0; i < data.length; i++) {
    temp += `
<div class="col-md-3">
              <div id="cato${i}"    class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${
                    data[i].strCategoryThumb
                  }" alt="" srcset="">
                  <div class="meal-layer position-absolute text-center text-black p-2">
                      <h3>${data[i].strCategory}</h3>
                      <p>${data[i].strCategoryDescription
                        .split(" ")
                        .slice(0, 15)

                        .join(" ")}</p>
                  </div>
              </div>
      </div>
`;
  }

  console.log(temp);
  mydev.innerHTML = temp;

  for (let i = 0; i < data.length; i++) {
    $(`#cato${i}`).click(function (e) {
      let categoryName = data[i].strCategory;
      getMeals(categoryName);
    });
  }
}

//! get Meals and display it
getMeals();
async function getMeals(mealName = "beef") {
  mydev.innerHTML = "";
  $(".load").removeClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`
  );
  let myRes = await response.json();
  // console.log(myRes.meals);
  displayMealCat(myRes.meals);
  $(".load").addClass("d-none");
}

function displayMealCat(meal) {
  let temp = "";
  for (let i = 0; i < meal.length; i++) {
    temp += `

<div class="col-md-3">
<div id = "ing${i}" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="w-100" src="${meal[i].strMealThumb}" alt="" srcset="">
    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${meal[i].strMeal}</h3>
    </div>
</div>
</div>

`;
  }
  mydev.innerHTML = temp;
  for (let i = 0; i < meal.length; i++) {
    $(`#ing${i}`).click(function (e) {
      let ingDetails = meal[i].idMeal;
      console.log(ingDetails);
      getDetails(ingDetails);
    });
  }
}

// get details by id and show it

async function getDetails(id = "52977") {
  mydev.innerHTML = "";
  $(".load").removeClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let myRes = await response.json();
  // console.log(myRes.meals);
  displayById(myRes.meals);
  $(".load").addClass("d-none");
}
// getDetails(52772)
function displayById(meal) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[0][`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[0][`strMeasure${i}`]
      } ${meal[0][`strIngredient${i}`]}</li>`;
    }
  }

  // let tags = meal.strTags?.split(",")
  let tags = meal[0].strTags.split(",");
  // console.log(tags);
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let temp = "";

  temp += `
  
  <div class="col-md-4">
  <img class="w-100 rounded-3" src="${meal[0].strMealThumb}"
      alt="">
      <h2>${meal[0].strMeal}</h2>
</div>
<div class="col-md-8">
  <h2>Instructions</h2>
  <p>${meal[0].strInstructions}</p>
  <h3><span class="fw-bolder">Area : </span>${meal[0].strArea}</h3>
  <h3><span class="fw-bolder">Category : </span>${meal[0].strCategory}</h3>
  <h3>Recipes :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredients}
</ul>

  <h3>Tags :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
      ${tagsStr}
  </ul>

  <a target="_blank" href="${meal[0].strSource}" class="btn btn-success">Source</a>
  <a target="_blank" href="${meal[0].strYoutube}" class="btn btn-danger">Youtube</a>
</div>
  `;

  mydev.innerHTML = temp;
}

async function getArea() {
  mydev.innerHTML = "";
  $(".load").removeClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let myRes = await response.json();
  console.log(myRes.meals);
  displayArea(myRes.meals);
  $(".load").addClass("d-none");
}
function displayArea(data) {
  let temp = "";
  for (let i = 0; i < data.length; i++) {
    temp += `
    <div class="col-md-3">
                  <div id = "country${i}" class="rounded-2 text-center cursor-pointer">
                          <i class="fa-solid fa-house-laptop fa-4x"></i>
                          <h3>${data[i].strArea}</h3>
                  </div>
          </div>
    
    `;
  }
  mydev.innerHTML = temp;
  for (let i = 0; i < data.length; i++) {
    $(`#country${i}`).click(function (e) {
      getAreaMeals(`${data[i].strArea}`);
    });
  }
}
$("#country").click(function (e) {
  closeNav();
  getArea();
});

async function getAreaMeals(area = "Egyptian") {
  mydev.innerHTML = "";
  $(".load").removeClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  showAreaMeals(response.meals);
  $(".load").addClass("d-none");
  // console.log(response.meals.slice(0, 20));
}

function showAreaMeals(meal) {
  let temp = "";
  for (let i = 0; i < meal.length; i++) {
    temp += `
  
    <div class="col-md-3">
    <div id = "ing${i}" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${meal[i].strMealThumb}" alt="" srcset="">
        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
            <h3>${meal[i].strMeal}</h3>
        </div>
    </div>
  </div>
  
  `;
  }
  mydev.innerHTML = temp;

  for (let i = 0; i < meal.length; i++) {
    $(`#ing${i}`).click(function (e) {
      let ingDetails = meal[i].idMeal;
      // console.log(ingDetails);
      getDetails(ingDetails);
    });
  }
}

// start ing
$("#ingre").click(function (e) {
  closeNav();
  getIngredients();
});
async function getIngredients() {
  mydev.innerHTML = "";
  $(".load").removeClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let myReq = await response.json();

  // console.log(myReq.meals[0].strIngredient);
  showIngredients(myReq.meals.slice(0, 20));
  $(".load").addClass("d-none");
}

function showIngredients(data) {
  let temp = "";
  for (let i = 0; i < data.length; i++) {
    temp += `
  
    <div class="col-md-3">
    <div id = "type${i}" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${data[i].strIngredient}</h3>
            <p>${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
</div>
  
  `;
  }
  mydev.innerHTML = temp;
  for (let i = 0; i < data.length; i++) {
    $(`#type${i}`).click(function (e) {
      let mydata = data[i].strIngredient;
      console.log(mydata);
      getIngredientsMeals(mydata);
    });
  }
}

// !======================

async function getIngredientsMeals(ingredients = "beef") {
  mydev.innerHTML = "";
  $(".load").removeClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  let myReq = await response.json();

  displayIngredientsMeals(myReq.meals);
  $(".load").addClass("d-none");
  // console.log(myReq.meals[i].idMeal);
  // showIngredients(myReq.meals.slice(0,20))
}

function displayIngredientsMeals(meal) {
  let temp = "";
  for (let i = 0; i < meal.length; i++) {
    temp += `

<div class="col-md-3">
<div id = "ing${i}" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="w-100" src="${meal[i].strMealThumb}" alt="" srcset="">
    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${meal[i].strMeal}</h3>
    </div>
</div>
</div>

`;
  }
  mydev.innerHTML = temp;
  for (let i = 0; i < meal.length; i++) {
    $(`#ing${i}`).click(function (e) {
      let myId = meal[i].idMeal;
      console.log(myId);
      getDetailsingre(myId);
    });
  }
}
// getIngredientsMeals()

async function getDetailsingre(id = "52772") {
  mydev.innerHTML = "";
  $(".load").removeClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let myRes = await response.json();
  // console.log(myRes.meals);
  displayByIdingre(myRes.meals);
  $(".load").addClass("d-none");
}
// getDetails(52772)
function displayByIdingre(meal) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[0][`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[0][`strMeasure${i}`]
      } ${meal[0][`strIngredient${i}`]}</li>`;
    }
  }

  // let tags = meal.strTags?.split(",")
  let tags = meal[0].strTags.split(",");
  // console.log(tags);
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let temp = "";

  temp += `
  
  <div class="col-md-4">
  <img class="w-100 rounded-3" src="${meal[0].strMealThumb}"
      alt="">
      <h2>${meal[0].strMeal}</h2>
</div>
<div class="col-md-8">
  <h2>Instructions</h2>
  <p>${meal[0].strInstructions}</p>
  <h3><span class="fw-bolder">Area : </span>${meal[0].strArea}</h3>
  <h3><span class="fw-bolder">Category : </span>${meal[0].strCategory}</h3>
  <h3>Recipes :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredients}
</ul>

  <h3>Tags :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
      ${tagsStr}
  </ul>

  <a target="_blank" href="${meal[0].strSource}" class="btn btn-success">Source</a>
  <a target="_blank" href="${meal[0].strYoutube}" class="btn btn-danger">Youtube</a>
</div>
  `;

  mydev.innerHTML = temp;
}

// search

function showSearch() {
  search.innerHTML = `
  <div class="row py-4 ">
      <div class="col-md-6 ">
          <input id="byName"   class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
          <input id = "byF" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
      </div>
  </div>`;

  rowData.innerHTML = "";
  let byName = document.getElementById("byName");
  let byF = document.getElementById("byF");
  $("#byName").keyup(function (e) {
    searchByName(byName.value);
  });
  $("#byF").keyup(function (e) {
    searchByFirst(byF.value);
  });
}

// console.log(byName);
$("#searchLink").click(function (e) {
  closeNav();
  showSearch();
});

async function searchByName(term = "b") {
  mydev.innerHTML = "";
  $(".load").removeClass("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  let myReq = await response.json();

  myReq.meals ? displayMealBysearch(myReq.meals) : displayMealBysearch([]);
  $(".load").addClass("d-none");
  console.log(myReq.meals);
}
function displayMealBysearch(meal) {
  let temp = "";
  for (let i = 0; i < meal.length; i++) {
    temp += `

<div class="col-md-3">
<div id = "ing${i}" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="w-100" src="${meal[i].strMealThumb}" alt="" srcset="">
    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${meal[i].strMeal}</h3>
    </div>
</div>
</div>

`;
  }
  mydev.innerHTML = temp;
  console.log(meal[0].idMeal);
  for (let i = 0; i < meal.length; i++) {
    $(`#ing${i}`).click(function (e) {
      getDetails(meal[i].idMeal);
    });
  }
}

async function searchByFirst(f = "b") {
  mydev.innerHTML = "";
  $(".load").removeClass("d-none");
  f == "" ? (f = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${f}`
  );
  let myReq = await response.json();

  myReq.meals ? displayMealBysearchF(myReq.meals) : displayMealBysearchF([]);
  $(".load").addClass("d-none");
}

function displayMealBysearchF(meal) {
  let temp = "";
  for (let i = 0; i < meal.length; i++) {
    temp += `

<div class="col-md-3">
<div id = "ing${i}" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="w-100" src="${meal[i].strMealThumb}" alt="" srcset="">
    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${meal[i].strMeal}</h3>
    </div>
</div>
</div>

`;
  }
  mydev.innerHTML = temp;
  for (let i = 0; i < meal.length; i++) {
    $(`#ing${i}`).click(function (e) {
      getDetails(meal[i].idMeal);
    });
  }
}

function displayContact() {
  mydev.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput"  type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput"  type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput"  type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput"  type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `;
  $(".form-control").keyup(function (e) {
    inputsValidation();
  });
  let submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}
$("#contact").click(function (e) {
  closeNav();
  displayContact();
});

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
