

export async function getAllImages(userEmail){
    return await fetch(`http://localhost:4000/api/user/allPosts/${userEmail}`)
        .then(res => res.json());
}

export async function getPictures(){
    return await fetch(`http://localhost:4000/api/post/allPosts`)
        .then(res => res.json());
}


export async function getPicturesCategory(category){
    return await fetch(`http://localhost:4000/api/post/allPosts?filter=${category}`)
        .then(res => res.json());
}


export async function getInfoUser(username){
    return await fetch(`http://localhost:4000/api/user/userInfo/${username}`)
        .then(res => res.json());
}

