/**
 * manages 控制器
 * Created by henry on 2018/08/11.
 */
const Mock = require('mockjs');
const Manages = require('../data/manage');
let manageController = {};
let _Manages = Manages;

/**
 * 通过书名查询，获取图书列表
 * @param req
 * @param res
 */
manageController.find = function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let name = req.query.name || ''; //图书名称
  let total = 0;
  let rltBooks = [];
  if (name.length > 0) {
    let mockBooks = _Manages.filter(book => {
      return book.name.indexOf(name) > -1;
    });
    total = mockBooks.length; //总条数
    rltBooks = mockBooks.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  } else {
    total = _Manages.length; //总条数
    rltBooks = _Manages.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  }
  res.json({
    total: total,
    limit: limit,
    manages: rltBooks
  })
};

/**
 * 通过id获取某一条图书新
 * @param req
 * @param res
 */
manageController.findById = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let manage = _.find(_Manages, function (b) {
    return b.id === id;
  });
  res.json(manage || null)
};

/**
 * 添加一条图书信息
 * @param req
 * @param res
 */
manageController.create = function (req, res) {
  let name = req.body.name;
  let author = req.body.author;
  let description = req.body.description;
  let publishAt = req.body.publishAt;
  _Manages.push({
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
manageController.update = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let name = req.body.name;
  let author = req.body.author;
  let description = req.body.description;
  let publishAt = req.body.publishAt;

  let i = _.findIndex(_Manages, function (u) {
    return u.id === id
  })
  if (i > -1) {
    _Manages[i].name = name;
    _Manages[i].author = author;
    _Manages[i].description = description;
    _Manages[i].publishAt = publishAt;
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
manageController.patch = function (req, res) {

};

/**
 * 批量删除
 * @param req
 * @param res
 */
manageController.deleteBatch = function (req, res) {
  let ids = req.params.ids;
  ids = ids.split(',');
  _Manages = _Manages.filter(b => !ids.includes(b.id))
  res.json({"errcode": 0, "errmsg": "删除成功"});
};

/**
 * 单条删除
 * @param req
 * @param res
 */
manageController.delete = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let i = _.findIndex(_Manages, function (u) {
    return u.id === id
  })
  if (i > -1) {
    _Manages.splice(i, 1);
    res.json({"errcode": 0, "errmsg": "修改成功"});
  } else {
    res.json({"errcode": 40009, "errmsg": "处理失败"});
  }
};

module.exports = manageController;
