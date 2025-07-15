# Documentação do Projeto: Jogo da Forca Web

## 1. Visão Geral do Projeto

**Título do Projeto:** Jogo da Forca Web

**Objetivo:**  
Desenvolver uma versão web interativa do clássico jogo da forca, com foco na fidelidade visual ao template fornecido. O jogo deve proporcionar uma experiência de usuário fluida, com transições suaves entre telas e feedback visual claro.

### Game Flow Principal

- **Menu Inicial:** O jogador seleciona a dificuldade e inicia uma nova partida.
- **Tela de Jogo:** Exibe o painel da palavra, teclado virtual, desenho da forca e painéis de informação.
- **Tela de Encerramento:** Mostra o resultado (vitória ou derrota) e opções para jogar novamente ou salvar pontuação.

### Funcionalidades Chave

- Seleção de dificuldade (Fácil, Médio, Difícil)
- Teclado virtual interativo
- Desenho progressivo do boneco da forca
- Feedback visual para letras corretas e erradas
- Painéis de informação (letras adivinhadas, ranking)
- Sistema de ranking (opcional, mas planejado)

---

## 2. Arquitetura do Projeto

A arquitetura será baseada em uma SPA (Single Page Application) leve, com Backend RESTful API. A interface do usuário será carregada uma única vez, e as transições entre telas serão gerenciadas via JavaScript. A lógica principal do jogo e o gerenciamento de dados ficarão sob responsabilidade de uma API Python no servidor.

### 2.1. Estrutura Recomendada de Pastas e Organização de Assets

Para garantir organização, escalabilidade e facilitar a manutenção, adote a seguinte estrutura de pastas:

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

---

### 2.2. Frontend (Cliente - Navegador)

**Responsabilidade:**  
Apresentação da interface, interatividade e comunicação com o backend.

#### Tecnologias e Implementação

- **HTML:**  
  Estrutura básica da aplicação em um único arquivo `index.html`, com `divs` para cada tela do jogo (`#menu-screen`, `#game-screen`, `#ending-screen`). A visibilidade das telas será controlada via JavaScript. Elementos visuais estruturados com HTML semântico.

- **CSS (Tailwind CSS e Sass):**  
  - **Tailwind CSS:** Framework utilitário para estilização rápida e responsiva, aplicando classes diretamente nos elementos HTML.
  - **Sass (SCSS):** Pré-processador para organização e modularidade, uso de variáveis, mixins e aninhamento de seletores. O Sass será o ponto de entrada para as diretivas do Tailwind.
  - **Responsividade:** Flexbox, Grid, Media Queries e classes responsivas do Tailwind para adaptação a diferentes tamanhos de tela.
  - **Organização:** Utilize a pasta `styles/` para centralizar SCSS, Tailwind config e arquivos parciais para temas, variáveis e mixins.

- **JavaScript (Vanilla JS, Modularizado):**  
  - **Gerenciamento de UI State:** Controle de telas visíveis via manipulação de classes CSS.
  - **Interatividade:** Captura de eventos de clique (dificuldade, letras, jogar novamente) e entradas de texto (salvar ranking).
  - **Componentização:** Separe funcionalidades em módulos ES6 dentro da pasta `components/` (ex: teclado, painel, ranking, áudio). Prefira funções puras e composição de funções para lógica de UI. Use eventos customizados para comunicação entre componentes.
  - **Comunicação com Backend:** Uso de `fetch()` para requisições HTTP assíncronas (GET, POST) aos endpoints do FastAPI.
  - **Atualização do DOM:** Atualização dinâmica dos elementos HTML conforme respostas do backend (preenchimento de traços, desenho da forca, mensagens de vitória/derrota, ranking).
  - **Centralização de Constantes:** Centralize letras do alfabeto, caminhos de assets e outros dados em arquivos próprios.

