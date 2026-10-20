# OpenCode Skills

Skills pessoais para o OpenCode, inicialmente focadas no fluxo de Pull Requests.

## Skills

### `check-rebase`

Verifica se a branch atual está atrás de `main`, sem alterar o working tree.

### `open-pr`

Faz o rebase da branch atual com a branch padrão, publica a branch, abre ou reutiliza o Pull Request, aguarda os checks, lista comentários automatizados do GitHub Copilot e Sonar e notifica o Teams somente quando todos os gates passam.

O fluxo executa rebase, push e criação do PR automaticamente quando solicitado. Ele respeita scripts, templates, labels e checklists oficiais do repositório, incluindo a categoria Ship/Show/Ask. Para quando há conflitos, falhas de push, falhas de autenticação, checks falhos, comentários automatizados acionáveis ou findings não classificados nos arquivos alterados. Comentários positivos do Copilot, Quality Gates aprovados do Sonar e findings aceitos/resolvidos são informados, mas não bloqueiam a notificação. A categoria pode ser informada, por exemplo, com `@{open-pr} show`.

### `teams-notify`

Envia manualmente uma mensagem ao Microsoft Teams usando um Adaptive Card e a variável de ambiente `TEAMS_WEBHOOK_URL`.

Uso no OpenCode V2:

```text
@{teams-notify} Minha mensagem manual
@{teams-notify} test
```

O envio manual não é automático. A notificação automática de PR é responsabilidade da skill `@{open-pr}` e só ocorre quando todos os gates passam.

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
