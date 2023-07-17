import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path';
  
const typeArray = loadFilesSync(path.join(__dirname, 'types','*.gql'),{ extensions: ['gql'] })

const typeDefs = mergeTypeDefs( typeArray)

export default  typeDefs