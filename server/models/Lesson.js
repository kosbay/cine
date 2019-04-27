const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const BlocklyGameImage = new Schema({ name: String, url: String });
const Position = new Schema({ x: Number, y: Number });
const BlocklyGameSize = new Schema({ width: Number, height: Number });

const BlocklyGameObjectImage = new Schema({
  identifier: String,
  name: String,
  position: Position,
  size: BlocklyGameSize
});

const BlocklyGameObject = new Schema({
  type: String,
  identifier: String,
  images: [BlocklyGameObjectImage],
  size: BlocklyGameSize,
  degree: Number,
  position: Position
});

const BlocklyGameIntersectionObjectAnimation = new Schema({
  frameCount: Number,
  spriteKey: String
});

const BlocklyGameIntersectionObjectAction = new Schema({
  type: String,
  animation: BlocklyGameIntersectionObjectAnimation
});

const BlocklyGameIntersectionObject = new Schema({
  identifier: String,
  shouldStopMovement: Boolean,
  action: BlocklyGameIntersectionObjectAction
});

const BlocklyGameIntersection = new Schema({
  identifier: String,
  objects: [BlocklyGameIntersectionObject]
});

const BoardPoint = new Schema({
  identifier: String,
  backgroundImage: String,
  position: {
    x: Number,
    y: Number
  },
  direction: String,
  type: String
});

const Goal = new Schema({
  type: String,
  coinNumber: Number,
  solutionXML: String,
  solutionCode: String,
  destination: {
    x: Number,
    y: Number
  }
});

const MazeObjectsFunction = new Schema({
  identifier: String,
  functions: [String],
  canPassObjectsByIdentifiers: [String],
  canPassObjectsByTypes: [String]
});

const Lesson = new Schema({
  type: String,
  name: String,
  isYouTubePlayer: Boolean,
  url: String,
  text: String,
  surveyJson: String,
  isSingleTry: Boolean,
  workspaceXML: String,
  toolboxXML: String,
  code: String,
  compilerId: Number,
  startCode: String,
  solutionCode: String,
  codeOutput: String,
  problemId: String,
  layoutCode: String,
  codeInput: String,
  customBlocks: [String],
  blocklyGameImages: [BlocklyGameImage],
  blocklyGameObjects: [BlocklyGameObject],
  blocklyGameIntersections: [BlocklyGameIntersection],
  board: {
    width: Number,
    height: Number,
    backgroundImage: String
  },
  points: [BoardPoint],
  aldar: {
    position: {
      x: Number,
      y: Number
    },
    direction: String,
    spriteImage: String,
    spriteSize: Number
  },
  goal: Goal,
  mazeObjectsFunctions: [MazeObjectsFunction],
  wupai: { type: Number, default: 1 },
  feedback: String,
  skill: { type: Schema.Types.ObjectId, ref: "Skill" },
  isFree: { type: Boolean, default: false }
});

Lesson.plugin(mongoosePaginate);

module.exports = mongoose.model("Lesson", Lesson);
