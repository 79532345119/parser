const fs = require("fs");
let total = 0

const fetchData = async (x = 0, y = 0, z = 0) => {
  console.log(x, y, z);
  const response = await fetch(
// кварталы    
`https://maps.kosmosnimki.ru/TileSender.ashx?WrapStyle=None&key=Cd0juhhxtAZS60jAnID0UGhIYzdqLPTVlcO2%2B3WQXJkQuCKE9Q9guoLlM%2BjpnxIG1QlNSMIjfXKElb7%2BJqpHHj40NPdsoPKErWnBy9VHKUQ%3D&ModeKey=tile&ftc=osm&r=j&LayerName=F9FB7F3485724E6F93C0831348D541EF&z=${z}&x=${x}&y=${y}&v=0&srs=3857&sw=1`

// лесничества `https://maps.kosmosnimki.ru/TileSender.ashx?WrapStyle=None&key=Cd0juhhxtAZS60jAnID0UGhIYzdqLPTVlcO2%2B3WQXJkQuCKE9Q9guoLlM%2BjpnxIG1QlNSMIjfXKElb7%2BJqpHHldfastW4QywjTeKntEVqnk%3D&ModeKey=tile&ftc=osm&r=j&LayerName=51E8AAF199A84F1F80AC404A21FFAD83&z=${z}&x=${x}&y=${y}&v=0&srs=3857&sw=1`

// участковые лесничества `https://maps.kosmosnimki.ru/TileSender.ashx?WrapStyle=None&key=Cd0juhhxtAZS60jAnID0UGhIYzdqLPTVlcO2%2B3WQXJkQuCKE9Q9guoLlM%2BjpnxIG1QlNSMIjfXKElb7%2BJqpHHldfastW4QywjTeKntEVqnk%3D&ModeKey=tile&ftc=osm&r=j&LayerName=96B49CCBCB834716A7383D953E335F53&z=${z}&x=${x}&y=${y}&v=0&srs=3857&sw=1`

  );
  if (response.status === 200) {
    const text = await response.text();
    const result = text.slice(27, -1);
    console.log(JSON.parse(result).isGeneralized)
    if(JSON.parse(result).isGeneralized) {
      return;
    };
    const json = JSON.stringify(result);
    const filename = `x=${x}y=${y}z=${z}.json`;
    fs.writeFile(filename, json, (err) => {
      if (err) throw err;
      console.log("Data written to file", filename);
      total++
    });
  } else {
    console.log(response.status);
  }
};



const run = () => {
/*   const minX = 149
  const maxX = 156;
  const minY = 75;
  const maxY = 90;
  const z = 8; */


/*   const minX = 300
  const maxX = 310;
  const minY = 150;
  const maxY = 160;
  const z = 9;
 */

/*   const minX = 74
  const maxX = 75;
  const minY = 38;
  const maxY = 39;
  const z = 7;
 */

/*   const minX = 600
  const maxX = 603;
  const minY = 314;
  const maxY = 315;
  const z = 10; */


/*   const minX = 8
  const maxX = 10;
  const minY = 3;
  const maxY = 6;
  const z = 4;
 */

  const minX = 36
  const maxX = 39;
  const minY = 16;
  const maxY = 20;
  const z = 6;


/* const minX = 70
const maxX = 80;
const minY = 34;
const maxY = 42;
const z = 7; */

  let x = minX;
  let y = minY;

  const interval = setInterval(() => {
    fetchData(x, y, z);
    if (x <= maxX) {
      x++;
    } else {
      x = minX;
      y++;
    }
    if (y === maxY) {
      console.log("completed", total);
      clearInterval(interval);
    }
  }, 100);
};

run();
