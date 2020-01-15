# Universal Ledger Agent - Aries Cloudagent Ledger Plugin

This package handles everything that has to do with the ledger in Hyperledger Aries. It has classes to perform ledger related actions.

## Usage

### LedgerController

```typescript
import { EventHandler } from 'universal-ledger-agent'
import { LedgerController } from '@ula-aca/ledger'

const ledgerController = new LedgerController('https://aca-py-url.com')

const eventHandler = new EventHandler([ledgerController])
```

#### @ula-aca/ledger/register-nym

Send a NYM registration to the ledger.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  LedgerController,
  RegisterNymMessage,
  RegisterNymResult,
  LedgerMessageTypes
} from '@ula-aca/ledger'

const ledgerController = new LedgerController('https://aca-py-api.test')

const eventHandler = new EventHandler([ledgerController])

const message: RegisterNymMessage = {
  type: LedgerMessageTypes.REGISER_NYM,
  body: {
    did: 'xZRz2JK8HngynkLe6m33J',
    verkey: 'XHLPXpGT9y5PaLo8n7pt379dXx6SLZYHqQN393yfA2e'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /ledger/register-nym POST api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/ledger/post_ledger_register_nym
    const result: RegisterNymResult = response.body
  }
})
```

#### @ula-aca/ledger/get-verkey-by-did

Get the verkey for a DID from the ledger.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  LedgerController,
  GetVerkeyByDidMessage,
  GetVerkeyByDidResult,
  LedgerMessageTypes
} from '@ula-aca/ledger'

const ledgerController = new LedgerController('https://aca-py-api.test')

const eventHandler = new EventHandler([ledgerController])

const message: RegisterNymMessage = {
  type: LedgerMessageTypes.GET_VERKEY_BY_DID,
  body: {
    did: 'xZRz2JK8HngynkLe6m33J'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /ledger/did-verkey api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/ledger/get_ledger_did_verkey
    const result: GetVerkeyByDidResult = response.body
  }
})
```

#### @ula-aca/ledger/get-endpoint-by-did

Get the endpoint for a DID from the ledger.

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  LedgerController,
  GetEndpointByDidMessage,
  GetEndpointByDidResult,
  LedgerMessageTypes
} from '@ula-aca/ledger'

const ledgerController = new LedgerController('https://aca-py-api.test')

const eventHandler = new EventHandler([ledgerController])

const message: GetEndpointByDidMessage = {
  type: LedgerMessageTypes.GET_ENDPOINT_BY_DID,
  body: {
    did: 'xZRz2JK8HngynkLe6m33J'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /ledger/did-endpoint api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/ledger/get_ledger_did_endpoint
    const result: GetEndpointByDidResult = response.body
  }
})
```

#### @ula-aca/ledger/get-transaction-author-agreement

Fetch the current transaction author agreement, if any

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  LedgerController,
  GetTransactionAuthorAgreementMessage,
  GetTransactionAuthorAgreementResult,
  LedgerMessageTypes
} from '@ula-aca/ledger'

const ledgerController = new LedgerController('https://aca-py-api.test')

const eventHandler = new EventHandler([ledgerController])

const message: GetTransactionAuthorAgreementMessage = {
  type: LedgerMessageTypes.GET_TRANSACTION_AUTHOR_AGREEMENT
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /ledger/taa api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/ledger/get_ledger_taa
    const result: GetTransactionAuthorAgreementResult = response.body
  }
})
```

#### @ula-aca/ledger/accept-transaction-author-agreement

Accept the transaction author agreement

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  LedgerController,
  AcceptTransactionAuthorAgreementMessage,
  AcceptTransactionAuthorAgreementResult,
  LedgerMessageTypes
} from '@ula-aca/ledger'

const ledgerController = new LedgerController('https://aca-py-api.test')

const eventHandler = new EventHandler([ledgerController])

// TODO: Add correct example for accepting TAA.
// Ledger needs to have a TAA, you can publish this with
// the ledger api from the indy sdk
const message: AcceptTransactionAuthorAgreementMessage = {
  type: LedgerMessageTypes.ACCEPT_TRANSACTION_AUTHOR_AGREEMENT,
  body: {
    mechanism: '',
    text: '',
    version: ''
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /ledger/taa/accept POST api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/ledger/post_ledger_taa_accept
    const result: AcceptTransactionAuthorAgreementResult = response.body
  }
})
```

## Examples

For example usage see the [`examples/`](./examples) directory.
