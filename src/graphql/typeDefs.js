const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs } = require('@graphql-tools/merge')
import path from 'path'

const typesArray = loadFilesSync(path.join(__dirname, 'schemas','*.gql'),{ extensions: ['gql'] })

const typeDefs = mergeTypeDefs(typesArray)

export default typeDefs



