#!/usr/bin/env node

import 'zx/globals'
import crypto from 'crypto'
import { Parser as XmlParser, Builder as XmlBuilder } from 'xml2js'

import { 
    askForSolutionFolder
} from '@bsorrentino/zx-powerapps-cli/zx-solution-utils.mjs'

/**
 * [askForFLowFile description]
 *
 * @param   {[type]}  solutionFolder  [solutionFolder description]
 *
 * @return  {[type]}                  [return description]
 */
export const askForFLowFile = async ( solutionFolder ) => {

    let result

    await within( async () => {
        let flow 
        const workflows_dir = path.join( solutionFolder, 'Workflows')
        cd( workflows_dir )
        if( argv.flow ) {
             flow = argv.flow
        }
        else {
            flow = await question('flow json file: ')
        }
        for(;;) {
            flow = path.basename(flow)

            const rxp = new RegExp( `(.*)-([\\w\\d]{8}-[\\w\\d]{4}-[\\w\\d]{4}-[\\w\\d]{4}-[\\w\\d]{12}).json$`, 'g')
            let rxp_match = rxp.exec( flow )

            if( rxp_match === null ) {
                console.log( chalk.red(`'${flow}' is not a valid flow file name format !`))
            }
            else {
                try {
                    const stats = await fs.stat( flow )
                    if( stats.isFile() ) {
                        result = { 
                            dir: workflows_dir,
                            flow: flow, 
                            prefix: rxp_match[1],  
                            uuid: rxp_match[2] 
                        }
                        return
                    }
        
                    console.log( chalk.red(`'${flow}' is not a file!`))            
                }
                catch( e ) {
                    console.log( chalk.red(`flow '${flow}' doesn't exist!`))
                }    
            }
            flow = await question('flow json file: ')
        }
    })
    
    return result

}

const main = async () => {

    const solution = await askForSolutionFolder()

    const { 
        dir: workflows_dir,
        flow: origina_flow_name, 
        prefix: flowPrefix , 
        uuid: original_uuid } = await askForFLowFile( solution )

    const other_dir = path.join( solution, 'Other')

    const new_uuid = argv.uuid ?? crypto.randomUUID()
    
    const new_flow = `${flowPrefix}2-${new_uuid.toLocaleUpperCase()}.json`

    console.log( 'new_flow', new_flow )

    const clone_flow_file = async () => {

        const original_flow_content = await fs.readFile( path.join( workflows_dir, origina_flow_name ) )

        await fs.writeFile( path.join(workflows_dir,new_flow), original_flow_content )    
    }
    
    const clone_dataxml_file = async () => {
        const parser = new XmlParser()

        const original_dataxml_content = await fs.readFile( path.join( workflows_dir, `${origina_flow_name}.data.xml` ) )

        const parseResult =  await parser.parseStringPromise(original_dataxml_content.toString())

        // console.dir( parseResult.Workflow, { depth: 5 } )

        parseResult.Workflow.$.WorkflowId = `{${new_uuid.toLocaleLowerCase()}}`
        parseResult.Workflow.$.Name += ' (cloned)'
        parseResult.Workflow.JsonFileName = path.join('/Worflows',new_flow)
        parseResult.Workflow.LocalizedNames[0].LocalizedName[0].$.description += ' (cloned)'

        const builder = new XmlBuilder()

        const xml = builder.buildObject( parseResult )
    
        // console.log( xml )
    
        await fs.writeFile( path.join( workflows_dir, `${new_flow}.data.xml`), xml ) 

    } 

    const update_solution_file = async () => {
        const solution_file = path.join(other_dir, 'Solution.xml')

        const solution_content = await fs.readFile(solution_file)
    
        const parser = new XmlParser()

        const parseResult =  await parser.parseStringPromise(solution_content.toString())
    
        const rootcomponent_array =  parseResult.ImportExportXml.SolutionManifest[0].RootComponents[0].RootComponent
        
        // console.log( rootcomponent_array )

        const findId = ( id ) => 
            rootcomponent_array
                            .filter( value => value.$.id )
                            .find( value => value.$.id.localeCompare( id, undefined, { sensitivity: 'base'} )===0 )

        const new_uuid_fmt = `{${new_uuid.toLocaleLowerCase()}}`

        if( findId( new_uuid_fmt )) {

            console.log( new_uuid_fmt , 'already exist in solution.xml file' )
            return
        }
    
        const original_rootcomponent = findId( `{${original_uuid}}` )
    
        if( !original_rootcomponent ) {
            throw `{${original_uuid}} not found in RootComponent`
        }

        // console.log( 'original rootcomponent', original_rootcomponent )
    
        const cloned_rootcomponent = { ...original_rootcomponent.$, id: `{${new_uuid.toLocaleLowerCase()}}` }
    
        rootcomponent_array.push( { $: cloned_rootcomponent } )
    
        // console.log( rootcomponent_array )
    
        const builder = new XmlBuilder()

        const xml = builder.buildObject( parseResult )
    
        // console.log( xml )
    
        await fs.writeFile( solution_file, xml )
    
    }

    await clone_flow_file()
    await clone_dataxml_file()
    await update_solution_file()

}


main()
