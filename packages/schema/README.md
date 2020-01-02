# Universal Ledger Agent - Aries Cloudagent Schema Plugin

This package handles everything that has to do with schemas in Hyperledger Aries. It has classes to perform schema related actions.

## Usage

### SchemaController

```typescript
import { EventHandler } from 'universal-ledger-agent'
import SchemaController from '@ula-aca/schema'

const schemaController = new SchemaController('https://aca-py-url.com')

const eventHandler = new EventHandler([schemaController])
```

#### @ula-aca/schema/get-schema-by-id

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import SchemaController, {
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
  // response.body is response from /schemas/{id} api endpoint in aca-py
  // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/schema/get_schemas__id_
})
```

#### @ula-aca/schema/get-created-schemas

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import SchemaController, {
  GetCreatedSchemasMessage,
  SchemaMessageTypes,
  GetCreatedSchemasPayload
} from '@ula-aca/schema'

const schemaController = new SchemaController('https://aca-py-api.test')

const eventHandler = new EventHandler([schemaController])

const message: GetCreatedSchemasMessage = {
  type: SchemaMessageTypes.GET_CREATED_SCHEMAS,
  payload: {} // GetCreatedSchemasPayload
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  // response.body is response from /schemas/created api endpoint in aca-py
  // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/schema/get_schemas_created
})
```

#### @ula-aca/schema/create-schema

```typescript
import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import SchemaController, {
  CreateSchemaMessage,
  SchemaMessageTypes,
  CreateSchemaPayload
} from '@ula-aca/schema'

const schemaController = new SchemaController('https://aca-py-api.test')

const eventHandler = new EventHandler([schemaController])

const message: CreateSchemaMessage = {
  type: SchemaMessageTypes.CREATE_SCHEMA,
  payload: {} // CreateSchemaPayload
}

eventHandler.processMsg(message, (response: UlaResponse) => {
  // response.body is response from /schemas post request api endpoint in aca-py
  // https://ula-aca.github.io/aries-cloudagent-interface-javascript/#/schema/post_schemas
})
```
