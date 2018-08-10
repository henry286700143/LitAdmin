/***
 * shipments相关路由
 * 采用 restful api 风格
 */
var express = require('express');
var router = express.Router();
var indexRouter = {};
var userController = require('../../../controllers/user');
var shipmentController = require('../../../controllers/shipment');

//先检查登录
router.use(userController.checkLogin);

//返回shipment的集合
router.get('/', shipmentController.find);

//返回指定的shipment
router.get('/:id', shipmentController.findById);

//创建shipment
router.post('/', shipmentController.create);

//更新shipment全部信息
router.put('/:id', shipmentController.update);

//更新shipment部分信息
router.patch('/:id', shipmentController.patch);

//批量删除
router.delete('/batch/:ids', shipmentController.deleteBatch);

//删除指定的shipment
router.delete('/:id', shipmentController.delete);



indexRouter.router = router;

module.exports = indexRouter;
