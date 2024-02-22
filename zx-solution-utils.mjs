/**
 * zx-solution-utils.mjs
 */

import { Writable } from 'stream'
import 'zx/globals'

/**
 * @typedef AuthProfile
 * @property {string} index - The index of the solution.
 * @property {boolean} active - Whether the solution is active or not. 
 * @property {string} kind - The kind of solution.
 * @property {string} name - The name of the solution.
 * @property {string} user - The owner of the solution.
 * @property {string} cloud - The cloud environment of the solution.
 * @property {string} type - The type of solution.
 * @property {string} url - The URL of the solution.
 */

/**
 * Gets profiles from the given output stream.
 *
 * @param {CaputeProcessOutput} output - The output stream to write the profiles to.
 * @returns {AuthProfile[]} The array of profiles.
 */
const getProfiles = (output) => {

    const profiles = output.toList().slice(1)

    if( profiles.length === 0 ) {
        throw new Error('no auth profiles found!')
    }

    return profiles.map( (row, i) => {

        const [ _, active, kind, name, user, cloud, type, ...rest ] = row.split( /\s+/)
    
        return { index:`${i+1}`, active: (active==='*'), kind, name, user, cloud, type, url:rest.pop() } 
    })
}
/**
 * Finds a profile by index in the profiles array.
 *
 * @param {AuthProfile[]} profiles - The array of profiles to search.
 * @param {number|string} index - The index of the profile to find. 
 * @returns {AuthProfile|undefined} The profile object if found, otherwise undefined.
 */
const findProfileByIndex = (profiles, index) => { 
    const profile = profiles.find( value => value.index === index )
    if( !profile ) {
        //throw new Error(`auth profile with index ${argv.authindex} not found!`)
        console.warn(`auth profile with index ${index} not found!` )
    }
    return profile
}
/**
 * Get  active profile.
 *
 * @param {AuthProfile[]} profiles - The array of profiles to search.
 * @returns {AuthProfile[]} The profile object if found, otherwise undefined.
 */
const getActiveProfiles = (profiles) => { 
    const result = profiles.filter( value => value.active )
    if( result.length === 0 ) {
        console.warn( `no active auth profile found!` )
        // throw new Error(`no active auth profile found!`)
    }
    return result
}

/**
 * Asks the user to select an authentication profile and returns the selected profile.
 * 
 * Uses the Azure CLI 'pac auth' commands to list profiles and select one.
 * 
 * @returns {Promise<AuthProfile>} The selected authentication profile object
 */
export const askForAuthProfile = async () => {

    const output = new CaputeProcessOutput()
    
    if( argv.authindex ) {
        await $`pac auth select --index ${argv.authindex}`.pipe(output)

        return findProfileByIndex(getProfiles(output), argv.authindex )
    }

    await $`pac auth list`.pipe(output)
    console.log( output.toString() )

    const profiles = getProfiles(output)

    const activeProfiles = getActiveProfiles(profiles)

    if( activeProfiles.length === 1 ) {

        while( true ) {

            const choice = await question('choose profile index (enter for confirm active one): ')
            if( choice.trim().length === 0 ) break

            const result = findProfileByIndex(profiles, choice )

            if( result ) {
                await $`pac auth select --index ${choice}`  
                return result
            }
            
            
        }

        return activeProfiles[0]
    }
    else {
        
        while( true ) {

            const choice = await question('choose profile index: ')
            if( choice.trim().length === 0 ) continue

            const result = findProfileByIndex(profiles, choice )

            if( result ) {
                await $`pac auth select --index ${choice}`  
                return result
            }
            
        }
    }             
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
 * Captures process output into a string or array
 * Extends Writable stream
 */
export class CaputeProcessOutput extends Writable {

    /**
     * Constructor
     */
    constructor() {
      super();
      this._buf = '';
    }
  
    /**
     * Implements Writable._write
     * @param {string} chunk - The chunk to write 
     * @param {string} enc - The encoding
     * @param {Function} next - Callback when write is complete
     */
    write(chunk, enc, next) {
      const value = chunk.toString(enc);
      this._buf = this._buf.concat(value);
      if (next) next();
    }
  
    /**
     * Get the entire output as a string
     * @returns {string} The output
     */
    toString() {
      return this._buf;
    }
  
    /**
     * Get the output as an array split by newline
     * @returns {string[]} The output array
     */
    toList() {
      return this._buf.split('\n')
        .map(r => r.trim())
        .filter(r => r.length > 0);
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
