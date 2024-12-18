import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getForecast, getGeoInfo } from "../../api";
import styles from "./HourlyTemperature.module.css";

export function HourlyTemperature({ cityName }) {
  const [geoInfo, setGeoInfo] = useState(null);
  const [data, setData] = useState(null);
  // const [geoInfo, setGeoInfo] = useState({
  //   name: "Tenali",
  //   local_names: {
  //     pa: "ਤੇਨਾਲੀ",
  //     te: "తెనాలి",
  //     mr: "तेनाली",
  //     ja: "テーナーリー",
  //     en: "Tenali",
  //     ta: "தெனாலி",
  //     kn: "ತೆನಾಲಿ",
  //     hi: "तेनाली",
  //     ml: "തെനാലി",
  //   },
  //   lat: 16.2377735,
  //   lon: 80.6464219,
  //   country: "IN",
  //   state: "Andhra Pradesh",
  // });
  // const [data, setData] = useState({
  //   cod: "200",
  //   message: 0,
  //   cnt: 40,
  //   list: [
  //     {
  //       dt: 1734490800,
  //       main: {
  //         temp: 23.26,
  //         feels_like: 23.99,
  //         temp_min: 23.26,
  //         temp_max: 24.11,
  //         pressure: 1013,
  //         sea_level: 1013,
  //         grnd_level: 1011,
  //         humidity: 90,
  //         temp_kf: -0.85,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04d",
  //         },
  //       ],
  //       clouds: {
  //         all: 95,
  //       },
  //       wind: {
  //         speed: 2.77,
  //         deg: 338,
  //         gust: 4.47,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-18 03:00:00",
  //     },
  //     {
  //       dt: 1734501600,
  //       main: {
  //         temp: 24.48,
  //         feels_like: 24.94,
  //         temp_min: 24.48,
  //         temp_max: 26.92,
  //         pressure: 1012,
  //         sea_level: 1012,
  //         grnd_level: 1010,
  //         humidity: 75,
  //         temp_kf: -2.44,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04d",
  //         },
  //       ],
  //       clouds: {
  //         all: 95,
  //       },
  //       wind: {
  //         speed: 3.79,
  //         deg: 344,
  //         gust: 5.22,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-18 06:00:00",
  //     },
  //     {
  //       dt: 1734512400,
  //       main: {
  //         temp: 27.75,
  //         feels_like: 28.89,
  //         temp_min: 27.75,
  //         temp_max: 29.99,
  //         pressure: 1010,
  //         sea_level: 1010,
  //         grnd_level: 1006,
  //         humidity: 58,
  //         temp_kf: -2.24,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04d",
  //         },
  //       ],
  //       clouds: {
  //         all: 94,
  //       },
  //       wind: {
  //         speed: 3.43,
  //         deg: 351,
  //         gust: 4.95,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-18 09:00:00",
  //     },
  //     {
  //       dt: 1734523200,
  //       main: {
  //         temp: 26.88,
  //         feels_like: 27.8,
  //         temp_min: 26.88,
  //         temp_max: 26.88,
  //         pressure: 1009,
  //         sea_level: 1009,
  //         grnd_level: 1007,
  //         humidity: 58,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04d",
  //         },
  //       ],
  //       clouds: {
  //         all: 94,
  //       },
  //       wind: {
  //         speed: 1.9,
  //         deg: 66,
  //         gust: 5.01,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-18 12:00:00",
  //     },
  //     {
  //       dt: 1734534000,
  //       main: {
  //         temp: 24.51,
  //         feels_like: 25.37,
  //         temp_min: 24.51,
  //         temp_max: 24.51,
  //         pressure: 1011,
  //         sea_level: 1011,
  //         grnd_level: 1009,
  //         humidity: 90,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 1.46,
  //         deg: 111,
  //         gust: 2.85,
  //       },
  //       visibility: 10000,
  //       pop: 0.22,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-18 15:00:00",
  //     },
  //     {
  //       dt: 1734544800,
  //       main: {
  //         temp: 24.19,
  //         feels_like: 24.88,
  //         temp_min: 24.19,
  //         temp_max: 24.19,
  //         pressure: 1011,
  //         sea_level: 1011,
  //         grnd_level: 1009,
  //         humidity: 85,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 2.53,
  //         deg: 37,
  //         gust: 6.75,
  //       },
  //       visibility: 10000,
  //       pop: 0.16,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-18 18:00:00",
  //     },
  //     {
  //       dt: 1734555600,
  //       main: {
  //         temp: 23.76,
  //         feels_like: 24.41,
  //         temp_min: 23.76,
  //         temp_max: 23.76,
  //         pressure: 1009,
  //         sea_level: 1009,
  //         grnd_level: 1007,
  //         humidity: 85,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 3.14,
  //         deg: 37,
  //         gust: 8.51,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-18 21:00:00",
  //     },
  //     {
  //       dt: 1734566400,
  //       main: {
  //         temp: 23.44,
  //         feels_like: 23.93,
  //         temp_min: 23.44,
  //         temp_max: 23.44,
  //         pressure: 1009,
  //         sea_level: 1009,
  //         grnd_level: 1008,
  //         humidity: 80,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 3.07,
  //         deg: 25,
  //         gust: 7.96,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-19 00:00:00",
  //     },
  //     {
  //       dt: 1734577200,
  //       main: {
  //         temp: 24.4,
  //         feels_like: 24.93,
  //         temp_min: 24.4,
  //         temp_max: 24.4,
  //         pressure: 1012,
  //         sea_level: 1012,
  //         grnd_level: 1010,
  //         humidity: 78,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04d",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 3.51,
  //         deg: 21,
  //         gust: 9.76,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-19 03:00:00",
  //     },
  //     {
  //       dt: 1734588000,
  //       main: {
  //         temp: 24.02,
  //         feels_like: 24.75,
  //         temp_min: 24.02,
  //         temp_max: 24.02,
  //         pressure: 1011,
  //         sea_level: 1011,
  //         grnd_level: 1009,
  //         humidity: 87,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 500,
  //           main: "Rain",
  //           description: "light rain",
  //           icon: "10d",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 3.81,
  //         deg: 39,
  //         gust: 8.63,
  //       },
  //       visibility: 10000,
  //       pop: 0.88,
  //       rain: {
  //         "3h": 1,
  //       },
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-19 06:00:00",
  //     },
  //     {
  //       dt: 1734598800,
  //       main: {
  //         temp: 24.14,
  //         feels_like: 24.83,
  //         temp_min: 24.14,
  //         temp_max: 24.14,
  //         pressure: 1007,
  //         sea_level: 1007,
  //         grnd_level: 1006,
  //         humidity: 85,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 500,
  //           main: "Rain",
  //           description: "light rain",
  //           icon: "10d",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 3.7,
  //         deg: 49,
  //         gust: 7.28,
  //       },
  //       visibility: 10000,
  //       pop: 0.36,
  //       rain: {
  //         "3h": 0.21,
  //       },
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-19 09:00:00",
  //     },
  //     {
  //       dt: 1734609600,
  //       main: {
  //         temp: 24.26,
  //         feels_like: 24.96,
  //         temp_min: 24.26,
  //         temp_max: 24.26,
  //         pressure: 1008,
  //         sea_level: 1008,
  //         grnd_level: 1007,
  //         humidity: 85,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04d",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 2.39,
  //         deg: 59,
  //         gust: 4.68,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-19 12:00:00",
  //     },
  //     {
  //       dt: 1734620400,
  //       main: {
  //         temp: 24.2,
  //         feels_like: 24.84,
  //         temp_min: 24.2,
  //         temp_max: 24.2,
  //         pressure: 1010,
  //         sea_level: 1010,
  //         grnd_level: 1009,
  //         humidity: 83,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 2.38,
  //         deg: 53,
  //         gust: 9.44,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-19 15:00:00",
  //     },
  //     {
  //       dt: 1734631200,
  //       main: {
  //         temp: 23.09,
  //         feels_like: 23.62,
  //         temp_min: 23.09,
  //         temp_max: 23.09,
  //         pressure: 1010,
  //         sea_level: 1010,
  //         grnd_level: 1008,
  //         humidity: 83,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 97,
  //       },
  //       wind: {
  //         speed: 2.44,
  //         deg: 42,
  //         gust: 9.11,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-19 18:00:00",
  //     },
  //     {
  //       dt: 1734642000,
  //       main: {
  //         temp: 22.07,
  //         feels_like: 22.5,
  //         temp_min: 22.07,
  //         temp_max: 22.07,
  //         pressure: 1008,
  //         sea_level: 1008,
  //         grnd_level: 1006,
  //         humidity: 83,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 2.41,
  //         deg: 45,
  //         gust: 6.89,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-19 21:00:00",
  //     },
  //     {
  //       dt: 1734652800,
  //       main: {
  //         temp: 22.86,
  //         feels_like: 23.29,
  //         temp_min: 22.86,
  //         temp_max: 22.86,
  //         pressure: 1008,
  //         sea_level: 1008,
  //         grnd_level: 1007,
  //         humidity: 80,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 2.76,
  //         deg: 4,
  //         gust: 6.99,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-20 00:00:00",
  //     },
  //     {
  //       dt: 1734663600,
  //       main: {
  //         temp: 24.69,
  //         feels_like: 25.23,
  //         temp_min: 24.69,
  //         temp_max: 24.69,
  //         pressure: 1011,
  //         sea_level: 1011,
  //         grnd_level: 1009,
  //         humidity: 77,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04d",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 2.52,
  //         deg: 337,
  //         gust: 5.2,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-20 03:00:00",
  //     },
  //     {
  //       dt: 1734674400,
  //       main: {
  //         temp: 25.45,
  //         feels_like: 25.85,
  //         temp_min: 25.45,
  //         temp_max: 25.45,
  //         pressure: 1010,
  //         sea_level: 1010,
  //         grnd_level: 1008,
  //         humidity: 69,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04d",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 2.08,
  //         deg: 328,
  //         gust: 4.43,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-20 06:00:00",
  //     },
  //     {
  //       dt: 1734685200,
  //       main: {
  //         temp: 28.72,
  //         feels_like: 30.16,
  //         temp_min: 28.72,
  //         temp_max: 28.72,
  //         pressure: 1006,
  //         sea_level: 1006,
  //         grnd_level: 1005,
  //         humidity: 57,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04d",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 2,
  //         deg: 348,
  //         gust: 3.7,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-20 09:00:00",
  //     },
  //     {
  //       dt: 1734696000,
  //       main: {
  //         temp: 26.27,
  //         feels_like: 26.27,
  //         temp_min: 26.27,
  //         temp_max: 26.27,
  //         pressure: 1006,
  //         sea_level: 1006,
  //         grnd_level: 1005,
  //         humidity: 71,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04d",
  //         },
  //       ],
  //       clouds: {
  //         all: 100,
  //       },
  //       wind: {
  //         speed: 2.9,
  //         deg: 89,
  //         gust: 3.74,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-20 12:00:00",
  //     },
  //     {
  //       dt: 1734706800,
  //       main: {
  //         temp: 24.11,
  //         feels_like: 24.72,
  //         temp_min: 24.11,
  //         temp_max: 24.11,
  //         pressure: 1009,
  //         sea_level: 1009,
  //         grnd_level: 1008,
  //         humidity: 82,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 803,
  //           main: "Clouds",
  //           description: "broken clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 65,
  //       },
  //       wind: {
  //         speed: 2.43,
  //         deg: 94,
  //         gust: 3.96,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-20 15:00:00",
  //     },
  //     {
  //       dt: 1734717600,
  //       main: {
  //         temp: 22.6,
  //         feels_like: 23.24,
  //         temp_min: 22.6,
  //         temp_max: 22.6,
  //         pressure: 1008,
  //         sea_level: 1008,
  //         grnd_level: 1007,
  //         humidity: 89,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 803,
  //           main: "Clouds",
  //           description: "broken clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 80,
  //       },
  //       wind: {
  //         speed: 1.64,
  //         deg: 90,
  //         gust: 1.67,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-20 18:00:00",
  //     },
  //     {
  //       dt: 1734728400,
  //       main: {
  //         temp: 21.76,
  //         feels_like: 22.45,
  //         temp_min: 21.76,
  //         temp_max: 21.76,
  //         pressure: 1008,
  //         sea_level: 1008,
  //         grnd_level: 1006,
  //         humidity: 94,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 91,
  //       },
  //       wind: {
  //         speed: 1.15,
  //         deg: 77,
  //         gust: 1.22,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-20 21:00:00",
  //     },
  //     {
  //       dt: 1734739200,
  //       main: {
  //         temp: 21.71,
  //         feels_like: 22.36,
  //         temp_min: 21.71,
  //         temp_max: 21.71,
  //         pressure: 1008,
  //         sea_level: 1008,
  //         grnd_level: 1006,
  //         humidity: 93,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 91,
  //       },
  //       wind: {
  //         speed: 1.36,
  //         deg: 267,
  //         gust: 1.41,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-21 00:00:00",
  //     },
  //     {
  //       dt: 1734750000,
  //       main: {
  //         temp: 25.38,
  //         feels_like: 25.96,
  //         temp_min: 25.38,
  //         temp_max: 25.38,
  //         pressure: 1010,
  //         sea_level: 1010,
  //         grnd_level: 1009,
  //         humidity: 76,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04d",
  //         },
  //       ],
  //       clouds: {
  //         all: 85,
  //       },
  //       wind: {
  //         speed: 2.6,
  //         deg: 288,
  //         gust: 3.33,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-21 03:00:00",
  //     },
  //     {
  //       dt: 1734760800,
  //       main: {
  //         temp: 30.73,
  //         feels_like: 31.99,
  //         temp_min: 30.73,
  //         temp_max: 30.73,
  //         pressure: 1009,
  //         sea_level: 1009,
  //         grnd_level: 1007,
  //         humidity: 49,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 803,
  //           main: "Clouds",
  //           description: "broken clouds",
  //           icon: "04d",
  //         },
  //       ],
  //       clouds: {
  //         all: 82,
  //       },
  //       wind: {
  //         speed: 4.07,
  //         deg: 316,
  //         gust: 4.99,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-21 06:00:00",
  //     },
  //     {
  //       dt: 1734771600,
  //       main: {
  //         temp: 32.92,
  //         feels_like: 32.52,
  //         temp_min: 32.92,
  //         temp_max: 32.92,
  //         pressure: 1006,
  //         sea_level: 1006,
  //         grnd_level: 1004,
  //         humidity: 34,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 803,
  //           main: "Clouds",
  //           description: "broken clouds",
  //           icon: "04d",
  //         },
  //       ],
  //       clouds: {
  //         all: 57,
  //       },
  //       wind: {
  //         speed: 4.52,
  //         deg: 315,
  //         gust: 5.43,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-21 09:00:00",
  //     },
  //     {
  //       dt: 1734782400,
  //       main: {
  //         temp: 27.81,
  //         feels_like: 27.92,
  //         temp_min: 27.81,
  //         temp_max: 27.81,
  //         pressure: 1006,
  //         sea_level: 1006,
  //         grnd_level: 1005,
  //         humidity: 46,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 802,
  //           main: "Clouds",
  //           description: "scattered clouds",
  //           icon: "03d",
  //         },
  //       ],
  //       clouds: {
  //         all: 41,
  //       },
  //       wind: {
  //         speed: 2.93,
  //         deg: 306,
  //         gust: 2.92,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-21 12:00:00",
  //     },
  //     {
  //       dt: 1734793200,
  //       main: {
  //         temp: 24.95,
  //         feels_like: 24.52,
  //         temp_min: 24.95,
  //         temp_max: 24.95,
  //         pressure: 1009,
  //         sea_level: 1009,
  //         grnd_level: 1007,
  //         humidity: 39,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 801,
  //           main: "Clouds",
  //           description: "few clouds",
  //           icon: "02n",
  //         },
  //       ],
  //       clouds: {
  //         all: 22,
  //       },
  //       wind: {
  //         speed: 3.19,
  //         deg: 335,
  //         gust: 3.91,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-21 15:00:00",
  //     },
  //     {
  //       dt: 1734804000,
  //       main: {
  //         temp: 22.47,
  //         feels_like: 21.97,
  //         temp_min: 22.47,
  //         temp_max: 22.47,
  //         pressure: 1009,
  //         sea_level: 1009,
  //         grnd_level: 1008,
  //         humidity: 46,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 802,
  //           main: "Clouds",
  //           description: "scattered clouds",
  //           icon: "03n",
  //         },
  //       ],
  //       clouds: {
  //         all: 27,
  //       },
  //       wind: {
  //         speed: 2.66,
  //         deg: 35,
  //         gust: 4.45,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-21 18:00:00",
  //     },
  //     {
  //       dt: 1734814800,
  //       main: {
  //         temp: 21.58,
  //         feels_like: 22.14,
  //         temp_min: 21.58,
  //         temp_max: 21.58,
  //         pressure: 1009,
  //         sea_level: 1009,
  //         grnd_level: 1007,
  //         humidity: 90,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 86,
  //       },
  //       wind: {
  //         speed: 2.34,
  //         deg: 28,
  //         gust: 2.77,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-21 21:00:00",
  //     },
  //     {
  //       dt: 1734825600,
  //       main: {
  //         temp: 21.07,
  //         feels_like: 21.71,
  //         temp_min: 21.07,
  //         temp_max: 21.07,
  //         pressure: 1010,
  //         sea_level: 1010,
  //         grnd_level: 1008,
  //         humidity: 95,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 803,
  //           main: "Clouds",
  //           description: "broken clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 73,
  //       },
  //       wind: {
  //         speed: 1.74,
  //         deg: 27,
  //         gust: 1.94,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-22 00:00:00",
  //     },
  //     {
  //       dt: 1734836400,
  //       main: {
  //         temp: 24.64,
  //         feels_like: 25.35,
  //         temp_min: 24.64,
  //         temp_max: 24.64,
  //         pressure: 1012,
  //         sea_level: 1012,
  //         grnd_level: 1011,
  //         humidity: 84,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 803,
  //           main: "Clouds",
  //           description: "broken clouds",
  //           icon: "04d",
  //         },
  //       ],
  //       clouds: {
  //         all: 56,
  //       },
  //       wind: {
  //         speed: 2.53,
  //         deg: 43,
  //         gust: 3.46,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-22 03:00:00",
  //     },
  //     {
  //       dt: 1734847200,
  //       main: {
  //         temp: 30.22,
  //         feels_like: 31.55,
  //         temp_min: 30.22,
  //         temp_max: 30.22,
  //         pressure: 1011,
  //         sea_level: 1011,
  //         grnd_level: 1010,
  //         humidity: 51,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 802,
  //           main: "Clouds",
  //           description: "scattered clouds",
  //           icon: "03d",
  //         },
  //       ],
  //       clouds: {
  //         all: 49,
  //       },
  //       wind: {
  //         speed: 1.93,
  //         deg: 87,
  //         gust: 1.38,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-22 06:00:00",
  //     },
  //     {
  //       dt: 1734858000,
  //       main: {
  //         temp: 32.32,
  //         feels_like: 32.04,
  //         temp_min: 32.32,
  //         temp_max: 32.32,
  //         pressure: 1008,
  //         sea_level: 1008,
  //         grnd_level: 1006,
  //         humidity: 36,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 800,
  //           main: "Clear",
  //           description: "clear sky",
  //           icon: "01d",
  //         },
  //       ],
  //       clouds: {
  //         all: 0,
  //       },
  //       wind: {
  //         speed: 0.65,
  //         deg: 291,
  //         gust: 1.94,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-22 09:00:00",
  //     },
  //     {
  //       dt: 1734868800,
  //       main: {
  //         temp: 26.27,
  //         feels_like: 26.27,
  //         temp_min: 26.27,
  //         temp_max: 26.27,
  //         pressure: 1009,
  //         sea_level: 1009,
  //         grnd_level: 1008,
  //         humidity: 71,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 800,
  //           main: "Clear",
  //           description: "clear sky",
  //           icon: "01d",
  //         },
  //       ],
  //       clouds: {
  //         all: 3,
  //       },
  //       wind: {
  //         speed: 3.71,
  //         deg: 164,
  //         gust: 6.16,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "d",
  //       },
  //       dt_txt: "2024-12-22 12:00:00",
  //     },
  //     {
  //       dt: 1734879600,
  //       main: {
  //         temp: 22.87,
  //         feels_like: 23.51,
  //         temp_min: 22.87,
  //         temp_max: 22.87,
  //         pressure: 1012,
  //         sea_level: 1012,
  //         grnd_level: 1010,
  //         humidity: 88,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 500,
  //           main: "Rain",
  //           description: "light rain",
  //           icon: "10n",
  //         },
  //       ],
  //       clouds: {
  //         all: 13,
  //       },
  //       wind: {
  //         speed: 2.58,
  //         deg: 150,
  //         gust: 4.58,
  //       },
  //       visibility: 10000,
  //       pop: 0.2,
  //       rain: {
  //         "3h": 0.15,
  //       },
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-22 15:00:00",
  //     },
  //     {
  //       dt: 1734890400,
  //       main: {
  //         temp: 22.11,
  //         feels_like: 22.75,
  //         temp_min: 22.11,
  //         temp_max: 22.11,
  //         pressure: 1012,
  //         sea_level: 1012,
  //         grnd_level: 1010,
  //         humidity: 91,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 803,
  //           main: "Clouds",
  //           description: "broken clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 57,
  //       },
  //       wind: {
  //         speed: 1.87,
  //         deg: 112,
  //         gust: 1.93,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-22 18:00:00",
  //     },
  //     {
  //       dt: 1734901200,
  //       main: {
  //         temp: 21.71,
  //         feels_like: 22.34,
  //         temp_min: 21.71,
  //         temp_max: 21.71,
  //         pressure: 1011,
  //         sea_level: 1011,
  //         grnd_level: 1009,
  //         humidity: 92,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 804,
  //           main: "Clouds",
  //           description: "overcast clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 99,
  //       },
  //       wind: {
  //         speed: 2.21,
  //         deg: 93,
  //         gust: 2.5,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-22 21:00:00",
  //     },
  //     {
  //       dt: 1734912000,
  //       main: {
  //         temp: 21.13,
  //         feels_like: 21.62,
  //         temp_min: 21.13,
  //         temp_max: 21.13,
  //         pressure: 1012,
  //         sea_level: 1012,
  //         grnd_level: 1010,
  //         humidity: 89,
  //         temp_kf: 0,
  //       },
  //       weather: [
  //         {
  //           id: 803,
  //           main: "Clouds",
  //           description: "broken clouds",
  //           icon: "04n",
  //         },
  //       ],
  //       clouds: {
  //         all: 78,
  //       },
  //       wind: {
  //         speed: 2.37,
  //         deg: 78,
  //         gust: 2.5,
  //       },
  //       visibility: 10000,
  //       pop: 0,
  //       sys: {
  //         pod: "n",
  //       },
  //       dt_txt: "2024-12-23 00:00:00",
  //     },
  //   ],
  //   city: {
  //     id: 1254757,
  //     name: "Thenali",
  //     coord: {
  //       lat: 16.2378,
  //       lon: 80.6464,
  //     },
  //     country: "IN",
  //     population: 0,
  //     timezone: 19800,
  //     sunrise: 1734483555,
  //     sunset: 1734523736,
  //   },
  // });

  const [isLoading, setIsLoading] = useState(false);

  async function fetchForecast() {
    try {
      setIsLoading(true);
      const data = await getGeoInfo(cityName);
      const forecast = await getForecast(data[0].lat, data[0].lon);
      setGeoInfo(data[0]);
      setData(forecast);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchForecast();
  }, []);

  if (!geoInfo || !data || isLoading) return <div>Loading...</div>;

  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <div className={styles.container}>
      <div>
        <h1 style={{ fontSize: "1.5rem", color: "var(--primary-color)" }}>
          Today's Temperature
        </h1>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <div style={{ height: "200px", width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div
                        style={{
                          borderRadius: "10px",
                          border: "1px solid #ccc",
                          padding: "10px",
                          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                fontSize: "0.70rem",
                                textTransform: "uppercase",
                                color: "#888888",
                              }}
                            >
                              Temperature
                            </span>
                            <span style={{ fontWeight: "bold" }}>
                              {payload[0].value}°
                            </span>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                fontSize: "0.70rem",
                                textTransform: "uppercase",
                                color: "#888888",
                              }}
                            >
                              Feels Like
                            </span>
                            <span style={{ fontWeight: "bold" }}>
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
