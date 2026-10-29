const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => document.body.classList.toggle("show-mobile-menu"));
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

const linkLogin = document.getElementById("link-login");
let sessao = null;
try {
    sessao = JSON.parse(sessionStorage.getItem("mc_sessao"));
} catch (e) {}

if (sessao && sessao.usuario) {
    linkLogin.textContent = "Sair (" + sessao.usuario + ")";
    linkLogin.href = "#";
    linkLogin.addEventListener("click", function (e) {
        e.preventDefault();
        sessionStorage.removeItem("mc_sessao");
        window.location.href = "/index.html";
    });
}

const metodo = document.getElementById("metodo");
const rotuloChave = document.getElementById("rotulo-chave");
const dicaChave = document.getElementById("dica-chave");

const dicas = {
    cesar: ["Deslocamento", "Número de 1 a 25"],
    substituicao: ["Palavra-chave", "Só letras, sem acento. Ex: UNIP"],
    transposicao: ["Palavra-chave", "Pelo menos 2 letras. Ex: CHAVE"],
};

function atualizarChave() {
    rotuloChave.textContent = dicas[metodo.value][0];
    dicaChave.textContent = dicas[metodo.value][1];
}

if (metodo) {
    metodo.addEventListener("change", atualizarChave);
    atualizarChave();
}

const resultado = document.getElementById("texto-resultado");

if (resultado) {
    document.getElementById("copiar").addEventListener("click", function () {
        navigator.clipboard.writeText(resultado.value);
        this.textContent = "Copiado!";
        setTimeout(() => (this.textContent = "Copiar"), 1500);
    });

    document.getElementById("usar").addEventListener("click", function () {
        document.getElementById("mensagem").value = resultado.value;
        document.getElementById("mensagem").focus();
    });
}
