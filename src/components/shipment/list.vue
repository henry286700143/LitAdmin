<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>出料单管理</el-breadcrumb-item>
        <el-breadcrumb-item>出料单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="单号" @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showAddDialog">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="books" highlight-current-row @selection-change="selsChange"
                style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="[出料单明细]">
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="工程名称及浇筑部位" sortable></el-table-column>
        <el-table-column prop="project" label="施工单位" width="150" sortable></el-table-column>
        <el-table-column prop="label" label="标号" width="100" sortable></el-table-column>
        <el-table-column prop="driver" label="司机" width="100" sortable></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button type="danger" @click="delBook(scope.$index,scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="batchDeleteBook" :disabled="this.sels.length===0">批量删除</el-button>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>

      <el-dialog title="编辑" :visible.sync ="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
          <el-form-item label="地址" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="作者1" prop="author">
            <el-input v-model="editForm.author" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出版日期1">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.publishAt"></el-date-picker>
          </el-form-item>
          <el-form-item label="简介1" prop="description">
            <el-input type="textarea" v-model="editForm.description" :rows="8"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit">提交</el-button>
        </div>
      </el-dialog>

      <!--新增界面-->
      <el-dialog title="新增" :visible.sync ="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="工程名称及浇筑部位" prop="name">
            <el-input v-model="addForm.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="施工单位" prop="author">
            <el-input v-model="addForm.project" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="标号" prop="author">
            <el-input v-model="addForm.label" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="浇筑方式" prop="author">
            <el-input v-model="addForm.pouringType" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="信息1" prop="author">
            <el-input v-model="addForm.infomation1" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="信息2" prop="author">
            <el-input v-model="addForm.infomation2" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="author">
            <el-input v-model="addForm.codeNum" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="配合比" prop="author">
            <el-input v-model="addForm.mixRatio" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="信息3" prop="author">
            <el-input v-model="addForm.infomation3" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="车号" prop="author">
            <el-input v-model="addForm.CarNum" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="信息4" prop="author">
            <el-input v-model="addForm.infomation4" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="司机" prop="author">
            <el-input v-model="addForm.driver" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="时间" prop="author">
            <el-date-picker v-model="addForm.dateTime" type="datetime" placeholder="选择日期时间" auto-complete="off"></el-date-picker>
          </el-form-item>
          <el-form-item label="信息5" prop="description">
            <el-input v-model="addForm.infomation5" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="调度" prop="description">
            <el-input v-model="addForm.manager" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>

    </el-col>
  </el-row>
