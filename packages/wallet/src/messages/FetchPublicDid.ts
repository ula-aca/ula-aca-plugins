import { DIDResult } from '@ula-aca/aries-cloudagent-interface'
import { WalletMessageTypes } from './WalletMessageTypes'

interface FetchPublicDidMessage {
  type: WalletMessageTypes.FETCH_PUBLIC_DID
}

type FetchPublicDidResult = DIDResult

export { FetchPublicDidMessage, FetchPublicDidResult }
