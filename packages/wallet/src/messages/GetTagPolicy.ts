import { GetTagPolicyResult } from '@ula-aca/aries-cloudagent-interface'
import { WalletMessageTypes } from './WalletMessageTypes'

interface GetTagPolicyBody {
  credential_definition_id: string
}

interface GetTagPolicyMessage {
  type: WalletMessageTypes.GET_TAG_POLICY
  body: GetTagPolicyBody
}

export { GetTagPolicyMessage, GetTagPolicyBody, GetTagPolicyResult }
