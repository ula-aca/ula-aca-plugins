import { EventHandler, UlaResponse } from 'universal-ledger-agent'

import {
  GetDidsBody,
  GetDidsResult,
  GetDidsMessage,
  WalletMessageTypes,
  CreateLocalDidResult,
  CreateLocalDidMessage,
  FetchPublicDidResult,
  FetchPublicDidMessage,
  AssignPublicDidBody,
  AssignPublicDidResult,
  AssignPublicDidMessage,
  GetTagPolicyBody,
  GetTagPolicyResult,
  GetTagPolicyMessage,
  SetTagPolicyBody,
  SetTagPolicyMessage
} from '../src'

async function getDids(
  eventHandler: EventHandler,
  body?: GetDidsBody
): Promise<GetDidsResult> {
  return new Promise((resolve, reject) => {
    const message: GetDidsMessage = {
      type: WalletMessageTypes.GET_DIDS,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetDidsResult = response.body
      resolve(result)
    })
  })
}

async function createLocalDid(
  eventHandler: EventHandler
): Promise<CreateLocalDidResult> {
  return new Promise((resolve, reject) => {
    const message: CreateLocalDidMessage = {
      type: WalletMessageTypes.CREATE_LOCAL_DID
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: CreateLocalDidResult = response.body
      resolve(result)
    })
  })
}

async function fetchPublicDid(
  eventHandler: EventHandler
): Promise<FetchPublicDidResult> {
  return new Promise((resolve, reject) => {
    const message: FetchPublicDidMessage = {
      type: WalletMessageTypes.FETCH_PUBLIC_DID
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: FetchPublicDidResult = response.body
      resolve(result)
    })
  })
}

async function assignPublicDid(
  eventHandler: EventHandler,
  body: AssignPublicDidBody
): Promise<AssignPublicDidResult> {
  return new Promise((resolve, reject) => {
    const message: AssignPublicDidMessage = {
      type: WalletMessageTypes.ASSIGN_PUBLIC_DID,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: AssignPublicDidResult = response.body
      resolve(result)
    })
  })
}

async function getTagPolicy(
  eventHandler: EventHandler,
  body: GetTagPolicyBody
): Promise<GetTagPolicyResult> {
  return new Promise((resolve, reject) => {
    const message: GetTagPolicyMessage = {
      type: WalletMessageTypes.GET_TAG_POLICY,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetTagPolicyResult = response.body
      resolve(result)
    })
  })
}

async function setTagPolicy(
  eventHandler: EventHandler,
  body: SetTagPolicyBody
): Promise<void> {
  return new Promise((resolve, reject) => {
    const message: SetTagPolicyMessage = {
      type: WalletMessageTypes.SET_TAG_POLICY,
      body
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)
      resolve()
    })
  })
}

export {
  getDids,
  createLocalDid,
  fetchPublicDid,
  assignPublicDid,
  getTagPolicy,
  setTagPolicy
}
