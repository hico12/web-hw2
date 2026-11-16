

let sumA = 0;          
let maxA = 0;          
let highA = 0;         

let cnt2020A = 0;
let cnt2010A = 0;
let cnt2000A = 0;
let cntOldA = 0;

let bigA = "";         

for (let i = 0; i < titles.length; i++) {
  sumA += ratings[i];

  if (ratings[i] > ratings[maxA]) {
    maxA = i;
  }

  if (ratings[i] >= 8.0) {
    highA++;
  }

  const decade = years[i] - (years[i] % 10);
  switch (decade) {
    case 2020:
      cnt2020A++;
      break;
    case 2010:
      cnt2010A++;
      break;
    case 2000:
      cnt2000A++;
      break;
    default:
      cntOldA++;
      break;
  }

  if (audiences[i] >= 1000000) {
    if (bigA === "") {
      bigA = titles[i];
    } else {
      bigA += ", " + titles[i];
    }
  }
}

const avgA = sumA / ratings.length;

console.log(`A1. 평균 평점: ${avgA.toFixed(1)}점`);
console.log(`A2. 최고 평점: ${titles[maxA]} (${ratings[maxA]}점)`);
console.log(`A3. 평점 8.0 이상: ${highA}편`);
console.log(`A4. 연도대별: 2020s ${cnt2020A}편, 2010s ${cnt2010A}편, 2000s ${cntOldA}편, 그 이전 ${cntOldA}편`);
console.log(`A5. 관객 100만 이상: ${bigA === "" ? "없음" : bigA}`);


function average(list) {
  if (list.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i].rating;
  }
  return sum / list.length;
}

function best(list) {
  if (list.length === 0) return null;
  let top = list[0]; 
  for (let i = 1; i < list.length; i++) {
    if (list[i].rating > top.rating) {
      top = list[i];
    }
  }
  return top;
}

function filterByRating(list, min) {
  return list.filter(movie => movie.rating >= min);
}

function formatNumber(n) {
  return Number(n).toLocaleString("ko-KR");
}

function yearsSince(dateStr) {
  return new Date().getFullYear() - new Date(dateStr).getFullYear();
}

function sortBy(list, key, desc) {
  return [...list].sort((a, b) => {
    let diff = 0;
    if (typeof a[key] === "string") {
      diff = a[key].localeCompare(b[key]);
    } else {
      diff = a[key] - b[key];
    }
    return diff * (desc ? -1 : 1);
  });
}

function search(list, keyword) {
  const kw = keyword.trim().toLowerCase();
  return list.filter(movie => movie.title.toLowerCase().includes(kw));
}

console.log("B1. 평균 평점:", average(movies).toFixed(1));
console.log("B2. 최고 평점 영화:", best(movies));
console.log("B3. 평점 8.0 이상:", filterByRating(movies, 8.0));
console.log("B4. 평점 내림차순 정렬:", sortBy(movies, "rating", true));
console.log("B5. '어벤져스' 검색 결과:", search(movies, "어벤져스"));
console.log("B6. 숫자 포맷(1번 관객수):", formatNumber(movies[0].audience));
console.log("B7. 경과 연수(1번 영화):", yearsSince(movies[0].releaseDate) + "년");


function getList(data) {
  return data.results || [];
}

function averageBy(list, key) {
  if (list.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i][key];
  }
  return sum / list.length;
}

const tmdbMovies = getList(TMDB);
const avgVote = averageBy(tmdbMovies, "vote_average");
const top5 = sortBy(tmdbMovies, "vote_average", true).slice(0, 5);


console.log(`C1 page ${TMDB.page}, total_pages ${TMDB.total_pages}, total_results ${TMDB.total_results}, 이번 응답 ${tmdbMovies.length}편`);
console.log(`C2 상영작 평균 평점: ${avgVote.toFixed(1)}`);

const found = search(tmdbMovies, "the");
console.log(`C4 'the' 검색: ${found.length}편`);


console.table(top5, ["title", "release_date", "vote_average"]);

const topMovie = best(movies);
const mostWatched = sortBy(movies, "audience", true)[0]; 

document.getElementById("out").textContent =
  `전체 ${movies.length}편, 평균 평점 ${average(movies).toFixed(1)}점\n` +
  `최고 평점 ${topMovie.title} (${topMovie.rating}점, 개봉한 지 ${yearsSince(topMovie.releaseDate)}년)\n` +
  `관객 1위 ${mostWatched.title} (누적 ${formatNumber(mostWatched.audience)}명)`;

  
  