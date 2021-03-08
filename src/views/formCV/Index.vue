<template>
  <div class="uk-container">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step
        class="uk-margin-top"
        v-for="(item, index) in steps"
        :key="index"
        :title="item.title"
        :description="item.desc"
        @click.native="handleClick(index)"
        icon="el-icon-s-flag"
      ></el-step>
    </el-steps>
    <div v-if="active === 0" class="uk-margin-top uk-flex uk-flex-center">
      <div class="uk-card uk-card-default uk-width-1-2@m">
        <div class="uk-card-header">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand">
              <h3 class="uk-card-title uk-margin-remove-bottom">
                プロフィールを入力
              </h3>
              <p class="uk-text-meta uk-margin-remove-top">
                氏名記入欄や年号の計算に使います
              </p>
            </div>
          </div>
        </div>
        <div class="uk-card-body">
          <form class="uk-form-stacked">
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">氏名</label>
              <div class="uk-form-controls uk-flex">
                <input
                  class="uk-input input-csv uk-margin-right"
                  id="form-stacked-text"
                  type="text"
                />
                <input
                  class="uk-input input-csv"
                  id="form-stacked-text"
                  type="text"
                />
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">ふりがな</label>
              <div class="uk-form-controls uk-flex">
                <input
                  class="uk-input input-csv uk-margin-right"
                  id="form-stacked-text"
                  type="text"
                />
                <input
                  class="uk-input input-csv"
                  id="form-stacked-text"
                  type="text"
                />
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">生年月日</label>
              <div class="uk-form-controls uk-flex">
                <input
                  style="width: 62px !important"
                  class="uk-input input-csv"
                  id="form-stacked-text"
                  type="text"
                  placeholder="2000"
                />
                <span style="line-height: 40px; padding: 0 5px 0 5px">年</span>
                <input
                  style="width: 40px !important"
                  class="uk-input input-csv"
                  id="form-stacked-text"
                  type="text"
                  placeholder="12"
                />
                <span style="line-height: 40px; padding: 0 5px 0 5px">月</span>
                <input
                  style="width: 40px !important"
                  class="uk-input input-csv"
                  id="form-stacked-text"
                  type="text"
                  placeholder="31"
                />
                <span style="line-height: 40px; padding: 0 5px 0 5px">日</span>
              </div>
            </div>

            <div class="uk-margin">
              <div class="uk-form-label">Radio</div>
              <div class="uk-form-controls">
                <label
                  ><input class="uk-radio" type="radio" name="radio1" /> Option
                  01</label
                ><br />
                <label
                  ><input class="uk-radio" type="radio" name="radio1" /> Option
                  02</label
                >
              </div>
            </div>
          </form>
        </div>
        <div class="uk-card-footer">
          <a href="#" class="uk-button uk-button-text">Read more</a>
        </div>
      </div>
    </div>
    <div v-if="active === 1">step 2</div>
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
