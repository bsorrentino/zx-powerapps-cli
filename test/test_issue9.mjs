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

async function test1() {
    const output = new CaputeProcessOutput()
  
    await $`pac auth list`.pipe(output)
    
    const profiles = output.toList().slice(1).map( (row, i) => {
    
        const [ index, active, kind, name, user, cloud, type, ...rest ] = row.split( /\s+/)
    
        return { index:i+1, active: (active==='*'), kind, name, user, cloud, type, url:rest.pop() } 
    })
    .forEach( profile => console.log( profile ))
}

async function test2() {

const output = 
`
Index Active Kind      Name               User               Cloud  Type Environment               Environment Url
[1]          DATAVERSE Personal           pippo@contoso.com              Public User                             
[2]          DATAVERSE PreProd_Support    pippo@contoso.com              Public User                             
[3]          DATAVERSE Production_Support pippo@contoso.com              Public User                             
[4]          DATAVERSE PreProd            pippo@contoso.com  Public User Contoso Pre-Production    https://contoso.crm11.dynamics.com/
[5]          DATAVERSE Production         pippo@contoso.com  Public User Contoso UK Production     https://contoso.crm12.dynamics.com/
[6]   *      DATAVERSE SandboxUK          pippo@contoso.com  Public User Contoso UK Sandbox        https://contoso.crm13.dynamics.com/
`

    const findProfileByIndex = (profiles, index) => { 
        const profile = profiles.find( value => value.index == index )
        if( !profile ) {
            //throw new Error(`auth profile with index ${argv.authindex} not found!`)
            console.warn(`auth profile with index ${index} not found!` )
        }
        return profile
    }

    const profiles = output.split('\n')
                            .map( r => r.trim() )
                            .filter( r => r.length > 0 )

    const result = profiles.slice(1).map( (row, i) => {

        const [ _, active, kind, name, user, cloud, type, ...rest ] = row.split( /\s+/)
    
        return { index:`${i+1}`, active: (active==='*'), kind, name, user, cloud, type, url:rest.pop() } 
    })

    console.debug( result )

    console.debug(findProfileByIndex(result, 6))
}

test2()