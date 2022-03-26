
import { chalk, fs } from 'zx'
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
    let solution
    if( argv.solution ) {
         solution = argv.solution
    }
    else {
        if( solutionList) await $`pac solution list`
        solution = await question('solution folder: ')
    }
    for(;;) {
        try {
            const stats = await fs.stat( solution )
            if( stats.isDirectory() ) 
                return solution

            console.log( chalk.red(`solution folder '${solution}' is not a directory!`))            
        }
        catch( e ) {
            console.log( chalk.red(`solution folder '${solution}' doesn't exist!`))
        }
        solution = await question('solution folder: ')
    }
    
}

export const askForUpdateVersion = async ( {
    name, 
    ver,
    updateOnline
} ) => {
    
    const verToken = ver.split('.')
    if( verToken.length === 0 ) return // GUARD
    
    const lastToken =  verToken.length - 1
    let revision = parseInt( verToken[lastToken] )
    if (isNaN(revision)) return // GUARD

    verToken[lastToken] = `${++revision}`
    const newVersion = verToken.join('.')

    const increment = await question(`increment current revision to ${newVersion}: (Y/n)`)
    if (increment !== 'n' && increment !== 'N') {
          
        if( updateOnline ) {
            await $`pac solution online-version --solution-name ${name} --solution-version ${newVersion}`
            console.log( 'online version updated to', newVersion )
        }
        // update version
        cd( path.join( name, 'Other' ) )
        await $`pac solution version  --revisionversion ${revision}`
        cd( path.join( '..', '..' ) )
        console.log( 'version updated to', newVersion )
    }
}