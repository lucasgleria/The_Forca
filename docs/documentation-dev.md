# Documentação de Desenvolvimento: Jogo da Forca Web

## 1. Papéis dos Desenvolvedores

### Desenvolvedor A 
- **Foco:** Lógica de negócios em Python, com tarefas mais isoladas e diretas.
- **Responsabilidades:** Implementação das funcionalidades principais da lógica do jogo (gerenciamento de palavras, regras básicas da partida).

### Desenvolvedor B 
- **Foco:** Configuração do projeto, Frontend completo (HTML, CSS/Tailwind/Sass, JavaScript), Backend (FastAPI, design de API, persistência de dados), integração e processo de build.
- **Responsabilidades:** Liderança técnica, garantia da arquitetura, design da UI/UX, integração entre frontend e backend, testes e deploy.


## 2. Fases de Desenvolvimento: Dividir para Conquistar

### FASE 1: Configuração e Base do Backend

**Objetivo:** Estabelecer o ambiente de desenvolvimento e as fundações da lógica do jogo em Python.

#### Etapa 1.1: Configuração Inicial do Projeto (Dev B)
- [x] **Tarefa B1.1.1:** Criar repositório Git (Ex: GitHub/GitLab/Bitbucket) e configurar o `.gitignore` para ignorar arquivos de ambiente, caches, etc.  
- [x] **Tarefa B1.1.2:** Criar ambiente virtual Python (`venv`) no diretório raiz do projeto e ativá-lo.
- [x] **Tarefa B1.1.3:** Instalar as dependências iniciais: `pip install fastapi uvicorn`.
- [x] **Tarefa B1.1.4:** Criar o arquivo `requirements.txt` com as dependências instaladas (`pip freeze > requirements.txt`).
- [x] **Tarefa B1.1.5:** Criar a estrutura inicial de pastas para o projeto.

```plaintext
├── src/
│   ├── backend/
│   │   ├── main.py
│   │   ├── word_manager.py
│   │   ├── game_logic.py
│   │   ├── ranking_manager.py
│   │   ├── models/
│   │   └── utils/
│   └── frontend/
│       ├── index.html
│       ├── app.js
│       ├── components/
│       ├── styles/
│       └── assets/
│           ├── images/
│           ├── audio/
│           └── fonts/
├── docs/
│   ├── documentation.md
│   ├── documentation-dev.md
│   └── jogo-da-forca-template.png
├── README.md
└── CHANGELOG.md
```

#### Etapa 1.2: Lógica de Palavras (Dev A)
- [x] **Tarefa A1.2.1:** Abrir e trabalhar no arquivo `src/backend/word_manager.py`.
- [x] **Tarefa A1.2.2:** Dentro de `word_manager.py`, criar dicionários ou listas de palavras (Python `list` de `str`) para cada nível de dificuldade (Fácil, Médio, Difícil). Incluir pelo menos 10 palavras por nível.  
  Exemplo:  
  ```python
  {"easy": ["casa", "bola", ...], "medium": ["janela", "computador", ...], ...}
  ```
- [x] **Tarefa A1.2.3:** Implementar a função `get_random_word(difficulty: str) -> str` que:
  - [x] Recebe uma string `difficulty` ("easy", "medium", "hard").
  - [x] Retorna uma palavra aleatória da lista correspondente à dificuldade.
  - [x] Adicionar tratamento para `difficulty` inválida (pode retornar uma palavra padrão como "erro" ou levantar uma exceção `ValueError`).

#### Etapa 1.3: Estrutura Básica do FastAPI (Dev B)
- [x] **Tarefa B1.3.1:** Abrir e trabalhar no arquivo `src/backend/main.py`.
- [x] **Tarefa B1.3.2:** Configurar a aplicação FastAPI inicial e o servidor Uvicorn para rodar em `localhost:8000`.  
  Exemplo de comando para rodar: `uvicorn main:app --reload`
  (no diretório `src/backend`)
- [x] **Tarefa B1.3.3:** Criar um endpoint de teste simples: `GET /api/hello` que retorna um JSON `{"message": "Hello from FastAPI!"}`. Testar no navegador (`http://localhost:8000/api/hello`).
- [x] **Tarefa B1.3.4:** Configurar CORS (Cross-Origin Resource Sharing) no FastAPI para permitir que o frontend (que rodará em uma porta diferente, ex: `localhost:8008` via Live Server) acesse a API. Isso geralmente envolve adicionar `CORSMiddleware`.


