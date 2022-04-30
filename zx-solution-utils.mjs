
import { Writable } from 'stream'
import 'zx/globals'

export const askForAuthProfile = async () => {

    const output = new CaputeProcessOutput()
    let index = null
    
    if( argv.authindex ) {
        await $`pac auth list`.pipe(output)
        await $`pac auth select --index ${argv.authindex}`  
        index = argv.authindex
    }
    else {
        await $`pac auth list`.pipe(output)
        console.log( output.toString() )

        const choice = await question('choose profile index (enter for confirm active one): ')
        if( choice.trim().length > 0 ) {
            await $`pac auth select --index ${choice}`  
            index = choice
        }
    }

    const rows = output.toList()        
        .map( row => 
            /^\[(\d+)\]\s+([*]?)\s+([\w\d]+)\s+([^\s.]+)/ig.exec(row) )
        .filter( m => m != null )

    const token = ( index === null  )
                ? rows.find( m => m[2]==='*' )
                : rows.find( m => m[1]===index )
    
    return token[4]                
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
