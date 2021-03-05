<template>
  <div class="uk-margin-top">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step
        v-for="(item, index) in steps"
        :key="index"
        :title="item.title"
        :description="item.desc"
        @click.native="handleClick(index)"
        icon="el-icon-s-flag"
      ></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      steps: [
        {
          title: 'Step 1',
          desc: 'プロフィール',
        },
        {
          title: 'Step 2',
          desc: '住所',
        },
        {
          title: 'Step 3',
          desc: '連絡先',
        },
        {
          title: 'Step 4',
          desc: '証明写真',
        },
        {
          title: 'Step 5',
          desc: '学歴',
        },
        {
          title: 'Step 6',
          desc: '職歴',
        },
        {
          title: 'Step 7',
          desc: '免許・資格',
        },
        {
          title: 'Step 8',
          desc: '志望動機',
        },
        {
          title: 'Step 9',
          desc: '通勤時間ほか',
        },
        {
          title: 'Step 10',
          desc: '本人希望欄',
        },
        {
          title: 'Step 11',
          desc: '作成日',
        },
        {
          title: 'Step 12',
          desc: 'ダウンロード',
        },
      ],
    };
  },

  methods: {
    handleClick(index) {
      this.active = index;
    },
  },
};
</script>
