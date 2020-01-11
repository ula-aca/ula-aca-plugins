import { RegisterNymMessage } from './RegisterNym'
import { GetVerkeyByDidMessage } from './GetVerkeyByDid'
import { GetEndpointByDidMessage } from './GetEndpointByDid'
import { GetTransactionAuthorAgreementMessage } from './GetTransactionAuthorAgreement'
import { AcceptTransactionAuthorAgreementMessage } from './AcceptTransactionAuthorAgreement'
import { LedgerMessageTypes } from './LedgerMessageTypes'

type LedgerMessageType =
  | RegisterNymMessage
  | GetVerkeyByDidMessage
  | GetEndpointByDidMessage
  | GetTransactionAuthorAgreementMessage
  | AcceptTransactionAuthorAgreementMessage

function isLedgerMessage(properties): properties is LedgerMessageType {
  return Object.values(LedgerMessageTypes).includes(properties.type)
}

export { LedgerMessageType, isLedgerMessage }
export * from './AcceptTransactionAuthorAgreement'
export * from './GetEndpointByDid'
export * from './GetTransactionAuthorAgreement'
export * from './GetVerkeyByDid'
export * from './RegisterNym'
export * from './LedgerMessageTypes'
