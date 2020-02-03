# Universal Ledger Agent - Aries Cloudagent Webhook Event Models

![npm (scoped)](https://img.shields.io/npm/v/@ula-aca/webhook-event-models)

This is a helper package with base models for creating plugins that interact with Aries Cloudagent webhook events. It is used by the Webhook Event Handlers to react to webhook events (e.g. PresentProofEventHandler from `@ula-aca/present-proof`). It is also used by the plugins that emit the Webhook events to the Universal Ledger Agent (ULA). Currently only the `@ula-aca/webhook-relay-event-router` package uses it to emit events, but it could be used to build for example a Webhook receiver directly into the ULA.

Webhook events are documentend in the Aries Cloud Agent Python [repository](https://github.com/hyperledger/aries-cloudagent-python/blob/master/AdminAPI.md#administration-api-webhooks).

Unless you are creating a plugin you should only directly use this package for type definitions in received events in the event handlers.