### FASE 2: Core Frontend (UI/UX)

**Objetivo:** Construir a interface visual do jogo conforme o template.

#### Etapa 2.1: Estrutura HTML (Dev B)
- [x] **Tarefa B2.1.1:** Criar o arquivo `src/frontend/index.html`.
- [x] **Tarefa B2.1.2:** Adicionar a estrutura básica do HTML5 (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`). Incluir meta tag para responsividade (`<meta name="viewport" content="width=device-width, initial-scale=1.0">`).
- [x] **Tarefa B2.1.3:** Linkar o arquivo CSS (`style.css` - será gerado pelo Sass/Tailwind) no `<head>` e o JavaScript (`app.js`) antes do fechamento da tag `</body>`.
- [x] **Tarefa B2.1.4:** Adicionar os "containers" para as três telas principais:  
  ```html
  <div id="menu-screen"></div>
  <div id="game-screen" style="display: none;"></div>
  <div id="ending-screen" style="display: none;"></div>
  ```
- [x] **Tarefa B2.1.5:** Dentro de `#menu-screen`, adicionar a estrutura HTML para o título "JOGO DA FORCA" e os botões de dificuldade ("EASY", "MEDIUM", "HARD").
- [x] **Tarefa B2.1.6:** Dentro de `#game-screen`, adicionar a estrutura HTML para:
    - [x] Área da palavra (traços).
    - [x] Desenho da forca (pode ser um `div` placeholder ou um `svg` simples para começar).
    - [x] Painel "GUESSED" (letras adivinhadas).
    - [x] Teclado virtual (botões para cada letra do alfabeto).
    - [x] Painéis laterais (AESY, CLANES, RANKING - com elementos placeholder).
    - [x] Botões "Add a new word" e "Textsep tand" (campo de input).
- [x] **Tarefa B2.1.7:** Dentro de `#ending-screen`, adicionar a estrutura HTML para:
    - [x] Mensagens de "You won!" ou "You were hanged!".
    - [x] A palavra secreta revelada.
    - [x] Botão "Jogar Novamente".

#### Etapa 2.2: Estilização com CSS (Tailwind/Sass) (Dev B)
- [x] **Tarefa B2.2.1:** Configurar o ambiente de frontend para usar Tailwind CSS e Sass.
    - [x] Instalar Node.js e npm/yarn.
    - [x] No diretório `src/frontend`, inicializar npm (`npm init -y`).
    - [x] Instalar Tailwind CSS e PostCSS:  
      ```
      npm install -D tailwindcss postcss autoprefixer sass
      ```
    - [x] Inicializar Tailwind:  
      ```
      npx tailwindcss init -p
      ```
      Isso criará `tailwind.config.js` e `postcss.config.js`.
    - [x] Configurar `tailwind.config.js` para escanear arquivos HTML e JS por classes Tailwind:  
      ```js
      content: ["./*.html", "./*.js"]
      ```
    - [x] Criar o arquivo `src/frontend/style.scss` e adicionar as diretivas Tailwind:
      ```scss
      @tailwind base;
      @tailwind components;
      @tailwind utilities;

      /* Seus estilos customizados Sass aqui */
      ```
    - [x] Adicionar um script no `package.json` para compilar o CSS:  
      ```
      "build:css": "sass src/frontend/style.scss src/frontend/style.css --watch"
      ```
- [x] **Tarefa B2.2.2:** Aplicar estilos globais em `style.scss` (ex: `body { font-family: 'Inter', sans-serif; background-color: #1a202c; color: white; }`). Importar a fonte "Inter" via Google Fonts no `index.html`.
- [x] **Tarefa B2.2.3:** Estilizar o layout geral das telas (centralização, tamanhos dos blocos principais) usando classes Tailwind como `container`, `mx-auto`, `flex`, `justify-center`, `items-center`, `min-h-screen`.
- [x] **Tarefa B2.2.4:** Estilizar o Menu Screen para se assemelhar ao template:
    - [x] Título com fonte e tamanho adequados.
    - [x] Botões de dificuldade com gradientes, bordas arredondadas e sombras usando classes Tailwind (ex: `bg-gradient-to-br from-orange-500 to-orange-700`, `rounded-full`, `shadow-lg`).
- [x] **Tarefa B2.2.5:** Estilizar o Game Screen:
    - [x] Traços da palavra e letras adivinhadas (usar `span` ou `div` com bordas inferiores).
    - [x] Teclado virtual: Botões para cada letra com estilos de hover e active. Feedback visual (cores diferentes) para letras usadas, corretas e erradas.
    - [x] Área do "enforcado": Estilizar o `div` placeholder com um fundo escuro e bordas.
    - [x] Painéis laterais (GUESSES, AESY, RANKING): Aplicar gradientes de fundo, bordas arredondadas, padding e sombras usando classes Tailwind e/ou mixins Sass.
    - [x] Botões "Add a new word" e campo de input: Estilizar para combinar com o tema.
- [x] **Tarefa B2.2.6:** Estilizar o Ending Screen:
    - [x] Mensagens de vitória/derrota com fontes grandes e cores distintas.
    - [x] Balões de fala (usar CSS `clip-path` ou SVG para formas customizadas, ou simplesmente `divs` arredondadas com um triângulo para a ponta).
    - [x] Botão "Jogar Novamente" com estilo similar aos botões de dificuldade.
- [x] **Tarefa B2.2.7:** Implementar a responsividade básica:
    - [x] Usar prefixos responsivos do Tailwind (ex: `md:flex-row`, `sm:w-full`) para ajustar o layout dos painéis e do teclado em telas menores.
    - [x] Garantir que os elementos se redimensionem proporcionalmente.

#### Etapa 2.3: Lógica Básica de UI com JavaScript (Dev B)
- [x] **Tarefa B2.3.1:** Criar o arquivo `src/frontend/app.js`.
- [x] **Tarefa B2.3.2:** Obter referências aos elementos HTML das telas (`menuScreen`, `gameScreen`, `endingScreen`).
- [x] **Tarefa B2.3.3:** Implementar funções `showScreen(screenId)` e `hideAllScreens()` para controlar a visibilidade das telas.
- [x] **Tarefa B2.3.4:** No carregamento da página (`DOMContentLoaded`), chamar `showScreen('menu-screen')`.
- [x] **Tarefa B2.3.5:** Adicionar event listeners aos botões de dificuldade no Menu:
    - [x] Ao clicar, registrar a dificuldade no console.
    - [x] Chamar `showScreen('game-screen')` e `hideAllScreens()` para transicionar para a tela de jogo.
- [x] **Tarefa B2.3.6:** Adicionar event listeners para os botões de letras no teclado virtual do Game Screen:
    - [x] Ao clicar, registrar a letra clicada no console.
    - [x] Adicionar uma classe CSS para desabilitar visualmente o botão (ex: `opacity-50 cursor-not-allowed`).


### FASE 3: Integração Frontend-Backend

**Objetivo:** Conectar a interface do usuário com a lógica do jogo no servidor.

#### Etapa 3.1: Lógica do Jogo no Backend (Dev A)
- [x] **Tarefa A3.1.1:** Abrir e trabalhar no arquivo `src/backend/game_logic.py`.
- [x] **Tarefa A3.1.2:** Implementar a classe `GameSession`:
    - [x] **Atributos:**
        - [x] `word: str`: A palavra secreta do jogo.
        - [x] `guessed_letters: set[str]`: Conjunto de letras já tentadas (corretas ou erradas).
        - [x] `errors: int`: Contador de erros.
        - [x] `max_errors: int`: Limite de erros (ex: 6 ou 7, dependendo do desenho da forca).
        - [x] `status: str`: Status atual do jogo ("playing", "won", "lost").
    - [x] **Métodos:**
        - [x] `__init__(self, word: str, max_errors: int = 6)`: Inicializa a sessão com a palavra e o limite de erros.
        - [x] `make_guess(self, letter: str) -> bool`:
            - [x] Recebe uma `letter` (string, garantir que seja minúscula e única).
            - [x] Adiciona a letra a `guessed_letters`.
            - [x] Se a letra **NÃO** estiver na `word`, incrementa `errors`.
            - [x] Atualiza o status para "won" se todas as letras da palavra estiverem em `guessed_letters`.
            - [x] Atualiza o status para "lost" se `errors` atingir `max_errors`.
            - [x] Retorna `True` se a letra estava na palavra, `False` caso contrário.
        - [x] `get_word_display(self) -> str`:
            - [x] Retorna a palavra com letras adivinhadas reveladas e traços para as não adivinhadas (ex: se `word="python"` e `guessed_letters={"p", "o"}`, retorna `p_ _ _ o _`).
        - [x] `get_game_state(self) -> dict`:
            - [x] Retorna um dicionário com todos os dados relevantes para o frontend:
                ```python
                {
                    "word_display": self.get_word_display(),
                    "errors": self.errors,
                    "max_errors": self.max_errors,
                    "status": self.status,
                    "guessed_letters": list(self.guessed_letters) # Converter set para list para JSON
                }
                ```

#### Etapa 3.2: Endpoints da API para o Jogo (Dev B)
- [x] **Tarefa B3.2.1:** Em `src/backend/main.py`, importar `GameSession` de `game_logic` e `get_random_word` de `word_manager`.
- [x] **Tarefa B3.2.2:** Implementar o endpoint `POST /api/game/start`:
    - [x] Receber a `difficulty` (string) do frontend no corpo da requisição.
    - [x] Usar `get_random_word(difficulty)` para obter a palavra secreta.
    - [x] Criar uma nova instância de `GameSession`.
    - [x] Gerenciar sessões: Para um jogo simples de um jogador, pode-se usar um dicionário global no `main.py` para mapear um `session_id` (UUID gerado no backend) para a instância `GameSession`. O `session_id` deve ser retornado ao frontend.
    - [x] Retornar o `game_session.get_game_state()` inicial junto com o `session_id` para o frontend.
- [x] **Tarefa B3.2.3:** Implementar o endpoint `POST /api/game/guess`:
    - [x] Receber a `letter` (string) e o `session_id` do frontend no corpo da requisição.
    - [x] Recuperar a instância `GameSession` usando o `session_id`.
    - [x] Chamar `game_session.make_guess(letter)`.
    - [x] Retornar o `game_session.get_game_state()` atualizado para o frontend.
    - [x] Adicionar tratamento de erro se o `session_id` for inválido ou a letra já tiver sido tentada.
- [x] **Tarefa B3.2.4:** (Opcional, para debug) Implementar um endpoint `GET /api/game/status/{session_id}` para obter o estado atual de uma sessão de jogo específica.

#### Etapa 3.3: Conexão Frontend-Backend (Dev B)
- [ ] **Tarefa B3.3.1:** Em `src/frontend/app.js`, refatorar a função de "Iniciar Jogo" para fazer uma requisição `POST` para `/api/game/start` (com a dificuldade).
    - [ ] Usar `fetch()` para a requisição.
    - [ ] No `then()` da fetch, receber a resposta JSON (que contém o estado inicial do jogo e o `session_id`).
    - [ ] Armazenar o `session_id` em uma variável global no JavaScript.
    - [ ] Chamar `showScreen('game-screen')` e atualizar a UI com `word_display` e `errors` iniciais.
- [ ] **Tarefa B3.3.2:** Refatorar o event listener das letras do teclado virtual:
    - [ ] Ao clicar, obter a letra e o `session_id` armazenado.
    - [ ] Fazer uma requisição `POST` para `/api/game/guess` com a letra e o `session_id`.
    - [ ] No `then()` da fetch, receber o estado atualizado do jogo:
        - [ ] Atualizar o `word_display` na tela.
        - [ ] Atualizar o desenho da forca (ainda pode ser um placeholder que muda com `errors`).
        - [ ] Atualizar o painel de letras "GUESSES" (marcar letras corretas/erradas visualmente).
        - [ ] Verificar o status do jogo (`won` ou `lost`). Se o jogo terminou, chamar `showScreen('ending-screen')` e passar os dados finais para renderização.


### FASE 4: Funcionalidades Adicionais e Polimento

**Objetivo:** Adicionar funcionalidades secundárias, ranking e refinar a experiência do usuário.

#### Etapa 4.1: Ranking (Dev B)
- [ ] **Tarefa B4.1.1:** Decidir e configurar a persistência para o ranking. Para começar, usar um arquivo JSON simples (`rankings.json`) no backend.
- [x] **Tarefa B4.1.2:** Criar o módulo `src/backend/ranking_manager.py` com as seguintes funções:
    - [ ] `load_rankings() -> list`: Carrega os rankings de `rankings.json`.
    - [ ] `save_ranking(name: str, score: int)`: Adiciona um novo ranking e salva em `rankings.json` (manter ordenado por score, limitar número de entradas).
    - [ ] `get_top_rankings(limit: int = 5) -> list`: Retorna os N melhores rankings.
- [ ] **Tarefa B4.1.3:** Em `src/backend/main.py`, implementar o endpoint `GET /api/ranking` que chama `get_top_rankings()` e retorna a lista.
- [ ] **Tarefa B4.1.4:** Em `src/backend/main.py`, implementar o endpoint `POST /api/ranking/save` que recebe `name` e `score` e chama `save_ranking()`.
- [ ] **Tarefa B4.1.5:** No Frontend (`app.js`):
    - [ ] Ao carregar o Menu Screen, fazer uma requisição `GET /api/ranking` e popular o painel de Ranking na UI.
    - [ ] Na Ending Screen (após uma vitória), exibir um campo de texto para o nome do jogador e um botão "Salvar Pontuação".
    - [ ] Ao clicar em "Salvar Pontuação", fazer uma requisição `POST /api/ranking/save` com o nome e a pontuação final do jogo.

#### Etapa 4.2: Melhorias de UI/UX (Dev B)
- [ ] **Tarefa B4.2.1:** Implementar o desenho progressivo do boneco da forca.
    - [ ] Opção 1: Usar um único SVG e manipular suas partes com JavaScript (adicionar classes CSS ou mudar display de partes do SVG).
    - [ ] Opção 2: Ter várias imagens PNG/JPG do boneco em diferentes estágios de erro e trocar a `src` de uma `img` com base no `errors` do estado do jogo.
- [ ] **Tarefa B4.2.2:** Adicionar animações e transições CSS suaves entre as telas (Menu, Jogo, Fim) para uma experiência mais fluida.
- [ ] **Tarefa B4.2.3:** Estilizar os balões de "You won!" e "You were hanged!" com maior fidelidade ao template, incluindo a ponta do balão.
- [ ] **Tarefa B4.2.4:** Adicionar validação básica de entrada no Frontend (ex: desabilitar botões de letras já tentadas, impedir entrada de caracteres não alfabéticos no campo de palpite).
- [ ] **Tarefa B4.2.5:** Refinar o feedback visual para letras já tentadas no teclado virtual (cores diferentes para acerto/erro/tentada).

#### Etapa 4.3: Refinamento da Lógica (Dev B com suporte ao Dev A)
- [ ] **Tarefa B4.3.1:** Em `src/backend/main.py` e `game_logic.py`, adicionar tratamento de erros e validação de entrada mais robusta (ex: usar Pydantic models no FastAPI para validação de requisições).
- [ ] **Tarefa B4.3.2:** Em `game_logic.py`, implementar uma lógica de pontuação simples (ex: `score = (len(word) * 100) - (errors * 50)`). Retornar a pontuação no `get_game_state()`.
- [ ] **Tarefa A4.3.3 (Opcional):** Pesquisar e integrar com uma API de palavras externa para ter um vocabulário maior e mais dinâmico, se desejado.
- [ ] **Tarefa B4.3.4 (Opcional):** Implementar funcionalidade de "Dica" (se houver no template), que revele uma letra em troca de uma penalidade de pontuação ou erro.


### FASE 5: Testes e Deploy

**Objetivo:** Garantir a qualidade do jogo e disponibilizá-lo.

#### Etapa 5.1: Testes (Dev B - Líder, Dev A - Executor)
- [ ] **Tarefa B5.1.1:** Criar testes unitários básicos para a lógica do Backend (funções em `word_manager.py`, métodos da classe `GameSession` em `game_logic.py`). Usar `pytest`.
- [ ] **Tarefa B5.1.2:** Realizar testes manuais de ponta a ponta:
    - [ ] Verificar o fluxo completo do jogo (Menu -> Jogo -> Vitória/Derrota -> Ranking).
    - [ ] Testar todas as dificuldades.
    - [ ] Testar casos de erro (tentar letras repetidas, caracteres inválidos, esgotar erros).
    - [ ] Verificar a responsividade em diferentes tamanhos de tela (desktop, tablet, mobile) e orientações.
    - [ ] Testar a persistência do ranking.
- [ ] **Tarefa A5.1.3:** Executar testes de funcionalidade conforme roteiro detalhado fornecido pelo Dev B, reportando quaisquer bugs ou inconsistências.
- [ ] **Tarefa B5.1.4:** Correção de bugs encontrados durante os testes.

#### Etapa 5.2: Empacotamento e Deploy (Dev B)
- [ ] **Tarefa B5.2.1:** Otimizar e minificar arquivos estáticos (CSS, JS) para produção. Configurar o build do Tailwind para purgar CSS não utilizado.
- [ ] **Tarefa B5.2.2:** Configurar um servidor web (ex: Nginx) para servir os arquivos estáticos do Frontend (`index.html`, `style.css`, `app.js`).
- [ ] **Tarefa B5.2.3:** Empacotar a aplicação FastAPI para produção (ex: Dockerfile para conteinerização, ou configurar Gunicorn/Uvicorn para rodar a aplicação).
- [ ] **Tarefa B5.2.4:** Escolher e configurar o serviço de hospedagem. Sugestões:
    - [ ] **Frontend:** Vercel, Netlify (para arquivos estáticos).
    - [ ] **Backend:** Railway, Fly.io, Heroku (para a API FastAPI).
- [ ] **Tarefa B5.2.5:** Publicar o jogo online e verificar o funcionamento.


## 0. Estrutura Recomendada do Projeto e Organização de Assets

Para garantir escalabilidade, manutenibilidade e organização, adote a seguinte estrutura de pastas:

```plaintext
jogo-da-forca/
├── src/
│   ├── backend/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── word_manager.py
│   │   ├── game_logic.py
│   │   ├── ranking_manager.py
│   │   ├── models/                # Schemas Pydantic, modelos de dados
│   │   └── utils/                 # Funções utilitárias, helpers
│   └── frontend/
│       ├── index.html
│       ├── app.js
│       ├── components/            # JS modularizado (teclado, painel, modal, etc)
│       ├── styles/
│       │   ├── style.scss
│       │   └── tailwind.config.js
│       └── assets/
│           ├── images/            # Imagens do jogo (forca, boneco, fundo, ícones, etc)
│           ├── audio/             # Efeitos sonoros e música de fundo
│           └── fonts/             # Fontes customizadas
├── .gitignore
├── requirements.txt
├── README.md
└── docs/
    ├── documentation.md
    ├── documentation-dev.md
    └── jogo-da-forca-template.png
```

**Detalhes:**
- `assets/images/`: Armazene todos os PNG/JPG/JPEG do jogo (forca, boneco, fundos, ícones, etc).
- `assets/audio/`: Separe efeitos sonoros (ex: acerto, erro, vitória, derrota) e música de fundo. Use formatos mp3 ou ogg.
- `assets/fonts/`: Inclua fontes customizadas (ex: baixadas do Google Fonts ou outras licenças livres).
- `components/`: Separe JS de cada parte da UI (teclado, painel de informações, modal de ranking, etc). Use módulos ES6 (import/export) e funções puras sempre que possível.
- `styles/`: Centralize SCSS, Tailwind config e possíveis arquivos parciais para temas, variáveis e mixins.
- `backend/models/`: Schemas Pydantic, modelos de dados para validação e documentação automática da API.
- `backend/utils/`: Funções utilitárias, helpers para lógica comum.


## 0.1. Integração e Build de Assets

- [ ] Importe imagens e áudios via caminhos relativos nos componentes JS/HTML.
- [ ] Para fontes, utilize `@font-face` no SCSS ou importe via Google Fonts no `index.html`.
- [ ] Adicione instruções no `package.json` para copiar assets para a pasta de build, se necessário.
- [ ] No SCSS, use variáveis e mixins para cores, espaçamentos e responsividade.
- [ ] Para áudio, utilize a API nativa do HTML5 (`<audio>`) ou bibliotecas confiáveis como [Howler.js](https://howlerjs.com/) para controle avançado.


## 0.2. Melhores Práticas para Organização de Código JS

- [ ] Utilize módulos ES6 (`import`/`export`) para dividir funcionalidades (ex: teclado, painel, ranking, áudio).
- [ ] Prefira funções puras e composição de funções para lógica de UI.
- [ ] Separe lógica de manipulação de DOM da lógica de estado do jogo.
- [ ] Documente cada componente JS com JSDoc.
- [ ] Centralize constantes (ex: letras do alfabeto, caminhos de assets) em arquivos próprios.
- [ ] Use eventos customizados para comunicação entre componentes (ex: teclado dispara evento de letra, painel escuta e atualiza).


## 0.3. Integração de Áudio

- [ ] Separe arquivos de efeitos sonoros (acerto, erro, vitória, derrota) e música de fundo na pasta `assets/audio/`.
- [ ] Implemente um módulo JS (`audioManager.js`) para controlar reprodução, pausa, volume e troca de faixas.
- [ ] Permita ao usuário mutar/desmutar sons e música separadamente (UI de controle de áudio).
- [ ] Carregue áudios de forma assíncrona para não travar a UI.
- [ ] Documente no README como adicionar/remover áudios.

