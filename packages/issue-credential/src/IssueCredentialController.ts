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
  IssueCredentialApi,
  V10CredentialProposalRequest,
  V10CredentialOfferRequest,
  V10CredentialIssueRequest,
  V10CredentialProblemReportRequest
} from '@ula-aca/aries-cloudagent-interface'

export enum IssueCredentialControllerMessages {
  GET_MEME_TYPES = '@ula-aca/issue-credential/get-meme-types',
  GET_ALL_EXCHANGE_RECORDS = '@ula-aca/issue-credential/get-all-exchange-records',
  GET_EXCHANGE_RECORD_BY_ID = '@ula-aca/issue-credential/get-exchange-record-by-id',
  SEND_CREDENTIAL = '@ula-aca/issue-credential/send-credential',
  SEND_PROPOSAL = '@ula-aca/issue-credential/send-proposal',
  SEND_OFFER = '@ula-aca/issue-credential/send-offer',
  SEND_OFFER_BY_ID = '@ula-aca/issue-credential/send-offer-by-id',
  SEND_REQUEST = '@ula-aca/issue-credential/send-request',
  ISSUE = '@ula-aca/issue-credential/issue',
  STORE = '@ula-aca/issue-credential/store',
  PROBLEM_REPORT = '@ula-aca/issue-credential/problem-report',
  REMOVE_EXCHANGE_RECORD = '@ula-aca/issue-credential/remove'
}

export class IssueCredentialController implements Plugin {
  protected eventHandler?: EventHandler

  private issueCredentialApi: IssueCredentialApi

  constructor(acaUrl: string) {
    const apiConfig = new Configuration({
      basePath: acaUrl
    })

    this.issueCredentialApi = new IssueCredentialApi(apiConfig)
  }

  initialize(eventHandler: EventHandler): void {
    this.eventHandler = eventHandler
  }

  get name(): string {
    return '@ula-aca/issue-credential/IssueCredentialController'
  }

  private async getMemeTypes(credentialId: string): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialMimeTypesCredentialIdGet(
      credentialId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async getAllCredentialExchangeRecords(): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsGet()
    return new UlaResponse({
      statusCode: response.status,
      body: response.data.results
    })
  }

  private async getCredentialExchangeRecordById(
    credExId: string
  ): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdGet(
      credExId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendCredential(
    data: V10CredentialProposalRequest
  ): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialSendPost(data)
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendProposal(
    data: V10CredentialProposalRequest
  ): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialSendProposalPost(
      data
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendOffer(
    data: V10CredentialOfferRequest
  ): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialSendOfferPost(
      data
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendOfferById(credExId: string): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdSendOfferPost(
      credExId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendRequest(credExId: string): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdSendRequestPost(
      credExId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async issue(
    credExId: string,
    data: V10CredentialIssueRequest
  ): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdIssuePost(
      credExId,
      data
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async store(credExId: string): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdStorePost(
      credExId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async problemReport(
    credExId: string,
    data: V10CredentialProblemReportRequest
  ): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdProblemReportPost(
      credExId,
      data
    )
    return new UlaResponse({
      statusCode: response.status,
      body: {}
    })
  }

  private async removeExchangeRecord(credExId: string): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdRemovePost(
      credExId
    )
    return new UlaResponse({
      statusCode: response.status,
      body: {}
    })
  }

  async handleEvent(message: Message, callback: any): Promise<string> {
    if (
      !Object.values(IssueCredentialControllerMessages).includes(
        message.properties.type
      )
    ) {
      return 'ignored'
    }

    // TODOC: Document messages and their properties
    let response: UlaResponse = null
    switch (message.properties.type) {
      case IssueCredentialControllerMessages.GET_MEME_TYPES:
        response = await this.getMemeTypes(message.properties.credId)
        break
      case IssueCredentialControllerMessages.GET_ALL_EXCHANGE_RECORDS:
        response = await this.getAllCredentialExchangeRecords()
        break
      case IssueCredentialControllerMessages.GET_EXCHANGE_RECORD_BY_ID:
        response = await this.getCredentialExchangeRecordById(
          message.properties.credExId
        )
        break
      case IssueCredentialControllerMessages.SEND_CREDENTIAL:
        response = await this.sendCredential(message.properties.credExId)
        break
      case IssueCredentialControllerMessages.SEND_PROPOSAL:
        response = await this.sendProposal(message.properties.data)
        break
      case IssueCredentialControllerMessages.SEND_OFFER:
        response = await this.sendOffer(message.properties.data)
        break
      case IssueCredentialControllerMessages.SEND_OFFER_BY_ID:
        response = await this.sendOfferById(message.properties.credExId)
        break
      case IssueCredentialControllerMessages.SEND_REQUEST:
        response = await this.sendRequest(message.properties.credExId)
        break
      case IssueCredentialControllerMessages.ISSUE:
        response = await this.issue(
          message.properties.credExId,
          message.properties.data
        )
        break
      case IssueCredentialControllerMessages.STORE:
        response = await this.store(message.properties.credExId)
        break

      case IssueCredentialControllerMessages.PROBLEM_REPORT:
        response = await this.problemReport(
          message.properties.presExId,
          message.properties.data
        )
        break
      case IssueCredentialControllerMessages.REMOVE_EXCHANGE_RECORD:
        response = await this.removeExchangeRecord(message.properties.presExId)
        break
      default:
        throw new Error(`unhandled message type: ${message.properties.type}`)
    }
    callback(response)
    return 'success'
  }
}
