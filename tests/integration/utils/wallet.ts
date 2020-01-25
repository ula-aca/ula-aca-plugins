import { EventHandler, UlaResponse } from 'universal-ledger-agent'

import {
  GetDidsBody,
  GetDidsMessage,
  WalletMessageTypes,
  CreateLocalDidMessage,
  FetchPublicDidMessage,
  AssignPublicDidBody,
  AssignPublicDidMessage,
  GetTagPolicyBody,
  GetTagPolicyMessage,
  SetTagPolicyBody,
  SetTagPolicyMessage
} from '@ula-aca/wallet'

import { eventPromise } from '.'

const getDids = (
  eventHandler: EventHandler,
  body?: GetDidsBody
): Promise<UlaResponse> => {
  const message: GetDidsMessage = {
    type: WalletMessageTypes.GET_DIDS,
    body
  }

  return eventPromise(eventHandler, message)
}

const createLocalDid = (eventHandler: EventHandler): Promise<UlaResponse> => {
  const message: CreateLocalDidMessage = {
    type: WalletMessageTypes.CREATE_LOCAL_DID
  }

  return eventPromise(eventHandler, message)
}

const fetchPublicDid = (eventHandler: EventHandler): Promise<UlaResponse> => {
  const message: FetchPublicDidMessage = {
    type: WalletMessageTypes.FETCH_PUBLIC_DID
  }

  return eventPromise(eventHandler, message)
}

const assignPublicDid = (
  eventHandler: EventHandler,
  body: AssignPublicDidBody
): Promise<UlaResponse> => {
  const message: AssignPublicDidMessage = {
    type: WalletMessageTypes.ASSIGN_PUBLIC_DID,
    body
  }

  return eventPromise(eventHandler, message)
}

const getTagPolicy = (
  eventHandler: EventHandler,
  body: GetTagPolicyBody
): Promise<UlaResponse> => {
  const message: GetTagPolicyMessage = {
    type: WalletMessageTypes.GET_TAG_POLICY,
    body
  }

  return eventPromise(eventHandler, message)
}

const setTagPolicy = (
  eventHandler: EventHandler,
  body: SetTagPolicyBody
): Promise<UlaResponse> => {
  const message: SetTagPolicyMessage = {
    type: WalletMessageTypes.SET_TAG_POLICY,
    body
  }

  return eventPromise(eventHandler, message)
}

const getTestDids = async (
  eventHandler: EventHandler,
  noOfDids: number
): Promise<{
  did: string
  verkey: string
  public: boolean
}[]> => {
  const didResults = await Promise.all(
    Array.from(Array(noOfDids), () => createLocalDid(eventHandler))
  )

  return didResults.map(did => did.body.result)
}

export {
  getDids,
  createLocalDid,
  fetchPublicDid,
  assignPublicDid,
  getTagPolicy,
  setTagPolicy,
  getTestDids
}
