#!/usr/bin/env zx
import 'zx/globals'

const dirs = [
    'MySolution/CanvasApps'
]

dirs.forEach( async (dir) => {

    const files = await fs.readdir(dir)

    files
        .filter( file => path.extname(file) === '.msapp' )
        .forEach( async (f) => {
            const app = path.join( dir, f )

            console.log( app, path.basename(app) )

            const sources = path.join( 'PowerFx', path.basename(app))
            try {
                await $`pac canvas unpack --msapp ${app} --sources ${sources}`
                } catch( p ) {
                    console.log(`error unpacking ${app} code: ${p.exitCode} error: ${p.stderr}`)
                }
            })
})

