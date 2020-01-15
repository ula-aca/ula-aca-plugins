import { DIDResult } from '@ula-aca/aries-cloudagent-interface'
import { WalletMessageTypes } from './WalletMessageTypes'

interface CreateLocalDidMessage {
  type: WalletMessageTypes.CREATE_LOCAL_DID
}

type CreateLocalDidResult = DIDResult

export { CreateLocalDidMessage, CreateLocalDidResult }
