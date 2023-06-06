import { HelloWorld } from './src/contracts/helloWorld'
import { getDefaultSigner,getDefaultSigner1,inputSatoshis } from './tests/utils/helper'
import { sha256, toByteString } from 'scrypt-ts'

const message = 'hello world, sCrypt!'

async function main() {
    await HelloWorld.compile()
    const helloWorld = new HelloWorld(sha256(toByteString(message, true)))

    // connect to a signer
    await helloWorld.connect(getDefaultSigner1())

    // contract deployment
    const deployTx = await helloWorld.deploy(inputSatoshis)
    console.log('HelloWorld contract deployed: ', deployTx.id)

    // contract call
    const { tx: callTx } = await helloWorld.methods.unlock(
        toByteString(message, true)
    )
    console.log('HelloWorld contract `unlock` called: ', callTx.id)
}


(async () => {
   
    await main();

})();

