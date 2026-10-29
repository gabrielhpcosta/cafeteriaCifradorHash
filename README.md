# M&C - Cifrador

Site da cafeteria M&C com uma ferramenta para cifrar e decifrar mensagens com três métodos clássicos de criptografia: Cifra de César, Substituição e Transposição. Feita para a APS de Ciência da Computação da UNIP.

## Como executar

Passo a passo para Windows.

### 1. Instalar o Python (só na primeira vez)

1. Baixe o Python em https://www.python.org/downloads/ (botão amarelo **Download Python**).
2. Abra o instalador e, **antes de clicar em Install Now**, marque a caixinha **Add python.exe to PATH** lá embaixo.
3. Clique em **Install Now** e espere terminar.

### 2. Baixar o projeto

1. Entre no GitHub com a sua conta (você precisa ter aceitado o convite para o repositório).
2. Nesta página, clique no botão verde **Code** e depois em **Download ZIP**.
3. Vá na pasta **Downloads**, clique com o botão direito no arquivo `cafeteriaCifradorHash-main.zip` e escolha **Extrair tudo...** > **Extrair**.

### 3. Abrir o terminal na pasta do projeto

1. Abra a pasta extraída até ver os arquivos `app.py` e `requirements.txt`.
2. Clique na barra de endereço lá em cima (onde aparece o caminho da pasta), apague o que estiver escrito, digite `cmd` e aperte **Enter**. Vai abrir uma janela preta (o Prompt de Comando) já nessa pasta.

### 4. Instalar o Flask (só na primeira vez)

Na janela preta, digite (ou copie e cole) e aperte **Enter**:

```
pip install -r requirements.txt
```

Espere aparecer `Successfully installed`.

### 5. Iniciar o site

Na mesma janela, digite e aperte **Enter**:

```
python app.py
```

Quando aparecer `Running on http://127.0.0.1:5000`, abra o navegador e entre em **http://127.0.0.1:5000**.

**Não feche a janela preta** enquanto estiver usando o site. Para desligar, feche a janela ou aperte `Ctrl + C` nela.

Da próxima vez, é só fazer os passos 3 e 5.

### Entrando no site

A primeira tela é o login. Digite um usuário e uma senha, clique em **Cadastrar** e depois em **Entrar**. O Cifrador fica no menu do site.

> Abrir o `index.html` com dois cliques não funciona: o site precisa ser aberto pelo endereço http://127.0.0.1:5000 com a janela preta aberta.

### Deu erro?

- **`'python' não é reconhecido` ou abriu a Microsoft Store:** o Python foi instalado sem marcar **Add python.exe to PATH**. Rode o instalador de novo, escolha **Modify** > **Next** e marque **Add Python to environment variables**. Depois feche e abra a janela preta de novo.
- **`'pip' não é reconhecido`:** use `python -m pip install -r requirements.txt`.
- **`No such file or directory: 'requirements.txt'`:** a janela preta não foi aberta na pasta certa. Volte ao passo 3 e confira que a pasta tem o `app.py`.

## Como usar

1. Digite ou cole a mensagem.
2. Escolha o método.
3. Digite a chave:
   - **César:** um número de 1 a 25 (quantas posições cada letra anda no alfabeto).
   - **Substituição:** uma palavra só com letras, sem acento.
   - **Transposição:** uma palavra com pelo menos 2 letras.
4. Clique em **Cifrar** ou **Decifrar**.

Para decifrar, use o mesmo método e a mesma chave que foram usados para cifrar. O botão **Usar como mensagem** joga o resultado de volta no campo de mensagem, o que ajuda a testar a ida e a volta.

Acentos e cedilha são trocados pela letra sem acento. Números, espaços e pontuação comum são mantidos. Outros caracteres (como @, # ou emojis) não são aceitos.

## Exemplos

| Método | Chave | Texto claro | Texto cifrado |
|---|---|---|---|
| César | 3 | Encontro na biblioteca as 19h | Hqfrqwur qd eleolrwhfd dv 19k |
| Substituição | UNIP | A senha do wifi e cafe123 | U hzowu pm dvyv z iuyz123 |
| Transposição | CHAVE | ATAQUE AO AMANHECER | AAAEAEAEU HT MCQONR |

A explicação de cada método está na página **Aprenda** do site.

## Arquivos

```
cafeteriaCifradorHash/
├── app.py              servidor Flask (login, site e páginas do cifrador)
├── cifras.py           os três métodos e a validação da entrada
├── test_cifras.py      testes
├── requirements.txt    dependências (Flask)
├── templates/          páginas do Cifrador e do Aprenda (base, cifrador, aprenda)
└── static/
    ├── index.html      tela de login
    ├── inicio3.html    site da cafeteria
    ├── css/            login.css, style3.css (site), cifrador.css
    ├── js/             script.js (login), script2.js (site), cifrador.js
    ├── img/            logos e fotos do site
    └── docs/           cardápio em PDF
```
