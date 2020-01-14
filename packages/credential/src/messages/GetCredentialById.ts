import {
  SetTagPolicyRequest,
  Credential
} from '@ula-aca/aries-cloudagent-interface'
import { CredentialMessageTypes } from './CredentialMessageTypes'

interface GetCredentialByIdBody {
  credential_id: string
}

interface GetCredentialByIdMessage {
  type: CredentialMessageTypes.GET_CREDENTIAL_BY_ID
  body: GetCredentialByIdBody
}

type GetCredentialByIdResult = Credential

export {
  GetCredentialByIdMessage,
  GetCredentialByIdBody,
  GetCredentialByIdResult
}
