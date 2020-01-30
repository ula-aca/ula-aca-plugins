# Universal Ledger Agent - Aries Cloudagent Present Proof Plugin

This package handles everything that has to do with presenting and exchanging Verifiable Presentations. It has classes to perform proof related actions as well as to listen for proof exchange events.

## Usage

### PresentProofController

```typescript
import { EventHandler } from 'universal-ledger-agent'
import { PresentProofController } from '@ula-aca/present-proof'

const presentProofController = new PresentProofController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([presentProofController])
```

#### @ula-aca/present-proof/get-all-exchange-records

Fetch all present-proof exchange records.

```typescript
import { EventHandler, UlaResponse, Message } from 'universal-ledger-agent'
import {
  PresentProofController,
  PresentProofMessageTypes,
  GetPresentationExchangeRecordsMessage,
  GetPresentationExchangeRecordsResult
} from '@ula-aca/present-proof'

const presentProofController = new PresentProofController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([presentProofController])

const message = new Message({
  type: PresentProofMessageTypes.GET_EXCHANGE_RECORDS,
  body: {}
} as GetPresentationExchangeRecordsMessage)
eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: GetPresentationExchangeRecordsResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/present-proof/get-exchange-record-by-id

Fetch a single presentation exchange record.

```typescript
import { EventHandler, UlaResponse, Message } from 'universal-ledger-agent'
import {
  PresentProofController,
  PresentProofMessageTypes,
  GetPresentationExchangeRecordByIdMessage,
  GetPresentationExchangeRecordByIdResult
} from '@ula-aca/present-proof'

const presentProofController = new PresentProofController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([presentProofController])

const message = new Message({
  type: PresentProofMessageTypes.GET_EXCHANGE_RECORD_BY_ID,
  body: {
    presentation_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  }
} as GetPresentationExchangeRecordByIdMessage)

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: GetPresentationExchangeRecordByIdResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/present-proof/get-presentation-request-credentials

Fetch credentials for a presentation request from wallet.

```typescript
import { EventHandler, UlaResponse, Message } from 'universal-ledger-agent'
import {
  PresentProofController,
  PresentProofMessageTypes,
  GetPresentationRequestCredentialsMessage,
  GetPresentationRequestCredentialsResult
} from '@ula-aca/present-proof'

const presentProofController = new PresentProofController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([presentProofController])

const message = new Message({
  type: PresentProofMessageTypes.GET_PRESENTATION_REQUEST_CREDENTIALS,
  body: {
    presentation_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  }
} as GetPresentationRequestCredentialsMessage)

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: GetPresentationRequestCredentialsIdResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/present-proof/get-presentation-request-credentials-with-referent

Fetch credentials for a presentation request from wallet.

```typescript
import { EventHandler, UlaResponse, Message } from 'universal-ledger-agent'
import {
  PresentProofController,
  PresentProofMessageTypes,
  GetPresentationRequestCredentialsByReferentIdResult,
  GetPresentationRequestCredentialsByReferentIdMessage
} from '@ula-aca/present-proof'

const presentProofController = new PresentProofController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([presentProofController])

const message = new Message({
  type:
    PresentProofMessageTypes.GET_PRESENTATION_REQUEST_CREDENTIALS_WITH_REFERENT,
  body: {
    presentation_exchange_id: '5717-4562-b3fc-2c963f66afa6-3fa85f64',
    referent: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  }
} as GetPresentationRequestCredentialsByReferentIdMessage)

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: GetPresentationRequestCredentialsByReferentIdResult =
      response.body
    console.log(result)
  }
})
```

#### @ula-aca/present-proof/send-proposal

Sends a presentation proposal.

```typescript
import { EventHandler, UlaResponse, Message } from 'universal-ledger-agent'
import {
  PresentProofController,
  PresentProofMessageTypes,
  SendPresentationProposalMessage,
  SendPresentationProposalResult
} from '@ula-aca/present-proof'

const presentProofController = new PresentProofController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([presentProofController])

const message = new Message({
  type: PresentProofMessageTypes.SEND_PROPOSAL,
  body: {
    connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    presentation_proposal: {
      '@type':
        'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/present-proof/1.0/presentation-preview',
      attributes: [
        {
          name: 'favourite_drink',
          cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          'mime-type': 'image/jpeg',
          value: 'martini'
        }
      ],
      predicates: [
        {
          name: 'high_score',
          cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
          predicate: '>=',
          threshold: 0
        }
      ]
    },
    comment: 'string',
    auto_present: true
  }
} as SendPresentationProposalMessage)

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: SendPresentationProposalResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/present-proof/create-presentation-request

Creates a presentation request not bound to any proposal or existing connection.

