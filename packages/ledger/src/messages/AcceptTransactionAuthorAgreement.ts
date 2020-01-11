import { LedgerMessageTypes } from './LedgerMessageTypes'

interface AcceptTransactionAuthorAgreementPayload {
  mechanism: string
  version: string
  text: string
}

interface AcceptTransactionAuthorAgreementMessage {
  type: LedgerMessageTypes.ACCEPT_TRANSACTION_AUTHOR_AGREEMENT
  payload: AcceptTransactionAuthorAgreementPayload
}

type AcceptTransactionAuthorAgreementResult = void

export {
  AcceptTransactionAuthorAgreementPayload,
  AcceptTransactionAuthorAgreementMessage,
  AcceptTransactionAuthorAgreementResult
}
