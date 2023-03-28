const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Quest extends Model {}

Quest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    Areas: {
      type: DataTypes.STRING,
      area_Types: ['Swamp', 'Village', 'Forest', 'Desert', 'Tundra', 'Cave', 'Castle', 'Classic Dungeon'],
    },
    missionType: {
      type: DataTypes.STRING,
      mission_Types: ['Siege', 'Monster Hunt', 'Artefact Retrieval', 'Rescue', 'Investigate', 'Escort']
      },
    // partySized: {
    //     type: DataTypes.INTEGER,
    // },
    // difficultyLevel: {
    //     type: DataTypes.STRING,
    //     difficulty_Level: ['Easy', 'Medium', 'Hard']
    // },  
  },
  {
    sequelize,
    modelName: 'quest',
  }
);

module.exports = Quest;