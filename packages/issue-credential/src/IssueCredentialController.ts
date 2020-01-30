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

import { IssueCredentialApi } from '@ula-aca/aries-cloudagent-interface'
import {
  AcaControllerPlugin,
  UlaCallback,
  AcaControllerPluginOptions
} from '@ula-aca/core'

import {
  GetMimeTypesBody,
  GetExchangeRecordByIdBody,
  SendOfferByIdBody,
  SendRequestBody,
  IssueBody,
  StoreBody,
  ProblemReportBody,
  RemoveExchangeRecordBody,
  isIssueCredentialMessage,
  IssueCredentialMessageTypes,
  SendCredentialBody,
  SendProposalBody,
  SendOfferBody,
  ProblemReportResult,
  RemoveExchangeRecordResult
} from './messages'

class IssueCredentialController extends AcaControllerPlugin {
  private issueCredentialApi: IssueCredentialApi

  constructor(options?: AcaControllerPluginOptions) {
    super(options)

    this.issueCredentialApi = new IssueCredentialApi(this.apiConfig)
  }

  get name(): string {
    return '@ula-aca/issue-credential/IssueCredentialController'
  }

  private async getMimeTypes({
    credential_exchange_id
  }: GetMimeTypesBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialMimeTypesCredentialIdGet(
      credential_exchange_id
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
      body: response.data
    })
  }

  private async getCredentialExchangeRecordById({
    credential_exchange_id
  }: GetExchangeRecordByIdBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdGet(
      credential_exchange_id
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendCredential(body: SendCredentialBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialSendPost(body)

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendProposal(body: SendProposalBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialSendProposalPost(
      body
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendOffer(body: SendOfferBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialSendOfferPost(
      body
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendOfferById({
    credential_exchange_id
  }: SendOfferByIdBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdSendOfferPost(
      credential_exchange_id
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async sendRequest({
    credential_exchange_id
  }: SendRequestBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdSendRequestPost(
      credential_exchange_id
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async issue({
    credential_exchange_id,
    ...remainingBody
  }: IssueBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdIssuePost(
      credential_exchange_id,
      remainingBody
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async store({
    credential_exchange_id
  }: StoreBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdStorePost(
      credential_exchange_id
    )

    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async problemReport({
    credential_exchange_id,
    ...remainingBody
  }: ProblemReportBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdProblemReportPost(
      credential_exchange_id,
      remainingBody
    )

    const body = (response.data as unknown) as ProblemReportResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async removeExchangeRecord({
    credential_exchange_id
  }: RemoveExchangeRecordBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdRemovePost(
      credential_exchange_id
    )

    const body = (response.data as unknown) as RemoveExchangeRecordResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  @AcaControllerPlugin.handleError
  async handleEvent(message: Message, callback: UlaCallback): Promise<string> {
    if (!isIssueCredentialMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse

    switch (message.properties.type) {
      case IssueCredentialMessageTypes.GET_MIME_TYPES:
        response = await this.getMimeTypes(message.properties.body)
        break
      case IssueCredentialMessageTypes.GET_EXCHANGE_RECORDS:
        response = await this.getAllCredentialExchangeRecords()
        break
      case IssueCredentialMessageTypes.GET_EXCHANGE_RECORD_BY_ID:
        response = await this.getCredentialExchangeRecordById(
          message.properties.body
        )
        break
      case IssueCredentialMessageTypes.SEND_CREDENTIAL:
        response = await this.sendCredential(message.properties.body)
        break
      case IssueCredentialMessageTypes.SEND_PROPOSAL:
        response = await this.sendProposal(message.properties.body)
        break
      case IssueCredentialMessageTypes.SEND_OFFER:
        response = await this.sendOffer(message.properties.body)
        break
      case IssueCredentialMessageTypes.SEND_OFFER_BY_ID:
        response = await this.sendOfferById(message.properties.body)
        break
      case IssueCredentialMessageTypes.SEND_REQUEST:
        response = await this.sendRequest(message.properties.body)
        break
      case IssueCredentialMessageTypes.ISSUE:
        response = await this.issue(message.properties.body)
        break
      case IssueCredentialMessageTypes.STORE:
        response = await this.store(message.properties.body)
        break

      case IssueCredentialMessageTypes.PROBLEM_REPORT:
        response = await this.problemReport(message.properties.body)
        break
      case IssueCredentialMessageTypes.REMOVE_EXCHANGE_RECORD:
        response = await this.removeExchangeRecord(message.properties.body)
        break
    }

    callback(response)
    return 'success'
  }
}

export { IssueCredentialController }
