# Universal Ledger Agent - Aries Cloudagent Webhook Relay Event Router

This plugin creates a WebSocket connection with a [Aries Cloudagent Webhook Relay](https://github.com/ula-aca/aries-cloudagent-webhook-relay) and will emit received events to the Universal Ledger Agent. You should always use this package in combination with one of the event handlers in [`@ula-aca/issue-credential`](npmjs.com/package/@ula-aca/issue-credential), [`@ula-aca/present-proof`](npmjs.com/package/@ula-aca/present-proof) or [`@ula-aca/connection`](npmjs.com/package/@ula-aca/connection)

## Usage

As mentioned above you should always use this plugin in combination with one of the event handlers mentioned above. See the documentation of the event handler your want to use for specific usage documentation.

> You must have

```typescript
import { EventHandler } from 'universal-ledger-agent'
import { WebhookRelayEventRouter } from '@ula-aca/webhook-relay-event-router'

const eventRouter = new WebhookRelayEventRouter(
  'ws://webhook-relay-url.com/ws',
  {
    Authorization: 'your auth token'
  }
)

const eventHandler = new EventHandler([eventRouter])
```
