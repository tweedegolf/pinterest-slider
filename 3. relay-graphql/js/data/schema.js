import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql'

import * as PinterestAPI from '../pinterest/api'


let initialState = {
  authorized: false,
  boards: [],
  images: [],
}


const checkSession = function(){
  let authorized = PinterestAPI.checkSession()
  if(authorized === true){
    return Promise.resolve()
    .then(PinterestAPI.getBoards)
    .then(boards => {
      return {...initialState, authorized, boards}
    })
  }
  return Promise.resolve()
  .then(PinterestAPI.login)
  .then(boards => {
    authorized = true
    return {...initialState, authorized, boards}
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
  description: 'A Pinterest board',
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
  description: 'An image on a pin in a Pinterest board',
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
  description: 'A session using the Pinterest API',
  fields: () => ({
    authorized: {
      type: GraphQLBoolean
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
