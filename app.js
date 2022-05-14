"use strict";

const searchbox = document.querySelector("#inputbox"),
    btns = document.querySelector("#btns"),
    cardWrap = document.querySelector(".card_wrapper");

const URL = "https://api.github.com/search/users?q=";

searchbox.addEventListener("keypress", setUser);

function setUser(e) {
    if (e.keyCode === 13) {
        getUser(searchbox.value);
        searchbox.value = "";
    }
}

// getter

async function getUser(query) {
    const req = await fetch(`${URL}${query}`);
    const res = await req.json();

    console.log(res);

    sendDisplay(res.items);
}

function sendDisplay(user) {
    cardWrap.innerHTML = "";

    user.map((item) => {
        const card = document.createElement("div");
        card.classList.add("user-item");

        card.dataset.id = item.login;

        console.log(card);

        card.innerHTML = `
               <div class=" bg-white p-3  d-flex flex-row justify-content-between align-items-center w-100 mt-2 ">

                    <div class="d-flex align-items-center ">
                        <img src="${item.avatar_url}"
                            class="user d-block" alt="">

                        <div class="info mx-1 px-2">
                            <h4>${item.login}</h4>
                            <p>Web development school</p>
                        </div>

                    </div>

                    <a href="${item.html_url}" class="text-white">
                        <button class="btn btn-success">
                            view
                        </button>
                    </a>

                </div>

              `;

        cardWrap.prepend(card);
    });

    setProfile();
}

// profil list

async function setProfile(user) {

    console.log(user);

    const useritem = cardWrap.querySelectorAll(".user-item");

    useritem.forEach((item) => {

        console.log(item.dataset.id);

       
        
        item.addEventListener("click", async () => {

            const data = await fetch(
                `https://api.github.com/users/${item.dataset.id}`
            );
            const res = await data.json();
            console.log(res);
            sendProfile(res);

        });
    });
}

function sendProfile(sms) {

    const {
        avatar_url,
        bio,
        blog,
        company,
        created_at,
        followers,
        following,
        location,
        login,
        name,
        public_repos,
        public_gists,
        twitter_username,
        type,
        updated_at,
        subscriptions_url,
        email,
    } = sms;

    const personCard = document.createElement("div");
    personCard.classList.add("person");

    personCard.innerHTML = `

    <div class="row">
    <div class="col-4 d-flex flex-column justify-content-center align-items-center p-4 card ">
        <img class="rounded rounded-circle img"
            src="${avatar_url}"
            alt="avatar">

        <h4 class="mt-2">${name}</h4>
        <p class="mb-3">${login}</p>

        <p>${bio}</p>

        <div class="row w-100 ">
            <div class="col-6 ">
                <i class="bi bi-people"></i> <span class="fw-bold">${followers}</span> Followers
            </div>

            <div class="col-6 mb-4">
                <span class="fw-bold">${following}</span> Following
            </div>

            <div class="col-12">
                <ul class="list-unstyled">
                    <li><i class="bi bi-building"></i> ${company}</li>
                    <li><i class="bi bi-geo-alt"></i> ${location}</li>
                    <li><i class="bi bi-envelope"></i> ${email ? email : " "
        }</li>
                    <li><i class="bi bi-link"></i>${blog}</li>
                    <li> <i class="bi bi-twitter"> </i>${twitter_username}</li>
                </ul>
            </div>


        </div>



    </div>


    <div class="col-8 p-3 ">

        <ul class="bg-white p-2 d-flex list-unstyled">
            <li class="p-2 bg-light m-1 rounded"><i class="bi bi-book"></i> Overview</li>
            <li class="p-2 bg-light m-1 rounded"><i class="bi bi-bookmarks-fill"></i>Repositories <span>${public_repos}</span></li>
            <li class="p-2 bg-light m-1 rounded"><i class="bi bi-layout-text-window"></i> Projects <span>${public_gists}</span></li>
            <li class="p-2 bg-light m-1 rounded"><i class="bi bi-box"></i> Package <span></span></li>
            <li class="p-2 bg-light m-1 rounded"><i class="bi bi-star"></i> Starts <span></span></li>
        </ul>

    </div>


</div>





    `;



    cardWrap.prepend(personCard);
}
