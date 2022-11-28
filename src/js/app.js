import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables);
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${variables.name || placeholder("Name")} ${variables.lastname ||
    placeholder("LastName")}</h1>
              <h2>${variables.role || placeholder("Role")}</h2>
          <h3>${variables.country || placeholder("Country")} ${variables.city ||
    placeholder("City")}</h3>
          <ul class="position-right"> ${getSocial(variables)}
          </ul>
        </div>
    `;
}
function getSocial(variables) {
  let SocialList = "";
  let SocialNetworks = ["twitter", "github", "linkedin", "instagram"];
  SocialNetworks.forEach(function callback(Social, index) {
    if (variables[Social]) {
      SocialList =
        SocialList +
        '<li><a href="https://' +
        variables[Social] +
        ".com/" +
        variables[Social] +
        '"><i class="bi bi-' +
        SocialNetworks[index] +
        '"></i></a></li>';
    }
  });
  return SocialList;
}
function placeholder(text) {
  return `<span class="placeholder">${text}</span>`;
}

window.onload = function() {
  window.variables = {
    includeCover: true,

    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",

    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",

    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: "alesanchezr",
    linkedin: null,
    instagram: null,
    name: null,
    lastname: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); //render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new valus
    });
  });
};
