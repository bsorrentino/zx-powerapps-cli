/**
 * zx-solution-utils.mjs
 */

import { Writable } from 'stream'
import 'zx/globals'
import { $ } from 'zx'

export const askForAuthProfile = async () => {

    
    let output = new CaputeProcessOutput()
    
    const parseOutput = () => 
        output.toList() .filter( row => /[*]/ig.test(row) )
                        [0]
                        .split( /\s+/)
                        
    if( argv.authindex ) {
        await $`pac auth select --index ${argv.authindex}`.pipe(output)
        const profile = parseOutput()[2]
        // console.debug( profile )     
        return profile          
    }

    await $`pac auth list`.pipe(output)
    console.log( output.toString() )

    const choice = await question('choose profile index (enter for confirm active one): ')
    if( choice.trim().length > 0 ) {
        await $`pac auth select --index ${choice}`  
        output = new CaputeProcessOutput()
        const prev = $.verbose
        $.verbose = false
        await $`pac auth list`.pipe(output)
        $.verbose = prev
    }
        
    const profile = parseOutput()[3]
    // console.debug( profile )
    return profile                
}

/**
 * [askForSolutionFolder description]
 *
 * @param   {boolean} [solutionList=false]  [solutionList description]
 *
 * @return  {Promise<string|undefined>}                [return description]
 */
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

export const getProcessOutputAsList = async ( processOutput ) => {

    const { stdout } = processOutput

    const result = []

    for await (let chunk of stdout) {
        chunk.toString()
            .split('\n')
            .map( r => r.trim() )
            .filter( r => r.length > 0 )
            .forEach( row => result.push(row) )
    }

    return result
}

/**
 * Writeable stream that capure output in a string
 */
export class CaputeProcessOutput extends Writable {

    constructor() {
        super()
        this._buf = ''
    }

    write(chunk, enc, next) {
        const value = chunk.toString(enc)
        this._buf = this._buf.concat( value )
        if( next ) next();
    }

    toString() { 
        return this._buf 
    }

    toList() {
        return this._buf.split('\n')
                    .map( r => r.trim() )
                    .filter( r => r.length > 0 )
    }
}

/**
 * prompt for question that require Yes or No. default is Yes
 * 
 * @param   {string}  message  message to display
 *
 * @return   {Promise<boolean>}         return true or false 
 */
export const askYesOrNo = async ( message ) => {
    const result = await question(`${message} (Y/n)? `)
    return (result !== 'n' && result !== 'N') 
} 

/**
 * prompt for question that require Yes or No. default is No
 * 
 * @param   {string}  message  message to display
 *
 * @return  {Promise<boolean>}          return true or false 
 */
 export const askNoOrYes = async ( message ) => {
    const result = await question(`${message} (y/N)? `)
    return (result === 'y' || result === 'Y') 
} 

/**
 * return settings file path
 *
 * @param   {string}  solutionFolder   [solutionFolder description]
 * @param   {string}  selectedProfile  [selectedProfile description]
 *
 * @return  {string}                   setting file's path
 */
export const getSettingsFile = (solutionFolder,selectedProfile) => 
    path.join( `${solutionFolder}_settings`, `${selectedProfile}_settings.json` )


/**
 * ask for package type
 *
 * @return  {string}  "Managed" | "Unmanaged" | "Both"
 */
export const askForPackageType = async () => {
    if( argv.package ) {
        return argv.package
    }
    const choice = await question('Managed/Unmanaged/Both (M/u/b): ')
    if( choice !== null ) {
        if( choice.startsWith('u') || choice.startsWith('U')) return 'Unmanaged'
        if( choice.startsWith('b') || choice.startsWith('B')) return 'Both'
    }
    return 'Managed'
}

/**
 * ask for a zip file
 *
 * @return  {string}  zip file path
 */
export const askForZipfile = async () => {
    let zipfile = argv.zipfile 
    for(;;) {

        if( zipfile === undefined  || zipfile === null ) {
            zipfile = await question('zip file: ')
        }
        try {
            const stats = await fs.stat( zipfile )
            if( stats.isFile() ) 
                return zipfile

            console.log( chalk.red(`zip file '${zipfile}' is not a valid file!`))            
        }
        catch( e ) {
            console.log( chalk.red(`zip file  '${zipfile}' doesn't exist!`))
        }
        zipfile = null
    }
}

/**
 * @typedef {Object} SolutionInfo
 * @property {string} uniqueName - solution unique name
 * @property {string} currentVersion - solution current version
 */

/**
 * read tag value `<Version>1.0.0.1</Version>` and  <UniqueName>development</UniqueName> in solution.xml
 * 
 * @param {string} solutionPath solution root path or Solution.xml path 
 * @Return {SolutionInfo} 
 */
export async function readSolutionInfo( solutionPath ) {

    let solutionFile = solutionPath
    
    if( path.basename(solutionPath)!=='Solution.xml' ) {
        const solutionFilePath = path.join( solutionPath, 'Other' )
        solutionFile = path.join( solutionFilePath, 'Solution.xml')
    }

    const content = (await fs.readFile( solutionFile )).toString()

    const namePattern = '(.+)'
    const rxName = new RegExp(`<UniqueName>${namePattern}</UniqueName>`, 'ig')
    const matchName =  content.match( rxName )
    
    if( matchName === null || matchName.length === 0 ) {
        throw `unique name not found in solution file '${solutionFile}'`
    }

    const versionPattern = '([\\d+].[\\d+](?:.[\\d+])?(?:.[\\d+])?)'
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
