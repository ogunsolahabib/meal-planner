(function() {
  const select = document.getElementById("category");
  const form = document.getElementById("form-fields");
  const airtable_write_endpoint =
    "https://api.airtable.com/v0/appkar2nR1tWNuMxv/meals?api_key=keyuwCpCOgz2TUEJi";
  const airtable_read_endpoint =
    "https://api.airtable.com/v0/appkar2nR1tWNuMxv/meals?api_key=keyuwCpCOgz2TUEJi";

  form.addEventListener("submit", e => {
    const mealName = document.querySelector("#meal-name").value;

    const recipeLink = document.getElementById("recipe-link").value;
    const cookWhen = document.getElementById("cook-when").value;
    const imageLink = document.getElementById("image-link").value;
    const category = select.options[select.selectedIndex].value;
    console.log([mealName, category, recipeLink, cookWhen, imageLink]);
    e.preventDefault();
    axios
      .post(airtable_write_endpoint, {
        fields: {
          Name: mealName,
          Category: category,
          "Recipe Link": recipeLink,
          "Cook When": cookWhen,
          "Image Link": imageLink
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    showMeals();
  });
  function showMeals() {
    axios
      .get(airtable_read_endpoint)
      .then(response => {
        console.log(response);
        const meals = response.data.records;
        for (let i = 0; i < meals.length; i++) {
          output = `<div class="bottom-container-image">
        <p>${meals[i].fields.Category}</p>
        <img
          src= ${meals[i].fields["Image Link"]}
        />
        <div>
          <p class="food">${meals[i].fields.Name}</p>
          <a href="${meals[i].fields["Recipe Link"]}">view recipe</a>
          <p>${meals[i].fields["Cook When"]}</p>
        </div>
      </div>`;
          const html = `<div class="bottom-container-image">
      <p>%category%</p>
      <img
        src="%image-link%"
      />
      <div>
        <p class="food">%recipe-name%</p>
        <a target="_blank" href="%recipe-link%">view recipe</a>
        <p>%cook-when%</p>
      </div>
    </div>`;
          let newHtml = html.replace("%category%", meals[i].fields.Category);
          newHtml = newHtml.replace(
            "%image-link%",
            meals[i].fields["Image Link"]
          );
          newHtml = newHtml.replace("%recipe-name%", meals[i].fields.Name);
          newHtml = newHtml.replace(
            "%recipe-link%",
            meals[i].fields["Recipe Link"]
          );
          newHtml = newHtml.replace(
            "%cook-when%",
            meals[i].fields["Cook When"]
          );
          document
            .querySelector(".bottom-container")
            .insertAdjacentHTML("beforeend", newHtml);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  document
    .getElementById("search-field")
    .addEventListener("click", function(event) {
      event.stopPropagation();
      document.querySelector(".top-container").style.display = "none";
    });
  document.addEventListener("click", function() {
    document.querySelector(".top-container").style.display = "block";
  });
  function mealSearch() {
    let string = document.querySelector("#search-field").value;
    let container = document.querySelector(".bottom-container");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    axios
      .get(airtable_read_endpoint)
      .then(response => {
        console.log(response);
        const meals = response.data.records;
        for (let i = 0; i < meals.length; i++) {
          if (meals[i].fields.Name.toLowerCase().includes(string)) {
            console.log(meals[i].fields.Name);
            output = `<div class="bottom-container-image">
              <p>${meals[i].fields.Category}</p>
              <img
                src= ${meals[i].fields["Image Link"]}
              />
              <div>
                <p class="food">${meals[i].fields.Name}</p>
                <a href="${meals[i].fields["Recipe Link"]}">view recipe</a>
                <p>${meals[i].fields["Cook When"]}</p>
              </div>
            </div>`;
            const html = `<div class="bottom-container-image">
            <p>%category%</p>
            <img
              src="%image-link%"
            />
            <div>
              <p class="food">%recipe-name%</p>
              <a target="_blank" href="%recipe-link%">view recipe</a>
              <p>%cook-when%</p>
            </div>
          </div>`;
            let newHtml = html.replace("%category%", meals[i].fields.Category);
            newHtml = newHtml.replace(
              "%image-link%",
              meals[i].fields["Image Link"]
            );
            newHtml = newHtml.replace("%recipe-name%", meals[i].fields.Name);
            newHtml = newHtml.replace(
              "%recipe-link%",
              meals[i].fields["Recipe Link"]
            );
            newHtml = newHtml.replace(
              "%cook-when%",
              meals[i].fields["Cook When"]
            );
            document
              .querySelector(".bottom-container")
              .insertAdjacentHTML("beforeend", newHtml);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  showMeals();
})();

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
