import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import moment from "moment";

i18n
  .use(Backend)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    fallbackLng: "en", // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    debug: true,
    interpolation: {
      escapeValue: false,
      format: function (value, format, lng) {
        if (value instanceof Date) return moment(value).format(format);
        if (format === "timeDiff") {
          if (value.timeType === "today" && lng === "cn") return `今天`;
          if (value.timeType === "today" && lng === "vi") return `hôm nay`;
          if (value.timeType === "days" || value.timeType === "day") {
            if (lng === "cn") return `${value.number} 天前`;
            if (lng === "vi") return `${value.number} ngày trước`;
          }
          if (value.timeType === "months" || value.timeType === "month") {
            if (lng === "cn") return `${value.number} 月前`;
            if (lng === "vi") return `${value.number} tháng trước`;
          }
          if (value.timeType === "years" || value.timeType === "year") {
            if (lng === "cn") return `${value.number} 年前`;

            if (lng === "vi") return `${value.number} năm trước`;
          }
          return `${value.number} ${value.timeType} ago`;
        }
        if (value === "close") {
          if (lng === "cn") return "关闭";
          if (lng === "vi") return "Đã đóng";
        }
        if (value === "open") {
          if (lng === "cn") return "打开中";
          if (lng === "vi") return "Đang mở";
        }
        return value;
      },
    },
  });

export default i18n;
