import * as moment from "moment";
export default function updateMomentLocate() {

    moment.locale('az', {
        months : 'Yanvar_Fevral_Mart_Aprel_May_İyun_İyul_Avqust_Sentyabr_Oktyabr_Noyabr_Dekabr'.split('_'),
        monthsShort : 'Yan._Fev._Mar_Apre._May_İyn_İyl._Avq._Sen._Okt._Noy._Dek.'.split('_'),
        monthsParseExact : true,
        weekdays : 'Bazar ertədi_çərşənbə axşamı_çərşənbə_cuma axşamı_cuma_şənbə_bazar'.split('_'),
        weekdaysShort : 'B.E._Ç.A._Ç._C.A._C._Ş._B.'.split('_'),
        weekdaysMin : 'B.E._Ç.A._Ç._C.A._C._Ş._B.'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Bu gün] LT',
            nextDay : '[Sabah] LT',
            nextWeek : 'dddd [həftə] LT',
            lastDay : '[Dünən] LT',
            lastWeek : 'dddd [həftə] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dans %s',
            past : 'il y a %s',
            s : 'quelques secondes',
            m : 'une minute',
            mm : '%d minutes',
            h : 'une heure',
            hh : '%d heures',
            d : 'un jour',
            dd : '%d jours',
            M : 'un mois',
            MM : '%d mois',
            y : 'un an',
            yy : '%d ans'
        },
        dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
        ordinal : function (number) {
            return number + (number === 1 ? 'er' : 'e');
        },
        meridiemParse : /PD|MD/,
        isPM : function (input) {
            return input.charAt(0) === 'M';
        },
        // In case the meridiem units are not separated around 12, then implement
        // this function (look at locale/id.js for an example).
        // meridiemHour : function (hour, meridiem) {
        //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
        // },
        meridiem : function (hours, minutes, isLower) {
            return hours < 12 ? 'PD' : 'MD';
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // Used to determine first week of the year.
        }
    });
}
