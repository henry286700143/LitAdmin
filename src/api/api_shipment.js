/**
 * Created by henry on 2018/08/11.
 * 图书相关api
 */
import * as API from './'

export default {

  //查询获取shipment列表(通过page分页)
  findList: params => {
    return API.GET('/api/v1/shipments', params)
  },

  //查询获取一条shipment信息
  findById: id => {
    return API.GET(`/api/v1/shipments/${id}`)
  },

  add: params => {
    return API.POST(`/api/v1/shipments`, params)
  },
  update: (id, params) => {
    return API.PUT(`/api/v1/shipments/${id}`, params)
  },

  //单个删除shipment
  remove: id => {
    return API.DELETE(`/api/v1/shipments/${id}`)
  },

  //批量删除，传ids数组
  removeBatch: (ids) => {
    return API.DELETE(`/api/v1/shipments/batch/${ids}`)
  }

}
