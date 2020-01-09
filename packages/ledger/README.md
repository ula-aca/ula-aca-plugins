# Universal Ledger Agent - Aries Cloudagent Ledger Plugin

This package handles everything that has to do with the ledger in Hyperledger Aries. It has classes to perform ledger related actions.

## Usage

### LedgerController

```typescript
import { EventHandler } from 'universal-ledger-agent'
import { LedgerController } from '@ula-aca/schema'

const ledgerController = new LedgerController('https://aca-py-url.com')

const eventHandler = new EventHandler([ledgerController])
```

#### @ula-aca/schema/get-schema-by-id

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  SchemaController,
  GetSchemaByIdMessage,
  SchemaMessageTypes
} from '@ula-aca/schema'

const schemaController = new SchemaController('https://aca-py-api.test')

const eventHandler = new EventHandler([schemaController])

const message: GetSchemaByIdMessage = {
  type: SchemaMessageTypes.GET_SCHEMA_BY_ID,
  payload: {
    schemaId: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0'
  }
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  if (response.statusCode < 200 || response.statusCode >= 300) {
    // error
  } else {
    // response.body is response from /schemas/{id} api endpoint in aca-py
    // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/schema/get_schemas__id_
    const result: GetSchemaByIdResult = response.body
  }
})
```

## Examples

For example usage see the [`examples/`](./examples) directory.
