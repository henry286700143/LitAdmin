/**
 * 初始化调度单(manage)模拟数据
 *
 * Created by henry on 2018/08/11.
 */
const Mock = require('mockjs');

const Manages = [];
for (let i = 0; i < 100; i++) {
  Manages.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.ctitle(2, 12),
    author: Mock.Random.cname(),
    description: Mock.Random.csentence(180, 500),
    publishAt: Mock.Random.date()
  }))
}

module.exports = Manages;
