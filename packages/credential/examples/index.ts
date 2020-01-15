import { EventHandler, UlaResponse } from 'universal-ledger-agent'

import {
  GetCredentialsBody,
  GetCredentialsResult,
  GetCredentialsMessage,
  CredentialMessageTypes,
  GetCredentialByIdBody,
  GetCredentialByIdResult,
  GetCredentialByIdMessage
} from '../src'
import {
  RemoveCredentialBody,
  RemoveCredentialResult,
  RemoveCredentialMessage
} from '../src/messages/RemoveCredential'

async function getCredentials(
  eventHandler: EventHandler,
  options: GetCredentialsBody
): Promise<GetCredentialsResult> {
  return new Promise((resolve, reject) => {
    const message: GetCredentialsMessage = {
      type: CredentialMessageTypes.GET_CREDENTIALS,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetCredentialsResult = response.body
      resolve(result)
    })
  })
}

async function getCredentialById(
  eventHandler: EventHandler,
  options: GetCredentialByIdBody
): Promise<GetCredentialByIdResult> {
  return new Promise((resolve, reject) => {
    const message: GetCredentialByIdMessage = {
      type: CredentialMessageTypes.GET_CREDENTIAL_BY_ID,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: GetCredentialByIdResult = response.body
      resolve(result)
    })
  })
}

async function removeCredential(
  eventHandler: EventHandler,
  options: RemoveCredentialBody
): Promise<RemoveCredentialResult> {
  return new Promise((resolve, reject) => {
    const message: RemoveCredentialMessage = {
      type: CredentialMessageTypes.REMOVE_CREDENTIAL,
      body: options
    }

    eventHandler.processMsg(message, (response: UlaResponse) => {
      if (response.statusCode < 200 || response.statusCode >= 300)
        reject(response.body)

      const result: RemoveCredentialResult = response.body
      resolve(result)
    })
  })
}

export { getCredentials, getCredentialById, removeCredential }
