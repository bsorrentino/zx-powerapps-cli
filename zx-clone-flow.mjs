#!/usr/bin/env zx

import 'zx/globals'
import crypto from 'crypto'
import { Parser as XmlParser, Builder as XmlBuilder } from 'xml2js'

const askForSolutionZipFile = async () => {
    if( argv.zipfile ) {
        return argv.zipfile
    }
    return question('solution zip: ')
}


const main = async () => {

    const solution = path.join( 'Solutions', argv.solution )

    const flowPrefix = argv.prefix

    const workflows_dir = path.join( solution, 'Workflows')
    const other_dir = path.join( solution, 'Other')

    const new_uuid = argv.uuid ?? crypto.randomUUID()
    
    console.log( 'new_uuid', new_uuid )

    const new_flow = `${flowPrefix}2-${new_uuid.toLocaleUpperCase()}.json`
     
    const find_file_to_clone = async () => {
        const files = await fs.readdir( workflows_dir )

        const flows = files.map( f => {
            const rxp = new RegExp( `${flowPrefix}-([\\w\\d]{8}-[\\w\\d]{4}-[\\w\\d]{4}-[\\w\\d]{4}-[\\w\\d]{12}).json$`, 'g')
            // console.log( path.basename(f) )
            const res =  rxp.exec(path.basename(f))
            // console.log( res )
            return { file: f, parse: res } 
    
        })
        .filter( v =>  v.parse !== null ) 
    
        if( flows.length === 0 ) throw `Flow with prefix '${flowPrefix}' not found!`                        
        if( flows.length > 1 ) throw `There are more flows with prefix '${flowPrefix}'!`      
    
        let { file, parse } = flows[0]
    
        // console.log( origina_flow_name,  parse )
        
        return { origina_flow_name: file, original_uuid: parse[1] }
    }
    const { origina_flow_name, original_uuid } = await find_file_to_clone()

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
        
        const findId = ( id ) => rootcomponent_array.find( value => 
            value.$.id.localeCompare( id, undefined, { sensitivity: 'base'} )===0 )

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

const help = () => 
console.log( `
--solution\tsolution path (mandatory)
--prefix\torigina flow name prefix (mandatory)
--uuid\tuuid assigned to cloned flow (optional)
`)

if( argv.solution===undefined && argv.prefix===undefined && argv.uuid===undefined) {
    help() 
}
else {
    main()
}