const BE_URL = 'http://localhost:8080'

export const genetateAiImage = async (prompt)=>{
    try {
        const response = await fetch(`${BE_URL}/api/dalle`,{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt: prompt})
          }) 
          const data = await response.json();
          return data
    } catch (error) {
        console.log(error)
        throw error
    }
}



export const SubmitePost = async (form)=>{
  try {
    const response = await fetch(`${BE_URL}/api/v1/post`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
    const data = await response.json()
    return data

  }catch(error){
    console.log(error)
    throw(error)
  }
}


export const getAllPosts = async ()=>{
  try {
    const response = await fetch(`${BE_URL}/api/v1/post`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
      }
    })
    if(response.ok){
      const result = await response.json()
      return result
    }else{
      throw new Error('Failed to fetch posts')
    }

  } catch (error) {
    console.log(error)
    throw(error)
  }
}