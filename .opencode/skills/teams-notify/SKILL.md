---
name: Teams Notify
description: Envia manualmente uma mensagem ao Microsoft Teams usando um Adaptive Card e o webhook definido em TEAMS_WEBHOOK_URL.
metadata:
  opencode/autoinvoke: false
---

# Teams Notify

Use esta skill quando o usuário invocar `@{teams-notify}` para enviar uma mensagem manual, testar ou ajustar a integração com o Microsoft Teams.

## Formas de uso

- `@{teams-notify} <mensagem>`: envia a mensagem informada para o Teams.
- `@{teams-notify} test`: envia uma notificação de teste pelo webhook configurado.
- `@{teams-notify}`: interpreta a intenção descrita pelo usuário e executa a operação correspondente.

Esta skill é manual. Ela não monitora sessões nem envia notificações automaticamente.

Se existir `.opencode/plugins/teams-notifier/index.ts` criado por uma versão anterior desta skill, trate-o como uma instalação antiga de notificação automática: inspecione-o antes de manter, remover ou substituir para evitar mensagens duplicadas.

## Segurança

1. Exija `TEAMS_WEBHOOK_URL` no ambiente antes de configurar ou testar.
2. Nunca grave a URL do webhook em arquivos, commits, logs ou mensagens do Teams.
3. Nunca inclua o valor da URL em respostas ou saídas de comandos.
4. Se a URL aparecer em um chat, log ou commit, recomende regenerar o webhook.

## Procedimento de envio

1. Verifique se `TEAMS_WEBHOOK_URL` está definida sem imprimir seu valor.
2. Preserve a mensagem informada pelo usuário, sem inventar conteúdo adicional.
3. Envie um Adaptive Card para o webhook usando `curl` ou uma biblioteca padrão disponível no ambiente.
4. Não crie plugin, arquivo de configuração ou variável persistente para um envio manual.

Uma implementação sem dependências externas pode usar a biblioteca padrão do Python:

```bash
python3 - "$MENSAGEM" <<'PY'
import json
import os
import sys
import urllib.request

payload = {
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.2",
    "body": [{"type": "TextBlock", "text": sys.argv[1], "wrap": True}],
}

request = urllib.request.Request(
    os.environ["TEAMS_WEBHOOK_URL"],
    data=json.dumps(payload).encode(),
    headers={"Content-Type": "application/json"},
    method="POST",
)

with urllib.request.urlopen(request) as response:
    print(f"HTTP_STATUS={response.status}")
PY
```

## Procedimento de teste

Quando o usuário pedir um teste:

1. Verifique `TEAMS_WEBHOOK_URL` sem exibi-la.
2. Envie um Adaptive Card simples com `curl` ou com o mesmo formato usado pelo template.
3. Mostre somente o código HTTP e uma conclusão sanitizada.
4. Considere `202 Accepted` como webhook aceito pelo Power Automate, mas peça confirmação de que a mensagem apareceu no Teams.

Payload de teste:

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.2",
  "body": [
    {
      "type": "TextBlock",
      "text": "✅ Teste de integração OpenCode → Teams",
      "wrap": true
    }
  ]
}
```

## Contrato do workflow

O workflow deve usar uma ação do Teams que aceite Adaptive Card, como `PostCardToConversation`. A skill envia o cartão completo, não um objeto simples `{ "text": "..." }`.

Se o workflow usar uma ação de mensagem simples, adapte o template para enviar somente o texto. Não altere o payload sem verificar qual operação do Teams está configurada.

## Resultado obrigatório

Ao terminar, informe:

- se a mensagem foi enviada;
- se `TEAMS_WEBHOOK_URL` estava configurada, sem revelar o valor;
- o resultado do teste, quando solicitado;
- que a entrega no Teams ainda precisa ser confirmada visualmente quando o webhook retornar apenas `202`.
