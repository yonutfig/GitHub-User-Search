class UI {
  constructor() {
    this.input = document.querySelector("input");
    this.button = document.querySelector("button");

    this.image = document.querySelector(".profile__image img");
    this.name = document.querySelector(".profile__bio__header h1");
    this.joinedDate = document.querySelector(".profile__bio__header p");
    this.userName = document.querySelector(".profile__bio__header__name");
    this.description = document.querySelector(
      ".profile__bio__header__description"
    );


    this.repositories = document.querySelector(
      ".profile__metrics__card__repositories"
    );
    this.followers = document.querySelector(
      ".profile__metrics__card__followers"
    );
    this.following = document.querySelector(
      ".profile__metrics__card__following"
    );


    this.location = document.querySelector(".profile__details__card__location");
    this.twitter = document.querySelector(".profile__details__card__twitter");
    this.website = document.querySelector(".profile__details__card__website");
    this.company = document.querySelector(".profile__details__card__company");
  }
  preareButtonClickEvent(callback) {
    this.button.addEventListener("click", () => {
      const search = this.input.value;
      if (search) {
        callback(search);
      }
    });
  }
  updateImage(src) { 
    this.image.src = src;
  }
  updateJoinedDate(date) { 
    this.joinedDate.innerHTML = `joined ${new Date(date).toLocaleDateString("ro", { day: "numeric", year: "numeric", month: "long" })}`;
  }
}

class API {
  constructor() {
    this.data = {};
    this.endpointURL = "https://api.github.com/users";
  }
  async getUserByName(name) {
   try {
      const res = await fetch(`${this.endpointURL}/${name}`);
      const body = await res.json();
     this.data = body;
     return this.data
   } catch (error) {
     console.log(error);
     throw error;
    }
  }
}

const ui = new UI();
const api = new API();

ui.preareButtonClickEvent(async (search) => {
  try {
    const userData = await api.getUserByName(search);
    console.dir(userData);

    const numeElement = document.querySelector(".profile__bio__header h1");
    numeElement.textContent = userData.login || "Nume utilizator nedisponibil";
    // const imagineUtilizator = document.querySelector(".profile__image img");
    // imagineUtilizator.src = userData.avatar_url;
    ui.updateImage(userData.avatar_url);
    // const dataCreated = document.querySelector(".profile__bio__header p");
    // dataCreated.textContent = userData.created_at;
    ui.updateJoinedDate(userData.created_at);
    const tagPerson = document.querySelector(".profile__bio__header__name");
    tagPerson.textContent = userData.id;
    const bioUtilizator = document.querySelector(".profile__bio__header__description");
    bioUtilizator.textContent = userData.bio;
    const repositories = document.querySelector(".profile__metrics__card__repositories");
    repositories.textContent = userData.public_repos;
    const followers = document.querySelector(".profile__metrics__card__followers");
    followers.textContent = userData.followers;
    const following = document.querySelector(".profile__metrics__card__following");
    following.textContent = userData.following;
    const location = document.querySelector(".profile__details__card__location");
    location.textContent = userData.location;
    const twitt = document.querySelector(".profile__details__card__twitter");
    twitt.textContent = userData.twitter;
    const company = document.querySelector(".profile__details__card__company");
    company.textContent = userData.company;
    const website = document.querySelector(".profile__details__card__website");
    website.textContent = userData.blog;
  } catch (error) {
    console.log(error);
  }
});
let darkMode = localStorage.getItem("darkMode");
const toggleButton = document.querySelector(".design__dark__mode");

const enableDarkMode = () => { 
  document.body.classList.add('darkMode'); 
  localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => { 
  document.body.classList.remove('darkMode');  
  localStorage.setItem('darkMode', null);  
}
if (darkMode === 'enabled') { 
  enableDarkMode();
}
toggleButton.addEventListener("click", () => { 
  darkMode = localStorage.getItem('darkMode');
  if (darkMode !== 'enabled') {  
    enableDarkMode();
    console.log(darkMode);
  } else {
    disableDarkMode();
    console.log(darkMode);
  }
})

