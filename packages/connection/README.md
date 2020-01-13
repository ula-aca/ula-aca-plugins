# Universal Ledger Agent - Aries Cloudagent Connection Plugin

This package handles everything that has to do with establishing and maintaining connections. It has classes to perform connection related actions aswell as to listen for connection events.

> **ATTENTION**: Relative to the ACA-Py Swagger API, this package handles everything related to the `/connections` endpoint. Thus it also handles TrustPing and BasicMessage functionality. The groups shown in the Swagger Web Interface can be misleading.

## Usage

### ConnectionController

```typescript
import { EventHandler } from 'universal-ledger-agent'
import { ConnectionController } from '@ula-aca/connection'

const ledgerController = new LedgerController('https://aca-py-url.com')

const eventHandler = new EventHandler([ledgerController])
```

#### @ula-aca/connection/get-all-connections

Query agent-to-agent connections.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  ConnectionController,
  GetConnectionsMessage,
  ConnectionMessageTypes,
  GetConnectionsResult
} from '@ula-aca/connection'

const connectionController = new ConnectionController('https://aca-py-url.com')

const eventHandler = new EventHandler([connectionController])

const message: GetConnectionsMessage = {
  type: ConnectionMessageTypes.GET_CONNECTIONS,
  body: {}
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: GetConnectionsResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/connection/get-connection-by-id

Fetch a single connection record.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  ConnectionController,
  ConnectionMessageTypes,
  GetConnectionByIdMessage,
  GetConnectionByIdResult
} from '@ula-aca/connection'

const connectionController = new ConnectionController('https://aca-py-url.com')

const eventHandler = new EventHandler([connectionController])

const message: GetConnectionByIdMessage = {
  type: ConnectionMessageTypes.GET_CONNECTION_BY_ID,
  body: {
    connection_id: '25e0602d-aa2b-4685-bf03-084e1c27818c'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /ledger/register-nym POST api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/connection/get_connections__id_
    const result: GetConnectionByIdResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/connection/create-invitation

Create a new connection invitation.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  ConnectionController,
  ConnectionMessageTypes,
  CreateInvitationMessage,
  CreateInvitationResult
} from '@ula-aca/connection'

const connectionController = new ConnectionController('https://aca-py-url.com')

const eventHandler = new EventHandler([connectionController])

const message: CreateInvitationMessage = {
  type: ConnectionMessageTypes.CREATE_INVITATION,
  body: {}
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /ledger/register-nym POST api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/connection/post_connections_create_invitation
    const result: CreateInvitationResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/connection/receive-invitation

Receive a new connection invitation.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  ConnectionController,
  ConnectionMessageTypes,
  ReceiveInvitationMessage,
  ReceiveInvitationBody,
  ReceiveInvitationResult
} from '@ula-aca/connection'

const connectionController = new ConnectionController('https://aca-py-url.com')

const eventHandler = new EventHandler([connectionController])

// in a real world scenario, this object is created and sent to us
// by the other party.
const invitation: ReceiveInvitationBody = {
  recipientKeys: ['H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV'],
  did: 'WgWxqztrNooG92RXvxSTWv',
  routingKeys: ['H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV'],
  label: 'Bob',
  imageUrl: 'http://192.168.56.101/img/logo.jpg',
  serviceEndpoint: 'http://192.168.56.101:8020'
}

const message: ReceiveInvitationMessage = {
  type: ConnectionMessageTypes.RECEIVE_INVITATION,
  body: invitation
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: ReceiveInvitationResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/connection/accept-invitation

Accept a stored connection invitation.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  ConnectionController,
  ConnectionMessageTypes,
  AcceptInvitationMessage,
  AcceptInvitationResult
} from '@ula-aca/connection'

const connectionController = new ConnectionController('https://aca-py-url.com')

const eventHandler = new EventHandler([connectionController])

const message: AcceptInvitationMessage = {
  type: ConnectionMessageTypes.ACCEPT_INVITATION,
  body: {
    connection_id: '25e0602d-aa2b-4685-bf03-084e1c27818'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: AcceptInvitationResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/connection/accept-request

Accept a stored connection request.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  ConnectionController,
  ConnectionMessageTypes,
  AcceptRequestMessage,
  AcceptRequestResult
} from '@ula-aca/connection'

const connectionController = new ConnectionController('https://aca-py-url.com')

const eventHandler = new EventHandler([connectionController])

const message: AcceptRequestMessage = {
  type: ConnectionMessageTypes.ACCEPT_REQUEST,
  body: {
    connection_id: '25e0602d-aa2b-4685-bf03-084e1c27818'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: AcceptRequestResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/connection/establish-inbound

Assign another connection as the inbound connection.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  ConnectionController,
  ConnectionMessageTypes,
  EstablishInboundMessage
} from '@ula-aca/connection'

const connectionController = new ConnectionController('https://aca-py-url.com')

const eventHandler = new EventHandler([connectionController])

const message: EstablishInboundMessage = {
  type: ConnectionMessageTypes.ESTABLISH_INBOUND,
  body: {
    connection_id: '25e0602d-aa2b-4685-bf03-084e1c27818',
    ref_id: '3e79f7b6-bbd7-4b05-8c97-981b6e0e106b'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // inbound set
  }
})
```

#### @ula-aca/connection/remove-connection

Remove an existing connection record.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  ConnectionController,
  ConnectionMessageTypes,
  RemoveConnectionMessage
} from '@ula-aca/connection'

const connectionController = new ConnectionController('https://aca-py-url.com')

const eventHandler = new EventHandler([connectionController])

const message: RemoveConnectionMessage = {
  type: ConnectionMessageTypes.REMOVE_CONNECTION,
  body: {
    connection_id: '25e0602d-aa2b-4685-bf03-084e1c27818'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // connection removed
  }
})
```

#### @ula-aca/connection/send-ping

Send a trust ping to a connection.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  ConnectionController,
  ConnectionMessageTypes,
  SendPingMessage
} from '@ula-aca/connection'

const connectionController = new ConnectionController('https://aca-py-url.com')

const eventHandler = new EventHandler([connectionController])

const message: SendPingMessage = {
  type: ConnectionMessageTypes.SEND_PING,
  body: {
    connection_id: '25e0602d-aa2b-4685-bf03-084e1c27818'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // ping sent
  }
})
```

#### @ula-aca/connection/basic-message

Send a basic message to a connection.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  ConnectionController,
  ConnectionMessageTypes,
  SendPingMessage,
  SendBasicMessageMessage
} from '@ula-aca/connection'

const connectionController = new ConnectionController('https://aca-py-url.com')

const eventHandler = new EventHandler([connectionController])

const message: SendBasicMessageMessage = {
  type: ConnectionMessageTypes.SEND_BASIC_MESSAGE,
  body: {
    connection_id: '25e0602d-aa2b-4685-bf03-084e1c27818',
    content: 'hi there!'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // message sent
  }
})
```

