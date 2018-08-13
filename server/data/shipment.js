/**
 * 初始化出料单(shipment)模拟数据
 *
 * Created by henry on 2018/08/11.
 */
const Mock = require('mockjs');

const Shipments = [];
for (let i = 0; i < 100; i++) {
  Shipments.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.ctitle(2, 12),
    author: Mock.Random.cname(),
    description: Mock.Random.csentence(180, 500),
    publishAt: Mock.Random.date()
  }))
}

module.exports = Shipments;
