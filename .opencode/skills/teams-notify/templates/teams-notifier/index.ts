// This file is a portable OpenCode template. Its @opencode/plugin and runtime
// types are supplied by the OpenCode project where the skill installs it.
// @ts-nocheck

import { Plugin } from "@opencode/plugin"

type SessionStatusEvent = {
  type: string
  properties?: {
    sessionID?: string
    status?: string | { type?: string }
  }
}

function getStatus(event: SessionStatusEvent): string | undefined {
  const status = event.properties?.status

  if (typeof status === "string") {
    return status
  }

  return status?.type
}

function adaptiveCard(message: string) {
  return {
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    type: "AdaptiveCard",
    version: "1.2",
    body: [
      {
        type: "TextBlock",
        text: message,
        wrap: true,
      },
    ],
  }
}

async function notifyTeams(webhookUrl: string, message: string) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(adaptiveCard(message)),
  })

  if (!response.ok) {
    throw new Error(`Teams webhook returned HTTP ${response.status}`)
  }
}

export default Plugin.define({
  id: "teams-notifier",

  setup(ctx) {
    const webhookUrl = process.env.TEAMS_WEBHOOK_URL

    if (!webhookUrl) {
      console.warn("[teams-notifier] TEAMS_WEBHOOK_URL is not configured")
      return
    }

    const controller = new AbortController()
    const previousStatus = new Map<string, string | undefined>()
    const debugEvents = process.env.TEAMS_NOTIFY_DEBUG_EVENTS === "true"
    const project = ctx.location.project.directory

    void (async () => {
      for await (const rawEvent of ctx.event.subscribe({
        signal: controller.signal,
      })) {
        const event = rawEvent as SessionStatusEvent

        if (debugEvents) {
          console.log(`[teams-notifier] event=${event.type}`)
        }

        if (event.type !== "session.status") {
          continue
        }

        const sessionID = event.properties?.sessionID
        const status = getStatus(event)

        if (!sessionID || !status) {
          continue
        }

        const priorStatus = previousStatus.get(sessionID)
        previousStatus.set(sessionID, status)

        if (status !== "idle" || priorStatus === "idle") {
          continue
        }

        const message = [
          "✅ Execução do OpenCode finalizada",
          `Projeto: ${project}`,
          `Sessão: ${sessionID}`,
        ].join("\n")

        try {
          await notifyTeams(webhookUrl, message)
        } catch (error) {
          console.error("[teams-notifier] notification failed", error)
        }
      }
    })().catch((error) => {
      if (!controller.signal.aborted) {
        console.error("[teams-notifier] event listener failed", error)
      }
    })

    return () => controller.abort()
  },
})
