/***
 * manages相关路由
 * 采用 restful api 风格
 */
var express = require('express');
var router = express.Router();
var indexRouter = {};
var userController = require('../../../controllers/user');
var manageController = require('../../../controllers/manage');

//先检查登录
router.use(userController.checkLogin);

//返回manage的集合
router.get('/', manageController.find);

//返回指定的manage
router.get('/:id', manageController.findById);

//创建manage
router.post('/', manageController.create);

//更新manage全部信息
router.put('/:id', manageController.update);

//更新manage部分信息
router.patch('/:id', manageController.patch);

//批量删除
router.delete('/batch/:ids', manageController.deleteBatch);

//删除指定的manage
router.delete('/:id', manageController.delete);



indexRouter.router = router;

module.exports = indexRouter;
