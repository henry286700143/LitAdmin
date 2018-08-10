/**
 * shipments 控制器
 * Created by henry on 2018/08/11.
 */
const Mock = require('mockjs');
const Shipments = require('../data/shipment');
let shipmentController = {};
let _Shipments = Shipments;

/**
 * 通过书名查询，获取图书列表
 * @param req
 * @param res
 */
shipmentController.find = function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let name = req.query.name || ''; //图书名称
  let total = 0;
  let rltBooks = [];
  if (name.length > 0) {
    let mockBooks = _Shipments.filter(book => {
      return book.name.indexOf(name) > -1;
    });
    total = mockBooks.length; //总条数
    rltBooks = mockBooks.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  } else {
    total = _Shipments.length; //总条数
    rltBooks = _Shipments.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  }
  res.json({
    total: total,
    limit: limit,
    shipments: rltBooks
  })
};

/**
 * 通过id获取某一条图书新
 * @param req
 * @param res
 */
shipmentController.findById = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let shipment = _.find(_Shipments, function (b) {
    return b.id === id;
  });
  res.json(shipment || null)
};

/**
 * 添加一条图书信息
 * @param req
 * @param res
 */
shipmentController.create = function (req, res) {
  let name = req.body.name;
  let author = req.body.author;
  let description = req.body.description;
  let publishAt = req.body.publishAt;
  _Shipments.push({
    id: Mock.Random.guid(),
    name: name,
    author: author,
    description: description,
    publishAt: publishAt
  });
  res.json({"errcode": 0, "errmsg": "新增成功"})
};

/***
 * 更新一条图书记录
 * @param req
 * @param res
 */
shipmentController.update = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let name = req.body.name;
  let author = req.body.author;
  let description = req.body.description;
  let publishAt = req.body.publishAt;

  let i = _.findIndex(_Shipments, function (u) {
    return u.id === id
  })
  if (i > -1) {
    _Shipments[i].name = name;
    _Shipments[i].author = author;
    _Shipments[i].description = description;
    _Shipments[i].publishAt = publishAt;
    res.json({"errcode": 0, "errmsg": "修改成功"});
  } else {
    res.json({"errcode": 40009, "errmsg": "处理失败"});
  }
};

/**
 * 更新一条图书记录的部分信息
 * @param req
 * @param res
 */
shipmentController.patch = function (req, res) {

};

/**
 * 批量删除
 * @param req
 * @param res
 */
shipmentController.deleteBatch = function (req, res) {
  let ids = req.params.ids;
  ids = ids.split(',');
  _Shipments = _Shipments.filter(b => !ids.includes(b.id))
  res.json({"errcode": 0, "errmsg": "删除成功"});
};

/**
 * 单条删除
 * @param req
 * @param res
 */
shipmentController.delete = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let i = _.findIndex(_Shipments, function (u) {
    return u.id === id
  })
  if (i > -1) {
    _Shipments.splice(i, 1);
    res.json({"errcode": 0, "errmsg": "修改成功"});
  } else {
    res.json({"errcode": 40009, "errmsg": "处理失败"});
  }
};

module.exports = shipmentController;
