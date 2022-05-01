
import { Writable } from 'stream'
import 'zx/globals'
import {startSpinner} from 'zx/experimental'

export const askForAuthProfile = async () => {

    const output = new CaputeProcessOutput()
    
    if( argv.authindex ) {
        await $`pac auth select --index ${argv.authindex}`.pipe(output)
        const rows = output.toList()  
                        .map( row => 
                                /^[*]\s+([\w\d]+)\s+([^\s.]+)/ig.exec(row) )
                        .filter( m => m !== null )
        return rows[0][2]                
    }
    
    await $`pac auth list`.pipe(output)
    console.log( output.toString() )

    const choice = await question('choose profile index (enter for confirm active one): ')
    if( choice.trim().length > 0 ) {
        await $`pac auth select --index ${choice}`  
    }
    
    const token = output.toList()        
                    .map( row => 
                        /^\[(\d+)\]\s+([*]?)\s+([\w\d]+)\s+([^\s.]+)/ig.exec(row) )
                    .filter( m => m !== null &&  m[2]==='*'  )

    return token[0][4]                
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
 * This callback type is called `Task`
 * 
 * @typeparam {T} T
 * @callback Task
 * @return {Promise<T>} return
 */

/**
 * [startTaskWithSpinner description]
 *
 * @template {T} T
 * @param   {Task}  task  the task
 *
 * @return  {Promise<T>}        [return description]
 */
export const startTaskWithSpinner =  async ( task ) => {
    const stop = startSpinner()

    return new Promise( (resolve, reject) => {
            task().then( r => resolve(r) )
                 .catch( e => reject(e) )
                 .finally( () => stop() )
    })

}
