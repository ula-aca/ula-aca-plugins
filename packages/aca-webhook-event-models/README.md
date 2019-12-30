# `connections`

This package handles everything that has todo with connections. It has classes to perform connection related actions aswell as to listen for connection connection events.

> **ATTENTION**: Relative to the ACA-Py Swagger API, this package handles everything related to the `/connections` endpoint. Thus it also handles TrustPing and BasicMessage functionality. The groups shown in the Swagger Web Interface can be misleading.

## Usage

### ConnectionEventHandler

In order to react to incoming connection events, we need to setup out event handler. This package exposes an _abstract_ class `ConnectionEventHandler` that you can extend to implement this behavior. The Aries Cloudagent-Py emits an event whenever there is a change to the state of an agent's connection record. Therefore there is a callback method for every connection state possible. These are: `init`, `invitation`, `request`, `response`, `active`, `inactive` and `error`.

There is also a callback method for incoming basic message events.
3

```typescript
import {
  ConnectionEventHandler,
  ConnectionEvent
  BasicMessageEvent
  } from '@ula-aca/connection'

class ConnectionHandler extends ConnectionEventHandler {

  async onInit(message: ConnectionEvent): Promise<void> {
    // connection record state changed to 'init'

    this.eventHandler.processMsg('example-message', () => {}) // use this.eventHandler to call the ULA ✉️
  }
  async onInvitation(message: ConnectionEvent): Promise<void> {
    // connection record state changed to 'invitation'
  }
  async onRequest(message: ConnectionEvent): Promise<void> {
    // connection record state changed to 'request'
  }
  async onResponse(message: ConnectionEvent): Promise<void> {
    // connection record state changed to 'response'
  }
  async onActive(message: ConnectionEvent): Promise<void> {
    // connection record state changed to 'active'
  }
  async onError(message: ConnectionEvent): Promise<void> {
    // connection record state changed to 'error'
  }
  async onInactive(message: ConnectionEvent): Promise<void> {
    // connection record state changed to 'inactive'
  }
  async onBasicMessage(message: BasicMessageEvent): Promise<void> {
    // basic message received
  }
}

```

### ConnectionController

#### get-all-connections

properties:
returns

```typescript
await universal_ledger_agent.processMsg(
  { type: 'create-invitation' },
  (response: UlaResponse) => {
    const connection_id = response.body.connection_id
    const invitation = response.body.invitation
  }
)
```
