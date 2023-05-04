module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      //id가 기본적으로 들어있다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      //UserId:1
      //PostId:3
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", //한글저장 + 이모티콘
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); //belongsTo를 통해 위의 주석처럼 실제 컬럼이 생긴다.
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
