<template>
  <div>
    <el-table :data="list" stripe>
      <el-table-column label="姓名" prop="regUserName"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column width="120px" label="手机号" prop="regPhone"></el-table-column>
      <el-table-column label="性别">
        <template #default="scope">{{ scope.row.sex }}</template>
      </el-table-column>
      <el-table-column label="叫号" prop="visitNumber"></el-table-column>
      <el-table-column label="时间" prop="sourceStartTime"></el-table-column>
      <el-table-column label="来源">
        <template #default="scope">
          <span v-if="scope.row.regWay === 1">app</span>
          <span v-if="scope.row.regWay === 2">健康通</span>
          <span v-if="scope.row.regWay === 3">公众号</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="状态">
        <template #default="scope">
          <template v-if="scope.row.payStatus !== 5">待支付</template>
          <template v-else>{{ scope.row.visitState }}</template>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button @click="start(scope)">
            <template v-if="scope.row.payStatus === 5"> 发起问诊 </template>
            <template v-else> 查看详情 </template>
          </el-button>
          <el-button v-if="scope.row.payStatus === 5 && $route.query.flag === 1" @click="sendMsg(scope)"
            >发送短信</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
  import { commonAjax } from '../../utils/axios';
  export default defineComponent({
    setup() {
      let state = reactive({
        total: 0,
        list: [],
      });
      const form = reactive({
        regUserName: '',
        localDoctorName: '',
        localRegDeptName: '',
        startWorkDate: '',
        endworkDate: '',
        visitWay: '',
        visitState: '',
        start: 1,
        length: 10,
      });
      onMounted(() => {
        getData();
      });
      const getData = async () => {
        let data = await commonAjax('/api/authex/cloudClinic/getClinicListToall', form);
        state.total = data.total;
        state.list = data.clinicLists;
      };
      const start = async () => {};
      return {
        getData,
        start,
        ...toRefs(state),
      };
    },
  });
</script>
