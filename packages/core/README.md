# Universal Ledger Agent - Aries Cloudagent Core Module

[![npm (scoped)](https://img.shields.io/npm/v/@ula-aca/core)](https://npmjs.com/package/@ula-aca/core)

This is the core of ula-aca that contains code used by all plugins. It contains a base plugin for controllers and event handlers with error handling.

You should only directly use this plugin if you are creating plugins that interact with an Aries Cloudagent in the same way other plugins do.

## Usage

### AcaControllerPlugin

Used for controller plugins that interact with the Aries Cloudagent API.

```typescript
import { AcaControllerPlugin, UlaCallback } from '@ula-aca/core'
import { Message, UlaResponse } from 'universal-ledger-agent'

class MyController extends AcaControllerPlugin {
  // Options are options to be used for Api connections. See `AcaControllerPluginOptions`
  constructor(options?: AcaControllerPluginOptions) {
    super(options)
  }

  get name(): string {
    return '@ula-aca/my-plugin/MyController'
  }

  // Use this if you want errors to be handled by a decorator.
  // If a function throws it will catch the error and return an ula response
  // with the correct AxiosErr or other error
  // See @ula-aca/connection/ConnectionController plugin for an implementation
  // Or see the AcaController.handleError function
  @AcaControllerPlugin.handleError
  public async handleEvent(
    message: Message,
    callback: UlaCallback
  ): Promise<string> {
    const response: UlaResponse = {} // create your ulaResponse

    callback(response)
    return 'success'
  }
}
```

### AcaEventPlugin

Used for event plugins that handle Aries Cloudagent Webhook Events.

```typescript
import { AcaEventPlugin, UlaCallback } from '@ula-aca/core'
import { Message, UlaResponse } from 'universal-ledger-agent'

abstract class MyEventHandler extends AcaEventPlugin {
  get name(): string {
    return '@ula-aca/my-plugin/MyEventHandler'
  }

  // Use this if you want errors to be handled by a decorator.
  // If a function throws it will catch the error and return an ula response
  // with the correct error
  // See @ula-aca/connection/ConnectionEventHandler plugin for an implementation
  // Or see the AcaEventPlugin.handleError function
  @AcaEventPlugin.handleError
  public async handleEvent(
    message: Message,
    callback: UlaCallback
  ): Promise<string> {
    const response: UlaResponse = {} // create your ulaResponse

    callback(response)
    return 'success'
  }
}
```
