# Universal Ledger Agent - Aries Cloudagent Wallet Plugin

![npm (scoped)](https://img.shields.io/npm/v/@ula-aca/wallet)

This package handles everything that has to do with the wallet in Hyperledger Aries.

## Usage

### WalletController

```typescript
import { EventHandler } from 'universal-ledger-agent'
import { WalletController } from '@ula-aca/wallet'

const walletController = new WalletController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([walletController])
```

#### @ula-aca/wallet/get-dids

List wallet DIDs

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  WalletController,
  GetDidsMessage,
  GetDidsResult,
  WalletMessageTypes
} from '@ula-aca/wallet'

const walletController = new WalletController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([walletController])

const message: GetDidsMessage = {
  type: WalletMessageTypes.GET_DIDS,
  body: {
    public: 'false',
    did: 'WgWxqztrNooG92RXvxSTWv',
    verkey: 'H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /wallet/did api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/wallet/get_wallet_did
    const result: GetDidsResult = response.body
  }
})
```

#### @ula-aca/wallet/create-local-did

Create a local DID

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  WalletController,
  CreateLocalDidMessage,
  CreateLocalDidResult,
  WalletMessageTypes
} from '@ula-aca/wallet'

const walletController = new WalletController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([walletController])

const message: CreateLocalDidMessage = {
  type: WalletMessageTypes.CREATE_LOCAL_DID
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /wallet/did/create POST api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/wallet/post_wallet_did_create
    const result: CreateLocalDidResult = response.body
  }
})
```

#### @ula-aca/wallet/fetch-public-did

Fetch the current public DID

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  WalletController,
  FetchPublicDidMessage,
  FetchPublicDidResult,
  WalletMessageTypes
} from '@ula-aca/wallet'

const walletController = new WalletController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([walletController])

const message: FetchPublicDidMessage = {
  type: WalletMessageTypes.FETCH_PUBLIC_DID
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /wallet/did/public api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/wallet/get_wallet_did_public
    const result: FetchPublicDidResult = response.body
  }
})
```

#### @ula-aca/wallet/assign-public-did

Assign the current public DID

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  WalletController,
  AssignPublicDidMessage,
  AssignPublicDidResult,
  WalletMessageTypes
} from '@ula-aca/wallet'

const walletController = new WalletController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([walletController])

const message: AssignPublicDidMessage = {
  type: WalletMessageTypes.ASSIGN_PUBLIC_DID,
  body: {
    did: 'WgWxqztrNooG92RXvxSTWv'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /wallet/did/public api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/wallet/get_wallet_did_public
    const result: AssignPublicDidResult = response.body
  }
})
```

#### @ula-aca/wallet/get-tagging-policy

Get the tagging policy for a credential definition

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  WalletController,
  GetTagPolicyMessage,
  GetTagPolicyResult,
  WalletMessageTypes
} from '@ula-aca/wallet'

const walletController = new WalletController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([walletController])

const message: GetTagPolicyMessage = {
  type: WalletMessageTypes.GET_TAG_POLICY,
  body: {
    credential_definition_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /wallet/tag-policy/{id} api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/wallet/get_wallet_tag_policy__id_
    const result: GetTagPolicyResult = response.body
  }
})
```

#### @ula-aca/wallet/set-tagging-policy

Set the tagging policy for a credential definition

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  WalletController,
  SetTagPolicyMessage,
  SetTagPolicyResult,
  WalletMessageTypes
} from '@ula-aca/wallet'

const walletController = new WalletController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([walletController])

const message: SetTagPolicyMessage = {
  type: WalletMessageTypes.SET_TAG_POLICY,
  body: {
    credential_definition_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    taggables: ['score']
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /wallet/tag-policy/{id} api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/wallet/get_wallet_tag_policy__id_
    const result: SetTagPolicyResult = response.body
  }
})
```

## Examples

For example usage see the [`examples/`](./examples) directory.
