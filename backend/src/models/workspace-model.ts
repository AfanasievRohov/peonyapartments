import { model, Schema } from 'mongoose';

const workspaceSchema = new Schema({
  name: { type: String, required: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  administrators: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  apartments: {
    type: Schema.Types.ObjectId,
    ref: 'Apartment'
  }
});

const Workspace = model('Workspace', workspaceSchema);

export default Workspace;
