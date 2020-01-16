import { EventHandler, UlaResponse } from 'universal-ledger-agent'
import {
  GetExchangeRecordsResult,
  IssueCredentialMessageTypes,
  GetExchangeRecordsMessage,
  GetExchangeRecordByIdMessage,
  GetExchangeRecordByIdBody,
  SendCredentialBody,
  SendCredentialResult,
  SendCredentialMessage,
  SendProposalMessage,
  SendProposalResult,
  SendProposalBody,
  SendOfferResult,
  SendOfferMessage,
  SendOfferBody,
  SendOfferByIdBody,
  SendOfferByIdResult,
  SendOfferByIdMessage,
  SendRequestBody,
  SendRequestResult,
  SendRequestMessage,
  IssueBody,
  IssueResult,
  IssueMessage,
  StoreBody,
  StoreResult,
  StoreMessage,
  ProblemReportBody,
  ProblemReportMessage,
  RemoveExchangeRecordBody,
  RemoveExchangeRecordMessage
} from '../src'

async function getExchangeRecords(
  eventHandler: EventHandler
): Promise<GetExchangeRecordsResult> {
  return new Promise((resolve, reject) => {
    const message: GetExchangeRecordsMessage = {
      type: IssueCredentialMessageTypes.GET_EXCHANGE_RECORDS
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetExchangeRecordsResult = response.body
      resolve(result)
    })
  })
}

async function getExchangeRecordById(
  eventHandler: EventHandler,
  options: GetExchangeRecordByIdBody
): Promise<GetExchangeRecordByIdMessage> {
  return new Promise((resolve, reject) => {
    const message: GetExchangeRecordByIdMessage = {
      type: IssueCredentialMessageTypes.GET_EXCHANGE_RECORD_BY_ID,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetExchangeRecordByIdMessage = response.body
      resolve(result)
    })
  })
}

async function sendCredential(
  eventHandler: EventHandler,
  options: SendCredentialBody
): Promise<SendCredentialResult> {
  return new Promise((resolve, reject) => {
    const message: SendCredentialMessage = {
      type: IssueCredentialMessageTypes.SEND_CREDENTIAL,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: SendCredentialResult = response.body
      resolve(result)
    })
  })
}

async function sendProposal(
  eventHandler: EventHandler,
  options: SendProposalBody
): Promise<SendProposalResult> {
  return new Promise((resolve, reject) => {
    const message: SendProposalMessage = {
      type: IssueCredentialMessageTypes.SEND_PROPOSAL,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: SendProposalResult = response.body
      resolve(result)
    })
  })
}

async function sendOffer(
  eventHandler: EventHandler,
  options: SendOfferBody
): Promise<SendOfferResult> {
  return new Promise((resolve, reject) => {
    const message: SendOfferMessage = {
      type: IssueCredentialMessageTypes.SEND_OFFER,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: SendOfferResult = response.body
      resolve(result)
    })
  })
}

async function sendOfferById(
  eventHandler: EventHandler,
  options: SendOfferByIdBody
): Promise<SendOfferByIdResult> {
  return new Promise((resolve, reject) => {
    const message: SendOfferByIdMessage = {
      type: IssueCredentialMessageTypes.SEND_OFFER_BY_ID,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: SendOfferByIdResult = response.body
      resolve(result)
    })
  })
}

async function sendRequest(
  eventHandler: EventHandler,
  options: SendRequestBody
): Promise<SendRequestResult> {
  return new Promise((resolve, reject) => {
    const message: SendRequestMessage = {
      type: IssueCredentialMessageTypes.SEND_REQUEST,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: SendRequestResult = response.body
      resolve(result)
    })
  })
}

async function issue(
  eventHandler: EventHandler,
  options: IssueBody
): Promise<IssueResult> {
  return new Promise((resolve, reject) => {
    const message: IssueMessage = {
      type: IssueCredentialMessageTypes.ISSUE,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: IssueResult = response.body
      resolve(result)
    })
  })
}

async function store(
  eventHandler: EventHandler,
  options: StoreBody
): Promise<StoreResult> {
  return new Promise((resolve, reject) => {
    const message: StoreMessage = {
      type: IssueCredentialMessageTypes.STORE,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: StoreResult = response.body
      resolve(result)
    })
  })
}

async function problemReport(
  eventHandler: EventHandler,
  options: ProblemReportBody
): Promise<void> {
  return new Promise((resolve, reject) => {
    const message: ProblemReportMessage = {
      type: IssueCredentialMessageTypes.PROBLEM_REPORT,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      resolve()
    })
  })
}

async function removeExchangeRecord(
  eventHandler: EventHandler,
  options: RemoveExchangeRecordBody
): Promise<void> {
  return new Promise((resolve, reject) => {
    const message: RemoveExchangeRecordMessage = {
      type: IssueCredentialMessageTypes.REMOVE_EXCHANGE_RECORD,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)
      resolve()
    })
  })
}

export {
  getExchangeRecords,
  getExchangeRecordById,
  sendCredential,
  sendProposal,
  sendOffer,
  sendOfferById,
  sendRequest,
  issue,
  store,
  problemReport,
  removeExchangeRecord
}
