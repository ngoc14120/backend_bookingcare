import userService from "../services/USERservice.js";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "missing input parameter!",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "missing required parameter!",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    message: "ok",
    users,
  });
};
let handleRegister = async (req, res) => {
  let message = await userService.userRegister(req.body);
  return res.status(200).json(message);
};
let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

// tạo dữ liệu dịch vụ
let handleCreateNewService = async (req, res) => {
  try {
    let message = await userService.createNewService(req.body);
    return res.status(200).json(message);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};
let handleGetServiceAll = async (req, res) => {
  try {
    let response = await userService.getServiceAll();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};
let handleGetServiceAllLimit = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await userService.getServiceAllLimit(+limit);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};
let handleDeleteService = async (req, res) => {
  if (!req.body.id) {
    return res.status(500).json({
      errCode: 1,
      message: "missing required id",
    });
  }

  let message = await userService.deleteService(req.body.id);
  return res.status(200).json(message);
};
let handleCreateServiceInfo = async (req, res) => {
  try {
    let response = await userService.createServiceInfo(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};
let handleGetDetailServiceById = async (req, res) => {
  try {
    let response = await userService.getDetailServiceById(req.query.id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};

//ffffffffffffffff
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(500).json({
      errCode: 1,
      message: "missing required id",
    });
  }

  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(500).json({
      errCode: 1,
      message: "missing required id",
    });
  }
  let message = await userService.editUser(req.body);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      message: "error from server",
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
  handleCreateNewService: handleCreateNewService,
  handleGetServiceAll: handleGetServiceAll,
  handleGetServiceAllLimit: handleGetServiceAllLimit,
  handleDeleteService: handleDeleteService,
  handleCreateServiceInfo: handleCreateServiceInfo,
  handleGetDetailServiceById: handleGetDetailServiceById,
  handleRegister: handleRegister,
};
