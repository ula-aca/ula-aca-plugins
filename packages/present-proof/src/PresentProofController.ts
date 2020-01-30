/*
 * Copyright 2019-present ula-aca
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

import { Message, UlaResponse } from 'universal-ledger-agent'

import { PresentProofApi } from '@ula-aca/aries-cloudagent-interface'
import {
  AcaControllerPlugin,
  AcaControllerPluginOptions,
  UlaCallback
} from '@ula-aca/core'

import {
  GetExchangeRecordByIdBody,
  GetRequestCredentialsBody,
  SendProposalBody,
  CreatePresentationRequestBody,
  SendRequestBody,
  SendRequestByIdBody,
  SendPresentationBody,
  VerifyPresentationBody,
  RemoveExchangeRecordBody,
  isPresentProofMessage,
  PresentProofMessageTypes,
  GetPresentationRequestCredentialsByReferentIdBody,
  GetRequestCredentialsResult
} from './messages'

class PresentProofController extends AcaControllerPlugin {
  private presentProofApi: PresentProofApi

  constructor(options?: AcaControllerPluginOptions) {
    super(options)

    this.presentProofApi = new PresentProofApi(this.apiConfig)
  }

  get name(): string {
    return '@ula-aca/present-proof/PresentProofController'
  }

  private async getAllPresentProofExchangeRecords(): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsGet()
    return new UlaResponse({
      statusCode: response.status,
      body: response.data.results || []
    })
  }

  private async getPresentProofExchangeRecordById({
    presentation_exchange_id
  }: GetExchangeRecordByIdBody): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdGet(
      presentation_exchange_id
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async getPresentationRequestCredentials({
    presentation_exchange_id
  }: GetRequestCredentialsBody): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdCredentialsGet(
      presentation_exchange_id
    )

    const body = (response.data as unknown) as GetRequestCredentialsResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async getPresentationRequestCredentialsWithReferent({
    presentation_exchange_id,
    referent,
    start,
    count,
    extra_query
  }: GetPresentationRequestCredentialsByReferentIdBody): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdCredentialsReferentGet(
      presentation_exchange_id,
      referent,
      start,
      count,
      extra_query
    )
    return new UlaResponse({
      statusCode: response.status,
      body: {}
    })
  }

  private async sendPresentProofProposal({
    comment,
    connection_id,
    presentation_proposal,
    auto_present
  }: SendProposalBody): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofSendProposalPost({
      comment,
      connection_id,
      presentation_proposal,
      auto_present
    })
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async createPresentationRequest({
    comment,
    proof_request,
    connection_id
  }: CreatePresentationRequestBody): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofCreateRequestPost({
      comment,
      proof_request,
      connection_id
    })
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendRequest({
    comment,
    proof_request,
    connection_id
  }: SendRequestBody): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofSendRequestPost({
      comment,
      proof_request,
      connection_id
    })
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendRequestById({
    presentation_exchange_id,
    comment,
    proof_request,
    connection_id
  }: SendRequestByIdBody): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdSendRequestPost(
      presentation_exchange_id,
      {
        comment,
        proof_request,
        connection_id
      }
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendPresentation({
    presentation_exchange_id,
    requested_attributes,
    self_attested_attributes,
    requested_predicates
  }: SendPresentationBody): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdSendPresentationPost(
      presentation_exchange_id,
      {
        requested_attributes,
        self_attested_attributes,
        requested_predicates
      }
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async verifyProofPresentation({
    presentation_exchange_id
  }: VerifyPresentationBody): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdVerifyPresentationPost(
      presentation_exchange_id
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async removeExchangeRecord({
    presentation_exchange_id
  }: RemoveExchangeRecordBody): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdRemovePost(
      presentation_exchange_id
    )
    return new UlaResponse({
      statusCode: response.status,
      body: {}
    })
  }

  @AcaControllerPlugin.handleError
  async handleEvent(message: Message, callback: UlaCallback): Promise<string> {
    if (!isPresentProofMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse

    switch (message.properties.type) {
      case PresentProofMessageTypes.GET_EXCHANGE_RECORDS:
        response = await this.getAllPresentProofExchangeRecords()
        break
      case PresentProofMessageTypes.GET_EXCHANGE_RECORD_BY_ID:
        response = await this.getPresentProofExchangeRecordById(
          message.properties.body
        )
        break
      case PresentProofMessageTypes.GET_PRESENTATION_REQUEST_CREDENTIALS:
        response = await this.getPresentationRequestCredentials(
          message.properties.body
        )
        break
      case PresentProofMessageTypes.GET_PRESENTATION_REQUEST_CREDENTIALS_WITH_REFERENT:
        response = await this.getPresentationRequestCredentialsWithReferent(
          message.properties.body
        )
        break
      case PresentProofMessageTypes.SEND_PROPOSAL:
        response = await this.sendPresentProofProposal(message.properties.body)
        break
      case PresentProofMessageTypes.CREATE_PRESENTATION_REQUEST:
        response = await this.createPresentationRequest(message.properties.body)
        break
      case PresentProofMessageTypes.SEND_REQUEST:
        response = await this.sendRequest(message.properties.body)
        break
      case PresentProofMessageTypes.SEND_REQUEST_BY_ID:
        response = await this.sendRequestById(message.properties.body)
        break
      case PresentProofMessageTypes.SEND_PRESENTATION:
        response = await this.sendPresentation(message.properties.body)
        break
      case PresentProofMessageTypes.VERIFY_PRESENTATION:
        response = await this.verifyProofPresentation(message.properties.body)
        break

      case PresentProofMessageTypes.REMOVE_EXCHANGE_RECORD:
        response = await this.removeExchangeRecord(message.properties.body)
        break
    }

    callback(response)
    return 'success'
  }
}

export { PresentProofController }
