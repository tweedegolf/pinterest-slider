import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import * as DisplayStates from '../constants/display_states'
import * as PinterestAPI from '../pinterest/api'


let initialState = {
  boards: [],
  images: [],
  loggedin: false,
}


const checkSession = function(){
  let loggedin = PinterestAPI.checkSession()
  if(loggedin === true){
    return Promise.resolve()
    .then(PinterestAPI.getBoards)
    .then(boards => {
      return {...initialState, loggedin, boards}
    })
  }
  return Promise.resolve()
  .then(PinterestAPI.login)
  .then(boards => {
    return {...initialState, loggedin, boards}
  })
}


const getImages = function(boardId){
  if(boardId === 'choose'){
    return []
  }
  return PinterestAPI.getPins(boardId)
  .then(images => {
    return images
  })
}


const boardType = new GraphQLObjectType({
  name: 'Board',
  description: 'Current state of the application',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
  })
})


const imageType = new GraphQLObjectType({
  name: 'Image',
  description: 'Current state of the application',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    pinUrl: {
      type: GraphQLString
    },
  })
})


const sessionType = new GraphQLObjectType({
  name: 'Session',
  description: 'Current state of the application',
  fields: () => ({
    loggedin: {
      type: GraphQLBoolean,
    },
    boards: {
      type: new GraphQLList(boardType),
    },
    images: {
      type: new GraphQLList(imageType),
      args: {
        boardId: {
          type: GraphQLString
        }
      },
      resolve: (root, {boardId}) => getImages(boardId)
    }
  })
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    session: {
      type: sessionType,
      resolve: () => checkSession()
    },
  })
})

export const Schema = new GraphQLSchema({
  query: queryType
})


export default Schema
