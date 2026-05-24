import config from '../config/config';
import logger from '../utils/logger';
import mongoose from 'mongoose'

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

interface Report {
  lat: string;
  lng: string;
  name: string;
  contact: string;
  municipality?: string;
  brgy?: string;
  address?: string;
  details?: string;
  date?: Date;
  created_at?: Date;
  status: string;
  id?: string;
  _id?: string;
  __v?: string;
}

const schema =new mongoose.Schema<Report>({
  lat: {
    type: String,
    required: true,    
  },
  lng: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  municipality: {
    type: String,
  },
  brgy: {
    type: String,
  },
  address: {
    type: String,
  }, 
  details: {
    type: String,
  },
  status: {
    type: String,
    default:"pending"
  },
  date: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as any)._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});

export default mongoose.model("Report", schema);
