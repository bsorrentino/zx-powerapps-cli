#!/usr/bin/env node
/**
 * Export solution from powerapps a environment unpacking and saving it on local file system.
 * Solution is exported in both **Managed** and **Unmanged** package type
 * 
 * @argument authindex <index of auth entry> optional
 * @argument solution <remote solution unique name> optional 
 * 
 */
import 'zx/globals'
import { spinner } from 'zx/experimental'
import {
    askForAuthProfile, 
    askNoOrYes, 
    askYesOrNo, 
    CaputeProcessOutput, 
    getSettingsFile,
    askForPackageType,
    askForZipfile,
    askForSolutionFolder
} from './zx-solution-utils.mjs'


/**
 * if keep the exported solution zip
 *
 * @return  {[boolean]}  
 */
const keepSolutionZip = () => argv.keepzip

/**
 * export as managed solution
 *
 * @param   {{ name: string, ver: string}}  solution_to_export  [solution_to_export description]
 * @param   {boolean} isManaged 
 * @param   {boolean} keep_solution_zip
 * 
 * @return  {Promise<string>}                      final name
 */
async function exportSolution(solution_to_export, isManaged, keep_solution_zip) {

    const file = `${solution_to_export.name}_${solution_to_export.ver.replace(/\./g, '_')}`
    const finalName = (isManaged) ? `${file}_managed.zip` : `${file}.zip`

    if (await fs.pathExists(finalName)) {
        const remove = await question(`remove file ${finalName} (Y/n)? `)
        if (remove !== 'n' && remove !== 'N') {
            await fs.remove(finalName)
        }
    }

    if (keep_solution_zip) {
        await $`pac solution export --path ${finalName} --name ${solution_to_export.name} ${(isManaged) ? '--managed' : ''}`
    }
    else {
        await $`pac solution export --path ${solution_to_export.name}/${finalName} --name ${solution_to_export.name} ${(isManaged) ? '--managed' : ''}`
    }

    return finalName
}

/**
 * export as managed solution
 *
 * @param   {{ name: string, ver: string}}  solution_to_export  [solution_to_export description]
 *
 * @return  {Promise<string>}                      final name
 */
const exportSolutionManaged = async (solution_to_export, keep_solution_zip) => exportSolution(solution_to_export, true /* Managed */, keep_solution_zip)
/**
 * export as Unmanaged solution
 *
 * @param   {{ name: string, ver: string}}  solution_to_export  [solution_to_export description]
 *
 * @return  {Promise<string>}                      final name
 */
const exportSolutionUnmanaged = async (solution_to_export, keep_solution_zip) => exportSolution(solution_to_export, false /* Unmanaged */, keep_solution_zip)
/**
 * Publish Customization
 *
 * @return  {Promise<void>}  [return description]
 */
const publishCustomization = async () => {
    if (await askYesOrNo('publish customizations'))
        await $`pac solution publish`
}

/**
 * create settings
 *
 * @param   {string}  solutionFolder   [solutionFolder description]
 * @param   {string}  selectedProfile  [selectedProfile description]
 *
 * @return  {Promise<void>}                   
 */
const createSettings = async (solutionFolder, selectedProfile) => {
    const settingsFile = getSettingsFile(solutionFolder, selectedProfile)

    await $`pac solution create-settings -f ${solutionFolder} -s ${settingsFile}`
}


const tap = ( msg ) => 
        (v) => {
            console.log( msg, v );
            return v
        }


const notNull = ( v ) => v!==null


/**
 * perform export if unpakonly argument has set
 *
 */
async function main_unpackonly() {

    const file = await askForZipfile()

    const ptype = await askForPackageType()

    const folder = await askForSolutionFolder()

    const solution = path.join( folder, path.basename(file, '.zip').replace( /_(\d+)_(\d+)_(\d+)(_\d+)?$/, '' ))
   
    await $`pac solution unpack --zipfile ${file} --folder ${solution} --packagetype ${ptype} --allowDelete`


}

/**
 * perform mai export process 
 *
 */
async function main() {

    try {
        const selectedProfile = await askForAuthProfile()

        // console.log( `selectedProfile: [${selectedProfile}]` )

        const solutionListOutput = new CaputeProcessOutput()

        // const rows = await getProcessOutputAsList( $`pac solution list` )
        await spinner(async () => {
            if (argv.solution) {
                await $`pac solution list`.pipe(solutionListOutput)
            }
            else {
                await $`pac solution list`.pipe(solutionListOutput)
                console.log(solutionListOutput.toString())
            }
        })

        const solutions =
            solutionListOutput
                .toList()
                // .map( tap('parse') )
                .map(row =>
                    /([\w\d]+)\s+(.+)\s+([\d+].[\d+].[\d+](?:.[\d+])?)/ig.exec(row))
                // .map( tap('matcher') )
                .filter(notNull)
                .map(m => ({ name: m[1], ver: m[3] }))

        if (solutions.length <= 0) {
            console.warn( chalk.yellowBright('no solution detected!'))
            return
        }

        // console.log( solutions )

        const choice = (argv.solution) ?
            argv.solution :
            await question('solution unique name: ', {
                choices: solutions.map(s => s.name)
            })

        const solution_to_export = solutions.find(s => s.name === choice)
        if (solution_to_export) {

            await publishCustomization()

            const keep_solution_zip = keepSolutionZip()

            await exportSolutionManaged(solution_to_export, keep_solution_zip)

            const file = await exportSolutionUnmanaged(solution_to_export, keep_solution_zip)

            if (keep_solution_zip) {
                await $`pac solution unpack --zipfile ${file} --folder ${solution_to_export.name} --packagetype Both --allowDelete`
            }
            else {
                await $`pac solution unpack --zipfile ${solution_to_export.name}/${file} --folder ${solution_to_export.name} --packagetype Both --allowDelete`
            }

            if (await askNoOrYes('export settings')) {
                await createSettings(solution_to_export.name, selectedProfile)
            }

        }
        else {
            console.error(`solution '${choice}' is not valid!`)
        }

    } catch (p) {
        if (p.exitCode)
            console.log(`error occurred code: ${p.exitCode} error: ${p.stderr}`)
        else
            console.error(p)
    }
}

if( argv.unpackonly ) {
    main_unpackonly().then( () => console.log( 'Completed!' ))
}
else {
    main().then( () => console.log( 'Completed!' ))
}
