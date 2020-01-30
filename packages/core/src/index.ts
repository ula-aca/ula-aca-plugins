import { UlaResponse } from 'universal-ledger-agent'

export * from './AcaControllerPlugin'
export * from './AcaEventPlugin'

export type UlaCallback = (res: UlaResponse) => Promise<void> | void
