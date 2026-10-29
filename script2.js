
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {document.body.classList.toggle("show-mobile-menu");});
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

const swiper = new Swiper('.slider-container', {
    
    loop: true,
    spaceBetween: 40,
    slidesPerView: 3,
    centeredSlides: true,
        


    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

  
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },


    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

let votos = {
    muitoBom: 0,
    bom: 0,
    regular: 0,
    ruim: 0,
    muitoRuim: 0
};

function votar(tipo){

    votos[tipo]++;

    let total =
        votos.muitoBom +
        votos.bom +
        votos.regular +
        votos.ruim +
        votos.muitoRuim;

    atualizar("muitoBom", total);
    atualizar("bom", total);
    atualizar("regular", total);
    atualizar("ruim", total);
    atualizar("muitoRuim", total);
}

function atualizar(tipo, total){

    let porcentagem = (votos[tipo] / total) * 100;

    document.getElementById(tipo + "Bar").style.width =
        porcentagem + "%";

    document.getElementById(tipo + "Texto").innerText =
        porcentagem.toFixed(1) + "%";
}

// Login: mostra o usuário logado e permite sair
(function () {
    const link = document.getElementById("link-login");
    if (!link) return;
    let sessao = null;
    try { sessao = JSON.parse(sessionStorage.getItem("mc_sessao")); } catch (e) {}
    if (sessao && sessao.usuario) {
        link.textContent = "Sair (" + sessao.usuario + ")";
        link.href = "#";
        link.addEventListener("click", function (e) {
            e.preventDefault();
            sessionStorage.removeItem("mc_sessao");
            window.location.href = "index.html";
        });
    }
})();
