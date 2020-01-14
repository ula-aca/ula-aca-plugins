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

import { PresentProofMessageTypes } from './PresentProofMessageTypes'

interface GetPresentationRequestCredentialsBody {
  presentation_exchange_id: string
  start?: string
  count?: string
  extra_query?: string
}

interface GetPresentationRequestCredentialsMessage {
  type: PresentProofMessageTypes.GET_PRESENTATION_REQUEST_CREDENTIALS
  body: GetPresentationRequestCredentialsBody
}

export {
  GetPresentationRequestCredentialsMessage,
  GetPresentationRequestCredentialsBody
}