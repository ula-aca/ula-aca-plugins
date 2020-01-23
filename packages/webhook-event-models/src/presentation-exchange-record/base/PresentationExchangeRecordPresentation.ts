/*
 * Copyright 2020-present ula-aca
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

export interface PresentationExchangeRecordPresentation {
  proof: {
    proofs: [
      {
        primary_proof: {
          eq_proof: {
            revealed_attrs: {
              [key: string]: string
            }
            a_prime: string
            e: string
            v: string
            m: {
              master_secret: string
            }
            m2: string
          }
          ge_proofs: []
        }
        non_revoc_proof: null
      }
    ]
    aggregated_proof: {
      c_hash: string
      c_list: number[][]
    }
  }
  requested_proof: {
    revealed_attrs: {
      [key: string]: {
        sub_proof_index: number
        raw: string
        encoded: string
      }
    }
    self_attested_attrs: {}
    unrevealed_attrs: {}
    predicates: {}
  }
  identifiers: {
    schema_id: string
    cred_def_id: string
    rev_reg_id: string | null
    timestamp: string | null
  }[]
}
