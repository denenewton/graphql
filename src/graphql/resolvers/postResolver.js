import Post from "../../model/Post";
import User from '../../model/User'

export default {
  Post: {
    author: async (post) => await User.findById(post.author),
  },
  Query: {
    posts: async () => await Post.find(),
    post: async (_, args) => await Post.findById(args.id),
  },
  Mutation: {
    createPost: async (_, args) => await Post.create(args.data),
    updatePost: async (_, {id, data}) => await Post.findOneAndUpdate({_id: id}, data, { new: true }), // updatePost(id: ID!, data: PostInput): Post!
    deletePost: async (_, { id }) => !!(await Post.findOneAndDelete(id)),
  },
};
