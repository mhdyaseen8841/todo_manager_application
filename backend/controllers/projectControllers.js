import Project from "../models/projectSchema.js";
import Todo from "../models/TodoSchema.js";
import axios from "axios"
import fs from "fs"
import path from "path";
const addProject = async (req, res) => {
  const { title } = req.body;
  try {
    let existProject = await Project.findOne({ title });

    if (!existProject) {
      const newProject = await Project.create(req.body);
      res.status(201).json({
        status: "success",
        success: true,
        message: "Project Created Successfully",
        data: newProject,
      });
    } else {
      res.status(400).json({
        status: "failed",
        success: false,
        message:
          "Project name should be unique, project already exist with same name",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      success: false,
      message: err.message,
    });
  }
};

const getProjectDetails = async (req, res) => {
  try {
    let id = req.params.id;
    const project = await Project.findById(id);
    res.status(201).json({
      status: "success",
      success: true,
      message: "succesfully Retrived Projects",
      data: project,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      success: false,
      message: err.message,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const listProject = await Project.find();

    res.status(201).json({
      status: "success",
      success: true,
      message: "succesfully Retrived Projects",
      data: listProject,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      success: false,
      message: err.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    let id = req.params.id;

    const updateProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: "success",
      success: true,
      message: "Details Updated succesfully",
      data: updateProject,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      success: false,
      message: err.message,
    });
  }
};

const deleteProject = async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    await Todo.deleteMany({ _id: { $in: project.list_of_todos } });
    const deleteDetails = await Project.findByIdAndDelete(projectId);
    res.status(201).json({
      status: "success",
      success: true,
      message: "records deleted succesfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      success: false,
      message: err.message,
    });
  }
};

const exportSummary = async (req, res) => {
  const { id } = req.body;
  const ProjectDetails = await Project.findById(id).populate("list_of_todos");

  if (!ProjectDetails || !ProjectDetails.list_of_todos) {
    return res.status(400).json({
      status: "failed",
      success: false,
      message: "Invalid Project",
    });
  }

  const pendingTasks = ProjectDetails.list_of_todos.filter(
    (todo) => todo.status === "pending"
  );
  const completedTasks = ProjectDetails.list_of_todos.filter(
    (todo) => todo.status === "completed"
  );
  const projectTitle = ProjectDetails.title;
  const totalTodoCount = ProjectDetails.list_of_todos.length;

  const gistContent =
    `# ${projectTitle}\n\n` +
    `**Summary:** ${completedTasks.length}/${totalTodoCount} todos completed\n\n` +
    `### Pending\n` +
    `${pendingTasks.map((task) => `- [ ] ${task.description}`).join("\n")}\n\n` +
    `### Completed\n` +
    `${completedTasks.map((task) => `- [x] ${task.description}`).join("\n")}`;

  const gistPayload = {
    description: `Project Summary: ${projectTitle}`,
    public: false,
    files: {
      [`${projectTitle}.md`]: { content: gistContent },
    },
  };

  const currentDir = path.resolve(
    path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
  );
  const localFilePath = path.resolve(currentDir, '..', 'gists', `${projectTitle}.md`);


  const gistsDir = path.dirname(localFilePath);
  if (!fs.existsSync(gistsDir)) {
    fs.mkdirSync(gistsDir, { recursive: true }); 
  }


  fs.writeFile(localFilePath, gistContent, async (err) => {
    if (err) {
      console.log("Failed to save gist locally:", err);
      return res.status(500).json({
        status: "failed",
        success: false,
        message: "Failed to save gist locally",
        data: err,
      });
    } else {
      console.log(`Gist saved locally as ${projectTitle}.md`);
      
      try {
        const response = await axios.post(
          "https://api.github.com/gists",
          gistPayload,
          {
            headers: {
              Authorization: `Bearer ${process.env.GIST_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        return res.status(201).json({
          status: "success",
          success: true,
          message: "exported as gist",
          gistUrl: response.data.html_url,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: "failed",
          success: false,
          message: "Failed to create Gist",
          data: error,
        });
      }
    }
  });
};


export {
  addProject,
  updateProject,
  deleteProject,
  getProjectDetails,
  getAllProjects,
  exportSummary,
};
