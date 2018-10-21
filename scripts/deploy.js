async function task () {
    let token = await artifacts.require('TestToken').new()
    console.log(`token: ${token.address}`)
    
    let disperse = await artifacts.require('Disperse').new()
    console.log(`disperse: ${disperse.address}`)
}

task()
