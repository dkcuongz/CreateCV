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
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand">
              <h3 class="uk-card-title uk-margin-remove-bottom card-title">
                プロフィールを入力
              </h3>
              <p class="uk-text-meta uk-margin-remove-top">
                氏名記入欄や年号の計算に使います
              </p>
            </div>
          </div>
        </div>
          <el-form
            label-position="top"
            label-width="100px"
            size="medium"
          >
            <el-form-item label="氏名" class="uk-margin-remove">
              <el-row>
                <el-col :span="12" class="col-width-12 uk-margin-right"
                  ><el-input v-model="text1" class="input-csv"></el-input
                ></el-col>
                <el-col :span="12" class="col-width-12"
                  ><el-input v-model="text2" class="input-csv"></el-input
                ></el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="ふりがな" class="uk-margin-remove">
              <el-row>
                <el-col :span="12" class="col-width-12 uk-margin-right"
                  ><el-input v-model="text3" class="input-csv"></el-input
                ></el-col>
                <el-col :span="12" class="col-width-12"
                  ><el-input v-model="text4" class="input-csv"></el-input
                ></el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="生年月日" class="uk-margin-remove">
              <el-row>
                <el-col :span="8" class="col-width-8"
                  ><el-input v-model="text5" class="input-csv"
                  placeholder="2000" style="width: 70px"></el-input>
                  <span style="line-height: 32px; padding: 0 5px 0 5px"
                    >年</span
                  ></el-col
                >
                <el-col :span="8" class="col-width-4"
                  ><el-input v-model="text6" style="width: 55px"
                  placeholder="12" class="input-csv"></el-input>
                  <span style="line-height: 32px; padding: 0 5px 0 5px"
                    >月</span
                  ></el-col
                >
                <el-col :span="8"
                  ><el-input v-model="text7" style="width: 55px"
                  placeholder="31" class="input-csv"></el-input>
                  <span style="line-height: 32px; padding: 0 5px 0 5px"
                    >日</span
                  ></el-col
                >
              </el-row>
            </el-form-item>
            <el-form-item label="年齢" class="uk-margin-remove">
              <el-row>
                <el-col :span="24"
                  ><el-input v-model="text8" style="width: 70px" class="input-csv"></el-input>
                  <span style="line-height: 32px; padding: 0 5px 0 5px"
                    >歳</span
                  ></el-col
                >
              </el-row>
            </el-form-item>
            <el-form-item label="性別" class="uk-margin-remove">
              <el-radio-group v-model="radio">
                <el-radio class="label-radio" label="男性"></el-radio> <br/>
                <el-radio class="label-radio" label="女性"></el-radio> <br/>
                <el-radio class="label-radio" label="記入しない >"></el-radio> <br/>
                <el-radio class="label-radio" label="表示しない"></el-radio> <br/>
              </el-radio-group>
            </el-form-item>
          </el-form>
        <div
          class="el-card__footer uk-flex uk-flex-right"
          style="padding-top: 15px"
        >
          <el-button type="danger" @click="active += 1" class="button-submit"
            >次へ <i class="el-icon-d-arrow-right"></i
          ></el-button>
        </div>
      </el-card>
    </div>
    <div v-if="active === 1" class="uk-margin-top uk-flex uk-flex-center">
      steps 2
    </div>
    <div v-if="active === 1">step 2</div>
    <div v-if="active === 11" class="uk-margin-top uk-flex uk-flex-center">
      <div class="uk-card uk-card-default uk-width-1-2@m">
        <div class="uk-card-header">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand">
              <h3 class="uk-card-title uk-margin-remove-bottom">
                ダウンロード
              </h3>
              <p class="uk-text-meta uk-margin-remove-top">
                作成した履歴書をPDFでダウンロードします
              </p>
            </div>
          </div>
        </div>
        <div class="uk-card-body">
          <div class="fluffy">
            <div class="your-yagi">
              <div class="message-placement">
                <div class="fixed message">
                  さいごまでがんばった！
                </div>
              </div>
              <div class="image-area"><ruby title="なまえをかえられるよ"> </ruby></div>
            </div>
          </div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-button type="danger" icon="el-icon-download"
            class="uk-align-center"> ダウンロードする </el-button>
          </el-form>
        </div>
        <div class="uk-card-footer">
          <a href="#" class="uk-button uk-button-text">Read more</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      text5: '',
      text6: '',
      text7: '',
      text8: '',
      radio: '',
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
