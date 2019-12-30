/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
/*
 * Copyright 2019 ula-aca.
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
  PresentProofApi,
  V10PresentationProposalRequest,
  V10PresentationRequestRequest,
  V10PresentationRequest
} from '@ula-aca/aries-cloudagent-interface'

export enum PresentProofControllerMessages {
  GET_ALL_EXCHANGE_RECORDS = '@ula-aca/present-proof/get-all-exchange-records',
  GET_EXCHANGE_RECORD_BY_ID = '@ula-aca/present-proof/get-exchange-record-by-id',
  GET_PRESENTATION_REQUEST_CREDENTIALS = '@ula-aca/present-proof/get-presentation-request-credentials',
  GET_PRESENTATION_REQUEST_CREDENTIALS_WITH_REFERENT = '@ula-aca/present-proof/get-presentation-request-credentials-with-referent',
  SEND_PROPOSAL = '@ula-aca/present-proof/send-proposal',
  CREATE_PRESENTATION_REQUEST = '@ula-aca/present-proof/create-presentation-request',
  SEND_REQUEST = '@ula-aca/present-proof/send-request',
  SEND_REQUEST_BY_ID = '@ula-aca/present-proof/send-proof-presentation-request-by-id',
  SEND_PRESENTATION = '@ula-aca/present-proof/send-presentation',
  VERIFY_PRESENTATION = '@ula-aca/present-proof/verify-presentation',
  REMOVE_EXCHANGE_RECORD = '@ula-aca/present-proof/remove-exchange-record'
}

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

  private async getPresentProofExchangeRecordById(
    presExId: string
  ): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdGet(
      presExId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async getPresentationRequestCredentials(
    presExId: string
  ): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdCredentialsGet(
      presExId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: {}
    })
  }

  private async getPresentationRequestCredentialsWithReferent(
    presExId: string,
    referent: string
  ): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdCredentialsReferentGet(
      presExId,
      referent
    )
    return new UlaResponse({
      statusCode: response.status,
      body: {}
    })
  }

  private async sendPresentProofProposal(
    body: V10PresentationProposalRequest
  ): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofSendProposalPost(
      body
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async createPresentationRequest(
    body: V10PresentationRequestRequest
  ): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofCreateRequestPost(
      body
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendRequest(
    body: V10PresentationRequestRequest
  ): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofSendRequestPost(
      body
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendRequestById(
    presExId: string,
    body: V10PresentationRequestRequest
  ): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdSendRequestPost(
      presExId,
      body
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendPresentation(
    presExId: string,
    body: V10PresentationRequest
  ): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdSendPresentationPost(
      presExId,
      body
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async verifyProofPresentation(
    presExId: string
  ): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdVerifyPresentationPost(
      presExId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async removeExchangeRecord(presExId: string): Promise<UlaResponse> {
    const response = await this.presentProofApi.presentProofRecordsPresExIdRemovePost(
      presExId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: {}
    })
  }

  async handleEvent(message: Message, callback: any): Promise<string> {
    if (
      !Object.values(PresentProofControllerMessages).includes(
        message.properties.type
      )
    ) {
      return 'ignored'
    }

    // TODOC: Document messages and their properties
    let response: UlaResponse = null
    switch (message.properties.type) {
      case PresentProofControllerMessages.GET_ALL_EXCHANGE_RECORDS:
        response = await this.getAllPresentProofExchangeRecords()
        break
      case PresentProofControllerMessages.GET_EXCHANGE_RECORD_BY_ID:
        response = await this.getPresentProofExchangeRecordById(
          message.properties.presExId
        )
        break
      case PresentProofControllerMessages.GET_PRESENTATION_REQUEST_CREDENTIALS:
        response = await this.getPresentationRequestCredentials(
          message.properties.presExId
        )
        break
      case PresentProofControllerMessages.GET_PRESENTATION_REQUEST_CREDENTIALS_WITH_REFERENT:
        response = await this.getPresentationRequestCredentialsWithReferent(
          message.properties.presExId,
          message.properties.referent
        )
        break
      case PresentProofControllerMessages.SEND_PROPOSAL:
        response = await this.sendPresentProofProposal(message.properties.body)
        break
      case PresentProofControllerMessages.CREATE_PRESENTATION_REQUEST:
        response = await this.createPresentationRequest(message.properties.body)
        break
      case PresentProofControllerMessages.SEND_REQUEST:
        response = await this.sendRequest(message.properties.body)
        break
      case PresentProofControllerMessages.SEND_REQUEST_BY_ID:
        response = await this.sendRequestById(
          message.properties.presExId,
          message.properties.body
        )
        break
      case PresentProofControllerMessages.SEND_PRESENTATION:
        response = await this.sendPresentation(
          message.properties.presExId,
          message.properties.body
        )
        break
      case PresentProofControllerMessages.VERIFY_PRESENTATION:
        response = await this.verifyProofPresentation(
          message.properties.presExId
        )
        break

      case PresentProofControllerMessages.REMOVE_EXCHANGE_RECORD:
        response = await this.removeExchangeRecord(message.properties.presExId)
        break
      default:
        throw new Error(`unhandled message type: ${message.properties.type}`)
    }
    callback(response)
    return 'success'
  }
}
