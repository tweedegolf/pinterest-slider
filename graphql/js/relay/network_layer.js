import {graphql} from 'graphql'
import schema from '../data/schema'
import NetworkLayer from './relay-local-schema'

/*
const networkLayer = {

  sendMutation(mutationRequest) {
    // ...
  },

  sendQueries(queryRequests) {

    return Promise.all(queryRequests.map(
      queryRequest => {
        let query = queryRequest.getQueryString()
        console.log(query)
        let vars = queryRequest.getVariables()
        if(Object.getOwnPropertyNames(vars).length !== 0){
          console.log('vars', vars)
          //query = { user(id:{vars.id_0}){profilePicture(size:64){edges{node{courseName}}}} }
        }
        graphql(schema, query).then(result => {
          if(result.errors){
            queryRequest.reject(new Error(result.errors))
          }else{
            queryRequest.resolve({response: result.data})
          }
        })
      }
    ))
  },

  supports(...options) {
    // ...
  },
}

export default networkLayer

*/


export default new NetworkLayer({schema})
