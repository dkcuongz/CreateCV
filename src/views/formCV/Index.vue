<template>
  <div class="uk-container fullscreen">
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
        <el-form label-position="top" label-width="100px" size="medium">
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
                ><el-input
                  v-model="text5"
                  class="input-csv"
                  placeholder="2000"
                  style="width: 70px"
                ></el-input>
                <span style="line-height: 32px; padding: 0 5px 0 5px">年</span></el-col
              >
              <el-col :span="8" class="col-width-4"
                ><el-input
                  v-model="text6"
                  style="width: 55px"
                  placeholder="12"
                  class="input-csv"
                ></el-input>
                <span style="line-height: 32px; padding: 0 5px 0 5px">月</span></el-col
              >
              <el-col :span="8"
                ><el-input
                  v-model="text7"
                  style="width: 55px"
                  placeholder="31"
                  class="input-csv"
                ></el-input>
                <span style="line-height: 32px; padding: 0 5px 0 5px">日</span></el-col
              >
            </el-row>
          </el-form-item>
          <el-form-item label="年齢" class="uk-margin-remove">
            <el-row>
              <el-col :span="24"
                ><el-input v-model="text8" style="width: 70px" class="input-csv"></el-input>
                <span style="line-height: 32px; padding: 0 5px 0 5px">歳</span></el-col
              >
            </el-row>
          </el-form-item>
          <el-form-item label="性別" class="uk-margin-remove">
            <el-radio-group v-model="radio">
              <el-radio class="label-radio" label="男性"></el-radio> <br />
              <el-radio class="label-radio" label="女性"></el-radio> <br />
              <el-radio class="label-radio" label="記入しない >"></el-radio> <br />
              <el-radio class="label-radio" label="表示しない"></el-radio> <br />
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="el-card__footer uk-flex uk-flex-right" style="padding-top: 15px">
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
    <div v-if="active === 10" class="uk-margin-top uk-flex uk-flex-center">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand">
              <h3 class="uk-card-title uk-margin-remove-bottom card-title">
                履歴書の作成日を入力
              </h3>
              <p class="uk-text-meta uk-margin-remove-top">
                実際に書類を持参する日、または郵送する日を選びましょう
              </p>
            </div>
          </div>
        </div>
        <div class="card-center uk-margin-top">
          <el-form label-position="top" label-width="100px" size="medium">
            <el-button class="uk-width-1-1" size="large" :disabled="nowdisabled"
              >今日の日付を入力</el-button
            >
            <br />
            <el-button
              class="uk-width-1-1 uk-margin-small-top"
              size="large"
              :disabled="tomodisabled"
              >明日の日付を入力</el-button
            >
            <el-date-picker
              v-model="date11"
              type="date"
              class="width-date uk-margin-small-top uk-margin-medium-bottom"
              size="medium"
            >
            </el-date-picker>
          </el-form>
        </div>
        <div class="el-card__footer uk-flex uk-flex-right" style="padding-top: 15px">
          <el-button type="danger" @click="active += 1" class="button-submit"
            >次へ <i class="el-icon-d-arrow-right"></i
          ></el-button>
        </div>
      </el-card>
    </div>
    <div v-if="active === 11" class="uk-margin-top uk-flex uk-flex-center">
      <div class=" uk-width-1-2">
        <div class="uk-card uk-card-default">
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
              <div class="card-center uk-margin-top">
                <el-button type="danger" icon="el-icon-download" class="uk-width-1-1 ">
                  ダウンロードする
                </el-button>
                <p>
                  ログインすると、他の端末からも続きを書けるようにデータをバックアップできます。<br />
                  また、「コンビニ印刷」のサービスをご利用いただけます。
                </p>
                <div class="login">
                  <el-button type="danger" plain class="uk-width-1-1 ">
                    ご利用のGoogleアカウントでログインできます
                  </el-button>
                  <p class="uk-text-center uk-margin-small">
                    ご利用のGoogleアカウントでログインできます
                  </p>
                  <div class="horizontal-text"><span>または</span></div>
                  <el-input placeholder="SSCV@example.com" v-model="input"></el-input>
                  <el-button
                    type="danger"
                    icon="el-icon-download"
                    class="uk-width-1-1 uk-margin-top"
                  >
                    メールでリンクを送る
                  </el-button>
                  <p class="uk-margin-small">
                    メールに届いたリンクをクリックするだけでかんたんにログインできます。
                  </p>
                </div>
              </div>
            </el-form>
            <el-collapse v-model="activeNames" @change="handleChange" class="uk-margin-large-top">
              <el-collapse-item title="ヤギにはがきを渡す" name="1">
                <div>
                  Consistent with real life: in line with the process and logic of real life, and
                  comply with languages and habits that the users are used to;
                </div>
                <div>
                  Consistent within interface: all elements should be consistent, such as: design
                  style, icons and texts, position of elements, etc.
                </div>
              </el-collapse-item>
              <el-collapse-item title="スマホから履歴書を印刷するには" name="2">
                <div>
                  GoogleドライブやDropboxなどのクラウドストレージを使用するか、
                  Gmail経由で自分宛てにPDFを送ってデータを保存します。印刷は自宅のプリンタまたはコンビニ印刷などをご利用下さい。
                </div>
                <div>
                  コンビニ印刷のサービスご利用には、ログイン(無料)が必要になります。
                </div>
              </el-collapse-item>
              <el-collapse-item title="他の端末から続きを書くには" name="3">
                <div>Simplify the process: keep operating process simple and intuitive;</div>
                <div>
                  他の端末から続きを編集したい場合は、Googleアカウントでログインし「バックアップをとる」でデータを保存して続きを書くことができます。
                  なお、会員登録していない状態でも、現在入力されている端末からであれば続きの入力ができます
                  （ブラウザのデータを削除したり、端末を変更した場合はリセットされます）。
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="uk-card-footer">
            <el-button
              icon=" el-icon-d-arrow-left"
              type="danger"
              class="uk-width-1-5 button-submit"
            >
              前へ
            </el-button>
          </div>
        </div>
        <div class="text-right uk-margin-small">
          <div class="save-time-message"><span>最終保存：</span><span>6時間前</span></div>
        </div>
      </div>
    </div>
    <div class="card-preview-button">
      <el-button icon="el-icon-view" size="medium"> プレビュー</el-button>
    </div>
    <div class="uk-width-1-2 uk-margin-large-top uk-margin-bottom footer-cv">
      <div class="image-area"><ruby title="なまえをかえられるよ"> </ruby></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
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
      input: '',
      date11: '',
      nowdisabled: true,
      tomodisabled: false,
      activeNames: ['1'],
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
    handleChange(val) {
      console.log(val);
    },
    getCurrentDate() {
      const currentDate = new Date();
      console.log(currentDate);
      const currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '/');
      return currentDateWithFormat;
    },
  },
  mounted() {
    this.getCurrentDate();
  },
};
</script>
