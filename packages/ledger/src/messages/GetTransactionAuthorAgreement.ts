import { TAAResult } from '@ula-aca/aries-cloudagent-interface'
import { LedgerMessageTypes } from './LedgerMessageTypes'

interface GetTransactionAuthorAgreementMessage {
  type: LedgerMessageTypes.GET_TRANSACTION_AUTHOR_AGREEMENT
}

type GetTransactionAuthorAgreementResult = TAAResult

export {
  GetTransactionAuthorAgreementMessage,
  GetTransactionAuthorAgreementResult
}
