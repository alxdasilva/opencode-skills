# OpenCode Skills

Skills pessoais para o OpenCode, inicialmente focadas no fluxo de Pull Requests.

## Skills

### `check-rebase`

Verifica se a branch atual está atrás de `main`, sem alterar o working tree.

### `open-pr`

Faz o rebase da branch atual com a branch padrão, publica a branch, abre ou reutiliza o Pull Request, aguarda os checks e lista comentários automatizados do GitHub Copilot e Sonar.

O fluxo executa rebase, push e criação do PR automaticamente quando solicitado. Ele para em conflitos, falhas de push, falhas de autenticação ou checks falhos.

## Instalação local

Clone este repositório em uma pasta global de skills do OpenCode ou copie `.opencode/skills` para o projeto:

```bash
git clone git@github.com:alxdasilva/opencode-skills.git ~/.config/opencode/skills/alxdasilva-opencode-skills
```

Para uso em um projeto específico:

```bash
cp -R .opencode/skills /caminho/do/projeto/.opencode/
```

As skills são explicitamente invocadas com `/check-rebase` e `/open-pr`.

## Pré-requisitos

- OpenCode V2;
- Git;
- GitHub CLI (`gh`), autenticado;
- acesso SSH ao repositório GitHub;
- permissão para consultar checks, reviews e comentários do Pull Request.
