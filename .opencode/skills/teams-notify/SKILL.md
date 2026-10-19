---
name: Teams Notify
description: Configura um plugin local do OpenCode para enviar ao Microsoft Teams uma notificação quando uma execução terminar, usando um webhook em TEAMS_WEBHOOK_URL.
metadata:
  opencode/autoinvoke: false
---

# Teams Notify

Use esta skill quando o usuário invocar `@{teams-notify}` para configurar, testar ou ajustar uma notificação do OpenCode para o Microsoft Teams.

## Formas de uso

- `@{teams-notify} configure`: instala ou atualiza o plugin local no projeto atual.
- `@{teams-notify} test`: envia uma notificação de teste pelo webhook configurado.
- `@{teams-notify}`: interpreta a intenção descrita pelo usuário e executa a operação correspondente.

Depois da configuração, o plugin envia a notificação automaticamente. O usuário não precisa invocar a skill ao final de cada execução.

## Segurança

1. Exija `TEAMS_WEBHOOK_URL` no ambiente antes de configurar ou testar.
2. Nunca grave a URL do webhook em arquivos, commits, logs ou mensagens do Teams.
3. Nunca inclua o valor da URL em respostas ou saídas de comandos.
4. Se a URL aparecer em um chat, log ou commit, recomende regenerar o webhook.

## Procedimento de configuração

1. Verifique se `TEAMS_WEBHOOK_URL` está definida sem imprimir seu valor.
2. Leia `templates/teams-notifier/index.ts` desta skill.
3. Crie ou atualize `.opencode/plugins/teams-notifier/index.ts` no projeto atual com o conteúdo do template.
4. Preserve alterações locais existentes no projeto; não sobrescreva um plugin diferente sem inspecioná-lo.
5. Explique que o plugin é local, usa apenas `fetch` e é carregado automaticamente pelo OpenCode.
6. Oriente o usuário a reiniciar ou recarregar o OpenCode para carregar o plugin.

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

O workflow deve usar uma ação do Teams que aceite Adaptive Card, como `PostCardToConversation`. O plugin envia o cartão completo, não um objeto simples `{ "text": "..." }`.

Se o workflow usar uma ação de mensagem simples, adapte o template para enviar somente o texto. Não altere o payload sem verificar qual operação do Teams está configurada.

## Resultado obrigatório

Ao terminar, informe:

- se o plugin foi criado ou atualizado;
- o caminho do arquivo criado;
- se `TEAMS_WEBHOOK_URL` estava configurada, sem revelar o valor;
- como reiniciar/recarregar o OpenCode;
- o resultado do teste, quando solicitado;
- que a entrega no Teams ainda precisa ser confirmada visualmente quando o webhook retornar apenas `202`.