- **Assets (Imagens, Áudio, Fontes):**
  - **Imagens:** Armazene na pasta `assets/images/` (formatos PNG/JPG/JPEG). Use para forca, boneco, fundos, ícones, etc.
  - **Áudio:** Separe efeitos sonoros (acerto, erro, vitória, derrota) e música de fundo em `assets/audio/`. Utilize a API nativa do HTML5 (`<audio>`) ou bibliotecas como Howler.js para controle avançado. Implemente um módulo JS (`audioManager.js`) para controlar reprodução, pausa, volume e troca de faixas. Permita ao usuário mutar/desmutar sons e música separadamente.
  - **Fontes:** Inclua fontes customizadas em `assets/fonts/` e importe via `@font-face` no SCSS ou Google Fonts no `index.html`.

---

### 2.3. Backend (Servidor)

**Responsabilidade:**  
Gerenciamento da lógica central do jogo, armazenamento de dados e exposição de uma API para o frontend.

#### Tecnologia e Implementação

- **Python com FastAPI:**  
  FastAPI será utilizado para construir a API RESTful do jogo, aproveitando sua performance, tipagem forte e documentação automática.

#### Estrutura de Módulos

- `main.py`: Ponto de entrada da aplicação FastAPI, definição dos endpoints.
- `word_manager.py`: Gerenciamento das listas de palavras por dificuldade e seleção aleatória.
- `game_logic.py`: Lógica do jogo, com classe `GameSession` para gerenciar o estado da partida (palavra secreta, letras adivinhadas, erros, status).
- `ranking_manager.py`: Persistência e recuperação dos dados de ranking (JSON local).
- `models/`: Schemas Pydantic para validação e documentação automática da API.
- `utils/`: Funções utilitárias e helpers.

#### Endpoints da API

- `POST /api/game/start`: Inicia um novo jogo, recebendo a dificuldade.
- `POST /api/game/guess`: Envia um palpite de letra, recebendo a letra e o ID da sessão.
- `GET /api/ranking`: Obtém a lista de pontuações do ranking.
- `POST /api/ranking/save`: Salva uma nova pontuação no ranking após vitória.

**Gerenciamento de Estado:**  
O estado de cada partida ativa será mantido no backend, via sessões HTTP ou um dicionário simples mapeando IDs de sessão para objetos `GameSession`.

---

### 2.4. Fluxo de Comunicação

1. **Carregamento Inicial:**  
   O navegador solicita `index.html` ao servidor (FastAPI ou Nginx), que carrega `style.css` e `app.js`.
2. **Interação do Frontend:**  
   O JavaScript (`app.js`) gerencia a UI, exibindo o menu inicial.
3. **Início do Jogo:**  
   O usuário seleciona a dificuldade. O JavaScript envia um `POST` para `/api/game/start`.
4. **Lógica do Jogo no Backend:**  
   O FastAPI recebe a requisição, usa o `word_manager` para escolher uma palavra, inicializa uma `GameSession` e retorna o estado inicial do jogo.
5. **Atualização do Frontend:**  
   O JavaScript recebe o estado, esconde o menu, mostra a tela de jogo e renderiza a palavra, teclado e outros elementos.
6. **Palpites:**  
   O usuário clica em uma letra. O JavaScript envia um `POST` para `/api/game/guess` com a letra.
7. **Processamento do Palpite:**  
   O FastAPI processa o palpite, atualiza o estado (letras reveladas, erros), verifica vitória/derrota e retorna o novo estado.
8. **Renderização Dinâmica:**  
   O JavaScript atualiza a UI conforme o novo estado (preenche traços, atualiza o desenho da forca, marca letras).
9. **Fim do Jogo:**  
   Se houver vitória ou derrota, o JavaScript transiciona para a tela de encerramento, exibindo mensagem final e opções de ranking/novo jogo.

---

Esta arquitetura garante uma separação clara de responsabilidades, permitindo que cada parte do sistema seja desenvolvida e mantida de forma independente, colaborando para uma experiência de jogo coesa e visualmente fiel.