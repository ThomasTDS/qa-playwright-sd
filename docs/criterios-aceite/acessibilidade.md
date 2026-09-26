# Acessibilidade (Passiva)

Cenários executáveis: `features/accessibility.feature`.

> Assim como a suíte de segurança, esta feature observa uma aplicação de terceiros — não temos como corrigir as violações encontradas. Por isso os cenários **não quebram o build**: violações `critical`/`serious` são anexadas ao relatório HTML como documentação, não como falha de teste. O valor aqui é ter visibilidade contínua sobre o nível de acessibilidade da aplicação sob teste a cada execução, mesmo sem poder agir sobre ela.

## História de Usuário

- **Como** responsável pela qualidade do produto
- **Quero** monitorar se as páginas principais têm violações graves de acessibilidade (padrão WCAG, via [axe-core](https://github.com/dequelabs/axe-core-npm))
- **Para** ter visibilidade sobre a experiência de usuários com deficiência, mesmo em uma aplicação que não controlamos

### Critério 1 – Página de login sem violações críticas (TC-016)

- **Dado** que estou na página de login
- **Quando** a página é analisada pelo axe-core
- **Então** violações de impacto `critical` ou `serious` encontradas devem ser documentadas no relatório (sem falhar o cenário)

### Critério 2 – Página de produtos sem violações críticas (TC-017)

- **Dado** que estou na página de produtos
- **Quando** a página é analisada pelo axe-core
- **Então** violações de impacto `critical` ou `serious` encontradas devem ser documentadas no relatório (sem falhar o cenário)
