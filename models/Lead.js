import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reg: { type: String, required: true },
  field: { type: String, required: true },
  location: { type: String, required: true },
  tel: { type: String, required: true },
  email: { type: String },
  website: { type: String },
  app: { type: String },
  
  
});

export default mongoose.model('Lead', leadSchema);
