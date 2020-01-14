import { DIDResult } from '@ula-aca/aries-cloudagent-interface'
import { WalletMessageTypes } from './WalletMessageTypes'

interface AssignPublicDidBody {
  did: string
}

interface AssignPublicDidMessage {
  type: WalletMessageTypes.ASSIGN_PUBLIC_DID
  body: AssignPublicDidBody
}

type AssignPublicDidResult = DIDResult

export { AssignPublicDidMessage, AssignPublicDidBody, AssignPublicDidResult }
