import ReadLine from 'readline'

async function readLine(question?: string): Promise<string> {
  const reader = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise(resolve => {
    reader.question(question, response => {
      resolve(response)
    })
  })
}

export { readLine }
