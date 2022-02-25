
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


export const askForSolutionFolder = async ( solutionList = false ) => {
    if( argv.solution ) {
        return argv.solution
    }
    if( solutionList) await $`pac solution list`
    return question('solution folder: ')
}