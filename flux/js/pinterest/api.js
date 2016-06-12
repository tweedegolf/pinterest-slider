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

    return {
      images,
      numImages: json.length
    }
  })
}


export function login(){
  return new Promise((resolve, reject) => {
    Promise.all([pdk.login(), pdk.boards()])
    .then(data => {
      console.log(data)
      resolve(data[0])
    })
  })
}


export function checkSession(){
  return pdk.accessToken !== ''
}
