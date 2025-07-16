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

## Passo a Passo para Instalação e Configuração (Desenvolvedores)

Siga exatamente os passos abaixo para garantir que o ambiente funcione sem erros:

### 1. Clone o repositório
```bash
git clone https://github.com/AnaMonteirodev/The_Forca.git
cd The_Forca
```

### 2. Instale o Python 3.9+ e o Node.js (versão 18 ou superior)
- [Python Download](https://www.python.org/downloads/)
- [Node.js Download](https://nodejs.org/)

### 3. Configure o ambiente do backend (FastAPI)
```bash
# Crie e ative o ambiente virtual Python
python -m venv venv
# No Windows:
venv\Scripts\activate
# No Linux/Mac:
source venv/bin/activate

# Instale as dependências do backend
pip install -r requirements.txt
```

### 4. Configure o ambiente do frontend
```bash
cd src/frontend
# Instale as dependências do frontend
npm install
# (Opcional, mas recomendado) Instale o concurrently para rodar múltiplos scripts juntos
npm install -D concurrently
# Garanta que a versão do Tailwind seja 3.4.3
npm install -D tailwindcss@3.4.3 postcss autoprefixer sass

# Gere o arquivo de configuração do Tailwind (se ainda não existir)
npx tailwindcss init -p

# Para rodar o servidor local E o watcher do CSS juntos (recomendado para desenvolvimento):
npm run start:all
# Isso irá iniciar o servidor local (http.server) na porta 8008 e o Tailwind em modo watch.
# Acesse http://localhost:8008 no navegador.

# Se preferir rodar separadamente:
npm run start:server   # Só o servidor local
npm run start:css      # Só o watcher do CSS
```

### 5. Inicie o backend (num terminal diferente)
```bash
cd src/backend
uvicorn main:app --reload
```

### 6. Inicie o frontend
- Acesse [http://localhost:8008](http://localhost:8008) no navegador.
- Certifique-se de que o CSS está sendo aplicado corretamente.

### 7. Pronto!
- O ambiente está configurado para desenvolvimento.
- Se tiver dúvidas, consulte a documentação em `docs/` ou peça ajuda ao Dev B.

## Documentação
- [Documentação Geral](docs/documentation.md)
- [Documentação de Desenvolvimento](docs/documentation-dev.md)