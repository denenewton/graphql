import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path';
  
const resolversArray = loadFilesSync(path.join(__dirname, 'resolvers','*.js'),{ extensions: ['js'] })

const resolver = mergeResolvers(resolversArray)

export default  resolver

