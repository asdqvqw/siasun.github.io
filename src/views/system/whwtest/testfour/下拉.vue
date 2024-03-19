<el-dialog v-model="dialogVisible" title="数据" :visible="dialogVisible" @close="dialogVisible = false">
    <pre>{{ JSON.stringify(jsonData, null, 2) }}</pre>
    <el-select v-model="selectedItem" placeholder="请选择项目" @change="handleItemChange">
      <el-option v-for="(value, key) in jsonData" :key="key" :label="key" :value="key"></el-option>
    </el-select>
    <el-select v-model="selectedStatus" placeholder="请选择状态" @change="handleStatusChange">
      <el-option label="启用" value="true"></el-option>
      <el-option label="禁用" value="false"></el-option>
    </el-select>
  </el-dialog>