```typescript
import { EventHandler, UlaResponse, Message } from 'universal-ledger-agent'
import {
  PresentProofController,
  PresentProofMessageTypes,
  CreatePresentationRequestMessage,
  CreatePresentationRequestResult
} from '@ula-aca/present-proof'

const presentProofController = new PresentProofController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([presentProofController])

const message = new Message({
  type: PresentProofMessageTypes.CREATE_PRESENTATION_REQUEST,
  body: {
    connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    comment: 'string',
    proof_request: {
      name: 'Proof request',
      requested_attributes: {
        additionalProp1: {
          name: 'favouriteDrink',
          restrictions: [
            {
              schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
              issuer_did: 'WgWxqztrNooG92RXvxSTWv',
              cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
              schema_name: 'transcript',
              schema_version: '1.0',
              schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
              credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
            }
          ],
          non_revoked: {
            to_epoch: 1576152338,
            from_epoch: 1576152338
          }
        }
      },
      nonce: '1234567890',
      requested_predicates: {
        additionalProp1: {
          name: 'index',
          restrictions: [
            {
              schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
              issuer_did: 'WgWxqztrNooG92RXvxSTWv',
              cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
              schema_name: 'transcript',
              schema_version: '1.0',
              schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
              credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
            }
          ],
          non_revoked: {
            to_epoch: 1576152338,
            from_epoch: 1576152338
          }
        }
      },
      version: '1.0'
    }
  }
} as CreatePresentationRequestMessage)

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: CreatePresentationRequestResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/present-proof/send-request

Sends a free presentation request not bound to any proposal.

```typescript
import { EventHandler, UlaResponse, Message } from 'universal-ledger-agent'
import {
  PresentProofController,
  PresentProofMessageTypes,
  SendPresentationRequestMessage,
  SendPresentationRequestResult
} from '@ula-aca/present-proof'

const presentProofController = new PresentProofController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([presentProofController])

const message = new Message({
  type: PresentProofMessageTypes.SEND_REQUEST,
  body: {
    connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    comment: 'string',
    proof_request: {
      name: 'Proof request',
      requested_attributes: {
        additionalProp1: {
          name: 'favouriteDrink',
          restrictions: [
            {
              schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
              issuer_did: 'WgWxqztrNooG92RXvxSTWv',
              cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
              schema_name: 'transcript',
              schema_version: '1.0',
              schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
              credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
            }
          ],
          non_revoked: {
            to_epoch: 1576152338,
            from_epoch: 1576152338
          }
        }
      },
      nonce: '1234567890',
      requested_predicates: {
        additionalProp1: {
          name: 'index',
          restrictions: [
            {
              schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
              issuer_did: 'WgWxqztrNooG92RXvxSTWv',
              cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
              schema_name: 'transcript',
              schema_version: '1.0',
              schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
              credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
            }
          ],
          non_revoked: {
            to_epoch: 1576152338,
            from_epoch: 1576152338
          }
        }
      },
      version: '1.0'
    }
  }
} as SendPresentationRequestMessage)

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: SendPresentationRequestResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/present-proof/send-proof-presentation-request-by-id

Sends a presentation request in reference to a proposal.

```typescript
import { EventHandler, UlaResponse, Message } from 'universal-ledger-agent'
import {
  PresentProofController,
  PresentProofMessageTypes,
  SendPresentationRequestByIdMessage,
  SendPresentationRequestByIdResult
} from '@ula-aca/present-proof'

const presentProofController = new PresentProofController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([presentProofController])

const message = new Message({
  type: PresentProofMessageTypes.SEND_REQUEST_BY_ID,
  body: {
    presentation_exchange_id: '2c65f66afa6-5717-4562-b3fc-2c9635717b2',
    connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    comment: 'string',
    proof_request: {
      name: 'Proof request',
      requested_attributes: {
        additionalProp1: {
          name: 'favouriteDrink',
          restrictions: [
            {
              schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
              issuer_did: 'WgWxqztrNooG92RXvxSTWv',
              cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
              schema_name: 'transcript',
              schema_version: '1.0',
              schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
              credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
            }
          ],
          non_revoked: {
            to_epoch: 1576152338,
            from_epoch: 1576152338
          }
        }
      },
      nonce: '1234567890',
      requested_predicates: {
        additionalProp1: {
          name: 'index',
          restrictions: [
            {
              schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
              issuer_did: 'WgWxqztrNooG92RXvxSTWv',
              cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
              schema_name: 'transcript',
              schema_version: '1.0',
              schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
              credential_definition_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag'
            }
          ],
          non_revoked: {
            to_epoch: 1576152338,
            from_epoch: 1576152338
          }
        }
      },
      version: '1.0'
    }
  }
} as SendPresentationRequestByIdMessage)

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: SendPresentationRequestByIdResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/present-proof/send-presentation

Sends a proof presentation.

```typescript
import { EventHandler, UlaResponse, Message } from 'universal-ledger-agent'
import {
  PresentProofController,
  PresentProofMessageTypes,
  SendPresentationMessage,
  SendPresentationResult
} from '@ula-aca/present-proof'

