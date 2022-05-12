"use strict";

const searchbox = document.querySelector('#inputbox'),
    btns = document.querySelector('#btns'),
    cardWrap = document.querySelector('.card_wrapper');


const URL = 'https://api.github.com/search/users?q=';



searchbox.addEventListener('keypress', setUser);



const sp = document.querySelector('.ok');

// setter

function setUser(e) {


    if (e.keyCode === 13) {
        getUser(searchbox.value)
        searchbox.value = '';
        const al = document.querySelector('.alert');
        
        al.style.display = 'none';
        sp.classList.add('d-block');




    }


}

// getter

async function getUser(query) {

    const req = await fetch(`${URL}${query}`)
    const res = await req.json();


    console.log(res);

    sendDisplay(res.items)

}

function sendDisplay(user) {

    function Hide() {
        sp.style.display = 'none';
        console.log('ok');
    }


    Hide()



    user.map((item) => {

        const card = document.createElement('div');

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

        cardWrap.append(card)


    })



}

