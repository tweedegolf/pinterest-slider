import pdk from './pdk_wrapper'


export function getBoards(){
  return pdk.getBoards()
  .then(json => {

    let boards = []

    json.map(function(b){
      boards.push(b)
    })

    return boards
  })
}


export function getPins(boardId) {
  return pdk.getPins(boardId)
  .then(json => {

    let image
    let images = []

    json.map(function(p){
      image = p.image.original
      image.pinUrl = p.url
      images.push(p.image.original)
    })

    return images
  })
}


export function login(){
  return Promise.resolve()
  .then(pdk.login)
  .then(pdk.getBoards)
}


export function checkSession(){
  return pdk.accessToken !== ''
}
