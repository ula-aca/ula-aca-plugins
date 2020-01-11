import { LedgerMessageTypes } from './LedgerMessageTypes'

interface GetEndpointByDidPayload {
  did: string
}

interface GetEndpointByDidMessage {
  type: LedgerMessageTypes.GET_ENDPOINT_BY_DID
  payload: GetEndpointByDidPayload
}

type GetEndpointByDidResult = { endpoint: string }

export {
  GetEndpointByDidPayload,
  GetEndpointByDidMessage,
  GetEndpointByDidResult
}
