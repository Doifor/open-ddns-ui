<template>
  <div>
    <el-table :data='accounts' style='width: 80%; margin-left: 10%;' @row-dblclick='deleteAccount'>
      <el-table-column label="账户" prop="name"></el-table-column>
      <el-table-column label="服务商" prop="platform"></el-table-column>
      <el-table-column label="ACCESS_KEY" prop="accessKey"></el-table-column>
      <el-table-column label="ACCESS_SECRET" prop="secret"></el-table-column>
    </el-table>
    <el-button type="success" icon="el-icon-plus" circle style="margin-top: 1rem;"
               @click="dialogVisible = true"></el-button>
    <el-dialog title="新增账户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="account" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="服务商" prop="platform">
          <el-select v-model="account.platform" placeholder="请选择服务商" style="width: 100%">
            <el-option v-for="p in platforms" :value="p" :label="p"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户" prop="name">
          <el-input v-model="account.name"></el-input>
        </el-form-item>
        <el-form-item label="access_key" prop="accessKey">
          <el-input v-model="account.accessKey"></el-input>
        </el-form-item>
        <el-form-item label="access_secret" prop="secret">
          <el-input  v-model="account.secret"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {addAccount, deleteAccount, listAccount, platforms} from "@/api/user";

export default {
  data() {
    return {
      accounts: [],
      platforms: [],
      dialogVisible: false,
      formLabelWidth: '120px',
      account: {
        platform:'',
        name:'',
        accessKey: '',
        secret: ''
      },
      rules: {
        platform:[
          { required: true, message: '请选择服务商', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请填入一个可识别的账户名称', trigger: 'blur' }
        ],
        accessKey: [
          { required: true, message: '请填入accessKey', trigger: 'blur' }
        ],
        secret: [
          { required: true, message: '请填入secret', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    listAccount().then(res => {
      this.accounts = res.data
    })

    platforms().then(res => {
      this.platforms = res.data
    })
  },
  methods: {
    deleteAccount(r, c, e) {
      let that = this
      this.$confirm('此操作将永久删除该账户以及所属域名的DDNS记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
            deleteAccount(r.id).then(res => {
              listAccount().then(res => {
                that.accounts = res.data
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              })
            })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    onSubmit() {
      let that = this;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          addAccount(that.account)
              .then(res => {
                listAccount().then(res => {
                  that.accounts = res.data
                  that.$refs['form'].resetFields();
                  that.dialogVisible = false;
                })
              })
        } else {
          return false;
        }
      })

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    }
  }
}
</script>

<style>
</style>
