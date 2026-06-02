const cf = [
0,3,8,15,24,35,48,63,80,99,
120,143,168,195,224,255,288,323,360,399,
440,483,528,575,624,684,746,810,876,944,
1014,1086,1160,1236,1314,1394,1476,1560,1646,1734,
1824,1916,2010,2106,2204,2304,2406,2510,2616,2724,
2844,2968,3096,3228,3364,3504,3648,3796,3948,4104,
4264,4428,4596,4768,4944,5124,5308,5496,5688,5884,
6124,6372,6628,6892,7164,7444,7732,8028,8332,8644,
8964,9292,9628,9972,10324,10804,11300,11812,12340,12884,
13444,14020,14612,15220,15844,16484,17140,17812,18500,19204,
20484,21796,23140,24516,25924,27364,28836,30340,31876,33444,
35044,36676,38340,40036,41764,43524,45316,47140,48996,50884,
52804,54756,56740,58756,60804,62884,64996,67140,69316,71524
];

function get(id){
  return parseInt(document.getElementById(id).value || 0);
}

function calc(){

  const lvl = get("level");

  const inventory = {
    white: get("white"),
    green: get("green"),
    blue: get("blue"),
    violet: get("violet"),
    orange: get("orange"),
    red: get("red")
  };

  const segments = [
    { name:"white", start:1, end:25, value:1 },
    { name:"green", start:25, end:50, value:2 },
    { name:"blue", start:50, end:70, value:4 },
    { name:"violet", start:70, end:85, value:8 },
    { name:"orange", start:85, end:100, value:16 },
    { name:"red", start:100, end:130, value:32 }
  ];

  const CF_100 = 19204;
  const CF_130 = 71524;

  const ORANGE_CHEST = 80;
  const RED_CHEST = 160;

  let result = "";
  let totalOrange = 0;
  let totalRed = 0;

  segments.forEach(seg => {

    if (lvl > seg.end) return;

    const startLevel = Math.max(lvl, seg.start);

    const startCF = cf[startLevel - 1 < 0 ? 0 : startLevel - 1];
    const endCF = cf[seg.end - 1]; 

    const costCF = endCF - startCF;
    //   cf[seg.end - 1] - cf[startLevel - 1 < 0 ? 0 : startLevel - 1];

    const inv = inventory[seg.name];

    const remainingCF = Math.max(costCF - inv * seg.value, 0);
    
    const artifacts = Math.ceil(remainingCF / seg.value);
    let chests = Math.ceil(remainingCF / (seg.value * 5));

    switch (seg.name) {
      case "violet":
        chests = Math.ceil(artifacts /(80/seg.value));
        break;
      case "blue":
        chests = Math.ceil(artifacts / (80/seg.value));
        break;
      case "green":
        chests = Math.ceil(artifacts / (80/seg.value));
        break;
      case "white":
        chests = Math.ceil(artifacts / (80/seg.value));
        break;
    }

    if (seg.name === "red") {
      totalRed += chests;
    } else {
      totalOrange += chests;
    }
//     start cf: ${startCF}
//     end cf: ${endCF}
//     cost cf : ${costCF}
//   Remaining CF: ${remainingCF}
    result += `${seg.name.toUpperCase()}:
  Artifacts: ${artifacts}
  🟠 Orange Chests: ${chests}
`;
  });

  result += `
TOTAL:
🟠 Orange chests: ${totalOrange}
🔴 Red chests: ${totalRed}
`;

  document.getElementById("out").innerText = result;
}
