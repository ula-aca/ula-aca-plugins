import { LedgerMessageTypes } from './LedgerMessageTypes'

interface RegisterNymPayload {
  did: string
  verkey: string
  alias?: string
  role?: string
}

interface RegisterNymMessage {
  type: LedgerMessageTypes.REGISER_NYM
  payload: RegisterNymPayload
}

type RegisterNymResult = { success: true }

export { RegisterNymPayload, RegisterNymMessage, RegisterNymResult }
