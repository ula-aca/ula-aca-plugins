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
  IssueCredentialApi,
  V10CredentialProposalRequest,
  V10CredentialOfferRequest
} from '@ula-aca/aries-cloudagent-interface'
import { AxiosError } from 'axios'
import {
  GetMemeTypesBody,
  GetExchangeRecordsResult,
  GetExchangeRecordByIdBody,
  GetExchangeRecordByIdResult,
  SendCredentialResult,
  SendProposalResult,
  SendOfferResult,
  SendOfferByIdBody,
  SendOfferByIdResult,
  SendRequestBody,
  SendRequestResult,
  IssueBody,
  IssueResult,
  StoreBody,
  StoreResult,
  ProblemReportBody,
  RemoveExchangeRecordBody,
  isIssueCredentialMessage,
  IssueCredentialMessageTypes
} from './messages'

class IssueCredentialController implements Plugin {
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

  private async getMemeTypes({
    credential_id
  }: GetMemeTypesBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialMimeTypesCredentialIdGet(
      credential_id
    )
    return new UlaResponse({
      statusCode: response.status,
      body: response.data
    })
  }

  private async getAllCredentialExchangeRecords(): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsGet()

    // The generated API does not provide the correct response typing
    const body = (response.data.results as unknown) as GetExchangeRecordsResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async getCredentialExchangeRecordById({
    credential_id
  }: GetExchangeRecordByIdBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdGet(
      credential_id
    )

    const body = (response.data as unknown) as GetExchangeRecordByIdResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async sendCredential({
    issuer_did,
    credential_proposal,
    schema_name,
    cred_def_id,
    connection_id,
    schema_version,
    schema_id,
    comment,
    schema_issuer_did
  }: V10CredentialProposalRequest): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialSendPost({
      issuer_did,
      credential_proposal,
      schema_name,
      cred_def_id,
      connection_id,
      schema_version,
      schema_id,
      comment,
      schema_issuer_did
    })

    const body = (response.data as unknown) as SendCredentialResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async sendProposal({
    issuer_did,
    credential_proposal,
    schema_name,
    cred_def_id,
    connection_id,
    schema_version,
    schema_id,
    comment,
    schema_issuer_did
  }: V10CredentialProposalRequest): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialSendProposalPost(
      {
        issuer_did,
        credential_proposal,
        schema_name,
        cred_def_id,
        connection_id,
        schema_version,
        schema_id,
        comment,
        schema_issuer_did
      }
    )

    const body = (response.data as unknown) as SendProposalResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async sendOffer({
    credential_preview,
    auto_issue,
    cred_def_id,
    connection_id,
    comment
  }: V10CredentialOfferRequest): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialSendOfferPost(
      {
        credential_preview,
        auto_issue,
        cred_def_id,
        connection_id,
        comment
      }
    )

    const body = (response.data as unknown) as SendOfferResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async sendOfferById({
    cred_ex_id
  }: SendOfferByIdBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdSendOfferPost(
      cred_ex_id
    )

    const body = (response.data as unknown) as SendOfferByIdResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async sendRequest({
    cred_ex_id
  }: SendRequestBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdSendRequestPost(
      cred_ex_id
    )

    const body = (response.data as unknown) as SendRequestResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async issue({
    cred_ex_id,
    comment,
    credential_preview
  }: IssueBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdIssuePost(
      cred_ex_id,
      {
        comment,
        credential_preview
      }
    )

    const body = (response.data as unknown) as IssueResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async store({ cred_ex_id }: StoreBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdStorePost(
      cred_ex_id
    )

    const body = (response.data as unknown) as StoreResult

    return new UlaResponse({
      statusCode: response.status,
      body
    })
  }

  private async problemReport({
    cred_ex_id,
    explain_ltxt
  }: ProblemReportBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdProblemReportPost(
      cred_ex_id,
      {
        explain_ltxt
      }
    )

    return new UlaResponse({
      statusCode: response.status,
      body: {}
    })
  }

  private async removeExchangeRecord({
    cred_ex_id
  }: RemoveExchangeRecordBody): Promise<UlaResponse> {
    const response = await this.issueCredentialApi.issueCredentialRecordsCredExIdRemovePost(
      cred_ex_id
    )

    return new UlaResponse({
      statusCode: response.status,
      body: {}
    })
  }

  async handleEvent(message: Message, callback: any): Promise<string> {
    if (!isIssueCredentialMessage(message.properties)) {
      return 'ignored'
    }

    let response: UlaResponse
    try {
      switch (message.properties.type) {
        case IssueCredentialMessageTypes.GET_MEME_TYPES:
          response = await this.getMemeTypes(message.properties.body)
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

export { IssueCredentialController }
