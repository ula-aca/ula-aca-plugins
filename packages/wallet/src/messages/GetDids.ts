import { DIDList } from '@ula-aca/aries-cloudagent-interface'
import { WalletMessageTypes } from './WalletMessageTypes'

interface GetDidsBody {
  did?: string
  verkey?: string
  public?: string
}

interface GetDidsMessage {
  type: WalletMessageTypes.GET_DIDS
  body: GetDidsBody
}

type GetDidsResult = DIDList

export { GetDidsMessage, GetDidsBody, GetDidsResult }