const presentProofController = new PresentProofController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([presentProofController])

const message = new Message({
  type: PresentProofMessageTypes.SEND_PRESENTATION,
  body: {
    presentation_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    self_attested_attributes: {
      additionalProp1: 'self_attested_value',
      additionalProp2: 'self_attested_value',
      additionalProp3: 'self_attested_value'
    },
    requested_attributes: {
      additionalProp1: {
        revealed: true,
        cred_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      }
    },
    requested_predicates: {
      additionalProp1: {
        cred_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      }
    }
  }
} as SendPresentationMessage)

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: SendPresentationResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/present-proof/verify-presentation

Verify a received presentation.

```typescript
import { EventHandler, UlaResponse, Message } from 'universal-ledger-agent'
import {
  PresentProofController,
  PresentProofMessageTypes,
  VerifyPresentationMessage,
  VerifyPresentationResult
} from '@ula-aca/present-proof'

const presentProofController = new PresentProofController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([presentProofController])

const message = new Message({
  type: PresentProofMessageTypes.VERIFY_PRESENTATION,
  body: {
    presentation_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  }
} as VerifyPresentationMessage)

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: VerifyPresentationResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/present-proof/remove-exchange-record

Remove an existing presentation exchange record.

```typescript
import { EventHandler, UlaResponse, Message } from 'universal-ledger-agent'
import {
  PresentProofController,
  PresentProofMessageTypes,
  RemovePresentationExchangeRecordMessage
} from '@ula-aca/present-proof'

const presentProofController = new PresentProofController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([presentProofController])

const message = new Message({
  type: PresentProofMessageTypes.REMOVE_EXCHANGE_RECORD,
  body: {
    presentation_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  }
} as RemovePresentationExchangeRecordMessage)

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // record removed
  }
})
```

### ConnectionEventHandler

In order to react to incoming presentation exchange events, we need to setup out event handler. This package exposes an _abstract_ class `PresentProofEventHandler` that you can extend to implement this behavior. The Aries Cloudagent-Py emits an event whenever there is a change to the state of an agent's presentation exchange record. Therefore there is a callback method for every presentation exchange record state possible. These are: `proposal_sent`, `proposal_received`, `request_sent`, `request_received`, `presentation_sent`, `presentation_received` and `verified`.

There is also a callback method for incoming basic message events.

```typescript
import { PresentProofEventHandler } from '@ula-aca/present-proof'
import { EventHandler } from 'universal-ledger-agent'
import { WebhookRelayEventRouter } from '@ula-aca/webhook-relay-event-router'
import {
  PresentationExchangeRecordProposalSent,
  PresentationExchangeRecordProposalReceived,
  PresentationExchangeRecordRequestSent,
  PresentationExchangeRecordRequestReceived,
  PresentationExchangeRecordPresentationSent,
  PresentationExchangeRecordPresentationReceived,
  PresentationExchangeRecordVerified
} from '@ula-aca/webhook-event-models'

class ProofEventHandler extends PresentProofEventHandler {
  onProposalSent(
    message: PresentationExchangeRecordProposalSent
  ): Promise<void> {
    // presentation exchange record state changed to 'proposal_sent'
  }
  onProposalReceived(
    message: PresentationExchangeRecordProposalReceived
  ): Promise<void> {
    // presentation exchange record state changed to 'proposal_received'
  }
  onRequestSent(message: PresentationExchangeRecordRequestSent): Promise<void> {
    // presentation exchange record state changed to 'request_sent'
  }
  onRequestReceived(
    message: PresentationExchangeRecordRequestReceived
  ): Promise<void> {
    // presentation exchange record state changed to 'request_received'
  }
  onPresentationSent(
    message: PresentationExchangeRecordPresentationSent
  ): Promise<void> {
    // presentation exchange record state changed to 'presentation_sent'
  }
  onPresentationReceived(
    message: PresentationExchangeRecordPresentationReceived
  ): Promise<void> {
    // presentation exchange record state changed to 'presentation_received'
  }
  onVerified(message: PresentationExchangeRecordVerified): Promise<void> {
    // presentation exchange record state changed to 'verified'
  }
}

// set up the event router
const eventRouter = new WebhookRelayEventRouter(
  'https://webhook-relay-urk.com',
  {
    Authorization: 'your auth token'
  }
)
// initialize the proof event handler
const proofHandler = new ProofEventHandler()

const eventHandler = new EventHandler([eventRouter, proofHandler])
```
