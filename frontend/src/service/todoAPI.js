
const { TODO_INSTANCE } = require('./axiosInstance');


// Add a new todo
export async function addTodo(data) {
  try {
    const response = await TODO_INSTANCE.post('', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}


// Get all todo
export async function getAllTodo(projectId) {
  try {
    const response = await TODO_INSTANCE.get('/'+projectId);
    return response.data;
  } catch (error) {
    throw error;
  }
}



// Get all todo
// export async function getTodo(id) {
//   try {
//     const response = await TODO_INSTANCE.get(id);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }





// delete a todo by ID
export async function deleteTodo(id) {
  try {
    const response = await TODO_INSTANCE.delete(id);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//update todo
export async function updateTodo(id, data) {
  try {
    const response = await TODO_INSTANCE.put(
      `/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
