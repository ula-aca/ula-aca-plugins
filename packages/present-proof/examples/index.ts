import { EventHandler, UlaResponse } from 'universal-ledger-agent'

import {
  PresentProofMessageTypes,
  GetExchangeRecordsResult,
  GetExchangeRecordsMessage,
  GetExchangeRecordByIdBody,
  RemoveExchangeRecordBody,
  GetExchangeRecordByIdResult,
  GetExchangeRecordByIdMessage,
  SendProposalBody,
  SendProposalResult,
  SendProposalMessage,
  CreatePresentationRequestBody,
  CreatePresentationRequestResult,
  CreatePresentationRequestMessage,
  SendRequestBody,
  SendRequestResult,
  SendRequestMessage,
  SendRequestByIdBody,
  SendRequestByIdResult,
  SendRequestByIdMessage,
  SendPresentationBody,
  SendPresentationResult,
  SendPresentationMessage,
  VerifyPresentationBody,
  VerifyPresentationResult,
  VerifyPresentationMessage,
  RemoveExchangeRecordMessage,
  GetRequestCredentialsBody,
  GetRequestCredentialsMessage,
  GetRequestCredentialsResult
} from '../src'

async function getExchangeRecords(
  eventHandler: EventHandler
): Promise<GetExchangeRecordsResult> {
  return new Promise((resolve, reject) => {
    const message: GetExchangeRecordsMessage = {
      type: PresentProofMessageTypes.GET_EXCHANGE_RECORDS
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
): Promise<GetExchangeRecordByIdResult> {
  return new Promise((resolve, reject) => {
    const message: GetExchangeRecordByIdMessage = {
      type: PresentProofMessageTypes.GET_EXCHANGE_RECORD_BY_ID,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetExchangeRecordByIdResult = response.body
      resolve(result)
    })
  })
}

async function getRequestCredentials(
  eventHandler: EventHandler,
  options: GetRequestCredentialsBody
): Promise<GetRequestCredentialsResult> {
  return new Promise((resolve, reject) => {
    const message: GetRequestCredentialsMessage = {
      type: PresentProofMessageTypes.GET_PRESENTATION_REQUEST_CREDENTIALS,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetRequestCredentialsResult = response.body
      resolve(result)
    })
  })
}

// TODO need the return types for this one
//
// async function getRequestWithReferent(
//   eventHandler: EventHandler,
//   options: GetRequestCredentialsByReferentIdBody
// ): Promise<GetRequestCredentialsByReferentIdResult> {
//   return new Promise((resolve, reject) => {
//     const message: Get = {
//       type: PresentProofMessageTypes.GET_PRESENTATION_REQUEST_CREDENTIALS_WITH_REFERENT,
//       body: options
//     }

//     eventHandler.processMsg(message, (response: UlaResponse) => {
//       if (response.statusCode < 200 || response.statusCode >= 300)
//         reject(response.body)

//       const result: GetRequestCredentialsByReferentIdResult = response.body
//       resolve(result)
//     })
//   })
// }

async function sendProposal(
  eventHandler: EventHandler,
  options: SendProposalBody
): Promise<SendProposalResult> {
  return new Promise((resolve, reject) => {
    const message: SendProposalMessage = {
      type: PresentProofMessageTypes.SEND_PROPOSAL,
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

async function createPresentationRequest(
  eventHandler: EventHandler,
  options: CreatePresentationRequestBody
): Promise<CreatePresentationRequestResult> {
  return new Promise((resolve, reject) => {
    const message: CreatePresentationRequestMessage = {
      type: PresentProofMessageTypes.CREATE_PRESENTATION_REQUEST,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: CreatePresentationRequestResult = response.body
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
      type: PresentProofMessageTypes.SEND_REQUEST,
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

async function sendRequestById(
  eventHandler: EventHandler,
  options: SendRequestByIdBody
): Promise<SendRequestByIdResult> {
  return new Promise((resolve, reject) => {
    const message: SendRequestByIdMessage = {
      type: PresentProofMessageTypes.SEND_REQUEST_BY_ID,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: SendRequestByIdResult = response.body
      resolve(result)
    })
  })
}

async function sendPresentation(
  eventHandler: EventHandler,
  options: SendPresentationBody
): Promise<SendPresentationResult> {
  return new Promise((resolve, reject) => {
    const message: SendPresentationMessage = {
      type: PresentProofMessageTypes.SEND_PRESENTATION,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: SendPresentationResult = response.body
      resolve(result)
    })
  })
}

async function verifyPresentation(
  eventHandler: EventHandler,
  options: VerifyPresentationBody
): Promise<VerifyPresentationResult> {
  return new Promise((resolve, reject) => {
    const message: VerifyPresentationMessage = {
      type: PresentProofMessageTypes.VERIFY_PRESENTATION,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: VerifyPresentationResult = response.body
      resolve(result)
    })
  })
}

async function removeExchangeRecord(
  eventHandler: EventHandler,
  options: RemoveExchangeRecordBody
): Promise<void> {
  return new Promise((resolve, reject) => {
    const message: RemoveExchangeRecordMessage = {
      type: PresentProofMessageTypes.REMOVE_EXCHANGE_RECORD,
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
  getRequestCredentials,
  sendProposal,
  createPresentationRequest,
  sendRequest,
  sendRequestById,
  sendPresentation,
  verifyPresentation,
  removeExchangeRecord
}
