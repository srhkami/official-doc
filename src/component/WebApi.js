import axios from "axios";


// 傳入的path記得最後加上 " / "
export function getList(path){
  return axios.get(`http://localhost:8000/api/${path}`)
}

export function getOne (path, id){
  return axios.get(`http://localhost:8000/api/${path}${id}/`)
}

export function deletePost (path, id){
  return axios.delete(`http://localhost:8000/api/${path}${id}/`)
}

export function createPost (path, post){
  return axios.post(`http://localhost:8000/api/${path}`, post)
}

export function editPost (path, post){
  return axios.put(`http://localhost:8000/api/${path}${post.id}/`, post)
}

export function updatePost(path, post){
  return axios.patch(`http://localhost:8000/api/${path}${post.id}/`, post)
}

