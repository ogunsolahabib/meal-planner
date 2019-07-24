var icecream = document.querySelector(".top-container-button");
var strawberry = document.querySelector(".form");
strawberry.style.display = "none";

icecream.addEventListener("click", e => {
  e.preventDefault();
  if (strawberry.style.display != "block") {
    strawberry.style.display = "block";
    icecream.style.display = "none";
  } else {
    strawberry.style.display = "none";
  }
});

function chocolate() {
  document.querySelector(".form").style.display = "none";
  document.querySelector(".top-container-button").style.display = "block";
}
