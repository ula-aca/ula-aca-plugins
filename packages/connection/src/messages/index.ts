import { EstablishInboundMessage } from './EstablishInbound'
import { AcceptInvitationMessage } from './AcceptInvitation'
import { AcceptRequestMessage } from './AcceptRequest'
import { ConnectionMessageTypes } from './ConnectionMessageTypes'
import { CreateInvitationMessage } from './CreateInvitation'
import { GetConnectionByIdMessage } from './GetConnectionById'
import { GetConnectionsMessage } from './GetConnections'
import { ReceiveInvitationMessage } from './ReceiveInvitation'
import { RemoveConnectionMessage } from './RemoveConnection'
import { SendBasicMessageMessage } from './SendBasicMessage'
import { SendPingMessage } from './SendPing'

type ConnectionMessageType =
  | AcceptInvitationMessage
  | AcceptRequestMessage
  | CreateInvitationMessage
  | GetConnectionByIdMessage
  | GetConnectionsMessage
  | EstablishInboundMessage
  | ReceiveInvitationMessage
  | RemoveConnectionMessage
  | SendBasicMessageMessage
  | SendPingMessage

function isConnectionMessage(properties): properties is ConnectionMessageType {
  return Object.values(ConnectionMessageTypes).includes(properties.type)
}

export { ConnectionMessageType, isConnectionMessage }

export * from './AcceptInvitation'
export * from './AcceptRequest'
export * from './ConnectionMessageTypes'
export * from './CreateInvitation'
export * from './GetConnectionById'
export * from './GetConnections'
export * from './ReceiveInvitation'
export * from './RemoveConnection'
export * from './SendBasicMessage'
export * from './SendPing'
export * from './EstablishInbound'
