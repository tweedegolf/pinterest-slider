import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
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
  displayState: DisplayStates.AUTHORIZE,
  message: '...',
  boards: [],
  images: [],
  index: 0,
  interval: 6000,
  selectedBoard: 'choose',
}

class User {
  constructor(settings){
    ({
      userId: this.userId,
      name: this.name,
      pictures: this.pictures,
    } = settings)
  }
}

const userData = {
  23: {
    userId: 23,
    name: 'sloth',
    pictures: {
      32: './img/sloth32.jpg',
      64: './img/sloth64.jpg',
      128: './img/sloth128.jpg'
    }
  },
  24: {
    userId: 24,
    name: 'rabbit',
    pictures: {
      32: './img/rabbit32.jpg',
      64: './img/rabbit64.jpg',
      128: './img/rabbit128.jpg',
    }
  },
  25: {
    userId: 25,
    name: 'bear',
    pictures: {
      32: './img/bear32.jpg',
      64: './img/bear64.jpg',
      128: './img/bear128.jpg'
    }
  }
}

const getProfilePicture = function(user, size){
  return {
    uri: user.pictures[size],
    size
  }
}

const getUser = function(id){
  let user = new User(userData[id])

  return user

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(user)
  //   }, 2000)
  // })
}

const getAllUsers = function(){
  let users = []

  Object.entries(userData).forEach(entry => {
    users.push(new User(entry[1]))
  })
  // console.log(users)
  return {users}
}


const getState = function(){
  return {
    displayState: DisplayStates.AUTHORIZE,
    message: 'nothing to tell you right now'
  }
}

const profilePicture = new GraphQLObjectType({
  name: 'profilePicture',
  description: 'Profile picture',
  fields: () => ({
    uri: {
      type: GraphQLString,
      description: 'uri of picture'
    },
    size: {
      type: GraphQLInt,
      description: 'size of picture'
    }
  })
})


const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user.',
  fields: () => ({
    userId: {
      type: GraphQLInt,
      description: 'The database id of the user'
    },
    name: {
      type: GraphQLString,
      description: 'The name of the user.'
    },
    profilePhoto: {
      type: profilePicture,
      description: 'The profile picture of the user',
      args: {
        size: {
          type: GraphQLInt
        }
      },
      resolve: (root, {size}) => getProfilePicture(root, size)
    }
  })
})


const stateType = new GraphQLObjectType({
  name: 'State',
  description: 'Current state of the application',
  fields: () => ({
    displayState: {
      type: GraphQLString
    },
    message: {
      type: GraphQLString
    }
  })
})


const boardType = new GraphQLObjectType({
  name: 'Board',
  description: 'Current state of the application',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: new GraphQLList(boardType)
    },
  })
})


const checkSession = function(){
  let loggedin = PinterestAPI.checkSession()
  if(loggedin === true){
    return Promise.resolve()
    .then(PinterestAPI.getBoards)
    .then(boards => {
      return {
        loggedin,
        boards
      }
    })
  }
  return Promise.resolve()
  .then(PinterestAPI.login)
  .then(boards => {
    return {
      loggedin,
      boards
    }
  })
}

const sessionType = new GraphQLObjectType({
  name: 'Session',
  description: 'Current state of the application',
  fields: () => ({
    loggedin: {
      type: GraphQLBoolean,
    },
    boards: {
      type: new GraphQLList(boardType),
    }
  })
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    state: {
      type: stateType,
      resolve: () => getState()
    },
    session: {
      type: sessionType,
      resolve: () => checkSession()
    }
  })
})

    // user: {
    //   type: userType,
    //   args: {
    //     userId: {
    //       type: GraphQLInt
    //     }
    //   },
    //   resolve: (root, {userId}) => getUser(userId)
    // }

export const Schema = new GraphQLSchema({
  query: queryType
})


export default Schema
