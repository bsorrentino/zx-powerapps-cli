import 'zx/globals'
import { Writable } from 'stream'

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

const output = new CaputeProcessOutput()
  
await $`pac auth list`.pipe(output)

const profiles = output.toList().slice(1).map( (row, i) => {

    const [ index, active, kind, name, user, cloud, type, ...rest ] = row.split( /\s+/)

    return { index:i+1, active: (active==='*'), kind, name, user, cloud, type, url:rest.pop() } 
})
.forEach( profile => console.log( profile ))
