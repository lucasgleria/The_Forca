# Guia de Deploy Automático (CI/CD) — Render (Backend) & Vercel (Frontend)

Este guia mostra como configurar o deploy automático do seu projeto usando **Render** para o backend (FastAPI) e **Vercel** para o frontend (Node.js/estático), ambos gratuitos e integrados ao GitHub.

---

## Sumário
- [Pré-requisitos](#pré-requisitos)
- [Deploy do Backend (FastAPI) no Render](#deploy-do-backend-fastapi-no-render)
- [Deploy do Frontend (Node.js/estático) no Vercel](#deploy-do-frontend-nodejsestático-no-vercel)
- [Dicas e Manutenção](#dicas-e-manutenção)

---

## Pré-requisitos
- Conta no [GitHub](https://github.com/)
- Conta no [Render](https://render.com/)
- Conta no [Vercel](https://vercel.com/)
- Repositório já hospedado no GitHub

---

## Deploy do Backend (FastAPI) no Render

1. **Acesse o [Render](https://render.com/)** e faça login.
2. Clique em **"New +" > "Web Service"**.
3. Conecte sua conta do GitHub e autorize o acesso ao repositório.
4. Selecione o repositório do projeto.
5. Preencha os campos:
   - **Name:** (ex: the-forca-backend)
   - **Root Directory:** `src/backend`
   - **Environment:** Python 3.9+
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port 10000`
   - **Port:** `10000` (ou mantenha o padrão 8000, mas ajuste o Start Command)
6. Clique em **"Create Web Service"**.
7. O Render irá instalar as dependências e iniciar o deploy automaticamente.
8. Após o deploy, anote a URL pública do backend (ex: `https://the-forca-backend.onrender.com`).

> **Dica:** Toda vez que fizer push na branch main, o Render fará o deploy automático.

---

## Deploy do Frontend (Node.js/estático) no Vercel

1. **Acesse o [Vercel](https://vercel.com/)** e faça login.
2. Clique em **"Add New... > Project"**.
3. Conecte sua conta do GitHub e importe o repositório.
4. Configure:
   - **Root Directory:** `src/frontend`
   - **Framework Preset:** `Other` (ou `React` se for o caso)
   - **Build Command:** `npm install && npm run build` (ou apenas `npm install` se não houver build)
   - **Output Directory:** `src/frontend` ou `dist` (ajuste conforme seu build)
5. Clique em **"Deploy"**.
6. Após o deploy, anote a URL pública do frontend (ex: `https://the-forca-frontend.vercel.app`).

> **Dica:** Toda vez que fizer push na branch main, o Vercel fará o deploy automático.


---

## Dicas e Manutenção
- **Variáveis de ambiente:** Configure-as nas plataformas se necessário (Render: Settings > Environment; Vercel: Project Settings > Environment Variables).
- **Logs:** Ambas as plataformas oferecem logs em tempo real para debug.
- **Deploy manual:** É possível disparar deploy manualmente nas interfaces web.
- **Domínio personalizado:** Tanto Render quanto Vercel permitem adicionar domínio próprio gratuitamente.
- **Limitações:** Serviços gratuitos podem dormir após inatividade ou ter limites de uso.

---

## Referências
- [Documentação Render](https://render.com/docs)
- [Documentação Vercel](https://vercel.com/docs) 