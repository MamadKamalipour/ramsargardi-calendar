import React from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import "./style.scss";
function App() {
  const normalDayPrice = 1500;
  const fridayPrice = 2000;
  const weekDays = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
  ];
  String.prototype.toFaDigit = function () {
    return this.replace(/\d+/g, function (digit) {
      var ret = "";
      for (var i = 0, len = digit.length; i < len; i++) {
        ret += String.fromCharCode(digit.charCodeAt(i) + 1728);
      }
      return ret;
    });
  };
  const bookedDays = ["1401/01/15", "1401/01/20", "1401/01/18", "1401/01/25"];
  const newBookedDays = [];
  bookedDays.map((day) => {
    newBookedDays.push(day.toFaDigit());
  });

  return (
    <Calendar
      className="custom-calendar"
      weekDays={weekDays}
      calendar={persian}
      locale={persian_fa}
      plugins={[weekends()]}
      mapDays={({ date }) => {
        let isWeekend = date.weekDay.index === 6;
        if (newBookedDays.includes(date.format("YYYY/MM/DD")))
          return {
            disabled: true,
            style: { color: "#ccc" },
            onClick: () => alert("این تاریخ رزرو شده است"),
          };

        return {
          children: (
            <div className="custom-day-wrapper">
              <p className="custom-day">{date.format("D")}</p>
              <small className="custom-day-price">
                {isWeekend ? fridayPrice.toLocaleString() : normalDayPrice.toLocaleString()}
              </small>
            </div>
          ),
        };
      }}
      hideYear
      disableYearPicker
    />
  );
}

export default App;
