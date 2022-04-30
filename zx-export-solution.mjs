#!/usr/bin/env node
import 'zx/globals'
import { 
    askForAuthProfile, getProcessOutputAsList, CaputeProcessOutput
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


async function main() {
    try {
        const selectedProfile = await askForAuthProfile()

        console.log( 'selectedProfile', selectedProfile )

        const solutionListOutput = new CaputeProcessOutput()
        
        // const rows = await getProcessOutputAsList( $`pac solution list` )
        await $`pac solution list`.pipe( solutionListOutput )
        console.log( solutionListOutput.toString() )

        const solutions = 
            solutionListOutput
             .toList()
             .map( row => 
                /^\[\d+\]\s+([\w\d]+)\s+(.+)\s+([\d+].[\d+].[\d+](?:.[\d+])?)/ig.exec(row) )
             .filter( m => m != null )
             .map( m => ({ name: m[1], ver: m[3] }) )

        if (solutions.length > 0) {

            const choice = ( argv.solution ) ?
                argv.solution :
                await question('solution unique name: ', {
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
                              
                // await askForUpdateVersion({ 
                //     ...solution_to_export, 
                //     updateOnline:true  
                // })

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
}

main()
