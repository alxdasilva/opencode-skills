# OpenCode Skills

Skills pessoais para o OpenCode, inicialmente focadas no fluxo de Pull Requests.

## Skills

### `check-rebase`

Verifica se a branch atual está atrás de `main`, sem alterar o working tree.

### `open-pr`

Faz o rebase da branch atual com a branch padrão, publica a branch, abre ou reutiliza o Pull Request, aguarda os checks e lista comentários automatizados do GitHub Copilot e Sonar.

O fluxo executa rebase, push e criação do PR automaticamente quando solicitado. Ele para em conflitos, falhas de push, falhas de autenticação ou checks falhos.

### `teams-notify`

Configura um plugin local do OpenCode para enviar uma notificação ao Microsoft Teams quando uma execução terminar, usando um Adaptive Card e a variável de ambiente `TEAMS_WEBHOOK_URL`.

Uso no OpenCode V2:

```text
@{teams-notify} configure
@{teams-notify} test
```

Depois da configuração, o plugin envia as notificações automaticamente. A skill não precisa ser invocada ao final de cada execução.

## Instalação local

Clone este repositório em uma pasta local e registre o diretório `.opencode/skills` no `opencode.json` global ou copie esse diretório para o projeto:

```bash
git clone git@github.com:alxdasilva/opencode-skills.git ~/projects/opencode-skills
```

No arquivo global de configuração do OpenCode, adicione a pasta de skills:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "skills": ["~/projects/opencode-skills/.opencode/skills"]
}
```

Para uso em um projeto específico:

```bash
cp -R .opencode/skills /caminho/do/projeto/.opencode/
```

As skills são explicitamente invocadas com `@{check-rebase}`, `@{open-pr}` e `@{teams-notify}`.

## Pré-requisitos

- OpenCode V2;
- Git;
- GitHub CLI (`gh`), autenticado;
- acesso SSH ao repositório GitHub;
- permissão para consultar checks, reviews e comentários do Pull Request.
