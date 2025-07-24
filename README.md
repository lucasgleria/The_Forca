# 💾 The Forca: O Clássico Jogo da Forca Renascido para a Web\!

Uma reimaginação moderna e interativa do clássico Jogo da Forca, disponível para jogar no seu navegador. Este projeto colaborativo combina Python (FastAPI) no backend com Vanilla JavaScript, Tailwind CSS e SCSS no frontend para uma experiência fluida e envolvente.

[![Licença](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.3.0-green.svg)]()
[![Status](https://img.shields.io/badge/status-concluido-greend.svg)]()
[![Deploy](https://img.shields.io/badge/deploy-active-green.svg)](https://lnkd.in/dnqVD68U)

## 📌 Sumário

1.  [Sobre o Projeto](https://www.google.com/search?q=%23-sobre-o-projeto)
2.  [Objetivos](https://www.google.com/search?q=%23-objetivos)
3.  [Tecnologias](https://www.google.com/search?q=%23-tecnologias)
4.  [Funcionalidades](https://www.google.com/search?q=%23-funcionalidades)
5.  [Pré-requisitos](https://www.google.com/search?q=%23%25EF%25B8%258F-pr%C3%A9-requisitos)
6.  [Instalação](https://www.google.com/search?q=%23%25EF%25B8%258F-instala%C3%A7%C3%A3o)
7.  [Como Utilizar](https://www.google.com/search?q=%23-como-utilizar)
8.  [Estrutura do Projeto](https://www.google.com/search?q=%23-estrutura-do-projeto)
9.  [Contribuição](https://www.google.com/search?q=%23-contribui%C3%A7%C3%A3o)
10. [Licença](https://www.google.com/search?q=%23-licen%C3%A7a)
11. [Contato](https://www.google.com/search?q=%23-contato)
12. [Recursos Adicionais](https://www.google.com/search?q=%23-recursos-adicionais)

## 💻 Sobre o Projeto

O **The Forca** é mais do que um simples jogo; é a evolução de um projeto CLI (Command Line Interface) original, concebido por Ana Paula Monteiro, que foi modernizado e adaptado para a web em um esforço colaborativo. Nosso objetivo foi dar uma nova vida a essa ideia, implementando uma **interface gráfica rica** e **recursos aprimorados** para torná-lo acessível a todos os entusiastas do clássico jogo da forca.

  * **Motivação**: Trazer o clássico Jogo da Forca para a era da web com uma interface moderna, interativa e responsiva, mantendo a essência do original.
  * **Público-alvo**: Jogadores que buscam uma experiência envolvente do Jogo da Forca online e desenvolvedores interessados em arquitetura de SPA com Python/FastAPI e frontend moderno.

## 🎯 Objetivos

### 🛠️ Técnicos

  * Desenvolver um **Jogo da Forca web responsivo**, com foco em fidelidade visual ao design proposto e uma **experiência de usuário fluida**.
  * Implementar uma **arquitetura modular** com um **Backend RESTful API em FastAPI (Python)** e um **Frontend em Vanilla JavaScript, Tailwind CSS e SCSS**.
  * Garantir **performance otimizada** e **separação clara de responsabilidades** entre backend e frontend.
  * Prover **feedback visual e sonoro** claro, **teclado virtual interativo** e **desenho progressivo do boneco da forca**.

## 🚀 Tecnologias

**Núcleo do Sistema**

  * **Python**
  * **FastAPI**
  * **Vanilla JavaScript**
  * **Tailwind CSS**
  * **SCSS**

## ✨ Funcionalidades

  * ✅ **Seleção de Dificuldade**: Escolha entre **Fácil, Médio e Difícil** para ajustar o desafio.
  * ✅ **Teclado Virtual Interativo**: Facilita a interação em diferentes dispositivos.
  * ✅ **Desenho Progressivo do Boneco da Forca**: Feedback visual imersivo a cada erro, fiel ao clássico.
  * ✅ **Feedback Visual e Sonoro**: Indicação clara de acertos e erros para uma experiência envolvente.
  * ✅ **Ranking Local**: Monitore seu desempenho e compare com outros jogadores.
  * ✅ **Interface Responsiva e Acessível**: Jogue em qualquer dispositivo\! A interface é **totalmente responsiva**, garantindo uma experiência fluida em desktops e dispositivos móveis.

## ⚙️ Pré-requisitos

  * **Python 3.9+** (para o backend)
  * **Node.js (versão 18 ou superior)** e **npm** (para o frontend)
  * Conexão estável à internet (para download de dependências)

## 🛠️ Instalação

### 1\. Clone o repositório

```bash
git clone https://github.com/AnaMonteirodev/The_Forca.git
cd The_Forca
```

### 2\. Instale o Python 3.9+ e o Node.js (versão 18 ou superior)

  * [Download Python](https://www.python.org/downloads/)
  * [Download Node.js](https://nodejs.org/)

### 3\. Configure o ambiente do backend (FastAPI)

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

### 4\. Configure o ambiente do frontend

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
```

## ❗ Como Utilizar

Após a instalação, você precisará iniciar o backend e o frontend em terminais separados para que o jogo funcione.

### 1\. Inicie o backend (em um terminal separado)

```bash
cd src/backend
uvicorn main:app --reload
```

### 2\. Inicie o frontend

Você tem duas opções para iniciar o frontend:

  * **Recomendado para desenvolvimento (roda servidor local E o watcher do CSS juntos):**

    ```bash
    cd src/frontend
    npm run start:all
    ```

    Isso irá iniciar o servidor local (`http.server`) na porta `8008` e o Tailwind em modo `watch`.

  * **Se preferir rodar separadamente:**

    ```bash
    cd src/frontend
    npm run start:server    # Só o servidor local
    npm run start:css       # Só o watcher do CSS (em outro terminal)
    ```

### 3\. Acesse o jogo no navegador

  * Com ambos os servidores em execução, acesse **[http://localhost:8008](https://www.google.com/search?q=http://localhost:8008)** no seu navegador.
  * Certifique-se de que o CSS está sendo aplicado corretamente e o jogo está interativo.

### ▶️ Demonstração

  * **Jogue agora e teste suas habilidades**: [The Forca Online](https://lnkd.in/dnqVD68U)

*(Insira um GIF do jogo aqui, se disponível, no estilo do template)*

## 📂 Estrutura do Projeto

```plaintext
jogo-da-forca/
├── src/
│   ├── backend/
│   │   ├── main.py
│   │   ├── word_manager.py
│   │   ├── game_logic.py
│   │   ├── ranking_manager.py
│   │   ├── models/
│   │   └── utils/
│   └── frontend/
│       ├── index.html
│       ├── app.js
│       ├── components/
│       ├── styles/
│       └── assets/
│           ├── images/
│           ├── audio/
│           └── fonts/
├── docs/
│   ├── documentation.md
│   ├── documentation-dev.md
│   └── jogo-da-forca-template.png
├── README.md
└── CHANGELOG.md
```

## 🤝 Contribuição

Contribuições são bem-vindas! Siga estas etapas:

### **1. Reporte Bugs**
- Abra uma [issue](https://github.com/AnaMonteirodev/the_forca/issues) no GitHub
- Descreva o problema detalhadamente
- Inclua logs e screenshots se possível

### **2. Sugira Melhorias**
- Envie ideias através de issues
- Proponha novas funcionalidades
- Discuta melhorias de arquitetura

### **3. Desenvolva**
- Faça um fork do projeto
- Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
- Faça suas alterações seguindo os padrões do projeto
- Adicione testes para novas funcionalidades
- Faça commit (`git commit -m 'feat: nova funcionalidade'`)
- Envie um Pull Request

## 📜 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

Para dúvidas, sugestões ou para saber mais sobre o projeto, sinta-se à vontade para entrar em contato com os principais colaboradores:

- **Autor**: [Lucas Leria](https://github.com/lucasgleria)
- **Colaboradora**: [Ana Monteiro](https://github.com/AnaMonteirodev)

## 🔍 Recursos Adicionais

  * [Documentação Geral do Projeto](https://www.google.com/search?q=docs/documentation.md)
  * [Documentação de Desenvolvimento](https://www.google.com/search?q=docs/documentation-dev.md)
  * [Python Documentation](https://docs.python.org/3/) - Documentação oficial do Python
  * [FastAPI Documentation](https://fastapi.tiangolo.com/) - Documentação oficial do FastAPI
  * [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Documentação oficial do Tailwind CSS
  * [MDN Web Docs (JavaScript)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Documentação para Vanilla JavaScript