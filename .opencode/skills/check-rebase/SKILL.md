---
name: Check Rebase
description: Verifica se a branch atual está sincronizada com main e informa se o rebase é necessário, sem alterar o working tree.
metadata:
  opencode/autoinvoke: false
---

# Check Rebase

Use esta skill quando o usuário pedir para verificar se a branch precisa de rebase com `main`.

## Procedimento

1. Identifique a branch atual e o remote upstream.
2. Pare se a branch atual for `main` ou `master`; informe que não há uma branch de trabalho para comparar.
3. Verifique se o working tree está limpo. Se houver alterações locais, informe-as e continue apenas com operações de leitura.
4. Atualize a referência da branch principal:

   ```bash
   git fetch origin main
   ```

5. Calcule a divergência entre `HEAD` e `origin/main`:

   ```bash
   git rev-list --left-right --count origin/main...HEAD
   ```

   O primeiro número é a quantidade de commits que faltam na branch atual; o segundo é a quantidade de commits exclusivos da branch atual.

6. Informe um destes estados:
   - atualizada: zero commits atrás;
   - precisa de rebase: há commits em `origin/main` que não estão na branch;
   - divergente: há commits dos dois lados;
   - sem commits próprios: a branch não tem trabalho para abrir um PR.

7. Não execute `rebase`, `merge`, `push`, `reset` ou qualquer alteração no working tree. Se um rebase for necessário, mostre:

   ```bash
   git rebase origin/main
   ```

## Resultado obrigatório

Responda com a branch, o alvo comparado, a quantidade de commits atrás/à frente e a recomendação objetiva. Se não for possível buscar `origin/main`, informe o erro sem concluir que a branch está atualizada.
