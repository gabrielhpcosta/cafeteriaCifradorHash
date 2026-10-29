# M&C - Cifrador

Site da cafeteria M&C com uma ferramenta para cifrar e decifrar mensagens com três métodos clássicos de criptografia: Cifra de César, Substituição e Transposição. Feita para a APS de Ciência da Computação da UNIP.

## Como executar

### Pré-requisitos

- [Python 3](https://www.python.org/downloads/) (3.9 ou mais novo). No Windows, marque a opção **Add Python to PATH** na instalação.
- [Git](https://git-scm.com/downloads) (ou baixe o projeto pelo botão **Code > Download ZIP** no GitHub).

### Passo a passo

1. Baixe o projeto e entre na pasta:

   ```
   git clone https://github.com/gabrielhpcosta/cafeteriaCifradorHash.git
   cd cafeteriaCifradorHash
   ```

2. (Opcional, mas recomendado) Crie e ative um ambiente virtual:

   Windows (PowerShell):
   ```
   python -m venv .venv
   .venv\Scripts\Activate.ps1
   ```

   Linux / macOS:
   ```
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Instale as dependências (só o Flask):

   ```
   pip install -r requirements.txt
   ```

4. Inicie o servidor:

   ```
   python app.py
   ```

5. Abra http://127.0.0.1:5000 no navegador. A primeira tela é o login: clique em **Cadastrar** para criar um usuário e depois em **Entrar**. Depois de entrar, o Cifrador fica no menu do site.

Para parar o servidor, aperte `Ctrl + C` no terminal.

> Abrir o `index.html` direto no navegador não funciona para o Cifrador: as páginas dele são geradas pelo Flask, então o site precisa ser aberto pelo endereço acima.

### Testes

```
python -m unittest
```

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
