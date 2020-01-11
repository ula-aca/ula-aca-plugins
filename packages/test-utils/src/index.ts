import sinon from 'sinon'

function stubInterfaceFunction({
  Class,
  functionName,
  status,
  data = undefined,
  rejects = false
}): sinon.SinonStub {
  const stub = sinon.stub(Class.prototype, functionName)

  if (rejects) {
    return stub.rejects({
      response: {
        status,
        data
      }
    })
  }

  return stub.resolves({
    status,
    data
  })
}

export { stubInterfaceFunction }
