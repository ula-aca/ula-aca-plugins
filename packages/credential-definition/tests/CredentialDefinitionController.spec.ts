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

import { EventHandler, Message, UlaResponse } from 'universal-ledger-agent'
import sinon from 'sinon'
import { CredentialDefinitionApi } from '@ula-aca/aries-cloudagent-interface'
import {
  stubInterfaceFunction,
  stubNoAxiosResponseInterfaceFunction,
  stubInterfaceRejectsFunction
} from '@ula-aca/test-utils'
import {
  CredentialDefinitionController,
  GetCreatedCredentialDefinitionsMessage,
  CreateCredentialDefinitionMessage,
  GetCredentialDefinitionByIdMessage
} from '../src'

describe('[package] @ula-aca/credential-definition', () => {
  describe('[plugin] CredentialDefinitionController', () => {
    let eventHandler: EventHandler
    let credentialDefinitionPlugin: CredentialDefinitionController
    let credentialDefinitionApiStubbed: sinon.SinonStub

    beforeEach(() => {
      eventHandler = new EventHandler([])
      credentialDefinitionPlugin = new CredentialDefinitionController(
        'http://url.test'
      )
      credentialDefinitionPlugin.initialize(eventHandler)
    })

    afterEach(() => {
      credentialDefinitionApiStubbed && credentialDefinitionApiStubbed.restore()
    })

    it("plugin name should be '@ula-aca/credential-definition/CredentialDefinitionController'", () => {
      credentialDefinitionPlugin.name.should.equal(
        '@ula-aca/credential-definition/CredentialDefinitionController'
      )
    })

    describe('[function] handleEvent()', () => {
      it("should return 'ignored' when an unknown message type is passed", async () => {
        const ignoreMessageTypes = [
          'create-credential-def',
          'random-message',
          'a',
          'get-cred'
        ]

        for (const messageType of ignoreMessageTypes) {
          const message = new Message({
            type: messageType
          })

          const response = await credentialDefinitionPlugin.handleEvent(
            message,
            () => {}
          )

          response.should.equal('ignored')
        }
      })

      it("should return 'error' when statusCode is not in range 200-299", async () => {
        const statusCode = 300
        const expectedResult = 'error'

        credentialDefinitionApiStubbed = stubInterfaceFunction({
          Class: CredentialDefinitionApi,
          functionName: 'credentialDefinitionsCreatedGet',
          status: statusCode
        })

        const message = new Message({
          type:
            '@ula-aca/credential-definition/get-created-credential-definitions'
        } as GetCreatedCredentialDefinitionsMessage)

        const eventRes = await credentialDefinitionPlugin.handleEvent(
          message,
          () => {}
        )

        eventRes.should.equal(expectedResult)
      })

      it('should call the callback with the error and statusCode when an API call fails', async () => {
        const credentialDefinitionId = 'Non-existent credential definition id'
        const data = '500 Internal Server Error\n\nServer got itself in trouble'

        const statusCode = 500

        const expectedResult = new UlaResponse({
          body: {
            error: data
          },
          statusCode
        })

        credentialDefinitionApiStubbed = stubInterfaceFunction({
          Class: CredentialDefinitionApi,
          functionName: 'credentialDefinitionsIdGet',
          data,
          status: statusCode,
          rejects: true
        })

        const message = new Message({
          type:
            '@ula-aca/credential-definition/get-credential-definition-by-id',
          body: { credential_definition_id: credentialDefinitionId }
        } as GetCredentialDefinitionByIdMessage)

        await credentialDefinitionPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('should call the callback with the the axiosErr and status 500 when there is no response from the API', async () => {
        const credentialDefinitionId =
          'Bqqp9wananY4uW2pRHACiT:3:CL:10:my-cred-def'

        const data = {
          message: 'Error'
        }
        const statusCode = 500

        const expectedResult = new UlaResponse({
          body: {
            error: data
          },
          statusCode
        })

        credentialDefinitionApiStubbed = stubNoAxiosResponseInterfaceFunction({
          Class: CredentialDefinitionApi,
          functionName: 'credentialDefinitionsIdGet',
          data
        })

        const message = new Message({
          type:
            '@ula-aca/credential-definition/get-credential-definition-by-id',
          body: { credential_definition_id: credentialDefinitionId }
        } as GetCredentialDefinitionByIdMessage)

        await credentialDefinitionPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            res.should.deep.equal(expectedResult)
          }
        )
      })

      it('should call the callback with the the error and status 500 when the error is not an AxiosError', async () => {
        const credentialDefinitionId =
          'Bqqp9wananY4uW2pRHACiT:3:CL:10:my-cred-def'

        const data = new Error('Something went wrong')
        const statusCode = 500

        const expectedResult = new UlaResponse({
          body: {
            error: data
          },
          statusCode
        })

        credentialDefinitionApiStubbed = stubInterfaceRejectsFunction({
          Class: CredentialDefinitionApi,
          functionName: 'credentialDefinitionsIdGet',
          data
        })

        const message = new Message({
          type:
            '@ula-aca/credential-definition/get-credential-definition-by-id',
          body: { credential_definition_id: credentialDefinitionId }
        } as GetCredentialDefinitionByIdMessage)

        await credentialDefinitionPlugin.handleEvent(
          message,
          (res: UlaResponse) => {
            res.should.deep.equal(expectedResult)
          }
        )
      })

      describe('events', () => {
        describe('@ula-aca/credential-definition/get-created-credential-definitions', () => {
          it('should pass the parameters to CredentialDefinitionApi function credentialDefinitionsCreatedGet', async () => {
            const schemaId = 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0'
            const schemaIssuerDid = 'WgWxqztrNooG92RXvxSTWv'
            const schemaName = 'schema_name'
            const schemaVersion = '1.0'
            const issuerDid = '2gv3WyywspB2mYAwe2Sdp4'
            const credentialDefinitionId =
              'Bqqp9wananY4uW2pRHACiT:3:CL:10:my-cred-def'

            const data = {
              credential_definition_ids: [
                'Bqqp9wananY4uW2pRHACiT:3:CL:10:my-cred-def'
              ]
            }
            const statusCode = 200

            const expectedResult = new UlaResponse({
              body: data,
              statusCode
            })

            credentialDefinitionApiStubbed = stubInterfaceFunction({
              Class: CredentialDefinitionApi,
              functionName: 'credentialDefinitionsCreatedGet',
              data,
              status: statusCode
            })

            const message = new Message({
              type:
                '@ula-aca/credential-definition/get-created-credential-definitions',
              body: {
                schema_id: schemaId,
                schema_issuer_did: schemaIssuerDid,
                schema_name: schemaName,
                schema_version: schemaVersion,
                issuer_did: issuerDid,
                credential_definition_id: credentialDefinitionId
              }
            } as GetCreatedCredentialDefinitionsMessage)

            await credentialDefinitionPlugin.handleEvent(
              message,
              (res: UlaResponse) => {
                credentialDefinitionApiStubbed.should.have.been.calledWith(
                  schemaId,
                  schemaIssuerDid,
                  schemaName,
                  schemaVersion,
                  issuerDid,
                  credentialDefinitionId
                )
                res.should.deep.equal(expectedResult)
              }
            )
          })

          it('should work when no body is passed', async () => {
            const data = {
              credential_definition_ids: [
                'Bqqp9wananY4uW2pRHACiT:3:CL:10:my-cred-def'
              ]
            }
            const statusCode = 200

            const expectedResult = new UlaResponse({
              body: data,
              statusCode
            })

            credentialDefinitionApiStubbed = stubInterfaceFunction({
              Class: CredentialDefinitionApi,
              functionName: 'credentialDefinitionsCreatedGet',
              data,
              status: statusCode
            })

            const message = new Message({
              type:
                '@ula-aca/credential-definition/get-created-credential-definitions'
            } as GetCreatedCredentialDefinitionsMessage)

            await credentialDefinitionPlugin.handleEvent(
              message,
              (res: UlaResponse) => {
                credentialDefinitionApiStubbed.should.have.been.calledWith()
                res.should.deep.equal(expectedResult)
              }
            )
          })
        })

        it('@ula-aca/credential-definition/get-credential-definition-by-id', async () => {
          const credentialDefinitionId =
            'Bqqp9wananY4uW2pRHACiT:3:CL:10:my-cred-def'

          const data = {
            credential_definition: {
              ver: '1.0',
              id: 'Bqqp9wananY4uW2pRHACiT:3:CL:10:my-cred-def',
              schemaId: '10',
              type: 'CL',
              tag: 'my-cred-def',
              value: {
                primary: {
                  n:
                    '104412401799316849416948558542419855450775637461623887522856957587599879248667969446606846137134597820314563999090631481856596863624560035690471792197848997278345574043786478164135001207807564918731690851116681357673946331068042423025997909564337112726152577059186236932852611384985826836481002832402312689559087024951571185942161025153525681219849690678977385863596785900652778390901017051562238593247389790772182209445902514149898735019119291472821924962263994503371741577767091084219769188999356120329969765106797563082808219884070681763698021214363537516430706450470001166168210731551380097706526182312341899107901',
                  s:
                    '34538432914571050988610411099798681219003392840984024217545146697364325340681023195830340595470492528921982551255094321791614613702968333032198291252636837094718548407409357627532923379173757199228951746788454820972544712472534649209491329588884761752882889298258372649116202305816994330975665364683449090862556120417813431390898976039172612305036368775945076360845247973454846814940603726410338742792978052355492737342923594943512545031053233315218872565610691835134311012218869096622591479151681689492959899646625293712065930787087445030704735882479099766186826205024928123575116683600085917662958390402432292307227',
                  r: {
                    name:
                      '77885246760428018475870494957233000943933304838771030260210372862002774887194353109139534263424672708099314693163790876159566236330644308458514413330813173523211896180706738794547826396110186932841484746167421530932900488753816808767576147338961419786693690880906345026965055615027360556419601736660269559881117796538536286837885790310475377238881466719005064628256669267311895400230828717518871913816908657778014884794431987624711271115097030458969131700785046464662934265369053047728900031671168300245960818624698932382959301116366026030673425276470764407020047673091482320267301275044306790207188250560162096163525',
                    master_secret:
                      '57688161150997440238460807847137084665345498528461184651776271835964316048188637746579350917433832549080995775226161161182618584606747344905174081625753047249457537731899439597863062351973968176345029151908482512341375349783199705085507652261421378296539934345658734799607347499947560750832210608397872638214800476471347180877217653370888143695563828605653551884417441415648437827057216991602904899154705867695388353727877343138986221210829433601611110730118106415309617324147622257486226309134132617441679227846768625166201308848792772858873690419853831787533497907730044375987015902223315278139657360245105715615370'
                  },
                  rctxt:
                    '61272020410840909874454163387704687632490065617151745463569542694468978022813322267115249646002992087223197111118777112016689373927519615661275512189055194203304782549009290638827893687231683419270602501659851127002512116655784717663872162533563798624542124296627733222196721523728920482980953007789863975330064188991462256317998269882803807239369258043924346368731370687973639044000113515510601203723944403742629687200127166678488675660607677198012643115106700296438629991136053241494541657085170682246835692554650753698132812430132868434273423383053649878889730951586179973282896047310728545813614728182695011939044',
                  z:
                    '70107476257507231805453480242744609638683239213021543575420999116491576147010547886372599044433647963087422705569719989593737677172922592987641628259210715749959856953780290397825013977320914068405487453834934501883496340272302819118119166693711890087565401349701138727802740073837598905172908929921664212524420305360805250267238522162483067470383246718563142144137533974289136922159979460816804308508592596038581093036515725491834739724720927245072913909692262554962768303897600117113057563983218670932749246341289325376557635238721972555322999214810277876362695096396536501032990521986686667959584717792073960140097'
                }
              }
            }
          }
          const statusCode = 200

          const expectedResult = new UlaResponse({
            body: data,
            statusCode
          })

          credentialDefinitionApiStubbed = stubInterfaceFunction({
            Class: CredentialDefinitionApi,
            functionName: 'credentialDefinitionsIdGet',
            data,
            status: statusCode
          })

          const message = new Message({
            type:
              '@ula-aca/credential-definition/get-credential-definition-by-id',
            body: { credential_definition_id: credentialDefinitionId }
          } as GetCredentialDefinitionByIdMessage)

          await credentialDefinitionPlugin.handleEvent(
            message,
            (res: UlaResponse) => {
              credentialDefinitionApiStubbed.should.have.been.calledWith(
                credentialDefinitionId
              )
              res.should.deep.equal(expectedResult)
            }
          )
        })

        it('@ula-aca/credential-definition/create-credential-definition', async () => {
          const body = {
            tag: 'my-cred-def',
            schema_id: 'Bqqp9wananY4uW2pRHACiT:2:Test:1.0'
          }

          const data = {
            credential_definition_id:
              'Bqqp9wananY4uW2pRHACiT:3:CL:10:my-cred-def'
          }
          const statusCode = 200

          const expectedResult = new UlaResponse({
            body: data,
            statusCode
          })

          credentialDefinitionApiStubbed = stubInterfaceFunction({
            Class: CredentialDefinitionApi,
            functionName: 'credentialDefinitionsPost',
            data,
            status: statusCode
          })

          const message = new Message({
            type: '@ula-aca/credential-definition/create-credential-definition',
            body
          } as CreateCredentialDefinitionMessage)

          await credentialDefinitionPlugin.handleEvent(
            message,
            (res: UlaResponse) => {
              credentialDefinitionApiStubbed.should.have.been.calledWith(body)
              res.should.deep.equal(expectedResult)
            }
          )
        })
      })
    })
  })
})
