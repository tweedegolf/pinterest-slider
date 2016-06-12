import Actions from '../actions'
import pdk from './pdk_wrapper'


export function getBoards(){
  pdk.getBoards()
  .then(json => {

    let boards = []

    json.map(function(b){
      boards.push(b)
    })

    Actions.getBoards(boards)
  })
}


export function getPins(boardId) {
  pdk.getPins(boardId)
  .then(json => {

    let pins = []
    let images = []

    json.map(function(p){
      pins.push(p)
      images.push(p.image.original)
    })

    Actions.getPins({
      pins,
      images,
      numImages: json.length
    })
  })
}


export function login(){
  pdk.login()
  .then(() => {
    getBoards()
  })
}


export function checkSession(){
  return pdk.accessToken !== ''
}
