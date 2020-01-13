# Universal Ledger Agent - Aries Cloudagent Connection Plugin

This package handles everything that has to do with issueing and exchanging credentials. It has classes to perform connection related actions aswell as to listen for credential exchnage events.

## Usage

### ConnectionController

```typescript
import { EventHandler } from 'universal-ledger-agent'
import { ConnectionController } from '@ula-aca/connection'

const ledgerController = new LedgerController('https://aca-py-url.com')

const eventHandler = new EventHandler([ledgerController])
```

#### @ula-aca/issue-credential/get-meme-types

Get attribute MIME types from wallet.

> Currently there is an issue with this request
> ACA-py does not return anything.

```typescript
```

#### @ula-aca/issue-credential/get-all-exchange-records

Fetch all credential exchange records.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  IssueCredentialController,
  IssueCredentialMessageTypes,
  GetExchangeRecordsMessage,
  GetExchangeRecordsResult
} from '@ula-aca/issue-credential'

const issueCredentialController = new IssueCredentialController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([issueCredentialController])

const message: GetExchangeRecordsMessage = {
  type: IssueCredentialMessageTypes.GET_EXCHANGE_RECORDS,
  body: {}
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: GetExchangeRecordsResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/issue-credential/get-exchange-record-by-id

Fetch a single credential exchange record.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  IssueCredentialController,
  IssueCredentialMessageTypes,
  GetExchangeRecordByIdMessage,
  GetExchangeRecordByIdResult
} from '@ula-aca/issue-credential'

const issueCredentialController = new IssueCredentialController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([issueCredentialController])

