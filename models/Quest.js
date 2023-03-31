const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Quest extends Model {}
//Match Seed  seed/questdata.json
//Database Type ENUM


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
    areas: {
      type: DataTypes.ARRAY,
      area_Types: ['Swamp','Forest', 'Desert', 'Frozen Tundra', 'Mountains'],
    },
    locations: {
      type: DataTypes.ARRAY,
      locations: ['Village','Ruins','Castle','Cave','Dungeon']
    },
    missionType: {
      type: DataTypes.ARRAY,
      mission_Types: ['Siege', 'Monster Hunt', 'Artifact Retrieval', 'Rescue', 'Investigate', 'Escort']
      },
    monsterHunt: {
      type: DataTypes.ARRAY,
      monsters: ['Zombies', 'Manticore', 'Hydra', 'Minotaur', 'Werewolf']
    },
    magicItems: {
      type: DataTypes.ARRAY,
      items: ['Magic Sword', 'Crystal Ball', 'Staff of Fireball', 'Hand of Vecna', 'Magic Ring']
    },
    rescuePerson: {
      type: DataTypes.ARRAY,
      person: ['Princess', 'Town Baron', 'Monarch', 'Pet Goldfish', "Farmer's Daughter"]
    },
    escortMission: {
      type: DataTypes.ARRAY,
      escorts: ['Monarch', 'Prisoner', 'Wealthy Merchant', 'Supply Caravan', 'Wizard' ] 
    },
    difficultyLevel: {
        type: DataTypes.STRING,
        difficulty_Level: ['Easy', 'Medium', 'Hard']
    },  
  },
  {
    sequelize,
    modelName: 'quest',
  }
);

module.exports = Quest;