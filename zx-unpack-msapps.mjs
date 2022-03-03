#!/usr/bin/env node
import 'zx/globals'
import { 
    askForSolutionFolder 
} from './zx-solution-utils.mjs'


const solution = await askForSolutionFolder()

const dir = path.join( solution, 'CanvasApps')

const files = await fs.readdir( dir )

files
    .filter( file => path.extname(file) === '.msapp' )
    .forEach( async (f) => {
        const app = path.join( dir, f )

        // console.log( app, path.basename(app) )

        const sources = path.join( 'PowerFx', path.basename(app))
        try {
            await $`pac canvas unpack --msapp ${app} --sources ${sources}`
            } catch( p ) {
                console.error(`error unpacking ${app} code: ${p.exitCode} error: ${p.stderr}`)
            }
        })