### ConnectionEventHandler

In order to react to incoming connection events, we need to setup out event handler. This package exposes an _abstract_ class `ConnectionEventHandler` that you can extend to implement this behavior. The Aries Cloudagent-Py emits an event whenever there is a change to the state of an agent's connection record. Therefore there is a callback method for every connection state possible. These are: `init`, `invitation`, `request`, `response`, `active`, `inactive` and `error`.

There is also a callback method for incoming basic message events.

```typescript
import { ConnectionEventHandler } from '@ula-aca/connection'
import { EventHandler } from 'universal-ledger-agent'
import WebhookRelayEventRouter from '@ula-aca/webhook-relay-event-router'

import {
  BasicMessage,
  PairwiseConnectionRecordInvitation,
  PairwiseConnectionRecordRequest,
  PairwiseConnectionRecordResponse,
  PairwiseConnectionRecordActive,
  PairwiseConnectionRecordInactive,
  PairwiseConnectionRecordError,
  PairwiseConnectionRecordInit
} from '@ula-aca/aca-webhook-event-models'

class ConnectionHandler extends ConnectionEventHandler {
  onInit(message: PairwiseConnectionRecordInit): Promise<void> {
    // connection record state changed to 'init'
  }
  onInvitation(message: PairwiseConnectionRecordInvitation): Promise<void> {
    // connection record state changed to 'invitation'
  }
  onRequest(message: PairwiseConnectionRecordRequest): Promise<void> {
    // connection record state changed to 'request'
  }
  onResponse(message: PairwiseConnectionRecordResponse): Promise<void> {
    // connection record state changed to 'response'
  }
  onActive(message: PairwiseConnectionRecordActive): Promise<void> {
    // connection record state changed to 'active'
  }
  onInactive(message: PairwiseConnectionRecordInactive): Promise<void> {
    // connection record state changed to 'inactive'
  }
  onError(message: PairwiseConnectionRecordError): Promise<void> {
    // connection record state changed to 'error'
  }
  onBasicMessage(message: BasicMessage): Promise<void> {
    // basic message received
  }
}

// set up the event router
const eventRouter = new WebhookRelayEventRouter(
  'https://webhook-relay-urk.com',
  {
    Authorization: 'your auth token'
  }
)
// initialize the issue event handler
const issueHandler = new ConnectionHandler()

const eventHandler = new EventHandler([eventRouter, issueHandler])
```
