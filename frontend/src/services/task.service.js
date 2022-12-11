import Axios from 'axios'

export const getTasks = async () => {
    try{
        const result = await Axios.get(
            "http://localhost:8080/api/task"
        )
        console.log("fromservices",result.data)
        return result.data

    }catch(error){
        console.log(error)
    }

  }
export const postTask = async (title,description)=>{
    try {
    const result = await Axios.post("http://localhost:8080/api/task",title,description)
    return result.data
    } catch (error) {
        
    }  
}
export const updateTask = async (id,title,description,finished)=>{
        try {
        const result = await Axios.put(`http://localhost:8080/api/task/${id}`,id,title,description,finished)
        return result.data
        } catch (error) {
            console.log("eRROR")
        }

}

export const deleteTask = async (id)=>{
    try {
    const result = await Axios.delete(`http://localhost:8080/api/task/${id}`)
    return console.log("Deleted Succesffuly")
    } catch (error) {
        console.log("error")
    }

}