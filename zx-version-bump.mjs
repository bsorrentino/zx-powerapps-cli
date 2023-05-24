#!/usr/bin/env node
import 'zx/globals'
import { 
    askForAuthProfile,
    askForSolutionFolder, 
    readSolutionInfo
} from './zx-solution-utils.mjs'


/**
 * 
 * @param {*} ver version as string
 * @param {*} ordinal  0-based ordinal
 * @returns 
 */
const incrementVersion = ( version, ordinal ) => {

    const verToken = version.split('.')
    if( verToken.length === 0 ) throw `${version} is not valid!`
    
    let val = parseInt( verToken[ordinal] )
    if (isNaN(val)) throw `${version} is not valid!`

    verToken[ordinal] = `${++val}`
    const ver = verToken.join('.')
    
    return { 
        val: val ,
        ver: ver
    }

}

async function versionBump() {
    try {

        const solution = await askForSolutionFolder()
        const solutionFilePath = path.join( solution, 'Other' )
        const  { currentVersion, uniqueName } = await readSolutionInfo( path.join( solutionFilePath, 'Solution.xml'))

        const increment = await question(`increment current version '${currentVersion}'? (Y/n) `)
        if (increment !== 'n' && increment !== 'N') {

            let newVersion 
            // update version
            cd( solutionFilePath )
            
            const increment = await question(`strategy : ([R]evision/[b]uild) `)
            if (increment !== 'b' && increment !== 'B') { 

                const { val, ver } = incrementVersion( currentVersion, 3 )
                await $`pac solution version  --revisionversion ${val}`
                console.log( 'version updated to', ver )
                newVersion = ver

            }
            else {

                const { val, ver } = incrementVersion( currentVersion, 2 )
                await $`pac solution version  --buildversion ${val}`
                console.log( 'version updated to', ver )
                newVersion = ver

            }
            cd( path.join( '..', '..' ) )

            const updateOnline = await (`update online version to ${newVersion}: (Y/n) `)
            if (updateOnline !== 'n' && updateOnline !== 'N') {
                
                await askForAuthProfile()
                
                await $`pac solution online-version --solution-name ${uniqueName} --solution-version ${newVersion}`
                console.log( 'online version updated to', newVersion )
            }
        
        }


    } catch (p) {
        if (p.exitCode)
            console.log(`error occurred code: ${p.exitCode} error: ${p.stderr}`)
        else
            console.error(p)
    }
    finally {
    }
}

versionBump()
