import {
  isPairwiseConnectionRecordActive,
  isPairwiseConnectionRecordError,
  isPairwiseConnectionRecordInactive,
  isPairwiseConnectionRecordInit,
  isPairwiseConnectionRecordInvitation,
  isPairwiseConnectionRecordRequest,
  isPairwiseConnectionRecordResponse,
  PairwiseConnectionRecordBase,
  PairwiseConnectionRecordState
} from '../src/pairwise-connection-record'

const baseEvent: Omit<PairwiseConnectionRecordBase, 'state'> = {
  accept: 'auto',
  connection_id: 'connection_id',
  initiator: 'external',
  invitation_key: 'invitation_key',
  invitation_mode: 'multi',
  routing_state: 'active'
}

describe('[package] @ula-aca/aca-webhook-event-models', () => {
  describe('pairwise-connection-record', () => {
    it("[function] isPairwiseConnectionRecordActive() should return whether event state is 'active'", () => {
      isPairwiseConnectionRecordActive({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ACTIVE
      }).should.equal(true)

      isPairwiseConnectionRecordActive({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ERROR
      }).should.equal(false)
    })

    it("[function] isPairwiseConnectionRecordError() should return whether event state is 'error'", () => {
      isPairwiseConnectionRecordError({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ERROR
      }).should.equal(true)

      isPairwiseConnectionRecordError({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ACTIVE
      }).should.equal(false)
    })

    it("[function] isPairwiseConnectionRecordInactive() should return whether event state is 'inactive'", () => {
      isPairwiseConnectionRecordInactive({
        ...baseEvent,
        state: PairwiseConnectionRecordState.INACTIVE
      }).should.equal(true)

      isPairwiseConnectionRecordInactive({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ERROR
      }).should.equal(false)
    })

    it("[function] isPairwiseConnectionRecordInit() should return whether event state is 'init'", () => {
      isPairwiseConnectionRecordInit({
        ...baseEvent,
        state: PairwiseConnectionRecordState.INIT
      }).should.equal(true)

      isPairwiseConnectionRecordInit({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ERROR
      }).should.equal(false)
    })

    it("[function] isPairwiseConnectionRecordInvitation() should return whether event state is 'invitation'", () => {
      isPairwiseConnectionRecordInvitation({
        ...baseEvent,
        state: PairwiseConnectionRecordState.INVITATION
      }).should.equal(true)

      isPairwiseConnectionRecordInvitation({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ERROR
      }).should.equal(false)
    })

    it("[function] isPairwiseConnectionRecordRequest() should return whether event state is 'request'", () => {
      isPairwiseConnectionRecordRequest({
        ...baseEvent,
        state: PairwiseConnectionRecordState.REQUEST
      }).should.equal(true)

      isPairwiseConnectionRecordRequest({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ERROR
      }).should.equal(false)
    })

    it("[function] isPairwiseConnectionRecordResponse() should return whether event state is 'response'", () => {
      isPairwiseConnectionRecordResponse({
        ...baseEvent,
        state: PairwiseConnectionRecordState.RESPONSE
      }).should.equal(true)

      isPairwiseConnectionRecordResponse({
        ...baseEvent,
        state: PairwiseConnectionRecordState.ERROR
      }).should.equal(false)
    })
  })
})
