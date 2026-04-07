# 💙 Homenagem para Luciene — Guia de Deploy

## Estrutura de Arquivos

```
/
├── index.html       ← Página principal (não editar, exceto texto)
├── style.css        ← Estilos visuais
├── script.js        ← Animações, partículas, música
├── foto.jpg         ← ⚠️ VOCÊ PRECISA ADICIONAR
├── musica.mp3       ← ⚠️ VOCÊ PRECISA ADICIONAR
└── README.md        ← Este arquivo
```

---

## Passo 1 — Adicione sua foto e música

1. Coloque a **foto de Luciene** na pasta e renomeie para `foto.jpg`
2. Coloque o **arquivo de música** na pasta e renomeie para `musica.mp3`

> Caso prefira usar outros nomes, edite as linhas correspondentes em `index.html`:
>
> - Foto: `<img src="foto.jpg" ...>`
> - Música: `<source src="musica.mp3" ...>`

---

## Passo 2 — Personalizar (opcional)

No arquivo `index.html`, procure pelos comentários `── TROQUE`:

| O que mudar          | Onde fica                                            |
| -------------------- | ---------------------------------------------------- |
| Foto                 | `<img src="foto.jpg" ...>`                           |
| Nome do destinatário | `<h1 class="carta-nome">Luciene</h1>`                |
| Texto da carta       | Parágrafos dentro de `<main class="carta-body">`     |
| Nome da remetente    | `<p class="assinatura-nome">Milena</p>`              |
| Cargo da remetente   | `<p class="assinatura-cargo">Vice Secretária...</p>` |
| Arquivo de música    | `<source src="musica.mp3" ...>`                      |

---

## Passo 3 — Deploy no Vercel

### Opção A: Pelo site (mais fácil)

1. Acesse [vercel.com](https://vercel.com) e crie uma conta gratuita
2. Clique em **"Add New → Project"**
3. Escolha **"Deploy without a Git repository"**
4. Arraste a pasta inteira (com todos os arquivos) para o campo de upload
5. Clique em **Deploy** — pronto! ✅

### Opção B: Via GitHub

1. Crie um repositório no GitHub e suba os arquivos
2. No Vercel, conecte sua conta GitHub
3. Selecione o repositório → Deploy automático ✅

---

## Testando localmente (antes de publicar)

Você pode usar a extensão **Live Server** no VS Code, ou rodar:

```bash
# Com Python 3:
python -m http.server 3000
# Abra: http://localhost:3000
```

> **Atenção:** Abrir o `index.html` diretamente no navegador (sem servidor) pode bloquear o carregamento da música por questões de segurança do browser.

---

## Tecnologias usadas

- HTML5 + CSS3 + JavaScript puro (sem frameworks, sem backend)
- Google Fonts: Cormorant Garamond, Lora, Dancing Script
- Canvas API para estrelas e partículas

---

_Feito com 💙 para uma pessoa muito especial._
