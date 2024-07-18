// 云函数入口文件
const cloud = require('wx-server-sdk');
const sql = require('mysql2/promise');
const sql_info = require('../../sql_info')


cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (input, context) => {
  //input: 
  //question_id: integer

  const wxContext = cloud.getWXContext();
  const connection = await sql.createConnection({
    host: sql_info.link,
    port: sql_info.port,
    database: "If2023",
    user: "InsertSelect",
    password: "ilikeif2023!!!"
  });

  const [results, meta] = await connection.execute(`SELECT FROM`)


  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}