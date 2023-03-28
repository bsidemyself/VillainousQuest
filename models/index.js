const User = require('./User');
const Quest = require('./Quest');
const Comment = require('./Comment');

User.hasMany(Quest, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Quest.belongsTo(User, {
    foreignKey: 'user_id'
});

Quest.hasMany(Comment, {
    foreignKey: 'quest_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Quest, {
    foreignKey: 'quest_id'
});

module.exports = { User, Quest, Comment };
