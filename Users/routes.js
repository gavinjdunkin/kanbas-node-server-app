import * as dao from "./dao.js";
export default function UserRoutes(app) {
  const createUser = async (req, res) => { 
    const user = await dao.createUser(req.body);
    res.json(user);
  };
    app.post("/api/users", createUser);
  const deleteUser = async (req, res) => { 
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
};
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };
    app.get("/api/users", findAllUsers);
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(id);
    res.json(user); };
    app.get("/api/users/:userId", findUserById);
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    res.json(status);
  };
    app.put("/api/users/:userId", updateUser);
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    globalCurrentUser = currentUser;
    res.json(currentUser);
  };
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.sendStatus(401);
    }

};
    app.post("/api/users/signin", signin);
const signout = (req, res) => {
    req.session.destroy();

    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    res.json(currentUser);
  };
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
};
