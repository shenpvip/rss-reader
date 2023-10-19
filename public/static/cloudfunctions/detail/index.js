// 云函数入口文件
const cloud = require('wx-server-sdk')

let Parser = require('rss-parser');
let parser = new Parser();
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let feed = await parser.parseURL(event.url);
  return feed
}