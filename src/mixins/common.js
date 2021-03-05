import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import store from '../store/index';

dayjs.extend(utc);
dayjs.extend(timezone);

export default {
  data() {
    return {
      appVersion: '1.0',
      errors: {},
      isLoading: false,
      isDownload: false,
      isCollapse: false,
      dialogChangePassword: false,
      dialogExportCSV: false,
      dialogImportCSV: false,
      menuPrivilege: [],
    };
  },
  filters: {
    // タイムスタンプフォーマット
    formatTimestamp(value) {
      return dayjs.unix(value).utc().format('YYYY-MM-DD HH:mm:ss');
    },
    // 日時フォーマット
    formatDateTime(value) {
      if (!value) {
        return '';
      }
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    },
    // 日付フォーマット
    formatDate(value) {
      if (!value) {
        return '';
      }
      return dayjs(value).format('YYYY-MM-DD');
    },
  },
  methods: {
    // Axiosを使ってAPIを呼び出す
    // 方式メソッド
    // APIエンドポイントのapiPath
    // APIに送るデータ
    // isLoading：ローディングが表示されるかどうか
    // 成功の場合、データを返却する
    // ログインしていない、又はログインに遷移するトーケンの有効期限が切れた場合
    // 他のエラーの場合、エラーを表示するページに遷移する
    async http(method, apiPath, data, queryString = null, isLoading = true) {
      // APIを呼び出す前に、構成を設定する
      const config = {
        url: apiPath,
        method,
      };
      // GETメソッドの場合、リクエストパラメーターにデータを設定する
      if (method === 'GET') {
        config.params = data;
      // それ以外の場合、リクエストボディーにデータを設定する
      } else {
        config.data = data;
        // queryStringがあれば、設定する
        if (queryString !== null) {
          config.params = queryString;
        }
      }
      // APIを呼び出す
      try {
        const response = await this.$axios(config);
        // API呼び出しに成功した場合、APIのデータを呼び出し元に返却する
        return { data: response.data, statusCode: response.status };
      } catch (error) {
        if (error.response) {
          const { response } = error;
          // トーケンが有効ではない場合、ログインページに遷移する
          if (response.status !== 400) {
            // API呼び出しに成功した場合、APIのデータを呼び出し元に返却する
            return { data: response.data, statusCode: response.status };
          }
          return await this.$router.push('login');
        }
        // それ以外の場合、エラーページに遷移する
        return await this.$router.push('pageNotFound');
      } finally {
        if (isLoading) {
          this.stopLoading();
        }
        console.log(`DONE ${apiPath}`);
      }
    },
    // POSTメソッドでAPIを呼び出す
    async POST(apiPath, data, queryString, isLoading = true) {
      if (isLoading) {
        this.startLoading();
      }
      const res = await this.http('POST', apiPath, data, queryString, isLoading);
      return res;
    },
    // PATCHメソッドでAPIを呼び出す
    async PATCH(apiPath, data, queryString, isLoading = true) {
      if (isLoading) {
        this.startLoading();
      }
      const res = this.http('PATCH', apiPath, data, queryString, isLoading);
      return res;
    },
    // GETメソッドでAPIを呼び出す
    async GET(apiPath, params, isLoading = true) {
      if (isLoading) {
        this.startLoading();
      }
      const res = this.http('GET', apiPath, params);
      return res;
    },
    // timezoneの値でタイムスタンを取得する
    getTimestampWithTimezone(value, timeZone = 'UTC') {
      return dayjs.tz(value, timeZone).valueOf() / 1000;
    },
    // 日付からYYYY/MM/DDフォーマットで日付の文字列を取得する
    defaultDate(date) {
      if (!date) {
        return '';
      }
      return dayjs(date).format('YYYY/MM/DD');
    },
    dayMonthDate(date) {
      if (!date) {
        return '';
      }
      return dayjs(date).format('MM/DD');
    },
    dayYearMonth(date) {
      if (!date) {
        return '';
      }
      return dayjs(date).format('YYYY/MM');
    },
    dayYearMonthJP(date) {
      if (!date) {
        return '';
      }
      return dayjs(date).format('YYYY年MM月');
    },
    // 時間値から月を取得する
    getMonth(date) {
      if (!date) {
        return '';
      }
      return dayjs(date).format('MM');
    },
    // 時間値から年を取得する
    getYear(date) {
      if (!date) {
        return '';
      }
      return dayjs(date).format('YYYY');
    },
    // timestamp値からdatetimeを取得する
    getDateTime(value, format = 'YYYY-MM-DDTHH:mm:ss', keepTimeZone = false) {
      if (keepTimeZone) {
        return dayjs.unix(value).format(format);
      }
      return dayjs.unix(value).utc().format(format);
    },
    // 現在時間を取得する
    getNow(format = 'YYYY-MM-DDTHH:mm:ss', keepTimeZone = false) {
      if (keepTimeZone) {
        return dayjs.format(format);
      }
      return dayjs.utc().format(format);
    },
    // stringから日付を取得する
    getDate(value, keepTimeZone = false) {
      if (keepTimeZone) {
        return dayjs(value);
      }
      return dayjs(value).utc();
    },
    // ローディングを表示する
    startLoading() {
      this.$root.isLoading = true;
    },
    // ローディング表示を停止する
    stopLoading() {
      const self = this;
      setTimeout(() => {
        self.$root.isLoading = false;
      }, 400);
    },
    annouceConfirm() {
      // 催促適知の確認ダイアログ
      //
      return this.$confirm(
        '催促通知を実行します。よろしいですか。',
        '確認',
        {
          confirmButtonText: 'はい ',
          cancelButtonText: 'いいえ',
          type: 'info',
        },
      ).then(() => 'confirm').catch(() => 'cancel');
    },
    annouceListConfirm() {
      // 一斉通知の確認ダイアログ
      //
      return this.$confirm(
        '一斉通知を実行します。よろしいですか。',
        '確認',
        {
          confirmButtonText: 'はい ',
          cancelButtonText: 'いいえ',
          type: 'info',
        },
      ).then(() => 'confirm').catch(() => 'cancel');
    },
    deleteConfirm() {
      // 削除確認モーダルを表示する
      //
      return this.$confirm(
        '削除します。よろしいですか。',
        '確認',
        {
          confirmButtonText: 'はい ',
          cancelButtonText: 'いいえ',
          type: 'warning',
          customClass: 'delete-confirm',
        },
      ).then(() => 'confirm').catch(() => 'cancel');
    },
    editConfirm() {
      // 更新確認モーダルを表示する
      //
      return this.$confirm(
        '更新します。よろしいですか。',
        '確認',
        {
          confirmButtonText: 'はい ',
          cancelButtonText: 'いいえ',
          type: 'info',
        },
      ).then(() => 'confirm').catch(() => 'cancel');
    },
    copyConfirm() {
      // 複写確認モーダルを表示する
      //
      return this.$confirm(
        '複写します。よろしいですか。',
        '確認',
        {
          confirmButtonText: 'はい ',
          cancelButtonText: 'いいえ',
          type: 'info',
        },
      ).then(() => 'confirm').catch(() => 'cancel');
    },
    createConfirm() {
      // 作成する前に確認モーダルを表示する
      //
      return this.$confirm(
        '追加します。よろしいですか。',
        '確認',
        {
          confirmButtonText: 'はい ',
          cancelButtonText: 'いいえ',
          type: 'info',
        },
      ).then(() => 'confirm').catch(() => 'cancel');
    },
    // トーケンをリフレッシュする
    async refreshToken() {
      const refreshToken = this.ME;
      const response = await this.POST('updateToken', refreshToken);
      this.$axios.defaults.headers.common.Authorization = `Bearer ${response.data.authorization}`;
    },
    // 年齢を計算する
    // 誕生日のdateString
    // 年月日を計算するオブジェクトを返却する
    calculatorBirthDay(dateStart) {
      const userinput = dateStart;
      const dob = new Date(userinput);
      // ユーザーが日付を入力したら、実行する
      // ユーザーが入力した日付から年月日を抽出する
      const dobYear = dob.getYear();
      const dobMonth = dob.getMonth();
      const dobDate = dob.getDate();
      // システムから現時点の日付を取得する
      const now = new Date();
      // 現時点の日付から年月日を抽出する
      const currentYear = now.getYear();
      const currentMonth = now.getMonth();
      const currentDate = now.getDate();
      // 年月日から年齢を計算する変数を宣言する
      // 年を取得する
      let yearAge = currentYear - dobYear;
      let monthAge;
      // 月を取得する
      if (currentMonth >= dobMonth) {
        monthAge = currentMonth - dobMonth;
      } else {
        yearAge -= 1;
        monthAge = 12 + currentMonth - dobMonth;
      }

      let dateAge;
      // 日を取得する
      if (currentDate >= dobDate) {
        dateAge = currentDate - dobDate;
      } else {
        monthAge -= 1;
        dateAge = 31 + currentDate - dobDate;

        if (monthAge < 0) {
          monthAge = 11;
          yearAge -= 1;
        }
      }
      // シングル変数で年齢をグループする
      const age = {
        years: yearAge,
        months: monthAge,
        days: dateAge,
      };
      return age;
    },
    // 2日間の時間間隔を計算する
    // dateEnd:終了日
    // dateStart：開始日
    //  年/月/日を計算するオブジェクトを返却する:
    calculatorServiceYears(dateEnd, dateStart) {
      const userinput = dateStart;
      const dob = new Date(userinput);
      // ユーザーが日付を入力したら、実行する
      // ユーザーが入力した日付から年月日を抽出する
      const dobYear = dob.getYear();
      const dobMonth = dob.getMonth();
      const dobDate = dob.getDate();
      // システムから現時点の日付を取得する
      const now = new Date(dateEnd);
      // 現時点の日付から年月日を抽出する
      const currentYear = now.getYear();
      const currentMonth = now.getMonth();
      const currentDate = now.getDate();
      // 年月日から年齢を計算する変数を宣言する
      // 年を取得する
      let yearAge = currentYear - dobYear;
      let monthAge;
      // 月を取得する
      if (currentMonth >= dobMonth) {
        monthAge = currentMonth - dobMonth;
      } else {
        yearAge -= 1;
        monthAge = 12 + currentMonth - dobMonth;
      }

      let dateAge;
      // 日を取得する
      if (currentDate >= dobDate) {
        dateAge = currentDate - dobDate;
      } else {
        monthAge -= 1;
        dateAge = 31 + currentDate - dobDate;

        if (monthAge < 0) {
          monthAge = 11;
          yearAge -= 1;
        }
      }
      // シングル変数で年齢をグループする
      const age = {
        years: yearAge,
        months: monthAge,
        days: dateAge,
      };
      return age;
    },
    // メニューごとに権限を表示する
    // menusKey：チェック対象画面一覧
    // 画面一覧に権限がある場合、true
    //            画面一覧に権限がない場合、false
    privilegeMenu(menusKey) {
      // ストアドで保存するユーザー情報を取得する
      const userInfo = store.getters['common/ME'];
      // ユーザー情報がないかチェックする
      if (!userInfo) {
        return false;
      }
      // 画面一覧に操作権限があるかどうかチェックする
      const menus = userInfo.privilege.filter((obj) => menusKey.includes(obj.formID) || obj.formID === 'ALL');
      // 操作権限がある場合、Trueを返却する
      if (menus && menus.length > 0) {
        return true;
      }
      // 操作権限がない場合、falseを返却する
      return false;
    },
    // 画面項目によって、権限を表示する
    // screenName:チェック対象画面
    // item：チェック対象項目
    // 画面一覧に権限がある場合、true
    //            画面一覧に権限がない場合、 false
    privilegeShowItem(screenName, item) {
      // ストアドで保存するユーザー情報を取得する
      const userInfo = store.getters['common/ME'];
      // ユーザー情報がないかチェックする
      if (!userInfo) {
        return false;
      }
      // 画面一覧に操作権限があるかどうかチェックする
      const menus = userInfo.privilege.filter((obj) => obj.formID === screenName || obj.formID === 'ALL');
      // 操作権限がある場合、Trueを返却する
      if (menus && menus.length > 0) {
        // 項目値がALLの場合、全ての項目が表示される
        let items = menus[0].items.filter((obj) => obj.itemid === 'ALL');
        // 項目値がALLの場合、全ての項目が表示される
        if (items && items.length > 0) {
          return true;
        }
        items = menus[0].items.filter((obj) => item.includes(obj.itemid));
        // 項目表示権限がある場合
        if (items && items.length >= item.length) {
          return true;
        }
      }
      // 操作権限がない場合、falseを返却する
      return false;
    },
    // 画面項目によって、権限を表示する
    // screenName:チェック対象画面
    // item：チェック対象項目
    // 画面一覧に権限がある場合、true
    //            画面一覧に権限がない場合、 false
    privilegeDisabledItem(screenName, item) {
      // ストアドで保存するユーザー情報を取得する
      const userInfo = store.getters['common/ME'];
      // ユーザー情報がないかチェックする
      if (!userInfo) {
        return true;
      }
      // 画面一覧に操作権限があるかどうかチェックする
      const menus = userInfo.privilege.filter((obj) => obj.formID === screenName);
      // 操作権限がある場合、Trueを返却する
      if (menus && menus.length > 0) {
        // 項目値がALLの場合をチェックする
        let items = menus[0].items.filter((obj) => obj.itemid === 'ALL');
        // 項目値がALLの場合、項目別のR-W状態をALLで設定する
        if (items && items.length > 0) {
          const readOnly = items.filter((obj) => obj.kind === 'R');
          if (readOnly && readOnly.length > 0) {
            return true;
          }
          const write = items.filter((obj) => obj.kind === 'W');
          if (write && write.length > 0) {
            return false;
          }
        }
        items = menus[0].items.filter((obj) => item.includes(obj.itemid));
        // 項目表示権限がある場合
        if (items && items.length >= item.length) {
          const readOnly = items.filter((obj) => obj.kind === 'R');
          if (readOnly && readOnly.length > 0) {
            return true;
          }
          const write = items.filter((obj) => obj.kind === 'W');
          if (write && write.length > 0) {
            return false;
          }
        }
      }
      // 操作権限がない場合、falseを返却する
      return true;
    },
  },
  computed: {
    // gettersをcomputedに変換する
    ...mapGetters({
      ME: 'common/ME',
      TOKEN: 'common/TOKEN',
    }),
    isFormProcessing() {
      return this.$root.isLoading;
    },
  },
};