const message: GetExchangeRecordByIdMessage = {
  type: IssueCredentialMessageTypes.GET_EXCHANGE_RECORD_BY_ID,
  body: {
    credential_exchange_id: ''
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: GetExchangeRecordByIdResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/issue-credential/send-credential

Send credential, automating entire flow.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  IssueCredentialController,
  IssueCredentialMessageTypes,
  SendCredentialMessage,
  SendCredentialResult
} from '@ula-aca/issue-credential'

const issueCredentialController = new IssueCredentialController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([issueCredentialController])

const message: SendCredentialMessage = {
  type: IssueCredentialMessageTypes.SEND_CREDENTIAL,
  body: {
    schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
    credential_proposal: {
      attributes: [
        {
          name: 'favourite_drink',
          'mime-type': 'image/jpeg',
          value: 'martini'
        }
      ]
    },
    issuer_did: 'WgWxqztrNooG92RXvxSTWv',
    connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    comment: 'string',
    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
    schema_name: 'preferences',
    schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
    schema_version: '1.0'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: SendCredentialResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/issue-credential/send-proposal

Send issuer a credential proposal.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  IssueCredentialController,
  IssueCredentialMessageTypes,
  SendProposalMessage,
  SendProposalResult
} from '@ula-aca/issue-credential'

const issueCredentialController = new IssueCredentialController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([issueCredentialController])

const message: SendProposalMessage = {
  type: IssueCredentialMessageTypes.SEND_PROPOSAL,
  body: {
    schema_id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
    credential_proposal: {
      attributes: [
        {
          name: 'favourite_drink',
          'mime-type': 'image/jpeg',
          value: 'martini'
        }
      ]
    },
    issuer_did: 'WgWxqztrNooG92RXvxSTWv',
    connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    comment: 'string',
    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
    schema_name: 'preferences',
    schema_issuer_did: 'WgWxqztrNooG92RXvxSTWv',
    schema_version: '1.0'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: SendProposalResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/issue-credential/send-offer

Send holder a credential offer, free from reference to any proposal.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  IssueCredentialController,
  IssueCredentialMessageTypes,
  SendOfferMessage,
  SendOfferResult
} from '@ula-aca/issue-credential'

const issueCredentialController = new IssueCredentialController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([issueCredentialController])

const message: SendOfferMessage = {
  type: IssueCredentialMessageTypes.SEND_OFFER,
  body: {
    connection_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    comment: 'string',
    cred_def_id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
    credential_preview: {
      attributes: [
        {
          name: 'favourite_drink',
          'mime-type': 'image/jpeg',
          value: 'martini'
        }
      ]
    },
    auto_issue: true
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: SendOfferResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/issue-credential/send-offer-by-id

Send holder a credential offer in reference to a proposal.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  IssueCredentialController,
  IssueCredentialMessageTypes,
  SendOfferByIdMessage,
  SendOfferByIdResult
} from '@ula-aca/issue-credential'

const issueCredentialController = new IssueCredentialController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([issueCredentialController])

const message: SendOfferByIdMessage = {
  type: IssueCredentialMessageTypes.SEND_OFFER_BY_ID,
  body: {
    credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: SendOfferByIdResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/issue-credential/send-request

Send a credential request.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  IssueCredentialController,
  IssueCredentialMessageTypes,
  SendRequestMessage,
  SendRequestResult
} from '@ula-aca/issue-credential'

const issueCredentialController = new IssueCredentialController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([issueCredentialController])

const message: SendRequestMessage = {
  type: IssueCredentialMessageTypes.SEND_REQUEST,
  body: {
    credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: SendRequestResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/issue-credential/issue

Send a credential.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  IssueCredentialController,
  IssueCredentialMessageTypes,
  IssueMessage,
  IssueResult
} from '@ula-aca/issue-credential'

const issueCredentialController = new IssueCredentialController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([issueCredentialController])

const message: IssueMessage = {
  type: IssueCredentialMessageTypes.ISSUE,
  body: {
    credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    credential_preview: {
      attributes: [
        {
          name: 'favourite_drink',
          'mime-type': 'image/jpeg',
          value: 'martini'
        }
      ]
    },
    comment: 'string'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: IssueResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/issue-credential/store

Store a received credential.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  IssueCredentialController,
  IssueCredentialMessageTypes,
  StoreMessage,
  StoreResult
} from '@ula-aca/issue-credential'

const issueCredentialController = new IssueCredentialController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([issueCredentialController])

const message: StoreMessage = {
  type: IssueCredentialMessageTypes.STORE,
  body: {
    credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    const result: StoreResult = response.body
    console.log(result)
  }
})
```

#### @ula-aca/issue-credential/problem-report

Send a problem report for credential exchange.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  IssueCredentialController,
  IssueCredentialMessageTypes,
  ProblemReportMessage
} from '@ula-aca/issue-credential'

const issueCredentialController = new IssueCredentialController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([issueCredentialController])

const message: ProblemReportMessage = {
  type: IssueCredentialMessageTypes.PROBLEM_REPORT,
  body: {
    credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    explain_ltxt: 'describe problem here'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // problem report sent
  }
})
```

#### @ula-aca/issue-credential/remove

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  IssueCredentialController,
  IssueCredentialMessageTypes,
  RemoveExchangeRecordMessage
} from '@ula-aca/issue-credential'

const issueCredentialController = new IssueCredentialController(
  'https://aca-py-url.com'
)

const eventHandler = new EventHandler([issueCredentialController])

const message: RemoveExchangeRecordMessage = {
  type: IssueCredentialMessageTypes.REMOVE_EXCHANGE_RECORD,
  body: {
    credential_exchange_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // record removed
  }
})
```

### ConnectionEventHandler

In order to react to incoming credential exchange events, we need to setup out event handler. This package exposes an _abstract_ class `IssueCredentialEventHandler` that you can extend to implement this behavior. The Aries Cloudagent-Py emits an event whenever there is a change to the state of an agent's credential exchange record. Therefore there is a callback method for every credential exchange record state possible. These are: `proposal_sent`, `proposal_received`, `offer_sent`, `offer_received`, `request_sent`, `request_received`, `issued`, `credential_received` and `stored`.

There is also a callback method for incoming basic message events.

```typescript
import { IssueCredentialEventHandler } from '@ula-aca/issue-credential'
import { EventHandler } from 'universal-ledger-agent'
import WebhookRelayEventRouter from '@ula-aca/webhook-relay-event-router'
import {
  CredentialExchangeRecordProposalSent,
  CredentialExchangeRecordOfferSent,
  CredentialExchangeRecordOfferReceived,
  CredentialExchangeRecordRequestSent,
  CredentialExchangeRecordRequestReceived,
  CredentialExchangeRecordIssued,
  CredentialExchangeRecordStored,
  CredentialExchangeRecordCredentialReceived,
  CredentialExchangeRecordProposalReceived
} from '@ula-aca/aca-webhook-event-models'

class IssueEventHandler extends IssueCredentialEventHandler {
  onProposalSent(message: CredentialExchangeRecordProposalSent): Promise<void> {
    // credential exchange record state changed to 'proposal_sent'
  }

  onProposalReceived(
    message: CredentialExchangeRecordProposalReceived
  ): Promise<void> {
    // credential exchange record state changed to 'proposal_received'
  }
  onOfferSent(message: CredentialExchangeRecordOfferSent): Promise<void> {
    // credential exchange record state changed to 'offer_sent'
  }
  onOfferReceived(
    message: CredentialExchangeRecordOfferReceived
  ): Promise<void> {
    // credential exchange record state changed to 'offer_received'
  }
  onRequestSent(message: CredentialExchangeRecordRequestSent): Promise<void> {
    // credential exchange record state changed to 'request_sent'
  }
  onRequestReceived(
    message: CredentialExchangeRecordRequestReceived
  ): Promise<void> {
    // credential exchange record state changed to 'request_received'
  }
  onIssued(message: CredentialExchangeRecordIssued): Promise<void> {
    // credential exchange record state changed to 'issued'
  }
  onStored(message: CredentialExchangeRecordStored): Promise<void> {
    // credential exchange record state changed to 'stored'
  }
  onCredentialReceived(
    message: CredentialExchangeRecordCredentialReceived
  ): Promise<void> {
    // credential exchange record state changed to 'credential_received'
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
const issueHandler = new IssueEventHandler()

const eventHandler = new EventHandler([eventRouter, issueHandler])
```
