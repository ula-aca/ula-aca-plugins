# Universal Ledger Agent - Aries Cloudagent Credential Plugin

![npm (scoped)](https://img.shields.io/npm/v/@ula-aca/credential)

This package handles everything that has to do with issued credentials in Hyperledger Aries. It allows to retrieve and remove credentials issued to you.

## Usage

### CredentialController

```typescript
import { EventHandler } from 'universal-ledger-agent'
import { LedgerController } from '@ula-aca/credential'

const credentialController = new CredentialController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([credentialController])
```

#### @ula-aca/credential/get-credentials

Fetch credentials from wallet

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  CredentialController,
  GetCredentialsMessage,
  GetCredentialsResult,
  CredentialMessageTypes
} from '@ula-aca/credential'

const credentialController = new CredentialController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([credentialController])

const message: GetCredentialsMessage = {
  type: CredentialMessageTypes.GET_CREDENTIALS,
  body: {}
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /credentials api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/credentials/get_credentials
    const result: GetCredentialsResult = response.body
  }
})
```

#### @ula-aca/credential/get-credential-by-id

Fetch a credential from wallet by id

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  CredentialController,
  GetCredentialByIdMessage,
  GetCredentialByIdResult,
  CredentialMessageTypes
} from '@ula-aca/credential'

const credentialController = new CredentialController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([credentialController])

const message: GetCredentialByIdMessage = {
  type: CredentialMessageTypes.GET_CREDENTIAL_BY_ID,
  body: {
    credential_id: '3253a790-e776-49e2-a30b-7f63401a4540'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /credential/{id} api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/credentials/get_credential__id_
    const result: GetCredentialByIdResult = response.body
  }
})
```

#### @ula-aca/credential/remove-credential

Remove a credential from the wallet by id

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  CredentialController,
  RemoveCredentialMessage,
  RemoveCredentialResult,
  CredentialMessageTypes
} from '@ula-aca/credential'

const credentialController = new CredentialController({
  basePath: 'https://aca-py-api.com'
})

const eventHandler = new EventHandler([credentialController])

const message: RemoveCredentialMessage = {
  type: CredentialMessageTypes.REMOVE_CREDENTIAL,
  body: {
    credential_id: '3253a790-e776-49e2-a30b-7f63401a4540'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /credential/{id}/remove POST api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/credentials/post_credential__id__remove
    const result: RemoveCredentialResult = response.body
  }
})
```

## Examples

For example usage see the [`examples/`](./examples) directory.
