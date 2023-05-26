#!/usr/bin/env node
/**
 * Pack solution from local file system and import it in a powerapps environment 
 * 
 * @argument authindex <index of auth entry> optional
 * @argument solution <solutiion folder> optional 
 * @argument package Managed | Unmanaged | Both  default: Managed
 * 
 */

import 'zx/globals'
import { 
    askForAuthProfile, 
    askForSolutionFolder,
    askYesOrNo,
    getSettingsFile,
    askForPackageType,
    readSolutionInfo
} from './zx-solution-utils.mjs'



/**
 * validate existence and asks processing confirmation
 *
 * @param   {[string]}  candidateSettingsFile  [setting file path to validate]
 *
 * @return  {[type]}                         [given argument otherwise null]
 */
const validateSettingFile = async ( candidateSettingsFile ) => {

    try {
        const stats = await fs.stat( candidateSettingsFile )
        if( stats.isFile() ) {
            if( await askYesOrNo('do import settings') ) {
                return candidateSettingsFile
            }
        }
    }
    catch( e ) {
        // settings not found
        console.info( chalk.yellow(`settings file '${candidateSettingsFile}' doesn't exist!`))
    }

    return null
}


/**
 * [getImportSolutionPath description]
 *
 * @param   {[string]}  solution  [solution description]
 * @param   {[string]}  package_type  [solution description]
 * @param   {[string]}  outdir    [outdir description]
 *
 * @return  {[type]}            [return description]
 */
const getImportSolutionPath = async ( solution, package_type, outdir ) => {
    let name = solution
    if( !argv.noversion ) {
        const { currentVersion } = await readSolutionInfo( solution )
        name = `${solution}_${currentVersion}`
    }

    switch( package_type ) {
        case 'Unmanaged':
            return path.join( outdir, `${name}.zip`)
        case 'Managed':
            return path.join( outdir, `${name}_managed.zip`)
        case 'Both': 
            return path.join( outdir, `${name}_both.zip`)
    }
    throw `Unknow package type ${package_type}`
}

async function main() {
    
    try {

        const selectedProfile =  await askForAuthProfile( )

        const solution = await askForSolutionFolder()

        const candidateSettingsFile = getSettingsFile( solution, selectedProfile )

        const settingsFile = await validateSettingFile( candidateSettingsFile )
    
        const package_type = await askForPackageType()

        const importSolutionPath = await getImportSolutionPath( solution, package_type, os.tmpdir() )

        await $`pac solution pack --zipfile ${importSolutionPath} -f ${solution} -p ${package_type} -aw`

        if( settingsFile!==null )  
            await $`pac solution import -p ${importSolutionPath} -f -pc -a --settings-file ${settingsFile}`  
        else
            await $`pac solution import -p ${importSolutionPath} -f -pc -a`  
        
    } catch (p) {
        if (p.exitCode)
            console.log(`error occurred code: ${p.exitCode} error: ${p.stderr}`)
        else
            console.error(p)
    }
}

async function main_packonly() {
    
    try {

        const solution = await askForSolutionFolder()

        const package_type = await askForPackageType()
       
        const importSolutionPath = await getImportSolutionPath( solution, package_type, '.' )

        await $`pac solution pack --zipfile ${importSolutionPath} -f ${solution} -p ${package_type} -aw`
        
    } catch (p) {
        if (p.exitCode)
            console.log(`error occurred code: ${p.exitCode} error: ${p.stderr}`)
        else
            console.error(p)
    }
}

if( argv.packonly ) {
    main_packonly().then( () => console.log( 'Completed!' ))
}
else {
    main().then( () => console.log( 'Completed!' ))
}
