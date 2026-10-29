/*
 * Login M&C — senha protegida com PBKDF2-SHA256 (Web Crypto API).
 *
 * Como funciona:
 *  - Cadastro: gera um SALT aleatório (16 bytes) e deriva o HASH da senha com
 *    PBKDF2 (600.000 iterações). Só salt + hash + nº de iterações são salvos;
 *    a senha em si nunca é armazenada.
 *  - Login: refaz a derivação com o salt salvo e compara com o hash armazenado.
 *
 * Observação: os dados ficam no localStorage do navegador (sem servidor).
 * Serve para estudo/demonstração; em produção a verificação deve ser no servidor.
 */

const ITERACOES = 600000;
const TAM_SALT = 16;
const CHAVE_USUARIOS = "mc_usuarios";
const CHAVE_SESSAO = "mc_sessao";
const PAGINA_INICIAL = "inicio3.html";

/* ---------- utilidades ---------- */

function bytesParaHex(bytes) {
    return Array.from(new Uint8Array(bytes))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

function hexParaBytes(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes;
}

// Comparação em tempo constante (evita vazar informação pelo tempo de resposta)
function compararSeguro(a, b) {
    if (a.length !== b.length) return false;
    let diferenca = 0;
    for (let i = 0; i < a.length; i++) {
        diferenca |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return diferenca === 0;
}

function normalizarUsuario(usuario) {
    return usuario.trim().toLowerCase();
}

/* ---------- criptografia ---------- */

async function derivarHash(senha, salt, iteracoes) {
    const material = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(senha.normalize("NFKC")),
        "PBKDF2",
        false,
        ["deriveBits"]
    );
    const bits = await crypto.subtle.deriveBits(
        { name: "PBKDF2", salt: salt, iterations: iteracoes, hash: "SHA-256" },
        material,
        256
    );
    return bytesParaHex(bits);
}

/* ---------- armazenamento ---------- */

function lerUsuarios() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || {};
    } catch (e) {
        return {};
    }
}

function salvarUsuarios(usuarios) {
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
}

/* ---------- interface ---------- */

function mostrarMensagem(texto, tipo) {
    const el = document.getElementById("mensagem");
    el.textContent = texto;
    el.className = tipo || "";
}

function limparResultado() {
    document.getElementById("resultado").textContent = "";
}

function criarBloco(titulo, valor, classe) {
    const bloco = document.createElement("div");
    bloco.className = "bloco" + (classe ? " " + classe : "");
    const rotulo = document.createElement("span");
    rotulo.textContent = titulo;
    const codigo = document.createElement("code");
    codigo.textContent = valor;
    bloco.appendChild(rotulo);
    bloco.appendChild(codigo);
    return bloco;
}

function mostrarResultado(salt, hashArmazenado, hashCalculado) {
    const area = document.getElementById("resultado");
    const igual = compararSeguro(hashArmazenado, hashCalculado);
    const classe = igual ? "igual" : "diferente";
    area.textContent = "";
    area.appendChild(criarBloco("Hash da senha digitada", hashCalculado, classe));
    area.appendChild(criarBloco("Hash salvo no banco", hashArmazenado, classe));
}

function definirOcupado(ocupado) {
    document.querySelectorAll(".botoes button").forEach(b => (b.disabled = ocupado));
}

function alternarSenha() {
    const campo = document.getElementById("senha");
    const botao = document.querySelector(".ver-senha");
    const mostrar = campo.type === "password";
    campo.type = mostrar ? "text" : "password";
    botao.textContent = mostrar ? "Ocultar" : "Mostrar";
}

function lerCampos() {
    return {
        usuario: normalizarUsuario(document.getElementById("usuario").value),
        senha: document.getElementById("senha").value
    };
}

function criptografiaDisponivel() {
    if (!window.crypto || !window.crypto.subtle) {
        mostrarMensagem(
            "Seu navegador não liberou a criptografia. Abra o site por http://localhost ou https.",
            "erro"
        );
        return false;
    }
    return true;
}

/* ---------- ações ---------- */

async function cadastrar() {
    limparResultado();
    if (!criptografiaDisponivel()) return;

    const { usuario, senha } = lerCampos();

    if (usuario.length < 3) {
        mostrarMensagem("O usuário precisa ter pelo menos 3 caracteres.", "erro");
        return;
    }
    if (senha.length < 6) {
        mostrarMensagem("A senha precisa ter pelo menos 6 caracteres.", "erro");
        return;
    }

    const usuarios = lerUsuarios();
    if (Object.prototype.hasOwnProperty.call(usuarios, usuario)) {
        mostrarMensagem("Esse usuário já está cadastrado.", "erro");
        return;
    }

    definirOcupado(true);
    mostrarMensagem("Gerando hash da senha...", "carregando");

    try {
        const salt = crypto.getRandomValues(new Uint8Array(TAM_SALT));
        const hash = await derivarHash(senha, salt, ITERACOES);

        usuarios[usuario] = {
            salt: bytesParaHex(salt),
            hash: hash,
            iteracoes: ITERACOES,
            algoritmo: "PBKDF2-SHA256"
        };
        salvarUsuarios(usuarios);

        mostrarMensagem("Cadastro realizado! Agora é só entrar.", "sucesso");
        document.getElementById("resultado").appendChild(
            criarBloco("Hash salvo no banco", hash, "igual")
        );
        document.getElementById("senha").value = "";
    } catch (e) {
        mostrarMensagem("Erro ao cadastrar. Tente novamente.", "erro");
    } finally {
        definirOcupado(false);
    }
}

async function entrar() {
    limparResultado();
    if (!criptografiaDisponivel()) return;

    const { usuario, senha } = lerCampos();

    if (!usuario || !senha) {
        mostrarMensagem("Preencha usuário e senha.", "erro");
        return;
    }

    definirOcupado(true);
    mostrarMensagem("Verificando...", "carregando");

    try {
        const usuarios = lerUsuarios();
        const existe = Object.prototype.hasOwnProperty.call(usuarios, usuario);

        if (!existe) {
            // Deriva um hash "de mentira" para o tempo de resposta ser parecido
            await derivarHash(senha, crypto.getRandomValues(new Uint8Array(TAM_SALT)), ITERACOES);
            mostrarMensagem("Usuário ou senha incorretos.", "erro");
            return;
        }

        const registro = usuarios[usuario];
        const hashCalculado = await derivarHash(
            senha,
            hexParaBytes(registro.salt),
            registro.iteracoes
        );

        mostrarResultado(registro.salt, registro.hash, hashCalculado);

        if (compararSeguro(registro.hash, hashCalculado)) {
            sessionStorage.setItem(
                CHAVE_SESSAO,
                JSON.stringify({ usuario: usuario, entrouEm: Date.now() })
            );
            mostrarMensagem("Login realizado com sucesso!", "sucesso");
            document.getElementById("senha").value = "";
            const ir = document.createElement("a");
            ir.href = PAGINA_INICIAL;
            ir.className = "ir-site";
            ir.textContent = "Ir para o site →";
            document.getElementById("resultado").appendChild(ir);
        } else {
            mostrarMensagem("Usuário ou senha incorretos.", "erro");
        }
    } catch (e) {
        mostrarMensagem("Erro ao verificar. Tente novamente.", "erro");
    } finally {
        definirOcupado(false);
    }
}

// Enter no teclado = entrar
document.addEventListener("keydown", evento => {
    if (evento.key === "Enter" && (evento.target.id === "usuario" || evento.target.id === "senha")) {
        entrar();
    }
});