</template>
<script>
  import util from '../../common/util'
  import API from '../../api/api_shipment';

  export default{
    data(){
      return {
        filters: {
          name: ''
        },
        books: [],
        total: 0,
        page: 1,
        limit: 10,
        loading: false,
        sels: [], //列表选中列

        //编辑相关数据
        editFormVisible: false,//编辑界面是否显示
        editFormRules: {
          address: [
            {required: true, message: '工程名称及浇筑部位', trigger: 'blur'}
          ],
          project: [
            {required: true, message: '施工单位', trigger: 'blur'}
          ],
          label: [
            {required: true, message: '标号', trigger: 'blur'}
          ],
          pouringType: [
            {required: true, message: '浇筑方式', trigger: 'blur'}
          ],
          infomation1: [
            {required: true, message: '信息1', trigger: 'blur'}
          ],
          infomation2: [
            {required: true, message: '信息2', trigger: 'blur'}
          ],
          codeNum: [
            {required: true, message: '编码', trigger: 'blur'}
          ],
          mixRatio: [
            {required: true, message: '配合比', trigger: 'blur'}
          ],
          infomation3: [
            {required: true, message: '信息3', trigger: 'blur'}
          ],
          CarNum: [
            {required: true, message: '车号', trigger: 'blur'}
          ],
          infomation4: [
            {required: true, message: '信息4', trigger: 'blur'}
          ],
          driver: [
            {required: true, message: '司机', trigger: 'blur'}
          ],
          dateTime: [
            {required: true, message: '时间', trigger: 'blur'}
          ],
          infomation5: [
            {required: true, message: '信息5', trigger: 'blur'}
          ],
          manager: [
            {required: true, message: '调度', trigger: 'blur'}
          ]
        },
        editForm: {
          id: 0,
          address: '',
          project: '',
          label: '',
          pouringType: '',
          infomation1: '',
          infomation2: '',
          codeNum: '',
          mixRatio: '',
          infomation3: '',
          CarNum: '',
          infomation4: '',
          driver: '',
          dateTime: '',
          infomation5: '',
          manager: ''
        },

        //新增相关数据
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          address: [
            {required: true, message: '工程名称及浇筑部位', trigger: 'blur'}
          ],
          project: [
            {required: true, message: '施工单位', trigger: 'blur'}
          ],
          label: [
            {required: true, message: '标号', trigger: 'blur'}
          ],
          pouringType: [
            {required: true, message: '浇筑方式', trigger: 'blur'}
          ],
          infomation1: [
            {required: true, message: '信息1', trigger: 'blur'}
          ],
          infomation2: [
            {required: true, message: '信息2', trigger: 'blur'}
          ],
          codeNum: [
            {required: true, message: '编码', trigger: 'blur'}
          ],
          mixRatio: [
            {required: true, message: '配合比', trigger: 'blur'}
          ],
          infomation3: [
            {required: true, message: '信息3', trigger: 'blur'}
          ],
          CarNum: [
            {required: true, message: '车号', trigger: 'blur'}
          ],
          infomation4: [
            {required: true, message: '信息4', trigger: 'blur'}
          ],
          driver: [
            {required: true, message: '司机', trigger: 'blur'}
          ],
          dateTime: [
            {required: true, message: '时间', trigger: 'blur'}
          ],
          infomation5: [
            {required: true, message: '信息5', trigger: 'blur'}
          ],
          manager: [
            {required: true, message: '调度', trigger: 'blur'}
          ]
        },
        addForm: {
          address: '',
          project: '',
          label: '',
          pouringType: '',
          infomation1: '',
          infomation2: '',
          codeNum: '',
          mixRatio: '',
          infomation3: '',
          CarNum: '',
          infomation4: '',
          driver: '',
          dateTime: '',
          infomation5: '',
          manager: ''
        }
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.search();
      },
      handleSearch(){
        this.total = 0;
        this.page = 1;
        this.search();
      },
      search(){
        let that = this;
        let params = {
          page: that.page,
          limit: 10,
          name: that.filters.name
        };

        that.loading = true;
        API.findList(params).then(function (result) {
          that.loading = false;
          if (result && result.books) {
            that.total = result.total;
            that.books = result.books;
          }
        }, function (err) {
          that.loading = false;
          that.$message.error({showClose: true, message: err.toString(), duration: 2000});
        }).catch(function (error) {
          that.loading = false;
          console.log(error);
          that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //删除
      delBook: function (index, row) {
        let that = this;
        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
          that.loading = true;
          API.remove(row.id).then(function (result) {
            that.loading = false;
            if (result && parseInt(result.errcode) === 0) {
              that.$message.success({showClose: true, message: '删除成功', duration: 1500});
              that.search();
            }
          }, function (err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
            that.loading = false;
            console.log(error);
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          });
        }).catch(() => {
        });
      },
      //显示编辑界面
      showEditDialog: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      //编辑
      editSubmit: function () {
        let that = this;
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            let para = Object.assign({}, this.editForm);
            para.dateTime = (!para.dateTime || para.dateTime == '') ? '' : util.formatDate.format(new Date(para.dateTime), 'yyyy-MM-dd hh24:mm:ss');
            API.update(para.id, para).then(function (result) {
              that.loading = false;
              if (result && parseInt(result.errcode) === 0) {
                that.$message.success({showClose: true, message: '修改成功', duration: 2000});
                that.$refs['editForm'].resetFields();
                that.editFormVisible = false;
                that.search();
              } else {
                that.$message.error({showClose: true, message: '修改失败', duration: 2000});
              }
            }, function (err) {
              that.loading = false;
              that.$message.error({showClose: true, message: err.toString(), duration: 2000});
            }).catch(function (error) {
              that.loading = false;
              console.log(error);
              that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
            });
          }
        });
      },
      showAddDialog: function () {
        this.addFormVisible = true;
        this.addForm = {
          address: '',
          project: '',
          label: '',
          pouringType: '',
          infomation1: '',
          infomation2: '',
          codeNum: '',
          mixRatio: '',
          infomation3: '',
          CarNum: '',
          infomation4: '',
          driver: '',
          dateTime: '',
          infomation5: '',
          manager: ''
        };
      },
      //新增
      addSubmit: function () {
        let that = this;
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            that.loading = true;
            let para = Object.assign({}, this.addForm);
            para.dateTime = (!para.dateTime || para.dateTime === '') ? '' : util.formatDate.format(new Date(para.dateTime), 'yyyy-MM-dd hh24:mm:ss');
            API.add(para).then(function (result) {
              that.loading = false;
              if (result && parseInt(result.errcode) === 0) {
                that.$message.success({showClose: true, message: '新增成功', duration: 2000});
                that.$refs['addForm'].resetFields();
                that.addFormVisible = false;
                that.search();
              } else {
                that.$message.error({showClose: true, message: '修改失败', duration: 2000});
              }
            }, function (err) {
              that.loading = false;
              that.$message.error({showClose: true, message: err.toString(), duration: 2000});
            }).catch(function (error) {
              that.loading = false;
              console.log(error);
              that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
            });

          }
        });
      },
      //批量删除
      batchDeleteBook: function () {
        let ids = this.sels.map(item => item.id).toString();
        let that = this;
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          that.loading = true;
          API.removeBatch(ids).then(function (result) {
            that.loading = false;
            if (result && parseInt(result.errcode) === 0) {
              that.$message.success({showClose: true, message: '删除成功', duration: 1500});
              that.search();
            }
          }, function (err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
          }).catch(function (error) {
            that.loading = false;
            console.log(error);
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          });
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.handleSearch()
    }
  }
</script>

<style>
  .demo-table-expand label {
    font-weight: bold;
  }
</style>
