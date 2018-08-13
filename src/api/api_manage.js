/**
 * Created by henry on 2018/08/11.
 * 调度单相关api
 */
import * as API from './'

export default {

  //查询获取manage列表(通过page分页)
  findList: params => {
    return API.GET('/api/v1/manages', params)
  },

  //查询获取一条manage信息
  findById: id => {
    return API.GET(`/api/v1/manages/${id}`)
  },

  add: params => {
    return API.POST(`/api/v1/manages`, params)
  },
  update: (id, params) => {
    return API.PUT(`/api/v1/manages/${id}`, params)
  },

  //单个删除manage
  remove: id => {
    return API.DELETE(`/api/v1/manages/${id}`)
  },

  //批量删除，传ids数组
  removeBatch: (ids) => {
    return API.DELETE(`/api/v1/manages/batch/${ids}`)
  }

}
