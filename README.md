# Como rodar o site

### 1. Instala o Python (só na primeira vez)

Baixa em https://www.python.org/downloads/ e, no instalador, **marca a caixinha "Add python.exe to PATH"** antes de clicar em Install Now.

### 2. Baixa o projeto

Aqui no GitHub: botão verde **Code** > **Download ZIP**. Depois clica com o botão direito no ZIP > **Extrair tudo**.

### 3. Abre o cmd na pasta

Entra na pasta extraída (a que tem o `app.py`), clica na barra de endereço lá em cima, escreve `cmd` e dá Enter.

### 4. Roda isso na janela preta

```
pip install -r requirements.txt
python app.py
```

(o `pip install` só precisa na primeira vez)

### 5. Abre no navegador

http://127.0.0.1:5000

Cria um usuário em **Cadastrar**, depois **Entrar**. Não fecha a janela preta enquanto tiver usando.

---

### Deu ruim?

- `'python' não é reconhecido`: esqueceu de marcar o PATH. Reinstala o Python marcando a caixinha.
- `'pip' não é reconhecido`: usa `python -m pip install -r requirements.txt`.
- Não abre dando dois cliques no `index.html`, tem que ser pelo link do passo 5.
