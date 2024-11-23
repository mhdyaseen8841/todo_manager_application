
const { PROJECT_INSTANCE } = require('./axiosInstance');


// Add a new project
export async function addProject(data) {
  try {
    const response = await PROJECT_INSTANCE.post('', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}


// Get all projects
export async function getAllProjects() {
  try {
    const response = await PROJECT_INSTANCE.get('');
    return response.data;
  } catch (error) {
    throw error;
  }
}



// Get all projects
export async function getProject(id) {
  try {
    const response = await PROJECT_INSTANCE.get(id);
    return response.data;
  } catch (error) {
    throw error;
  }
}





// delete a project by ID
export async function deleteProject(id) {
  try {
    const response = await PROJECT_INSTANCE.delete(id);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//update project
export async function updateProject(id, data) {
  try {
    const response = await PROJECT_INSTANCE.put(
      `/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


//export summary
export async function exportSummary(data,token) {
  try {
    const response = await PROJECT_INSTANCE.post('export-summary', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
