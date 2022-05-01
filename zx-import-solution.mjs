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
    getSettingsFile} from './zx-solution-utils.mjs'

const askForPackageType = async () => {
    if( argv.package ) {
        return argv.package
    }
    const choice = await question('Managed/Unmanaged/Both (M/u/b): ')
    if( choice !== null ) {
        if( choice.startsWith('u') || choice.startsWith('U')) return 'Unmanaged'
        if( choice.startsWith('b') || choice.startsWith('B')) return 'Both'
    }
    return 'Managed'
}


async function main() {
    
    try {

        const selectedProfile = await askForAuthProfile( )

        const solution = await askForSolutionFolder()

        let settingsFile = null

        const candidateSettingsFile = getSettingsFile( solution, selectedProfile )

        try {
            const stats = await fs.stat( candidateSettingsFile )
            if( stats.isFile() ) {
                if( await askYesOrNo('do import settings') ) {
                    settingsFile = candidateSettingsFile
                }
            }
        }
        catch( e ) {
            // settings not found
            console.info( chalk.yellow(`settings file '${candidateSettingsFile}' doesn't exist!`))
        }

        const package_type = await askForPackageType()
       
        let importSolutionPath = null

        switch( package_type ) {
            case 'Unmanaged':
                importSolutionPath = path.join( '/tmp', `${solution}.zip`)
            break
            case 'Managed':
                importSolutionPath = path.join( '/tmp', `${solution}_managed.zip`)
            break
            case 'Both': 
                importSolutionPath = path.join( '/tmp', `${solution}_both.zip`)
            break
        }
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
    finally {
    }
}

main()
