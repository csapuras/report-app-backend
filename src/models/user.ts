import config from '../config/config';
import logger from '../utils/logger';
import mongoose, {Schema} from 'mongoose'

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

interface User {
  username?: string | undefined;
  passwordHash?: string | undefined;
  id?: string;
  _id?: string;
  __v?: string;
}

const schema = new mongoose.Schema<User>({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as any)._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});


export default mongoose.model("User", schema);
