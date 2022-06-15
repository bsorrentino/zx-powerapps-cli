#!/usr/bin/env node
import 'zx/globals'
import { 
    askForAuthProfile,
    askForSolutionFolder 
} from './zx-solution-utils.mjs'


/**
 * read tag value `<Version>1.0.0.1</Version>` and  <UniqueName>development</UniqueName> in solution.xml
 * 
 * @param {string} solutionFile solution.xml path
 */
async function readSolutionInfo( solutionFile ) {

    const content = (await fs.readFile( solutionFile )).toString()

    const namePattern = '(.+)'
    const rxName = new RegExp(`<UniqueName>${namePattern}</UniqueName>`, 'ig')
    const matchName =  content.match( rxName )
    
    if( matchName === null || matchName.length === 0 ) {
        throw `unique name not found in solution file '${solutionFile}'`
    }

    const versionPattern = '([\\d+].[\\d+].[\\d+](?:.[\\d+])?)'
    const rxVersion = new RegExp(`<Version>${versionPattern}</Version>`, 'ig')
    const matchVersion =  content.match( rxVersion )

    if( matchVersion === null || matchVersion.length === 0 ) {
        throw `version not found in solution file '${solutionFile}'`
    }
        
    return { 
        uniqueName: rxName.exec(matchName[0])[1],
        currentVersion: rxVersion.exec(matchVersion[0])[1]
    }
    
}

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
