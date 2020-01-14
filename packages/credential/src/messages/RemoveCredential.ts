import {
  SetTagPolicyRequest,
  Credential
} from '@ula-aca/aries-cloudagent-interface'
import { CredentialMessageTypes } from './CredentialMessageTypes'

interface RemoveCredentialBody {
  credential_id: string
}

interface RemoveCredentialMessage {
  type: CredentialMessageTypes.REMOVE_CREDENTIAL
  body: RemoveCredentialBody
}

type RemoveCredentialResult = {}

export { RemoveCredentialMessage, RemoveCredentialBody, RemoveCredentialResult }
