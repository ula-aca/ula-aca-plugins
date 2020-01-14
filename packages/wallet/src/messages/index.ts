/*
 * Copyright 2020-present ula-aca
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AssignPublicDidMessage } from './AssignPublicDid'
import { CreateLocalDidMessage } from './CreateLocalDid'
import { FetchPublicDidMessage } from './FetchPublicDid'
import { GetDidsMessage } from './GetDids'
import { GetTagPolicyMessage } from './GetTagPolicy'
import { SetTagPolicyMessage } from './SetTagPolicy'

import { WalletMessageTypes } from './WalletMessageTypes'

type WalletMessageType =
  | AssignPublicDidMessage
  | CreateLocalDidMessage
  | FetchPublicDidMessage
  | GetDidsMessage
  | GetTagPolicyMessage
  | SetTagPolicyMessage

function isWalletMessage(properties): properties is WalletMessageType {
  return Object.values(WalletMessageTypes).includes(properties.type)
}

export { WalletMessageType, isWalletMessage }
export * from './AssignPublicDid'
export * from './CreateLocalDid'
export * from './FetchPublicDid'
export * from './GetDids'
export * from './GetTagPolicy'
export * from './SetTagPolicy'
export * from './WalletMessageTypes'
