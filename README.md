# Jogo da Forca Web

Uma versão web interativa do clássico jogo da forca, com foco em fidelidade visual ao template, experiência de usuário fluida e arquitetura modular.

## Objetivo
Desenvolver um jogo da forca web responsivo, com transições suaves, feedback visual e sonoro, ranking local e fácil manutenção.

## Principais Funcionalidades
- Seleção de dificuldade (Fácil, Médio, Difícil)
- Teclado virtual interativo
- Desenho progressivo do boneco da forca
- Feedback visual e sonoro para acertos/erros
- Ranking local
- UI responsiva e fiel ao template

## Estrutura de Pastas
```plaintext
jogo-da-forca/
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

## Instalação e Execução

### Backend (FastAPI)
1. Crie e ative um ambiente virtual Python:
   ```bash
   python -m venv venv
   source venv/bin/activate  # ou venv\Scripts\activate no Windows
   ```
2. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
3. Execute o backend:
   ```bash
   cd src/backend
   uvicorn main:app --reload
   ```

### Frontend
1. Instale Node.js e npm.
2. Instale as dependências do frontend:
   ```bash
   cd src/frontend
   npm install
   ```
3. Compile o CSS (Tailwind/Sass):
   ```bash
   npm run build:css
   ```
4. Abra o `index.html` em um servidor local (ex: Live Server, Vite, ou similar).

## Documentação
- [Documentação Geral](docs/documentation.md)
- [Documentação de Desenvolvimento](docs/documentation-dev.md)

## Licença
MIT 