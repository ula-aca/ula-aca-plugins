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

import {
  Plugin,
  EventHandler,
  Message,
  UlaResponse
} from 'universal-ledger-agent'

import {
  Configuration,
  PresentProofApi
} from '@ula-aca/aries-cloudagent-interface'

import { AxiosError } from 'axios'
import {
  GetPresentationExchangeRecordByIdBody,
  GetPresentationRequestCredentialsBody,
  SendPresentationProposalBody,
  CreatePresentationRequestBody,
  SendPresentationRequestBody,
  SendPresentationRequestByIdBody,
  SendPresentationBody,
  VerifyPresentationBody,
  RemovePresentationExchangeRecordBody,
  isPresentProofMessage,
  PresentProofMessageTypes,
  GetPresentationRequestCredentialsByReferentIdBody
} from './messages'

export class PresentProofController implements Plugin {
  protected eventHandler?: EventHandler

  private presentProofApi: PresentProofApi

  constructor(acaUrl: string) {
    const apiConfig = new Configuration({
      basePath: acaUrl
    })

    this.presentProofApi = new PresentProofApi(apiConfig)
  }

  initialize(eventHandler: EventHandler): void {
    this.eventHandler = eventHandler
  }

  get name(): string {
    return '@ula-aca/present-proof/PresentProofController'
  }

  private async getAllPresentProofExchangeRecords(): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsGet()
    return new UlaResponse({
      statusCode: response.status,
      body: response.data.results
    })
  }

  private async getPresentProofExchangeRecordById({
    presentation_exchange_id
  }: GetPresentationExchangeRecordByIdBody): Promise<UlaResponse> {
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
  }: GetPresentationRequestCredentialsBody): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdCredentialsGet(
      presentation_exchange_id
    )
    return new UlaResponse({
      statusCode: response.status,
      body: {}
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
  }: SendPresentationProposalBody): Promise<UlaResponse> {
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
  }: SendPresentationRequestBody): Promise<UlaResponse> {
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
  }: SendPresentationRequestByIdBody): Promise<UlaResponse> {
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
  }: RemovePresentationExchangeRecordBody): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdRemovePost(
      presentation_exchange_id
    )
    return new UlaResponse({
      statusCode: response.status,
      body: {}
    })
  }

  async handleEvent(message: Message, callback: any): Promise<string> {
    if (!isPresentProofMessage(message)) {
      return 'ignored'
    }

    let response: UlaResponse

    try {
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
          response = await this.sendPresentProofProposal(
            message.properties.body
          )
          break
        case PresentProofMessageTypes.CREATE_PRESENTATION_REQUEST:
          response = await this.createPresentationRequest(
            message.properties.body
          )
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
        default:
          throw new Error(`unhandled message type: ${message.properties.type}`)
      }
    } catch (err) {
      const axiosErr = err as AxiosError

      response = new UlaResponse({
        statusCode: axiosErr.response.status,
        body: {
          error: axiosErr.response.data
        }
      })
    }
    callback(response)
    return response.statusCode < 200 || response.statusCode >= 300
      ? 'error'
      : 'success'
  }
}
