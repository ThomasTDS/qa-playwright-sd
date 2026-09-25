# Imagem oficial do Playwright, com os navegadores (Chromium, Firefox, WebKit)
# e suas dependências de sistema já instalados. A tag da imagem precisa
# acompanhar a versão do pacote "playwright" no package.json.
FROM mcr.microsoft.com/playwright:v1.63.0-noble

WORKDIR /app

# HUSKY=0 evita que o script "prepare" (husky) tente instalar o
# git hook de pre-commit dentro da imagem, onde não há repositório git.
ENV HUSKY=0

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV HEADLESS=true

CMD ["npm", "test"]
