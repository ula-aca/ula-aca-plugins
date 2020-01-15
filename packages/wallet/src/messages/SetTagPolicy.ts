import { SetTagPolicyRequest } from '@ula-aca/aries-cloudagent-interface'
import { WalletMessageTypes } from './WalletMessageTypes'

interface SetTagPolicyBody extends SetTagPolicyRequest {
  credential_definition_id: string
}

interface SetTagPolicyMessage {
  type: WalletMessageTypes.SET_TAG_POLICY
  body: SetTagPolicyBody
}

export { SetTagPolicyMessage, SetTagPolicyBody }
