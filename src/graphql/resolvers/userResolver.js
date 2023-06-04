import User from "../../model/User";

export default {
  User: {
    fullName: (user) => `${user.firstName} ${user.lastName}`,
  },
  Query: {
    users: async () => await User.find(),
    user: async (_, args) => await User.findById(args.id),
    getUserByEmail: async (_, { email }) =>
      await User.findOne({ email: email }),
  },
  Mutation: {
    createUser: async (_, args) => await User.create(args.data),
    updateUser: async (_, {id, data}) => await User.findOneAndUpdate({_id: id}, data, { new: true }),
    deleteUser: async (_, { id }) => {
      // !!(await User.findOneAndDelete(id)),
      const deleted = await User.findOneAndDelete(id);
      return !!deleted;
    },
  },
};
