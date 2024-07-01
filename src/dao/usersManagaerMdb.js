import usersModel from "./models/users.models.js";

class userManager {
  constructor() {
    this.users = usersModel;
  }

  getUser = async (filter) => {
    try {
      return this.users.find(filter).lean();
    } catch (error) {
      return error.message;
    }
  };

  addUser = async (firstName, lastName, email, password) => {
    try {
      return await this.users.create({
        firstName,
        lastName,
        email,
        password,
      });
      
    } catch (error) {
      return error.message;
    }
  };
}

export default userManager;
