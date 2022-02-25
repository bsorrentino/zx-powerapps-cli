
import 'zx/globals'

export const askForAuthProfile = async () => {
    if( argv.authindex ) {
        await $`pac auth select --index ${argv.authindex}`     
        return
    }
    
    await $`pac auth list`
    const choice = await question('choose profile index: ')
    await $`pac auth select --index ${choice}`     
    

}
