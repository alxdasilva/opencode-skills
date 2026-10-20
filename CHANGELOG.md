# Changelog

## [0.1.0] - 2026-10-20

Primeira versão formal das skills pessoais do OpenCode.

### Adicionado

- `@{check-rebase}` para verificar a divergência da branch em relação à branch principal sem alterar o working tree;
- `@{open-pr}` para rebase, publicação, abertura ou reutilização de Pull Requests e acompanhamento dos checks;
- classificação `Ship / Show / Ask` conforme o contrato dos repositórios consumidores;
- preservação de scripts, templates, labels e checklists oficiais de cada repositório;
- diagnóstico de falhas de pipeline por workflow, check, job e step;
- inspeção de findings em arquivos alterados e na visualização **Files changed**;
- distinção entre comentários positivos e findings acionáveis do Copilot e do Sonar;
- notificação automática do Teams somente após todos os gates do Pull Request passarem;
- `@{teams-notify}` para envio manual de mensagens usando Adaptive Cards;
- proteção de webhook por meio da variável de ambiente `TEAMS_WEBHOOK_URL`.

### Regras da notificação automática

A notificação automática não é enviada quando existe falha, interrupção, conflito, comentário acionável, finding não aceito ou finding sem status conhecido.

Quality Gate aprovado, comentário positivo, finding aceito ou finding resolvido são reportados, mas não bloqueiam a notificação.
