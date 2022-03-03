#!/usr/bin/env node
import 'zx/globals'
import { 
    askForAuthProfile,
    askForUpdateVersion 
 } from './zx-solution-utils.mjs'

const DELETE_SOLUTION_ZIPPED = true

async function exportSolution( solution_to_export, isManaged ) {

    const file = `${solution_to_export.name}_${solution_to_export.ver.replace(/\./g, '_')}`
    const finalName = (isManaged ) ? `${file}_managed.zip` : `${file}.zip`

    if (await fs.pathExists(finalName)) {
        const remove = await question(`remove file ${finalName} (Y/n)? `)
        if (remove !== 'n' && remove !== 'N') {
            await fs.remove(finalName)
        }
    }

    if( DELETE_SOLUTION_ZIPPED ) {
        await $`pac solution export --path ${solution_to_export.name}/${finalName} --name ${solution_to_export.name} ${ (isManaged) ? '--managed' : ''}`
    }
    else {
        await $`pac solution export --path ${finalName} --name ${solution_to_export.name} ${ (isManaged) ? '--managed' : ''}`
    }

    return finalName
}

const exportSolutionManaged = async (solution_to_export) => exportSolution( solution_to_export, true /* Managed */ )
const exportSolutionUnmanaged = async (solution_to_export) => exportSolution( solution_to_export, false /* Unmanaged */ )
const  publishCustomization = async () => {
    
    const publish = await question('publish customizations (Y/n)? ')
    if (publish !== 'n' && publish !== 'N') {
        await $`pac solution publish`
    }
}

(async () => {
    try {
        await askForAuthProfile()

        const { stdout } = $`pac solution list`

        const solutions = []

        for await (let chunk of stdout) {
            const rows = chunk.toString().split('\n').map( r => r.trim() ).filter( r => r.length > 0 )

            for (let i = 0; i < rows.length; ++i) {
                //console.log( `${i}-${rows[i]}` )
                const exp = /^\[\d+\]\s+([\w\d]+)\s+(.+)\s+([\d+].[\d+].[\d+](?:.[\d+])?)/ig
                const m = exp.exec(rows[i])
                //console.log( i, m)
                if (m !== null) {          
                    solutions.push({ name: m[1], ver: m[3] })
                }
            }
        }

        //solutions.forEach( s => console.log( s ))

        if (solutions.length > 0) {

            const choice = await question('Choose solution: ', {
                choices: solutions.map(s => s.name)
            })

            const solution_to_export = solutions.find(s => s.name === choice)
            if (solution_to_export) {

                await publishCustomization()

                await exportSolutionManaged( solution_to_export )

                const file = await exportSolutionUnmanaged( solution_to_export )

                if( DELETE_SOLUTION_ZIPPED ) {
                    await $`pac solution unpack --zipfile ${solution_to_export.name}/${file} --folder ${solution_to_export.name} --packagetype Both --allowDelete`
                }
                else {
                    await $`pac solution unpack --zipfile ${file} --folder ${solution_to_export.name} --packagetype Both --allowDelete`
                }  
                              
                await askForUpdateVersion( solution_to_export.name, solution_to_export.ver )

            }
            else {
                console.error(`solution '${choice}' is not valid!`)
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
})()
