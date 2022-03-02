#!/usr/bin/env zx
/**
 * arguments
 * @argument authindex <index of auth entry> optional
 * @argument solution <solutiion folder> optional 
 * @argument package Managed | Unmanaged | Both  default: Managed
 * 
 */
import 'zx/globals'
import { 
    askForAuthProfile, 
    askForSolutionFolder,
    askForUpdateVersion
} from './zx-solution-utils.mjs'

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

(async () => {
    try {

        await askForAuthProfile( )

        const solution = await askForSolutionFolder()

        await askForUpdateVersion( solution )

        const package_type = await askForPackageType()

        switch( package_type ) {
            case 'Managed': {
                await $`pac solution pack --zipfile /tmp/${solution}_managed.zip -f ${solution} -p Managed -aw`  
                await $`pac solution import -p /tmp/${solution}_managed.zip -f -pc -a`        
            }
            break
            case 'Unmanaged': {
                await $`pac solution pack --zipfile /tmp/${solution}.zip -f ${solution} -p Unmanaged -aw`
                await $`pac solution import -p /tmp/${solution}.zip -f -pc -a`        
            }
            break
            case 'Both': {
                await $`pac solution pack --zipfile /tmp/${solution}_both.zip -f ${solution} -p Both -aw`
                await $`pac solution import -p /tmp/${solution}_both.zip -f -pc -a`        
            }
            break
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
