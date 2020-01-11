import { LedgerMessageTypes } from './LedgerMessageTypes'

interface GetVerkeyByDidPayload {
  did: string
}

interface GetVerkeyByDidMessage {
  type: LedgerMessageTypes.GET_VERKEY_BY_DID
  payload: GetVerkeyByDidPayload
}

type GetVerkeyByDidResult = void

export { GetVerkeyByDidPayload, GetVerkeyByDidMessage, GetVerkeyByDidResult }
