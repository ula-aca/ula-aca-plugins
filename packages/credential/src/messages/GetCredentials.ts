import {
  SetTagPolicyRequest,
  Credential,
  CredentialList
} from '@ula-aca/aries-cloudagent-interface'
import { CredentialMessageTypes } from './CredentialMessageTypes'

interface GetCredentialsBody {
  start?: string
  count?: string
  wql?: string
}

interface GetCredentialsMessage {
  type: CredentialMessageTypes.GET_CREDENTIALS
  body: GetCredentialsBody
}

type GetCredentialsResult = CredentialList

export { GetCredentialsMessage, GetCredentialsBody, GetCredentialsResult }
