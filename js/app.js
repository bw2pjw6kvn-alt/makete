
const AK_BASE="https://ak-interactive.com/wp-content/uploads";
const YEARS=["2022/01","2022/02","2021/04","2021/03","2021/01","2021/06","2020/10","2020/06","2019/10","2023/03","2024/01","2018/05"];
const SK="ak_inv_v44";
const OLD_KEYS=["ak_inv_v10","ak_inv_v9","ak_inv_v8","ak_inv_v7","ak_inv_v6"];
const SET_HEADERS=new Set(["AK10041","AK10042","RCM101","RCM102","RCM105","RCM107"]);

// Okvirne (nisu službene) hex vrijednosti za RAL Classic nijanse — RAL sam po
// sebi ne objavljuje službeni RGB ekvivalent, ovo su uobičajene aproksimacije
// dovoljno precizne za vizualni pregled unutar aplikacije.
const RAL_COLORS={
  "1000":{name:"Zelenkasto bež",hex:"#CDBA88"},"1001":{name:"Bež",hex:"#D0B084"},
  "1002":{name:"Pješčano žuta",hex:"#D2AA6D"},"1003":{name:"Signalno žuta",hex:"#F9A800"},
  "1005":{name:"Medno žuta",hex:"#C89032"},"1011":{name:"Smeđkasto bež",hex:"#AF8A54"},
  "1013":{name:"Bisernо bijela",hex:"#E9E5CE"},"1014":{name:"Slonovača",hex:"#DDC49A"},
  "1015":{name:"Svijetla slonovača",hex:"#E6D2B5"},"1017":{name:"Šafran žuta",hex:"#F6A950"},
  "1019":{name:"Sivo bež",hex:"#A1937B"},"1020":{name:"Zeleno bež",hex:"#9A9464"},
  "1021":{name:"Repičasto žuta",hex:"#F7B940"},"1023":{name:"Prometno žuta",hex:"#F8CD1C"},
  "1024":{name:"Oker žuta",hex:"#AE9142"},"1027":{name:"Kurkuma žuta",hex:"#976A20"},
  "1032":{name:"Žuti kupinovac",hex:"#D6AE39"},"1033":{name:"Dahlia žuta",hex:"#F6B942"},
  "1037":{name:"Sunčano žuta",hex:"#E29C45"},
  "2000":{name:"Žuta narančasta",hex:"#DD7907"},"2001":{name:"Crvena narančasta",hex:"#BE4E20"},
  "2002":{name:"Krvava narančasta",hex:"#C3311E"},"2003":{name:"Pastelno narančasta",hex:"#FA842B"},
  "2004":{name:"Čisto narančasta",hex:"#E75B12"},"2008":{name:"Jarko crveno narančasta",hex:"#F0630E"},
  "2009":{name:"Prometno narančasta",hex:"#D74915"},"2010":{name:"Signalno narančasta",hex:"#D3591F"},
  "2011":{name:"Duboko narančasta",hex:"#E06E23"},"2012":{name:"Lososovo narančasta",hex:"#D9764A"},
  "3000":{name:"Vatreno crvena",hex:"#A72920"},"3001":{name:"Signalno crvena",hex:"#9B2321"},
  "3002":{name:"Karmin crvena",hex:"#9B2321"},"3003":{name:"Rubin crvena",hex:"#8D1D2C"},
  "3004":{name:"Grimizna",hex:"#701F29"},"3005":{name:"Vinsko crvena",hex:"#5E2028"},
  "3007":{name:"Crno crvena",hex:"#3B2027"},"3009":{name:"Oksidno crvena",hex:"#663333"},
  "3011":{name:"Smeđe crvena",hex:"#7E292C"},"3013":{name:"Paradajz crvena",hex:"#9C322E"},
  "3016":{name:"Koralno crvena",hex:"#AC4034"},"3018":{name:"Jagodasto crvena",hex:"#AA3B43"},
  "3020":{name:"Prometno crvena",hex:"#C1121C"},"3022":{name:"Lososovo crvena",hex:"#CB6753"},
  "3027":{name:"Malina crvena",hex:"#9D303E"},"3031":{name:"Orijent crvena",hex:"#9A2E30"},
  "4001":{name:"Crveno ljubičasta",hex:"#8A5A83"},"4002":{name:"Crvena vinjaga",hex:"#933D50"},
  "4003":{name:"Heather ljubičasta",hex:"#D14152"},"4005":{name:"Plavo ljubičasta",hex:"#67567F"},
  "4006":{name:"Purpurna ljubičasta",hex:"#8A3D6E"},"4008":{name:"Signalno ljubičasta",hex:"#844C82"},
  "4009":{name:"Pastelno ljubičasta",hex:"#8C7388"},
  "5000":{name:"Violet plava",hex:"#3E5D77"},"5001":{name:"Zelenkasto plava",hex:"#1F3A4D"},
  "5002":{name:"Ultramarinsko plava",hex:"#1D1E4B"},"5003":{name:"Safirno plava",hex:"#26314A"},
  "5005":{name:"Signalno plava",hex:"#154889"},"5007":{name:"Brilijant plava",hex:"#3E6091"},
  "5008":{name:"Sivo plava",hex:"#33414D"},"5009":{name:"Tirkizno plava",hex:"#31586D"},
  "5010":{name:"Silažno plava",hex:"#0E4C92"},"5011":{name:"Crno plava",hex:"#232C3A"},
  "5012":{name:"Svijetlo plava",hex:"#3583AE"},"5013":{name:"Kobalt plava",hex:"#1D2C4E"},
  "5014":{name:"Golublje plava",hex:"#6C7E93"},"5015":{name:"Nebo plava",hex:"#2271B5"},
  "5017":{name:"Prometno plava",hex:"#0E518D"},"5018":{name:"Tirkizna",hex:"#328882"},
  "5019":{name:"Kapri plava",hex:"#1A5784"},"5021":{name:"Vodeno zelena plava",hex:"#03755E"},
  "5024":{name:"Pastelno plava",hex:"#6087B0"},
  "6000":{name:"Zelena patina",hex:"#3D8365"},"6001":{name:"Smaragdno zelena",hex:"#427A42"},
  "6002":{name:"Lisnato zelena",hex:"#376b34"},"6003":{name:"Maslinasto zelena",hex:"#4a5c2e"},
  "6004":{name:"Plavo zelena",hex:"#154a3d"},"6005":{name:"Mahovinasto zelena",hex:"#154335"},
  "6006":{name:"Sivo maslinasta",hex:"#3c392e"},"6007":{name:"Boca zelena",hex:"#2c3222"},
  "6008":{name:"Smeđe zelena",hex:"#39352b"},"6009":{name:"Jelovo zelena",hex:"#1d2e22"},
  "6010":{name:"Travnato zelena",hex:"#4c7031"},"6011":{name:"Rezeda zelena",hex:"#7c9463"},
  "6012":{name:"Crno plavo zelena",hex:"#324044"},"6013":{name:"Trska zelena",hex:"#7c7451"},
  "6014":{name:"Žuto maslinasta",hex:"#474135"},"6015":{name:"Crno maslinasta",hex:"#3a3a30"},
  "6016":{name:"Turkizno zelena",hex:"#04674f"},"6017":{name:"Livadno zelena",hex:"#5c8244"},
  "6018":{name:"Žuto zelena",hex:"#61993a"},"6019":{name:"Blijedo zelena",hex:"#b7d3ae"},
  "6020":{name:"Kromovo zelena",hex:"#354733"},"6021":{name:"Blijeda zelenkasta",hex:"#89a185"},
  "6022":{name:"Smeđkasto maslinasta",hex:"#3a332a"},"6024":{name:"Prometno zelena",hex:"#2e6b3e"},
  "6025":{name:"Papratna zelena",hex:"#57703f"},"6027":{name:"Blago zelena",hex:"#7dbfae"},
  "6028":{name:"Borova zelena",hex:"#215f4d"},"6029":{name:"Mint zelena",hex:"#159c6f"},
  "6032":{name:"Signalno zelena",hex:"#276f4a"},"6033":{name:"Mint tirkizna",hex:"#478b83"},
  "6034":{name:"Pastelno tirkizna",hex:"#83aaa2"},
  "7000":{name:"Sivo pačja",hex:"#7d8d94"},"7001":{name:"Srebrno siva",hex:"#8b969a"},
  "7002":{name:"Maslinasto siva",hex:"#82806a"},"7003":{name:"Mahovinasto siva",hex:"#787a67"},
  "7004":{name:"Signalno siva",hex:"#9a9a9a"},"7005":{name:"Mišja siva",hex:"#6a6c6b"},
  "7006":{name:"Bež siva",hex:"#77715f"},"7008":{name:"Kaki siva",hex:"#6d6250"},
  "7009":{name:"Zelena siva",hex:"#4c5044"},"7010":{name:"Šatorska siva",hex:"#494e47"},
  "7011":{name:"Željezno siva",hex:"#434c4e"},"7012":{name:"Bazaltno siva",hex:"#464d4c"},
  "7013":{name:"Smeđkasto siva",hex:"#43423a"},"7015":{name:"Škriljevo siva",hex:"#434750"},
  "7016":{name:"Antracit siva",hex:"#383e42"},"7021":{name:"Crno siva",hex:"#2d3033"},
  "7022":{name:"Umbra siva",hex:"#4b4a42"},"7023":{name:"Betonsko siva",hex:"#8a8c83"},
  "7024":{name:"Grafitno siva",hex:"#474a50"},"7026":{name:"Granitno siva",hex:"#374447"},
  "7028":{name:"Tamno žuta (Dunkelgelb)",hex:"#c8a832"},"7030":{name:"Kamena siva",hex:"#928e85"},
  "7031":{name:"Plavo siva",hex:"#4a545a"},"7032":{name:"Šljunkovo siva",hex:"#b3ac96"},
  "7033":{name:"Cementno siva",hex:"#7c8175"},"7034":{name:"Žuto siva",hex:"#8b8570"},
  "7035":{name:"Svijetlo siva",hex:"#c8cbc7"},"7036":{name:"Platinasto siva",hex:"#9a9994"},
  "7037":{name:"Prašnjavo siva",hex:"#7c7f7e"},"7038":{name:"Agatno siva",hex:"#b6b6ac"},
  "7039":{name:"Kvarcno siva",hex:"#6a6963"},"7040":{name:"Prozorsko siva",hex:"#9ba3ab"},
  "7042":{name:"Prometno siva A",hex:"#8f9695"},"7043":{name:"Prometno siva B",hex:"#4e5451"},
  "7044":{name:"Svilenkasto siva",hex:"#c7c6b9"},"7045":{name:"Telegrafska siva",hex:"#9498a0"},
  "7046":{name:"Telegrafska siva 2",hex:"#82878c"},"7047":{name:"Telegrafska siva 4",hex:"#d2d3d4"},
  "8000":{name:"Zelenkasto smeđa",hex:"#886a3a"},"8001":{name:"Oker smeđa",hex:"#9c6b30"},
  "8002":{name:"Signalno smeđa",hex:"#7b5141"},"8003":{name:"Glineno smeđa",hex:"#7e4b26"},
  "8004":{name:"Bakreno smeđa",hex:"#8d4931"},"8007":{name:"Jelenska smeđa",hex:"#6f4a2f"},
  "8008":{name:"Maslinasto smeđa",hex:"#6b4423"},"8011":{name:"Riđe smeđa",hex:"#5a3a29"},
  "8012":{name:"Crveno smeđa",hex:"#6b3020"},"8014":{name:"Sepia smeđa",hex:"#43302a"},
  "8015":{name:"Kesten smeđa",hex:"#5b2b28"},"8016":{name:"Mahagoni smeđa",hex:"#4a2c22"},
  "8017":{name:"Čokoladno smeđa",hex:"#442f29"},"8019":{name:"Sivo smeđa",hex:"#3d3635"},
  "8022":{name:"Crno smeđa",hex:"#1a1414"},"8023":{name:"Narančasto smeđa",hex:"#a45a2a"},
  "8024":{name:"Bež smeđa",hex:"#795038"},"8025":{name:"Blijedo smeđa",hex:"#755b47"},
  "8028":{name:"Zemljano smeđa",hex:"#4a3526"},"8029":{name:"Bakrena",hex:"#763c28"},
  "9001":{name:"Kremasto bijela",hex:"#e9e0cd"},"9002":{name:"Sivo bijela",hex:"#d7d7cb"},
  "9003":{name:"Signalno bijela",hex:"#eeeeee"},"9004":{name:"Prometno crna",hex:"#2b2b2c"},
  "9005":{name:"Duboko crna",hex:"#0a0a0a"},"9006":{name:"Bijelo aluminij",hex:"#a5a8a8"},
  "9007":{name:"Sivo aluminij",hex:"#8f8f8c"},"9010":{name:"Čisto bijela",hex:"#f1ece1"},
  "9011":{name:"Grafitno crna",hex:"#1c1e21"},"9016":{name:"Prometno bijela",hex:"#f1f0ea"},
  "9017":{name:"Prometno crna 2",hex:"#26282a"},"9018":{name:"Papirnato bijela",hex:"#cfd3cd"},
  "9022":{name:"Perlasto svijetlo siva",hex:"#9c9c9c"},"9023":{name:"Perlasto tamno siva",hex:"#7c7f80"}
};

// Nekoliko čestih naziva boja (HR/EN) za brzu pretragu bez poznavanja hex/RGB
const NAMED_COLORS={
  "crvena / red":"#c0392b","tamno crvena / dark red":"#7b241c","narančasta / orange":"#e67e22",
  "žuta / yellow":"#f1c40f","zelena / green":"#27ae60","tamno zelena / dark green":"#1e5631",
  "maslinasto zelena / olive":"#556b2f","plava / blue":"#2980b9","tamno plava / navy":"#1b2a4a",
  "svijetlo plava / light blue":"#5dade2","ljubičasta / purple":"#8e44ad","ružičasta / pink":"#e91e63",
  "smeđa / brown":"#6b4423","tamno smeđa / dark brown":"#3e2b1f","bež / tan":"#d2b48c",
  "pješčana / sand":"#c2a06b","hrđa / rust":"#8b3a1f","kaki / khaki":"#8a7d4f",
  "siva / grey":"#7f8c8d","tamno siva / dark grey":"#3f4547","svijetlo siva / light grey":"#c0c4c6",
  "srebrna / silver":"#b0b3b5","metalik siva / gunmetal":"#4a4a4d","crna / black":"#111111",
  "bijela / white":"#f4f4f2","zlatna / gold":"#c9a635","bakrena / copper":"#a2582a",
  "boja drveta / wood":"#8b5a2b","slonovača / ivory":"#e0d3ab","boja kože / skin tone":"#d4a882"
};
let COLOR_SEARCH_MAP={};
function buildColorSearchIndex(){
  COLOR_SEARCH_MAP={};
  Object.entries(RAL_COLORS).forEach(([code,c])=>{COLOR_SEARCH_MAP[`RAL ${code} – ${c.name}`]=c.hex;});
  Object.entries(NAMED_COLORS).forEach(([name,hex])=>{COLOR_SEARCH_MAP[name]=hex;});
  const dl=document.getElementById("colorDatalistOptions");
  if(dl)dl.innerHTML=Object.keys(COLOR_SEARCH_MAP).sort().map(label=>`<option value="${esc(label)}"></option>`).join("");
}
const CODE_SWATCHES={"RC852":"#4a5c2e","RC860":"#c8a832","RC859":"#b89820","RC862":"#6b3020","RC864":"#7a4018","RC809":"#c8c8b8","RC826":"#888880","AK11028":"#1a1a1a","AK11215":"#808078","AK11052":"#d4a882","AK11325":"#c8b878"};

// ── EKVIVALENCIJE BOJA (AK 3G Acrylics – tablica ekvivalencija 2021) ──
const EQUIV_DATA = [{"code": "AK11001", "name": "White", "tamiya": "XF-2", "humbrol": "34", "vallejo": "951", "gunze": "11", "testor": "1768", "rlm": "21", "ral": "9016", "fs": "37925", "revell": "5", "realcolors": "RC004", "swatch": "#f5f5f0", "vallejoGC": "001", "citadelNew": "White Scar", "citadelOld": "Skull White", "meng": "MC002 MATT WHITE"}, {"code": "AK11002", "name": "Offwhite", "vallejo": "820", "gunze": "316", "ral": "9001", "fs": "27780", "realcolors": "RC222", "swatch": "#e8f0de"}, {"code": "AK11003", "name": "White Grey", "vallejo": "993", "gunze": "311", "swatch": "#f2f7eb"}, {"code": "AK11004", "name": "Ivory", "humbrol": "41", "vallejo": "918", "gunze": "21", "testor": "2709", "fs": "37855", "revell": "10", "swatch": "#edf5b5"}, {"code": "AK11005", "name": "Greenish White", "humbrol": "90", "gunze": "31", "fs": "17773", "swatch": "#dbffba"}, {"code": "AK11006", "name": "Silver Grey", "humbrol": "28", "vallejo": "883", "gunze": "51", "testor": "1733", "ral": "9002", "fs": "36622", "citadel": "51058", "swatch": "#dcdcac"}, {"code": "AK11007", "name": "Rock Grey", "humbrol": "129", "gunze": "57", "testor": "1730", "fs": "26440", "revell": "301", "swatch": "#b1bd88"}, {"code": "AK11008", "name": "Grimy Grey", "gunze": "313", "fs": "33531", "swatch": "#d7ca89", "meng": "MC241 GREYISH YELLOW"}, {"code": "AK11009", "name": "Warm Grey", "tamiya": "XF-20", "gunze": "321", "swatch": "#a2a97d"}, {"code": "AK11010", "name": "Medium Grey", "tamiya": "XF-25", "vallejo": "907", "gunze": "62", "rlm": "76", "fs": "36473", "swatch": "#a6c498", "vallejoGC": "049/047", "citadelNew": "Administratum grey", "citadelOld": "Fortress Grey"}, {"code": "AK11011", "name": "Blue-Grey", "tamiya": "XF-12", "humbrol": "89", "vallejo": "973", "gunze": "67", "testor": "1562", "fs": "25526", "swatch": "#bbdccc"}, {"code": "AK11012", "name": "Sky Grey", "tamiya": "XF-19", "humbrol": "196", "vallejo": "989", "gunze": "334", "ral": "7004", "fs": "36463", "revell": "371", "swatch": "#abbfb5"}, {"code": "AK11013", "name": "Pale Grey", "tamiya": "XF-80", "vallejo": "990", "gunze": "53", "testor": "1728", "ral": "7001", "fs": "36300", "swatch": "#9fb5ba", "meng": "MC016 LIGHT GREY"}, {"code": "AK11014", "name": "Medium Sea Grey", "gunze": "61", "fs": "36307", "swatch": "#8b9d75"}, {"code": "AK11015", "name": "Dark Sea Grey", "tamiya": "XF-53", "humbrol": "140", "vallejo": "991", "gunze": "82", "testor": "1729", "fs": "36231", "revell": "70", "swatch": "#62736b"}, {"code": "AK11016", "name": "Grey-Green", "tamiya": "XF-73", "vallejo": "886", "gunze": "70", "rlm": "2", "realcolors": "RC265", "swatch": "#657f54", "meng": "MC234 LIGHT OLIVE"}, {"code": "AK11017", "name": "Reddish Grey", "swatch": "#5e5e42"}, {"code": "AK11018", "name": "Neutral Grey", "tamiya": "XF-66", "humbrol": "27", "vallejo": "992", "gunze": "68", "testor": "2160", "fs": "36173", "swatch": "#4e6b5e", "meng": "MC017 MIDDLE GREY"}, {"code": "AK11019", "name": "Graphite", "tamiya": "XF-22", "gunze": "22", "swatch": "#526952"}, {"code": "AK11020", "name": "English Grey", "tamiya": "XF-54", "vallejo": "836", "gunze": "305", "fs": "36118", "swatch": "#53665a"}, {"code": "AK11021", "name": "Basalt Grey", "tamiya": "XF-77", "humbrol": "106", "vallejo": "869", "gunze": "83", "rlm": "75", "ral": "7012", "fs": "36152", "revell": "47", "swatch": "#425850", "vallejoGC": "050", "citadelNew": "Dawnstone", "citadelOld": "Coldex Grey", "meng": "MC246 GERMAN GREY WWI"}, {"code": "AK11022", "name": "Dark Grey", "tamiya": "XF-24", "humbrol": "85", "vallejo": "994", "gunze": "27", "testor": "1579", "fs": "26008", "revell": "302", "swatch": "#2f3c37", "meng": "MC018 DARK GREY"}, {"code": "AK11023", "name": "Lead Grey", "gunze": "333", "ral": "7022", "fs": "34031", "swatch": "#2b3932"}, {"code": "AK11024", "name": "Ash Grey", "humbrol": "123", "vallejo": "866", "gunze": "68", "rlm": "66", "fs": "26008", "swatch": "#283229"}, {"code": "AK11025", "name": "German Grey", "tamiya": "XF-63", "humbrol": "67", "vallejo": "995", "gunze": "404", "testor": "1592", "ral": "7016", "fs": "26044", "revell": "78", "swatch": "#1f2820", "vallejoGC": "155", "citadelNew": "Stormvermin Fur", "citadelOld": "Charadon Granite"}, {"code": "AK11026", "name": "Tenebrous Grey", "gunze": "452", "swatch": "#191c14", "meng": "MC210 BLACK GREY"}, {"code": "AK11027", "name": "Rubber Black", "tamiya": "XF-85", "gunze": "77", "swatch": "#13170f", "meng": "MC202 RUBBER BLACK"}, {"code": "AK11028", "name": "Smoke Black", "tamiya": "XF-69", "vallejo": "862", "gunze": "401", "testor": "4795", "ral": "7021", "fs": "37031", "revell": "109", "swatch": "#151c14"}, {"code": "AK11029", "name": "Black", "tamiya": "XF-1", "humbrol": "33", "vallejo": "950", "gunze": "12", "testor": "1583", "rlm": "22", "ral": "9004", "fs": "37038", "realcolors": "RC001", "swatch": "#060808", "vallejoGC": "051", "citadelNew": "Abaddon Black", "citadelOld": "Chaos Black", "meng": "MC001 MATT BLACK"}, {"code": "AK11030", "name": "Beige", "vallejo": "917", "fs": "23594", "swatch": "#dcb934", "meng": "MC014 DARK YELLOW"}, {"code": "AK11031", "name": "Buff", "tamiya": "XF-57", "humbrol": "103", "vallejo": "976", "ral": "1001", "fs": "23578", "citadel": "51032", "swatch": "#c7aa49", "vallejoGC": "034", "citadelNew": "Ushabit Bone", "citadelOld": "Bleached Bone", "meng": "MC012 BEIGE / MC214 SAND YELLOW"}, {"code": "AK11032", "name": "Pale Sand", "vallejo": "837", "fs": "23722", "realcolors": "RC018", "swatch": "#ebdb6b", "meng": "MC253 LIGHT SAND"}, {"code": "AK11033", "name": "Dark Sand", "tamiya": "XF-88", "humbrol": "74", "vallejo": "847", "gunze": "36", "swatch": "#e1bb42", "meng": "MC218 YELLOW OCHRE"}, {"code": "AK11034", "name": "Medium Sand", "vallejo": "977", "gunze": "71", "fs": "30257", "realcolors": "RC030", "swatch": "#c0931f"}, {"code": "AK11035", "name": "Sand Yellow", "vallejo": "916", "ral": "1002", "fs": "20260", "swatch": "#e3bd26"}, {"code": "AK11036", "name": "Ice Yellow", "humbrol": "76", "vallejo": "858", "swatch": "#fafa73"}, {"code": "AK11037", "name": "Pastel Yellow", "fs": "33798", "swatch": "#fcdb5e"}, {"code": "AK11038", "name": "Pale Yellow", "vallejo": "949", "fs": "33727", "swatch": "#fae342", "meng": "MC013 LIGHT YELLOW"}, {"code": "AK11039", "name": "Purulent Yellow", "vallejo": "806", "rlm": "5", "swatch": "#e3de29"}, {"code": "AK11040", "name": "Sahara Yellow", "swatch": "#9e9300"}, {"code": "AK11041", "name": "Golden Yellow", "vallejo": "948", "ral": "1017", "swatch": "#ffa33d", "vallejoGC": "007", "citadelNew": "Yriel Yellow", "citadelOld": "Golden Yellow"}, {"code": "AK11042", "name": "Volcanic Yellow", "gunze": "24", "fs": "13538", "swatch": "#fa800d"}, {"code": "AK11043", "name": "Dirty Yellow", "gunze": "329", "swatch": "#f09e12"}, {"code": "AK11044", "name": "Yellow", "tamiya": "X-8", "humbrol": "69", "vallejo": "953", "gunze": "413", "testor": "1514", "rlm": "4", "ral": "1003", "fs": "23655", "revell": "12", "swatch": "#ffad12", "vallejoGC": "006", "citadelNew": "Flash Gitz Yellow", "citadelOld": "Sunburst Yellow", "meng": "MC286 BRIGHT YELLOW"}, {"code": "AK11045", "name": "Deep Yellow", "vallejo": "915", "gunze": "4", "ral": "1023", "swatch": "#ffc20f", "vallejoGC": "006", "citadelNew": "Flash Gitz Yellow", "citadelOld": "Sunburst Yellow", "meng": "MC004 MATT YELLOW"}, {"code": "AK11046", "name": "Radiant Yellow", "swatch": "#ffd614"}, {"code": "AK11047", "name": "Lemon Yellow", "tamiya": "XF-3", "humbrol": "99", "vallejo": "952", "testor": "2717", "ral": "1018", "swatch": "#faed1c", "vallejoGC": "005", "citadelNew": "Dorn Yellow", "citadelOld": "Bad Moon Yellow"}, {"code": "AK11048", "name": "Laser Yellow", "vallejo": "954", "swatch": "#e3ff29"}, {"code": "AK11049", "name": "Fluorescent Yellow", "vallejo": "730", "gunze": "97", "ral": "1026", "fs": "38907", "swatch": "#f5f000"}, {"code": "AK11050", "name": "Light Flesh", "vallejo": "928", "fs": "31670", "swatch": "#ffd6a8"}, {"code": "AK11051", "name": "Luminous Flesh", "gunze": "318", "fs": "21667", "swatch": "#edba70"}, {"code": "AK11052", "name": "Basic Skin Tone", "vallejo": "815", "fs": "21670", "swatch": "#ffa373"}, {"code": "AK11053", "name": "Radiant Flesh", "vallejo": "955", "fs": "22516", "swatch": "#ffa14a", "vallejoGC": "004", "citadelNew": "Kislev Flesh", "citadelOld": "Elf Flesh"}, {"code": "AK11054", "name": "Medium Flesh Tone", "vallejo": "860", "swatch": "#c2721c"}, {"code": "AK11055", "name": "Sunny Skin Tone", "tamiya": "XF-15", "vallejo": "845", "swatch": "#ff9447"}, {"code": "AK11056", "name": "Dark Flesh", "humbrol": "61", "vallejo": "927", "gunze": "44", "testor": "1516", "revell": "35", "swatch": "#f09929"}, {"code": "AK11057", "name": "Vampiric Flesh", "gunze": "336", "fs": "13522", "swatch": "#c1bf6e", "meng": "MC281 JAPANESE ARMY DARK YELLOW"}, {"code": "AK11058", "name": "Decomposed Flesh", "tamiya": "XF-78", "gunze": "85", "fs": "33510", "swatch": "#a8a34c", "meng": "MC213 LIGHT WOOD YELLOW"}, {"code": "AK11059", "name": "Pastel Pink", "fs": "31669", "swatch": "#ffb0ab"}, {"code": "AK11060", "name": "Sickly Pink", "fs": "31638", "swatch": "#ff9c94"}, {"code": "AK11061", "name": "Salmon", "vallejo": "835", "swatch": "#ff8a73"}, {"code": "AK11062", "name": "Old Rose", "tamiya": "X-17", "humbrol": "200", "vallejo": "944", "gunze": "19", "swatch": "#ff7a85"}, {"code": "AK11063", "name": "Brown Rose", "vallejo": "803", "swatch": "#d96e61"}, {"code": "AK11064", "name": "Beige Red", "vallejo": "804", "ral": "3012", "fs": "31433", "citadel": "51037", "swatch": "#de8250", "vallejoGC": "037", "citadelNew": "Tau Light Ochre", "citadelOld": "Vomit Brown"}, {"code": "AK11065", "name": "Intense Pink", "vallejo": "958", "citadel": "51070", "swatch": "#fa54c2", "vallejoGC": "013", "citadelNew": "Emperor’s Children", "citadelOld": "Tentacle pink"}, {"code": "AK11066", "name": "Laser Magenta", "swatch": "#51003c"}, {"code": "AK11067", "name": "Magenta", "vallejo": "945", "ral": "4006", "citadel": "50033", "swatch": "#ab168c", "vallejoGC": "014", "citadelNew": "Screamer Pink", "citadelOld": "Warlock Purple"}, {"code": "AK11068", "name": "Fluorescent Magenta", "vallejo": "735", "gunze": "99", "swatch": "#ff3094"}, {"code": "AK11069", "name": "Pastel Violet", "swatch": "#ffdbff"}, {"code": "AK11070", "name": "Blue Violet", "vallejo": "811", "swatch": "#7361e8", "vallejoGC": "015", "citadelNew": "Xereus Purple", "citadelOld": "Liche Purple"}, {"code": "AK11071", "name": "Lilac", "gunze": "49", "swatch": "#4b567e"}, {"code": "AK11072", "name": "Deep Violet", "swatch": "#564281"}, {"code": "AK11073", "name": "Purple", "tamiya": "X-16", "humbrol": "68", "vallejo": "959", "gunze": "39", "fs": "37100", "revell": "53", "swatch": "#3c334f"}, {"code": "AK11074", "name": "Deep Purple", "swatch": "#5d3485"}, {"code": "AK11075", "name": "Violet Red", "vallejo": "812", "swatch": "#391f30"}, {"code": "AK11076", "name": "Pastel Peach", "swatch": "#ff854a"}, {"code": "AK11077", "name": "Light Orange", "vallejo": "911", "ral": "2008", "fs": "32473", "swatch": "#ff6133", "vallejoGC": "008", "citadelNew": "Fire Dragon Bright", "citadelOld": "Fiery Orange", "meng": "MC008 LIGHT ORANGE"}, {"code": "AK11078", "name": "Medium Orange", "swatch": "#ff4d2b"}, {"code": "AK11079", "name": "Burn Orange", "tamiya": "X-6", "vallejo": "805", "ral": "2012", "swatch": "#e64423", "vallejoGC": "152", "citadelNew": "Jokaero Orange", "citadelOld": "Macharius Solar Orange"}, {"code": "AK11080", "name": "Deep Orange", "humbrol": "18", "vallejo": "851", "gunze": "14", "ral": "2004", "realcolors": "RC009", "swatch": "#ff4519"}, {"code": "AK11081", "name": "Fluorescent Orange", "vallejo": "733", "gunze": "98", "testor": "2041", "ral": "2005", "fs": "38903", "realcolors": "RC207", "swatch": "#ff3b12"}, {"code": "AK11082", "name": "Luminous Orange", "swatch": "#ff7005"}, {"code": "AK11083", "name": "Dead Red", "gunze": "29", "swatch": "#ff2e5c"}, {"code": "AK11084", "name": "Ruby", "vallejo": "802", "swatch": "#d52d52"}, {"code": "AK11085", "name": "Cadmium Red", "humbrol": "131", "vallejo": "910", "fs": "21400", "swatch": "#fc3d24"}, {"code": "AK11086", "name": "Amaranth Red", "vallejo": "829", "ral": "2001", "swatch": "#d73416"}, {"code": "AK11087", "name": "Scarlet Red", "vallejo": "817", "ral": "2002", "fs": "21310", "swatch": "#d7201b", "vallejoGC": "009", "citadelNew": "Troll Slayer Orange", "citadelOld": "Blazing Orange"}, {"code": "AK11088", "name": "Deep Red", "tamiya": "X-F7", "humbrol": "153", "gunze": "23", "swatch": "#f00a08"}, {"code": "AK11089", "name": "Blood Red", "humbrol": "174", "vallejo": "909", "ral": "3020", "fs": "31302", "revell": "330", "swatch": "#ce0a07", "vallejoGC": "010", "citadelNew": "Evil Sunz Scarlet", "citadelOld": "Blood Red"}, {"code": "AK11090", "name": "Vermillion", "humbrol": "60", "vallejo": "947", "gunze": "86", "ral": "3031", "fs": "31350", "realcolors": "RC006", "swatch": "#c7322b"}, {"code": "AK11091", "name": "Carmine", "tamiya": "X-7", "humbrol": "19", "vallejo": "908", "gunze": "3", "testor": "1503", "ral": "3002", "fs": "21105", "revell": "31", "swatch": "#b82215", "vallejoGC": "012", "citadelNew": "Khorne Red", "citadelOld": "Scan Red"}, {"code": "AK11092", "name": "Matt Red", "vallejo": "957", "gunze": "13", "testor": "4714", "ral": "3013", "fs": "31136", "swatch": "#b11604", "meng": "MC003 MATT RED"}, {"code": "AK11093", "name": "Brick Red", "vallejo": "946", "gunze": "327", "fs": "11136", "swatch": "#8f2b1b"}, {"code": "AK11094", "name": "Bordeaux Red", "gunze": "43", "swatch": "#95202a"}, {"code": "AK11095", "name": "Dirty Red", "humbrol": "20", "vallejo": "926", "gunze": "33", "testor": "1501", "ral": "3026", "revell": "32", "swatch": "#6b0200", "vallejoGC": "141", "citadelNew": "Mephiston Red", "citadelOld": "Mechrite Red"}, {"code": "AK11096", "name": "Wine Red", "gunze": "466", "swatch": "#4f0107"}, {"code": "AK11097", "name": "Burnt Red", "tamiya": "XF-9", "vallejo": "814", "gunze": "47", "ral": "8012", "swatch": "#7a2811"}, {"code": "AK11098", "name": "Black Red", "vallejo": "859", "testor": "2152", "realcolors": "RC068", "swatch": "#241515"}, {"code": "AK11099", "name": "Ocher Orange", "vallejo": "P", "swatch": "#ff9454"}, {"code": "AK11100", "name": "Light Brown", "vallejo": "929", "swatch": "#cb6f29"}, {"code": "AK11101", "name": "Orange Brown", "humbrol": "9", "vallejo": "981", "ral": "8023", "fs": "30252", "revell": "80", "realcolors": "RC031", "citadel": "51040", "swatch": "#a74107", "vallejoGC": "042", "citadelNew": "Skrag Brown", "citadelOld": "Vermin Brown", "meng": "MC254 DARK SAND"}, {"code": "AK11102", "name": "Deep Brown", "vallejo": "818", "gunze": "453", "fs": "20100", "swatch": "#6d331a"}, {"code": "AK11103", "name": "Medium Rust", "vallejo": "P", "gunze": "7", "realcolors": "RC081", "swatch": "#8d3225"}, {"code": "AK11104", "name": "Saddle Brown", "tamiya": "XF-79", "vallejo": "940", "fs": "30111", "swatch": "#4d2522", "meng": "MC215 WOOD BROWN"}, {"code": "AK11105", "name": "Light Rust", "swatch": "#e63d00"}, {"code": "AK11106", "name": "Mahogany Brown", "humbrol": "113", "vallejo": "846", "gunze": "344", "testor": "1785", "ral": "8002", "revell": "83", "swatch": "#471503", "vallejoGC": "044", "citadelNew": "Doombull Brown", "citadelOld": "Dark Flesh"}, {"code": "AK11107", "name": "Dark Rust", "tamiya": "XF-68", "gunze": "17", "swatch": "#351208", "meng": "MC237 RED BROWN"}, {"code": "AK11108", "name": "Hull Red", "vallejo": "985", "gunze": "84", "ral": "8017", "fs": "30059", "swatch": "#190d0b", "meng": "MC290 HULL RED"}, {"code": "AK11109", "name": "Dark Brown", "tamiya": "XF-64", "vallejo": "826", "fs": "30140", "swatch": "#35260a", "meng": "MC245 DARK EARTH / MC283 JAPANESE ARMY DARK BROWN"}, {"code": "AK11110", "name": "Leather Brown", "vallejo": "871", "gunze": "456", "ral": "8027", "fs": "30051", "swatch": "#281e12", "meng": "MC057 LEATHER 1"}, {"code": "AK11111", "name": "Burnt Umber", "tamiya": "XF-51", "vallejo": "941", "fs": "30097", "realcolors": "RC323", "swatch": "#12100b"}, {"code": "AK11112", "name": "Grim Brown", "vallejo": "822", "gunze": "462", "ral": "8019", "fs": "37056", "swatch": "#0b0b0a", "vallejoGC": "045", "citadelNew": "Rhinox Hide", "citadelOld": "Scorched Brown"}, {"code": "AK11113", "name": "Chocolate (Chipping)", "tamiya": "XF-10", "humbrol": "98", "vallejo": "872", "testor": "1540", "ral": "8017", "fs": "20062", "swatch": "#17100b"}, {"code": "AK11114", "name": "Deck Tan", "tamiya": "XF-55", "humbrol": "128", "vallejo": "986", "gunze": "53", "testor": "1741", "ral": "7038", "fs": "26496", "revell": "374", "realcolors": "RC019", "swatch": "#c1c8a8"}, {"code": "AK11115", "name": "Light Earth", "vallejo": "819", "gunze": "79", "fs": "22446", "swatch": "#c4b36d", "meng": "MC252 US DESERT TAN LIGHT"}, {"code": "AK11116", "name": "Tan Yellow", "vallejo": "912", "gunze": "44", "ral": "1011", "fs": "33245", "swatch": "#cb8d35"}, {"code": "AK11117", "name": "Golden Brown", "vallejo": "877", "fs": "33275", "citadel": "51004", "swatch": "#9b6900", "vallejoGC": "151", "citadelNew": "Averland Sunset", "citadelOld": "Lyanden Darksun"}, {"code": "AK11118", "name": "Ochre", "humbrol": "63", "vallejo": "913", "gunze": "34", "testor": "1706", "fs": "33434", "revell": "89", "swatch": "#bc8d1a", "vallejoGC": "039", "citadelNew": "Zamesi Desert", "citadelOld": "Bubonic Brown", "meng": "MC248 OCHER EARTH"}, {"code": "AK11119", "name": "Cork", "tamiya": "XF-52", "humbrol": "62", "vallejo": "843", "gunze": "66", "testor": "1737", "rlm": "79", "revell": "85", "swatch": "#8d6437", "vallejoGC": "140", "citadelNew": "Cadian Fleshtone", "citadelOld": "Tallarn Flesh"}, {"code": "AK11120", "name": "Mud Brown", "vallejo": "825", "gunze": "341", "fs": "30140", "swatch": "#534120", "meng": "MC251 US DESERT TAN SHADOW"}, {"code": "AK11121", "name": "Tan Earth", "tamiya": "XF64", "humbrol": "119", "vallejo": "874", "gunze": "37", "fs": "30219", "swatch": "#624822", "meng": "MC282 JAPANESE ARMY RED BROWN"}, {"code": "AK11122", "name": "Green Ochre", "tamiya": "XF59", "humbrol": "94", "vallejo": "914", "gunze": "402", "revell": "88", "swatch": "#917821"}, {"code": "AK11123", "name": "Japanese Brown", "humbrol": "83", "vallejo": "923", "fs": "30266", "swatch": "#7f5f06", "vallejoGC": "063", "citadelNew": "Tallarn Sand", "citadelOld": "Desert Yellow"}, {"code": "AK11124", "name": "Middle Stone", "tamiya": "XF60", "vallejo": "882", "gunze": "401", "ral": "1027", "swatch": "#706612", "vallejoGC": "149", "citadelNew": "Deathworld Forest", "citadelOld": "Gretching Green", "meng": "MC216 MIDDLE STONE"}, {"code": "AK11125", "name": "Grey-Brown", "tamiya": "XF72", "swatch": "#534a29"}, {"code": "AK11126", "name": "Green-Brown", "tamiya": "XF49", "humbrol": "26", "vallejo": "879", "gunze": "81", "ral": "8000", "revell": "86", "swatch": "#534a0d", "meng": "MC238 BROWN GREEN"}, {"code": "AK11127", "name": "British Khaki", "humbrol": "29", "vallejo": "921", "gunze": "72", "revell": "87", "swatch": "#4a3b0d", "vallejoGC": "062", "citadelNew": "Steel Legion Drab", "citadelOld": "Graveyard Earth", "meng": "MC212 BRITISH KHAKI"}, {"code": "AK11128", "name": "Luminous Green", "swatch": "#b8ff29"}, {"code": "AK11129", "name": "Fluorescent Green", "gunze": "100", "fs": "38901", "swatch": "#82ff03"}, {"code": "AK11130", "name": "Pistachio", "swatch": "#cceb17"}, {"code": "AK11131", "name": "Pastel Green", "swatch": "#99ff7d"}, {"code": "AK11132", "name": "Green-Grey", "tamiya": "XF21", "humbrol": "65", "vallejo": "971", "gunze": "74", "fs": "34414", "revell": "55", "swatch": "#d4f5ab"}, {"code": "AK11133", "name": "Dark Green-Grey", "humbrol": "149", "gunze": "302", "testor": "1764", "fs": "34092", "realcolors": "RC230", "swatch": "#234628"}, {"code": "AK11134", "name": "Green Sky", "humbrol": "120", "vallejo": "974", "gunze": "50", "testor": "1716", "fs": "24272", "swatch": "#77d96a"}, {"code": "AK11135", "name": "Faded Green", "tamiya": "XF76", "gunze": "48", "swatch": "#659263", "meng": "MC247 DULL GREEN"}, {"code": "AK11136", "name": "Frog Green", "swatch": "#82ed00"}, {"code": "AK11137", "name": "Lime Green", "tamiya": "X15", "humbrol": "38", "vallejo": "827", "gunze": "16", "revell": "60", "swatch": "#6cc400"}, {"code": "AK11138", "name": "Interior Yellow Green", "tamiya": "XF4", "gunze": "58", "fs": "33481", "swatch": "#96b200"}, {"code": "AK11139", "name": "Golden Olive", "vallejo": "857", "swatch": "#598502", "meng": "MC243 GOLDEN OLIVE"}, {"code": "AK11140", "name": "Grass Green", "swatch": "#4b9c00"}, {"code": "AK11141", "name": "Light Green", "tamiya": "X28", "humbrol": "80", "vallejo": "942", "fs": "24190", "citadel": "51024", "swatch": "#49bf00", "vallejoGC": "032", "citadelNew": "Moot Green", "citadelOld": "Scorpion Green"}, {"code": "AK11142", "name": "Deep Green", "vallejo": "969", "gunze": "26", "fs": "14115", "swatch": "#187600", "vallejoGC": "025", "citadelNew": "Sybarite Green", "citadelOld": "Vile Green", "meng": "MC009 GREEN"}, {"code": "AK11143", "name": "Mint Green", "swatch": "#27c440", "citadelNew": "Kabalite Green", "citadelOld": "Jade Green"}, {"code": "AK11144", "name": "Emerald", "vallejo": "838", "gunze": "46", "swatch": "#0f8a5f", "vallejoGC": "026"}, {"code": "AK11145", "name": "Lizard Green", "swatch": "#14650f"}, {"code": "AK11146", "name": "Dark Green", "humbrol": "2", "vallejo": "970", "testor": "1524", "ral": "6029", "fs": "24108", "revell": "61", "swatch": "#144200"}, {"code": "AK11147", "name": "Olive Green", "tamiya": "XF5", "vallejo": "967", "swatch": "#326300", "vallejoGC": "030", "citadelNew": "Warboss Green", "citadelOld": "Goblin Green"}, {"code": "AK11148", "name": "Medium Olive Green", "vallejo": "850", "gunze": "464", "fs": "34128", "swatch": "#264d00"}, {"code": "AK11149", "name": "Intermediate Green", "humbrol": "82", "vallejo": "891", "gunze": "312", "ral": "6011", "fs": "34138", "swatch": "#397a0d", "vallejoGC": "028", "citadelNew": "Caliban Green", "citadelOld": "Dark Angels Green"}, {"code": "AK11150", "name": "Gunship Green", "tamiya": "XF26", "humbrol": "30", "vallejo": "895", "gunze": "6", "fs": "34092", "swatch": "#2d4c1d"}, {"code": "AK11151", "name": "Brownish Green", "swatch": "#383601"}, {"code": "AK11152", "name": "Alga Green", "vallejo": "833", "gunze": "422", "ral": "6025", "swatch": "#3a5d00"}, {"code": "AK11153", "name": "Extra Dark Green", "tamiya": "XF27", "humbrol": "91", "vallejo": "896", "rlm": "73", "ral": "6012", "swatch": "#112419"}, {"code": "AK11154", "name": "German Field Grey", "tamiya": "XF65", "humbrol": "92", "vallejo": "830", "gunze": "73", "ral": "7009", "fs": "34086", "revell": "79", "swatch": "#262e13"}, {"code": "AK11155", "name": "Command Green", "tamiya": "XF67", "vallejo": "888", "gunze": "80", "rlm": "71", "ral": "6006", "fs": "24079", "swatch": "#181f0a", "meng": "MC209 DEEP GREEN"}, {"code": "AK11156", "name": "Camouflage Green", "tamiya": "XF81", "vallejo": "887", "gunze": "52", "rlm": "81", "fs": "34087", "swatch": "#30300a"}, {"code": "AK11157", "name": "US Dark Green", "tamiya": "XF13", "humbrol": "116", "vallejo": "893", "gunze": "64", "testor": "1710", "fs": "34079", "revell": "67", "swatch": "#272807", "meng": "MC203 OLIVE GREEN"}, {"code": "AK11158", "name": "Reflective Green", "tamiya": "XF58", "humbrol": "102", "vallejo": "890", "gunze": "320", "testor": "1716", "ral": "6003", "fs": "34082", "revell": "45", "swatch": "#1c1e0a"}, {"code": "AK11159", "name": "Russian Green", "tamiya": "XF62", "vallejo": "894", "gunze": "420", "rlm": "80", "fs": "34083", "swatch": "#131a0b", "meng": "MC235 LIGHT GRASS GREEN"}, {"code": "AK11160", "name": "Black Green", "tamiya": "XF11", "vallejo": "980", "gunze": "59", "realcolors": "RC034", "citadel": "50013", "swatch": "#0a140b", "vallejoGC": "147", "citadelNew": "Waaagh¡ Flesh", "citadelOld": "Orkhide Shade"}, {"code": "AK11161", "name": "Pale Blue", "tamiya": "XF23", "vallejo": "906", "gunze": "418", "rlm": "65", "fs": "35352", "swatch": "#a7d7b1"}, {"code": "AK11162", "name": "Spectrum Blue", "gunze": "67", "swatch": "#a5cabe"}, {"code": "AK11163", "name": "Intermediate Blue", "tamiya": "XF25", "humbrol": "144", "vallejo": "903", "testor": "1720", "fs": "35164", "revell": "79", "swatch": "#4c615e", "meng": "MC239 BLUE GREY"}, {"code": "AK11164", "name": "Dark Blue-Grey", "humbrol": "157", "vallejo": "904", "fs": "35189", "swatch": "#335a42"}, {"code": "AK11165", "name": "Grey-Blue", "humbrol": "109", "vallejo": "943", "gunze": "42", "fs": "35177", "realcolors": "RC256", "swatch": "#466273"}, {"code": "AK11166", "name": "French Blue", "vallejo": "900", "gunze": "305", "fs": "36176", "swatch": "#394c47"}, {"code": "AK11167", "name": "Anthracite Grey", "tamiya": "XF18", "gunze": "42", "realcolors": "RC297", "swatch": "#0d1e20"}, {"code": "AK11168", "name": "Pastel Blue", "gunze": "41", "swatch": "#adffa6"}, {"code": "AK11169", "name": "Blue-Green", "vallejo": "808", "ral": "5018", "fs": "35275", "citadel": "51020", "swatch": "#32a867"}, {"code": "AK11170", "name": "Aquatic Turquoise", "vallejo": "840", "swatch": "#167741", "vallejoGC": "024", "citadelNew": "Sotek Green", "citadelOld": "Hawk Turquoise"}, {"code": "AK11171", "name": "Turquoise", "vallejo": "966", "swatch": "#0c4a3e"}, {"code": "AK11172", "name": "Archaic Turquoise", "swatch": "#07312b"}, {"code": "AK11173", "name": "Ocean Blue", "tamiya": "XF50", "swatch": "#102c27"}, {"code": "AK11174", "name": "Snow Blue", "swatch": "#bdfcd9"}, {"code": "AK11175", "name": "Sky Blue", "humbrol": "47", "vallejo": "961", "testor": "1508", "revell": "50", "swatch": "#7dedc9"}, {"code": "AK11176", "name": "Deep Sky Blue", "vallejo": "844", "gunze": "323", "fs": "35250", "swatch": "#66e3c9", "vallejoGC": "095", "citadelNew": "Lothern Blue", "citadelOld": "Ice Blue"}, {"code": "AK11177", "name": "Ducat Blue", "vallejo": "841", "gunze": "25", "ral": "5012", "swatch": "#3ba4a9"}, {"code": "AK11178", "name": "Fluorescent Blue", "vallejo": "736", "swatch": "#003779"}, {"code": "AK11179", "name": "Ultramarine", "vallejo": "839", "swatch": "#001fbb", "vallejoGC": "020", "citadelNew": "Altford Guard Blue", "citadelOld": "Ultramarines Blue"}, {"code": "AK11180", "name": "Imperial Blue", "gunze": "465", "swatch": "#000c68"}, {"code": "AK11181", "name": "Dark Blue", "humbrol": "25", "vallejo": "925", "gunze": "5", "fs": "35095", "revell": "56", "citadel": "51015", "swatch": "#041c57"}, {"code": "AK11182", "name": "Deep Blue", "humbrol": "14", "vallejo": "930", "gunze": "15", "testor": "2715", "revell": "52", "realcolors": "RC010", "swatch": "#063582", "vallejoGC": "021", "citadelNew": "Caledor Sky", "citadelOld": "Enchanted Blue"}, {"code": "AK11183", "name": "Amethyst Blue", "gunze": "35", "swatch": "#151653"}, {"code": "AK11184", "name": "Medium Blue", "tamiya": "X13", "humbrol": "52", "vallejo": "963", "gunze": "88", "testor": "2702", "rlm": "24", "ral": "5019", "fs": "25102", "revell": "98", "swatch": "#0a3044"}, {"code": "AK11185", "name": "Star Blue", "gunze": "322", "swatch": "#074467"}, {"code": "AK11186", "name": "Light Prussian Blue", "tamiya": "XF8", "humbrol": "25", "vallejo": "965", "ral": "5000", "fs": "35052", "revell": "156", "swatch": "#041e32", "vallejoGC": "143", "citadelNew": "Macragge Blue", "citadelOld": "Mordian Blue"}, {"code": "AK11187", "name": "Strong Dark Blue", "gunze": "326", "fs": "35044", "swatch": "#000b19", "meng": "MC240 BLUE BLACK"}, {"code": "AK11188", "name": "Oxford", "humbrol": "104", "vallejo": "807", "revell": "350", "realcolors": "RC257", "swatch": "#1c2a3b", "vallejoGC": "048", "citadelNew": "The Fang", "citadelOld": "Shadow Grey"}, {"code": "AK11189", "name": "Dark Prussian Blue", "tamiya": "X3", "humbrol": "15", "vallejo": "899", "gunze": "5", "testor": "1511", "fs": "35048", "revell": "54", "swatch": "#010616", "vallejoGC": "020", "citadelNew": "Kantor Blue", "citadelOld": "Regal Blue"}, {"code": "AK11190", "name": "Dark Sea Blue", "tamiya": "XF17", "humbrol": "79", "vallejo": "898", "gunze": "54", "ral": "5004", "fs": "35042", "revell": "77", "swatch": "#060e0d"}, {"code": "AK11191", "name": "Gold", "gunze": "9", "fs": "17043", "swatch": "#c9a635", "meng": "MC501 GOLD"}, {"code": "AK11192", "name": "Old Gold", "swatch": "#b8943a"}, {"code": "AK11193", "name": "Rusty Gold", "swatch": "#504e12"}, {"code": "AK11194", "name": "Brass", "humbrol": "54", "vallejo": "801", "testor": "1582", "revell": "92", "citadel": "51066", "swatch": "#815607", "meng": "MC503 BRASS"}, {"code": "AK11195", "name": "Rusty Brass", "swatch": "#824604"}, {"code": "AK11196", "name": "Bronze", "humbrol": "55", "vallejo": "998", "revell": "95", "citadel": "51063", "swatch": "#7c7800", "vallejoGC": "057", "citadelNew": "Hashut Copper", "citadelOld": "Dwarft Bronze"}, {"code": "AK11197", "name": "Copper", "tamiya": "XF6", "humbrol": "12", "vallejo": "999", "gunze": "10", "testor": "1551", "revell": "93", "citadel": "51065", "swatch": "#843204"}, {"code": "AK11198", "name": "Burnt Tin", "tamiya": "XF28", "humbrol": "171", "swatch": "#21150b"}, {"code": "AK11199", "name": "Metallic Blue", "gunze": "88", "swatch": "#44ae96"}, {"code": "AK11200", "name": "Astral Beryllium", "gunze": "63", "swatch": "#388163"}, {"code": "AK11201", "name": "Cobalt Blue", "swatch": "#001532"}, {"code": "AK11202", "name": "Anodized Violet", "swatch": "#877aa5"}, {"code": "AK11203", "name": "Foundry Red", "swatch": "#c91a30"}, {"code": "AK11204", "name": "Emerald Metallic Green", "swatch": "#20980d"}, {"code": "AK11205", "name": "Metallic Green", "gunze": "89", "swatch": "#5db92b"}, {"code": "AK11206", "name": "Pearl", "swatch": "#f7facf"}, {"code": "AK11207", "name": "Aluminium", "tamiya": "XF16", "fs": "36628", "realcolors": "RC020", "swatch": "#9cb1af", "meng": "MC511 ALUMINUM"}, {"code": "AK11208", "name": "Dark Aluminium", "swatch": "#5c6f71"}, {"code": "AK11209", "name": "Silver", "tamiya": "X11", "humbrol": "11", "vallejo": "997", "gunze": "8", "testor": "1790", "fs": "17178", "revell": "90", "swatch": "#83a9a4", "vallejoGC": "052", "citadelNew": "Runefang Steel", "citadelOld": "Mithril Silver", "meng": "MC502 SILVER"}, {"code": "AK11210", "name": "Natural Steel", "tamiya": "XF56", "humbrol": "56", "vallejo": "864", "gunze": "18", "testor": "1781", "revell": "99", "swatch": "#90a799", "meng": "MC508 STEEL"}, {"code": "AK11211", "name": "Oily Steel", "humbrol": "27002", "vallejo": "865", "gunze": "38", "testor": "1401", "swatch": "#91a383", "vallejoGC": "053", "citadelNew": "Ironbreaker", "citadelOld": "Chainmail"}, {"code": "AK11212", "name": "Gun Metal", "tamiya": "X10", "humbrol": "53", "vallejo": "863", "gunze": "76", "testor": "1795", "swatch": "#2f3c3b", "vallejoGC": "054", "citadelNew": "Leadbelcher", "citadelOld": "Boltgun Metal", "meng": "MC505 GUN METAL"}, {"code": "AK11213", "name": "Clear Red", "vallejo": "934", "gunze": "90", "swatch": "#d00000", "meng": "MC101 TRANSPARENT RED"}, {"code": "AK11214", "name": "Clear Blue", "vallejo": "938", "gunze": "93", "swatch": "#001475", "meng": "MC102 TRANSPARENT BLUE"}, {"code": "AK11215", "name": "Clear Smoke", "vallejo": "939", "gunze": "95", "swatch": "#5a3a12"}, {"code": "AK11216", "name": "Clear Green", "vallejo": "936", "gunze": "94", "swatch": "#2be600", "meng": "MC104 TRANSPARENT GREEN"}, {"code": "AK11217", "name": "Clear Yellow", "vallejo": "937", "gunze": "91", "realcolors": "RC507", "swatch": "#ff8208", "meng": "MC106 TRANSPARENT YELLOW"}, {"code": "AK11218", "name": "Clear Orange", "vallejo": "935", "gunze": "92", "swatch": "#ff4200", "meng": "MC103 TRANSPARENT ORANGE"}, {"code": "AK11219", "name": "Sepia INK", "swatch": "#0b0809"}, {"code": "AK11220", "name": "Turquoise INK", "swatch": "#146a4f"}, {"code": "AK11221", "name": "Skin INK", "swatch": "#821d05"}, {"code": "AK11222", "name": "Sooty Black INK", "swatch": "#425136"}, {"code": "AK11223", "name": "Carbon Black INK", "swatch": "#040607"}, {"code": "AK11224", "name": "Purple INK", "swatch": "#a5679e"}, {"code": "AK11225", "name": "Luminous Green INK", "swatch": "#63ff03"}, {"code": "AK11226", "name": "Dark Green INK", "swatch": "#137e1c"}, {"code": "AK11227", "name": "Penetrating Red INK", "swatch": "#b12614"}, {"code": "AK11228", "name": "Night Blue INK", "swatch": "#03111f"}, {"code": "AK11229", "name": "Burnt Umber INK", "swatch": "#0a0a09"}, {"code": "AK11230", "name": "Titanium White INK", "swatch": "#ffffff"}, {"code": "AK11231", "name": "Retarder", "swatch": "#646464"}, {"code": "AK11232", "name": "Metal Medium", "swatch": "#646464"}, {"code": "AK11233", "name": "Glaze Medium", "swatch": "#646464"}, {"code": "AK11234", "name": "Matte Medium", "swatch": "#646464"}, {"code": "AK11235", "name": "Gloss Medium", "swatch": "#646464"}, {"code": "AK11236", "name": "Crackle Medium", "swatch": "#646464"}, {"code": "AK11301", "type": "AFV", "name": "WWI British Khaki Brown Base", "akold": "AK4042", "swatch": "#8a7048"}, {"code": "AK11302", "type": "AFV", "name": "WWI French Milky Coffee", "vallejo": "71027", "lifecolor": "UA097", "fs": "23448", "akold": "AK4051", "swatch": "#84703c", "meng": "MC230 FRENCH LIGHT BROWN"}, {"code": "AK11303", "type": "AFV", "name": "WWI French Artillery Grey", "vallejo": "71257", "fs": "36176", "akold": "AK4052", "swatch": "#3b5670"}, {"code": "AK11304", "type": "AFV", "name": "WWI French Brown", "fs": "31090", "akold": "AK4053", "swatch": "#30170f", "meng": "MC231 FRENCH BROWN"}, {"code": "AK11305", "type": "AFV", "name": "WWI French Green 1", "vallejo": "71006", "fs": "34097", "akold": "AK4054", "swatch": "#1e3318", "meng": "MC229 KHAKI GREEN"}, {"code": "AK11306", "type": "AFV", "name": "WWI French Green 2", "akold": "AK4055", "swatch": "#151810", "meng": "MC232 FRENCH GREEN 1"}, {"code": "AK11307", "type": "AFV", "name": "RAL 7009 Hellgrau", "ral": "7009", "hataka": "233", "realcolors": "54", "swatch": "#61631b"}, {"code": "AK11308", "type": "AFV", "name": "RAL 6007 Grün", "vallejo": "71019", "ral": "6007", "hataka": "298", "realcolors": "49", "swatch": "#2b6a10"}, {"code": "AK11309", "type": "AFV", "name": "RAL 6003 Olivgrün opt.1", "vallejo": "71092", "gunze": "H405", "lifecolor": "UA206", "ral": "6003", "hataka": "169", "realcolors": "47", "swatch": "#324c07", "meng": "MC258 GERMAN LIGHT OLIVE GREEN"}, {"code": "AK11310", "type": "AFV", "name": "RAL 6003 Olivgrün opt.2", "akold": "AK755", "swatch": "#21270a"}, {"code": "AK11311", "type": "AFV", "name": "RAL 6011 Resedagrün", "ral": "6011", "akold": "AK715", "swatch": "#487223"}, {"code": "AK11312", "type": "AFV", "name": "RAL 6011B Resedagrün", "akold": "AK716", "swatch": "#3e6318"}, {"code": "AK11313", "type": "AFV", "name": "RAL 7008 Graugrün", "vallejo": "71116", "lifecolor": "UA212", "ral": "7008", "hataka": "304", "realcolors": "53", "swatch": "#68691e"}, {"code": "AK11314", "type": "AFV", "name": "RAL 7008 Graugrün Opt 2", "swatch": "#517c19"}, {"code": "AK11315", "type": "AFV", "name": "RAL 7017 Dunkelbraun", "vallejo": "71248", "lifecolor": "UA210", "ral": "7017", "realcolors": "56", "swatch": "#31291f"}, {"code": "AK11316", "type": "AFV", "name": "RAL 7021 Dunkelgrau", "vallejo": "71056", "lifecolor": "UA207", "ral": "7021", "fs": "34086", "hataka": "164", "realcolors": "57", "swatch": "#0d1414", "meng": "MC257 GERMAN DARK GREY HIGH LIGHT"}, {"code": "AK11317", "type": "AFV", "name": "RAL 7027 Grau", "vallejo": "71118", "lifecolor": "UA202", "ral": "7027", "hataka": "306", "realcolors": "58", "swatch": "#555835"}, {"code": "AK11318", "type": "AFV", "name": "RAL 7028 Dunkelgelb (Initial)", "vallejo": "71025", "gunze": "H403", "lifecolor": "UA204", "ral": "7028", "fs": "33434", "hataka": "244", "realcolors": "60", "swatch": "#82863c", "meng": "MC256 GERMAN DARK YELLOW"}, {"code": "AK11319", "type": "AFV", "name": "RAL 7028 Dunkelgelb Ausgabe 1944", "ral": "7028", "hataka": "250", "realcolors": "61", "swatch": "#a69f66"}, {"code": "AK11320", "type": "AFV", "name": "RAL 7028 Dunkelgelb (Variant)", "ral": "7028", "swatch": "#a29743"}, {"code": "AK11323", "type": "AFV", "name": "RAL 6040 F9 Helloliv", "vallejo": "71247", "ral": "6040 F9", "hataka": "281", "realcolors": "90", "swatch": "#494a1b", "meng": "MC226 GERMAN GREY BEIGE"}, {"code": "AK11325", "type": "AFV", "name": "RAL 1039 F9 Sandbeige", "vallejo": "71244", "ral": "1039 F9", "hataka": "278", "realcolors": "88", "akold": "AK728", "swatch": "#ac964f", "meng": "MC225 GERMAN SAND BEIGE"}, {"code": "AK11326", "type": "AFV", "name": "RAL 8031 F9 Sandbraun", "vallejo": "71246", "ral": "8031 F9", "hataka": "280", "realcolors": "92", "akold": "AK727", "swatch": "#765523", "meng": "MC224 GERMAN SAND BROWN"}, {"code": "AK11327", "type": "AFV", "name": "RAL 8000 Gelbbraun", "vallejo": "71272", "lifecolor": "UA203", "ral": "8000", "hataka": "303", "realcolors": "63", "akold": "AK702", "swatch": "#6a5b27"}, {"code": "AK11328", "type": "AFV", "name": "RAL 8012 Rotbraun", "vallejo": "71271", "lifecolor": "UA211", "ral": "8012", "hataka": "175", "realcolors": "67", "akold": "AK717", "swatch": "#540b0a"}, {"code": "AK11329", "type": "AFV", "name": "RAL 8013 Rotbraun", "ral": "8013", "realcolors": "66", "akold": "AK731", "swatch": "#36070f"}, {"code": "AK11330", "type": "AFV", "name": "RAL 8017 Rotbraun", "vallejo": "71041", "gunze": "H406", "lifecolor": "UA205", "ral": "8017", "hataka": "147", "realcolors": "68", "akold": "AK718", "swatch": "#201514", "meng": "MC259 GERMAN RED BROWN"}, {"code": "AK11331", "type": "AFV", "name": "RAL 8020 Braun", "vallejo": "71117", "lifecolor": "UA201", "ral": "8020", "hataka": "35", "realcolors": "69", "akold": "AK700", "swatch": "#9b7946"}, {"code": "AK11333", "type": "AFV", "name": "Cremeweiss", "vallejo": "71075", "ral": "1001", "fs": "23717", "hataka": "184", "realcolors": "46", "akold": "AK092", "swatch": "#e0e69c"}, {"code": "AK11334", "type": "AFV", "name": "Olive Drab Base", "fs": "24098", "akold": "AK134", "swatch": "#3b4a16", "meng": "MC211 OLIVE DRAB"}, {"code": "AK11335", "type": "AFV", "name": "Nº1 Light Green (FS34151)", "vallejo": "71137", "fs": "34151", "hataka": "211", "realcolors": "28", "akold": "AK4214", "swatch": "#415f00"}, {"code": "AK11336", "type": "AFV", "name": "Nº5 Earth Brown (FS30099)", "vallejo": "71290", "lifecolor": "UA087", "fs": "30099", "hataka": "256", "akold": "AK4221", "swatch": "#322619"}, {"code": "AK11337", "type": "AFV", "name": "Nº6 Earth Yellow (FS30257)", "vallejo": "71291", "fs": "30257", "hataka": "212", "realcolors": "30", "akold": "AK4222", "swatch": "#936522"}, {"code": "AK11338", "type": "AFV", "name": "Nº8 Earth Red (FS30117)", "vallejo": "71293", "fs": "30117", "akold": "AK4223", "swatch": "#522619"}, {"code": "AK11339", "type": "AFV", "name": "Nº9 Olive Drab (FS33070)", "fs": "33070", "akold": "AK4211", "swatch": "#233211"}, {"code": "AK11340", "type": "AFV", "name": "Nº13 Desert Sand (FS30279)", "vallejo": "71140", "gunze": "H346", "lifecolor": "UA089", "fs": "30279", "hataka": "68", "akold": "AK4224", "swatch": "#937855"}, {"code": "AK11341", "type": "AFV", "name": "Ocean Gray (FS35164)", "fs": "35164", "akold": "AK4225", "swatch": "#35576d"}, {"code": "AK11342", "type": "AFV", "name": "Dark Green (FS34102)", "vallejo": "71289", "lifecolor": "UA002", "fs": "34102", "hataka": "21", "realcolors": "83", "akold": "AK4231", "swatch": "#1c300a", "meng": "MC298 U.S. OLIVE DRAB"}, {"code": "AK11343", "type": "AFV", "name": "MERDC Sand (FS30277)", "vallejo": "71138", "lifecolor": "UA019", "fs": "30277", "hataka": "187", "realcolors": "84", "akold": "AK4233", "swatch": "#6d6337"}, {"code": "AK11344", "type": "AFV", "name": "Field Drab (FS30118)", "vallejo": "71139", "lifecolor": "UA016", "fs": "30118", "hataka": "209", "realcolors": "85", "akold": "AK4234", "swatch": "#3b2e0e"}, {"code": "AK11345", "type": "AFV", "name": "APC Interior Light Green (FS24533)", "fs": "24533", "realcolors": "78", "akold": "AK4012", "swatch": "#bbde92", "meng": "MC204 LIGHT GREYISH GREEN; MC233 RUSSIAN VEHICLE INTERIOR GREEN (+10% AK11005)"}, {"code": "AK11346", "type": "AFV", "name": "Forest Green (FS34079)", "vallejo": "71294", "lifecolor": "UA001", "fs": "34079", "hataka": "16", "realcolors": "27", "swatch": "#16280a"}, {"code": "AK11347", "type": "AFV", "name": "Australian Camouflage Brown", "fs": "30219", "akold": "AK4022", "swatch": "#948445"}, {"code": "AK11348", "type": "AFV", "name": "Australian Camouflage Green", "fs": "34088", "akold": "AK4021", "swatch": "#415f00"}, {"code": "AK11349", "type": "AFV", "name": "CARC Tan 686A (FS33446)", "vallejo": "71122", "gunze": "53", "fs": "33446", "realcolors": "79", "akold": "AK122", "swatch": "#a68a52", "meng": "MC201 U.S. DESERT TAN"}, {"code": "AK11350", "type": "AFV", "name": "Modern Spanish Green", "swatch": "#345013"}, {"code": "AK11351", "type": "AFV", "name": "Wood Base", "fs": "23564", "akold": "AK779", "swatch": "#8f9357", "meng": "MC296 WOODEN DECK"}, {"code": "AK11352", "type": "AFV", "name": "IDF Modern Grey", "gunze": "C530", "realcolors": "94", "swatch": "#50491b"}, {"code": "AK11353", "type": "AFV", "name": "IDF Sand Grey 1970s-1980s", "vallejo": "71142", "gunze": "C529", "testor": "2138", "realcolors": "95", "swatch": "#585827"}, {"code": "AK11354", "type": "AFV", "name": "IDF Early Sand Yellow", "vallejo": "71141", "gunze": "C528", "realcolors": "96", "swatch": "#787836"}, {"code": "AK11355", "type": "AFV", "name": "IDF Green", "swatch": "#1a270d"}, {"code": "AK11356", "type": "AFV", "name": "SLA Blue", "fs": "34158", "akold": "AK794", "swatch": "#306050"}, {"code": "AK11357", "type": "AFV", "name": "LAF Green", "akold": "AK795", "swatch": "#192315"}, {"code": "AK11358", "type": "AFV", "name": "NATO Green", "vallejo": "71250", "lifecolor": "UA303", "ral": "6031 F9", "hataka": "152", "realcolors": "80", "akold": "AK796", "swatch": "#173411", "meng": "MC222 NATO GREEN"}, {"code": "AK11359", "type": "AFV", "name": "NATO Brown", "vallejo": "71249", "lifecolor": "UA302", "ral": "8027 F9", "hataka": "188", "realcolors": "81", "akold": "AK797", "swatch": "#2c2119", "meng": "MC223 NATO BROWN"}, {"code": "AK11360", "type": "AFV", "name": "NATO Black", "vallejo": "71251", "lifecolor": "UA301", "ral": "9021 F9", "hataka": "125", "realcolors": "82", "akold": "AK799", "swatch": "#11151a", "meng": "MC221 NATO BLACK"}, {"code": "AK11361", "type": "AFV", "name": "New Iraqi Army Sand", "fs": "23531", "akold": "AK725", "swatch": "#d0bc6d", "meng": "MC242 PALE SAND"}, {"code": "AK11362", "type": "AFV", "name": "British Sand Yellow", "fs": "33695", "akold": "AK726", "swatch": "#de9b28"}, {"code": "AK11363", "type": "AFV", "name": "French Army Desert Sand", "vallejo": "71064", "fs": "17178", "akold": "AK4081", "swatch": "#c9a05e"}, {"code": "AK11364", "type": "AFV", "name": "French Army Green", "akold": "AK4082", "swatch": "#33533c"}, {"code": "AK11365", "type": "AFV", "name": "French Army Grey-Blue", "gunze": "H417", "akold": "AK4083", "swatch": "#7d9388", "meng": "MC228 FRENCH UNIFORM GREY"}, {"code": "AK11366", "type": "AFV", "name": "Mustard Yellow", "vallejo": "71033", "fs": "33637", "akold": "AK4132", "swatch": "#be911a"}, {"code": "AK11367", "type": "AFV", "name": "Base Green (Protective)", "swatch": "#1d2713", "meng": "MC217 RUSSIAN GREEN 1"}, {"code": "AK11368", "type": "AFV", "name": "Russian Green 4BO", "vallejo": "71017", "gunze": "136", "testor": "2129", "realcolors": "73", "swatch": "#264510"}, {"code": "AK11369", "type": "AFV", "name": "Russian Dark Brown 6K", "vallejo": "71282", "testor": "2126", "hataka": "317", "realcolors": "74", "swatch": "#1f1e0b"}, {"code": "AK11370", "type": "AFV", "name": "Russian Sand 7K", "vallejo": "71283", "lifecolor": "UA242", "hataka": "318", "realcolors": "75", "swatch": "#6c5319"}, {"code": "AK11371", "type": "AFV", "name": "Protective Green 1920s-1930s", "realcolors": "76", "swatch": "#132b0d"}, {"code": "AK11372", "type": "AFV", "name": "Washable White Paint", "akold": "AK751", "swatch": "#ffffff"}, {"code": "AK11373", "type": "AFV", "name": "Khaki green No.3", "vallejo": "71330", "hataka": "64", "realcolors": "33", "akold": "AK4035", "swatch": "#333121"}, {"code": "AK11374", "type": "AFV", "name": "Silver Grey No.28", "vallejo": "71401", "lifecolor": "UA264", "realcolors": "38", "akold": "AK4032", "swatch": "#839b47"}, {"code": "AK11375", "type": "AFV", "name": "Slate No.34", "vallejo": "71012", "gunze": "H73", "lifecolor": "UA265", "realcolors": "39", "akold": "AK4033", "swatch": "#324019"}, {"code": "AK11377", "type": "AFV", "name": "Light Stone No.61", "vallejo": "71143", "lifecolor": "UA266", "realcolors": "40", "akold": "AK4034", "swatch": "#c59e30"}, {"code": "AK11378", "type": "AFV", "name": "Portland Stone No.64", "vallejo": "71288", "lifecolor": "UA267", "realcolors": "41", "akold": "AK4031", "swatch": "#e1c07c"}, {"code": "AK11381", "type": "AFV", "name": "British Dark Olive Green PFI", "lifecolor": "UA269", "realcolors": "42", "swatch": "#2e361d"}, {"code": "AK11382", "type": "AFV", "name": "British Desert Pink ZI", "vallejo": "71400", "lifecolor": "UA268", "realcolors": "43", "swatch": "#fc785c"}, {"code": "AK11383", "type": "AFV", "name": "British Light Mud", "vallejo": "71284", "lifecolor": "UA272", "realcolors": "44", "swatch": "#a89570"}, {"code": "AK11384", "type": "AFV", "name": "S.C.C. No.1A Very Dark Brown", "vallejo": "71039", "lifecolor": "UA274", "fs": "30059", "hataka": "77", "realcolors": "34", "swatch": "#241c16"}, {"code": "AK11385", "type": "AFV", "name": "S.C.C. No.2 Brown", "vallejo": "71038", "lifecolor": "UA273", "fs": "30097", "hataka": "76", "realcolors": "35", "swatch": "#653a1c"}, {"code": "AK11386", "type": "AFV", "name": "S.C.C. No.15 Olive Drab", "vallejo": "71016", "gunze": "H309", "lifecolor": "UA270", "hataka": "110", "realcolors": "37", "swatch": "#273217"}, {"code": "AK11387", "type": "AFV", "name": "3B AU/ZB AU", "vallejo": "71281", "hataka": "246", "realcolors": "77", "swatch": "#0d120c"}, {"code": "AK11401", "type": "FIG", "name": "Base Flesh", "vallejo": "70341", "fs": "30233", "akold": "AK3011", "swatch": "#683522"}, {"code": "AK11402", "type": "FIG", "name": "Light Flesh", "fs": "31433", "akold": "AK3012", "swatch": "#ce847a", "meng": "MC052 FLESH 2"}, {"code": "AK11403", "type": "FIG", "name": "Highlight Flesh", "vallejo": "70342", "akold": "AK3013", "swatch": "#ffc49c"}, {"code": "AK11404", "type": "FIG", "name": "Shadow Flesh", "fs": "31136", "akold": "AK3014", "swatch": "#7f2939"}, {"code": "AK11405", "type": "FIG", "name": "Dark Shadow Flesh", "humbrol": "73", "vallejo": "982", "akold": "AK3015", "swatch": "#3e1620", "vallejoGC": "011", "citadelNew": "Wazdakka Red", "citadelOld": "Red Gore"}, {"code": "AK11406", "type": "FIG", "name": "Reddish Black", "fs": "10049", "akold": "AK3016", "swatch": "#20121a"}, {"code": "AK11407", "type": "FIG", "name": "Black Uniform Base", "vallejo": "70306", "gunze": "C137", "lifecolor": "UA733", "fs": "26081", "akold": "AK3002", "swatch": "#06090a"}, {"code": "AK11408", "type": "FIG", "name": "Dot44 Brown Base", "akold": "AK3021", "swatch": "#373421"}, {"code": "AK11409", "type": "FIG", "name": "Orange Tan", "fs": "32516", "akold": "AK3022", "swatch": "#c27e39"}, {"code": "AK11410", "type": "FIG", "name": "Dark Green", "akold": "AK3023", "swatch": "#102114"}, {"code": "AK11411", "type": "FIG", "name": "Light Green", "akold": "AK3024", "swatch": "#5ea820"}, {"code": "AK11412", "type": "FIG", "name": "Medium Green", "vallejo": "70348", "gunze": "H303", "lifecolor": "UA002", "fs": "34102", "akold": "AK3025", "swatch": "#153309", "meng": "MC284 JAPANESE ARMY DARK GREEN"}, {"code": "AK11413", "type": "FIG", "name": "Denison Tan Base", "vallejo": "70339", "fs": "30227", "akold": "AK3026", "swatch": "#795b36"}, {"code": "AK11414", "type": "FIG", "name": "Splittermuster Base", "vallejo": "70332", "fs": "33303", "akold": "AK3041", "swatch": "#576330"}, {"code": "AK11415", "type": "FIG", "name": "Splittermuster Green Spots", "fs": "34095", "akold": "AK3043", "swatch": "#1a3212"}, {"code": "AK11416", "type": "FIG", "name": "Waffen Brown Grey", "akold": "AK3051", "swatch": "#2e2721"}, {"code": "AK11417", "type": "FIG", "name": "Waffen Brown", "vallejo": "875", "fs": "30045", "akold": "AK3055", "swatch": "#462f19", "vallejoGC": "043", "citadelNew": "Mourfang Brown", "citadelOld": "Bestial Brown"}, {"code": "AK11418", "type": "FIG", "name": "Brown Black", "vallejo": "70333", "akold": "AK3056", "swatch": "#0e0b0b"}, {"code": "AK11419", "type": "FIG", "name": "Waffen Red Brown", "humbrol": "160", "vallejo": "984", "ral": "8011", "fs": "30108", "akold": "AK3061", "swatch": "#2f1a1b"}, {"code": "AK11420", "type": "FIG", "name": "Waffen Green", "akold": "AK3065", "swatch": "#1c360d"}, {"code": "AK11421", "type": "FIG", "name": "Dark Olive Green", "fs": "34094", "akold": "AK3071", "swatch": "#162908"}, {"code": "AK11422", "type": "FIG", "name": "Ocher Khaki", "humbrol": "93", "vallejo": "824", "fs": "30266", "akold": "AK3072", "swatch": "#8d7e25", "meng": "MC285 KHAKI DRAB"}, {"code": "AK11423", "type": "FIG", "name": "Field Grey Base #2 (Grey Uniform)", "humbrol": "79", "vallejo": "867", "gunze": "68", "fs": "36099", "akold": "AK3142", "swatch": "#273625"}, {"code": "AK11424", "type": "FIG", "name": "Grey Green", "fs": "34424", "akold": "AK3143", "swatch": "#849737"}, {"code": "AK11425", "type": "FIG", "name": "Field Grey Base #1 (Green uniform)", "humbrol": "75", "vallejo": "897", "fs": "34052", "swatch": "#272e14", "vallejoGC": "067", "citadelNew": "Castellan Green", "citadelOld": "Catachan Green", "meng": "MC250 FIELD GREY"}, {"code": "AK11426", "type": "FIG", "name": "Grey Blue", "vallejo": "70338", "akold": "AK3146", "swatch": "#5a7674"}, {"code": "AK11427", "type": "FIG", "name": "Green Uniform Base", "vallejo": "70335", "fs": "16165", "akold": "AK3114", "swatch": "#192b0d"}, {"code": "AK11428", "type": "FIG", "name": "Light Green Uniform", "vallejo": "70336", "akold": "AK3115", "swatch": "#3a5d0e"}, {"code": "AK11429", "type": "FIG", "name": "Russian Uniform Lights", "fs": "34258", "akold": "AK3121", "swatch": "#527800"}, {"code": "AK11430", "type": "FIG", "name": "Russian Uniform Base", "vallejo": "70327", "fs": "34098", "akold": "AK3122", "swatch": "#3c5a03"}, {"code": "AK11431", "type": "FIG", "name": "Russian Blue Lights", "akold": "AK3124", "swatch": "#0d1a2f"}, {"code": "AK11432", "type": "FIG", "name": "Russian Blue Base", "vallejo": "70309", "akold": "AK3125", "swatch": "#050c19"}, {"code": "AK11433", "type": "FIG", "name": "US Olive Base Uniform", "swatch": "#363e07"}, {"code": "AK11434", "type": "FIG", "name": "Red Brown", "vallejo": "70343", "akold": "AK3073", "swatch": "#602a27", "meng": "MC249 BROWN CLAY"}, {"code": "AK11435", "type": "FIG", "name": "Field Drab", "vallejo": "873", "akold": "AK3075", "swatch": "#634528"}, {"code": "AK11436", "type": "FIG", "name": "Canvas Tone", "vallejo": "988", "akold": "AK3076", "swatch": "#353b16", "meng": "MC058 LEATHER 2"}, {"code": "AK11437", "type": "FIG", "name": "British Uniform Base", "vallejo": "70317", "fs": "16160", "akold": "AK3081", "swatch": "#543f1e"}, {"code": "AK11438", "type": "FIG", "name": "British Uniform Lights", "vallejo": "70321", "fs": "20475", "akold": "AK3082", "swatch": "#745a17"}, {"code": "AK11439", "type": "FIG", "name": "French Greyish Blue", "fs": "35109", "akold": "AK3101", "swatch": "#2b474e"}, {"code": "AK11440", "type": "FIG", "name": "Desert Uniform Base", "akold": "AK3111", "swatch": "#865c00"}, {"code": "AK11801", "type": "AIR", "name": "WWI German Fokker Grey", "vallejo": "71033", "akold": "AK2271", "swatch": "#8a8f85"}, {"code": "AK11802", "type": "AIR", "name": "WWI German Light Green", "akold": "AK2272", "swatch": "#769460"}, {"code": "AK11803", "type": "AIR", "name": "WWI German Dark Green", "vallejo": "71017", "akold": "AK2273", "swatch": "#344731"}, {"code": "AK11804", "type": "AIR", "name": "WWI German Mauve", "vallejo": "71282", "akold": "AK2274", "swatch": "#826881"}, {"code": "AK11805", "type": "AIR", "name": "WWI German Red Brown", "vallejo": "71283", "akold": "AK2275", "citadel": "51040", "swatch": "#673615"}, {"code": "AK11806", "type": "AIR", "name": "WWI German Light Blue", "akold": "AK2276", "swatch": "#c8deec"}, {"code": "AK11807", "type": "AIR", "name": "WWI German Lilac", "akold": "AK2277", "swatch": "#b193af"}, {"code": "AK11808", "type": "AIR", "name": "WWI German Grey-Green Primer", "vallejo": "71330", "akold": "AK2278", "swatch": "#b7c4aa"}, {"code": "AK11809", "type": "AIR", "name": "PC10 Late", "vallejo": "71401", "akold": "AK2282", "swatch": "#3d422c"}, {"code": "AK11810", "type": "AIR", "name": "PC12", "vallejo": "71012", "akold": "AK2283", "swatch": "#40372e"}, {"code": "AK11811", "type": "AIR", "name": "RLM 02 RLM-Grau (1938)", "tamiya": "XF-20", "humbrol": "240", "vallejo": "71044", "gunze": "C60/H70", "lifecolor": "UA504", "hataka": "23", "realcolors": "265", "swatch": "#979481"}, {"code": "AK11812", "type": "AIR", "name": "RLM 02 RLM-Grau (1941)", "realcolors": "266", "swatch": "#80805e"}, {"code": "AK11813", "type": "AIR", "name": "RLM 04", "humbrol": "154", "vallejo": "71078", "gunze": "C113/H413", "lifecolor": "UA140", "hataka": "66", "realcolors": "267", "akold": "AK2091", "swatch": "#f1a60d"}, {"code": "AK11814", "type": "AIR", "name": "RLM 61", "vallejo": "71042", "hataka": "168", "realcolors": "268", "swatch": "#57524e"}, {"code": "AK11815", "type": "AIR", "name": "RLM 62", "vallejo": "71104", "hataka": "169", "realcolors": "269", "swatch": "#676a4f"}, {"code": "AK11816", "type": "AIR", "name": "RLM 63", "vallejo": "71260", "hataka": "167", "realcolors": "270", "swatch": "#7e7b6a"}, {"code": "AK11817", "type": "AIR", "name": "RLM 65 (1938)", "humbrol": "65", "realcolors": "271", "swatch": "#86a2a5"}, {"code": "AK11818", "type": "AIR", "name": "RLM 65 (1941)", "tamiya": "XF-23", "vallejo": "71255", "gunze": "C115/H67", "lifecolor": "UA503", "hataka": "29", "realcolors": "272", "swatch": "#94a198"}, {"code": "AK11819", "type": "AIR", "name": "RLM 66 (1938)", "vallejo": "71055", "gunze": "C116/H416", "lifecolor": "UA133", "hataka": "40", "realcolors": "339", "swatch": "#363e40"}, {"code": "AK11820", "type": "AIR", "name": "RLM 66 (1941)", "realcolors": "273", "swatch": "#53524d"}, {"code": "AK11821", "type": "AIR", "name": "RLM 70", "tamiya": "XF-27", "humbrol": "241", "vallejo": "71021", "gunze": "C18/H65", "lifecolor": "UA501", "hataka": "15", "realcolors": "274", "citadel": "51004", "swatch": "#474a41"}, {"code": "AK11822", "type": "AIR", "name": "RLM 71", "humbrol": "242", "vallejo": "71015", "gunze": "C17/H64", "lifecolor": "UA502", "hataka": "17", "realcolors": "275", "swatch": "#514f43"}, {"code": "AK11823", "type": "AIR", "name": "RLM 72", "humbrol": "243", "vallejo": "71263", "hataka": "311", "realcolors": "276", "swatch": "#464742"}, {"code": "AK11824", "type": "AIR", "name": "RLM 73", "humbrol": "244", "vallejo": "71256", "hataka": "312", "realcolors": "277", "swatch": "#424941"}, {"code": "AK11825", "type": "AIR", "name": "RLM 74", "humbrol": "245", "vallejo": "71258", "gunze": "C36/H68", "lifecolor": "UA507", "hataka": "313", "realcolors": "278", "swatch": "#5b5a55"}, {"code": "AK11826", "type": "AIR", "name": "RLM 75", "humbrol": "246", "vallejo": "71259", "gunze": "C37/H69", "lifecolor": "UA508", "hataka": "7", "realcolors": "279", "swatch": "#706f6d"}, {"code": "AK11827", "type": "AIR", "name": "RLM 76 Version 1", "realcolors": "320", "swatch": "#a9b6a5"}, {"code": "AK11828", "type": "AIR", "name": "RLM 76 Version 2", "humbrol": "247", "vallejo": "71257", "gunze": "C117/H417", "lifecolor": "UA509", "hataka": "38", "realcolors": "321", "swatch": "#adbdbd"}, {"code": "AK11829", "type": "AIR", "name": "RLM 76 Late War Variation", "vallejo": "71103", "realcolors": "322", "swatch": "#c1c19d"}, {"code": "AK11830", "type": "AIR", "name": "RLM 78 (1941)", "realcolors": "280", "swatch": "#80979f"}, {"code": "AK11831", "type": "AIR", "name": "RLM 78 (1942)", "humbrol": "248", "vallejo": "71101", "gunze": "C118/H418", "lifecolor": "UA512", "hataka": "314", "realcolors": "281", "swatch": "#889d98"}, {"code": "AK11832", "type": "AIR", "name": "RLM 79 (1941)", "hataka": "14", "realcolors": "282", "swatch": "#e8a25a"}, {"code": "AK11833", "type": "AIR", "name": "RLM 79 (1942)", "humbrol": "249", "vallejo": "71278", "gunze": "C119/H66", "lifecolor": "UA137", "realcolors": "283", "swatch": "#9c714e"}, {"code": "AK11834", "type": "AIR", "name": "RLM 80", "vallejo": "71265", "gunze": "C120/H420", "lifecolor": "UA138", "hataka": "53", "realcolors": "284", "swatch": "#585745"}, {"code": "AK11835", "type": "AIR", "name": "RLM 81 Version 1", "tamiya": "XF-51", "humbrol": "251", "vallejo": "71264", "gunze": "C121/H421", "lifecolor": "UA510", "hataka": "8", "realcolors": "323", "swatch": "#585745"}, {"code": "AK11836", "type": "AIR", "name": "RLM 81 Version 2", "tamiya": "XF-74", "humbrol": "253", "vallejo": "71011", "gunze": "C123/H423", "lifecolor": "UA132", "hataka": "22", "realcolors": "324", "swatch": "#474d3f"}, {"code": "AK11837", "type": "AIR", "name": "RLM 81 Version 3", "realcolors": "325", "swatch": "#5a5245"}, {"code": "AK11838", "type": "AIR", "name": "RLM 82", "humbrol": "252", "vallejo": "71022", "gunze": "C122/H422", "lifecolor": "UA511", "hataka": "20", "realcolors": "326", "swatch": "#4f5c4b"}, {"code": "AK11839", "type": "AIR", "name": "RLM 83", "realcolors": "327", "swatch": "#394555"}, {"code": "AK11840", "type": "AIR", "name": "RAF Dark Green", "tamiya": "XF-81", "humbrol": "163", "vallejo": "71324", "gunze": "C330/H330", "lifecolor": "UA546", "ral": "BS381C/ 241", "hataka": "143", "realcolors": "286", "swatch": "#57574d"}, {"code": "AK11841", "type": "AIR", "name": "RAF Dark Earth", "humbrol": "29", "vallejo": "71323", "gunze": "C369/H72", "lifecolor": "UA547", "hataka": "9", "realcolors": "287", "swatch": "#72573c"}, {"code": "AK11842", "type": "AIR", "name": "RAF Ocean Grey", "tamiya": "XF-82", "humbrol": "106", "vallejo": "71273", "gunze": "C362", "lifecolor": "UA093", "hataka": "32", "realcolors": "288", "swatch": "#5d686a"}, {"code": "AK11843", "type": "AIR", "name": "RAF Medium Sea Grey BS381C/637", "tamiya": "XF-83", "humbrol": "165", "vallejo": "71307", "gunze": "C335/H335", "lifecolor": "UA094", "ral": "BS381C/ 637", "hataka": "034/ 141", "realcolors": "289", "swatch": "#818c92"}, {"code": "AK11844", "type": "AIR", "name": "RAF Sky / FS 34424", "vallejo": "71321", "gunze": "C368", "lifecolor": "UA550", "fs": "FS 34424", "hataka": "234", "realcolors": "290", "swatch": "#b3b7a0"}, {"code": "AK11845", "type": "AIR", "name": "RAF Azure Blue", "humbrol": "157", "vallejo": "71108", "gunze": "C370", "lifecolor": "UA098", "hataka": "28", "realcolors": "291", "citadel": "51024", "swatch": "#7d9dc4"}, {"code": "AK11846", "type": "AIR", "name": "RAF Middle Stone", "humbrol": "225", "vallejo": "71031", "gunze": "C21/H71", "lifecolor": "UA097", "hataka": "13", "realcolors": "292", "swatch": "#b7a06a"}, {"code": "AK11847", "type": "AIR", "name": "RAF Cockpit Grey-Green", "tamiya": "XF-71", "humbrol": "78", "vallejo": "71305", "gunze": "C364", "lifecolor": "UA551", "hataka": "25", "realcolors": "293", "swatch": "#738168"}, {"code": "AK11848", "type": "AIR", "name": "RAF Sky Grey", "vallejo": "71339", "lifecolor": "UA036", "fs": "FS 26373", "hataka": "302", "realcolors": "285", "swatch": "#a1a5a4"}, {"code": "AK11849", "type": "AIR", "name": "RAF Dark Slate Grey", "humbrol": "224", "vallejo": "71309", "hataka": "202", "realcolors": "294", "swatch": "#5f5d51"}, {"code": "AK11850", "type": "AIR", "name": "RAF Extra Dark Sea Grey BS381C/640", "tamiya": "XF-54", "humbrol": "123", "vallejo": "71110", "gunze": "C333/H333", "lifecolor": "UA109", "ral": "BS381C/ 640", "hataka": "140", "realcolors": "295", "swatch": "#4f565e"}, {"code": "AK11851", "type": "AIR", "name": "RAF Dark Sea Grey BS381C/638", "tamiya": "XF-77", "humbrol": "164", "vallejo": "71405", "gunze": "C331/H331", "ral": "BS381C/ 638", "hataka": "144", "realcolors": "296", "citadel": "51040", "swatch": "#696c71"}, {"code": "AK11852", "type": "AIR", "name": "RAF PRU Blue BS381C/636", "tamiya": "XF-18", "humbrol": "230", "vallejo": "71109", "gunze": "C72/H56", "ral": "BS381C/ 636", "hataka": "207", "realcolors": "297", "swatch": "#556b76"}, {"code": "AK11853", "type": "AIR", "name": "RAF Light Aircraft Grey BS381C/627", "humbrol": "166", "gunze": "C332/H332", "ral": "BS381C/ 627", "hataka": "217", "realcolors": "298", "swatch": "#b1b2aa"}, {"code": "AK11854", "type": "AIR", "name": "RAF Camouflage (Barley) Grey BS381C/626", "tamiya": "XF-80", "humbrol": "167", "gunze": "C334/H334", "lifecolor": "UA079", "ral": "BS381C/ 626", "hataka": "142", "realcolors": "299", "swatch": "#979d9d"}, {"code": "AK11855", "type": "AIR", "name": "RAF Dark Camouflage Grey BS381C/629", "ral": "BS381C/ 629", "hataka": "214", "realcolors": "300", "swatch": "#72797f"}, {"code": "AK11856", "type": "AIR", "name": "RAF Camouflage Beige (Hemp) BS381C/389", "tamiya": "XF-57", "humbrol": "168", "gunze": "C336/H336", "ral": "BS381C/ 389", "hataka": "262", "realcolors": "301", "swatch": "#9d9580"}, {"code": "AK11857", "type": "AIR", "name": "Bronze Green", "realcolors": "264", "akold": "AK2205", "swatch": "#293625"}, {"code": "AK11858", "type": "AIR", "name": "Zinc Chromate Yellow", "vallejo": "71107", "gunze": "C352", "realcolors": "263", "akold": "AK2207", "swatch": "#e2d10f"}, {"code": "AK11859", "type": "AIR", "name": "US Interior Yellow Green", "realcolors": "262", "akold": "AK2206", "swatch": "#848566"}, {"code": "AK11860", "type": "AIR", "name": "Dark Olive Drab 41", "tamiya": "XF-62", "vallejo": "71316", "gunze": "C38/H78", "lifecolor": "UA005", "fs": "FS 33070", "hataka": "4", "realcolors": "259", "akold": "AK2201", "swatch": "#535041"}, {"code": "AK11861", "type": "AIR", "name": "Medium Green 42", "hataka": "19", "realcolors": "260", "akold": "AK2202", "swatch": "#47533f"}, {"code": "AK11862", "type": "AIR", "name": "Neutral Grey 43", "vallejo": "71051", "gunze": "C13/H53", "lifecolor": "UA046", "hataka": "33", "realcolors": "261", "akold": "AK2203", "swatch": "#6c6d68"}, {"code": "AK11863", "type": "AIR", "name": "ANA 613 Olive Drab", "ral": "RAL 7013", "akold": "AK2204", "swatch": "#5b5849"}, {"code": "AK11864", "type": "AIR", "name": "Deep Sea Blue", "humbrol": "181", "vallejo": "71300", "gunze": "C365", "lifecolor": "UA047", "fs": "FS 35045", "hataka": "1", "realcolors": "258", "akold": "AK2234", "swatch": "#37464d"}, {"code": "AK11865", "type": "AIR", "name": "M-485 Blue-Grey", "vallejo": "71109", "gunze": "C367", "lifecolor": "UA038", "fs": "FS 35189", "hataka": "218", "realcolors": "256", "akold": "AK2231", "swatch": "#72858b"}, {"code": "AK11866", "type": "AIR", "name": "Light Gull Grey FS 16440", "humbrol": "129", "vallejo": "71121", "gunze": "C315/H315", "lifecolor": "UA025", "fs": "FS 16440", "hataka": "48", "realcolors": "220", "swatch": "#afafa5"}, {"code": "AK11867", "type": "AIR", "name": "ADC Grey FS 16473", "vallejo": "71335", "lifecolor": "UA041", "fs": "FS 16473", "hataka": "45", "realcolors": "221", "akold": "AK2146", "citadel": "51004", "swatch": "#9faaa6"}, {"code": "AK11868", "type": "AIR", "name": "Insignia White FS 17875", "tamiya": "X-1", "humbrol": "22", "vallejo": "72279", "gunze": "C316/H316", "lifecolor": "UA148", "fs": "FS 17875", "hataka": "49", "realcolors": "222", "akold": "AK2052", "swatch": "#e6e8db"}, {"code": "AK11869", "type": "AIR", "name": "Sand FS 33531", "tamiya": "XF-59", "humbrol": "121", "vallejo": "71327", "gunze": "C313/H313", "fs": "FS 33531", "hataka": "90", "realcolors": "226", "akold": "AK2151", "swatch": "#c6b49e"}, {"code": "AK11870", "type": "AIR", "name": "Radome Tan FS 33613", "humbrol": "148", "vallejo": "71074", "gunze": "C318/H318", "fs": "FS 33613", "realcolors": "227", "akold": "AK2053", "swatch": "#e5c7a1"}, {"code": "AK11871", "type": "AIR", "name": "USMC Sand FS 33711", "lifecolor": "UA090", "fs": "FS 33711", "hataka": "60", "realcolors": "228", "swatch": "#f9d193"}, {"code": "AK11872", "type": "AIR", "name": "US Army Helo Drab FS 34031", "fs": "FS 34031", "hataka": "67", "realcolors": "229", "swatch": "#474843"}, {"code": "AK11873", "type": "AIR", "name": "Dull Dark Green FS 34092", "tamiya": "XF-26", "humbrol": "149", "vallejo": "71124", "gunze": "C302/H302", "lifecolor": "UA008", "fs": "FS 34092", "hataka": "56", "realcolors": "230", "akold": "AK2106", "swatch": "#4a5952"}, {"code": "AK11874", "type": "AIR", "name": "USMC Green FS 34095", "ral": "RAL 6003", "fs": "FS 34095", "hataka": "59", "realcolors": "209", "swatch": "#585c1f"}, {"code": "AK11875", "type": "AIR", "name": "Field Green FS 34097", "gunze": "C340/H340", "fs": "FS 34097", "realcolors": "231", "swatch": "#696e2b"}, {"code": "AK11876", "type": "AIR", "name": "Green FS 34258", "vallejo": "71094", "lifecolor": "UA115", "fs": "FS 34258", "hataka": "93", "realcolors": "233", "akold": "AK2153", "swatch": "#80825b"}, {"code": "AK11877", "type": "AIR", "name": "Aggressor Blue FS 35109", "vallejo": "71111", "lifecolor": "UA404", "fs": "FS 35109", "hataka": "156", "realcolors": "234", "swatch": "#3b6c70"}, {"code": "AK11878", "type": "AIR", "name": "Blue FS 35190", "vallejo": "70901", "fs": "FS 35190", "realcolors": "236", "swatch": "#5c979f"}, {"code": "AK11879", "type": "AIR", "name": "Air Superiority Blue FS 35450", "humbrol": "47", "vallejo": "71332", "lifecolor": "UA037", "fs": "FS 35450", "hataka": "155", "realcolors": "239", "akold": "AK2145", "swatch": "#8ab0c3"}, {"code": "AK11880", "type": "AIR", "name": "Duck Egg Blue FS 35622", "humbrol": "122", "vallejo": "71328", "gunze": "C314/H314", "lifecolor": "UA139", "fs": "FS 35622", "hataka": "92", "realcolors": "241", "akold": "AK2154", "swatch": "#c4d0c6"}, {"code": "AK11881", "type": "AIR", "name": "Medium Gunship Grey FS 36118", "tamiya": "XF-24", "humbrol": "125", "vallejo": "71097", "gunze": "C305/H305", "lifecolor": "UA022", "fs": "FS 36118", "hataka": "31", "realcolors": "244", "akold": "AK2144", "swatch": "#6e7570"}, {"code": "AK11882", "type": "AIR", "name": "Have Glass Grey FS 36170", "fs": "FS 36170", "hataka": "58", "realcolors": "245", "swatch": "#706f6d"}, {"code": "AK11883", "type": "AIR", "name": "F-15 Dark Grey (Mod Eagle) FS 36176", "humbrol": "5", "vallejo": "71273", "lifecolor": "UA029", "fs": "FS 36176", "hataka": "158", "realcolors": "246", "akold": "AK2143", "swatch": "#6f7982"}, {"code": "AK11884", "type": "AIR", "name": "Dark Gull Grey FS 36231", "humbrol": "140", "vallejo": "71277", "gunze": "C317/H317", "lifecolor": "UA033", "fs": "FS 36231", "hataka": "44", "realcolors": "247", "swatch": "#808487"}, {"code": "AK11885", "type": "AIR", "name": "Aggressor Grey FS 36251", "vallejo": "71274", "lifecolor": "UA034", "fs": "FS 36251", "hataka": "157", "realcolors": "248", "akold": "AK2142", "swatch": "#828385"}, {"code": "AK11886", "type": "AIR", "name": "Medium Grey FS 36270", "humbrol": "126", "vallejo": "71275", "gunze": "C306/H306", "lifecolor": "UA028", "fs": "FS 36270", "hataka": "54", "realcolors": "249", "akold": "AK2141", "swatch": "#84898c"}, {"code": "AK11887", "type": "AIR", "name": "Dark Ghost Grey FS 36320", "humbrol": "128", "vallejo": "71120", "gunze": "C307/H307", "lifecolor": "UA027", "fs": "FS 36320", "hataka": "35", "realcolors": "251", "swatch": "#87949c"}, {"code": "AK11888", "type": "AIR", "name": "Light Ghost Grey FS 36375", "humbrol": "127", "vallejo": "71615", "gunze": "C308/H308", "lifecolor": "UA026", "fs": "FS 36375", "hataka": "37", "realcolors": "252", "swatch": "#9da6ab"}, {"code": "AK11889", "type": "AIR", "name": "Light Grey FS 36495", "humbrol": "147", "vallejo": "71276", "gunze": "C338/H338", "lifecolor": "UA023", "fs": "FS 36495", "hataka": "50", "realcolors": "253", "swatch": "#c4c8c7"}, {"code": "AK11890", "type": "AIR", "name": "Camouflage Grey FS 36622", "humbrol": "28", "vallejo": "71296", "gunze": "C311/H311", "lifecolor": "UA021", "fs": "FS 36622", "hataka": "39", "realcolors": "254", "akold": "AK2104", "swatch": "#c2c0b3"}, {"code": "AK11891", "type": "AIR", "name": "IJN J3 Hai-iro (Grey)", "gunze": "C35/H61", "fs": "FS 36307", "realcolors": "302", "akold": "AK2061", "citadel": "51024", "swatch": "#909388"}, {"code": "AK11892", "type": "AIR", "name": "IJN J3 SP (Amber Grey)", "vallejo": "71311", "realcolors": "303", "akold": "AK2062", "swatch": "#958f75"}, {"code": "AK11893", "type": "AIR", "name": "IJN D1 Deep Green Black", "tamiya": "XF-11", "vallejo": "71325", "gunze": "C15/H59", "realcolors": "304", "akold": "AK2063", "swatch": "#2a362c"}, {"code": "AK11894", "type": "AIR", "name": "IJN D2 Green Black", "vallejo": "71322", "realcolors": "305", "akold": "AK2064", "swatch": "#263731"}, {"code": "AK11895", "type": "AIR", "name": "IJN Q1 Anti-Glare Blue-Black", "gunze": "C125", "akold": "AK2066", "swatch": "#1b2325"}, {"code": "AK11896", "type": "AIR", "name": "IJN M3 (M) Mitsubishi Interior Green", "gunze": "C126", "realcolors": "306", "akold": "AK2067", "swatch": "#676333"}, {"code": "AK11897", "type": "AIR", "name": "IJN M3 (N) Nakajima Interior Green", "gunze": "C127", "realcolors": "307", "akold": "AK2068", "swatch": "#504a2a"}, {"code": "AK11898", "type": "AIR", "name": "IJN/IJA Aotake", "vallejo": "71419", "gunze": "C057/H063", "swatch": "#0c5e73"}, {"code": "AK11899", "type": "AIR", "name": "IJA #1 Hairyokushoku (Grey-Green)", "tamiya": "XF-12", "vallejo": "71326", "gunze": "C56/H62", "realcolors": "328", "akold": "AK2261", "swatch": "#a7a896"}, {"code": "AK11900", "type": "AIR", "name": "IJA #3 Hairanshoku (Grey Indigo)", "humbrol": "77", "realcolors": "329", "akold": "AK2262", "swatch": "#4a5d5b"}, {"code": "AK11901", "type": "AIR", "name": "IJA #7 Ohryuko Nana Go Shoku (Olive Brown)", "vallejo": "71286", "realcolors": "330", "akold": "AK2263", "swatch": "#504a2a"}, {"code": "AK11902", "type": "AIR", "name": "IJA #21 Midori iro (Green)", "realcolors": "331", "akold": "AK2264", "swatch": "#31442e"}, {"code": "AK11903", "type": "AIR", "name": "IJA #27 Ao Midori iro (Blue- Green)", "realcolors": "332", "akold": "AK2265", "citadel": "51004", "swatch": "#0c372d"}, {"code": "AK11904", "type": "AIR", "name": "IJA #29 Ki Midori iro (Yel- low-Green)", "realcolors": "333", "akold": "AK2266", "swatch": "#777125"}, {"code": "AK11905", "type": "AIR", "name": "IJA #30 Karekusa iro (Dry Grass)", "realcolors": "334", "akold": "AK2267", "swatch": "#867956"}, {"code": "AK11906", "type": "AIR", "name": "IJA #31 Cha Kasshoku (Tea Colour)", "realcolors": "335", "akold": "AK2268", "swatch": "#685247"}, {"code": "AK11907", "type": "AIR", "name": "Grey-Blue 1920s-1930s", "swatch": "#9db3a6"}, {"code": "AK11908", "type": "AIR", "name": "AE-9/AII Light Grey", "vallejo": "71414", "fs": "FS 25630", "hataka": "127", "realcolors": "308", "akold": "AK2251", "swatch": "#d4d5cd"}, {"code": "AK11909", "type": "AIR", "name": "AII Green", "vallejo": "71410", "hataka": "128", "realcolors": "309", "akold": "AK2252", "swatch": "#313f1e"}, {"code": "AK11910", "type": "AIR", "name": "AII Light Blue", "vallejo": "71317", "hataka": "129", "realcolors": "310", "akold": "AK2253", "swatch": "#7da3ae"}, {"code": "AK11911", "type": "AIR", "name": "A-14 Interior Steel Grey", "humbrol": "5", "vallejo": "71336", "realcolors": "319", "akold": "AK2241", "swatch": "#657376"}, {"code": "AK11912", "type": "AIR", "name": "A-18f Light Grey-Blue", "vallejo": "71413", "realcolors": "311", "akold": "AK2254", "swatch": "#85a59a"}, {"code": "AK11913", "type": "AIR", "name": "A-19f Grass Green", "vallejo": "71411", "realcolors": "312", "akold": "AK2255", "swatch": "#53653d"}, {"code": "AK11914", "type": "AIR", "name": "A-21m Light Yellowish Brown", "humbrol": "72", "vallejo": "71415", "lifecolor": "UA039", "hataka": "74", "realcolors": "314", "akold": "AK2248", "swatch": "#8f8762"}, {"code": "AK11915", "type": "AIR", "name": "AMT-4 (A-24m) Green", "vallejo": "71301", "hataka": "73", "realcolors": "315", "akold": "AK2242", "swatch": "#425223"}, {"code": "AK11916", "type": "AIR", "name": "AMT-7 Light Blue", "vallejo": "71318", "hataka": "72", "realcolors": "316", "akold": "AK2244", "swatch": "#6790a4"}, {"code": "AK11917", "type": "AIR", "name": "AMT-11 Blue-Grey", "vallejo": "71304", "hataka": "71", "realcolors": "317", "akold": "AK2245", "swatch": "#475a61"}, {"code": "AK11918", "type": "AIR", "name": "AMT-12 Dark Grey", "vallejo": "71308", "hataka": "70", "realcolors": "318", "akold": "AK2246", "swatch": "#2b3638"}, {"code": "AK11919", "type": "AIR", "name": "Radome & Wheel Hub Green", "gunze": "C66/H26", "akold": "AK2302", "swatch": "#2c652e"}, {"code": "AK11920", "type": "AIR", "name": "MiG-25/MiG-31 Grey", "realcolors": "336", "swatch": "#bebfba"}];
const EQUIV_COLS = [
  {k:"code",label:"AK šifra"},
  {k:"swatch",label:"Boja"},
  {k:"type",label:"Serija"},
  {k:"name",label:"Naziv"},
  {k:"tamiya",label:"Tamiya"},
  {k:"humbrol",label:"Humbrol"},
  {k:"vallejo",label:"Vallejo MC"},
  {k:"vallejoGC",label:"Vallejo GC"},
  {k:"gunze",label:"Gunze/Mr.Hobby"},
  {k:"testor",label:"Testor"},
  {k:"lifecolor",label:"Lifecolor"},
  {k:"rlm",label:"RLM"},
  {k:"ral",label:"RAL/BS"},
  {k:"fs",label:"FS"},
  {k:"hataka",label:"Hataka"},
  {k:"revell",label:"Revell"},
  {k:"realcolors",label:"Real Colors"},
  {k:"citadel",label:"Citadel (broj)"},
  {k:"citadelNew",label:"Citadel (novi)"},
  {k:"citadelOld",label:"Citadel (stari)"},
  {k:"meng",label:"Meng"},
  {k:"akold",label:"Stara AK šifra"}
];
const REALCOLORS_DATA = [{"code": "RC001", "name": "Flat Black", "bsfsral": "RAL 9005 (Modern RAL 840 HR)", "mrhobby": "C33 / H12", "tamiya": "XF-1", "vallejo": "71.057", "hataka": "HTK-_100", "humbrol": "33", "modelmaster": "1749 / 4768", "lifecolor": "LC02", "era": "old"}, {"code": "RC002", "name": "Cream White", "bsfsral": "RAL 9001 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "71.270", "hataka": "HTK-_307", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC003", "name": "White Grey", "bsfsral": "RAL 9002 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "71.119", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC004", "name": "Flat White", "bsfsral": "RAL 9003 (Modern RAL 840 HR)", "mrhobby": "C62 / H11", "tamiya": "XF-2", "vallejo": "71.001", "hataka": "-", "humbrol": "34", "modelmaster": "1768 / 4769", "lifecolor": "LC01", "era": "old"}, {"code": "RC005", "name": "Signal Red", "bsfsral": "RAL 3020 (Modern RAL 840 HR)", "mrhobby": "C79 / H23", "tamiya": "-", "vallejo": "71.003", "hataka": "HTK-_103", "humbrol": "238", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC006", "name": "Red", "bsfsral": "RAL 3000 (Modern RAL 840 HR)", "mrhobby": "H13", "tamiya": "XF-7", "vallejo": "71.269", "hataka": "HTK-_132", "humbrol": "19", "modelmaster": "2733", "lifecolor": "LC06", "era": "old"}, {"code": "RC007", "name": "Yellow", "bsfsral": "RAL 1003 (Modern RAL 840 HR)", "mrhobby": "C329 / H329", "tamiya": "X-8", "vallejo": "71.135", "hataka": "HTK-_107", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC008", "name": "Maize Yellow", "bsfsral": "RAL 1006 (Modern RAL 840 HR)", "mrhobby": "H34", "tamiya": "-", "vallejo": "71.033", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC009", "name": "Orange", "bsfsral": "RAL 2004 (Modern RAL 840 HR)", "mrhobby": "C59 / H14", "tamiya": "X-6", "vallejo": "71.083", "hataka": "HTK-_704", "humbrol": "18", "modelmaster": "-", "lifecolor": "LC05", "era": "old"}, {"code": "RC010", "name": "Pure Blue", "bsfsral": "RAL 5005 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "70.930", "hataka": "HTK-_102", "humbrol": "25", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC011", "name": "Blue", "bsfsral": "RAL 5001 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC012", "name": "Pure Green", "bsfsral": "RAL 6037 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC013", "name": "Off White", "bsfsral": "-", "mrhobby": "C69 / H21", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "4874", "lifecolor": "-", "era": "old"}, {"code": "RC014", "name": "Buff", "bsfsral": "-", "mrhobby": "C336 / H336", "tamiya": "XF-57", "vallejo": "-", "hataka": "HTK-_262", "humbrol": "168", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC015", "name": "Gun Metal (Metallic)", "bsfsral": "-", "mrhobby": "C78 / H28", "tamiya": "X-10", "vallejo": "71.073", "hataka": "HTK-_106", "humbrol": "201", "modelmaster": "1795 / 4681", "lifecolor": "LC26", "era": "old"}, {"code": "RC016", "name": "Ochre", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "LC64", "era": "old"}, {"code": "RC017", "name": "Pale Blue", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC018", "name": "Pale Sand", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "70.837", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC019", "name": "Deck Tan", "bsfsral": "-", "mrhobby": "C321 / H321", "tamiya": "XF-55", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC020", "name": "Aluminium (Metallic)", "bsfsral": "-", "mrhobby": "-", "tamiya": "XF-16", "vallejo": "71.062", "hataka": "HTK-_078", "humbrol": "56", "modelmaster": "1781 / 4677", "lifecolor": "LC24", "era": "old"}, {"code": "RC021", "name": "Pale Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC022", "name": "Rubber Black", "bsfsral": "-", "mrhobby": "C137 / H77", "tamiya": "XF-85", "vallejo": "71.315", "hataka": "-", "humbrol": "-", "modelmaster": "1583", "lifecolor": "UA733", "era": "old"}, {"code": "RC023", "name": "Olive Drab No.9 / No.22", "bsfsral": "-", "mrhobby": "C12/H52", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_018", "humbrol": "-", "modelmaster": "2050 / 4842", "lifecolor": "-", "era": "old"}, {"code": "RC024", "name": "Olive Drab Faded", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA003", "era": "old"}, {"code": "RC025", "name": "Dark Olive Drab No.31", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC026", "name": "Olive Drab", "bsfsral": "FS 34087", "mrhobby": "C304 / H304", "tamiya": "-", "vallejo": "71.043", "hataka": "HTK-_065", "humbrol": "155", "modelmaster": "1711 / 4728", "lifecolor": "UA523", "era": "old"}, {"code": "RC027", "name": "Forest Green", "bsfsral": "FS 34079", "mrhobby": "C309 / H309", "tamiya": "XF-65", "vallejo": "71.294", "hataka": "HTK-_016", "humbrol": "116", "modelmaster": "1710 / 4726", "lifecolor": "UA001", "era": "old"}, {"code": "RC028", "name": "Interior Green", "bsfsral": "FS 34151", "mrhobby": "C351 / H58", "tamiya": "-", "vallejo": "71.137", "hataka": "HTK-_211", "humbrol": "-", "modelmaster": "1715 / 4736", "lifecolor": "UA004", "era": "old"}, {"code": "RC029", "name": "No.5 Earth Brown", "bsfsral": "FS 30099", "mrhobby": "-", "tamiya": "-", "vallejo": "71.290", "hataka": "HTK-_256", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA087", "era": "old"}, {"code": "RC030", "name": "No.6 Earth Yellow", "bsfsral": "FS 30257", "mrhobby": "-", "tamiya": "-", "vallejo": "71.291", "hataka": "HTK-_212", "humbrol": "63", "modelmaster": "-", "lifecolor": "UA081", "era": "old"}, {"code": "RC031", "name": "No.8 Earth Red", "bsfsral": "FS 30117", "mrhobby": "C43 / H37", "tamiya": "-", "vallejo": "71.293", "hataka": "HTK-_213", "humbrol": "186", "modelmaster": "1701 / 4707", "lifecolor": "UA306", "era": "old"}, {"code": "RC032", "name": "Desert Sand", "bsfsral": "FS 30279", "mrhobby": "H346", "tamiya": "-", "vallejo": "71.140", "hataka": "HTK-_068", "humbrol": "250", "modelmaster": "2053", "lifecolor": "UA089", "era": "old"}, {"code": "RC033", "name": "Khaki Green No.3", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.330", "hataka": "HTK-_064", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC034", "name": "S.C.C. 1A Brown", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.039", "hataka": "HTK-_077", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA274", "era": "old"}, {"code": "RC035", "name": "S.C.C. 2 Brown", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.038", "hataka": "HTK-_076", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA273", "era": "old"}, {"code": "RC036", "name": "S.C.C. 14 Blue Black", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA271", "era": "old"}, {"code": "RC037", "name": "S.C.C. 15 Olive Drab", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.016", "hataka": "HTK-_110", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA270", "era": "old"}, {"code": "RC038", "name": "BSC No.28 Silver Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.401", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA264", "era": "old"}, {"code": "RC039", "name": "BSC No.34 Slate", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.012", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA265", "era": "old"}, {"code": "RC040", "name": "BSC No.61 Light Stone", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.143", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA266", "era": "old"}, {"code": "RC041", "name": "BSC No.64 Portland Stone", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.288", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA267", "era": "old"}, {"code": "RC042", "name": "British Dark Olive Green PFI", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA269", "era": "old"}, {"code": "RC043", "name": "British Desert Pink ZI", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.400", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA268", "era": "old"}, {"code": "RC044", "name": "British Light Mud", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.284", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA272", "era": "old"}, {"code": "RC045", "name": "BSC No.49 Light Purple Brown", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.402", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC046", "name": "Elfenbein – Ivory", "bsfsral": "RAL 1001", "mrhobby": "-", "tamiya": "-", "vallejo": "71.075", "hataka": "HTK-_184", "humbrol": "-", "modelmaster": "2104 / 4805", "lifecolor": "-", "era": "old"}, {"code": "RC047", "name": "Olivgrün – Olive Green", "bsfsral": "RAL 6003", "mrhobby": "H405", "tamiya": "-", "vallejo": "71.092", "hataka": "HTK-_169", "humbrol": "-", "modelmaster": "2149 / 4862", "lifecolor": "UA206", "era": "old"}, {"code": "RC048", "name": "Feldgray – Field Grey", "bsfsral": "RAL 6006", "mrhobby": "-", "tamiya": "-", "vallejo": "71.268", "hataka": "HTK-_151", "humbrol": "-", "modelmaster": "2148 / 4860", "lifecolor": "-", "era": "old"}, {"code": "RC049", "name": "Grün – Green", "bsfsral": "RAL 6007", "mrhobby": "-", "tamiya": "-", "vallejo": "71.019", "hataka": "HTK-_298", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC050", "name": "Dunkelgrün – Dark Green", "bsfsral": "RAL 6009", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC051", "name": "Marinegrau – Navy Grey", "bsfsral": "RAL 7002", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC052", "name": "Grau – Grey", "bsfsral": "RAL 7003", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC053", "name": "Graugrün – Grey Green", "bsfsral": "RAL 7008", "mrhobby": "-", "tamiya": "-", "vallejo": "71.116", "hataka": "HTK-_304", "humbrol": "-", "modelmaster": "2098", "lifecolor": "UA212", "era": "old"}, {"code": "RC054", "name": "Hellgrau – Light Grey", "bsfsral": "RAL 7009", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA233", "era": "old"}, {"code": "RC055", "name": "Blaugrau – Blue Grey", "bsfsral": "RAL 7016", "mrhobby": "-", "tamiya": "-", "vallejo": "71.115", "hataka": "HTK-_300", "humbrol": "-", "modelmaster": "2101", "lifecolor": "UA208", "era": "old"}, {"code": "RC056", "name": "Dunkelbraun – Dark Brown", "bsfsral": "RAL 7017", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA210", "era": "old"}, {"code": "RC057", "name": "Dunkelgrau – Dark Grey", "bsfsral": "RAL 7021", "mrhobby": "H401", "tamiya": "XF-63", "vallejo": "71.056", "hataka": "HTK-_164", "humbrol": "67", "modelmaster": "2094 / 4795", "lifecolor": "UA207", "era": "old"}, {"code": "RC058", "name": "Grau – Grey", "bsfsral": "RAL 7027", "mrhobby": "H404", "tamiya": "-", "vallejo": "71.118", "hataka": "HTK-_306", "humbrol": "-", "modelmaster": "2103", "lifecolor": "UA202", "era": "old"}, {"code": "RC059", "name": "Dunkelgelb nach Muster", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_310", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC060", "name": "Dunkelgelb – Dark Yellow", "bsfsral": "RAL 7028", "mrhobby": "H403", "tamiya": "XF-60", "vallejo": "71.025", "hataka": "HTK-_244", "humbrol": "-", "modelmaster": "2095 / 4796", "lifecolor": "UA204", "era": "old"}, {"code": "RC061", "name": "Dunkelgelb Ausgabe 1944 – Dark Yellow 1944 Variant", "bsfsral": "RAL 7028", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_250", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC062", "name": "Dunkelgelb – Dark Yellow (variation)", "bsfsral": "RAL 7028", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC063", "name": "Gelbraun – Yellow Brown", "bsfsral": "RAL 8000", "mrhobby": "-", "tamiya": "-", "vallejo": "71.272", "hataka": "HTK-_303", "humbrol": "-", "modelmaster": "2099", "lifecolor": "UA203", "era": "old"}, {"code": "RC064", "name": "Erdgelb – Earth Yellow", "bsfsral": "RAL 8002", "mrhobby": "-", "tamiya": "-", "vallejo": "71.420", "hataka": "HTK-_297", "humbrol": "-", "modelmaster": "2100", "lifecolor": "UA209", "era": "old"}, {"code": "RC065", "name": "Braun – Brown", "bsfsral": "RAL 8010", "mrhobby": "-", "tamiya": "-", "vallejo": "71.038", "hataka": "HTK-_299", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC066", "name": "Rot (Rotbraun) – Red (Red Brown)", "bsfsral": "RAL 8013", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "2165", "lifecolor": "-", "era": "old"}, {"code": "RC067", "name": "Rot (Rotbraun) – Red (Red Brown)", "bsfsral": "RAL 8012", "mrhobby": "C43 / H47", "tamiya": "-", "vallejo": "71.271", "hataka": "HTK-_175", "humbrol": "-", "modelmaster": "2152 / 4861", "lifecolor": "UA211", "era": "old"}, {"code": "RC068", "name": "Rotbraun – Red Brown", "bsfsral": "RAL 8017", "mrhobby": "H406", "tamiya": "XF-9", "vallejo": "71.041", "hataka": "HTK-_147", "humbrol": "160", "modelmaster": "2096 / 4797", "lifecolor": "UA205", "era": "old"}, {"code": "RC069", "name": "Braun – Brown", "bsfsral": "RAL 8020", "mrhobby": "H402", "tamiya": "-", "vallejo": "71.117", "hataka": "HTK-_305", "humbrol": "-", "modelmaster": "2102", "lifecolor": "UA201", "era": "old"}, {"code": "RC070", "name": "Common Protective ZO", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_316", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC071", "name": "Black 6RP", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_041", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC072", "name": "Protective K", "bsfsral": "-", "mrhobby": "C511", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC073", "name": "Protective 4BO", "bsfsral": "-", "mrhobby": "C512", "tamiya": "-", "vallejo": "71.017", "hataka": "HTK-_251", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA248", "era": "old"}, {"code": "RC074", "name": "Dark Brown 6K", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.282", "hataka": "HTK-_317", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC075", "name": "Sand 7K", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.283", "hataka": "HTK-_318", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA242", "era": "old"}, {"code": "RC076", "name": "Protective Green 1920s – 1930s", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC077", "name": "ZB AU Basic Protector", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.281", "hataka": "HTK-_246", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC078", "name": "APC Interior Green", "bsfsral": "FS 24533", "mrhobby": "-", "tamiya": "XF-21", "vallejo": "-", "hataka": "HTK-_239", "humbrol": "23", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC079", "name": "CARC Tan 686A", "bsfsral": "FS 33446", "mrhobby": "-", "tamiya": "-", "vallejo": "71.122", "hataka": "HTK-_238", "humbrol": "-", "modelmaster": "2136 / 4812", "lifecolor": "-", "era": "old"}, {"code": "RC080", "name": "NATO Green", "bsfsral": "RAL 6031-F9", "mrhobby": "C519", "tamiya": "XF-67", "vallejo": "71.250", "hataka": "HTK-_152", "humbrol": "-", "modelmaster": "2173", "lifecolor": "UA303", "era": "old"}, {"code": "RC081", "name": "NATO Brown", "bsfsral": "RAL 8027-F9", "mrhobby": "C520", "tamiya": "XF-68", "vallejo": "71.249", "hataka": "HTK-_188", "humbrol": "-", "modelmaster": "2174", "lifecolor": "UA302", "era": "old"}, {"code": "RC082", "name": "NATO Black", "bsfsral": "RAL 9021-F9", "mrhobby": "C521", "tamiya": "XF-69", "vallejo": "71.251", "hataka": "HTK-_125", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA301", "era": "old"}, {"code": "RC083", "name": "Green", "bsfsral": "FS 34102", "mrhobby": "C303 / H303", "tamiya": "-", "vallejo": "71.289", "hataka": "HTK-_021", "humbrol": "117", "modelmaster": "1713 / 4734", "lifecolor": "UA002", "era": "old"}, {"code": "RC084", "name": "Sand", "bsfsral": "FS 30277", "mrhobby": "-", "tamiya": "-", "vallejo": "71.138", "hataka": "HTK-_210", "humbrol": "187", "modelmaster": "4711", "lifecolor": "UA019", "era": "old"}, {"code": "RC085", "name": "Field Drab", "bsfsral": "FS 30118", "mrhobby": "C55/H81", "tamiya": "-", "vallejo": "71.139", "hataka": "HTK-_209", "humbrol": "-", "modelmaster": "1702 / 4708", "lifecolor": "UA016", "era": "old"}, {"code": "RC086", "name": "Gelboliv Initial", "bsfsral": "RAL 6014", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC087", "name": "Gelboliv Late", "bsfsral": "RAL 6014 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_193", "humbrol": "-", "modelmaster": "2175", "lifecolor": "-", "era": "old"}, {"code": "RC088", "name": "Sandbeige", "bsfsral": "RAL 1039-F9", "mrhobby": "-", "tamiya": "-", "vallejo": "71.244", "hataka": "HTK-_278", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC089", "name": "Graubeige – Grey Beige", "bsfsral": "RAL 1040-F9", "mrhobby": "-", "tamiya": "-", "vallejo": "71.245", "hataka": "HTK-_279", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC090", "name": "Helloliv – Light Olive", "bsfsral": "RAL 6040-F9", "mrhobby": "-", "tamiya": "-", "vallejo": "71.247", "hataka": "HTK-_281", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC091", "name": "Tarngrau – Camo Grey", "bsfsral": "RAL 7050-F9", "mrhobby": "-", "tamiya": "-", "vallejo": "71.248", "hataka": "HTK-_089", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC092", "name": "Sandbraun – Sand Brown", "bsfsral": "RAL 8031-F9", "mrhobby": "-", "tamiya": "-", "vallejo": "71.246", "hataka": "HTK-_280", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC093", "name": "British Sand Yellow", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "2137 / 4813", "lifecolor": "-", "era": "old"}, {"code": "RC094", "name": "IDF Modern Grey", "bsfsral": "-", "mrhobby": "C530", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "2138", "lifecolor": "-", "era": "old"}, {"code": "RC095", "name": "IDF Sand Grey 1970s-1980s", "bsfsral": "-", "mrhobby": "C529", "tamiya": "-", "vallejo": "71.142", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA902", "era": "old"}, {"code": "RC096", "name": "IDF Early Sand Yellow", "bsfsral": "-", "mrhobby": "C528", "tamiya": "-", "vallejo": "71.141", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA901", "era": "old"}, {"code": "RC097", "name": "UAE Dull Sand", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC098", "name": "Russian Modern Green", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC099", "name": "Russian Greyish Yellow", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC100", "name": "Russian Grey Green", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC101", "name": "Egyptian Desert Sand", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC102", "name": "Syrian Rep. Guard Desert Yellow", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC103", "name": "Libyan Army Desert Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC104", "name": "Iraqi Army Desert Sand", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC105", "name": "Spanish Green", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC206", "name": "Russian Cockpit Torquise", "bsfsral": "-", "mrhobby": "C391", "tamiya": "-", "vallejo": "71.331", "hataka": "HTK-_047", "humbrol": "-", "modelmaster": "2135", "lifecolor": "-", "era": "old"}, {"code": "RC207", "name": "Leuchtorange – Luminous Orange", "bsfsral": "RAL 2005 (Modern RAL 840 HR)", "mrhobby": "H98", "tamiya": "-", "vallejo": "71.082", "hataka": "HTK-_194", "humbrol": "-", "modelmaster": "-", "lifecolor": "LC23", "era": "old"}, {"code": "RC208", "name": "Graublau – Grey Blue", "bsfsral": "RAL 5008 (Modern RAL 840 HR)", "mrhobby": "C14 / H54", "tamiya": "-", "vallejo": "71.005", "hataka": "HTK-_171", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC209", "name": "Olive Green / USMC Green", "bsfsral": "RAL 6003 (Modern RAL 840 HR) / FS 34095", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_059", "humbrol": "-", "modelmaster": "1786", "lifecolor": "-", "era": "old"}, {"code": "RC210", "name": "Silbergrau – Silver Grey", "bsfsral": "RAL 7001 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_189", "humbrol": "-", "modelmaster": "2160", "lifecolor": "-", "era": "old"}, {"code": "RC211", "name": "Grüngrau – Green Grey", "bsfsral": "RAL 7009 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "71.020", "hataka": "HTK-_225", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC212", "name": "Basaltgrau – Basalt Grey", "bsfsral": "RAL 7012 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "70.869", "hataka": "HTK-_192", "humbrol": "79", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC213", "name": "Steingrau – Stone Grey", "bsfsral": "RAL 7030 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_233", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC214", "name": "Lichtgrau – Light Grey", "bsfsral": "RAL 7035 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_191", "humbrol": "196", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC215", "name": "Staubgrau – Dusty Grey", "bsfsral": "RAL 7037 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_249", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC216", "name": "Quarzgrau – Quartz Grey", "bsfsral": "RAL 7039 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_248", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC217", "name": "Seidengrau – Silk Grey", "bsfsral": "RAL 7044 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_173", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC218", "name": "Olivbraun – Olive Brown", "bsfsral": "RAL 8008 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "71.032", "hataka": "HTK-_172", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC219", "name": "MNO 2036 Smalt Khaki Avion", "bsfsral": "RAL 6013 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_170", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC220", "name": "Light Gull Grey", "bsfsral": "FS 16440", "mrhobby": "C315 / H315", "tamiya": "-", "vallejo": "71.121", "hataka": "HTK-_048", "humbrol": "129", "modelmaster": "4692", "lifecolor": "UA025", "era": "old"}, {"code": "RC221", "name": "ADC Grey", "bsfsral": "FS 16473", "mrhobby": "-", "tamiya": "-", "vallejo": "71.335", "hataka": "HTK-_045", "humbrol": "-", "modelmaster": "1731 / 4693", "lifecolor": "UA041", "era": "old"}, {"code": "RC222", "name": "Insignia White", "bsfsral": "FS 17875", "mrhobby": "C316 / H316", "tamiya": "X-1", "vallejo": "71.279", "hataka": "HTK-_049", "humbrol": "22", "modelmaster": "1745 / 4696", "lifecolor": "LC52", "era": "old"}, {"code": "RC223", "name": "Tan", "bsfsral": "FS 20400", "mrhobby": "-", "tamiya": "-", "vallejo": "71.348", "hataka": "HTK-_187", "humbrol": "-", "modelmaster": "2021 / 4697", "lifecolor": "UA084", "era": "old"}, {"code": "RC224", "name": "Brown", "bsfsral": "FS 30140", "mrhobby": "-", "tamiya": "-", "vallejo": "71.035", "hataka": "HTK-_160", "humbrol": "-", "modelmaster": "1754", "lifecolor": "UA085", "era": "old"}, {"code": "RC225", "name": "Dark Tan", "bsfsral": "FS 30219", "mrhobby": "C310 / H310", "tamiya": "-", "vallejo": "71.125", "hataka": "HTK-_012", "humbrol": "118", "modelmaster": "1742 / 4709", "lifecolor": "UA015", "era": "old"}, {"code": "RC226", "name": "Sand", "bsfsral": "FS 33531", "mrhobby": "C313 / H313", "tamiya": "XF-59", "vallejo": "71.327", "hataka": "HTK-_090", "humbrol": "121", "modelmaster": "1706 / 4720", "lifecolor": "-", "era": "old"}, {"code": "RC227", "name": "Radome Tan", "bsfsral": "FS 33613", "mrhobby": "C318 / H318", "tamiya": "-", "vallejo": "71.074", "hataka": "-", "humbrol": "148", "modelmaster": "1709 / 4722", "lifecolor": "-", "era": "old"}, {"code": "RC228", "name": "USMC Sand", "bsfsral": "FS 33711", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_060", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA090", "era": "old"}, {"code": "RC229", "name": "US Army Helo Drab", "bsfsral": "FS 34031", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_067", "humbrol": "-", "modelmaster": "2024 / 4723", "lifecolor": "-", "era": "old"}, {"code": "RC230", "name": "Dull Dark Green", "bsfsral": "FS 34092", "mrhobby": "C302 / H302", "tamiya": "XF-26", "vallejo": "71.124", "hataka": "HTK-_056", "humbrol": "149", "modelmaster": "1764 / 4729", "lifecolor": "UA008", "era": "old"}, {"code": "RC231", "name": "Field Green", "bsfsral": "FS 34097", "mrhobby": "C340 / H340", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "1712", "lifecolor": "-", "era": "old"}, {"code": "RC232", "name": "Pale Green", "bsfsral": "FS 34227", "mrhobby": "C312 / H312", "tamiya": "-", "vallejo": "71.126", "hataka": "HTK-_091", "humbrol": "120", "modelmaster": "1716 / 4739", "lifecolor": "UA060", "era": "old"}, {"code": "RC233", "name": "Green", "bsfsral": "FS 34258", "mrhobby": "-", "tamiya": "-", "vallejo": "71.094", "hataka": "HTK-_093", "humbrol": "-", "modelmaster": "2029", "lifecolor": "UA115", "era": "old"}, {"code": "RC234", "name": "Aggressor Blue", "bsfsral": "FS 35109", "mrhobby": "-", "tamiya": "-", "vallejo": "71.111", "hataka": "HTK-_156", "humbrol": "-", "modelmaster": "2031", "lifecolor": "UA404", "era": "old"}, {"code": "RC235", "name": "Intermediate Blue", "bsfsral": "FS 35164", "mrhobby": "C366 / H56", "tamiya": "-", "vallejo": "71.299", "hataka": "HTK-_027", "humbrol": "144", "modelmaster": "1720 / 4744", "lifecolor": "UA045", "era": "old"}, {"code": "RC236", "name": "Blue", "bsfsral": "FS 35190", "mrhobby": "-", "tamiya": "-", "vallejo": "70.901", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC237", "name": "Medium Grey", "bsfsral": "FS 35237", "mrhobby": "C337 / H337", "tamiya": "-", "vallejo": "71.114", "hataka": "HTK-_046", "humbrol": "145", "modelmaster": "1721 / 4746", "lifecolor": "UA145", "era": "old"}, {"code": "RC238", "name": "Light Blue", "bsfsral": "FS 35414", "mrhobby": "-", "tamiya": "-", "vallejo": "71.008", "hataka": "HTK-_150", "humbrol": "-", "modelmaster": "2033", "lifecolor": "UA062", "era": "old"}, {"code": "RC239", "name": "Air Superiority Blue", "bsfsral": "FS 35450", "mrhobby": "-", "tamiya": "-", "vallejo": "71.332", "hataka": "HTK-_155", "humbrol": "47", "modelmaster": "-", "lifecolor": "UA037", "era": "old"}, {"code": "RC240", "name": "Light Sky Blue", "bsfsral": "FS 35526", "mrhobby": "-", "tamiya": "-", "vallejo": "71.337", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA061", "era": "old"}, {"code": "RC241", "name": "Duck Egg Blue", "bsfsral": "FS 35622", "mrhobby": "C314 / H314", "tamiya": "-", "vallejo": "71.328", "hataka": "HTK-_092", "humbrol": "122", "modelmaster": "1722 / 4748", "lifecolor": "UA139", "era": "old"}, {"code": "RC242", "name": "Dark Eggplant Grey", "bsfsral": "FS 36076", "mrhobby": "-", "tamiya": "-", "vallejo": "71.048", "hataka": "HTK-_230", "humbrol": "-", "modelmaster": "2034 / 4749", "lifecolor": "-", "era": "old"}, {"code": "RC243", "name": "Grey", "bsfsral": "FS 36081", "mrhobby": "C301 / H301", "tamiya": "-", "vallejo": "71.314", "hataka": "HTK-_030", "humbrol": "32", "modelmaster": "1788 / 4750", "lifecolor": "UA030", "era": "old"}, {"code": "RC244", "name": "Medium Gunship Grey", "bsfsral": "FS 36118", "mrhobby": "C305 / H305", "tamiya": "-", "vallejo": "71.097", "hataka": "HTK-_031", "humbrol": "125", "modelmaster": "1723 / 4752", "lifecolor": "UA022", "era": "old"}, {"code": "RC245", "name": "Have Glass Grey", "bsfsral": "FS 36170", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_058", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC246", "name": "F-15 Dark Grey (Mod Eagle)", "bsfsral": "FS 36176", "mrhobby": "-", "tamiya": "-", "vallejo": "71.273", "hataka": "HTK-_158", "humbrol": "5", "modelmaster": "2036 / 4754", "lifecolor": "UA029", "era": "old"}, {"code": "RC247", "name": "Dark Gull Grey", "bsfsral": "FS 36231", "mrhobby": "C317 / H317", "tamiya": "-", "vallejo": "71.277", "hataka": "HTK-_044", "humbrol": "140", "modelmaster": "1740 / 4755", "lifecolor": "UA033", "era": "old"}, {"code": "RC248", "name": "Aggressor Grey", "bsfsral": "FS 36251", "mrhobby": "-", "tamiya": "-", "vallejo": "71.274", "hataka": "HTK-_157", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA034", "era": "old"}, {"code": "RC249", "name": "Medium Grey", "bsfsral": "FS 36270", "mrhobby": "C306 / H306", "tamiya": "-", "vallejo": "71.275", "hataka": "HTK-_054", "humbrol": "126", "modelmaster": "1725 / 4757", "lifecolor": "UA028", "era": "old"}, {"code": "RC250", "name": "Light Sea Grey", "bsfsral": "FS 36307", "mrhobby": "C324 / H324", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_266", "humbrol": "141", "modelmaster": "1726 / 4759", "lifecolor": "UA113", "era": "old"}, {"code": "RC251", "name": "Dark Ghost Grey", "bsfsral": "FS 36320", "mrhobby": "C307 / H307", "tamiya": "-", "vallejo": "71.120", "hataka": "HTK-_035", "humbrol": "128", "modelmaster": "1741 / 4761", "lifecolor": "UA027", "era": "old"}, {"code": "RC252", "name": "Light Ghost Grey", "bsfsral": "FS 36375", "mrhobby": "C308 / H308", "tamiya": "-", "vallejo": "70.615", "hataka": "HTK-_037", "humbrol": "127", "modelmaster": "1728 / 4762", "lifecolor": "UA026", "era": "old"}, {"code": "RC253", "name": "Light Grey", "bsfsral": "FS 36495", "mrhobby": "C338 / H338", "tamiya": "-", "vallejo": "71.276", "hataka": "HTK-_050", "humbrol": "147", "modelmaster": "1732 / 4765", "lifecolor": "UA023", "era": "old"}, {"code": "RC254", "name": "Camouflage Grey", "bsfsral": "FS 36622", "mrhobby": "C311 / H311", "tamiya": "-", "vallejo": "71.296", "hataka": "HTK-_039", "humbrol": "28", "modelmaster": "4766", "lifecolor": "UA021", "era": "old"}, {"code": "RC255", "name": "M-485 Light Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.298", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA741", "era": "old"}, {"code": "RC256", "name": "M-485 Blue-Grey", "bsfsral": "FS 35189", "mrhobby": "C367", "tamiya": "-", "vallejo": "71.109", "hataka": "HTK-_218", "humbrol": "-", "modelmaster": "2055 / 4847", "lifecolor": "UA038", "era": "old"}, {"code": "RC257", "name": "Sea Blue", "bsfsral": "FS 35042", "mrhobby": "C71 / H55", "tamiya": "XF-17", "vallejo": "71.295", "hataka": "HTK-_006", "humbrol": "-", "modelmaster": "1718", "lifecolor": "UA044", "era": "old"}, {"code": "RC258", "name": "Dark Sea Blue", "bsfsral": "FS 35045", "mrhobby": "C365", "tamiya": "-", "vallejo": "71.300", "hataka": "HTK-_001", "humbrol": "181", "modelmaster": "1717 / 4686", "lifecolor": "UA047", "era": "old"}, {"code": "RC259", "name": "Dark Olive Drab 41", "bsfsral": "FS 33070", "mrhobby": "C38 / H78", "tamiya": "XF-62", "vallejo": "71.316", "hataka": "HTK-_004", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA005", "era": "old"}, {"code": "RC260", "name": "Medium Green 42", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_019", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC261", "name": "Neutral Grey 43", "bsfsral": "-", "mrhobby": "C13 / H53", "tamiya": "-", "vallejo": "71.051", "hataka": "HTK-_033", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA046", "era": "old"}, {"code": "RC262", "name": "US Interior Yellow Green", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC263", "name": "Zinc Chromate Yellow", "bsfsral": "-", "mrhobby": "C352", "tamiya": "-", "vallejo": "71.107", "hataka": "-", "humbrol": "-", "modelmaster": "4851", "lifecolor": "-", "era": "old"}, {"code": "RC264", "name": "Bronze Green", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC265", "name": "RLM 02 RLM-Grau (1938)", "bsfsral": "-", "mrhobby": "C60 / H70", "tamiya": "XF-20", "vallejo": "71.044", "hataka": "HTK-_023", "humbrol": "240", "modelmaster": "2071 / 4770", "lifecolor": "UA504", "era": "old"}, {"code": "RC266", "name": "RLM 02 RLM-Grau (1941)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC267", "name": "RLM 04", "bsfsral": "-", "mrhobby": "C113 / H413", "tamiya": "-", "vallejo": "71.078", "hataka": "HTK-_066", "humbrol": "154", "modelmaster": "2072 / 4771", "lifecolor": "UA140", "era": "old"}, {"code": "RC268", "name": "RLM 61", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.042", "hataka": "HTK-_168", "humbrol": "-", "modelmaster": "2075", "lifecolor": "-", "era": "old"}, {"code": "RC269", "name": "RLM 62", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.104", "hataka": "HTK-_169", "humbrol": "-", "modelmaster": "2076", "lifecolor": "-", "era": "old"}, {"code": "RC270", "name": "RLM 63", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.260", "hataka": "HTK-_167", "humbrol": "-", "modelmaster": "2077", "lifecolor": "-", "era": "old"}, {"code": "RC271", "name": "RLM 65 (1938)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "65", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC272", "name": "RLM 65 (1941)", "bsfsral": "-", "mrhobby": "C115 / H67", "tamiya": "XF-23", "vallejo": "71.255", "hataka": "HTK-_029", "humbrol": "-", "modelmaster": "2078 / 4778", "lifecolor": "UA503", "era": "old"}, {"code": "RC273", "name": "RLM 66 (1941)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC274", "name": "RLM 70", "bsfsral": "-", "mrhobby": "C18 / H65", "tamiya": "XF-27", "vallejo": "71.021", "hataka": "HTK-_015", "humbrol": "241", "modelmaster": "2080 / 4780", "lifecolor": "UA501", "era": "old"}, {"code": "RC275", "name": "RLM 71", "bsfsral": "-", "mrhobby": "C17 / H64", "tamiya": "-", "vallejo": "71.015", "hataka": "HTK-_017", "humbrol": "242", "modelmaster": "2081 / 4781", "lifecolor": "UA502", "era": "old"}, {"code": "RC276", "name": "RLM 72", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.263", "hataka": "HTK-_311", "humbrol": "243", "modelmaster": "2082", "lifecolor": "-", "era": "old"}, {"code": "RC277", "name": "RLM 73", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.256", "hataka": "HTK-_312", "humbrol": "244", "modelmaster": "2083", "lifecolor": "-", "era": "old"}, {"code": "RC278", "name": "RLM 74", "bsfsral": "-", "mrhobby": "C36 / H68", "tamiya": "-", "vallejo": "71.258", "hataka": "HTK-_313", "humbrol": "245", "modelmaster": "2084 / 4784", "lifecolor": "UA507", "era": "old"}, {"code": "RC279", "name": "RLM 75", "bsfsral": "-", "mrhobby": "C37 / H69", "tamiya": "-", "vallejo": "71.259", "hataka": "HTK-_007", "humbrol": "246", "modelmaster": "2085 / 4785", "lifecolor": "UA508", "era": "old"}, {"code": "RC280", "name": "RLM 78 (1941)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC281", "name": "RLM 78 (1942)", "bsfsral": "-", "mrhobby": "C118 / H418", "tamiya": "-", "vallejo": "71.101", "hataka": "HTK-_314", "humbrol": "248", "modelmaster": "2087", "lifecolor": "UA512", "era": "old"}, {"code": "RC282", "name": "RLM 79 (1941)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC283", "name": "RLM 79 (1942)", "bsfsral": "-", "mrhobby": "C119 / H66", "tamiya": "-", "vallejo": "71.278", "hataka": "HTK-_014", "humbrol": "249", "modelmaster": "2088 / 4789", "lifecolor": "UA137", "era": "old"}, {"code": "RC284", "name": "RLM 80", "bsfsral": "-", "mrhobby": "C120 / H420", "tamiya": "-", "vallejo": "71.265", "hataka": "HTK-_053", "humbrol": "-", "modelmaster": "2089", "lifecolor": "UA138", "era": "old"}, {"code": "RC285", "name": "RAF Sky Grey", "bsfsral": "FS 26373", "mrhobby": "-", "tamiya": "-", "vallejo": "71.339", "hataka": "HTK-_302", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA036", "era": "old"}, {"code": "RC286", "name": "RAF Dark Green", "bsfsral": "BS381C/241", "mrhobby": "C330 / H330", "tamiya": "XF-81", "vallejo": "71.324", "hataka": "HTK-_143", "humbrol": "163", "modelmaster": "2060 / 4849", "lifecolor": "UA546", "era": "old"}, {"code": "RC287", "name": "RAF Dark Earth", "bsfsral": "-", "mrhobby": "C369 / H72", "tamiya": "-", "vallejo": "71.323", "hataka": "HTK-_009", "humbrol": "29", "modelmaster": "2054 / 4846", "lifecolor": "UA547", "era": "old"}, {"code": "RC288", "name": "RAF Ocean Grey", "bsfsral": "-", "mrhobby": "C362", "tamiya": "XF-82", "vallejo": "71.273", "hataka": "HTK-_032", "humbrol": "106", "modelmaster": "2057", "lifecolor": "UA093", "era": "old"}, {"code": "RC289", "name": "RAF Medium Sea Grey", "bsfsral": "BS381C/637", "mrhobby": "C335 / H335", "tamiya": "XF-83", "vallejo": "71.307", "hataka": "HTK-_034 / HTK-_141", "humbrol": "165", "modelmaster": "2058", "lifecolor": "UA094", "era": "old"}, {"code": "RC290", "name": "RAF Sky", "bsfsral": "FS 34424", "mrhobby": "C368", "tamiya": "-", "vallejo": "71.321", "hataka": "HTK-_234", "humbrol": "-", "modelmaster": "2049 / 4840", "lifecolor": "UA550", "era": "old"}, {"code": "RC291", "name": "RAF Azure Blue", "bsfsral": "-", "mrhobby": "C370", "tamiya": "-", "vallejo": "71.108", "hataka": "HTK-_028", "humbrol": "157", "modelmaster": "2048", "lifecolor": "UA098", "era": "old"}, {"code": "RC292", "name": "RAF Middle Stone", "bsfsral": "-", "mrhobby": "C21 / H71", "tamiya": "-", "vallejo": "71.031", "hataka": "HTK-_013", "humbrol": "225", "modelmaster": "2052", "lifecolor": "UA097", "era": "old"}, {"code": "RC293", "name": "RAF Cockpit Grey-Green", "bsfsral": "-", "mrhobby": "C364", "tamiya": "XF-71", "vallejo": "71.305", "hataka": "HTK-_025", "humbrol": "78", "modelmaster": "2062 / 4850", "lifecolor": "UA551", "era": "old"}, {"code": "RC294", "name": "RAF Dark Slate Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.309", "hataka": "HTK-_202", "humbrol": "224", "modelmaster": "2056", "lifecolor": "-", "era": "old"}, {"code": "RC295", "name": "RAF Extra Dark Sea Grey", "bsfsral": "BS381C/640", "mrhobby": "C333 / H333", "tamiya": "XF-54", "vallejo": "71.110", "hataka": "HTK-_140", "humbrol": "123", "modelmaster": "-", "lifecolor": "UA109", "era": "old"}, {"code": "RC296", "name": "RAF Dark Sea Grey", "bsfsral": "BS381C/638", "mrhobby": "C331 / H331", "tamiya": "XF-77", "vallejo": "71.405", "hataka": "HTK-_144", "humbrol": "164", "modelmaster": "2059", "lifecolor": "-", "era": "old"}, {"code": "RC297", "name": "RAF PRU Blue", "bsfsral": "BS381C/636", "mrhobby": "C72 / H56", "tamiya": "XF-18", "vallejo": "71.109", "hataka": "HTK-_207", "humbrol": "230", "modelmaster": "2061", "lifecolor": "-", "era": "old"}, {"code": "RC298", "name": "RAF Light Aircraft Grey", "bsfsral": "BS381C/627", "mrhobby": "C332 / H332", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_217", "humbrol": "166", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC299", "name": "RAF Camouflage (Barley) Grey", "bsfsral": "BS381C/626", "mrhobby": "C334 / H334", "tamiya": "XF-80", "vallejo": "-", "hataka": "HTK-_142", "humbrol": "167", "modelmaster": "-", "lifecolor": "UA079", "era": "old"}, {"code": "RC300", "name": "RAF Dark Camouflage Grey", "bsfsral": "BS381C/629", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_214", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC301", "name": "RAF Camouflage Beige (Hemp)", "bsfsral": "BS381C/389", "mrhobby": "C336 / H336", "tamiya": "XF-57", "vallejo": "-", "hataka": "HTK-_262", "humbrol": "168", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC302", "name": "IJN J3 Hai-Iro (Grey)", "bsfsral": "-", "mrhobby": "C35 / H61", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC303", "name": "IJN J3 SP (Amber Grey)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.311", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC304", "name": "IJN D1 Deep Green Black", "bsfsral": "-", "mrhobby": "C15 / H59", "tamiya": "XF-11", "vallejo": "71.325", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC305", "name": "IJN D2 Green Black", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.322", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC306", "name": "IJN M3(M) Mitsubishi Interior Green", "bsfsral": "-", "mrhobby": "C126", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC307", "name": "IJN M3(N) Nakajima Interior Green", "bsfsral": "-", "mrhobby": "C127", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC308", "name": "AE-9 / AII Light Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.414", "hataka": "HTK-_127", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC309", "name": "AII Protective (Green)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.410", "hataka": "HTK-_128", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC310", "name": "AII Light Blue", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.317", "hataka": "HTK-_129", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC311", "name": "A-18f Light Blue", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.413", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC312", "name": "A-19f Green", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.411", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC313", "name": "AMT-1 Light Brown", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.320", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC314", "name": "A-21m Light Yellowish Brown", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.415", "hataka": "HTK-_074", "humbrol": "72", "modelmaster": "-", "lifecolor": "UA039", "era": "old"}, {"code": "RC315", "name": "AMT-4 / A-24m Green", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.301", "hataka": "HTK-_073", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC316", "name": "AMT-7 Light Blue", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.318", "hataka": "HTK-_072", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC317", "name": "AMT-11 Blue Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.304", "hataka": "HTK-_071", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC318", "name": "AMT-12 Dark Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.308", "hataka": "HTK-_070", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC319", "name": "A-14 Interior Steel Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.336", "hataka": "-", "humbrol": "5", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC320", "name": "RLM 76 Version 1", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC321", "name": "RLM 76 Version 2", "bsfsral": "-", "mrhobby": "C117 / H417", "tamiya": "-", "vallejo": "71.257", "hataka": "HTK-_038", "humbrol": "247", "modelmaster": "2086 / 4786", "lifecolor": "UA509", "era": "old"}, {"code": "RC322", "name": "RLM 76 Late War Variation", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.103", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC323", "name": "RLM 81 Version 1", "bsfsral": "-", "mrhobby": "C121 / H421", "tamiya": "XF-51", "vallejo": "71.264", "hataka": "HTK-_008", "humbrol": "251", "modelmaster": "2090", "lifecolor": "UA510", "era": "old"}, {"code": "RC324", "name": "RLM 81 Version 2", "bsfsral": "-", "mrhobby": "C123 / H423", "tamiya": "XF-74", "vallejo": "71.011", "hataka": "HTK-_022", "humbrol": "253", "modelmaster": "2091", "lifecolor": "UA132", "era": "old"}, {"code": "RC325", "name": "RLM 81 Version 3", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC326", "name": "RLM 82", "bsfsral": "-", "mrhobby": "C122 / H422", "tamiya": "-", "vallejo": "71.022", "hataka": "HTK-_020", "humbrol": "252", "modelmaster": "2092", "lifecolor": "UA511", "era": "old"}, {"code": "RC327", "name": "RLM 83", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC328", "name": "IJAAF #1 Hairyokushoku (Grey Green)", "bsfsral": "-", "mrhobby": "C56 / H62", "tamiya": "XF-12", "vallejo": "71.326", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC329", "name": "IJAAF #3 Hairanshoku (Grey Indigo)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "77", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC330", "name": "IJAAF #7 Ohryoku Nana Go Shoku (Olive Brown)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.286", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC331", "name": "IJAAF #21 Midori Iro (Green)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC332", "name": "IJAAF #27 Ao Midori Iro (Blue Green)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC333", "name": "IJAAF #29 Ki Midori Iro (Yellow Green)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC334", "name": "IJAAF #30 Karekusa Iro (Dry Grass Colour)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC335", "name": "IJAAF #31 Cha Kasshoku (Tea Colour)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC336", "name": "MiG-25/MiG-31 Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC337", "name": "MiG-29 Light Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "2133", "lifecolor": "-", "era": "old"}, {"code": "RC338", "name": "MiG-29 Grey Green", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.340", "hataka": "-", "humbrol": "-", "modelmaster": "2134", "lifecolor": "-", "era": "old"}, {"code": "RC339", "name": "RLM 66 (1938)", "bsfsral": "-", "mrhobby": "C116 / H416", "tamiya": "XF-24", "vallejo": "71.055", "hataka": "HTK-_040", "humbrol": "-", "modelmaster": "2079 / 4779", "lifecolor": "UA133", "era": "old"}, {"code": "RC340", "name": "Kenttävihreä – Olive Green", "bsfsral": "FS 34096", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_301", "humbrol": "30", "modelmaster": "2027", "lifecolor": "UA142", "era": "old"}, {"code": "RC341", "name": "Schwarzgrau – Black Grey", "bsfsral": "RAL 7021 (Modern RAL 840 HR)", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_224", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC342", "name": "Dark Green", "bsfsral": "FS 34064", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_232", "humbrol": "-", "modelmaster": "-", "lifecolor": "UA119", "era": "old"}, {"code": "RC500", "name": "Flat Varnish", "bsfsral": "-", "mrhobby": "C182 / H20", "tamiya": "XF-86", "vallejo": "70.520", "hataka": "HTK-XP07", "humbrol": "49", "modelmaster": "2015 / 4636", "lifecolor": "LC27", "era": "old"}, {"code": "RC501", "name": "Satin Varnish", "bsfsral": "-", "mrhobby": "C181", "tamiya": "-", "vallejo": "70.522", "hataka": "HTK-XP08", "humbrol": "135", "modelmaster": "2016 / 4637", "lifecolor": "LC77", "era": "old"}, {"code": "RC502", "name": "Gloss Varnish", "bsfsral": "-", "mrhobby": "C46 / H30", "tamiya": "X-22", "vallejo": "70.510", "hataka": "HTK-XP09", "humbrol": "35", "modelmaster": "2017 / 4638", "lifecolor": "LC73", "era": "old"}, {"code": "RC503", "name": "Clear Red", "bsfsral": "-", "mrhobby": "C47 / H90", "tamiya": "X-27", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "4630", "lifecolor": "-", "era": "old"}, {"code": "RC504", "name": "Clear Blue", "bsfsral": "-", "mrhobby": "C50 / H93", "tamiya": "X-23", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "4658", "lifecolor": "-", "era": "old"}, {"code": "RC505", "name": "Clear Green", "bsfsral": "-", "mrhobby": "C138 / H94", "tamiya": "X-25", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "4668", "lifecolor": "-", "era": "old"}, {"code": "RC506", "name": "Clear Orange", "bsfsral": "-", "mrhobby": "C49 / H92", "tamiya": "X-26", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "4625", "lifecolor": "-", "era": "old"}, {"code": "RC507", "name": "Clear Yellow", "bsfsral": "-", "mrhobby": "C48 / H91", "tamiya": "X-24", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC508", "name": "Clear Smoke", "bsfsral": "-", "mrhobby": "C101 / H95", "tamiya": "X-19", "vallejo": "-", "hataka": "-", "humbrol": "-", "modelmaster": "-", "lifecolor": "-", "era": "old"}, {"code": "RC801", "name": "Flat Varnish", "bsfsral": "-", "mrhobby": "C182 / H20", "tamiya": "XF-86", "vallejo": "70.520", "hataka": "HTK-XP07", "mrp": "MRP-127", "modelmaster": "2015 / 4636", "lifecolor": "LC27", "prevref": "RC500", "section": "STANDARD", "era": "new"}, {"code": "RC802", "name": "Satin Varnish", "bsfsral": "-", "mrhobby": "C181", "tamiya": "-", "vallejo": "70.522", "hataka": "HTK-XP08", "mrp": "MRP-125", "modelmaster": "2016 / 4637", "lifecolor": "LC77", "prevref": "RC501", "section": "STANDARD", "era": "new"}, {"code": "RC803", "name": "Gloss Varnish", "bsfsral": "-", "mrhobby": "C46 / H30", "tamiya": "X-22", "vallejo": "70.510", "hataka": "HTK-XP09", "mrp": "MRP-048", "modelmaster": "2017 / 4638", "lifecolor": "LC73", "prevref": "RC502", "section": "STANDARD", "era": "new"}, {"code": "RC804", "name": "Flat Black", "bsfsral": "RAL 9005**", "mrhobby": "C33 / H12", "tamiya": "XF-1", "vallejo": "71.057", "hataka": "HTK-_100", "mrp": "MRP-005", "modelmaster": "1749 / 4768", "lifecolor": "LC02", "prevref": "RC001", "section": "STANDARD", "era": "new"}, {"code": "RC805", "name": "Rubber Black", "bsfsral": "-", "mrhobby": "C137 / H77", "tamiya": "XF-85", "vallejo": "71.315", "hataka": "-", "mrp": "MRP-173", "modelmaster": "1583", "lifecolor": "UA733", "prevref": "RC022", "section": "STANDARD", "era": "new"}, {"code": "RC806", "name": "Flat White", "bsfsral": "RAL 9003**", "mrhobby": "C62 / H11", "tamiya": "XF-2", "vallejo": "71.001", "hataka": "-", "mrp": "MRP-004", "modelmaster": "1768 / 4769", "lifecolor": "LC01", "prevref": "RC004", "section": "STANDARD", "era": "new"}, {"code": "RC807", "name": "Cream White", "bsfsral": "RAL 9001**", "mrhobby": "-", "tamiya": "-", "vallejo": "71.270", "hataka": "HTK-_307", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC002", "section": "STANDARD", "era": "new"}, {"code": "RC808", "name": "Off White", "bsfsral": "-", "mrhobby": "C69 / H21", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "4874", "lifecolor": "-", "prevref": "RC013", "section": "STANDARD", "era": "new"}, {"code": "RC809", "name": "White Grey", "bsfsral": "RAL 9002**", "mrhobby": "-", "tamiya": "-", "vallejo": "71.119", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC003", "section": "STANDARD", "era": "new"}, {"code": "RC810", "name": "Red", "bsfsral": "RAL 3000**", "mrhobby": "H13", "tamiya": "XF-7", "vallejo": "71.269", "hataka": "HTK-_132", "mrp": "-", "modelmaster": "2733", "lifecolor": "LC06", "prevref": "RC006", "section": "STANDARD", "era": "new"}, {"code": "RC811", "name": "Signal Red", "bsfsral": "RAL 3020**", "mrhobby": "C79 / H23", "tamiya": "-", "vallejo": "71.003", "hataka": "HTK-_103", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC005", "section": "STANDARD", "era": "new"}, {"code": "RC812", "name": "Orange", "bsfsral": "RAL 2004**", "mrhobby": "C59 / H14", "tamiya": "X-6", "vallejo": "71.083", "hataka": "HTK-_704", "mrp": "-", "modelmaster": "-", "lifecolor": "LC05", "prevref": "RC009", "section": "STANDARD", "era": "new"}, {"code": "RC813", "name": "Maize Yellow", "bsfsral": "RAL 1006**", "mrhobby": "H34", "tamiya": "-", "vallejo": "71.033", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC008", "section": "STANDARD", "era": "new"}, {"code": "RC814", "name": "Yellow", "bsfsral": "RAL 1003**", "mrhobby": "C329 / H329", "tamiya": "X-8", "vallejo": "71.135", "hataka": "HTK-_107", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC007", "section": "STANDARD", "era": "new"}, {"code": "RC815", "name": "Buff", "bsfsral": "-", "mrhobby": "C336 / H336", "tamiya": "XF-57", "vallejo": "-", "hataka": "HTK-_262", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC014", "section": "STANDARD", "era": "new"}, {"code": "RC816", "name": "Pale Blue", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC017", "section": "STANDARD", "era": "new"}, {"code": "RC817", "name": "Blue", "bsfsral": "RAL 5001**", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC011", "section": "STANDARD", "era": "new"}, {"code": "RC818", "name": "Pure Blue", "bsfsral": "RAL 5005**", "mrhobby": "-", "tamiya": "-", "vallejo": "70.930", "hataka": "HTK-_102", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC010", "section": "STANDARD", "era": "new"}, {"code": "RC819", "name": "Gun Metal", "bsfsral": "-", "mrhobby": "C78 / H28", "tamiya": "X-10", "vallejo": "71.073", "hataka": "HTK-_106", "mrp": "MRP-149", "modelmaster": "1795 / 4681", "lifecolor": "LC26", "prevref": "RC015", "section": "STANDARD", "era": "new"}, {"code": "RC820", "name": "Aluminium", "bsfsral": "-", "mrhobby": "-", "tamiya": "XF-16", "vallejo": "71.062", "hataka": "HTK-_078", "mrp": "-", "modelmaster": "1781 / 4677", "lifecolor": "LC24", "prevref": "RC020", "section": "STANDARD", "era": "new"}, {"code": "RC821", "name": "Clear Red", "bsfsral": "-", "mrhobby": "C47 / H90", "tamiya": "X-27", "vallejo": "-", "hataka": "-", "mrp": "MRP-266", "modelmaster": "4630", "lifecolor": "-", "prevref": "RC503", "section": "STANDARD", "era": "new"}, {"code": "RC822", "name": "Clear Blue", "bsfsral": "-", "mrhobby": "C50 / H93", "tamiya": "X-23", "vallejo": "-", "hataka": "-", "mrp": "MRP-267", "modelmaster": "4658", "lifecolor": "-", "prevref": "RC504", "section": "STANDARD", "era": "new"}, {"code": "RC823", "name": "Clear Green", "bsfsral": "-", "mrhobby": "C138 / H94", "tamiya": "X-25", "vallejo": "-", "hataka": "-", "mrp": "MRP-268", "modelmaster": "4668", "lifecolor": "-", "prevref": "RC505", "section": "STANDARD", "era": "new"}, {"code": "RC824", "name": "Clear Orange", "bsfsral": "-", "mrhobby": "C49 / H92", "tamiya": "X-26", "vallejo": "-", "hataka": "-", "mrp": "MRP-265", "modelmaster": "4625", "lifecolor": "-", "prevref": "RC506", "section": "STANDARD", "era": "new"}, {"code": "RC825", "name": "Clear Yellow", "bsfsral": "-", "mrhobby": "C48 / H91", "tamiya": "X-24", "vallejo": "-", "hataka": "-", "mrp": "MRP-264", "modelmaster": "-", "lifecolor": "-", "prevref": "RC507", "section": "STANDARD", "era": "new"}, {"code": "RC826", "name": "Clear Smoke", "bsfsral": "-", "mrhobby": "C101 / H95", "tamiya": "X-19", "vallejo": "-", "hataka": "-", "mrp": "MRP-271", "modelmaster": "-", "lifecolor": "-", "prevref": "RC508", "section": "STANDARD", "era": "new"}, {"code": "RC827", "name": "Solid White", "section": "CIVIL", "era": "new"}, {"code": "RC828", "name": "British F1 Black 1972-1986", "section": "CIVIL", "era": "new", "n5": "N5-C174", "zp": "ZP-1121", "info": "Used for painting Lotus Formula 1 cars in the famous JPS livery from 1972 to 1986."}, {"code": "RC829", "name": "Carbon Fibre Grey", "section": "CIVIL", "era": "new", "zp": "ZP-1323", "info": "Used for applying a basecoat under clear carbon fibre decals."}, {"code": "RC830", "name": "Wheel Rim Gold", "section": "CIVIL", "era": "new", "n5": "N5-X082", "mrp": "MRP-C016", "zp": "ZP-1575", "info": "Used for painting BBS wheels."}, {"code": "RC831", "name": "Fork Gold", "section": "CIVIL", "era": "new", "zp": "ZP-1432", "info": "Used for painting motorcycle forks."}, {"code": "RC832", "name": "Alfa BT Red", "section": "CIVIL", "era": "new", "n5": "N5-C021", "zp": "ZP-1091", "info": "Used as the base color of Brabham-Alfa Romeo BT45B, BT46, BT46B, BT48 racing cars."}, {"code": "RC833", "name": "Maranello F1 Red 1970s-1980s", "section": "CIVIL", "era": "new", "zp": "ZP-1007", "info": "Used as the base color of Ferrari F1 cars in the 1970s-1980s, including models 312B, 312B2, 312B3, 312T, 312T2, 312T2B, 312T3, 312T4, 312T5, 126C, 126CK, 126C2, 126C2B, 126C3, 126C4, 156/85."}, {"code": "RC834", "name": "Maranello Red 300", "section": "CIVIL", "era": "new", "mrp": "MRP-C026", "zp": "ZP-8007", "info": "The most commonly used base color of Ferrari racing and sports cars since the early 1980s."}, {"code": "RC835", "name": "Italian Red", "section": "CIVIL", "era": "new", "tamiya": "TS-8", "zp": "ZP-1114", "info": "Used for painting many street and racing cars by Italian manufacturers such as Alfa Romeo, Fiat, Lancia etc."}, {"code": "RC836", "name": "Panigale Red", "section": "CIVIL", "era": "new", "n5": "N5-C033", "gravity": "GC-1160", "zp": "ZP-1273", "info": "Used as the base color of Ducati 1199 Panigale S motorcycles."}, {"code": "RC837", "name": "Fluorescent Red", "section": "CIVIL", "era": "new", "bsfsral": "RAL 3026**", "tamiya": "TS-36", "n5": "N5-X017", "gravity": "GC-168", "zp": "ZP-1033"}, {"code": "RC838", "name": "Fluorescent Orange", "section": "CIVIL", "era": "new", "tamiya": "TS-96", "zp": "ZP-1009"}, {"code": "RC839", "name": "Gulf Orange", "section": "CIVIL", "era": "new", "n5": "N5-X008", "gravity": "GC-109", "zp": "ZP-1259", "info": "Used for painting such cars as Porsche 917 and Ford GT40 in the iconic orange/light blue color scheme associated with racing teams sponsored by the Gulf Oil company."}, {"code": "RC840", "name": "Jäger Orange", "section": "CIVIL", "era": "new", "n5": "N5-X022", "mrp": "MRP-C023", "gravity": "GC-117", "zp": "ZP-1057", "info": "Used for painting racing cars sponsored by Jagermeister company."}, {"code": "RC841", "name": "French F1 Yellow 1970s-1980s", "section": "CIVIL", "era": "new", "n5": "N5-C026", "zp": "ZP-1085", "info": "Used for painting Renault Formula 1 cars in the 1970s-1980s. Suitable for models RS01, RS10 and RE20."}, {"code": "RC842", "name": "Light Blue", "section": "CIVIL", "era": "new", "tamiya": "TS-23", "zp": "ZP-1093"}, {"code": "RC843", "name": "Tyrrell Blue", "section": "CIVIL", "era": "new", "n5": "N5-X027", "zp": "ZP-8067", "info": "Used for painting Tyrrell Formula 1 cars in the 1970s-1980s."}, {"code": "RC844", "name": "Gulf Blue", "section": "CIVIL", "era": "new", "n5": "N5-X009", "zp": "ZP-1103", "info": "Used for painting such cars as Porsche 917 and Ford GT40 in the iconic orange/light blue color scheme associated with racing teams sponsored by the Gulf Oil company."}, {"code": "RC845", "name": "Rally Blue 74F 1997-2002", "section": "CIVIL", "era": "new", "n5": "N5-C075", "zp": "ZP-1041-74F", "info": "Used as the base color of Subaru Impreza WRC cars between 1997 and 2002."}, {"code": "RC846", "name": "Rally Blue 02C 2001-2006", "section": "CIVIL", "era": "new", "n5": "N5-C074", "zp": "ZP-1041-02C", "info": "Used as the base color of Subaru Impreza WRC cars between 2001 and 2006."}, {"code": "RC847", "name": "British Racing Green", "section": "CIVIL", "era": "new", "zp": "ZP-1087", "info": "Used as the base color of numerous classic English racing cars."}, {"code": "RC848", "name": "Vaillant Green", "section": "CIVIL", "era": "new", "n5": "N5-C015", "gravity": "GC-118", "zp": "ZP-1276", "info": "Used as the base color of Porsche 934 Turbo RSR racing cars sponsored by Vaillant."}, {"code": "RC849", "name": "Ninja Green", "section": "CIVIL", "era": "new", "n5": "N5-C115", "zp": "ZP-1018", "info": "Used as the base color of Kawasaki Ninja ZX-RR race motorcycles."}, {"code": "RC850", "name": "Holographic Pearl", "section": "CIVIL", "era": "new", "info": "The shade of this color varies according to the color of the previously applied primer or base coat."}, {"code": "RC851", "name": "Elfenbein-Ivory(Interior Color)", "bsfsral": "RAL 1001*", "mrhobby": "-", "tamiya": "-", "vallejo": "71.075", "hataka": "HTK-_184", "mrp": "MRP-210", "modelmaster": "2104 / 4805", "lifecolor": "-", "prevref": "RC046", "section": "MILITARY", "era": "new"}, {"code": "RC852", "name": "Olivgrün-Olive Green", "bsfsral": "RAL 6003*", "mrhobby": "H405", "tamiya": "-", "vallejo": "71.092", "hataka": "HTK-_169", "mrp": "MRP-035", "modelmaster": "2149 / 4862", "lifecolor": "UA206", "prevref": "RC047", "section": "MILITARY", "era": "new"}, {"code": "RC853", "name": "Graugrün-Grey Green", "bsfsral": "RAL 7008*", "mrhobby": "-", "tamiya": "-", "vallejo": "71.116", "hataka": "HTK-_304", "mrp": "MRP-211", "modelmaster": "2098", "lifecolor": "UA212", "prevref": "RC053", "section": "MILITARY", "era": "new"}, {"code": "RC854", "name": "Hellgrau-Light Grey (Interior Color)", "bsfsral": "RAL 7009*", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "UA233", "prevref": "RC054", "section": "MILITARY", "era": "new"}, {"code": "RC855", "name": "Dunkelbraun-Dark Brown", "bsfsral": "RAL 7017*", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "UA210", "prevref": "RC056", "section": "MILITARY", "era": "new"}, {"code": "RC856", "name": "Dunkelgrau-Dark Grey", "bsfsral": "RAL 7021*", "mrhobby": "H401", "tamiya": "XF-63", "vallejo": "71.056", "hataka": "HTK-_164", "mrp": "MRP-034", "modelmaster": "2094 / 4795", "lifecolor": "UA207", "prevref": "RC057", "section": "MILITARY", "era": "new"}, {"code": "RC857", "name": "Grau-Grey", "bsfsral": "RAL 7027*", "mrhobby": "H404", "tamiya": "-", "vallejo": "71.118", "hataka": "HTK-_306", "mrp": "MRP-212", "modelmaster": "2103", "lifecolor": "UA202", "prevref": "RC058", "section": "MILITARY", "era": "new"}, {"code": "RC858", "name": "Dunkelgelb nach Muster-Dark Yellow acc. to Sample", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_310", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC059", "section": "MILITARY", "era": "new"}, {"code": "RC859", "name": "Dunkelgelb-Dark Yellow", "bsfsral": "RAL 7028*", "mrhobby": "H403", "tamiya": "XF-60", "vallejo": "71.025", "hataka": "HTK-_244", "mrp": "MRP-037", "modelmaster": "2095 / 4796", "lifecolor": "UA204", "prevref": "RC060", "section": "MILITARY", "era": "new"}, {"code": "RC860", "name": "Dunkelgelb Ausgabe 1944-Dark Yellow 1944", "bsfsral": "RAL 7028*", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_250", "mrp": "MRP-216", "modelmaster": "-", "lifecolor": "-", "prevref": "RC061", "section": "MILITARY", "era": "new"}, {"code": "RC861", "name": "Gelbraun-Yellow Brown", "bsfsral": "RAL 8000*", "mrhobby": "-", "tamiya": "-", "vallejo": "71.272", "hataka": "HTK-_303", "mrp": "MRP-213", "modelmaster": "2099", "lifecolor": "UA203", "prevref": "RC063", "section": "MILITARY", "era": "new"}, {"code": "RC862", "name": "Rot (Rotbraun)-Red (Red Brown)", "bsfsral": "RAL 8012*", "mrhobby": "C43 / H47", "tamiya": "-", "vallejo": "71.271", "hataka": "HTK-_175", "mrp": "MRP-033", "modelmaster": "2152 / 4861", "lifecolor": "UA211", "prevref": "RC067", "section": "MILITARY", "era": "new"}, {"code": "RC863", "name": "Rot (Rotbraun)-Red (Red Brown)", "bsfsral": "RAL 8013*", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "2165", "lifecolor": "-", "prevref": "RC066", "section": "MILITARY", "era": "new"}, {"code": "RC864", "name": "Rotbraun-Red Brown", "bsfsral": "RAL 8017*", "mrhobby": "H406", "tamiya": "XF-9", "vallejo": "71.041", "hataka": "HTK-_147", "mrp": "MRP-036", "modelmaster": "2096 / 4797", "lifecolor": "UA205", "prevref": "RC068", "section": "MILITARY", "era": "new"}, {"code": "RC865", "name": "Braun-Brown", "bsfsral": "RAL 8020*", "mrhobby": "H402", "tamiya": "-", "vallejo": "71.117", "hataka": "HTK-_305", "mrp": "MRP-214", "modelmaster": "2102", "lifecolor": "UA201", "prevref": "RC069", "section": "MILITARY", "era": "new"}, {"code": "RC866", "name": "Silver Grey No.28 (BS381)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.401", "hataka": "-", "mrp": "MRP-334", "modelmaster": "-", "lifecolor": "UA264", "prevref": "RC038", "section": "MILITARY", "era": "new"}, {"code": "RC867", "name": "Slate No.34 (BS381)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.012", "hataka": "-", "mrp": "MRP-335", "modelmaster": "-", "lifecolor": "UA265", "prevref": "RC039", "section": "MILITARY", "era": "new"}, {"code": "RC868", "name": "Light Stone No.61 (BS381)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.143", "hataka": "-", "mrp": "MRP-337", "modelmaster": "-", "lifecolor": "UA266", "prevref": "RC040", "section": "MILITARY", "era": "new"}, {"code": "RC869", "name": "Portland Stone No.64 (BS381)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.288", "hataka": "-", "mrp": "MRP-338", "modelmaster": "-", "lifecolor": "UA267", "prevref": "RC041", "section": "MILITARY", "era": "new"}, {"code": "RC870", "name": "British Dark Olive Green PFI", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "MRP-340", "modelmaster": "-", "lifecolor": "UA269", "prevref": "RC042", "section": "MILITARY", "era": "new"}, {"code": "RC871", "name": "British Desert Pink ZI", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.400", "hataka": "-", "mrp": "MRP-339", "modelmaster": "-", "lifecolor": "UA268", "prevref": "RC043", "section": "MILITARY", "era": "new"}, {"code": "RC872", "name": "British Light Mud", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.284", "hataka": "-", "mrp": "MRP-350", "modelmaster": "-", "lifecolor": "UA272", "prevref": "RC044", "section": "MILITARY", "era": "new"}, {"code": "RC873", "name": "S.C.C. No.1A Very Dark Brown", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.039", "hataka": "HTK-_077", "mrp": "MRP-345", "modelmaster": "-", "lifecolor": "UA274", "prevref": "RC034", "section": "MILITARY", "era": "new"}, {"code": "RC874", "name": "S.C.C. No.2 Brown", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.038", "hataka": "HTK-_076", "mrp": "MRP-346", "modelmaster": "-", "lifecolor": "UA273", "prevref": "RC035", "section": "MILITARY", "era": "new"}, {"code": "RC875", "name": "S.C.C. No.15 Olive Drab", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.016", "hataka": "HTK-_110", "mrp": "MRP-349", "modelmaster": "-", "lifecolor": "UA270", "prevref": "RC037", "section": "MILITARY", "era": "new"}, {"code": "RC876", "name": "Russian Green Protective 4BO", "bsfsral": "-", "mrhobby": "C512", "tamiya": "-", "vallejo": "71.017", "hataka": "HTK-_251", "mrp": "MRP-026", "modelmaster": "-", "lifecolor": "-", "prevref": "RC073", "section": "MILITARY", "era": "new"}, {"code": "RC877", "name": "Russian Modern Green", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC098", "section": "MILITARY", "era": "new"}, {"code": "RC878", "name": "Russian Greyish Yellow", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC099", "section": "MILITARY", "era": "new"}, {"code": "RC879", "name": "Russian Grey Green", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC100", "section": "MILITARY", "era": "new"}, {"code": "RC880", "name": "IDF Early Sand Yellow", "bsfsral": "-", "mrhobby": "C528", "tamiya": "-", "vallejo": "71.141", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "UA020", "prevref": "RC096", "section": "MILITARY", "era": "new"}, {"code": "RC881", "name": "IDF Sand Grey 1970s-1980s", "bsfsral": "-", "mrhobby": "C529", "tamiya": "-", "vallejo": "71.142", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "UA902", "prevref": "RC095", "section": "MILITARY", "era": "new"}, {"code": "RC882", "name": "IDF Modern Grey", "bsfsral": "-", "mrhobby": "C530", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "2138", "lifecolor": "-", "prevref": "RC094", "section": "MILITARY", "era": "new"}, {"code": "RC883", "name": "C12/H52", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_018", "mrp": "-", "modelmaster": "2050 / 4842", "lifecolor": "-", "prevref": "RC023", "section": "MILITARY", "era": "new"}, {"code": "RC884", "name": "Olive Drab Faded", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "UA003", "prevref": "RC024", "section": "MILITARY", "era": "new"}, {"code": "RC885", "name": "CARC Tan 686A", "bsfsral": "FS 33446", "mrhobby": "-", "tamiya": "-", "vallejo": "71.122", "hataka": "HTK-_238", "mrp": "-", "modelmaster": "2136 / 4812", "lifecolor": "-", "prevref": "RC079", "section": "MILITARY", "era": "new"}, {"code": "RC886", "name": "NATO Green", "bsfsral": "FS 34094", "mrhobby": "C519", "tamiya": "XF-67", "vallejo": "71.250", "hataka": "HTK-_152", "mrp": "MRP-078", "modelmaster": "2173", "lifecolor": "UA303", "prevref": "RC080", "section": "MILITARY", "era": "new"}, {"code": "RC887", "name": "NATO Brown", "bsfsral": "-", "mrhobby": "C520", "tamiya": "XF-68", "vallejo": "71.249", "hataka": "HTK-_188", "mrp": "MRP-079", "modelmaster": "2174", "lifecolor": "UA302", "prevref": "RC081", "section": "MILITARY", "era": "new"}, {"code": "RC888", "name": "NATO Black", "bsfsral": "FS 37030", "mrhobby": "C521", "tamiya": "XF-69", "vallejo": "71.251", "hataka": "HTK-_125", "mrp": "MRP-077", "modelmaster": "-", "lifecolor": "UA301", "prevref": "RC082", "section": "MILITARY", "era": "new"}, {"code": "RC889", "name": "Light Gull Grey", "bsfsral": "FS 16440", "mrhobby": "C315 / H315", "tamiya": "-", "vallejo": "71.121", "hataka": "HTK-_048", "mrp": "MRP-098", "modelmaster": "4692", "lifecolor": "UA025", "prevref": "RC220", "section": "MILITARY", "era": "new"}, {"code": "RC890", "name": "ADC Grey", "bsfsral": "FS 16473", "mrhobby": "-", "tamiya": "-", "vallejo": "71.335", "hataka": "HTK-_045", "mrp": "-", "modelmaster": "1731 / 4693", "lifecolor": "UA041", "prevref": "RC221", "section": "MILITARY", "era": "new"}, {"code": "RC891", "name": "Insignia White", "bsfsral": "FS 17875", "mrhobby": "C316 / H316", "tamiya": "X-1", "vallejo": "71.279", "hataka": "HTK-_049", "mrp": "MRP-099", "modelmaster": "1745 / 4696", "lifecolor": "LC52", "prevref": "RC222", "section": "MILITARY", "era": "new"}, {"code": "RC892", "name": "Earth Brown", "bsfsral": "FS 30099", "mrhobby": "-", "tamiya": "-", "vallejo": "71.290", "hataka": "HTK-_256", "mrp": "-", "modelmaster": "-", "lifecolor": "UA087", "prevref": "RC029", "section": "MILITARY", "era": "new"}, {"code": "RC893", "name": "Earth Red", "bsfsral": "FS 30117", "mrhobby": "C43 / H37", "tamiya": "-", "vallejo": "71.293", "hataka": "HTK-_213", "mrp": "MRP-387", "modelmaster": "1701 / 4707", "lifecolor": "UA306", "prevref": "RC031", "section": "MILITARY", "era": "new"}, {"code": "RC894", "name": "Field Drab", "bsfsral": "FS 30118", "mrhobby": "-", "tamiya": "-", "vallejo": "71.139", "hataka": "HTK-_209", "mrp": "-", "modelmaster": "1702 / 4708", "lifecolor": "UA016", "prevref": "RC085", "section": "MILITARY", "era": "new"}, {"code": "RC895", "name": "Dark Tan", "bsfsral": "FS 30219", "mrhobby": "C310 / H310", "tamiya": "-", "vallejo": "71.125", "hataka": "HTK-_012", "mrp": "MRP-103", "modelmaster": "1742 / 4709", "lifecolor": "UA015", "prevref": "RC225", "section": "MILITARY", "era": "new"}, {"code": "RC896", "name": "Sand", "bsfsral": "FS 30277", "mrhobby": "-", "tamiya": "-", "vallejo": "71.138", "hataka": "HTK-_210", "mrp": "MRP-395", "modelmaster": "4711", "lifecolor": "UA019", "prevref": "RC084", "section": "MILITARY", "era": "new"}, {"code": "RC897", "name": "Desert Sand", "bsfsral": "FS 30279", "mrhobby": "H346", "tamiya": "-", "vallejo": "71.140", "hataka": "HTK-_068", "mrp": "MRP-243", "modelmaster": "2053", "lifecolor": "UA089", "prevref": "RC032", "section": "MILITARY", "era": "new"}, {"code": "RC898", "name": "Sand", "bsfsral": "FS 33531", "mrhobby": "C313 / H313", "tamiya": "XF-59", "vallejo": "71.327", "hataka": "HTK-_090", "mrp": "MRP-226", "modelmaster": "1706 / 4720", "lifecolor": "-", "prevref": "RC226", "section": "MILITARY", "era": "new"}, {"code": "RC899", "name": "US Army Helo Drab", "bsfsral": "FS 34031", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_067", "mrp": "MRP-174", "modelmaster": "2024 / 4723", "lifecolor": "-", "prevref": "RC229", "section": "MILITARY", "era": "new"}, {"code": "RC900", "name": "Forest Green", "bsfsral": "FS 34079", "mrhobby": "C309 / H309", "tamiya": "XF-65", "vallejo": "71.294", "hataka": "HTK-_016", "mrp": "MRP-101", "modelmaster": "1710 / 4726", "lifecolor": "UA001", "prevref": "RC027", "section": "MILITARY", "era": "new"}, {"code": "RC901", "name": "Olive Drab", "bsfsral": "FS 34087", "mrhobby": "C304 / H304", "tamiya": "-", "vallejo": "71.043", "hataka": "HTK-_065", "mrp": "MRP-234", "modelmaster": "1711 / 4728", "lifecolor": "UA523", "prevref": "RC026", "section": "MILITARY", "era": "new"}, {"code": "RC902", "name": "Dull Dark Green", "bsfsral": "FS 34092", "mrhobby": "C302 / H302", "tamiya": "XF-26", "vallejo": "71.124", "hataka": "HTK-_056", "mrp": "MRP-235", "modelmaster": "1764 / 4729", "lifecolor": "UA008", "prevref": "RC230", "section": "MILITARY", "era": "new"}, {"code": "RC903", "name": "USMC Green", "bsfsral": "FS 34095", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_059", "mrp": "MRP-369", "modelmaster": "1786", "lifecolor": "-", "prevref": "RC209", "section": "MILITARY", "era": "new"}, {"code": "RC904", "name": "Field Green", "bsfsral": "FS 34097", "mrhobby": "C340 / H340", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "MRP-236", "modelmaster": "1712", "lifecolor": "-", "prevref": "RC231", "section": "MILITARY", "era": "new"}, {"code": "RC905", "name": "Green", "bsfsral": "FS 34102", "mrhobby": "C303 / H303", "tamiya": "-", "vallejo": "71.289", "hataka": "HTK-_021", "mrp": "MRP-102", "modelmaster": "1713 / 4734", "lifecolor": "UA002", "prevref": "RC083", "section": "MILITARY", "era": "new"}, {"code": "RC906", "name": "Interior Green", "bsfsral": "FS 34151", "mrhobby": "C351 / H58", "tamiya": "-", "vallejo": "71.137", "hataka": "HTK-_211", "mrp": "MRP-131", "modelmaster": "1715 / 4736", "lifecolor": "UA004", "prevref": "RC028", "section": "MILITARY", "era": "new"}, {"code": "RC907", "name": "Pale Green", "bsfsral": "FS 34227", "mrhobby": "C312 / H312", "tamiya": "-", "vallejo": "71.126", "hataka": "HTK-_091", "mrp": "MRP-227", "modelmaster": "1716 / 4739", "lifecolor": "UA060", "prevref": "RC232", "section": "MILITARY", "era": "new"}, {"code": "RC908", "name": "Intermediate Blue", "bsfsral": "FS 35164", "mrhobby": "C366 / H56", "tamiya": "-", "vallejo": "71.299", "hataka": "HTK-_027", "mrp": "MRP-136", "modelmaster": "1720 / 4744", "lifecolor": "UA045", "prevref": "RC235", "section": "MILITARY", "era": "new"}, {"code": "RC909", "name": "Medium Blue Grey", "bsfsral": "FS 35237", "mrhobby": "C337 / H337", "tamiya": "-", "vallejo": "71.114", "hataka": "HTK-_046", "mrp": "MRP-105", "modelmaster": "1721 / 4746", "lifecolor": "UA145", "prevref": "RC237", "section": "MILITARY", "era": "new"}, {"code": "RC910", "name": "Air Superiority Blue", "bsfsral": "FS 35450", "mrhobby": "-", "tamiya": "-", "vallejo": "71.332", "hataka": "HTK-_155", "mrp": "MRP-240", "modelmaster": "-", "lifecolor": "UA037", "prevref": "RC239", "section": "MILITARY", "era": "new"}, {"code": "RC911", "name": "Duck Egg Blue", "bsfsral": "FS 35622", "mrhobby": "C314 / H314", "tamiya": "-", "vallejo": "71.328", "hataka": "HTK-_092", "mrp": "MRP-225", "modelmaster": "1722 / 4748", "lifecolor": "UA139", "prevref": "RC241", "section": "MILITARY", "era": "new"}, {"code": "RC912", "name": "Grey", "bsfsral": "FS 36081", "mrhobby": "C301 / H301", "tamiya": "-", "vallejo": "71.314", "hataka": "HTK-_030", "mrp": "MRP-241", "modelmaster": "1788 / 4750", "lifecolor": "UA030", "prevref": "RC243", "section": "MILITARY", "era": "new"}, {"code": "RC913", "name": "Medium Gunship Grey", "bsfsral": "FS 36118", "mrhobby": "C305 / H305", "tamiya": "-", "vallejo": "71.097", "hataka": "HTK-_031", "mrp": "MRP-040", "modelmaster": "1723 / 4752", "lifecolor": "UA022", "prevref": "RC244", "section": "MILITARY", "era": "new"}, {"code": "RC914", "name": "Have Glass Grey", "bsfsral": "FS 36170", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_058", "mrp": "MRP-280", "modelmaster": "-", "lifecolor": "UA591", "prevref": "RC245", "section": "MILITARY", "era": "new"}, {"code": "RC915", "name": "F-15 Dark Grey (Mod Eagle)", "bsfsral": "FS 36176", "mrhobby": "-", "tamiya": "-", "vallejo": "71.273", "hataka": "HTK-_158", "mrp": "MRP-093", "modelmaster": "2036 / 4754", "lifecolor": "UA029", "prevref": "RC246", "section": "MILITARY", "era": "new"}, {"code": "RC916", "name": "Dark Gull Grey", "bsfsral": "FS 36231", "mrhobby": "C317 / H317", "tamiya": "-", "vallejo": "71.277", "hataka": "HTK-_044", "mrp": "MRP-100", "modelmaster": "1740 / 4755", "lifecolor": "UA033", "prevref": "RC247", "section": "MILITARY", "era": "new"}, {"code": "RC917", "name": "Aggressor Grey", "bsfsral": "FS 36251", "mrhobby": "-", "tamiya": "-", "vallejo": "71.274", "hataka": "HTK-_157", "mrp": "MRP-094", "modelmaster": "-", "lifecolor": "UA034", "prevref": "RC248", "section": "MILITARY", "era": "new"}, {"code": "RC918", "name": "Medium Grey", "bsfsral": "FS 36270", "mrhobby": "C306 / H306", "tamiya": "-", "vallejo": "71.275", "hataka": "HTK-_054", "mrp": "MRP-039", "modelmaster": "1725 / 4757", "lifecolor": "UA028", "prevref": "RC249", "section": "MILITARY", "era": "new"}, {"code": "RC919", "name": "Dark Ghost Grey", "bsfsral": "FS 36320", "mrhobby": "C307 / H307", "tamiya": "-", "vallejo": "71.120", "hataka": "HTK-_035", "mrp": "MRP-097", "modelmaster": "1741 / 4761", "lifecolor": "UA027", "prevref": "RC251", "section": "MILITARY", "era": "new"}, {"code": "RC920", "name": "Light Ghost Grey", "bsfsral": "FS 36375", "mrhobby": "C308 / H308", "tamiya": "-", "vallejo": "70.615", "hataka": "HTK-_037", "mrp": "MRP-038", "modelmaster": "1728 / 4762", "lifecolor": "UA026", "prevref": "RC252", "section": "MILITARY", "era": "new"}, {"code": "RC921", "name": "Light Grey", "bsfsral": "FS 36495", "mrhobby": "C338 / H338", "tamiya": "-", "vallejo": "71.276", "hataka": "HTK-_050", "mrp": "MRP-364", "modelmaster": "1732 / 4765", "lifecolor": "UA023", "prevref": "RC253", "section": "MILITARY", "era": "new"}, {"code": "RC922", "name": "Camouflage Grey", "bsfsral": "FS 36622", "mrhobby": "C311 / H311", "tamiya": "-", "vallejo": "71.296", "hataka": "HTK-_039", "mrp": "MRP-104", "modelmaster": "4766", "lifecolor": "UA021", "prevref": "RC254", "section": "MILITARY", "era": "new"}, {"code": "RC923", "name": "M-485 Blue Grey", "bsfsral": "FS 35189", "mrhobby": "C367", "tamiya": "-", "vallejo": "71.109", "hataka": "HTK-_218", "mrp": "MRP-133", "modelmaster": "2055 / 4847", "lifecolor": "UA038", "prevref": "RC256", "section": "MILITARY", "era": "new"}, {"code": "RC924", "name": "Sea Blue", "bsfsral": "FS 35042", "mrhobby": "C71 / H55", "tamiya": "XF-17", "vallejo": "71.295", "hataka": "HTK-_006", "mrp": "MRP-237", "modelmaster": "1718", "lifecolor": "UA044", "prevref": "RC257", "section": "MILITARY", "era": "new"}, {"code": "RC925", "name": "Dark Sea Blue", "bsfsral": "FS 35045", "mrhobby": "C365", "tamiya": "-", "vallejo": "71.300", "hataka": "HTK-_001", "mrp": "MRP-014", "modelmaster": "1717 / 4686", "lifecolor": "UA047", "prevref": "RC258", "section": "MILITARY", "era": "new"}, {"code": "RC926", "name": "Dark Olive Drab 41", "bsfsral": "FS 33070", "mrhobby": "C38 / H78", "tamiya": "XF-62", "vallejo": "71.316", "hataka": "HTK-_004", "mrp": "MRP-139", "modelmaster": "-", "lifecolor": "UA005", "prevref": "RC259", "section": "MILITARY", "era": "new"}, {"code": "RC927", "name": "Medium Green 42", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_019", "mrp": "MRP-140", "modelmaster": "-", "lifecolor": "-", "prevref": "RC260", "section": "MILITARY", "era": "new"}, {"code": "RC928", "name": "Neutral Grey 43", "bsfsral": "-", "mrhobby": "C13 / H53", "tamiya": "-", "vallejo": "71.051", "hataka": "HTK-_033", "mrp": "MRP-141", "modelmaster": "-", "lifecolor": "UA046", "prevref": "RC261", "section": "MILITARY", "era": "new"}, {"code": "RC929", "name": "US Interior Yellow Green", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC262", "section": "MILITARY", "era": "new"}, {"code": "RC930", "name": "Zinc Chromate Yellow", "bsfsral": "-", "mrhobby": "C352", "tamiya": "-", "vallejo": "71.107", "hataka": "-", "mrp": "MRP-129", "modelmaster": "4851", "lifecolor": "-", "prevref": "RC263", "section": "MILITARY", "era": "new"}, {"code": "RC931", "name": "Bronze Green", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "MRP-132", "modelmaster": "-", "lifecolor": "-", "prevref": "RC264", "section": "MILITARY", "era": "new"}, {"code": "RC932", "name": "RLM 02 RLM-Grau (1938)", "bsfsral": "-", "mrhobby": "C60 / H70", "tamiya": "XF-20", "vallejo": "71.044", "hataka": "HTK-_023", "mrp": "MRP-050", "modelmaster": "2071 / 4770", "lifecolor": "UA504", "prevref": "RC265", "section": "MILITARY", "era": "new"}, {"code": "RC933", "name": "RLM 02 RLM-Grau (1941)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC266", "section": "MILITARY", "era": "new"}, {"code": "RC934", "name": "RLM 04", "bsfsral": "-", "mrhobby": "C113 / H413", "tamiya": "-", "vallejo": "71.078", "hataka": "HTK-_066", "mrp": "MRP-051", "modelmaster": "2072 / 4771", "lifecolor": "UA140", "prevref": "RC267", "section": "MILITARY", "era": "new"}, {"code": "RC935", "name": "RLM 65 (1938)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "MRP-058", "modelmaster": "-", "lifecolor": "-", "prevref": "RC271", "section": "MILITARY", "era": "new"}, {"code": "RC936", "name": "RLM 65 (1941)", "bsfsral": "-", "mrhobby": "C115 / H67", "tamiya": "XF-23", "vallejo": "71.255", "hataka": "HTK-_029", "mrp": "-", "modelmaster": "2078 / 4778", "lifecolor": "UA503", "prevref": "RC272", "section": "MILITARY", "era": "new"}, {"code": "RC937", "name": "RLM 66 (1938)", "bsfsral": "-", "mrhobby": "C116 / H416", "tamiya": "XF-24", "vallejo": "71.055", "hataka": "HTK-_040", "mrp": "MRP-059", "modelmaster": "2079 / 4779", "lifecolor": "UA133", "prevref": "RC339", "section": "MILITARY", "era": "new"}, {"code": "RC938", "name": "RLM 66 (1941)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC273", "section": "MILITARY", "era": "new"}, {"code": "RC939", "name": "RLM 70", "bsfsral": "-", "mrhobby": "C18 / H65", "tamiya": "XF-27", "vallejo": "71.021", "hataka": "HTK-_015", "mrp": "MRP-060", "modelmaster": "2080 / 4780", "lifecolor": "UA501", "prevref": "RC274", "section": "MILITARY", "era": "new"}, {"code": "RC940", "name": "RLM 71", "bsfsral": "-", "mrhobby": "C17 / H64", "tamiya": "-", "vallejo": "71.015", "hataka": "HTK-_017", "mrp": "MRP-061", "modelmaster": "2081 / 4781", "lifecolor": "UA502", "prevref": "RC275", "section": "MILITARY", "era": "new"}, {"code": "RC941", "name": "RLM 74", "bsfsral": "-", "mrhobby": "C36 / H68", "tamiya": "-", "vallejo": "71.258", "hataka": "HTK-_313", "mrp": "MRP-064", "modelmaster": "2084 / 4784", "lifecolor": "UA507", "prevref": "RC278", "section": "MILITARY", "era": "new"}, {"code": "RC942", "name": "RLM 75", "bsfsral": "-", "mrhobby": "C37 / H69", "tamiya": "-", "vallejo": "71.259", "hataka": "HTK-_007", "mrp": "MRP-065", "modelmaster": "2085 / 4785", "lifecolor": "UA508", "prevref": "RC279", "section": "MILITARY", "era": "new"}, {"code": "RC943", "name": "RLM 76 Version 1", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "MRP-066", "modelmaster": "-", "lifecolor": "-", "prevref": "RC320", "section": "MILITARY", "era": "new"}, {"code": "RC944", "name": "RLM 76 Version 2", "bsfsral": "-", "mrhobby": "C117 / H417", "tamiya": "-", "vallejo": "71.257", "hataka": "HTK-_038", "mrp": "-", "modelmaster": "2086 / 4786", "lifecolor": "UA509", "prevref": "RC321", "section": "MILITARY", "era": "new"}, {"code": "RC945", "name": "RLM 76 Late War Variation", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.103", "hataka": "-", "mrp": "MRP-182", "modelmaster": "-", "lifecolor": "-", "prevref": "RC322", "section": "MILITARY", "era": "new"}, {"code": "RC946", "name": "RLM 78", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "MRP-067", "modelmaster": "-", "lifecolor": "-", "prevref": "RC280", "section": "MILITARY", "era": "new"}, {"code": "RC947", "name": "RLM 79", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "MRP-068", "modelmaster": "-", "lifecolor": "-", "prevref": "RC282", "section": "MILITARY", "era": "new"}, {"code": "RC948", "name": "RLM 80", "bsfsral": "-", "mrhobby": "C120 / H420", "tamiya": "-", "vallejo": "71.265", "hataka": "HTK-_053", "mrp": "MRP-069", "modelmaster": "2089", "lifecolor": "UA138", "prevref": "RC284", "section": "MILITARY", "era": "new"}, {"code": "RC949", "name": "RLM 81 Ver.2 (incorrectly called RLM 83)", "bsfsral": "-", "mrhobby": "C123 / H423", "tamiya": "XF-74", "vallejo": "71.011", "hataka": "HTK-_022", "mrp": "MRP-072", "modelmaster": "2091", "lifecolor": "UA132", "prevref": "RC324", "section": "MILITARY", "era": "new"}, {"code": "RC950", "name": "RLM 81 Version 3", "bsfsral": "-", "mrhobby": "C121 / H421", "tamiya": "XF-51", "vallejo": "71.264", "hataka": "HTK-_008", "mrp": "MRP-070", "modelmaster": "2090", "lifecolor": "UA510", "prevref": "RC325", "section": "MILITARY", "era": "new"}, {"code": "RC951", "name": "RLM 82", "bsfsral": "-", "mrhobby": "C122 / H422", "tamiya": "-", "vallejo": "71.022", "hataka": "HTK-_020", "mrp": "MRP-071", "modelmaster": "2092", "lifecolor": "UA511", "prevref": "RC326", "section": "MILITARY", "era": "new"}, {"code": "RC952", "name": "IJN J3 Hai-Iro (Grey)", "bsfsral": "FS 36307", "mrhobby": "C324 / H324", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_266", "mrp": "MRP-427", "modelmaster": "1726 / 4759", "lifecolor": "UA113", "prevref": "RC302", "section": "MILITARY", "era": "new"}, {"code": "RC953", "name": "IJN J3 SP (Amber Grey)", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.311", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC303", "section": "MILITARY", "era": "new"}, {"code": "RC954", "name": "IJN D1 Deep Green Black", "bsfsral": "-", "mrhobby": "C15 / H59", "tamiya": "XF-11", "vallejo": "71.325", "hataka": "-", "mrp": "MRP-424", "modelmaster": "-", "lifecolor": "-", "prevref": "RC304", "section": "MILITARY", "era": "new"}, {"code": "RC955", "name": "IJN D2 Green Black", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.322", "hataka": "-", "mrp": "MRP-425", "modelmaster": "-", "lifecolor": "-", "prevref": "RC305", "section": "MILITARY", "era": "new"}, {"code": "RC956", "name": "IJN M3(M) Mitsubishi Interior Green", "bsfsral": "-", "mrhobby": "C126", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC306", "section": "MILITARY", "era": "new"}, {"code": "RC957", "name": "IJN M3(N) Nakajima Interior Green", "bsfsral": "-", "mrhobby": "C127", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "-", "modelmaster": "-", "lifecolor": "-", "prevref": "RC307", "section": "MILITARY", "era": "new"}, {"code": "RC958", "name": "IJN / IJA Aotake", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "-", "hataka": "-", "mrp": "MRP-410", "modelmaster": "-", "lifecolor": "-", "prevref": "-", "section": "MILITARY", "era": "new"}, {"code": "RC959", "name": "RAF Sky Grey", "bsfsral": "FS 26373", "mrhobby": "-", "tamiya": "-", "vallejo": "71.339", "hataka": "HTK-_302", "mrp": "-", "modelmaster": "-", "lifecolor": "UA036", "prevref": "RC285", "section": "MILITARY", "era": "new"}, {"code": "RC960", "name": "RAF Dark Green", "bsfsral": "BS381C/241", "mrhobby": "C330 / H330", "tamiya": "XF-81", "vallejo": "71.324", "hataka": "HTK-_143", "mrp": "MRP-110", "modelmaster": "2060 / 4849", "lifecolor": "UA546", "prevref": "RC286", "section": "MILITARY", "era": "new"}, {"code": "RC961", "name": "RAF Dark Earth", "bsfsral": "-", "mrhobby": "C369 / H72", "tamiya": "-", "vallejo": "71.323", "hataka": "HTK-_009", "mrp": "MRP-108", "modelmaster": "2054 / 4846", "lifecolor": "UA547", "prevref": "RC287", "section": "MILITARY", "era": "new"}, {"code": "RC962", "name": "RAF Ocean Grey", "bsfsral": "-", "mrhobby": "C362", "tamiya": "XF-82", "vallejo": "71.273", "hataka": "HTK-_032", "mrp": "MRP-115", "modelmaster": "2057", "lifecolor": "UA093", "prevref": "RC288", "section": "MILITARY", "era": "new"}, {"code": "RC963", "name": "RAF Medium Sea Grey", "bsfsral": "BS381C/637", "mrhobby": "C335 / H335", "tamiya": "XF-83", "vallejo": "71.307", "hataka": "-", "mrp": "MRP-112", "modelmaster": "2058", "lifecolor": "UA094", "prevref": "RC289", "section": "MILITARY", "era": "new"}, {"code": "RC964", "name": "RAF Sky", "bsfsral": "FS 34424", "mrhobby": "C368", "tamiya": "-", "vallejo": "71.321", "hataka": "HTK-_234", "mrp": "MRP-118", "modelmaster": "2049 / 4840", "lifecolor": "UA550", "prevref": "RC290", "section": "MILITARY", "era": "new"}, {"code": "RC965", "name": "RAF Azure Blue", "bsfsral": "-", "mrhobby": "C370", "tamiya": "-", "vallejo": "71.108", "hataka": "HTK-_028", "mrp": "MRP-119", "modelmaster": "2048", "lifecolor": "UA098", "prevref": "RC291", "section": "MILITARY", "era": "new"}, {"code": "RC966", "name": "RAF Middle Stone", "bsfsral": "-", "mrhobby": "C21 / H71", "tamiya": "-", "vallejo": "71.031", "hataka": "HTK-_013", "mrp": "MRP-121", "modelmaster": "2052", "lifecolor": "UA097", "prevref": "RC292", "section": "MILITARY", "era": "new"}, {"code": "RC967", "name": "RAF Cockpit Grey-Green", "bsfsral": "-", "mrhobby": "C364", "tamiya": "XF-71", "vallejo": "71.305", "hataka": "HTK-_025", "mrp": "MRP-111", "modelmaster": "2062 / 4850", "lifecolor": "UA551", "prevref": "RC293", "section": "MILITARY", "era": "new"}, {"code": "RC968", "name": "RAF Dark Slate Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.309", "hataka": "HTK-_202", "mrp": "MRP-117", "modelmaster": "2056", "lifecolor": "-", "prevref": "RC294", "section": "MILITARY", "era": "new"}, {"code": "RC969", "name": "RAF Extra Dark Sea Grey", "bsfsral": "BS381C/640", "mrhobby": "C333 / H333", "tamiya": "XF-54", "vallejo": "71.110", "hataka": "HTK-_140", "mrp": "MRP-114", "modelmaster": "-", "lifecolor": "UA109", "prevref": "RC295", "section": "MILITARY", "era": "new"}, {"code": "RC970", "name": "RAF Dark Sea Grey", "bsfsral": "BS381C/638", "mrhobby": "C331 / H331", "tamiya": "XF-77", "vallejo": "71.405", "hataka": "HTK-_144", "mrp": "MRP-113", "modelmaster": "2059", "lifecolor": "-", "prevref": "RC296", "section": "MILITARY", "era": "new"}, {"code": "RC971", "name": "RAF PRU Blue", "bsfsral": "BS381C/636", "mrhobby": "C72 / H56", "tamiya": "XF-18", "vallejo": "71.109", "hataka": "HTK-_207", "mrp": "MRP-120", "modelmaster": "2061", "lifecolor": "-", "prevref": "RC297", "section": "MILITARY", "era": "new"}, {"code": "RC972", "name": "RAF Light Aircraft Grey", "bsfsral": "BS381C/627", "mrhobby": "C332 / H332", "tamiya": "-", "vallejo": "-", "hataka": "HTK-_217", "mrp": "MRP-374", "modelmaster": "-", "lifecolor": "-", "prevref": "RC298", "section": "MILITARY", "era": "new"}, {"code": "RC973", "name": "RAF Barley Grey", "bsfsral": "BS381C/626", "mrhobby": "C334 / H334", "tamiya": "XF-80", "vallejo": "-", "hataka": "HTK-_142", "mrp": "MRP-373", "modelmaster": "-", "lifecolor": "UA079", "prevref": "RC299", "section": "MILITARY", "era": "new"}, {"code": "RC974", "name": "AMT-1 Light Brown", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.320", "hataka": "-", "mrp": "MRP-015", "modelmaster": "-", "lifecolor": "-", "prevref": "RC313", "section": "MILITARY", "era": "new"}, {"code": "RC975", "name": "AMT-4 / A-24m Green", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.301", "hataka": "HTK-_073", "mrp": "MRP-016", "modelmaster": "-", "lifecolor": "-", "prevref": "RC315", "section": "MILITARY", "era": "new"}, {"code": "RC976", "name": "AMT-7 Light Blue", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.318", "hataka": "HTK-_072", "mrp": "MRP-018", "modelmaster": "-", "lifecolor": "-", "prevref": "RC316", "section": "MILITARY", "era": "new"}, {"code": "RC977", "name": "AMT-11 Blue Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.304", "hataka": "HTK-_071", "mrp": "MRP-019", "modelmaster": "-", "lifecolor": "-", "prevref": "RC317", "section": "MILITARY", "era": "new"}, {"code": "RC978", "name": "AMT-12 Dark Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.308", "hataka": "HTK-_070", "mrp": "MRP-020", "modelmaster": "-", "lifecolor": "-", "prevref": "RC318", "section": "MILITARY", "era": "new"}, {"code": "RC979", "name": "A-14 Interior Steel Grey", "bsfsral": "-", "mrhobby": "-", "tamiya": "-", "vallejo": "71.336", "hataka": "-", "mrp": "MRP-021", "modelmaster": "-", "lifecolor": "-", "prevref": "RC319", "section": "MILITARY", "era": "new"}, {"code": "RC980", "name": "Russian Cockpit Turquoise", "bsfsral": "-", "mrhobby": "C391", "tamiya": "-", "vallejo": "71.331", "hataka": "HTK-_047", "mrp": "MRP-001", "modelmaster": "2135", "lifecolor": "-", "prevref": "RC206", "section": "MILITARY", "era": "new"}];
const REALCOLORS_COLS_OLD = [
  {k:"code",label:"RC šifra"},
  {k:"swatch",label:"Boja"},
  {k:"name",label:"Naziv"},
  {k:"bsfsral",label:"BS/FS/RAL"},
  {k:"mrhobby",label:"Mr.Hobby"},
  {k:"tamiya",label:"Tamiya"},
  {k:"vallejo",label:"Vallejo"},
  {k:"hataka",label:"Hataka"},
  {k:"humbrol",label:"Humbrol"},
  {k:"modelmaster",label:"Model Master"},
  {k:"lifecolor",label:"Lifecolor"}
];
const REALCOLORS_COLS_NEW = [
  {k:"code",label:"RC šifra"},
  {k:"swatch",label:"Boja"},
  {k:"name",label:"Naziv"},
  {k:"section",label:"Sekcija"},
  {k:"bsfsral",label:"BS/FS/RAL"},
  {k:"mrhobby",label:"Mr.Hobby"},
  {k:"tamiya",label:"Tamiya"},
  {k:"vallejo",label:"Vallejo"},
  {k:"hataka",label:"Hataka"},
  {k:"mrp",label:"MRP"},
  {k:"modelmaster",label:"Model Master"},
  {k:"lifecolor",label:"Lifecolor"},
  {k:"n5",label:"Number Five"},
  {k:"gravity",label:"Gravity"},
  {k:"zp",label:"Zero Paints"},
  {k:"prevref",label:"Stara RC šifra"},
  {k:"info",label:"Napomena"}
];

// ── DODATNE TABLICE EKVIVALENCIJA (iz uvezenih PDF dokumenata) ──
// 1) EQUIVALENCIAS2023.pdf — AK 3G <-> Vallejo MC/GC <-> Citadel
const DOC1_DATA = [{"code":"AK11001","vallejoMC":"951","vallejoGC":"001","citadelNew":"White Scar","citadelOld":"Skull White"},{"code":"AK11002","vallejoMC":"820","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11003","vallejoMC":"993","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11004","vallejoMC":"918","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11005","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11006","vallejoMC":"883","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11007","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11008","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11009","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11010","vallejoMC":"907","vallejoGC":"049/047","citadelNew":"Administratum grey","citadelOld":"Fortress Grey"},{"code":"AK11011","vallejoMC":"973","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11012","vallejoMC":"989","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11013","vallejoMC":"990","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11014","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11015","vallejoMC":"991","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11016","vallejoMC":"886","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11017","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11018","vallejoMC":"992","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11019","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11020","vallejoMC":"836","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11021","vallejoMC":"869","vallejoGC":"050","citadelNew":"Dawnstone","citadelOld":"Coldex Grey"},{"code":"AK11022","vallejoMC":"994","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11023","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11024","vallejoMC":"866","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11025","vallejoMC":"995","vallejoGC":"155","citadelNew":"Stormvermin Fur","citadelOld":"Charadon Granite"},{"code":"AK11026","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11027","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11028","vallejoMC":"862","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11029","vallejoMC":"950","vallejoGC":"051","citadelNew":"Abaddon Black","citadelOld":"Chaos Black"},{"code":"AK11030","vallejoMC":"917","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11031","vallejoMC":"976","vallejoGC":"034","citadelNew":"Ushabit Bone","citadelOld":"Bleached Bone"},{"code":"AK11032","vallejoMC":"837","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11033","vallejoMC":"847","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11034","vallejoMC":"977","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11035","vallejoMC":"916","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11036","vallejoMC":"858","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11037","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11038","vallejoMC":"949","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11039","vallejoMC":"806","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11040","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11041","vallejoMC":"948","vallejoGC":"007","citadelNew":"Yriel Yellow","citadelOld":"Golden Yellow"},{"code":"AK11042","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11043","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11044","vallejoMC":"953","vallejoGC":"006","citadelNew":"Flash Gitz Yellow","citadelOld":"Sunburst Yellow"},{"code":"AK11045","vallejoMC":"915","vallejoGC":"006","citadelNew":"Flash Gitz Yellow","citadelOld":"Sunburst Yellow"},{"code":"AK11046","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11047","vallejoMC":"952","vallejoGC":"005","citadelNew":"Dorn Yellow","citadelOld":"Bad Moon Yellow"},{"code":"AK11048","vallejoMC":"954","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11049","vallejoMC":"730","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11050","vallejoMC":"928","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11051","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11052","vallejoMC":"815","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11053","vallejoMC":"955","vallejoGC":"004","citadelNew":"Kislev Flesh","citadelOld":"Elf Flesh"},{"code":"AK11054","vallejoMC":"860","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11055","vallejoMC":"845","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11056","vallejoMC":"927","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11057","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11058","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11059","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11060","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11061","vallejoMC":"835","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11062","vallejoMC":"944","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11063","vallejoMC":"803","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11064","vallejoMC":"804","vallejoGC":"037","citadelNew":"Tau Light Ochre","citadelOld":"Vomit Brown"},{"code":"AK11065","vallejoMC":"958","vallejoGC":"013","citadelNew":"Emperor’s Children","citadelOld":"Tentacle pink"},{"code":"AK11066","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11067","vallejoMC":"945","vallejoGC":"014","citadelNew":"Screamer Pink","citadelOld":"Warlock Purple"},{"code":"AK11068","vallejoMC":"735","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11069","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11070","vallejoMC":"811","vallejoGC":"015","citadelNew":"Xereus Purple","citadelOld":"Liche Purple"},{"code":"AK11071","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11072","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11073","vallejoMC":"959","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11074","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11075","vallejoMC":"812","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11076","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11077","vallejoMC":"911","vallejoGC":"008","citadelNew":"Fire Dragon Bright","citadelOld":"Fiery Orange"},{"code":"AK11078","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11079","vallejoMC":"805","vallejoGC":"152","citadelNew":"Jokaero Orange","citadelOld":"Macharius Solar Orange"},{"code":"AK11080","vallejoMC":"851","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11081","vallejoMC":"733","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11082","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11083","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11084","vallejoMC":"802","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11085","vallejoMC":"910","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11086","vallejoMC":"829","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11087","vallejoMC":"817","vallejoGC":"009","citadelNew":"Troll Slayer Orange","citadelOld":"Blazing Orange"},{"code":"AK11088","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11089","vallejoMC":"909","vallejoGC":"010","citadelNew":"Evil Sunz Scarlet","citadelOld":"Blood Red"},{"code":"AK11090","vallejoMC":"947","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11091","vallejoMC":"908","vallejoGC":"012","citadelNew":"Khorne Red","citadelOld":"Scan Red"},{"code":"AK11092","vallejoMC":"957","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11093","vallejoMC":"946","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11094","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11095","vallejoMC":"926","vallejoGC":"141","citadelNew":"Mephiston Red","citadelOld":"Mechrite Red"},{"code":"AK11096","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11097","vallejoMC":"814","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11098","vallejoMC":"859","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11099","vallejoMC":"P","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11100","vallejoMC":"929","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11101","vallejoMC":"981","vallejoGC":"042","citadelNew":"Skrag Brown","citadelOld":"Vermin Brown"},{"code":"AK11102","vallejoMC":"818","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11103","vallejoMC":"P","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11104","vallejoMC":"940","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11105","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11106","vallejoMC":"846","vallejoGC":"044","citadelNew":"Doombull Brown","citadelOld":"Dark Flesh"},{"code":"AK11107","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11108","vallejoMC":"985","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11109","vallejoMC":"826","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11110","vallejoMC":"871","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11111","vallejoMC":"941","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11112","vallejoMC":"822","vallejoGC":"045","citadelNew":"Rhinox Hide","citadelOld":"Scorched Brown"},{"code":"AK11113","vallejoMC":"872","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11114","vallejoMC":"986","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11115","vallejoMC":"819","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11116","vallejoMC":"912","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11117","vallejoMC":"877","vallejoGC":"151","citadelNew":"Averland Sunset","citadelOld":"Lyanden Darksun"},{"code":"AK11118","vallejoMC":"913","vallejoGC":"039","citadelNew":"Zamesi Desert","citadelOld":"Bubonic Brown"},{"code":"AK11119","vallejoMC":"843","vallejoGC":"140","citadelNew":"Cadian Fleshtone","citadelOld":"Tallarn Flesh"},{"code":"AK11120","vallejoMC":"825","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11121","vallejoMC":"874","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11122","vallejoMC":"914","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11123","vallejoMC":"923","vallejoGC":"063","citadelNew":"Tallarn Sand","citadelOld":"Desert Yellow"},{"code":"AK11124","vallejoMC":"882","vallejoGC":"149","citadelNew":"Deathworld Forest","citadelOld":"Gretching Green"},{"code":"AK11125","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11126","vallejoMC":"879","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11127","vallejoMC":"921","vallejoGC":"062","citadelNew":"Steel Legion Drab","citadelOld":"Graveyard Earth"},{"code":"AK11128","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11129","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11130","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11131","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11132","vallejoMC":"971","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11133","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11134","vallejoMC":"974","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11135","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11136","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11137","vallejoMC":"827","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11138","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11139","vallejoMC":"857","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11140","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11141","vallejoMC":"942","vallejoGC":"032","citadelNew":"Moot Green","citadelOld":"Scorpion Green"},{"code":"AK11142","vallejoMC":"969","vallejoGC":"025","citadelNew":"Sybarite Green","citadelOld":"Vile Green"},{"code":"AK11143","vallejoMC":"","vallejoGC":"","citadelNew":"Kabalite Green","citadelOld":"Jade Green"},{"code":"AK11144","vallejoMC":"838","vallejoGC":"026","citadelNew":"","citadelOld":""},{"code":"AK11145","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11146","vallejoMC":"970","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11147","vallejoMC":"967","vallejoGC":"030","citadelNew":"Warboss Green","citadelOld":"Goblin Green"},{"code":"AK11148","vallejoMC":"850","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11149","vallejoMC":"891","vallejoGC":"028","citadelNew":"Caliban Green","citadelOld":"Dark Angels Green"},{"code":"AK11150","vallejoMC":"895","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11151","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11152","vallejoMC":"833","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11153","vallejoMC":"896","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11154","vallejoMC":"830","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11155","vallejoMC":"888","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11156","vallejoMC":"887","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11157","vallejoMC":"893","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11158","vallejoMC":"890","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11159","vallejoMC":"894","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11160","vallejoMC":"980","vallejoGC":"147","citadelNew":"Waaagh¡ Flesh","citadelOld":"Orkhide Shade"},{"code":"AK11161","vallejoMC":"906","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11162","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11163","vallejoMC":"903","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11164","vallejoMC":"904","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11165","vallejoMC":"943","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11166","vallejoMC":"900","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11167","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11168","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11169","vallejoMC":"808","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11170","vallejoMC":"840","vallejoGC":"024","citadelNew":"Sotek Green","citadelOld":"Hawk Turquoise"},{"code":"AK11171","vallejoMC":"966","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11172","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11173","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11174","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11175","vallejoMC":"961","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11176","vallejoMC":"844","vallejoGC":"095","citadelNew":"Lothern Blue","citadelOld":"Ice Blue"},{"code":"AK11177","vallejoMC":"841","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11178","vallejoMC":"736","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11179","vallejoMC":"839","vallejoGC":"020","citadelNew":"Altford Guard Blue","citadelOld":"Ultramarines Blue"},{"code":"AK11180","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11181","vallejoMC":"925","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11182","vallejoMC":"930","vallejoGC":"021","citadelNew":"Caledor Sky","citadelOld":"Enchanted Blue"},{"code":"AK11183","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11184","vallejoMC":"963","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11185","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11186","vallejoMC":"965","vallejoGC":"143","citadelNew":"Macragge Blue","citadelOld":"Mordian Blue"},{"code":"AK11187","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11188","vallejoMC":"807","vallejoGC":"048","citadelNew":"The Fang","citadelOld":"Shadow Grey"},{"code":"AK11189","vallejoMC":"899","vallejoGC":"020","citadelNew":"Kantor Blue","citadelOld":"Regal Blue"},{"code":"AK11190","vallejoMC":"898","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11191","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11192","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11193","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11194","vallejoMC":"801","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11195","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11196","vallejoMC":"998","vallejoGC":"057","citadelNew":"Hashut Copper","citadelOld":"Dwarft Bronze"},{"code":"AK11197","vallejoMC":"999","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11198","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11199","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11200","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11201","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11202","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11203","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11204","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11205","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11206","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11207","vallejoMC":"993","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11208","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11209","vallejoMC":"997","vallejoGC":"052","citadelNew":"Runefang Steel","citadelOld":"Mithril Silver"},{"code":"AK11210","vallejoMC":"864","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11211","vallejoMC":"865","vallejoGC":"053","citadelNew":"Ironbreaker","citadelOld":"Chainmail"},{"code":"AK11212","vallejoMC":"863","vallejoGC":"054","citadelNew":"Leadbelcher","citadelOld":"Boltgun Metal"},{"code":"AK11213","vallejoMC":"934","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11214","vallejoMC":"938","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11215","vallejoMC":"939","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11216","vallejoMC":"936","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11217","vallejoMC":"937","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11218","vallejoMC":"935","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11219","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11220","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11221","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11222","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11223","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11224","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11225","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11226","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11227","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11228","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11229","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11230","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11231","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11232","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11233","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11234","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11235","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11236","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11301","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11302","vallejoMC":"71027","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11303","vallejoMC":"71257","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11304","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11305","vallejoMC":"71006","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11306","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11307","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11308","vallejoMC":"71019","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11309","vallejoMC":"71092","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11310","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11311","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11312","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11313","vallejoMC":"71116","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11314","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11315","vallejoMC":"71248","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11316","vallejoMC":"71056","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11317","vallejoMC":"71118","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11318","vallejoMC":"71025","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11319","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11320","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11323","vallejoMC":"71247","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11325","vallejoMC":"71244","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11326","vallejoMC":"71246","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11327","vallejoMC":"71272","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11328","vallejoMC":"71271","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11329","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11330","vallejoMC":"71041","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11331","vallejoMC":"71117","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11333","vallejoMC":"71075","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11334","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11335","vallejoMC":"71137","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11336","vallejoMC":"71290","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11337","vallejoMC":"71291","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11338","vallejoMC":"71293","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11339","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11340","vallejoMC":"71140","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11341","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11342","vallejoMC":"71289","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11343","vallejoMC":"71138","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11344","vallejoMC":"71139","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11345","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11346","vallejoMC":"71294","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11347","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11348","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11349","vallejoMC":"71122","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11350","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11351","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11352","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11353","vallejoMC":"71142","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11354","vallejoMC":"71141","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11355","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11356","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11357","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11358","vallejoMC":"71250","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11359","vallejoMC":"71249","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11360","vallejoMC":"71251","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11361","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11362","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11363","vallejoMC":"71064","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11364","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11365","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11366","vallejoMC":"71033","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11367","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11368","vallejoMC":"71017","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11369","vallejoMC":"71282","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11370","vallejoMC":"71283","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11371","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11372","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11373","vallejoMC":"71330","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11374","vallejoMC":"71401","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11375","vallejoMC":"71012","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11377","vallejoMC":"71143","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11378","vallejoMC":"71288","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11381","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11382","vallejoMC":"71400","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11383","vallejoMC":"71284","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11384","vallejoMC":"71039","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11385","vallejoMC":"71038","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11386","vallejoMC":"71016","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11387","vallejoMC":"71281","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11401","vallejoMC":"70341","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11402","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11403","vallejoMC":"70342","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11404","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11405","vallejoMC":"982","vallejoGC":"011","citadelNew":"Wazdakka Red","citadelOld":"Red Gore"},{"code":"AK11406","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11407","vallejoMC":"70306","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11408","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11409","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11410","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11411","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11412","vallejoMC":"70348","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11413","vallejoMC":"70339","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11414","vallejoMC":"70332","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11415","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11416","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11417","vallejoMC":"875","vallejoGC":"043","citadelNew":"Mourfang Brown","citadelOld":"Bestial Brown"},{"code":"AK11418","vallejoMC":"70333","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11419","vallejoMC":"984","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11420","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11421","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11422","vallejoMC":"824","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11423","vallejoMC":"867","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11424","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11425","vallejoMC":"897","vallejoGC":"067","citadelNew":"Castellan Green","citadelOld":"Catachan Green"},{"code":"AK11426","vallejoMC":"70338","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11427","vallejoMC":"70335","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11428","vallejoMC":"70336","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11429","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11430","vallejoMC":"70327","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11431","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11432","vallejoMC":"70309","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11433","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11434","vallejoMC":"70343","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11435","vallejoMC":"873","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11436","vallejoMC":"988","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11437","vallejoMC":"70317","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11438","vallejoMC":"70321","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11439","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""},{"code":"AK11440","vallejoMC":"","vallejoGC":"","citadelNew":"","citadelOld":""}];
const DOC1_COLS = [
  {k:"code",label:"AK šifra"},
  {k:"swatch",label:"Boja"},
  {k:"vallejoMC",label:"Vallejo MC"},
  {k:"vallejoGC",label:"Vallejo GC"},
  {k:"citadelNew",label:"New Citadel"},
  {k:"citadelOld",label:"Old Citadel"}
];

// 3) EQUIVALENCIAS_MENG-AK.pdf — Meng <-> AK 3Gen
const DOC3_DATA = [{"mengRef":"MC001","nameEn":"MATT BLACK","nameCn":"亚光黑","akRef":"AK11029"},{"mengRef":"MC002","nameEn":"MATT WHITE","nameCn":"亚光白","akRef":"AK11001"},{"mengRef":"MC003","nameEn":"MATT RED","nameCn":"亚光红","akRef":"AK11092"},{"mengRef":"MC004","nameEn":"MATT YELLOW","nameCn":"亚光黄","akRef":"AK11045"},{"mengRef":"MC008","nameEn":"LIGHT ORANGE","nameCn":"","akRef":"AK11077"},{"mengRef":"MC009","nameEn":"GREEN","nameCn":"","akRef":"AK11142"},{"mengRef":"MC012","nameEn":"BEIGE","nameCn":"","akRef":"AK11031"},{"mengRef":"MC013","nameEn":"LIGHT YELLOW","nameCn":"浅黄","akRef":"AK11038"},{"mengRef":"MC014","nameEn":"DARK YELLOW","nameCn":"","akRef":"AK11030"},{"mengRef":"MC016","nameEn":"LIGHT GREY","nameCn":"浅灰","akRef":"AK11013"},{"mengRef":"MC017","nameEn":"MIDDLE GREY","nameCn":"中灰","akRef":"AK11018"},{"mengRef":"MC018","nameEn":"DARK GREY","nameCn":"","akRef":"AK11022"},{"mengRef":"MC052","nameEn":"FLESH 2","nameCn":"","akRef":"AK11402"},{"mengRef":"MC057","nameEn":"LEATHER 1","nameCn":"","akRef":"AK11110"},{"mengRef":"MC058","nameEn":"LEATHER 2","nameCn":"","akRef":"AK11436"},{"mengRef":"MC101","nameEn":"TRANSPARENT RED","nameCn":"","akRef":"AK11213"},{"mengRef":"MC102","nameEn":"TRANSPARENT BLUE","nameCn":"","akRef":"AK11214"},{"mengRef":"MC103","nameEn":"TRANSPARENT ORANGE","nameCn":"","akRef":"AK11218"},{"mengRef":"MC104","nameEn":"TRANSPARENT GREEN","nameCn":"","akRef":"AK11216"},{"mengRef":"MC106","nameEn":"TRANSPARENT YELLOW","nameCn":"","akRef":"AK11217"},{"mengRef":"MC201","nameEn":"U.S. DESERT TAN","nameCn":"美军现代沙漠黄","akRef":"AK11349"},{"mengRef":"MC202","nameEn":"RUBBER BLACK","nameCn":"橡胶黑","akRef":"AK11027"},{"mengRef":"MC203","nameEn":"OLIVE GREEN","nameCn":"橄榄绿","akRef":"AK11157"},{"mengRef":"MC204","nameEn":"LIGHT GREYISH GREEN","nameCn":"浅灰绿","akRef":"AK11345"},{"mengRef":"MC209","nameEn":"DEEP GREEN","nameCn":"深绿","akRef":"AK11155"},{"mengRef":"MC210","nameEn":"BLACK GREY","nameCn":"黑灰","akRef":"AK11026"},{"mengRef":"MC211","nameEn":"OLIVE DRAB","nameCn":"橄榄褐","akRef":"AK11334"},{"mengRef":"MC212","nameEn":"BRITISH KHAKI","nameCn":"英军卡其褐","akRef":"AK11127"},{"mengRef":"MC213","nameEn":"LIGHT WOOD YELLOW","nameCn":"","akRef":"AK11058"},{"mengRef":"MC214","nameEn":"SAND YELLOW","nameCn":"","akRef":"AK11031"},{"mengRef":"MC215","nameEn":"WOOD BROWN","nameCn":"","akRef":"AK11104"},{"mengRef":"MC216","nameEn":"MIDDLE STONE","nameCn":"","akRef":"AK11124"},{"mengRef":"MC217","nameEn":"RUSSIAN GREEN 1","nameCn":"俄国绿1","akRef":"AK11367"},{"mengRef":"MC218","nameEn":"YELLOW OCHRE","nameCn":"","akRef":"AK11033"},{"mengRef":"MC221","nameEn":"NATO BLACK","nameCn":"北约迷彩黑","akRef":"AK11360"},{"mengRef":"MC222","nameEn":"NATO GREEN","nameCn":"北约迷彩绿","akRef":"AK11358"},{"mengRef":"MC223","nameEn":"NATO BROWN","nameCn":"北约迷彩棕","akRef":"AK11359"},{"mengRef":"MC224","nameEn":"GERMAN SAND BROWN","nameCn":"德军沙褐","akRef":"AK11326"},{"mengRef":"MC225","nameEn":"GERMAN SAND BEIGE","nameCn":"德军沙米黄","akRef":"AK11325"},{"mengRef":"MC226","nameEn":"GERMAN GREY BEIGE","nameCn":"德军米灰","akRef":"AK11323"},{"mengRef":"MC228","nameEn":"FRENCH UNIFORM GREY","nameCn":"","akRef":"AK11365"},{"mengRef":"MC229","nameEn":"KHAKI GREEN","nameCn":"卡其绿","akRef":"AK11305"},{"mengRef":"MC230","nameEn":"FRENCH LIGHT BROWN","nameCn":"法军浅棕","akRef":"AK11302"},{"mengRef":"MC231","nameEn":"FRENCH BROWN","nameCn":"法军棕","akRef":"AK11304"},{"mengRef":"MC232","nameEn":"FRENCH GREEN 1","nameCn":"法军绿1","akRef":"AK11306"},{"mengRef":"MC233","nameEn":"RUSSIAN VEHICLE INTERIOR GREEN","nameCn":"俄系车辆内部色","akRef":"AK11345 (+10% AK11005)"},{"mengRef":"MC234","nameEn":"LIGHT OLIVE","nameCn":"浅橄榄","akRef":"AK11016"},{"mengRef":"MC235","nameEn":"LIGHT GRASS GREEN","nameCn":"浅草绿","akRef":"AK11159"},{"mengRef":"MC237","nameEn":"RED BROWN","nameCn":"红棕","akRef":"AK11107"},{"mengRef":"MC238","nameEn":"BROWN GREEN","nameCn":"","akRef":"AK11126"},{"mengRef":"MC239","nameEn":"BLUE GREY","nameCn":"蓝灰","akRef":"AK11163"},{"mengRef":"MC240","nameEn":"BLUE BLACK","nameCn":"蓝黑","akRef":"AK11187"},{"mengRef":"MC241","nameEn":"GREYISH YELLOW","nameCn":"灰黄","akRef":"AK11008"},{"mengRef":"MC242","nameEn":"PALE SAND","nameCn":"","akRef":"AK11361"},{"mengRef":"MC243","nameEn":"GOLDEN OLIVE","nameCn":"","akRef":"AK11139"},{"mengRef":"MC245","nameEn":"DARK EARTH","nameCn":"","akRef":"AK11109"},{"mengRef":"MC246","nameEn":"GERMAN GREY WWI","nameCn":"德国灰","akRef":"AK11021"},{"mengRef":"MC247","nameEn":"DULL GREEN","nameCn":"暗绿","akRef":"AK11135"},{"mengRef":"MC248","nameEn":"OCHER EARTH","nameCn":"黄土","akRef":"AK11118"},{"mengRef":"MC249","nameEn":"BROWN CLAY","nameCn":"土棕褐","akRef":"AK11434"},{"mengRef":"MC250","nameEn":"FIELD GREY","nameCn":"原野灰","akRef":"AK11425"},{"mengRef":"MC251","nameEn":"US DESERT TAN SHADOW","nameCn":"美军沙漠黄阴影","akRef":"AK11120"},{"mengRef":"MC252","nameEn":"US DESERT TAN LIGHT","nameCn":"美军沙漠黄高光","akRef":"AK11115"},{"mengRef":"MC253","nameEn":"LIGHT SAND","nameCn":"浅砂","akRef":"AK11032"},{"mengRef":"MC254","nameEn":"DARK SAND","nameCn":"深砂","akRef":"AK11101"},{"mengRef":"MC256","nameEn":"GERMAN DARK YELLOW","nameCn":"德军深黄","akRef":"AK11318"},{"mengRef":"MC257","nameEn":"GERMAN DARK GREY HIGH LIGHT","nameCn":"德军深灰高光","akRef":"AK11316"},{"mengRef":"MC258","nameEn":"GERMAN LIGHT OLIVE GREEN","nameCn":"德军淡橄榄绿","akRef":"AK11309"},{"mengRef":"MC259","nameEn":"GERMAN RED BROWN","nameCn":"德军红褐","akRef":"AK11330"},{"mengRef":"MC281","nameEn":"JAPANESE ARMY DARK YELLOW","nameCn":"日本陆军黄土","akRef":"AK11057"},{"mengRef":"MC282","nameEn":"JAPANESE ARMY RED BROWN","nameCn":"日本陆军褐","akRef":"AK11121"},{"mengRef":"MC283","nameEn":"JAPANESE ARMY DARK BROWN","nameCn":"日本陆军焦茶","akRef":"AK11109"},{"mengRef":"MC284","nameEn":"JAPANESE ARMY DARK GREEN","nameCn":"日本陆军草绿","akRef":"AK11412"},{"mengRef":"MC285","nameEn":"KHAKI DRAB","nameCn":"炮管用卡其褐","akRef":"AK11422"},{"mengRef":"MC286","nameEn":"BRIGHT YELLOW","nameCn":"色带用淡黄色","akRef":"AK11044"},{"mengRef":"MC290","nameEn":"HULL RED","nameCn":"","akRef":"AK11108"},{"mengRef":"MC291","nameEn":"DECK BLUE 甲板蓝20B","nameCn":"","akRef":"AK5001"},{"mengRef":"MC292","nameEn":"HAZE GREY 烟灰5H","nameCn":"","akRef":"AK5002"},{"mengRef":"MC293","nameEn":"SEA BLUE 海蓝5S","nameCn":"","akRef":"AK5005"},{"mengRef":"MC294","nameEn":"ADMIRALTY DARK GREY 507A 海军部深灰507A","nameCn":"","akRef":"AK5033"},{"mengRef":"MC295","nameEn":"ADMIRALTY LIGHT GREY 507C 海军部浅灰507C","nameCn":"","akRef":"AK5035"},{"mengRef":"MC296","nameEn":"WOODEN DECK","nameCn":"木甲板","akRef":"AK11351"},{"mengRef":"MC298","nameEn":"U.S. OLIVE DRAB","nameCn":"","akRef":"AK11342"},{"mengRef":"MC299","nameEn":"INTERIOR YELLOW","nameCn":"","akRef":"AK2207"},{"mengRef":"MC300","nameEn":"INTERIOR GREEN","nameCn":"","akRef":"AK2303"},{"mengRef":"MC303","nameEn":"SOUTHEAST ASIA CAMOUFLAGE LIGHT GREEN","nameCn":"","akRef":""},{"mengRef":"MC308","nameEn":"AIR SUPERIORITY GREY","nameCn":"","akRef":"AK2142"},{"mengRef":"MC309","nameEn":"SOUTHEAST ASIA CAMOUFLAGE FIELD GREEN","nameCn":"","akRef":""},{"mengRef":"MC310","nameEn":"SOUTHEAST ASIA CAMOUFLAGE DARK TAN FS30219","nameCn":"","akRef":""},{"mengRef":"MC311","nameEn":"NORAD AIRCRAFT GREY FS36622","nameCn":"","akRef":""},{"mengRef":"MC350","nameEn":"STEALTH CAMOUFLAGE DARK GREY","nameCn":"","akRef":"AK2058"},{"mengRef":"MC351","nameEn":"STEALTH CAMOUFLAGE LIGHT GREY","nameCn":"","akRef":"AK2057"},{"mengRef":"MC501","nameEn":"GOLD","nameCn":"","akRef":"AK11191"},{"mengRef":"MC502","nameEn":"SILVER","nameCn":"","akRef":"AK11209"},{"mengRef":"MC503","nameEn":"BRASS","nameCn":"","akRef":"AK11194"},{"mengRef":"MC505","nameEn":"GUN METAL","nameCn":"枪金属","akRef":"AK11212"},{"mengRef":"MC508","nameEn":"STEEL","nameCn":"","akRef":"AK11210"},{"mengRef":"MC511","nameEn":"ALUMINUM","nameCn":"","akRef":"AK11207"},{"mengRef":"MC099","nameEn":"ACRYLIC MATT VARNISH","nameCn":"","akRef":""},{"mengRef":"MC100","nameEn":"ACRYLIC GLOSS VARNISH","nameCn":"","akRef":""}];
const DOC3_COLS = [
  {k:"mengRef",label:"Meng šifra"},
  {k:"swatch",label:"Boja"},
  {k:"nameEn",label:"Naziv (EN)"},
  {k:"nameCn",label:"Naziv (CN)"},
  {k:"akRef",label:"AK 3Gen šifra"}
];

// 4) equiv_vallejo-ak.pdf — Vallejo -> AK 3G
const DOC4_DATA = [{"vallejo":"730","akRef":"AK11049"},{"vallejo":"879","akRef":"AK11126"},{"vallejo":"954","akRef":"AK11048"},{"vallejo":"71041","akRef":"AK11331"},{"vallejo":"733","akRef":"AK11081"},{"vallejo":"882","akRef":"AK11124"},{"vallejo":"955","akRef":"AK11053"},{"vallejo":"71056","akRef":"AK11316"},{"vallejo":"735","akRef":"AK11068"},{"vallejo":"883","akRef":"AK11006"},{"vallejo":"957","akRef":"AK11092"},{"vallejo":"71064","akRef":"AK11363"},{"vallejo":"736","akRef":"AK11178"},{"vallejo":"886","akRef":"AK11016"},{"vallejo":"958","akRef":"AK11065"},{"vallejo":"71075","akRef":"AK11333"},{"vallejo":"801","akRef":"AK11194"},{"vallejo":"887","akRef":"AK11156"},{"vallejo":"959","akRef":"AK11073"},{"vallejo":"71092","akRef":"AK11309"},{"vallejo":"802","akRef":"AK11084"},{"vallejo":"888","akRef":"AK11155"},{"vallejo":"961","akRef":"AK11175"},{"vallejo":"71116","akRef":"AK11313"},{"vallejo":"803","akRef":"AK11063"},{"vallejo":"890","akRef":"AK11158"},{"vallejo":"963","akRef":"AK11184"},{"vallejo":"71118","akRef":"AK11317"},{"vallejo":"804","akRef":"AK11064"},{"vallejo":"891","akRef":"AK11149"},{"vallejo":"965","akRef":"AK11186"},{"vallejo":"71122","akRef":"AK11349"},{"vallejo":"805","akRef":"AK11079"},{"vallejo":"893","akRef":"AK11157"},{"vallejo":"966","akRef":"AK11171"},{"vallejo":"71137","akRef":"AK11335"},{"vallejo":"806","akRef":"AK11039"},{"vallejo":"894","akRef":"AK11159"},{"vallejo":"967","akRef":"AK11147"},{"vallejo":"71138","akRef":"AK11343"},{"vallejo":"807","akRef":"AK11188"},{"vallejo":"895","akRef":"AK11150"},{"vallejo":"969","akRef":"AK11142"},{"vallejo":"71139","akRef":"AK11344"},{"vallejo":"808","akRef":"AK11169"},{"vallejo":"896","akRef":"AK11153"},{"vallejo":"970","akRef":"AK11146"},{"vallejo":"71140","akRef":"AK11340"},{"vallejo":"811","akRef":"AK11070"},{"vallejo":"897","akRef":"AK11425"},{"vallejo":"971","akRef":"AK11132"},{"vallejo":"71141","akRef":"AK11354"},{"vallejo":"812","akRef":"AK11075"},{"vallejo":"898","akRef":"AK11190"},{"vallejo":"973","akRef":"AK11011"},{"vallejo":"71142","akRef":"AK11353"},{"vallejo":"814","akRef":"AK11097"},{"vallejo":"899","akRef":"AK11189"},{"vallejo":"974","akRef":"AK11134"},{"vallejo":"71143","akRef":"AK11377"},{"vallejo":"815","akRef":"AK11052"},{"vallejo":"900","akRef":"AK11166"},{"vallejo":"976","akRef":"AK11031"},{"vallejo":"71244","akRef":"AK11325"},{"vallejo":"817","akRef":"AK11087"},{"vallejo":"903","akRef":"AK11163"},{"vallejo":"977","akRef":"AK11034"},{"vallejo":"71246","akRef":"AK11326"},{"vallejo":"818","akRef":"AK11102"},{"vallejo":"904","akRef":"AK11164"},{"vallejo":"980","akRef":"AK11160"},{"vallejo":"71247","akRef":"AK11323"},{"vallejo":"819","akRef":"AK11115"},{"vallejo":"906","akRef":"AK11161"},{"vallejo":"981","akRef":"AK11101"},{"vallejo":"71248","akRef":"AK11315"},{"vallejo":"820","akRef":"AK11002"},{"vallejo":"907","akRef":"AK11010"},{"vallejo":"982","akRef":"AK11405"},{"vallejo":"71249","akRef":"AK11359"},{"vallejo":"822","akRef":"AK11112"},{"vallejo":"908","akRef":"AK11091"},{"vallejo":"984","akRef":"AK11419"},{"vallejo":"71250","akRef":"AK11358"},{"vallejo":"824","akRef":"AK11422"},{"vallejo":"909","akRef":"AK11089"},{"vallejo":"985","akRef":"AK11108"},{"vallejo":"71251","akRef":"AK11360"},{"vallejo":"825","akRef":"AK11120"},{"vallejo":"910","akRef":"AK11085"},{"vallejo":"986","akRef":"AK11114"},{"vallejo":"71257","akRef":"AK11303"},{"vallejo":"826","akRef":"AK11109"},{"vallejo":"911","akRef":"AK11077"},{"vallejo":"988","akRef":"AK11436"},{"vallejo":"71271","akRef":"AK11328"},{"vallejo":"827","akRef":"AK11137"},{"vallejo":"912","akRef":"AK11116"},{"vallejo":"989","akRef":"AK11012"},{"vallejo":"71272","akRef":"AK11327"},{"vallejo":"829","akRef":"AK11086"},{"vallejo":"913","akRef":"AK11118"},{"vallejo":"990","akRef":"AK11013"},{"vallejo":"71281","akRef":"AK11387"},{"vallejo":"830","akRef":"AK11154"},{"vallejo":"914","akRef":"AK11122"},{"vallejo":"991","akRef":"AK11015"},{"vallejo":"71282","akRef":"AK11369"},{"vallejo":"833","akRef":"AK11152"},{"vallejo":"915","akRef":"AK11045"},{"vallejo":"992","akRef":"AK11018"},{"vallejo":"71283","akRef":"AK11370"},{"vallejo":"835","akRef":"AK11061"},{"vallejo":"916","akRef":"AK11035"},{"vallejo":"993","akRef":"AK11003"},{"vallejo":"71284","akRef":"AK11383"},{"vallejo":"836","akRef":"AK11020"},{"vallejo":"917","akRef":"AK11030"},{"vallejo":"994","akRef":"AK11022"},{"vallejo":"71288","akRef":"AK11378"},{"vallejo":"837","akRef":"AK11032"},{"vallejo":"918","akRef":"AK11004"},{"vallejo":"995","akRef":"AK11025"},{"vallejo":"71289","akRef":"AK11342"},{"vallejo":"838","akRef":"AK11144"},{"vallejo":"921","akRef":"AK11127"},{"vallejo":"997","akRef":"AK11209"},{"vallejo":"71290","akRef":"AK11336"},{"vallejo":"839","akRef":"AK11179"},{"vallejo":"923","akRef":"AK11123"},{"vallejo":"998","akRef":"AK11196"},{"vallejo":"71291","akRef":"AK11337"},{"vallejo":"840","akRef":"AK11170"},{"vallejo":"925","akRef":"AK11181"},{"vallejo":"999","akRef":"AK11197"},{"vallejo":"71293","akRef":"AK11338"},{"vallejo":"841","akRef":"AK11177"},{"vallejo":"926","akRef":"AK11095"},{"vallejo":"70306","akRef":"AK11407"},{"vallejo":"71294","akRef":"AK11346"},{"vallejo":"843","akRef":"AK11119"},{"vallejo":"927","akRef":"AK11056"},{"vallejo":"70309","akRef":"AK11432"},{"vallejo":"71330","akRef":"AK11373"},{"vallejo":"844","akRef":"AK11176"},{"vallejo":"928","akRef":"AK11050"},{"vallejo":"70317","akRef":"AK11437"},{"vallejo":"71400","akRef":"AK11382"},{"vallejo":"845","akRef":"AK11055"},{"vallejo":"929","akRef":"AK11100"},{"vallejo":"70321","akRef":"AK11438"},{"vallejo":"71401","akRef":"AK11374"},{"vallejo":"846","akRef":"AK11106"},{"vallejo":"930","akRef":"AK11182"},{"vallejo":"70327","akRef":"AK11430"},{"vallejo":"847","akRef":"AK11033"},{"vallejo":"934","akRef":"AK11213"},{"vallejo":"70332","akRef":"AK11414"},{"vallejo":"850","akRef":"AK11148"},{"vallejo":"935","akRef":"AK11218"},{"vallejo":"70333","akRef":"AK11418"},{"vallejo":"851","akRef":"AK11080"},{"vallejo":"936","akRef":"AK11216"},{"vallejo":"70335","akRef":"AK11427"},{"vallejo":"857","akRef":"AK11139"},{"vallejo":"937","akRef":"AK11217"},{"vallejo":"70336","akRef":"AK11428"},{"vallejo":"858","akRef":"AK11036"},{"vallejo":"938","akRef":"AK11214"},{"vallejo":"70338","akRef":"AK11426"},{"vallejo":"859","akRef":"AK11098"},{"vallejo":"939","akRef":"AK11215"},{"vallejo":"70339","akRef":"AK11413"},{"vallejo":"860","akRef":"AK11054"},{"vallejo":"940","akRef":"AK11104"},{"vallejo":"70341","akRef":"AK11401"},{"vallejo":"862","akRef":"AK11028"},{"vallejo":"941","akRef":"AK11111"},{"vallejo":"70342","akRef":"AK11403"},{"vallejo":"863","akRef":"AK11212"},{"vallejo":"942","akRef":"AK11141"},{"vallejo":"70343","akRef":"AK11434"},{"vallejo":"864","akRef":"AK11210"},{"vallejo":"943","akRef":"AK11165"},{"vallejo":"70348","akRef":"AK11412"},{"vallejo":"865","akRef":"AK11211"},{"vallejo":"944","akRef":"AK11062"},{"vallejo":"71006","akRef":"AK11305"},{"vallejo":"866","akRef":"AK11024"},{"vallejo":"945","akRef":"AK11067"},{"vallejo":"71012","akRef":"AK11375"},{"vallejo":"867","akRef":"AK11423"},{"vallejo":"946","akRef":"AK11093"},{"vallejo":"71016","akRef":"AK11386"},{"vallejo":"869","akRef":"AK11021"},{"vallejo":"947","akRef":"AK11090"},{"vallejo":"71017","akRef":"AK11368"},{"vallejo":"871","akRef":"AK11110"},{"vallejo":"948","akRef":"AK11041"},{"vallejo":"71019","akRef":"AK11308"},{"vallejo":"872","akRef":"AK11113"},{"vallejo":"949","akRef":"AK11038"},{"vallejo":"71025","akRef":"AK11318"},{"vallejo":"873","akRef":"AK11435"},{"vallejo":"950","akRef":"AK11029"},{"vallejo":"71027","akRef":"AK11302"},{"vallejo":"874","akRef":"AK11121"},{"vallejo":"951","akRef":"AK11001"},{"vallejo":"71033","akRef":"AK11366"},{"vallejo":"875","akRef":"AK11417"},{"vallejo":"952","akRef":"AK11047"},{"vallejo":"71038","akRef":"AK11385"},{"vallejo":"877","akRef":"AK11117"},{"vallejo":"953","akRef":"AK11044"},{"vallejo":"71039","akRef":"AK11384"}];
const DOC4_COLS = [
  {k:"vallejo",label:"Vallejo"},
  {k:"swatch",label:"Boja"},
  {k:"akRef",label:"AK 3G šifra"}
];

// 5) equiv_ak-vallejo.pdf — AK 3G -> Vallejo
const DOC5_DATA = [{"akRef":"AK11001","vallejo":"951"},{"akRef":"AK11061","vallejo":"835"},{"akRef":"AK11121","vallejo":"874"},{"akRef":"AK11179","vallejo":"839"},{"akRef":"AK11002","vallejo":"820"},{"akRef":"AK11062","vallejo":"944"},{"akRef":"AK11122","vallejo":"914"},{"akRef":"AK11003","vallejo":"993"},{"akRef":"AK11063","vallejo":"803"},{"akRef":"AK11123","vallejo":"923"},{"akRef":"AK11181","vallejo":"925"},{"akRef":"AK11004","vallejo":"918"},{"akRef":"AK11064","vallejo":"804"},{"akRef":"AK11124","vallejo":"882"},{"akRef":"AK11182","vallejo":"930"},{"akRef":"AK11065","vallejo":"958"},{"akRef":"AK11006","vallejo":"883"},{"akRef":"AK11126","vallejo":"879"},{"akRef":"AK11184","vallejo":"963"},{"akRef":"AK11067","vallejo":"945"},{"akRef":"AK11127","vallejo":"921"},{"akRef":"AK11068","vallejo":"735"},{"akRef":"AK11186","vallejo":"965"},{"akRef":"AK11010","vallejo":"907"},{"akRef":"AK11070","vallejo":"811"},{"akRef":"AK11188","vallejo":"807"},{"akRef":"AK11011","vallejo":"973"},{"akRef":"AK11189","vallejo":"899"},{"akRef":"AK11012","vallejo":"989"},{"akRef":"AK11132","vallejo":"971"},{"akRef":"AK11190","vallejo":"898"},{"akRef":"AK11013","vallejo":"990"},{"akRef":"AK11073","vallejo":"959"},{"akRef":"AK11134","vallejo":"974"},{"akRef":"AK11015","vallejo":"991"},{"akRef":"AK11075","vallejo":"812"},{"akRef":"AK11016","vallejo":"886"},{"akRef":"AK11194","vallejo":"801"},{"akRef":"AK11077","vallejo":"911"},{"akRef":"AK11137","vallejo":"827"},{"akRef":"AK11018","vallejo":"992"},{"akRef":"AK11196","vallejo":"998"},{"akRef":"AK11079","vallejo":"805"},{"akRef":"AK11139","vallejo":"857"},{"akRef":"AK11197","vallejo":"999"},{"akRef":"AK11020","vallejo":"836"},{"akRef":"AK11080","vallejo":"851"},{"akRef":"AK11021","vallejo":"869"},{"akRef":"AK11081","vallejo":"733"},{"akRef":"AK11141","vallejo":"942"},{"akRef":"AK11022","vallejo":"994"},{"akRef":"AK11142","vallejo":"969"},{"akRef":"AK11024","vallejo":"866"},{"akRef":"AK11084","vallejo":"802"},{"akRef":"AK11144","vallejo":"838"},{"akRef":"AK11025","vallejo":"995"},{"akRef":"AK11085","vallejo":"910"},{"akRef":"AK11086","vallejo":"829"},{"akRef":"AK11146","vallejo":"970"},{"akRef":"AK11087","vallejo":"817"},{"akRef":"AK11147","vallejo":"967"},{"akRef":"AK11028","vallejo":"862"},{"akRef":"AK11148","vallejo":"850"},{"akRef":"AK11029","vallejo":"950"},{"akRef":"AK11089","vallejo":"909"},{"akRef":"AK11149","vallejo":"891"},{"akRef":"AK11207","vallejo":"993"},{"akRef":"AK11030","vallejo":"917"},{"akRef":"AK11090","vallejo":"947"},{"akRef":"AK11150","vallejo":"895"},{"akRef":"AK11031","vallejo":"976"},{"akRef":"AK11091","vallejo":"908"},{"akRef":"AK11209","vallejo":"997"},{"akRef":"AK11032","vallejo":"837"},{"akRef":"AK11092","vallejo":"957"},{"akRef":"AK11152","vallejo":"833"},{"akRef":"AK11210","vallejo":"864"},{"akRef":"AK11033","vallejo":"847"},{"akRef":"AK11093","vallejo":"946"},{"akRef":"AK11153","vallejo":"896"},{"akRef":"AK11211","vallejo":"865"},{"akRef":"AK11034","vallejo":"977"},{"akRef":"AK11154","vallejo":"830"},{"akRef":"AK11212","vallejo":"863"},{"akRef":"AK11035","vallejo":"916"},{"akRef":"AK11095","vallejo":"926"},{"akRef":"AK11155","vallejo":"888"},{"akRef":"AK11213","vallejo":"934"},{"akRef":"AK11036","vallejo":"858"},{"akRef":"AK11156","vallejo":"887"},{"akRef":"AK11214","vallejo":"938"},{"akRef":"AK11097","vallejo":"814"},{"akRef":"AK11157","vallejo":"893"},{"akRef":"AK11215","vallejo":"939"},{"akRef":"AK11038","vallejo":"949"},{"akRef":"AK11098","vallejo":"859"},{"akRef":"AK11158","vallejo":"890"},{"akRef":"AK11216","vallejo":"936"},{"akRef":"AK11039","vallejo":"806"},{"akRef":"AK11159","vallejo":"894"},{"akRef":"AK11217","vallejo":"937"},{"akRef":"AK11100","vallejo":"929"},{"akRef":"AK11160","vallejo":"980"},{"akRef":"AK11218","vallejo":"935"},{"akRef":"AK11041","vallejo":"948"},{"akRef":"AK11101","vallejo":"981"},{"akRef":"AK11161","vallejo":"906"},{"akRef":"AK11102","vallejo":"818"},{"akRef":"AK11163","vallejo":"903"},{"akRef":"AK11044","vallejo":"953"},{"akRef":"AK11104","vallejo":"940"},{"akRef":"AK11164","vallejo":"904"},{"akRef":"AK11045","vallejo":"915"},{"akRef":"AK11165","vallejo":"943"},{"akRef":"AK11106","vallejo":"846"},{"akRef":"AK11166","vallejo":"900"},{"akRef":"AK11047","vallejo":"952"},{"akRef":"AK11048","vallejo":"954"},{"akRef":"AK11108","vallejo":"985"},{"akRef":"AK11049","vallejo":"730"},{"akRef":"AK11109","vallejo":"826"},{"akRef":"AK11169","vallejo":"808"},{"akRef":"AK11050","vallejo":"928"},{"akRef":"AK11110","vallejo":"871"},{"akRef":"AK11170","vallejo":"840"},{"akRef":"AK11111","vallejo":"941"},{"akRef":"AK11171","vallejo":"966"},{"akRef":"AK11052","vallejo":"815"},{"akRef":"AK11112","vallejo":"822"},{"akRef":"AK11053","vallejo":"955"},{"akRef":"AK11113","vallejo":"872"},{"akRef":"AK11054","vallejo":"860"},{"akRef":"AK11114","vallejo":"986"},{"akRef":"AK11055","vallejo":"845"},{"akRef":"AK11115","vallejo":"819"},{"akRef":"AK11175","vallejo":"961"},{"akRef":"AK11056","vallejo":"927"},{"akRef":"AK11116","vallejo":"912"},{"akRef":"AK11176","vallejo":"844"},{"akRef":"AK11117","vallejo":"877"},{"akRef":"AK11177","vallejo":"841"},{"akRef":"AK11118","vallejo":"913"},{"akRef":"AK11178","vallejo":"736"},{"akRef":"AK11119","vallejo":"843"},{"akRef":"AK11120","vallejo":"825"},{"akRef":"AK11401","vallejo":"70341"},{"akRef":"AK11302","vallejo":"71027"},{"akRef":"AK11346","vallejo":"71294"},{"akRef":"AK11303","vallejo":"71257"},{"akRef":"AK11403","vallejo":"70342"},{"akRef":"AK11305","vallejo":"71006"},{"akRef":"AK11349","vallejo":"71122"},{"akRef":"AK11405","vallejo":"982"},{"akRef":"AK11407","vallejo":"70306"},{"akRef":"AK11308","vallejo":"71019"},{"akRef":"AK11309","vallejo":"71092"},{"akRef":"AK11353","vallejo":"71142"},{"akRef":"AK11354","vallejo":"71141"},{"akRef":"AK11412","vallejo":"70348"},{"akRef":"AK11313","vallejo":"71116"},{"akRef":"AK11413","vallejo":"70339"},{"akRef":"AK11358","vallejo":"71250"},{"akRef":"AK11414","vallejo":"70332"},{"akRef":"AK11315","vallejo":"71248"},{"akRef":"AK11359","vallejo":"71249"},{"akRef":"AK11316","vallejo":"71056"},{"akRef":"AK11360","vallejo":"71251"},{"akRef":"AK11317","vallejo":"71118"},{"akRef":"AK11417","vallejo":"875"},{"akRef":"AK11318","vallejo":"71025"},{"akRef":"AK11418","vallejo":"70333"},{"akRef":"AK11363","vallejo":"71064"},{"akRef":"AK11419","vallejo":"984"},{"akRef":"AK11323","vallejo":"71247"},{"akRef":"AK11325","vallejo":"71244"},{"akRef":"AK11366","vallejo":"71033"},{"akRef":"AK11422","vallejo":"824"},{"akRef":"AK11326","vallejo":"71246"},{"akRef":"AK11423","vallejo":"867"},{"akRef":"AK11327","vallejo":"71272"},{"akRef":"AK11368","vallejo":"71017"},{"akRef":"AK11328","vallejo":"71271"},{"akRef":"AK11369","vallejo":"71282"},{"akRef":"AK11425","vallejo":"897"},{"akRef":"AK11370","vallejo":"71283"},{"akRef":"AK11426","vallejo":"70338"},{"akRef":"AK11330","vallejo":"71041"},{"akRef":"AK11427","vallejo":"70335"},{"akRef":"AK11331","vallejo":"71117"},{"akRef":"AK11428","vallejo":"70336"},{"akRef":"AK11333","vallejo":"71075"},{"akRef":"AK11373","vallejo":"71330"},{"akRef":"AK11374","vallejo":"71401"},{"akRef":"AK11430","vallejo":"70327"},{"akRef":"AK11335","vallejo":"71137"},{"akRef":"AK11375","vallejo":"71012"},{"akRef":"AK11336","vallejo":"71290"},{"akRef":"AK11377","vallejo":"71143"},{"akRef":"AK11432","vallejo":"70309"},{"akRef":"AK11337","vallejo":"71291"},{"akRef":"AK11378","vallejo":"71288"},{"akRef":"AK11338","vallejo":"71293"},{"akRef":"AK11434","vallejo":"70343"},{"akRef":"AK11382","vallejo":"71400"},{"akRef":"AK11435","vallejo":"873"},{"akRef":"AK11340","vallejo":"71140"},{"akRef":"AK11383","vallejo":"71284"},{"akRef":"AK11436","vallejo":"988"},{"akRef":"AK11384","vallejo":"71039"},{"akRef":"AK11437","vallejo":"70317"},{"akRef":"AK11342","vallejo":"71289"},{"akRef":"AK11385","vallejo":"71038"},{"akRef":"AK11438","vallejo":"70321"},{"akRef":"AK11343","vallejo":"71138"},{"akRef":"AK11386","vallejo":"71016"},{"akRef":"AK11344","vallejo":"71139"},{"akRef":"AK11387","vallejo":"71281"}];
const DOC5_COLS = [
  {k:"akRef",label:"AK 3G šifra"},
  {k:"swatch",label:"Boja"},
  {k:"vallejo",label:"Vallejo"}
];

// 6) RealColors_Conversion_Chart.pdf — CIVIL sekcija ima dodatna polja
//    koja se ne nalaze u glavnom REALCOLORS_DATA nizu; ovdje ih ubacujemo (patch).
const RC_CIVIL_EXTRA = [
{"code":"RC827","name":"Solid White","tamiya":"","n5":"","mrp":"","gravity":"","zp":"","info":""},
{"code":"RC828","name":"British F1 Black 1972-1986","tamiya":"","n5":"N5-C174","mrp":"","gravity":"","zp":"ZP-1121","info":"Used for painting Lotus Formula 1 cars in the famous JPS livery from 1972 to 1986."},
{"code":"RC829","name":"Carbon Fibre Grey","tamiya":"","n5":"","mrp":"","gravity":"","zp":"ZP-1323","info":"Used for applying a basecoat under clear carbon fibre decals."},
{"code":"RC830","name":"Wheel Rim Gold","tamiya":"","n5":"N5-X082","mrp":"MRP-C016","gravity":"","zp":"ZP-1575","info":"Used for painting BBS wheels."},
{"code":"RC831","name":"Fork Gold","tamiya":"","n5":"","mrp":"","gravity":"","zp":"ZP-1432","info":"Used for painting motorcycle forks."},
{"code":"RC832","name":"Alfa BT Red","tamiya":"","n5":"N5-C021","mrp":"","gravity":"","zp":"ZP-1091","info":"Used as the base color of Brabham-Alfa Romeo BT45B, BT46, BT46B, BT48 racing cars."},
{"code":"RC833","name":"Maranello F1 Red 1970s-1980s","tamiya":"","n5":"","mrp":"","gravity":"","zp":"ZP-1007","info":"Used as the base color of Ferrari F1 cars in the 1970s-1980s, including models 312B, 312B2, 312B3, 312T, 312T2, 312T2B, 312T3, 312T4, 312T5, 126C, 126CK, 126C2, 126C2B, 126C3, 126C4, 156/85."},
{"code":"RC834","name":"Maranello Red 300","tamiya":"","n5":"","mrp":"MRP-C026","gravity":"","zp":"ZP-8007","info":"The most commonly used base color of Ferrari racing and sports cars since the early 1980s."},
{"code":"RC835","name":"Italian Red","tamiya":"TS-8","n5":"","mrp":"","gravity":"","zp":"ZP-1114","info":"Used for painting many street and racing cars by Italian manufacturers such as Alfa Romeo, Fiat, Lancia etc."},
{"code":"RC836","name":"Panigale Red","tamiya":"","n5":"N5-C033","mrp":"","gravity":"GC-1160","zp":"ZP-1273","info":"Used as the base color of Ducati 1199 Panigale S motorcycles."},
{"code":"RC837","name":"Fluorescent Red","tamiya":"TS-36","n5":"N5-X017","mrp":"","gravity":"GC-168","zp":"ZP-1033","info":""},
{"code":"RC838","name":"Fluorescent Orange","tamiya":"TS-96","n5":"","mrp":"","gravity":"","zp":"ZP-1009","info":""},
{"code":"RC839","name":"Gulf Orange","tamiya":"","n5":"N5-X008","mrp":"","gravity":"GC-109","zp":"ZP-1259","info":"Used for painting such cars as Porsche 917 and Ford GT40 in the iconic orange/light blue color scheme associated with racing teams sponsored by the Gulf Oil company."},
{"code":"RC840","name":"Jäger Orange","tamiya":"","n5":"N5-X022","mrp":"MRP-C023","gravity":"GC-117","zp":"ZP-1057","info":"Used for painting racing cars sponsored by Jagermeister company."},
{"code":"RC841","name":"French F1 Yellow 1970s-1980s","tamiya":"","n5":"N5-C026","mrp":"","gravity":"","zp":"ZP-1085","info":"Used for painting Renault Formula 1 cars in the 1970s-1980s. Suitable for models RS01, RS10 and RE20."},
{"code":"RC842","name":"Light Blue","tamiya":"TS-23","n5":"","mrp":"","gravity":"","zp":"ZP-1093","info":""},
{"code":"RC843","name":"Tyrrell Blue","tamiya":"","n5":"N5-X027","mrp":"","gravity":"","zp":"ZP-8067","info":"Used for painting Tyrrell Formula 1 cars in the 1970s-1980s."},
{"code":"RC844","name":"Gulf Blue","tamiya":"","n5":"N5-X009","mrp":"","gravity":"","zp":"ZP-1103","info":"Used for painting such cars as Porsche 917 and Ford GT40 in the iconic orange/light blue color scheme associated with racing teams sponsored by the Gulf Oil company."},
{"code":"RC845","name":"Rally Blue 74F 1997-2002","tamiya":"","n5":"N5-C075","mrp":"","gravity":"","zp":"ZP-1041-74F","info":"Used as the base color of Subaru Impreza WRC cars between 1997 and 2002."},
{"code":"RC846","name":"Rally Blue 02C 2001-2006","tamiya":"","n5":"N5-C074","mrp":"","gravity":"","zp":"ZP-1041-02C","info":"Used as the base color of Subaru Impreza WRC cars between 2001 and 2006."},
{"code":"RC847","name":"British Racing Green","tamiya":"","n5":"","mrp":"","gravity":"","zp":"ZP-1087","info":"Used as the base color of numerous classic English racing cars."},
{"code":"RC848","name":"Vaillant Green","tamiya":"","n5":"N5-C015","mrp":"","gravity":"GC-118","zp":"ZP-1276","info":"Used as the base color of Porsche 934 Turbo RSR racing cars sponsored by Vaillant."},
{"code":"RC849","name":"Ninja Green","tamiya":"","n5":"N5-C115","mrp":"","gravity":"","zp":"ZP-1018","info":"Used as the base color of Kawasaki Ninja ZX-RR race motorcycles."},
{"code":"RC850","name":"Holographic Pearl","tamiya":"","n5":"","mrp":"","gravity":"","zp":"","info":"The shade of this color varies according to the color of the previously applied primer or base coat."}
]
;
(function(){
  const byCode={};
  RC_CIVIL_EXTRA.forEach(e=>byCode[e.code]=e);
  REALCOLORS_DATA.forEach(r=>{
    const extra=byCode[r.code];
    if(extra){r.tamiya=extra.tamiya;r.n5=extra.n5;r.mrp=extra.mrp;r.gravity=extra.gravity;r.zp=extra.zp;r.info=extra.info;}
  });
})();

// ── MAPE BOJA (izvedene iz EQUIV_DATA) za tablice koje same nemaju swatch ──
const AK_SWATCH_MAP={};
const RC_SWATCH_MAP={};
EQUIV_DATA.forEach(r=>{
  if(r.swatch){
    AK_SWATCH_MAP[r.code]=r.swatch;
    if(r.realcolors&&!RC_SWATCH_MAP[r.realcolors])RC_SWATCH_MAP[r.realcolors]=r.swatch;
  }
});
function swatchForAk(code){if(!code)return null;const m=String(code).match(/AK\d+/);return m?(AK_SWATCH_MAP[m[0]]||null):null;}
function swatchForRc(code,prevref){return RC_SWATCH_MAP[code]||(prevref?RC_SWATCH_MAP[prevref]:null)||null;}

// ── "VEĆ IMAM" OZNAČAVANJE U TABLICAMA EKVIVALENCIJA ──────────────
// Kad tablica ekvivalencija prikaže šifru drugog proizvođača (npr.
// Vallejo/Tamiya/Humbrol...) koja se poklapa s nekom šifrom u korisnikovom
// stvarnom inventaru, ta ćelija se zeleno označi kao "već imaš" — ovo
// izravno odgovara na "predloži zamjenu iz drugog brenda koju već imaš".
// Stupci koji NISU šifra (opisni tekst, boja, tip/sekcija) se izuzimaju
// iz usporedbe da se izbjegnu slučajna poklapanja.
const EKV_NONCODE_KEYS=new Set(["swatch","type","section","name","nameEn","nameCn","info","alclad_name","sets","members","category","intensity"]);
function buildOwnedPaintIndex(){
  const idx={};
  for(const [cat,cd] of Object.entries(S.inventar)){
    for(const it of cd.items){
      if(!it.code)continue;
      const key=String(it.code).trim().toUpperCase().replace(/\s+/g,"");
      if(key&&!idx[key])idx[key]={name:it.name,cat,id:it.id};
    }
  }
  return idx;
}
function ekvCellOwned(val,ownedIdx){
  if(!val)return null;
  const key=String(val).trim().toUpperCase().replace(/\s+/g,"");
  if(!key)return null;
  return ownedIdx[key]||null;
}
function jsStr(s){return String(s==null?"":s).replace(/\\/g,"\\\\").replace(/'/g,"\\'");}
function ekvRenderCell(c,r,ownedIdx){
  if(c.k==="swatch")return null; // rukuje se posebno po tabu (swatchOf)
  if(c.k==="type"||c.k==="section")return r[c.k]?`<td><span class="ekv-type">${esc(r[c.k])}</span></td>`:"<td></td>";
  const val=r[c.k]||"";
  const isCodeCol=c.k==="code"||c.k==="akRef"||c.k==="mengRef";
  if(!val)return "<td></td>";
  if(EKV_NONCODE_KEYS.has(c.k))return `<td${isCodeCol?' class="ekv-code"':""}>${esc(val)}</td>`;
  const owned=ekvCellOwned(val,ownedIdx);
  if(owned)return `<td><span class="ekv-owned${isCodeCol?" ekv-code":""}" title="✓ Već imaš u inventaru: ${esc(owned.name)} (${esc(owned.cat)}) — klikni za otvaranje" onclick="goToProduct('${jsStr(val)}')">${esc(val)}</span></td>`;
  return `<td${isCodeCol?' class="ekv-code"':""}>${esc(val)}</td>`;
}

// ── KONFIGURACIJA SVIH TABOVA U RUBRICI "USPOREDBA BOJA" ──
const ALCLAD_DATA = [{"code": "AK471", "swatch": "#1a1a1a", "name": "Black Base", "alclad_code": "", "alclad_name": ""}, {"code": "AK472", "swatch": "#c9a227", "name": "Gold", "alclad_code": "ALC-108", "alclad_name": "Pale Gold"}, {"code": "AK473", "swatch": "#b56a3d", "name": "Copper", "alclad_code": "ALC-110", "alclad_name": "Copper"}, {"code": "AK474", "swatch": "#8c6239", "name": "Bronze", "alclad_code": "", "alclad_name": ""}, {"code": "AK475", "swatch": "#c8a951", "name": "Brass", "alclad_code": "ALC-109", "alclad_name": "Polished Brass"}, {"code": "AK476", "swatch": "#9fa3a6", "name": "Steel", "alclad_code": "ALC-112", "alclad_name": "Steel"}, {"code": "AK477", "swatch": "#cfd3d6", "name": "Chrome", "alclad_code": "ALC-107", "alclad_name": "Chrome For Plastic"}, {"code": "AK478", "swatch": "#e6e7e8", "name": "White Aluminium", "alclad_code": "ALC-106", "alclad_name": "White Aluminium"}, {"code": "AK479", "swatch": "#b8bcbe", "name": "Aluminium", "alclad_code": "ALC-101", "alclad_name": "Aluminium"}, {"code": "AK480", "swatch": "#7d8082", "name": "Dark Aluminium", "alclad_code": "ALC-103", "alclad_name": "Dark Aluminium"}, {"code": "AK481", "swatch": "#d4d7d8", "name": "Polished Aluminium", "alclad_code": "ALC-105", "alclad_name": "Polished Aluminium"}, {"code": "AK482", "swatch": "#a9adae", "name": "Duraluminium", "alclad_code": "ALC-102", "alclad_name": "Duraluminium"}, {"code": "AK483", "swatch": "#4c4f52", "name": "Gun Metal", "alclad_code": "ALC-120", "alclad_name": "Gunmetal"}, {"code": "AK484", "swatch": "#5a4632", "name": "Burnt Metal", "alclad_code": "ALC-123", "alclad_name": "Exhaust Manifold"}, {"code": "AK485", "swatch": "#7a6650", "name": "Pale Burnt Metal", "alclad_code": "ALC-104", "alclad_name": "Pale Burnt Metal"}, {"code": "AK486", "swatch": "#3b3a38", "name": "Jet Exhausts", "alclad_code": "ALC-113", "alclad_name": "Jet Exhausts"}, {"code": "AK487", "swatch": "#2d4a7a", "name": "Metallic Blue", "alclad_code": "", "alclad_name": ""}, {"code": "AK488", "swatch": "#9a9c9d", "name": "Matte Aluminium", "alclad_code": "", "alclad_name": ""}, {"code": "AK669", "swatch": "#6e7275", "name": "Titanium", "alclad_code": "", "alclad_name": ""}, {"code": "AK670", "swatch": "#b0b3b5", "name": "Stainless Steel", "alclad_code": "ALC-115", "alclad_name": "Stainless Steel"}, {"code": "AK671", "swatch": "#55575a", "name": "Smoke Metallic", "alclad_code": "", "alclad_name": ""}, {"code": "AK672", "swatch": "#d4bd77", "name": "Pale Brass", "alclad_code": "", "alclad_name": ""}, {"code": "AK674", "swatch": "#5b3a6b", "name": "Metallic Purple", "alclad_code": "", "alclad_name": ""}];
const ALCLAD_COLS = [{"k": "code", "label": "AK šifra"}, {"k": "swatch", "label": "Boja"}, {"k": "name", "label": "AK naziv"}, {"k": "alclad_code", "label": "Alclad šifra"}, {"k": "alclad_name", "label": "Alclad naziv"}];
const PLAYMARKERS_DATA = [{"code": "AKM001", "swatch": "#4a5568", "name": "Gun Metal", "sets": "AKM105, AKM106, AKM108"}, {"code": "AKM002", "swatch": "#1a1a1a", "name": "Black", "sets": "AKM102, AKM104"}, {"code": "AKM003", "swatch": "#f5f5f0", "name": "White", "sets": "AKM102"}, {"code": "AKM004", "swatch": "#ddd0ac", "name": "Dirty White", "sets": "AKM102"}, {"code": "AKM005", "swatch": "#b0aca3", "name": "Light Grey", "sets": "AKM102"}, {"code": "AKM006", "swatch": "#504f4f", "name": "Dark Grey", "sets": ""}, {"code": "AKM007", "swatch": "#f0c9ae", "name": "Light Skin", "sets": "AKM107"}, {"code": "AKM008", "swatch": "#c99b76", "name": "Dark Skin", "sets": "AKM101, AKM107"}, {"code": "AKM009", "swatch": "#4a2c1d", "name": "Black Skin", "sets": "AKM107"}, {"code": "AKM010", "swatch": "#f0a58f", "name": "Pink Skin", "sets": "AKM107"}, {"code": "AKM011", "swatch": "#b3b083", "name": "Zombie Skin", "sets": "AKM102, AKM107"}, {"code": "AKM012", "swatch": "#8fc63f", "name": "Light Green", "sets": "AKM104"}, {"code": "AKM013", "swatch": "#205020", "name": "Dark Green", "sets": "AKM104"}, {"code": "AKM014", "swatch": "#6cb84f", "name": "Animal Green", "sets": "AKM104, AKM107"}, {"code": "AKM015", "swatch": "#17967e", "name": "Emerald", "sets": "AKM103"}, {"code": "AKM016", "swatch": "#ffd400", "name": "Yellow", "sets": "AKM101, AKM104"}, {"code": "AKM017", "swatch": "#d9a521", "name": "Peach", "sets": "AKM103"}, {"code": "AKM018", "swatch": "#d81f3d", "name": "Red", "sets": "AKM101, AKM106, AKM109"}, {"code": "AKM019", "swatch": "#f27a3a", "name": "Light Orange", "sets": "AKM101"}, {"code": "AKM020", "swatch": "#e6531b", "name": "Dark Orange", "sets": "AKM103"}, {"code": "AKM021", "swatch": "#c9b587", "name": "Desert Ochre", "sets": "AKM101"}, {"code": "AKM022", "swatch": "#5b4025", "name": "Wood", "sets": "AKM108"}, {"code": "AKM023", "swatch": "#4a2a1c", "name": "Leather", "sets": "AKM104, AKM108"}, {"code": "AKM024", "swatch": "#d9737c", "name": "Pink", "sets": "AKM102, AKM109"}, {"code": "AKM025", "swatch": "#17356b", "name": "Ultramarine", "sets": "AKM106"}, {"code": "AKM026", "swatch": "#1f4fc0", "name": "Medium Blue", "sets": "AKM103"}, {"code": "AKM027", "swatch": "#6bc0dc", "name": "Sky Blue", "sets": "AKM106"}, {"code": "AKM028", "swatch": "#16988f", "name": "Turquoise", "sets": "AKM103"}, {"code": "AKM029", "swatch": "#7a2f8e", "name": "Purple", "sets": "AKM103, AKM109"}, {"code": "AKM030", "swatch": "#c0c0c0", "name": "Silver", "sets": "AKM101, AKM105, AKM106"}, {"code": "AKM031", "swatch": "#c8a23a", "name": "Gold", "sets": "AKM105, AKM106"}, {"code": "AKM032", "swatch": "#d3a06a", "name": "Bronze", "sets": "AKM105"}, {"code": "AKM033", "swatch": "#b25e29", "name": "Copper", "sets": "AKM105"}, {"code": "AKM034", "swatch": "#c9a233", "name": "Brass", "sets": "AKM105"}];
const PLAYMARKERS_COLS = [{"k": "code", "label": "Kod markera"}, {"k": "swatch", "label": "Boja"}, {"k": "name", "label": "Naziv boje"}, {"k": "sets", "label": "Setovi"}];
const QUICKGEN_DATA = [{"code": "AK17001", "swatch": "#92135b", "name": "Space Magenta", "category": "Generic", "intensity": "High"}, {"code": "AK17002", "swatch": "#d85b9d", "name": "Pink Flesh", "category": "Generic", "intensity": "Low"}, {"code": "AK17003", "swatch": "#702d60", "name": "Purple Flesh", "category": "Generic", "intensity": "Low"}, {"code": "AK17004", "swatch": "#7b509c", "name": "Lavender", "category": "Generic", "intensity": "Medium"}, {"code": "AK17005", "swatch": "#422a85", "name": "Necromancer Purple", "category": "Generic", "intensity": "High"}, {"code": "AK17006", "swatch": "#50215a", "name": "Demon Purple", "category": "Generic", "intensity": "High"}, {"code": "AK17007", "swatch": "#f3bb03", "name": "Dirty Yellow", "category": "Generic", "intensity": "Medium"}, {"code": "AK17008", "swatch": "#e6e12b", "name": "Bile Yellow", "category": "Generic", "intensity": "Medium"}, {"code": "AK17009", "swatch": "#f28c16", "name": "Warm Orange", "category": "Generic", "intensity": "Medium"}, {"code": "AK17010", "swatch": "#fdc316", "name": "Warm Yellow", "category": "Generic", "intensity": "Medium"}, {"code": "AK17011", "swatch": "#f5ce00", "name": "Space Yellow", "category": "Generic", "intensity": "Medium"}, {"code": "AK17012", "swatch": "#eca900", "name": "Solar Yellow", "category": "Generic", "intensity": "Medium"}, {"code": "AK17013", "swatch": "#f5c30c", "name": "Plague Yellow", "category": "Generic", "intensity": "Medium"}, {"code": "AK17014", "swatch": "#f9ef72", "name": "Light Yellow", "category": "Generic", "intensity": "Medium"}, {"code": "AK17015", "swatch": "#0a8361", "name": "Jade Green", "category": "Generic", "intensity": "Medium"}, {"code": "AK17016", "swatch": "#90c35d", "name": "Spectral Green", "category": "Generic", "intensity": "Low"}, {"code": "AK17017", "swatch": "#0f6631", "name": "Space Green", "category": "Generic", "intensity": "High"}, {"code": "AK17018", "swatch": "#1e7731", "name": "Vivid Green", "category": "Generic", "intensity": "High"}, {"code": "AK17019", "swatch": "#206455", "name": "Space Dark Green", "category": "Generic", "intensity": "High"}, {"code": "AK17020", "swatch": "#7e7d2f", "name": "Leaf Green", "category": "Generic", "intensity": "Medium"}, {"code": "AK17021", "swatch": "#4a5821", "name": "Forest Green", "category": "Generic", "intensity": "Medium"}, {"code": "AK17022", "swatch": "#86a427", "name": "Rotten Green", "category": "Generic", "intensity": "Low"}, {"code": "AK17023", "swatch": "#077b35", "name": "Orc Flesh", "category": "Generic", "intensity": "Medium"}, {"code": "AK17024", "swatch": "#72c3e6", "name": "Ice Blue", "category": "Generic", "intensity": "Low"}, {"code": "AK17025", "swatch": "#114b70", "name": "Night Blue", "category": "Generic", "intensity": "High"}, {"code": "AK17026", "swatch": "#014d8b", "name": "Power Blue", "category": "Generic", "intensity": "High"}, {"code": "AK17027", "swatch": "#223770", "name": "Ultramarine Blue", "category": "Generic", "intensity": "High"}, {"code": "AK17028", "swatch": "#319f9b", "name": "Spectral Blue", "category": "Generic", "intensity": "Low"}, {"code": "AK17029", "swatch": "#006284", "name": "Turquoise Blue", "category": "Generic", "intensity": "High"}, {"code": "AK17030", "swatch": "#006762", "name": "Turquoise Green", "category": "Generic", "intensity": "High"}, {"code": "AK17031", "swatch": "#79191d", "name": "Crimson Red", "category": "Generic", "intensity": "High"}, {"code": "AK17032", "swatch": "#ee8236", "name": "Dwarf Flesh", "category": "Generic", "intensity": "Low"}, {"code": "AK17033", "swatch": "#e8631a", "name": "Orange", "category": "Generic", "intensity": "High"}, {"code": "AK17034", "swatch": "#c23b2f", "name": "Space Red", "category": "Generic", "intensity": "High"}, {"code": "AK17035", "swatch": "#d25123", "name": "Reddish Orange", "category": "Generic", "intensity": "High"}, {"code": "AK17036", "swatch": "#e0673f", "name": "Vivid Flesh", "category": "Generic", "intensity": "Low"}, {"code": "AK17037", "swatch": "#90281a", "name": "Infernal Red", "category": "Generic", "intensity": "High"}, {"code": "AK17038", "swatch": "#67231f", "name": "Night Blood", "category": "Generic", "intensity": "High"}, {"code": "AK17039", "swatch": "#b7a3b4", "name": "Light Grey Shadow", "category": "Generic", "intensity": "Low"}, {"code": "AK17040", "swatch": "#7e6d75", "name": "Grey Shadow", "category": "Generic", "intensity": "Low"}, {"code": "AK17041", "swatch": "#778a8e", "name": "Winter Grey", "category": "Generic", "intensity": "Low"}, {"code": "AK17042", "swatch": "#3c535a", "name": "Bluish Grey", "category": "Generic", "intensity": "Medium"}, {"code": "AK17043", "swatch": "#cbc9c9", "name": "White Shadow", "category": "Generic", "intensity": "Low"}, {"code": "AK17044", "swatch": "#5b5c67", "name": "Strong Grey", "category": "Generic", "intensity": "Medium"}, {"code": "AK17045", "swatch": "#a5a5b5", "name": "Space Grey", "category": "Generic", "intensity": "Low"}, {"code": "AK17046", "swatch": "#6e674c", "name": "Dirty Grey", "category": "Generic", "intensity": "Low"}, {"code": "AK17047", "swatch": "#503d35", "name": "Brown Black", "category": "Generic", "intensity": "High"}, {"code": "AK17048", "swatch": "#4b211a", "name": "Dark Leather", "category": "Generic", "intensity": "High"}, {"code": "AK17049", "swatch": "#3c3d3d", "name": "Black", "category": "Generic", "intensity": "High"}, {"code": "AK17050", "swatch": "#736f71", "name": "Soft Black", "category": "Generic", "intensity": "Low"}, {"code": "AK17051", "swatch": "#242c36", "name": "Blue Black", "category": "Generic", "intensity": "High"}, {"code": "AK17052", "swatch": "#363345", "name": "Night Black", "category": "Generic", "intensity": "High"}, {"code": "AK17053", "swatch": "#693b1f", "name": "Leather", "category": "Generic", "intensity": "High"}, {"code": "AK17054", "swatch": "#8f4d15", "name": "Orange Brown", "category": "Generic", "intensity": "Medium"}, {"code": "AK17055", "swatch": "#897c1c", "name": "Putrid White", "category": "Generic", "intensity": "Low"}, {"code": "AK17056", "swatch": "#8d443d", "name": "Reddish Flesh", "category": "Generic", "intensity": "Low"}, {"code": "AK17057", "swatch": "#84462b", "name": "Human Flesh", "category": "Generic", "intensity": "Low"}, {"code": "AK17058", "swatch": "#693b1f", "name": "Bone Brown", "category": "Generic", "intensity": "Low"}, {"code": "AK17059", "swatch": "#926614", "name": "Camel Brown", "category": "Generic", "intensity": "Medium"}, {"code": "AK17060", "swatch": "#904b14", "name": "Light Leather", "category": "Generic", "intensity": "Medium"}, {"code": "AK17061", "swatch": "#603a26", "name": "Dark Flesh", "category": "Generic", "intensity": "Medium"}, {"code": "AK17062", "swatch": "#603018", "name": "Wood", "category": "Generic", "intensity": "Medium"}, {"code": "AK17063", "swatch": "#7f6516", "name": "Desert Yellow", "category": "Generic", "intensity": "Medium"}, {"code": "AK17064", "swatch": "#9b747b", "name": "Vampire Flesh", "category": "Generic", "intensity": "Low"}, {"code": "AK17065", "swatch": "#daa626", "name": "Gold", "category": "Metalik", "intensity": ""}, {"code": "AK17066", "swatch": "#bf7726", "name": "Copper", "category": "Metalik", "intensity": ""}, {"code": "AK17067", "swatch": "#5d5d5c", "name": "Dark Steel", "category": "Metalik", "intensity": ""}, {"code": "AK17068", "swatch": "#e1b864", "name": "Old Gold", "category": "Metalik", "intensity": ""}, {"code": "AK17069", "swatch": "#83491d", "name": "Bronze", "category": "Metalik", "intensity": ""}, {"code": "AK17070", "swatch": "#495f78", "name": "Cold Steel", "category": "Metalik", "intensity": ""}, {"code": "AK17071", "swatch": "#3f3f47", "name": "German Grey", "category": "Vojna (Military)", "intensity": ""}, {"code": "AK17072", "swatch": "#4d4d44", "name": "Field Grey", "category": "Vojna (Military)", "intensity": ""}, {"code": "AK17073", "swatch": "#4c541f", "name": "Dak Green", "category": "Vojna (Military)", "intensity": ""}, {"code": "AK17074", "swatch": "#736b2a", "name": "Us Olive Uniform", "category": "Vojna (Military)", "intensity": ""}, {"code": "AK17075", "swatch": "#855d12", "name": "Ochre Green", "category": "Vojna (Military)", "intensity": ""}, {"code": "AK17076", "swatch": "#88591b", "name": "British Uniform", "category": "Vojna (Military)", "intensity": ""}, {"code": "AK17077", "swatch": "#505821", "name": "Russian Uniform", "category": "Vojna (Military)", "intensity": ""}, {"code": "AK17078", "swatch": "#103a60", "name": "Russian Blue", "category": "Vojna (Military)", "intensity": ""}, {"code": "AK17079", "swatch": "#a16d13", "name": "Desert Sand", "category": "Vojna (Military)", "intensity": ""}, {"code": "AK17080", "swatch": "", "name": "Medium Quick Gen", "category": "Medium (razrjeđivač)", "intensity": ""}];
const QUICKGEN_COLS = [{"k": "code", "label": "Šifra"}, {"k": "swatch", "label": "Boja"}, {"k": "name", "label": "Naziv"}, {"k": "category", "label": "Kategorija"}, {"k": "intensity", "label": "Pokrivnost"}];
const RCM_DATA = [{"code": "RCM001", "swatch": "#2b2b2b", "name": "Rubber Black", "ref": "", "sets": "RCM102"}, {"code": "RCM002", "swatch": "#e9e5da", "name": "Off White", "ref": "", "sets": ""}, {"code": "RCM003", "swatch": "#c62b1f", "name": "Signal Red", "ref": "RAL 3020", "sets": "RCM106"}, {"code": "RCM004", "swatch": "#f2c317", "name": "Yellow", "ref": "RAL 1003", "sets": "RCM106"}, {"code": "RCM005", "swatch": "#e0611a", "name": "Orange", "ref": "RAL 2004", "sets": ""}, {"code": "RCM006", "swatch": "#1f4a7a", "name": "Blue", "ref": "RAL 5001", "sets": ""}, {"code": "RCM007", "swatch": "#4a3324", "name": "Brown", "ref": "", "sets": "RCM101, RCM103"}, {"code": "RCM008", "swatch": "#c9a375", "name": "Buff", "ref": "", "sets": ""}, {"code": "RCM009", "swatch": "#cbb994", "name": "Deck Tan", "ref": "", "sets": "RCM104"}, {"code": "RCM010", "swatch": "#c9cdd1", "name": "Aluminium", "ref": "", "sets": "RCM105"}, {"code": "RCM011", "swatch": "#8b8f92", "name": "Dark Aluminium", "ref": "", "sets": "RCM102, RCM105"}, {"code": "RCM012", "swatch": "#c9a06a", "name": "Wood Base", "ref": "", "sets": "RCM101, RCM104"}, {"code": "RCM013", "swatch": "#4a2f22", "name": "Chipping Color", "ref": "", "sets": "RCM105"}, {"code": "RCM014", "swatch": "#e8d3a6", "name": "Elfenbein-Ivory", "ref": "RAL 1001", "sets": "RCM107"}, {"code": "RCM015", "swatch": "#5b6b3d", "name": "Olivgrün", "ref": "RAL 6003", "sets": "RCM108"}, {"code": "RCM016", "swatch": "#8a8f86", "name": "Hellgrau-Light Grey", "ref": "RAL 7009", "sets": "RCM107"}, {"code": "RCM017", "swatch": "#3a3f3d", "name": "Dunkelgrau", "ref": "RAL 7021", "sets": ""}, {"code": "RCM018", "swatch": "#b6a075", "name": "Dunkelgelb", "ref": "RAL 7028", "sets": "RCM108"}, {"code": "RCM019", "swatch": "#6e3a34", "name": "Rotbraun-Red Brown", "ref": "RAL 8012", "sets": "RCM104, RCM107"}, {"code": "RCM020", "swatch": "#5a3a38", "name": "Rotbraun-Red Brown", "ref": "RAL 8017", "sets": "RCM108"}, {"code": "RCM021", "swatch": "#6b6b45", "name": "Olive Drab", "ref": "", "sets": ""}, {"code": "RCM022", "swatch": "#6a7350", "name": "Interior Green", "ref": "FS 34151", "sets": "RCM109"}, {"code": "RCM023", "swatch": "#7d8a4e", "name": "US Interior Yellow Green", "ref": "", "sets": "RCM109"}, {"code": "RCM024", "swatch": "#8a8a80", "name": "Grau (1938)", "ref": "RLM 02", "sets": "RCM110"}, {"code": "RCM025", "swatch": "#3d4a49", "name": "–", "ref": "RLM 66", "sets": "RCM110"}, {"code": "RCM026", "swatch": "#a9bcbe", "name": "–", "ref": "RLM 76", "sets": "RCM111"}, {"code": "RCM027", "swatch": "#d98f4a", "name": "–", "ref": "RLM 79", "sets": "RCM111"}, {"code": "RCM028", "swatch": "#7c8a72", "name": "RAF Cockpit Grey-Green", "ref": "", "sets": "RCM109"}, {"code": "RCM029", "swatch": "#7f8a4a", "name": "IJN M3 (M) Mitsubishi Interior Green", "ref": "", "sets": "RCM110"}, {"code": "RCM030", "swatch": "#1f5c4a", "name": "IJA AO Midori Iro (Blue Green)", "ref": "", "sets": "RCM111"}, {"code": "RCM031", "swatch": "#4aa192", "name": "Russian Cockpit Turquoise", "ref": "", "sets": ""}, {"code": "RCM032", "swatch": "#5a5d60", "name": "Gun Metal", "ref": "", "sets": "RCM101, RCM103"}, {"code": "RCM033", "swatch": "#1a1a1a", "name": "Flat Black", "ref": "", "sets": "RCM102, RCM103"}, {"code": "RCM034", "swatch": "#f5f5f0", "name": "Flat White", "ref": "", "sets": "RCM106"}, {"code": "RCM101", "swatch": "", "name": "SET: TOOLS", "ref": "", "sets": "", "members": "RCM032, RCM012, RCM007"}, {"code": "RCM102", "swatch": "", "name": "SET: WHEELS", "ref": "", "sets": "", "members": "RCM033, RCM001, RCM011"}, {"code": "RCM103", "swatch": "", "name": "SET: WEAPONS", "ref": "", "sets": "", "members": "RCM032, RCM033, RCM007"}, {"code": "RCM104", "swatch": "", "name": "SET: SHIPS AND DECKS", "ref": "", "sets": "", "members": "RCM009, RCM012, RCM019"}, {"code": "RCM105", "swatch": "", "name": "SET: CHIPPING", "ref": "", "sets": "", "members": "RCM010, RCM011, RCM013"}, {"code": "RCM106", "swatch": "", "name": "SET: TACTICAL MARKINGS", "ref": "", "sets": "", "members": "RCM003, RCM004, RCM034"}, {"code": "RCM107", "swatch": "", "name": "SET: GERMAN TANKS INTERIOR COLORS", "ref": "", "sets": "", "members": "RCM014, RCM016, RCM019"}, {"code": "RCM108", "swatch": "", "name": "SET: LATE GERMAN AFV CAMO COLORS", "ref": "", "sets": "", "members": "RCM015, RCM018, RCM020"}, {"code": "RCM109", "swatch": "", "name": "SET: WWII ALLIED AIRCRAFT COCKPIT COLORS", "ref": "", "sets": "", "members": "RCM022, RCM023, RCM028"}, {"code": "RCM110", "swatch": "", "name": "SET: WWII AXIS AIRCRAFT COCKPIT COLORS", "ref": "", "sets": "", "members": "RCM024, RCM025, RCM029"}, {"code": "RCM111", "swatch": "", "name": "SET: WWII AXIS AIRCRAFT SQUIGGLE CAMOUFLAGE COLORS", "ref": "", "sets": "", "members": "RCM026, RCM027, RCM030"}];
const RCM_COLS = [{"k": "code", "label": "RCM šifra"}, {"k": "swatch", "label": "Boja"}, {"k": "name", "label": "Naziv"}, {"k": "ref", "label": "RAL/RLM/FS referenca"}, {"k": "sets", "label": "U setovima"}, {"k": "members", "label": "Sadržaj seta"}];
const GOUACHE_DATA = [{"code": "AKG01", "swatch": "#f2f1ec", "name": "Snow White", "sets": "AKG25"}, {"code": "AKG02", "swatch": "#141414", "name": "Black", "sets": "AKG25"}, {"code": "AKG03", "swatch": "#cdbfa0", "name": "Sand", "sets": "AKG26"}, {"code": "AKG04", "swatch": "#b89b76", "name": "Earth (Dry)", "sets": "AKG26"}, {"code": "AKG05", "swatch": "#8a6f52", "name": "Dark Earth", "sets": "AKG26"}, {"code": "AKG06", "swatch": "#b3702f", "name": "Dry Mud", "sets": "AKG26"}, {"code": "AKG07", "swatch": "#a9b39a", "name": "Dust", "sets": "AKG26"}, {"code": "AKG08", "swatch": "#8bb33a", "name": "Moss Green", "sets": "AKG26"}, {"code": "AKG09", "swatch": "#c94e1f", "name": "Fresh Rust", "sets": "AKG25"}, {"code": "AKG10", "swatch": "#3d2418", "name": "Old Rust", "sets": "AKG25"}, {"code": "AKG11", "swatch": "#9c3d20", "name": "Medium Rust", "sets": "AKG25"}, {"code": "AKG12", "swatch": "#5c5445", "name": "Grime", "sets": "AKG25"}, {"code": "AKG25", "swatch": "", "name": "SET: Weathering Effects Set", "sets": "", "members": "AKG01, AKG02, AKG09, AKG10, AKG11, AKG12"}, {"code": "AKG26", "swatch": "", "name": "SET: Nature Weathering Effects Set", "sets": "", "members": "AKG03, AKG04, AKG05, AKG06, AKG07, AKG08"}];
const GOUACHE_COLS = [{"k": "code", "label": "AKG šifra"}, {"k": "swatch", "label": "Boja"}, {"k": "name", "label": "Naziv"}, {"k": "sets", "label": "U setovima"}, {"k": "members", "label": "Sadržaj seta"}];
const EKV_TABS = [
  {id:"ak2021",   label:"AK 3G Acrylics – tablica (2021)", data:()=>EQUIV_DATA, cols:EQUIV_COLS, swatchOf:r=>r.swatch,
   hint:"Službena AK Interactive tablica ekvivalencija (2021) — Modelling, AFV, Figure i Air serija 3. generacije akrilnih boja, s ekvivalentima kod Tamiye, Humbrola, Vallejo Model/Game Color, Gunze/Mr. Hobbyja, Testora, Lifecolora, RLM/RAL/BS/FS standarda, Revella, Hataka, Real Colors, Citadela (novi i stari nazivi) i Menga."},
  {id:"ak2023",   label:"AK 3G ↔ Vallejo/Citadel", data:()=>DOC1_DATA, cols:DOC1_COLS, swatchOf:r=>swatchForAk(r.code),
   hint:"EQUIVALENCIAS2023 — AK 3G šifre s pripadajućim Vallejo Model Color, Vallejo Game Color te novim i starim Citadel nazivima."},
  {id:"rcold",    label:"Real Colors (staro, RC001–342)", data:()=>REALCOLORS_DATA.filter(r=>r.era==="old"), cols:REALCOLORS_COLS_OLD, swatchOf:r=>swatchForRc(r.code),
   hint:"Stara numeracija AK Real Colors linije (RC001–RC342, RC500–RC508) s ekvivalentima kod BS/FS/RAL, Mr. Hobbyja, Tamiye, Vallejo, Hataka, Humbrola, Model Mastera i Lifecolora."},
  {id:"rcnew",    label:"Real Colors (novo, RC801–980)", data:()=>REALCOLORS_DATA.filter(r=>r.era==="new"), cols:REALCOLORS_COLS_NEW, swatchOf:r=>swatchForRc(r.code,r.prevref),
   hint:"Nova numeracija AK Real Colors linije (RC801–RC980, sekcije Standard/Civil/Military) s referencom na staru RC šifru te (za Civil boje) Tamiya/Number Five/Gravity/Zero Paints šiframa i napomenama o primjeni."},
  {id:"meng",     label:"Meng ↔ AK 3Gen", data:()=>DOC3_DATA, cols:DOC3_COLS, swatchOf:r=>swatchForAk(r.akRef),
   hint:"EQUIVALENCIAS_MENG-AK — ekvivalencije između Meng akrilnih boja i AK 3. generacije akrila, s izvornim engleskim i kineskim nazivima."},
  {id:"val2ak",   label:"Vallejo → AK 3G", data:()=>DOC4_DATA, cols:DOC4_COLS, swatchOf:r=>swatchForAk(r.akRef),
   hint:"equiv_vallejo-ak — pretraga po Vallejo šifri daje odgovarajuću AK 3G šifru."},
  {id:"ak2val",   label:"AK 3G → Vallejo", data:()=>DOC5_DATA, cols:DOC5_COLS, swatchOf:r=>swatchForAk(r.akRef),
   hint:"equiv_ak-vallejo — pretraga po AK 3G šifri daje odgovarajuću Vallejo šifru."},
  {id:"alclad",      label:"AK Metalik ↔ Alclad", data:()=>ALCLAD_DATA, cols:ALCLAD_COLS, swatchOf:r=>r.swatch,
   hint:"Službena AK Interactive tablica ekvivalencija metalik boja (akril) i Alclad II metalik lakova. Koristi se kad želite zamijeniti AK metalik boju (serija AK471-AK488 i AK669-AK674) odgovarajućim Alclad lakom istog izgleda i namjene, ili obrnuto - kad imate Alclad boju i tražite najbliži AK metalik pandan. Napomena: nekoliko AK nijansi (npr. Black Base, Bronze, Metallic Blue, Matte Aluminium, Titanium, Smoke Metallic, Pale Brass, Metallic Purple) nema izravan Alclad ekvivalent u službenoj tablici pa su ta polja prazna. Boje (swatch) su procijenjene prema nazivu nijanse jer proizvođač ne objavljuje točne HEX kodove. (Napomena: boje/nijanse su procijenjene radi prikaza, nisu službene hex vrijednosti iz izvora.)"},
  {id:"playmarkers", label:"AK Playmarkers", data:()=>PLAYMARKERS_DATA, cols:PLAYMARKERS_COLS, swatchOf:r=>r.swatch,
   hint:"Popis boja iz službenog AK Interactive kataloga za Playmarkers - markere s kistom (brush-tip) punjene akrilnom bojom, namijenjene brzom bojanju figurica za društvene igre (RPG, wargame, board game). Katalog ne navodi službene ekvivalente s drugim linijama boja (Tamiya, Vallejo i sl.) - riječ je o zasebnoj liniji od 34 nove nijanse (AKM001-AKM034). Stupac 'Setovi' pokazuje u kojem/kojim gotovim AKM1xx setovima (Heroes, Skeletons & Zombies, Full Metal...) se pojedina boja nalazi, što može poslužiti kao orijentir za kombiniranje nijansi. Boje (swatch) su procijenjene vizualno iz kataloga jer proizvođač ne objavljuje HEX kodove. (Napomena: AK Playmarkers je samostalna linija bez službenih cross-brand ekvivalencija; boje su procijenjene radi prikaza.)"},
  {id:"quickgen",    label:"AK QuickGen", data:()=>QUICKGEN_DATA, cols:QUICKGEN_COLS, swatchOf:r=>r.swatch,
   hint:"Popis boja iz službenog AK Interactive kataloga za Quick Gen - liniju jednoslojnih 'contrast' boja za brzo bojanje figurica (na bazi nove generacije smole/medija), koje se nanose preko bijele (ili crne/sive) podloge i same stvaraju sjene u udubljenjima i svjetla na izbočenim detaljima. Stupac 'Kategorija' razlikuje osnovni raspon (Generic, 64 boje), metalik raspon (6 boja) i vojni raspon s tonovima WW2/napoleonskih uniformi (9 boja), a 'Pokrivnost' (Low/Medium/High) je službena oznaka jačine pigmenta iz kataloga - što pomaže procijeniti koliko slojeva je potrebno za puno prekrivanje. AK17080 je Medium (razrjeđivač/produžetak sušenja) za mješanje s bojama, a ne samostalna boja. Ekvivalenti s drugim markama nisu navedeni u izvoru - Quick Gen je zasebna formulacija. Boje (swatch) su automatski očitane s uzoraka nijansi u katalogu (izgled boje nanesene preko bijele podloge), pa su okvirne, ne točan pigment iz bočice. (Napomena: AK QuickGen je samostalna linija bez službenih cross-brand ekvivalencija; boje su uzorkovane iz PDF kataloga.)"},
  {id:"rcmarkers",   label:"AK RC Markers", data:()=>RCM_DATA, cols:RCM_COLS, swatchOf:r=>r.swatch,
   hint:"Službeni AK Interactive katalog AK Real Colors Markers (RCM) — 34 pojedinačne boje s RAL/RLM/FS referencom gdje je navedena, plus 11 gotovih setova (RCM101–RCM111) i koje boje sadrže. Već imaš nekoliko ovih markera u inventaru (npr. RCM101, RCM102, RCM106)."},
  {id:"gouache",     label:"AK Gouache Weathering", data:()=>GOUACHE_DATA, cols:GOUACHE_COLS, swatchOf:r=>r.swatch,
   hint:"Službeni AK Interactive katalog AK Acrylic Weathering Gouache — 12 pojedinačnih boja (AKG01–AKG12) plus 2 gotova seta (AKG25 Weathering Effects, AKG26 Nature Weathering Effects) i koje boje sadrže."}
];
let ekvActiveTab="ak2021";
function getEkvTab(id){return EKV_TABS.find(t=>t.id===id)||EKV_TABS[0];}
function setEkvTab(tabId){
  ekvActiveTab=tabId;
  document.querySelectorAll(".ekv-subtab").forEach(btn=>btn.classList.toggle("active",btn.dataset.tab===tabId));
  document.getElementById("ekvSearch").value="";
  if(tabId==="all"){
    document.getElementById("ekvSearch").placeholder="Upiši šifru ili naziv boje (min. 2 znaka) da vidiš zamjene u svim tablicama…";
    document.getElementById("ekvHint").innerHTML='🔎 Ova pretraga prolazi kroz svih 12 tablica ekvivalencija odjednom i traži tvoju boju po šifri ili nazivu. Zeleno označena šifra (<span class="ekv-owned" style="cursor:default">npr.</span>) znači da tu zamjensku boju već imaš u inventaru.';
    document.getElementById("ekvCount").textContent="Upiši šifru ili naziv boje da započneš pretragu.";
    document.getElementById("ekvTable").innerHTML="";
    return;
  }
  const tab=getEkvTab(tabId);
  document.getElementById("ekvSearch").placeholder="Pretraži po šifri, nazivu ili šifri drugog proizvođača…";
  document.getElementById("ekvHint").textContent=tab.hint||"";
  renderEkvTable("");
}
function renderEkvTable(searchQ){
  if(ekvActiveTab==="all"){renderEkvAllSearch(searchQ);return;}
  const tab=getEkvTab(ekvActiveTab);
  const allRows=tab.data();
  const q=(searchQ||"").trim().toLowerCase();
  const rows=q?allRows.filter(r=>Object.values(r).some(v=>(v||"").toString().toLowerCase().includes(q))):allRows;
  const countEl=document.getElementById("ekvCount");
  if(countEl)countEl.textContent=q?`${rows.length} od ${allRows.length} rezultata`:`${allRows.length} zapisa u tablici`;
  const table=document.getElementById("ekvTable");
  if(!table)return;
  if(!rows.length){table.innerHTML='<tr><td class="ekv-empty" style="padding:16px">Nema rezultata za tu pretragu.</td></tr>';return;}
  const shown=rows;
  const ownedIdx=buildOwnedPaintIndex();
  let html='<thead><tr>'+tab.cols.map(c=>`<th>${c.label}</th>`).join("")+'</tr></thead><tbody>';
  shown.forEach(r=>{
    html+='<tr>'+tab.cols.map(c=>{
      if(c.k==="swatch"){const sw=tab.swatchOf?tab.swatchOf(r):r.swatch;return sw?`<td><span class="ekv-swatch" style="background:${esc(sw)}" title="${esc(sw)}"></span></td>`:"<td></td>";}
      return ekvRenderCell(c,r,ownedIdx);
    }).join("")+'</tr>';
  });
  html+='</tbody>';
  table.innerHTML=html;
}
// Pretraga kroz SVIH 7 tablica odjednom - za odabranu/upisanu boju
// pronalazi retke u bilo kojoj tablici koji je spominju (po šifri ili
// nazivu) i zeleno označava zamjene koje korisnik već ima u inventaru.
function renderEkvAllSearch(searchQ){
  const query=(searchQ||"").trim().toLowerCase();
  const countEl=document.getElementById("ekvCount");
  const table=document.getElementById("ekvTable");
  if(!query||query.length<2){
    if(countEl)countEl.textContent="Upiši šifru ili naziv boje (min. 2 znaka) da započneš pretragu.";
    if(table)table.innerHTML="";
    return;
  }
  const ownedIdx=buildOwnedPaintIndex();
  const matches=[];
  EKV_TABS.forEach(tab=>{
    tab.data().forEach(r=>{
      const hit=Object.values(r).some(v=>(v||"").toString().toLowerCase().includes(query));
      if(hit)matches.push({tab,row:r});
    });
  });
  const LIMIT=150;
  if(countEl)countEl.textContent=matches.length>LIMIT?`${matches.length} rezultata u svim tablicama (prikazano prvih ${LIMIT})`:`${matches.length} rezultata u svim tablicama`;
  if(!table)return;
  if(!matches.length){table.innerHTML='<tr><td class="ekv-empty" style="padding:16px">Nema rezultata za tu pretragu ni u jednoj tablici.</td></tr>';return;}
  let html='<thead><tr><th style="width:220px">Tablica</th><th>Podaci retka</th></tr></thead><tbody>';
  matches.slice(0,LIMIT).forEach(({tab,row})=>{
    const parts=tab.cols.filter(c=>c.k!=="swatch").map(c=>{
      const val=row[c.k];
      if(!val)return "";
      const cellHtml=ekvRenderCell(c,row,ownedIdx);
      const inner=cellHtml.replace(/^<td[^>]*>/,"").replace(/<\/td>$/,"");
      return `<span style="color:var(--muted)">${esc(c.label)}:</span> ${inner}`;
    }).filter(Boolean).join(" &nbsp;·&nbsp; ");
    html+=`<tr><td class="ekv-type" style="white-space:normal;vertical-align:top">${esc(tab.label)}</td><td style="white-space:normal">${parts}</td></tr>`;
  });
  html+='</tbody>';
  table.innerHTML=html;
}
function searchEkv(q){renderEkvTable(q);}
// Brzi prečac s kartice boje u Inventaru - otvara "Traži zamjenu" tab
// unaprijed popunjen šifrom te boje.
function findPaintEquivalents(code){
  if(!code)return;
  showPage("ekvivalencije",document.querySelector(".nav-tab.t-ekv"));
  setEkvTab("all");
  const inp=document.getElementById("ekvSearch");
  if(inp){inp.value=code;renderEkvAllSearch(code);setTimeout(()=>inp.focus(),80);}
}

// ── STATE ──────────────────────────────────────────────────────
let S=loadS();
let page="inventar",filter="all",search="",activeTag=null,activeMfr=null,viewMode="card",izvorFilter="sve",izvoriMaketaFilter=null;
let pmCat=null,pmStatus="imam",pmEditId=null,pmTags=[],pmSwatches=[],pmImgData=null,pmImgTab="url";
let imgEditCat=null,imgEditId=null,imgTab="url",imgData=null;
let mtwCat=null,mtwId=null;
let wmBuyId=null,wmBuyStatus="imam",wmBuyDest="inventar";
let mmEditId=null,mmImgData=null,mmSelectedColors=new Set();
let lbImgs=[],lbIdx=0;
let dragSrcCat=null,dragSrcIdx=null,dragCatName=null;

// Sigurni wrapper oko sessionStorage — neki preglednici (npr. kad se HTML
// otvori izravno dvoklikom kao file://, ili u privatnom/inkognito načinu)
// blokiraju pristup Storage API-ju i bacaju grešku. Bez ovog wrappera to bi
// prekinulo izvršavanje renderInv()/toggleCat() i "zamrznulo" dio sučelja.
let _sessFallback={};
function safeSessionGet(key){
  try{return sessionStorage.getItem(key);}catch(e){return _sessFallback[key]??null;}
}
function safeSessionSet(key,val){
  try{sessionStorage.setItem(key,val);}catch(e){_sessFallback[key]=val;}
}
let bulkMode=false;
let bulkSelected=new Set();
const _imgObserver=("IntersectionObserver" in window)?new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el=entry.target;
      if(el._resolveImg){el._resolveImg();el._resolveImg=null;}
      _imgObserver.unobserve(el);
    }
  });
},{rootMargin:"250px"}):null;
const IC_KEY="ak_img_cache_v1";
let IC={};
// Napomena: prijašnji predmemorirani (pogođeni) linkovi na slike se više ne
// učitavaju niti koriste — na zahtjev korisnika, prikazuju se isključivo
// slike koje su stvarno učitane s računala.
try{AppStore.removeItem(IC_KEY);}catch(e){}
function saveIC(){/* isključeno — slike se više ne predmemoriraju kao linkovi */}

// ── STORAGE ────────────────────────────────────────────────────
// Zajednička migracija naziva/strukture kategorija — koristi je loadS() (učitavanje iz
// localStorage) I importData() (uvoz JSON backupa), tako da stare/uvezene datoteke prolaze
// kroz iste popravke kao i normalno učitavanje.
// Spaja stavke po "code" polju, dajući prednost STARIM (korisnikovim stvarnim) podacima
// nad eventualnim svježe-popunjenim (default) stavkama iste, novoimenovane kategorije.
function mergeCategoryInto(saved,oldName,newName){
  if(!saved.inventar[oldName])return;
  const oldItems=saved.inventar[oldName].items||[];
  if(!saved.inventar[newName]){
    saved.inventar[newName]={items:oldItems};
  }else{
    const newItems=saved.inventar[newName].items||[];
    const byCode={};
    newItems.forEach(it=>{byCode[it.code||it.id]=it;});
    oldItems.forEach(it=>{byCode[it.code||it.id]=it;}); // stari (stvarni) podaci imaju prednost
    saved.inventar[newName].items=Object.values(byCode);
  }
  delete saved.inventar[oldName];
  if(saved.catOrder){
    const idx=saved.catOrder.indexOf(oldName);
    if(idx!==-1){
      if(!saved.catOrder.includes(newName))saved.catOrder[idx]=newName;
      else saved.catOrder.splice(idx,1);
    }
  }
}
function migrateLegacyCategories(saved){
  if(!saved||!saved.inventar)return;
  let didMigrate=false;
  // 1) Preimenovanje kategorija koje su u međuvremenu dobile duži, opisniji naziv.
  const RENAME_MAP={
    "AK Flomasteri – Kompleti":"AK Markeri – Kompleti",
    "AK Flomasteri – Odvojeni":"AK Markeri – Odvojeni",
    "Bojice (Oil Pencil)":"Oil Pencil (uljne bojice)",
    "AK Gouache":"AK Gouache (gvaš boje)",
    "3Gen Acrylic Colors":"3Gen Acrylic Colors (3. generacija akrilnih boja)",
    "Primer – Ready for Airbrush":"Primer – Ready for Airbrush (temeljni premaz za airbrush)",
    "Primer and Microfiller":"Primer and Microfiller (temeljni premaz i mikropunilo)",
    "Precision Panel Liner":"Precision Panel Liner (obrub panela)",
    "Varnish":"Varnish (lak)",
    "Cleaner & Thinner":"Cleaner & Thinner (čistač i razrjeđivač)",
    "Dual Exo Scenery":"Dual Exo Scenery (boje za dioramu/scenografiju)",
  };
  for(const [oldName,newName] of Object.entries(RENAME_MAP)){
    if(saved.inventar[oldName]){mergeCategoryInto(saved,oldName,newName);didMigrate=true;}
  }
  // 2) Stara kategorija "Effect" (u bilo kojem od dva poznata naziva) rascjepkana je na
  //    Effects/Deposits/Pigments prema stvarnoj AK Interactive kategorizaciji.
  const effectAliases=["Effect (efekti, emajl)","Effect (emajl)"];
  const splitMap={"AK022":"Effects (efekti)","AK078":"Effects (efekti)","AK017":"Effects (efekti)",
    "AK4063":"Deposits (naslage)","AK4061":"Deposits (naslage)","AK4062":"Deposits (naslage)",
    "AK041":"Pigments (pigmenti)"};
  for(const oldName of effectAliases){
    if(!saved.inventar[oldName])continue;
    const oldItems=saved.inventar[oldName].items||[];
    for(const item of oldItems){
      const targetCat=splitMap[item.code]||"Effects (efekti)";
      if(!saved.inventar[targetCat])saved.inventar[targetCat]={items:[]};
      const idx=saved.inventar[targetCat].items.findIndex(it=>it.code===item.code);
      if(idx!==-1)saved.inventar[targetCat].items[idx]=item; // stvarni podaci imaju prednost
      else saved.inventar[targetCat].items.push(item);
    }
    delete saved.inventar[oldName];
    if(saved.catOrder){
      const oldIdx=saved.catOrder.indexOf(oldName);
      if(oldIdx!==-1)saved.catOrder.splice(oldIdx,1,"Effects (efekti)","Deposits (naslage)","Pigments (pigmenti)");
    }
    didMigrate=true;
  }
  // Ukloni eventualne preostale duplikate iz catOrder (npr. ako su nova imena bila
  // ranije dodana automatskim popunjavanjem prije nego je ovaj popravak postojao).
  if(saved.catOrder)saved.catOrder=[...new Set(saved.catOrder)].filter(c=>saved.inventar[c]);
  if(didMigrate)setTimeout(()=>showToast("✓ Stare kategorije spojene s novima (podaci sačuvani)"),800);
}
function loadS(){
  try{
    const s=AppStore.getItem(SK);
    if(s){
      const saved=JSON.parse(s);
      // Migracija: korisnik je zatražio da se svi priručnici uklone —
      // prisilno isprazni spremljeni popis priručnika bez obzira što je
      // ranije bilo spremljeno u pregledniku.
      if(saved.prirucnici&&saved.prirucnici.length)saved.prirucnici=[];
      // Migracija: preimenuj staru "Real Colors – 1945 Panzer" kategoriju (bilo
      // koju varijantu naziva, npr. iz starijih spremljenih verzija) u "Real Colors",
      // spajajući stavke ako obje verzije postoje.
      if(saved.inventar){
        const oldRcKeys=Object.keys(saved.inventar).filter(k=>k!=="Real Colors"&&/1945\s*panzer/i.test(k));
        oldRcKeys.forEach(oldName=>{
          if(!saved.inventar["Real Colors"])saved.inventar["Real Colors"]={items:[]};
          const existingIds=new Set(saved.inventar["Real Colors"].items.map(i=>i.id));
          (saved.inventar[oldName].items||[]).forEach(it=>{if(!existingIds.has(it.id))saved.inventar["Real Colors"].items.push(it);});
          delete saved.inventar[oldName];
          if(saved.catOrder){
            const idx=saved.catOrder.indexOf(oldName);
            if(idx!==-1){
              if(!saved.catOrder.includes("Real Colors"))saved.catOrder[idx]="Real Colors";
              else saved.catOrder.splice(idx,1);
            }
          }
        });
      }
      // Migracija starih naziva kategorija (i uvezena JSON datoteka prolazi kroz istu funkciju)
      migrateLegacyCategories(saved);
      if(!saved._seedOff){   // nakon brisanja grupa korisnik ne želi da se kategorije iz datoteke vraćaju
        for(const cat of Object.keys(DD.inventar)){
          if(!saved.inventar[cat])saved.inventar[cat]=JSON.parse(JSON.stringify(DD.inventar[cat]));
        }
      }
      if(!saved.makete)saved.makete=[];
      if(!saved.zelje)saved.zelje=[];
      if(!saved.materijal)saved.materijal=[];
      if(!saved.resursi)saved.resursi=[];
      migrateNarudzbe(saved);
      migrateSubgroupOrder(saved);
      // Jednokratna migracija v44_1 (štiti se oznakom pa ne vraća ručno obrisano):
      // nove stavke u postojeće kategorije, ispravak Računa #2, novi Račun #10.
      if(!saved._mig441){
        saved._mig441=true;
        const newIds=["ak104","ak11336","ak11121","ak11115","ak11672","ak015","ak042","ak2073","ak8022","ak10026","ak10009","val73826"];
        for(const cat of Object.keys(DD.inventar)){
          const sc=saved.inventar[cat];if(!sc)continue;
          const have=new Set((sc.items||[]).map(i=>i.id));
          DD.inventar[cat].items.forEach(it=>{if(newIds.includes(it.id)&&!have.has(it.id))sc.items.push(JSON.parse(JSON.stringify(it)));});
        }
        // privremeni duplikat Gaahleri airbrusha (original već postoji)
        if(saved.inventar.Airbrush)saved.inventar.Airbrush.items=saved.inventar.Airbrush.items.filter(i=>i.id!=="gaa46807");
        // Račun #2 je sadržavao 7 stavki koje pripadaju Računu #3 (dvostruko brojanje vrijednosti)
        const dupRefs=["ak470","rcm018","m_1784822185201","p_1784821993867","p_1784821852803","ak078","ak017"];
        const r2=(saved.narudzbe||[]).find(o=>o.id==="ord_1786695660587_62lu8");
        if(r2&&r2.items.length>18)r2.items=r2.items.filter(i=>!dupRefs.includes(i.refId));
        // Račun za narudžbu 33907-293365 (80,24 €) koji je nedostajao
        const r10=DD.narudzbe.find(o=>o.id==="ord_inv293365");
        if(r10&&!(saved.narudzbe||[]).some(o=>o.id==="ord_inv293365")){
          const c=JSON.parse(JSON.stringify(r10));c.label="Račun #"+((saved.narudzbe||[]).length+1);
          saved.narudzbe.push(c);
        }
        // ako su makete u spremljenom stanju prazne, vrati ih iz datoteke
        if(!saved.makete.length&&DD.makete.length)saved.makete=JSON.parse(JSON.stringify(DD.makete));
      }
      if(!saved._mig442){
        saved._mig442=true;
        // želje AK042, AMIG2102, AK8022, AK104 kupljene su (račun 33907-293365) pa su već u inventaru
        const bought=["AK042","AMIG2102","AK8022","AK104"];
        saved.zelje=(saved.zelje||[]).filter(w=>!bought.includes(String(w.code||"").toUpperCase().replace(/[^A-Z0-9]/g,"")));
      }
      if(!saved._mig443){
        saved._mig443=true;
        // DESERT – QUICK GEN SET: upiši šifru AK17054 i uzorke boja (samo ako su prazni)
        const qp={"p_1786446749394":["AK17054","#b8641f"],"p_1786446801987":[null,"#a8774a"],"p_1786446866858":[null,"#d8b25a"]};
        const qg=saved.inventar["QUICK GEN"];
        if(qg)(qg.items||[]).forEach(it=>{
          const p=qp[it.id];if(!p)return;
          if(p[0]&&(!it.code||it.code==="–"||it.code==="-"))it.code=p[0];
          if(!it.swatches||!it.swatches.length)it.swatches=[p[1]];
        });
      }
      if(!saved._mig445){
        saved._mig445=true;
        // uzorci boja izvučeni iz AK kataloga (Quick Gen, bojice, RC flomasteri, AKAD) — popunjava samo prazno
        // i zamjenjuje samo moje ranije procjene; ručno upisane boje ostaju
        const fill={"AK17054":"#8f4d15","AK17059":"#926614","AK17063":"#7f6516","AK10009":"#c1a176","AK10011":"#a94a28","AK10012":"#963d28","AK10013":"#653229","AK10014":"#cf6428","AK10015":"#f15d2a","AK10016":"#b38e5e","AK10017":"#86572d","AK10018":"#4d5356","AK10019":"#38272d","AK10020":"#a43a42","AK10026":"#baafa4","RCM001":"#242524","RCM003":"#c73217","RCM004":"#ffce00","RCM007":"#45311e","RCM010":"#e0e0e0","RCM011":"#6e6e6d","RCM012":"#edc189","RCM013":"#362016","RCM014":"#eac790","RCM016":"#666c61","RCM019":"#7e3c37","RCM032":"#5d5c5c","RCM033":"#1e1e1c","RCM034":"#ffffff","AKAD017":"#52372c","AK11316":"#0d1414"},guess={"AK17054":["#b8641f"],"AK17059":["#a8774a"],"AK17063":["#d8b25a"],"AK10009":["#c9b57a"],"AK10026":["#8a8370"]};
        const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
        for(const cd of Object.values(saved.inventar))(cd.items||[]).forEach(it=>{
          if(it.isSetHeader)return;const k=nk(it.code);if(!fill[k])return;
          const cur=(it.swatches&&it.swatches.length)?it.swatches:(it.swatch?[it.swatch]:[]);
          if(!cur.length||(guess[k]&&guess[k].includes(cur[0])))it.swatches=[fill[k]];
        });
      }
      if(!saved._mig447){
        saved._mig447=true;
        // WWII preporuke (teksture i DAK boje) -> Želje; preskače ono što već postoji u željama ili inventaru
        const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
        const have=new Set((saved.zelje||[]).map(w=>nk(w.code)));
        Object.values(saved.inventar).forEach(cd=>(cd.items||[]).forEach(i=>have.add(nk(i.code))));
        const ids=new Set((saved.zelje||[]).map(w=>w.id));
        (DD.zelje||[]).forEach(w=>{
          if(String(w.id).startsWith("w_17874")&&!have.has(nk(w.code))&&!ids.has(w.id)){saved.zelje.push(JSON.parse(JSON.stringify(w)));have.add(nk(w.code));}
        });
      }
      if(!saved.catOrder)saved.catOrder=Object.keys(saved.inventar);
      if(!saved.catSort)saved.catSort={};
      saved.prirucnici=[];
      migrateStages446(saved);
      removeReceiptItems448(saved);
      removeReceiptMakete449(saved);
      archiveAll450(saved);
      deleteEmptyCategories451(saved);
      rebuildReceipts452(saved);addReceipt885211(saved);attachImages45(saved);groupPencilSets45(saved);recategorize45(saved);fillSets45(saved);fixReceiptDates45(saved);restoreAll45(saved);setImgs2_45(saved);dakNames45(saved);fix520_47(saved);items48(saved);dioToMakete48(saved);afvToMakete48(saved);audit49(saved);codes50(saved);wishCats55(saved);
      ensureCatOrder(saved);
      return saved;
    }
    for(const oldKey of OLD_KEYS){
      const old=AppStore.getItem(oldKey);
      if(!old)continue;
      const oldData=JSON.parse(old);
      const fresh=JSON.parse(JSON.stringify(DD));
      if(oldData.inventar){
        for(const cat of Object.keys(fresh.inventar)){
          const oldCat=oldData.inventar[cat];
          if(!oldCat)continue;
          for(const item of fresh.inventar[cat].items){
            const oldItem=oldCat.items?.find(i=>i.id===item.id)||oldCat.items?.find(i=>i.code===item.code);
            if(!oldItem)continue;
            item.status=oldItem.status||item.status;
            if(oldItem.imgs&&oldItem.imgs.length)item.imgs=oldItem.imgs;
            else if(oldItem.img)item.imgs=[{url:oldItem.img}];
            if(oldItem.note)item.note=oldItem.note;
            if(oldItem.tags)item.tags=oldItem.tags;
          }
        }
        for(const cat of Object.keys(oldData.inventar)){
          if(!fresh.inventar[cat])fresh.inventar[cat]=JSON.parse(JSON.stringify(oldData.inventar[cat]));
        }
      }
      if(oldData.zelje&&oldData.zelje.length)fresh.zelje=oldData.zelje;
      if(oldData.makete&&oldData.makete.length)fresh.makete=oldData.makete;
      fresh.catOrder=Object.keys(fresh.inventar);
      fresh.catSort={};
      fresh.prirucnici=[];
      fresh.materijal=[];
      fresh.resursi=[];
      fresh.narudzbe=[];
      fresh.activeNarudzbaId=null;
      markSeedMigrations(fresh);
      migrateStages446(fresh);
      removeReceiptItems448(fresh);
      removeReceiptMakete449(fresh);
      archiveAll450(fresh);
      deleteEmptyCategories451(fresh);
      rebuildReceipts452(fresh);addReceipt885211(fresh);attachImages45(fresh);groupPencilSets45(fresh);recategorize45(fresh);fillSets45(fresh);fixReceiptDates45(fresh);restoreAll45(fresh);setImgs2_45(fresh);dakNames45(fresh);fix520_47(fresh);items48(fresh);dioToMakete48(fresh);afvToMakete48(fresh);audit49(fresh);codes50(fresh);wishCats55(fresh);
      ensureCatOrder(fresh);
      try{AppStore.setItem(SK,JSON.stringify(fresh));}catch(e){}
      showToast("✓ Podaci migrirani iz starije verzije");
      return fresh;
    }
  }catch(e){console.warn("loadS:",e);}
  const fresh=JSON.parse(JSON.stringify(DD));
  fresh.prirucnici=fresh.prirucnici||[];
  fresh.materijal=fresh.materijal||[];
  fresh.resursi=fresh.resursi||[];
  fresh.narudzbe=fresh.narudzbe||[];
  fresh.activeNarudzbaId=fresh.activeNarudzbaId||null;
  fresh.catSort=fresh.catSort||{};
  markSeedMigrations(fresh);
  migrateStages446(fresh);
  removeReceiptItems448(fresh);
  removeReceiptMakete449(fresh);
  archiveAll450(fresh);
  deleteEmptyCategories451(fresh);
  rebuildReceipts452(fresh);addReceipt885211(fresh);attachImages45(fresh);groupPencilSets45(fresh);recategorize45(fresh);fillSets45(fresh);fixReceiptDates45(fresh);restoreAll45(fresh);setImgs2_45(fresh);dakNames45(fresh);fix520_47(fresh);items48(fresh);dioToMakete48(fresh);afvToMakete48(fresh);audit49(fresh);codes50(fresh);wishCats55(fresh);
  ensureCatOrder(fresh);
  return fresh;
}

// Migracija: ranija (probna) inačica je S.narudzbe držala kao ravni niz
// stavki (bez grupiranja u račune). Ako se prepozna taj oblik, sve stavke
// se spakiraju u jednu narudžbu da se stari podaci ne izgube.
function migrateNarudzbe(saved){
  if(!saved.narudzbe)saved.narudzbe=[];
  const looksFlat=saved.narudzbe.length>0&&!Array.isArray(saved.narudzbe[0].items);
  if(looksFlat){
    const oldItems=saved.narudzbe.map(o=>({id:o.id||("oi_"+Date.now()+"_"+Math.random().toString(36).slice(2,7)),source:o.source||"rucno",refId:o.refId||null,code:o.code||"–",name:o.name||"",cat:o.cat||"",qty:o.qty||1,price:o.price||""}));
    saved.narudzbe=[{id:"ord_"+Date.now(),label:"Račun (uvezeno)",date:Date.now(),paid:"",items:oldItems}];
  }
  if(saved.activeNarudzbaId===undefined||saved.activeNarudzbaId===null){
    saved.activeNarudzbaId=saved.narudzbe.length?saved.narudzbe[saved.narudzbe.length-1].id:null;
  }
}

// ── AUTOMATSKO GRUPIRANJE KOMPLETA (nositelj grupe + članovi) ────────
// Kad se spremi ZAGLAVLJE kompleta (nositelj grupe), automatski pronađi
// postojeće proizvode u inventaru čije se šifre spominju u opisu zaglavlja
// (jedan redak opisa = "ŠIFRA Naziv…") i pridruži ih istoj podgrupi — ovo
// pokriva slučaj kad su ti proizvodi bili u inventaru PRIJE nego što je
// zaglavlje formirano. Isto tako, kad se doda nov proizvod (kupnja iz
// želja ili ručni unos u Inventar), provjeri pripada li već postojećem
// kompletu i pridruži ga automatski. U oba slučaja se članovi kompleta
// (uključujući zaglavlje) i fizički preslože da budu jedni do drugih.
function parseSetMemberCodes(desc){
  if(!desc)return [];
  // Šifre proizvoda (npr. RCM033, AK4061, RC852...) - traži kombinaciju
  // slova+brojki BILO GDJE u tekstu opisa, ne samo na početku retka, jer
  // opis često miješa opisnu rečenicu i šifre unutar istog retka (npr.
  // "Komplet flomastera za kotače. RCM033 FLAT BLACK RCM001 RUBBER BLACK").
  const toks=desc.toUpperCase().match(/\b[A-ZŠĐČĆŽ]{1,5}\d{2,6}\b/g)||[];
  return [...new Set(toks)];
}
// Šifre koje zaglavlje spominje u opisu, a NE postoje ni na jednoj stavci u
// inventaru (obično znak tipfelera u šifri) - koristi se za upozorenje na
// kartici zaglavlja da korisnik odmah primijeti neuspjelo povezivanje.
function findUnmatchedSetCodes(headerItem){
  const codes=parseSetMemberCodes(headerItem.desc);
  if(!codes.length)return [];
  const ownCode=(headerItem.code||"").toUpperCase();
  const allCodes=new Set(Object.values(S.inventar).flatMap(cd=>cd.items).map(i=>(i.code||"").toUpperCase()));
  return codes.filter(c=>c!==ownCode&&!allCodes.has(c));
}
function isHeaderItem(it){return !!(it&&(it.isSetHeader||SET_HEADERS.has(it.code)));}
function effectiveSubgroupName(headerItem){
  return headerItem.subgroup||((headerItem.code&&headerItem.code!=="–"?headerItem.code+" – ":"")+headerItem.name);
}
// Stabilno premjesti sve članove iste podgrupe (uključujući zaglavlje) da
// budu jedni do drugih u nizu — zaglavlje ide prvo, ostatak zadržava
// izvorni međusobni redoslijed. Stavke bez podgrupe ostaju na svom mjestu.
function regroupByFirstOccurrence(items){
  const firstPos={};
  items.forEach((it,idx)=>{
    const key=it.subgroup||null;
    if(key&&!(key in firstPos))firstPos[key]=idx;
  });
  return items
    .map((it,idx)=>({it,idx,key:it.subgroup||null}))
    .sort((a,b)=>{
      const posA=a.key!==null?firstPos[a.key]:a.idx;
      const posB=b.key!==null?firstPos[b.key]:b.idx;
      if(posA!==posB)return posA-posB;
      const aHdr=isHeaderItem(a.it)?0:1,bHdr=isHeaderItem(b.it)?0:1;
      if(aHdr!==bHdr)return aHdr-bHdr;
      return a.idx-b.idx;
    })
    .map(x=>x.it);
}
function linkExistingMembersToHeader(headerItem){
  if(!headerItem.subgroup)headerItem.subgroup=effectiveSubgroupName(headerItem);
  const sg=headerItem.subgroup;
  const codes=parseSetMemberCodes(headerItem.desc);
  let n=0;
  if(codes.length){
    for(const it of Object.values(S.inventar).flatMap(cd=>cd.items)){
      if(it.id===headerItem.id)continue;
      if(codes.includes((it.code||"").toUpperCase())&&it.subgroup!==sg){
        it.subgroup=sg;n++;
      }
    }
  }
  for(const cat of Object.keys(S.inventar)){
    const items=S.inventar[cat].items;
    if(items.some(i=>i.subgroup===sg))S.inventar[cat].items=regroupByFirstOccurrence(items);
  }
  return n;
}
function linkItemToExistingHeaderIfMember(item,cat){
  if(isHeaderItem(item))return null;
  const code=(item.code||"").toUpperCase();
  if(!code||code==="–")return null;
  for(const hdr of Object.values(S.inventar).flatMap(cd=>cd.items)){
    if(!isHeaderItem(hdr)||hdr.id===item.id)continue;
    const codes=parseSetMemberCodes(hdr.desc);
    if(codes.includes(code)){
      const sg=effectiveSubgroupName(hdr);
      if(item.subgroup===sg)return null;
      item.subgroup=sg;
      if(cat&&S.inventar[cat])S.inventar[cat].items=regroupByFirstOccurrence(S.inventar[cat].items);
      return sg;
    }
  }
  return null;
}
// Migracija: popravi redoslijed za postojeće podatke kod kojih su zaglavlje
// i članovi kompleta već povezani (isti .subgroup) ali nisu jedni do drugih
// u nizu (npr. zaglavlje naknadno dodano na kraj popisa kategorije).
function migrateSubgroupOrder(saved){
  if(!saved||!saved.inventar)return;
  for(const cat of Object.keys(saved.inventar)){
    const cd=saved.inventar[cat];
    if(!cd||!Array.isArray(cd.items)||!cd.items.length)continue;
    if(cd.items.some(i=>i.subgroup))cd.items=regroupByFirstOccurrence(cd.items);
  }
}

let lastSaveOk=true;
let storageBlocked=false;
let hasUnexportedChanges=false;
function updateBackupBadge(){
  const btn=document.getElementById("backupBtn");
  if(btn)btn.classList.toggle("has-changes",hasUnexportedChanges);
}
function save(){
  hasUnexportedChanges=true;
  updateBackupBadge();
  try{
    AppStore.setItem(SK,JSON.stringify(S));
    lastSaveOk=true;storageBlocked=false;
    updateStorageWarningBanner();
    return true;
  }catch(e){
    lastSaveOk=false;
    if(e.name==="QuotaExceededError"){
      storageBlocked=false;
      showToast("⚠️ Memorija puna — ova promjena NIJE spremljena!");
    }else{
      // Preglednik u potpunosti blokira Storage API (npr. file:// otvoren
      // izravno dvoklikom u nekim preglednicima, ili privatni/inkognito način)
      storageBlocked=true;
      showToast("⚠️ Preglednik blokira spremanje na ovoj stranici — promjene ostaju samo dok je kartica otvorena!");
      console.warn("save:",e);
    }
    updateStorageWarningBanner();
    return false;
  }
}
function updateStorageWarningBanner(){
  let b=document.getElementById("storageWarningBanner");
  if(!b){
    b=document.createElement("div");
    b.id="storageWarningBanner";
    b.className="storage-warning-banner";
    document.body.insertBefore(b,document.body.firstChild);
  }
  b.innerHTML=storageBlocked
    ? `<span>⚠️ Ovaj preglednik blokira spremanje podataka na ovoj stranici (moguće zbog otvaranja datoteke izravno s diska ili privatnog/inkognito načina) — ništa se ne sprema, sve nestaje zatvaranjem kartice!</span><button onclick="exportData()">⬇ Backup odmah</button>`
    : `<span>⚠️ Memorija preglednika je puna — nove promjene se ne spremaju! Podaci trenutno postoje samo u ovoj kartici i nestat će zatvaranjem/osvježavanjem stranice.</span><button onclick="exportData()">⬇ Backup odmah</button>`;
  b.style.display=lastSaveOk?"none":"flex";
}
window.addEventListener("beforeunload",(e)=>{
  const hadUnexported=hasUnexportedChanges;
  save();
  // Preglednici ne dopuštaju automatsko/tiho preuzimanje datoteke niti
  // prilagođeni tekst dijaloga pri zatvaranju kartice (sigurnosno
  // ograničenje) — ono što MOŽEMO je zatražiti od preglednika da prikaže
  // svoj ugrađeni upit "sigurno napustiti stranicu?" kako bi korisnik imao
  // priliku ostati i ručno napraviti Backup prije zatvaranja.
  if(hadUnexported){
    e.preventDefault();
    e.returnValue="";
    return "";
  }
});

// ── SPREMANJE BACKUPA IZRAVNO U ODABRANU MAPU (File System Access API) ──
// Ako preglednik podržava (Chrome/Edge), nakon što korisnik JEDNOM odabere
// mapu (npr. Desktop/Makete), svaki idući "⬇ Backup" klik sprema JSON
// izravno u tu mapu, bez dijaloga za preuzimanje i bez ručnog premještanja.
// Handle mape se pamti u IndexedDB da preživi zatvaranje/ponovno otvaranje
// stranice. Ako preglednik ne podržava File System Access API (npr.
// Firefox/Safari) ili korisnik nikad nije odabrao mapu, koristi se stari
// način (obično preuzimanje datoteke u mapu Preuzimanja).
const FS_DB_NAME="makete_fs_handle_db",FS_STORE="handles",FS_KEY="backupDir";
function fsIdbOpen(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(FS_DB_NAME,1);
    req.onupgradeneeded=()=>{req.result.createObjectStore(FS_STORE);};
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
  });
}
async function fsIdbGet(key){
  try{
    const db=await fsIdbOpen();
    return await new Promise((resolve,reject)=>{
      const tx=db.transaction(FS_STORE,"readonly");
      const req=tx.objectStore(FS_STORE).get(key);
      req.onsuccess=()=>resolve(req.result||null);
      req.onerror=()=>reject(req.error);
    });
  }catch(e){return null;}
}
async function fsIdbSet(key,val){
  try{
    const db=await fsIdbOpen();
    await new Promise((resolve,reject)=>{
      const tx=db.transaction(FS_STORE,"readwrite");
      tx.objectStore(FS_STORE).put(val,key);
      tx.oncomplete=()=>resolve();
      tx.onerror=()=>reject(tx.error);
    });
  }catch(e){}
}
async function getBackupDirHandle(promptIfMissing){
  if(!("showDirectoryPicker" in window))return null;
  let handle=null;
  try{handle=await fsIdbGet(FS_KEY);}catch(e){}
  if(handle){
    try{
      const perm=await handle.queryPermission({mode:"readwrite"});
      if(perm==="granted")return handle;
      const req=await handle.requestPermission({mode:"readwrite"});
      if(req==="granted")return handle;
    }catch(e){/* mapa je možda obrisana/premještena - tražit ćemo novu ispod */}
  }
  if(!promptIfMissing)return null;
  try{
    const picked=await window.showDirectoryPicker({mode:"readwrite"});
    await fsIdbSet(FS_KEY,picked);
    return picked;
  }catch(e){return null; /* korisnik je odustao od dijaloga */}
}
function updateBackupFolderLabel(name){
  const btn=document.getElementById("backupBtn");
  if(btn)btn.title=name?`Backup se sprema izravno u mapu "${name}"`:"";
  const fb=document.getElementById("backupFolderBtn");
  if(fb)fb.textContent=name?`📁 ${name}`:"📁 Mapa";
}
async function chooseBackupFolder(){
  if(!("showDirectoryPicker" in window)){
    showToast("Ova opcija radi samo u Chrome/Edge pregledniku");
    return;
  }
  const handle=await getBackupDirHandle(true);
  if(handle){
    showToast(`✓ Mapa za backup postavljena: "${handle.name}"`);
    updateBackupFolderLabel(handle.name);
  }
}
(async function initBackupFolderLabel(){
  const handle=await getBackupDirHandle(false);
  if(handle)updateBackupFolderLabel(handle.name);
})();
async function exportData(){
  const json=JSON.stringify(S,null,2);
  const filename=(d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"))(new Date())+".json";
  const dirHandle=await getBackupDirHandle(false);
  if(dirHandle){
    try{
      const fileHandle=await dirHandle.getFileHandle(filename,{create:true});
      const writable=await fileHandle.createWritable();
      await writable.write(json);
      await writable.close();
      hasUnexportedChanges=false;
      updateBackupBadge();
      showToast(`✓ Backup spremljen u "${dirHandle.name}"`);
      return;
    }catch(e){console.warn("exportData: izravan zapis u mapu nije uspio, koristim preuzimanje:",e);}
  }
  const a=document.createElement("a");
  a.href="data:application/json,"+encodeURIComponent(json);
  a.download=filename;a.click();
  hasUnexportedChanges=false;
  updateBackupBadge();
  showToast("showDirectoryPicker" in window?"✓ Backup preuzet (klikni 📁 Mapa da postaviš stalnu mapu)":"✓ Backup preuzet");
}
function importData(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=async ev=>{
    let parsed;
    try{parsed=JSON.parse(ev.target.result);}
    catch(err){alert("Nevažeći JSON – datoteka se ne može pročitati.");e.target.value="";return;}
    // Provjera osnovne strukture prije prepisivanja postojećih podataka
    if(!parsed||typeof parsed!=="object"||typeof parsed.inventar!=="object"||!Array.isArray(parsed.zelje)||!Array.isArray(parsed.makete)){
      alert("Datoteka ne sadrži očekivanu strukturu (inventar/zelje/makete). Uvoz je prekinut, tvoji trenutni podaci nisu dirani.");
      e.target.value="";return;
    }
    const ok=await customConfirm("Uvoz će zamijeniti sve trenutne podatke u aplikaciji ovom datotekom. Ako želiš sačuvati trenutne podatke, prvo klikni Odustani pa napravi Backup. Nastaviti s uvozom?","Uvesti podatke?");
    if(!ok){e.target.value="";return;}
    S=parsed;
    ensureCatOrder(S);
    migrateStages446(S);   // stari JSON backup koristi staru numeraciju faza (1–11)
    // Korisnik je zatražio da se svi priručnici uklone — isprazni ih i pri uvozu.
    if(S.prirucnici&&S.prirucnici.length)S.prirucnici=[];
    if(!S.resursi)S.resursi=[];
    if(!S.materijal)S.materijal=[];
    migrateNarudzbe(S);
    migrateSubgroupOrder(S);
    if(!S.catOrder)S.catOrder=Object.keys(S.inventar);
    migrateLegacyCategories(S);
    // v45: i uvezeni backup (npr. iz v44) prolazi kroz v45 dopune (račun #11, slike, kompleti, rubrike)
    addReceipt885211(S);attachImages45(S);groupPencilSets45(S);recategorize45(S);fillSets45(S);fixReceiptDates45(S);restoreAll45(S);setImgs2_45(S);dakNames45(S);fix520_47(S);items48(S);dioToMakete48(S);afvToMakete48(S);audit49(S);codes50(S);wishCats55(S);ensureCatOrder(S);
    // Migracija: preimenuj staru "Real Colors – 1945 Panzer" kategoriju (bilo
    // koju varijantu naziva) u "Real Colors", spajajući stavke ako obje postoje.
    if(S.inventar){
      const oldRcKeys=Object.keys(S.inventar).filter(k=>k!=="Real Colors"&&/1945\s*panzer/i.test(k));
      oldRcKeys.forEach(oldName=>{
        if(!S.inventar["Real Colors"])S.inventar["Real Colors"]={items:[]};
        const existingIds=new Set(S.inventar["Real Colors"].items.map(i=>i.id));
        (S.inventar[oldName].items||[]).forEach(it=>{if(!existingIds.has(it.id))S.inventar["Real Colors"].items.push(it);});
        delete S.inventar[oldName];
        const idx=S.catOrder.indexOf(oldName);
        if(idx!==-1){
          if(!S.catOrder.includes("Real Colors"))S.catOrder[idx]="Real Colors";
          else S.catOrder.splice(idx,1);
        }
      });
    }
    save();render();showToast("✓ Podaci uvezeni");
    e.target.value="";
  };
  r.readAsText(f);
}

// ── CSV UVOZ ───────────────────────────────────────────────────
// Očekivani stupci (prvi red = zaglavlje, redoslijed nije bitan):
// kategorija,mfr,code,name,desc,note,price,status,tags
// tags su odvojeni znakom ';'. Nedostajući stupci su dozvoljeni osim "name".
function parseCsvLine(line){
  const out=[];let cur="",inQ=false;
  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(inQ){
      if(c==='"'){ if(line[i+1]==='"'){cur+='"';i++;} else inQ=false; }
      else cur+=c;
    }else{
      if(c==='"')inQ=true;
      else if(c===","){out.push(cur);cur="";}
      else cur+=c;
    }
  }
  out.push(cur);
  return out.map(s=>s.trim());
}
function importCsv(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=ev=>{
    try{
      const lines=ev.target.result.split(/\r?\n/).filter(l=>l.trim().length);
      if(lines.length<2){alert("CSV datoteka nema podataka.");e.target.value="";return;}
      const header=parseCsvLine(lines[0]).map(h=>h.toLowerCase());
      const col=name=>header.indexOf(name);
      const iCat=col("kategorija"),iMfr=col("mfr"),iCode=col("code"),iName=col("name"),
            iDesc=col("desc"),iNote=col("note"),iPrice=col("price"),iStatus=col("status"),iTags=col("tags"),iPdf=col("pdf");
      if(iName<0){alert('CSV mora imati stupac "name".');e.target.value="";return;}
      let added=0,skipped=0;
      lines.slice(1).forEach(line=>{
        if(!line.trim())return;
        const cells=parseCsvLine(line);
        const name=(cells[iName]||"").trim();
        if(!name){skipped++;return;}
        const cat=(iCat>=0&&cells[iCat]?.trim())||"Uvezeno iz CSV-a";
        if(!S.inventar[cat])S.inventar[cat]={items:[]};
        if(!S.catOrder)S.catOrder=Object.keys(S.inventar);
        if(!S.catOrder.includes(cat))S.catOrder.push(cat);
        const status=(iStatus>=0&&cells[iStatus]?.trim().toLowerCase()==="imam")?"imam":
                     (iStatus>=0&&cells[iStatus]?.trim().toLowerCase()==="nemam")?"nemam":"nemam";
        const tags=iTags>=0&&cells[iTags]?cells[iTags].split(";").map(t=>t.trim()).filter(Boolean):[];
        S.inventar[cat].items.push({
          id:"csv_"+Date.now()+"_"+Math.random().toString(36).slice(2,7),
          mfr:(iMfr>=0&&cells[iMfr]?.trim())||"Ostalo",
          code:(iCode>=0&&cells[iCode]?.trim().toUpperCase())||"–",
          name,
          desc:(iDesc>=0&&cells[iDesc]?.trim())||"",
          note:(iNote>=0&&cells[iNote]?.trim())||"",
          price:(iPrice>=0&&cells[iPrice]?.trim())||"",
          pdfUrl:(iPdf>=0&&cells[iPdf]?.trim())||"",
          imgs:[],status,tags,swatch:null,subgroup:null,createdAt:Date.now()
        });
        added++;
      });
      save();render();
      showToast(`✓ Uvezeno ${added} proizvoda${skipped?`, preskočeno ${skipped} (bez naziva)`:""}`);
    }catch(err){alert("Greška pri čitanju CSV datoteke: "+err.message);}
    e.target.value="";
  };
  r.readAsText(f);
}

// ── ISPIS LISTE ZA KUPOVINU ────────────────────────────────────
function printShoppingList(){
  const cats=orderedCats();
  let rows="";
  let total=0;
  cats.forEach(cat=>{
    const items=(S.inventar[cat]?.items||[]).filter(i=>i.status==="nemam");
    if(!items.length)return;
    rows+=`<h3>${esc(cat)}</h3><ul>`;
    items.forEach(i=>{
      total++;
      rows+=`<li><b>${esc(i.code)}</b> — ${esc(i.name)}${i.mfr&&i.mfr!=="AK Interactive"?` <i>(${esc(i.mfr)})</i>`:""}${i.note?` <span class="note">// ${esc(i.note)}</span>`:""}</li>`;
    });
    rows+="</ul>";
  });
  if(!total){showToast("Nema stavki koje nedostaju — sve je u posjedu! 🎉");return;}
  const win=window.open("","_blank");
  if(!win){alert("Preglednik je blokirao otvaranje novog prozora za ispis. Dozvoli pop-up prozore za ovu stranicu.");return;}
  win.document.write(`<!DOCTYPE html><html lang="hr"><head><meta charset="UTF-8"><title>Lista za kupovinu – Makete &amp; Alati</title>
  <style>
    body{font-family:Arial,sans-serif;color:#111;padding:2rem;max-width:700px;margin:0 auto}
    h1{font-size:20px;border-bottom:2px solid #111;padding-bottom:.5rem}
    h3{font-size:13px;text-transform:uppercase;letter-spacing:.05em;margin-top:1.5rem;margin-bottom:.3rem;color:#444}
    ul{margin:0;padding-left:1.2rem}
    li{font-size:13px;line-height:1.6}
    .note{color:#777;font-style:italic}
    .meta{color:#777;font-size:11px;margin-bottom:1rem}
    @media print{body{padding:0}}

/* ============ DESKTOP OPTIMIZACIJA (1920×1200 i slični veliki monitori) ============ */
@media (min-width:1024px){
  body{font-size:14px}
  .main{max-width:1500px;padding:1.5rem 2.25rem 6rem}
  .nav{padding:0 2rem}
  .nav-search{width:260px}
  .modal{width:600px}
  .modal[style*="max-width:380px"]{width:380px}
  .ekv-table{font-size:13px}
  .ekv-table.wrap-table th:nth-child(3),.ekv-table.wrap-table td:nth-child(3){min-width:340px}
  .ekv-table.wrap-table th:nth-child(4),.ekv-table.wrap-table td:nth-child(4){min-width:220px}
  .ekv-table.wrap-table th:nth-child(5),.ekv-table.wrap-table td:nth-child(5){min-width:260px}
  .stats-bar{padding:.75rem 2.25rem}
  .tag-bar{padding:.625rem 2.25rem}
  .upute-toc{gap:8px}
  .ekv-subtab{font-size:13px;padding:7px 16px}
}
@media (min-width:1600px){
  .main{max-width:1700px}
}
@media (min-width:1024px) and (max-width:1279px){
  .main{max-width:1140px}
}
/* Stranice s puno tablica (Usporedba boja, Redoslijed izrade, Upute za korištenje)
   iskorištavaju znatno više raspoložive širine ekrana, da tekst ne treba
   vodoravno skrolati da bi se pročitao. */
@media (min-width:1024px){
  #page-ekvivalencije .main,
  #page-redoslijed .main,
  #page-upute .main{
    max-width:min(1900px,97vw);
  }
}

  </style></head><body>
  <h1>Lista za kupovinu</h1>
  <div class="meta">Generirano ${new Date().toLocaleDateString("hr-HR")} · ${total} stavki nedostaje</div>
  ${rows}
  </body></html>`);
  win.document.close();
  win.focus();
  setTimeout(()=>win.print(),300);
}

// ── HELPERS ────────────────────────────────────────────────────
function esc(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("show"),2800);}
let _toastUndoFn=null;
function showToastAction(msg,undoLabel,undoFn){
  const t=document.getElementById("toast");
  _toastUndoFn=undoFn;
  t.innerHTML=`${esc(msg)}<button class="toast-undo" onclick="_toastUndoFn&&_toastUndoFn();_toastUndoFn=null;document.getElementById('toast').classList.remove('show')">${esc(undoLabel)}</button>`;
  t.classList.add("show");clearTimeout(t._t);
  t._t=setTimeout(()=>{t.classList.remove("show");_toastUndoFn=null;},5000);
}
function getImgs(item){if(item.imgs&&item.imgs.length)return item.imgs;if(item.img)return [{url:item.img}];return [];}
// Ako stavka nema vlastiti uzorak boje, uzima se uzorak iz kataloga u rubrici "Usporedba boja"
// (AK 3G, Real Colors, Quick Gen, RC flomasteri, Gouache, Playmarkers, Alclad) po šifri.
// Vlastiti uzorak stavke uvijek ima prednost; setovi (zaglavlja) se ne boje.
let _catSwatchIdx=null;
const _swNk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
function catalogSwatchIndex(){
  if(_catSwatchIdx)return _catSwatchIdx;
  const idx={};
  const add=(code,sw)=>{const k=_swNk(code);if(k&&sw&&typeof sw==="string"&&!idx[k])idx[k]=sw;};
  [typeof QUICKGEN_DATA!=="undefined"?QUICKGEN_DATA:null,typeof RCM_DATA!=="undefined"?RCM_DATA:null,
   typeof GOUACHE_DATA!=="undefined"?GOUACHE_DATA:null,typeof PLAYMARKERS_DATA!=="undefined"?PLAYMARKERS_DATA:null,
   typeof ALCLAD_DATA!=="undefined"?ALCLAD_DATA:null,typeof EQUIV_DATA!=="undefined"?EQUIV_DATA:null
  ].forEach(arr=>(arr||[]).forEach(r=>add(r.code,r.swatch)));
  if(typeof AK_SWATCH_MAP!=="undefined")Object.entries(AK_SWATCH_MAP).forEach(([c,s])=>add(c,s));
  if(typeof RC_SWATCH_MAP!=="undefined")Object.entries(RC_SWATCH_MAP).forEach(([c,s])=>add(c,s));
  return _catSwatchIdx=idx;
}
function getSwatches(item){
  if(item.swatches&&item.swatches.length)return item.swatches;
  if(item.swatch)return [item.swatch];
  if(CODE_SWATCHES[item.code])return [CODE_SWATCHES[item.code]];
  if(!item.isSetHeader){const s=catalogSwatchIndex()[_swNk(item.code)];if(s)return [s];}
  return [];
}
function orderedCats(){return(S.catOrder||Object.keys(S.inventar)).filter(c=>S.inventar[c]);}
function getAllTags(){const t=new Set();Object.values(S.inventar).forEach(cd=>cd.items.forEach(i=>(i.tags||[]).forEach(tg=>t.add(tg))));return [...t].sort();}
function getAllMfrs(){const m=new Set();Object.values(S.inventar).forEach(cd=>cd.items.forEach(i=>{if(i.mfr)m.add(i.mfr);}));return [...m].sort();}

// ── IMAGE RESOLVE ──────────────────────────────────────────────
// Napomena: automatsko pogađanje/dohvaćanje slika proizvoda s vanjske
// AK Interactive stranice je isključeno na zahtjev korisnika — prikazuju
// se isključivo slike koje su stvarno učitane (s računala/HD-a).
function resolveImg(code,item,imgEl,phEl){
  const imgs=getImgs(item);
  if(imgs.length){imgEl.src=imgs[0].url;imgEl.style.display="block";phEl.style.display="none";return;}
  imgEl.style.display="none";phEl.style.display="flex";phEl.textContent=code||"–";
}

// Ranija funkcija za pogađanje URL-a slike na AK Interactive CDN-u je uklonjena
// (na zahtjev korisnika) — vraća uvijek null kako pozivatelji ne bi pokušavali
// dohvatiti slike putem vanjskih linkova.
function probeAkImageUrl(code){
  return Promise.resolve(null);
}

// ── SKUPNA ZAMJENA UČITANIH (BASE64) SLIKA SLUŽBENIM URL-OVIMA ──
// Radi samo za AK Interactive proizvode (jedini brand za koji aplikacija
// zna obrazac URL-a slike). Za ostale brendove (Tamiya, Miniart…) ne
// postoji pouzdan način da se sam pogodi/pronađe URL slike proizvoda,
// Napomena: funkcija za skupnu zamjenu učitanih (HD) slika vanjskim
// URL-ovima je uklonjena na zahtjev korisnika — aplikacija više ne
// zamjenjuje učitane slike linkovima ni na koji način.

// ── SAŽIMANJE VEĆ UČITANIH SLIKA (pouzdano, radi bez interneta) ─
// Za razliku od "Optimiziraj slike" (koja ovisi o vanjskoj stranici i
// može promašiti), ova funkcija samo ponovno komprimira slike koje već
// postoje u aplikaciji na manju veličinu — radi 100% lokalno, garantirano
// smanjuje potrošnju memorije preglednika.
function recompressDataUrl(dataUrl,maxDim=700,quality=0.6){
  return new Promise(resolve=>{
    const img=new Image();
    img.onload=()=>{
      let w=img.width,h=img.height;
      if(w>maxDim||h>maxDim){
        if(w>h){h=Math.round(h*(maxDim/w));w=maxDim;}
        else{w=Math.round(w*(maxDim/h));h=maxDim;}
      }
      const canvas=document.createElement("canvas");
      canvas.width=w;canvas.height=h;
      canvas.getContext("2d").drawImage(img,0,0,w,h);
      try{resolve(canvas.toDataURL("image/jpeg",quality));}
      catch(e){resolve(dataUrl);}
    };
    img.onerror=()=>resolve(dataUrl);
    img.src=dataUrl;
  });
}
async function recompressAllUploadedImages(){
  const candidates=[];
  Object.values(S.inventar).forEach(cd=>{
    cd.items.forEach(item=>{
      const first=getImgs(item)[0];
      if(first&&first.url&&first.url.startsWith("data:"))candidates.push(item);
    });
  });
  if(!candidates.length){showToast("Nema učitanih slika za sažimanje — sve su već ili URL ili nema slika.");return;}
  const beforeKB=getStorageUsageKB();
  const ok=await customConfirm(`Sažet ću ${candidates.length} učitanih slika na manju veličinu/kvalitetu radi uštede memorije preglednika. Ovo je nepovratno (slike će biti nešto manje kvalitete, ali i dalje jasno vidljive). Nastaviti?`,"Sažeti slike?");
  if(!ok)return;
  showToast(`⏳ Sažimam ${candidates.length} slika…`);
  for(const item of candidates){
    const first=getImgs(item)[0];
    item.imgs=[{url:await recompressDataUrl(first.url)}];
  }
  const saved=save();render();
  const afterKB=getStorageUsageKB();
  showToast(`✓ Sažeto ${candidates.length} slika. Memorija: ${(beforeKB/1024).toFixed(1)}MB → ${(afterKB/1024).toFixed(1)}MB${!saved?" — ⚠️ i dalje se ne sprema, ponovi ili ukloni neke slike ručno":""}`);
}

// ── VIEW MODE ──────────────────────────────────────────────────
function setView(mode){
  viewMode=mode;
  document.body.classList.toggle("compact",mode==="compact");
  document.getElementById("vbtnCard").classList.toggle("active",mode==="card");
  document.getElementById("vbtnCompact").classList.toggle("active",mode==="compact");
}

// ── RENDER ─────────────────────────────────────────────────────
function render(){
  renderStats();
  if(page==="inventar")renderInv();
  else if(page==="zelje")renderZelje();
  else if(page==="makete")renderMakete();
  else if(page==="narudzba")renderNarudzba();
  else if(page==="izvori")renderIzvori();
  else if(page==="oznake")renderOznake();
  updateBulkBar();
}

function parsePrice(str){
  if(!str)return 0;
  let s=String(str).trim().replace(/[^\d,.\-]/g,"");
  if(!s)return 0;
  const hasComma=s.includes(","),hasDot=s.includes(".");
  if(hasComma&&hasDot){
    // Zadnji od (','/'.') je decimalni separator, drugi je tisućica — npr. "1.234,56" ili "1,234.56"
    if(s.lastIndexOf(",")>s.lastIndexOf(".")) s=s.replace(/\./g,"").replace(",",".");
    else s=s.replace(/,/g,"");
  }else if(hasComma){
    s=s.replace(",",".");
  }
  // Samo točka ("9.49") ostaje kakva jest — to je već ispravan decimalni zapis
  const v=parseFloat(s);
  return isNaN(v)?0:v;
}
function getStorageUsageKB(){
  try{
    // Mjerimo trenutne podatke u memoriji (S/IC), ne ono što je zapravo
    // upisano u localStorage — ako je save() propao zbog pune memorije,
    // localStorage bi mogao sadržavati zastarjele (manje) podatke, što bi
    // prikazalo lažno nisku vrijednost baš u trenutku kad je problem najveći.
    const raw=JSON.stringify(S);
    const icRaw=JSON.stringify(IC);
    return Math.round((raw.length+icRaw.length)/1024);
  }catch(e){return 0;}
}
function renderStats(){
  const rb=document.getElementById("restoreRemovedBtn");
  if(rb){const n=(S.uklonjeno||[]).length;rb.style.display=n?"":"none";rb.textContent="↩ Vrati uklonjene ("+n+")";}
  const pb=document.getElementById("purgeRemovedBtn");if(pb)pb.style.display=(S.uklonjeno||[]).length?"":"none";
  const all=Object.values(S.inventar).flatMap(c=>c.items);
  const imam=all.filter(i=>i.status==="imam").length,nemam=all.filter(i=>i.status==="nemam").length,tot=imam+nemam;
  const pct=tot>0?Math.round(imam/tot*100):0;
  // Vrijednost se povlači iz Računa (stvarno plaćena cijena za tu stavku),
  // ne iz ručno upisane cijene na kartici proizvoda/makete — vidi
  // getReceiptPriceFor() uz NARUDŽBA funkcije.
  const invValue=all.filter(i=>i.status==="imam").reduce((sum,i)=>sum+getReceiptPriceFor("inventar",i.id),0);
  const modelValue=S.makete.reduce((sum,m)=>sum+getReceiptPriceFor("makete",m.id),0);
  const combinedValue=invValue+modelValue;
  const fmt=v=>v.toLocaleString("hr-HR",{minimumFractionDigits:2,maximumFractionDigits:2})+" €";
  const valueStr=combinedValue>0?fmt(combinedValue):"–";
  const valueTitle=`Boje: ${fmt(invValue)} + Makete: ${fmt(modelValue)} = ${fmt(combinedValue)} (iz Računa)`;
  const storageKB=getStorageUsageKB();
  const storageMB=(storageKB/1024).toFixed(1);
  // Tipični limit je ~5 MB po stranici — upozori prije nego što se stvarno napuni
  const storageColor=storageKB>4200?"var(--nemam-txt)":(storageKB>2500?"var(--gold)":"var(--muted)");
  // Ako je trenutno zauzeće ispod sigurne granice, smatramo problem riješenim
  // i sami gasimo banner — ne čekamo da se to potvrdi tek pri sljedećem save().
  // Ne vrijedi ako je uzrok potpuno blokiran Storage API (storageBlocked) —
  // tu veličina podataka nije uzrok pa se sama ne može "popraviti".
  if(storageKB<4200&&!lastSaveOk&&!storageBlocked){lastSaveOk=true;}
  updateStorageWarningBanner();
  document.getElementById("statsBar").innerHTML=`
   <div class="stat"><span class="stat-val">${tot}</span><span class="stat-lbl">Ukupno</span></div>
   <div class="stat-sep"></div>
   <div class="stat"><span class="stat-val imam">${imam}</span><span class="stat-lbl">Imam</span></div>
   <div class="stat-sep"></div>
   <div class="stat"><span class="stat-val nemam">${nemam}</span><span class="stat-lbl">Nemam</span></div>
   <div class="stat-sep"></div>
   <div class="stat"><span class="stat-val wish">${S.zelje.length}</span><span class="stat-lbl">Želje</span></div>
   <div class="stat-sep"></div>
   <div class="stat"><span class="stat-val model">${S.makete.length}</span><span class="stat-lbl">Makete</span></div>
   ${combinedValue>0?`<div class="stat-sep"></div><div class="stat" title="${esc(valueTitle)}"><span class="stat-val" style="color:var(--gold)">${valueStr}</span><span class="stat-lbl">Vrijednost (boje+makete)</span></div>`:""}
   <div class="stat-sep"></div>
   <div class="stat" title="U izradi / planirano"><span class="stat-val model">${S.makete.filter(m=>m.status==="wip").length}</span><span class="stat-lbl">U izradi</span></div>
   <div class="stat-sep"></div>
   <div class="stat" title="Ukupno plaćeno po računima u ${new Date().getFullYear()}."><span class="stat-val" style="color:var(--narudzba)">${fmt((S.narudzbe||[]).filter(o=>new Date(o.date||0).getFullYear()===new Date().getFullYear()).reduce((a,o)=>a+orderPaidOrSum(o),0))}</span><span class="stat-lbl">Potrošeno ${new Date().getFullYear()}.</span></div>
   <div class="stat-sep"></div>
   <div class="progress-wrap"><div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
   <div class="progress-lbl">${pct}% kompletno</div></div>`;
  renderTagBar();
}

function renderTagBar(){
  const tags=getAllTags();
  const bar=document.getElementById("tagBar");
  const chips=document.getElementById("tagChips");
  if(!tags.length){bar.style.display="none";}
  else{
    bar.style.display="flex";
    chips.innerHTML=tags.map(t=>`<button class="tag-chip${activeTag===t?' active':''}" onclick="setTag('${esc(t)}')">${esc(t)}</button>`).join("");
  }
  const mfrs=getAllMfrs();
  const mbar=document.getElementById("mfrBar");
  const mchips=document.getElementById("mfrChips");
  if(mfrs.length<2){mbar.style.display="none";}
  else{
    mbar.style.display="flex";
    mchips.innerHTML=mfrs.map(m=>`<button class="tag-chip${activeMfr===m?' active':''}" onclick="setMfr('${esc(m)}')">${esc(m)}</button>`).join("");
  }
  const emptyEl=document.getElementById("filterPanelEmpty");
  if(emptyEl)emptyEl.style.display=(bar.style.display==="none"&&mbar.style.display==="none")?"block":"none";
  updateFilterDot();
}

function setTag(tag){
  activeTag=activeTag===tag?null:tag;
  render();
}
function setMfr(mfr){
  activeMfr=activeMfr===mfr?null:mfr;
  render();
}

// ── FILTER PANEL (dropdown, drži proizvođača i tag odvojeno od vrha stranice) ──
function updateFilterDot(){
  const dot=document.getElementById("filterActiveDot");
  if(dot)dot.style.display=(activeTag||activeMfr)?"inline-block":"none";
}
function toggleFilterPanel(ev){
  if(ev)ev.stopPropagation();
  const p=document.getElementById("filterPanel");
  const isOpen=p.style.display==="block";
  p.style.display=isOpen?"none":"block";
  document.getElementById("filterPanelBtn").classList.toggle("active",!isOpen);
}
function closeFilterPanel(){
  const p=document.getElementById("filterPanel");
  if(p)p.style.display="none";
  const btn=document.getElementById("filterPanelBtn");
  if(btn)btn.classList.remove("active");
}
document.addEventListener("click",e=>{
  const panel=document.getElementById("filterPanel");
  const btn=document.getElementById("filterPanelBtn");
  if(!panel||panel.style.display!=="block")return;
  if(panel.contains(e.target)||(btn&&btn.contains(e.target)))return;
  closeFilterPanel();
});

function getCatSort(cat){return (S.catSort&&S.catSort[cat])||"manual";}
function setCatSort(cat,mode){
  if(!S.catSort)S.catSort={};
  S.catSort[cat]=mode;save();renderInv();
}
function sortItems(items,mode){
  if(mode==="manual")return items;
  const arr=[...items];
  if(mode==="name")arr.sort((a,b)=>a.name.localeCompare(b.name,"hr"));
  else if(mode==="code")arr.sort((a,b)=>a.code.localeCompare(b.code,"hr"));
  else if(mode==="date")arr.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
  return arr;
}
function renderInv(){
  const q=search.toLowerCase(),con=document.getElementById("mainContent");
  con.innerHTML="";
  for(const cat of orderedCats()){
    const cd=S.inventar[cat];if(!cd)continue;
    let fil=cd.items.filter(i=>{
      const mQ=!q||i.name.toLowerCase().includes(q)||i.code.toLowerCase().includes(q)||(i.mfr||"").toLowerCase().includes(q)||(i.note||"").toLowerCase().includes(q)||(i.tags||[]).some(t=>t.toLowerCase().includes(q));
      const mF=filter==="all"||i.status===filter;
      const mT=!activeTag||(i.tags||[]).includes(activeTag);
      const mM=!activeMfr||i.mfr===activeMfr;
      return mQ&&mF&&mT&&mM;
    });
    if(fil.length===0&&(filter!=="all"||q||activeTag||activeMfr))continue;
    const sortMode=getCatSort(cat);
    fil=sortItems(fil,sortMode);
    const imam=cd.items.filter(i=>i.status==="imam").length,nemam=cd.items.filter(i=>i.status==="nemam").length;
    const catPct=(imam+nemam)>0?Math.round(imam/(imam+nemam)*100):0;
    const isOpen=safeSessionGet("o_"+cat)!=="0";
    const el=document.createElement("div");el.className="category";el.dataset.cat=cat;
    el.innerHTML=`
     <div class="cat-header" onclick="toggleCat('${esc(cat)}')"
       draggable="true"
       ondragstart="catDragStart(event,'${esc(cat)}')"
       ondragover="catDragOver(event)"
       ondragleave="catDragLeave(event)"
       ondrop="catDrop(event,'${esc(cat)}')"
       ondragend="catDragEnd(event)">
      <span class="drag-handle" onclick="event.stopPropagation()" aria-label="Povuci za promjenu redoslijeda" role="button">⠿</span>
      <span class="cat-arrow ${isOpen?"open":""}" aria-hidden="true">▶</span>
      <span class="cat-name">${esc(cat)}</span>
      <span class="cat-badge count">${imam+nemam}</span>
      ${nemam>0?`<span class="cat-badge nemam">${nemam} ✗</span>`:""}
      <span class="cat-mini-progress" title="${catPct}% u posjedu"><span class="cat-mini-progress-fill" style="width:${catPct}%"></span></span>
      <select class="cat-sort-sel" title="Sortiraj kategoriju" onclick="event.stopPropagation()" onchange="setCatSort('${esc(cat)}',this.value)">
        <option value="manual"${sortMode==="manual"?" selected":""}>⠿ Ručno</option>
        <option value="name"${sortMode==="name"?" selected":""}>A–Z Naziv</option>
        <option value="code"${sortMode==="code"?" selected":""}>Šifra</option>
        <option value="date"${sortMode==="date"?" selected":""}>Najnovije</option>
      </select>
      <button class="btn-sm" onclick="event.stopPropagation();openProdModal('${esc(cat)}')">+ Dodaj</button>
      ${CAT_TO_UPUTE[cat]?`<button class="btn-sm" onclick="event.stopPropagation();goToUpute('${esc(cat)}')" title="Upute za korištenje" aria-label="Upute za korištenje">📋 Upute</button>`:""}
     </div>
     <div class="cat-items" id="ci_${esc(cat)}" style="display:${isOpen?"flex":"none"}"></div>`;
    con.appendChild(el);
    if(isOpen){
      const ci=el.querySelector(".cat-items");
      if(fil.length===0)ci.innerHTML='<div class="no-results">Nema rezultata.</div>';
      else renderItemsIntoContainer(ci,cat,fil,sortMode==="manual");
    }
  }
}

function getSubgroupOpen(cat,subgroup){return safeSessionGet("sg_"+cat+"::"+subgroup)!=="0";}
function toggleSubgroup(cat,subgroup,ev){
  if(ev)ev.stopPropagation();
  const isOpen=getSubgroupOpen(cat,subgroup);
  safeSessionSet("sg_"+cat+"::"+subgroup,isOpen?"0":"1");
  renderInv();
}
// v45.6: svaki komplet dobiva svoju boju (isti komplet uvijek istu), da se kompleti razlikuju
function setColor45(name){
  const P=["#d4af37","#4fb3a9","#9b8cf2","#e08a3c","#5fa8e8","#d96fa8","#9cc95a","#e46b5f"];
  let h=0;for(const ch of String(name||""))h=(h*31+ch.charCodeAt(0))>>>0;
  return P[h%P.length];
}
function setHeaderName45(sg){
  for(const cd of Object.values(S.inventar))for(const i of cd.items||[])if(i.subgroup===sg&&(i.isSetHeader||SET_HEADERS.has(i.code)))return (i.code&&i.code!=="–"?i.code+" ":"")+i.name;
  return sg;
}
function renderItemsIntoContainer(container,cat,items,allowDragReorder=true){
  let lastSg=null,sgOpen=true;
  items.forEach((item,idx)=>{
    if(allowDragReorder&&item.subgroup&&item.subgroup!==lastSg){
      lastSg=item.subgroup;
      const currentSg=lastSg; // zaseban snapshot po podgrupi - sprječava closure bug (svi bi inače dijelili istu 'lastSg')
      sgOpen=getSubgroupOpen(cat,lastSg);
      const count=items.filter(i=>i.subgroup===currentSg).length;
      const sg=document.createElement("div");
      const isSet45=Object.values(S.inventar).some(cd=>(cd.items||[]).some(i=>i.subgroup===currentSg&&(i.isSetHeader||SET_HEADERS.has(i.code))));
      sg.className="subgroup-hdr"+(isSet45?" is-set":"")+(sgOpen?"":" closed");
      if(isSet45)sg.style.setProperty("--set-c",setColor45(currentSg));
      sg.innerHTML=`<span class="sg-arrow">${sgOpen?"▾":"▸"}</span> ${isSet45?'<span class="sg-set-tag">📦 Komplet</span>':""} ${esc(currentSg)} <span class="sg-count">(${count})</span>`;
      sg.onclick=(ev)=>toggleSubgroup(cat,currentSg,ev);
      container.appendChild(sg);
    }
    // Kad je podgrupa zatvorena, prikaži samo "zaglavlje" seta (ako postoji) - ostatak preskoči
    if(item.subgroup&&item.subgroup===lastSg&&!sgOpen){
      const isHdr=SET_HEADERS.has(item.code)||!!item.isSetHeader;
      if(!isHdr)return;
    }
    container.appendChild(buildCard(cat,item,idx,allowDragReorder));
  });
}

function openedBadge(item){
  if(!item.opened)return "";
  const opened=new Date(item.opened);
  if(isNaN(opened))return "";
  const months=(Date.now()-opened.getTime())/(1000*60*60*24*30.44);
  const dstr=opened.toLocaleDateString("hr-HR");
  const old=months>18;
  return ` · <span class="opened-badge${old?" opened-old":""}" title="${old?"Otvoreno prije "+Math.round(months)+" mj. — provjeri konzistenciju/miris prije upotrebe":"Otvoreno "+dstr}">${old?"⚠️":"🗓️"} ${dstr}</span>`;
}
function buildCard(cat,item,idx,allowDragReorder=true){
  const imgs=getImgs(item);
  const isSetHdr=SET_HEADERS.has(item.code)||!!item.isSetHeader;
  const isSetMember=!isSetHdr&&!!item.subgroup;
  let swatches=getSwatches(item);
  let memberCount=0;
  if(item.subgroup){
    const siblings=(S.inventar[cat]?.items||[]).filter(i=>i.subgroup===item.subgroup&&i.id!==item.id);
    memberCount=siblings.length;
    if(isSetHdr){
      const siblingSwatches=siblings.flatMap(i=>getSwatches(i));
      if(siblingSwatches.length)swatches=[...new Set([...swatches,...siblingSwatches])];
    }
  }
  // Crveni obrub: stavka je "imam" ali nema upisanu cijenu ni na kartici
  // ni na nekom Računu - njena vrijednost se trenutno ne broji nigdje.
  const missingPrice=!isSetMember&&!item.noPrice&&item.status==="imam"&&getReceiptPriceFor("inventar",item.id)===0&&!parsePrice(item.price);
  const unmatchedSetCodes=isSetHdr?findUnmatchedSetCodes(item):[];
  const d=document.createElement("div");
  d.className=`product ${item.status}${isSetHdr?" set-header":""}${isSetMember?" set-member":""}${missingPrice?" no-price-flag":""}`;
  if(missingPrice)d.title="⚠ Nema upisanu cijenu ni na kartici ni na Računu";
  if(isSetHdr||isSetMember){
    d.style.setProperty("--set-c",setColor45(item.subgroup||item.name));
    if(isSetMember){
      const sib=(S.inventar[cat]?.items||[]).filter(i=>i.subgroup===item.subgroup&&!(SET_HEADERS.has(i.code)||i.isSetHeader));
      if(sib.length&&sib[sib.length-1].id===item.id)d.classList.add("set-member-last");
    }
  }
  d.draggable=allowDragReorder;
  d.dataset.id=item.id;
  if(allowDragReorder){
    d.addEventListener("dragstart",e=>itemDragStart(e,cat,item.id));
    d.addEventListener("dragover",e=>itemDragOver(e));
    d.addEventListener("dragleave",e=>d.classList.remove("drag-over-item"));
    d.addEventListener("drop",e=>itemDrop(e,cat,item.id));
    d.addEventListener("dragend",()=>{d.classList.remove("dragging");d.classList.remove("drag-over-item");});
  }

  const tagsHtml=(item.tags||[]).map(t=>`<span class="ptag" onclick="event.stopPropagation();setTag('${esc(t)}')">${esc(t)}</span>`).join("")+
    `<span class="ptag-add" onclick="event.stopPropagation();quickAddTag('${esc(cat)}','${item.id}')">+</span>`;

  const bulkKeyStr=bulkKey(cat,item.id);
  if(bulkMode&&bulkSelected.has(bulkKeyStr))d.classList.add("bulk-selected");

  d.innerHTML=`
   ${bulkMode?`<input type="checkbox" class="bulk-check" ${bulkSelected.has(bulkKeyStr)?"checked":""} onclick="event.stopPropagation();toggleBulkItem('${esc(cat)}','${item.id}')">`:""}
   <div class="product-img-wrap" onclick="openLightboxForItem('${esc(cat)}','${item.id}',0)"
     oncontextmenu="event.preventDefault();openImgMgr('${esc(cat)}','${item.id}')"
     title="Klik = uvećaj | Desni klik = upravljanje slikama">
    <img class="product-img" style="display:none" alt="${esc(item.code)}">
    <div class="product-img-ph">${esc(item.code)}</div>
    <div class="img-overlay">🔍${imgs.length>1?` (${imgs.length})`:""}</div>
    ${imgs.length>1?`<div class="img-dots">${imgs.map((_,i)=>`<span class="img-dot${i===0?" active":""}" onclick="event.stopPropagation();showCardImg(this,'${esc(cat)}','${item.id}',${i})"></span>`).join("")}</div>`:""}
   </div>
   <div class="product-info">
    <div class="product-name-row">
      ${isSetMember?`<span class="set-member-connector" title="Član kompleta \"${esc(item.subgroup)}\"">●</span>`:""}
      ${swatches.length?swatches.map(sw=>`<span class="color-swatch" style="background:${sw}" title="${sw}"></span>`).join(""):""}
      <span class="product-name">${esc(item.name)}</span>
      ${isSetHdr?`<span class="set-header-badge" title="Nositelj kompleta \"${esc(item.subgroup||item.name)}\"">📦 Komplet${memberCount?` · ${memberCount} ${memberCount===1?"dio":"dijelova"}`:""}</span>`:""}${isSetMember?`<span class="set-member-of" title="Dio kompleta">📦 iz kompleta: ${esc(setHeaderName45(item.subgroup))}</span>`:""}
      ${unmatchedSetCodes.length?`<span class="set-header-warn" title="Šifre iz opisa koje NISU pronađene ni na jednoj stavci u inventaru (provjeri tipfeler): ${esc(unmatchedSetCodes.join(", "))}">⚠ ${unmatchedSetCodes.length} nije pronađeno</span>`:""}
      ${CAT_TO_UPUTE[cat]?`<span class="upute-inline-link" onclick="event.stopPropagation();goToUpute('${esc(uputeCatFor(cat,item))}')" title="Upute za korištenje">📋 Upute</span>`:""}
    </div>
    <div class="product-code">${esc(item.code)}${item.mfr&&item.mfr!=="AK Interactive"?` · <span class="product-mfr">${esc(item.mfr)}</span>`:""}${openedBadge(item)}${item.pdfUrl?` · <a href="${esc(item.pdfUrl)}" target="_blank" rel="noopener" class="pdf-link" onclick="event.stopPropagation()" title="Otvori upute">📄 Upute</a>`:""}</div>
    <span class="badge-s ${item.status}">${item.status==="imam"?"✓ imam":"✗ nemam"}</span>
    ${item.desc?`<div class="product-desc">${esc(item.desc)}</div>`:""}
    ${item.note?`<div class="product-note-box"><div class="product-note-lbl">Bilješka</div><div class="product-note-txt">${esc(item.note)}</div></div>`:""}
    <div class="product-tags">${tagsHtml}</div>
   </div>
   <div class="product-actions">
    <button class="btn-icon pa-more-btn" onclick="event.stopPropagation();const p=this.closest('.product');document.querySelectorAll('.product.pa-open').forEach(x=>{if(x!==p)x.classList.remove('pa-open')});p.classList.toggle('pa-open')" title="Radnje">⋯</button>
    <div class="pa-more">
    <button class="btn-toggle ${item.status}" onclick="toggleS('${esc(cat)}','${item.id}')" title="${item.status==="imam"?"Označi: nemam":"Označi: imam"}">${item.status==="imam"?"✗":"✓"}</button>
    <button class="btn-move" onclick="openMoveToWish('${esc(cat)}','${item.id}')" title="→ Želje">→</button>
    <button class="btn-icon btn-account" onclick="quickAddInvToOrder('${esc(cat)}','${item.id}')" title="Dodaj u račun">🧾</button>
    ${item.code?`<button class="btn-icon" onclick="event.stopPropagation();findPaintEquivalents('${esc(item.code)}')" title="Traži zamjenu ove boje kod drugih proizvođača">🎨</button>`:""}
    <button class="btn-icon" onclick="openEditProd('${esc(cat)}','${item.id}')" title="Uredi">✎</button>
    <button class="btn-icon del" onclick="delItem('${esc(cat)}','${item.id}')" title="Ukloni">✕</button>
    </div>
   </div>`;
  const imgWrap=d.querySelector(".product-img-wrap");
  const imgElToResolve=d.querySelector(".product-img"),phElToResolve=d.querySelector(".product-img-ph");
  if(_imgObserver){
    imgWrap._resolveImg=()=>resolveImg(item.code,item,imgElToResolve,phElToResolve);
    _imgObserver.observe(imgWrap);
  }else{
    resolveImg(item.code,item,imgElToResolve,phElToResolve);
  }
  return d;
}

function showCardImg(dotEl,cat,id,idx){
  const item=S.inventar[cat]?.items.find(i=>i.id===id);if(!item)return;
  const imgs=getImgs(item);if(!imgs[idx])return;
  const wrap=dotEl.closest(".product-img-wrap"),imgEl=wrap.querySelector(".product-img");
  imgEl.src=imgs[idx].url;imgEl.style.display="block";
  wrap.querySelectorAll(".img-dot").forEach((d,i)=>d.classList.toggle("active",i===idx));
}

// ── DRAG & DROP CATEGORIES ─────────────────────────────────────
let dragCatSrc=null;
function catDragStart(e,cat){dragCatSrc=cat;e.dataTransfer.effectAllowed="move";}
function catDragOver(e){e.preventDefault();e.currentTarget.classList.add("drag-over");e.dataTransfer.dropEffect="move";}
function catDragLeave(e){e.currentTarget.classList.remove("drag-over");}
function catDragEnd(e){e.currentTarget.classList.remove("drag-over");}
function catDrop(e,targetCat){
  e.preventDefault();e.currentTarget.classList.remove("drag-over");
  if(dragCatSrc===targetCat)return;
  const order=orderedCats();
  const si=order.indexOf(dragCatSrc),ti=order.indexOf(targetCat);
  if(si<0||ti<0)return;
  order.splice(si,1);order.splice(ti,0,dragCatSrc);
  S.catOrder=order;save();renderInv();
}

// ── DRAG & DROP ITEMS ──────────────────────────────────────────
let dragItemCat=null,dragItemId=null;
function itemDragStart(e,cat,id){
  dragItemCat=cat;dragItemId=id;
  e.target.classList.add("dragging");
  e.dataTransfer.effectAllowed="move";e.stopPropagation();
}
function itemDragOver(e){e.preventDefault();e.stopPropagation();e.currentTarget.classList.add("drag-over-item");}
function itemDrop(e,cat,targetId){
  e.preventDefault();e.stopPropagation();
  e.currentTarget.classList.remove("drag-over-item");
  if(dragItemCat!==cat||dragItemId===targetId)return;
  const items=S.inventar[cat].items;
  const si=items.findIndex(i=>i.id===dragItemId),ti=items.findIndex(i=>i.id===targetId);
  if(si<0||ti<0)return;
  const [moved]=items.splice(si,1);
  items.splice(ti,0,moved);
  save();renderInv();
}

// ── TOGGLE CAT ─────────────────────────────────────────────────
function toggleCat(cat){
  const el=document.getElementById("ci_"+cat);if(!el)return;
  const open=el.style.display!=="none";
  el.style.display=open?"none":"flex";
  safeSessionSet("o_"+cat,open?"0":"1");
  const arr=el.previousElementSibling?.querySelector(".cat-arrow");
  if(arr)arr.classList.toggle("open",!open);
  if(!open&&el.children.length===0){
    const q=search.toLowerCase();
    const fil=S.inventar[cat].items.filter(i=>{
      const mQ=!q||i.name.toLowerCase().includes(q)||i.code.toLowerCase().includes(q)||(i.mfr||"").toLowerCase().includes(q)||(i.note||"").toLowerCase().includes(q)||(i.tags||[]).some(t=>t.toLowerCase().includes(q));
      const mF=filter==="all"||i.status===filter;
      const mT=!activeTag||(i.tags||[]).includes(activeTag);
      const mM=!activeMfr||i.mfr===activeMfr;
      return mQ&&mF&&mT&&mM;
    });
    const sortMode=getCatSort(cat);
    renderItemsIntoContainer(el,cat,sortItems(fil,sortMode),sortMode==="manual");
  }
}

// ── STATUS TOGGLE ──────────────────────────────────────────────
function toggleS(cat,id){
  const item=S.inventar[cat]?.items.find(x=>x.id===id);if(!item)return;
  item.status=item.status==="imam"?"nemam":"imam";
  save();render();showToast(`${item.status==="imam"?"✓":"✗"} ${item.name}`);
}
// ── BULK SELECT ──────────────────────────────────────────────
function bulkKey(cat,id){return cat+"::"+id;}
function toggleBulkMode(){
  bulkMode=!bulkMode;
  if(!bulkMode)bulkSelected.clear();
  document.getElementById("bulkToggleBtn").classList.toggle("active",bulkMode);
  updateBulkBar();render();
}
function toggleBulkItem(cat,id){
  const k=bulkKey(cat,id);
  if(bulkSelected.has(k))bulkSelected.delete(k);else bulkSelected.add(k);
  updateBulkBar();
  const el=document.querySelector(`.product[data-id="${CSS.escape(id)}"]`);
  if(el)el.classList.toggle("bulk-selected",bulkSelected.has(k));
}
function updateBulkBar(){
  const bar=document.getElementById("bulkBar");if(!bar)return;
  const cnt=bulkSelected.size;
  const lbl=document.getElementById("bulkCount");if(lbl)lbl.textContent=cnt+" odabrano";
  bar.style.display=(bulkMode&&cnt>0&&page==="inventar")?"flex":"none";
}
function bulkClearSelection(){bulkSelected.clear();updateBulkBar();renderInv();}
function bulkItems(){
  const out=[];
  bulkSelected.forEach(k=>{
    const idx=k.indexOf("::");
    const cat=k.slice(0,idx),id=k.slice(idx+2);
    const item=S.inventar[cat]?.items.find(i=>i.id===id);
    if(item)out.push({cat,id,item});
  });
  return out;
}
function bulkSetStatus(status){
  const items=bulkItems();if(!items.length)return;
  items.forEach(({item})=>{item.status=status;});
  save();
  showToast(`${status==="imam"?"✓":"✗"} Ažurirano ${items.length} stavki`);
  bulkSelected.clear();updateBulkBar();render();
}
function bulkMoveToWish(){
  const items=bulkItems();if(!items.length)return;
  items.forEach(({cat,id,item})=>{
    S.zelje.push({id:"w_"+Date.now()+"_"+Math.random().toString(36).slice(2,7),cat,code:item.code,name:item.name,desc:item.desc||"",price:item.price||"–",prio:3,note:item.note||""});
    S.inventar[cat].items=S.inventar[cat].items.filter(i=>i.id!==id);
  });
  save();
  showToast(`→ ${items.length} stavki premješteno u Želje`);
  bulkSelected.clear();updateBulkBar();render();
}
async function bulkDelete(){
  const items=bulkItems();if(!items.length)return;
  const ok=await customConfirm(`Ukloniti ${items.length} odabranih stavki?`,"Ukloniti odabrano?");
  if(!ok)return;
  const removedWithMeta=items.map(({cat,id})=>{
    const arr=S.inventar[cat].items;
    const idx=arr.findIndex(i=>i.id===id);
    const [removed]=arr.splice(idx,1);
    return {cat,idx,removed};
  });
  save();
  bulkSelected.clear();updateBulkBar();render();
  showToastAction(`Uklonjeno ${removedWithMeta.length} stavki`,"Poništi",()=>{
    removedWithMeta.forEach(({cat,idx,removed})=>{
      if(!S.inventar[cat])return;
      S.inventar[cat].items.splice(Math.min(idx,S.inventar[cat].items.length),0,removed);
    });
    save();render();
  });
}

async function delItem(cat,id){
  const ok=await customConfirm("Ukloniti ovaj proizvod iz inventara?","Ukloniti?");
  if(!ok)return;
  const items=S.inventar[cat].items;
  const idx=items.findIndex(i=>i.id===id);if(idx<0)return;
  const [removed]=items.splice(idx,1);
  save();render();
  showToastAction(`Uklonjeno: ${removed.name}`,"Poništi",()=>{
    if(!S.inventar[cat])return;
    S.inventar[cat].items.splice(Math.min(idx,S.inventar[cat].items.length),0,removed);
    save();render();
  });
}

// ── TAGS ───────────────────────────────────────────────────────
async function quickAddTag(cat,id){
  const tag=await customPrompt("Novi tag","Naziv taga:");if(!tag?.trim())return;
  const item=S.inventar[cat]?.items.find(i=>i.id===id);if(!item)return;
  if(!item.tags)item.tags=[];
  if(!item.tags.includes(tag.trim()))item.tags.push(tag.trim());
  save();render();
}

// ── PRODUCT MODAL ──────────────────────────────────────────────
function openProdModal(cat){
  pmCat=cat;pmEditId=null;pmStatus="imam";pmTags=[];pmSwatches=[];pmImgData=null;
  document.getElementById("prodModalTitle").textContent=`Dodaj u "${cat}"`;
  ["pmCode","pmName","pmDesc","pmNote","pmImg","pmPrice","pmOpened","pmSubgroup","pmPdf"].forEach(i=>document.getElementById(i).value="");
  document.getElementById("pmIsSetHeader").checked=false;
  document.getElementById("pmMfr").value="AK Interactive";
  document.getElementById("pmPreview").style.display="none";
  document.getElementById("pmFileIn").value="";
  document.getElementById("pmSwatchPicker").value="#888888";
  document.getElementById("pmColorSearch").value="";onColorSearchInput();
  document.getElementById("pmR").value="";document.getElementById("pmG").value="";document.getElementById("pmB").value="";
  setSwatchInputMode("wheel",document.querySelector("#pmSwatchTabsWrap .img-tab"));
  populateCatSelect(cat);
  renderTagEditor([]);renderSwatchEditor([]);setProdStatus("imam");
  setProdImgTab("url",document.getElementById("pmImgTabUrl"));
  document.getElementById("prodModal").style.display="flex";
  setTimeout(()=>document.getElementById("pmName").focus(),60);
}
function openEditProd(cat,id){
  const item=S.inventar[cat]?.items.find(i=>i.id===id);if(!item)return;
  pmCat=cat;pmEditId=id;pmStatus=item.status;pmTags=[...(item.tags||[])];pmSwatches=[...getSwatches(item)];pmImgData=null;
  document.getElementById("prodModalTitle").textContent=`Uredi: ${item.name}`;
  populateCatSelect(cat);
  document.getElementById("pmMfr").value=item.mfr||"AK Interactive";
  document.getElementById("pmCode").value=item.code||"";
  document.getElementById("pmName").value=item.name||"";
  document.getElementById("pmDesc").value=item.desc||"";
  document.getElementById("pmNote").value=item.note||"";
  document.getElementById("pmPrice").value=item.price||"";
  document.getElementById("pmOpened").value=item.opened||"";
  document.getElementById("pmPdf").value=item.pdfUrl||"";
  document.getElementById("pmSubgroup").value=item.subgroup||"";
  document.getElementById("pmIsSetHeader").checked=!!(item.isSetHeader||SET_HEADERS.has(item.code));
  document.getElementById("pmFileIn").value="";
  document.getElementById("pmColorSearch").value="";onColorSearchInput();
  document.getElementById("pmR").value="";document.getElementById("pmG").value="";document.getElementById("pmB").value="";
  setSwatchInputMode("wheel",document.querySelector("#pmSwatchTabsWrap .img-tab"));
  setProdStatus(item.status);
  renderTagEditor(pmTags);
  renderSwatchEditor(pmSwatches);
  const firstImg=getImgs(item)[0]?.url||"";
  const pv=document.getElementById("pmPreview"),pvEl=document.getElementById("pmPreviewEl");
  if(firstImg&&firstImg.startsWith("data:")){
    // Postojeća slika je učitana s računala (base64) — otvori tab "Učitaj"
    pmImgData=firstImg;
    document.getElementById("pmImg").value="";
    setProdImgTab("upload",document.getElementById("pmImgTabUp"));
    pv.style.display="block";pvEl.src=firstImg;
  }else{
    document.getElementById("pmImg").value=firstImg;
    setProdImgTab("url",document.getElementById("pmImgTabUrl"));
    if(firstImg){pv.style.display="block";pvEl.src=firstImg;}else pv.style.display="none";
  }
  document.getElementById("prodModal").style.display="flex";
}

// ── KATEGORIJA U MODALU PROIZVODA (uklj. "+ Nova kategorija") ──
function populateCatSelect(selectedCat){
  const sel=document.getElementById("pmCatSelect");
  sel.innerHTML="";
  orderedCats().forEach(c=>{
    const o=document.createElement("option");o.value=c;o.textContent=c;sel.appendChild(o);
  });
  const newOpt=document.createElement("option");newOpt.value="__new_category__";newOpt.textContent="+ Nova kategorija…";sel.appendChild(newOpt);
  sel.value=(selectedCat&&S.inventar[selectedCat])?selectedCat:(orderedCats()[0]||"__new_category__");
  document.getElementById("pmNewCatInput").value="";
  onPmCatSelectChange();
}
function onPmCatSelectChange(){
  const val=document.getElementById("pmCatSelect").value;
  const inp=document.getElementById("pmNewCatInput");
  inp.style.display=val==="__new_category__"?"block":"none";
  if(val==="__new_category__")setTimeout(()=>inp.focus(),50);
}
function setProdStatus(s){pmStatus=s;document.getElementById("pmBtnImam").classList.toggle("active",s==="imam");document.getElementById("pmBtnNemam").classList.toggle("active",s==="nemam");}
function previewProdImg(){
  const code=document.getElementById("pmCode").value.trim().toUpperCase(),mfr=document.getElementById("pmMfr").value;
  if(!code||mfr!=="AK Interactive"||pmImgTab!=="url")return;
  const pv=document.getElementById("pmPreview"),pvEl=document.getElementById("pmPreviewEl");
  pvEl.src=`${AK_BASE}/${YEARS[0]}/${code}.jpg`;
  pvEl.onload=()=>pv.style.display="block";pvEl.onerror=()=>pv.style.display="none";
}
function previewProdImgUrl(){
  const url=document.getElementById("pmImg").value.trim(),pv=document.getElementById("pmPreview"),pvEl=document.getElementById("pmPreviewEl");
  pmImgData=null;
  if(!url){pv.style.display="none";return;}pvEl.src=url;pvEl.onload=()=>pv.style.display="block";pvEl.onerror=()=>pv.style.display="none";
}
function removeProdImg(){
  pmImgData=null;
  document.getElementById("pmImg").value="";
  document.getElementById("pmFileIn").value="";
  document.getElementById("pmPreview").style.display="none";
  document.getElementById("pmPreviewEl").src="";
  setProdImgTab("url",document.getElementById("pmImgTabUrl"));
  document.getElementById("pmImg").focus();
}

// ── SLIKA PROIZVODA: URL / UČITAJ S RAČUNALA ───────────────────
function setProdImgTab(tab,btn){
  pmImgTab=tab;
  document.querySelectorAll("#pmImgTabsWrap .img-tab").forEach(t=>t.classList.remove("active"));
  if(btn)btn.classList.add("active");
  document.getElementById("pmImgUrlDiv").style.display=tab==="url"?"block":"none";
  document.getElementById("pmImgUploadDiv").style.display=tab==="upload"?"block":"none";
}
// ── KOMPRESIJA SLIKA PRIJE SPREMANJA (štedi memoriju preglednika) ─
// Fotografije s telefona/računala znaju biti 3-10 MB; localStorage ima
// tipično svega ~5-10 MB ukupno po web stranici. Zato svaku učitanu sliku
// smanjimo na razumnu širinu i komprimiramo u JPEG prije spremanja.
function compressImage(file,maxDim=1100,quality=0.78){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=ev=>{
      const img=new Image();
      img.onload=()=>{
        let w=img.width,h=img.height;
        if(w>maxDim||h>maxDim){
          if(w>h){h=Math.round(h*(maxDim/w));w=maxDim;}
          else{w=Math.round(w*(maxDim/h));h=maxDim;}
        }
        const canvas=document.createElement("canvas");
        canvas.width=w;canvas.height=h;
        const ctx=canvas.getContext("2d");
        ctx.drawImage(img,0,0,w,h);
        try{resolve(canvas.toDataURL("image/jpeg",quality));}
        catch(err){resolve(ev.target.result);} // fallback: original ako komprimiranje ne uspije
      };
      img.onerror=()=>resolve(ev.target.result); // fallback za nepodržane formate
      img.src=ev.target.result;
    };
    reader.onerror=reject;
    reader.readAsDataURL(file);
  });
}

async function handleProdDrop(e){
  e.preventDefault();document.getElementById("pmDropZone").classList.remove("over");
  const f=e.dataTransfer.files[0];if(!f||!f.type.startsWith("image/"))return;
  pmImgData=await compressImage(f);
  document.getElementById("pmPreviewEl").src=pmImgData;
  document.getElementById("pmPreview").style.display="block";
}
async function handleProdFile(e){
  const f=e.target.files[0];if(!f)return;
  pmImgData=await compressImage(f);
  document.getElementById("pmPreviewEl").src=pmImgData;
  document.getElementById("pmPreview").style.display="block";
}

// ── BOJE PROIZVODA (VIŠE NJIH ZA SETOVE) ───────────────────────
function renderSwatchEditor(swatches){
  const ed=document.getElementById("pmSwatchEditor");
  if(!swatches.length){
    ed.innerHTML='<span style="font-size:11px;color:var(--muted);font-style:italic">Nema dodanih boja — ostavi prazno ako proizvod nije boja.</span>';
    return;
  }
  ed.innerHTML=swatches.map((hex,i)=>`<span class="tag-edit-chip"><span class="color-swatch" style="background:${hex}"></span>${esc(hex)}<button onclick="removeSwatch(${i})">×</button></span>`).join("");
}
function removeSwatch(i){pmSwatches.splice(i,1);renderSwatchEditor(pmSwatches);}
function addSwatchFromPicker(){
  const hex=document.getElementById("pmSwatchPicker").value;
  if(!pmSwatches.includes(hex))pmSwatches.push(hex);
  renderSwatchEditor(pmSwatches);
}
function clearSwatches(){pmSwatches=[];renderSwatchEditor(pmSwatches);}

// ── ODABIR BOJE: KOTAČIĆ / RAL-NAZIV / RGB ──────────────────────
function setSwatchInputMode(mode,btn){
  document.querySelectorAll("#pmSwatchTabsWrap .img-tab").forEach(t=>t.classList.remove("active"));
  if(btn)btn.classList.add("active");
  document.getElementById("swatchModeWheel").style.display=mode==="wheel"?"block":"none";
  document.getElementById("swatchModeRal").style.display=mode==="ral"?"block":"none";
  document.getElementById("swatchModeRgb").style.display=mode==="rgb"?"block":"none";
}
function onColorSearchInput(){
  const val=document.getElementById("pmColorSearch").value;
  const hex=COLOR_SEARCH_MAP[val];
  const prev=document.getElementById("colorSearchPreview"),lbl=document.getElementById("colorSearchHexLbl");
  if(hex){prev.style.background=hex;prev.dataset.hex=hex;lbl.textContent=hex;}
  else{prev.style.background="#888";delete prev.dataset.hex;lbl.textContent="—";}
}
function addSwatchFromSearch(){
  const hex=document.getElementById("colorSearchPreview").dataset.hex;
  if(!hex){showToast("Prvo odaberi boju s popisa (upiši RAL broj ili naziv i klikni ponuđenu stavku).");return;}
  if(!pmSwatches.includes(hex))pmSwatches.push(hex);
  renderSwatchEditor(pmSwatches);
  document.getElementById("pmColorSearch").value="";
  onColorSearchInput();
}
function clampByte(v){v=parseInt(v,10);if(isNaN(v))v=0;return Math.max(0,Math.min(255,v));}
function updateRgbPreview(){
  const r=clampByte(document.getElementById("pmR").value),g=clampByte(document.getElementById("pmG").value),b=clampByte(document.getElementById("pmB").value);
  document.getElementById("rgbPreview").style.background=`rgb(${r},${g},${b})`;
}
function addSwatchFromRgb(){
  const r=clampByte(document.getElementById("pmR").value),g=clampByte(document.getElementById("pmG").value),b=clampByte(document.getElementById("pmB").value);
  const hex="#"+[r,g,b].map(v=>v.toString(16).padStart(2,"0")).join("");
  if(!pmSwatches.includes(hex))pmSwatches.push(hex);
  renderSwatchEditor(pmSwatches);
}

function renderTagEditor(tags){
  const ed=document.getElementById("pmTagEditor");
  ed.innerHTML=tags.map((t,i)=>`<span class="tag-edit-chip">${esc(t)}<button onclick="removeTag(${i})">×</button></span>`).join("");
}
function removeTag(i){pmTags.splice(i,1);renderTagEditor(pmTags);}
function addTagFromInput(){
  const inp=document.getElementById("pmTagInput"),val=inp.value.trim();
  if(!val)return;
  if(!pmTags.includes(val))pmTags.push(val);
  inp.value="";renderTagEditor(pmTags);
}
async function submitProd(){
  const name=document.getElementById("pmName").value.trim();if(!name){document.getElementById("pmName").focus();return;}
  const code=document.getElementById("pmCode").value.trim().toUpperCase()||"–";
  const mfr=document.getElementById("pmMfr").value;
  const desc=document.getElementById("pmDesc").value.trim();
  const note=document.getElementById("pmNote").value.trim();
  const price=document.getElementById("pmPrice").value.trim();
  const opened=document.getElementById("pmOpened").value||"";
  const pdfUrl=document.getElementById("pmPdf").value.trim();
  const subgroup=document.getElementById("pmSubgroup").value.trim()||null;
  const isSetHeader=document.getElementById("pmIsSetHeader").checked;
  const imgUrl=document.getElementById("pmImg").value.trim();
  const imgs=pmImgData?[{url:pmImgData}]:(imgUrl?[{url:imgUrl}]:[]);
  const tags=[...pmTags];
  const swatches=[...pmSwatches];

  // Kategorija: postojeća ili novokreirana iz "+ Nova kategorija"
  let targetCat=document.getElementById("pmCatSelect").value;
  if(targetCat==="__new_category__"){
    const newCatName=document.getElementById("pmNewCatInput").value.trim();
    if(!newCatName){document.getElementById("pmNewCatInput").focus();return;}
    if(S.inventar[newCatName]){
      targetCat=newCatName; // kategorija u međuvremenu već postoji, samo je koristimo
    }else{
      S.inventar[newCatName]={items:[]};
      if(!S.catOrder)S.catOrder=Object.keys(S.inventar);
      S.catOrder.push(newCatName);
      targetCat=newCatName;
    }
  }

  let savedItem=null;
  if(pmEditId){
    const item=S.inventar[pmCat]?.items.find(i=>i.id===pmEditId);
    if(item){
      Object.assign(item,{mfr,code,name,desc,note,price,opened,pdfUrl,imgs,status:pmStatus,tags,swatches,subgroup,isSetHeader});
      delete item.swatch; // stari format zamijenjen nizom swatches
      delete IC[item.code];saveIC();
      if(targetCat!==pmCat){
        // Premještanje proizvoda u drugu kategoriju
        S.inventar[pmCat].items=S.inventar[pmCat].items.filter(i=>i.id!==pmEditId);
        if(!S.inventar[targetCat])S.inventar[targetCat]={items:[]};
        S.inventar[targetCat].items.push(item);
      }
      savedItem=item;
    }
  }else{
    if(!S.inventar[targetCat])S.inventar[targetCat]={items:[]};
    if(!S.catOrder)S.catOrder=Object.keys(S.inventar);
    if(!S.catOrder.includes(targetCat))S.catOrder.push(targetCat);
    savedItem={id:"p_"+Date.now(),mfr,code,name,desc,note,price,opened,pdfUrl,imgs,status:pmStatus,tags,swatches,subgroup,isSetHeader,createdAt:Date.now()};
    S.inventar[targetCat].items.push(savedItem);
  }
  // Automatsko grupiranje kompleta - vidi linkExistingMembersToHeader/
  // linkItemToExistingHeaderIfMember (definirano uz migrateNarudzbe).
  let groupMsg=null;
  if(savedItem){
    if(isHeaderItem(savedItem)){
      const n=linkExistingMembersToHeader(savedItem);
      if(n)groupMsg=`🧩 Povezano ${n} ${n===1?"proizvod":"proizvoda"} u komplet "${savedItem.subgroup}"`;
      const unmatched=findUnmatchedSetCodes(savedItem);
      if(unmatched.length){
        const warn=`⚠ Šifre iz opisa nisu pronađene u inventaru (provjeri tipfeler): ${unmatched.join(", ")}`;
        groupMsg=groupMsg?groupMsg+" · "+warn:warn;
      }
    }else if(savedItem.subgroup){
      // Korisnik je ručno upisao naziv podgrupe koji možda već postoji - svejedno
      // ih posloži jedne do drugih.
      if(S.inventar[targetCat])S.inventar[targetCat].items=regroupByFirstOccurrence(S.inventar[targetCat].items);
    }else{
      const sg=linkItemToExistingHeaderIfMember(savedItem,targetCat);
      if(sg)groupMsg=`🧩 Pridruženo kompletu "${sg}"`;
    }
  }
  save();closeProdModal();render();
  if(groupMsg)showToast(groupMsg);
}
function closeProdModal(){document.getElementById("prodModal").style.display="none";}

// ── IMG MANAGER ────────────────────────────────────────────────
function openImgMgr(cat,id){
  imgEditCat=cat;imgEditId=id;imgData=null;
  setImgTab("url",document.querySelector("#imgModal .img-tab"));
  renderImgMgr();document.getElementById("imgModal").style.display="flex";
}
function renderImgMgr(){
  const item=S.inventar[imgEditCat]?.items.find(i=>i.id===imgEditId);if(!item)return;
  const imgs=getImgs(item),list=document.getElementById("imgMgrList");
  list.innerHTML="";
  imgs.forEach((img,idx)=>{
    const row=document.createElement("div");
    row.style.cssText="display:flex;align-items:center;gap:8px;margin-bottom:6px;padding:6px 8px;background:var(--surface3);border-radius:7px";
    row.innerHTML=`<img src="${esc(img.url)}" style="width:40px;height:40px;object-fit:contain;border-radius:5px;background:#080a10;border:1px solid var(--border2);cursor:pointer" onclick="openLightbox([{url:'${img.url}',caption:''}],0)">
     <span style="flex:1;font-size:11px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(img.url.length>50?img.url.slice(0,50)+"…":img.url)}</span>
     <button onclick="delImg(${idx})" style="padding:2px 7px;border-radius:4px;border:1px solid rgba(248,113,113,.3);background:transparent;color:var(--nemam-txt);cursor:pointer;font-size:11px">✕</button>`;
    list.appendChild(row);
  });
  if(!imgs.length)list.innerHTML='<div style="font-size:11px;color:var(--muted);padding:4px">Nema slika.</div>';
}
function delImg(idx){
  const item=S.inventar[imgEditCat]?.items.find(i=>i.id===imgEditId);if(!item)return;
  const imgs=getImgs(item);imgs.splice(idx,1);item.imgs=imgs;delete item.img;
  delete IC[item.code];saveIC();save();renderImgMgr();render();
}
function addImgFromUrl(){
  const url=document.getElementById("imgUrlIn").value.trim();if(!url)return;
  const item=S.inventar[imgEditCat]?.items.find(i=>i.id===imgEditId);if(!item)return;
  const imgs=getImgs(item);imgs.push({url});item.imgs=imgs;delete item.img;
  delete IC[item.code];saveIC();document.getElementById("imgUrlIn").value="";
  document.getElementById("imgUrlPreview").style.display="none";
  save();renderImgMgr();render();showToast("✓ Slika dodana");
}
function addImgFromUpload(){
  if(!imgData)return;
  const item=S.inventar[imgEditCat]?.items.find(i=>i.id===imgEditId);if(!item)return;
  const imgs=getImgs(item);imgs.push({url:imgData});item.imgs=imgs;delete item.img;
  delete IC[item.code];saveIC();imgData=null;
  document.getElementById("imgUpPreview").style.display="none";
  save();renderImgMgr();render();showToast("✓ Slika učitana");
}
function setImgTab(tab,btn){
  imgTab=tab;
  document.querySelectorAll("#imgModal .img-tab").forEach(t=>t.classList.remove("active"));
  if(btn)btn.classList.add("active");
  document.getElementById("imgTabUrl").style.display=tab==="url"?"block":"none";
  document.getElementById("imgTabUpload").style.display=tab==="upload"?"block":"none";
}
function previewImgEdit(){
  const url=document.getElementById("imgUrlIn").value.trim(),pv=document.getElementById("imgUrlPreview"),pvEl=document.getElementById("imgUrlPreviewEl");
  if(!url){pv.style.display="none";return;}pvEl.src=url;pvEl.onload=()=>pv.style.display="block";pvEl.onerror=()=>pv.style.display="none";
}
async function handleDrop(e){
  e.preventDefault();document.getElementById("dropZone").classList.remove("over");
  const f=e.dataTransfer.files[0];if(!f||!f.type.startsWith("image/"))return;
  imgData=await compressImage(f);
  document.getElementById("imgUpPreviewEl").src=imgData;document.getElementById("imgUpPreview").style.display="block";
}
async function handleFile(e){
  const f=e.target.files[0];if(!f)return;
  imgData=await compressImage(f);
  document.getElementById("imgUpPreviewEl").src=imgData;document.getElementById("imgUpPreview").style.display="block";
}
function closeImgModal(){document.getElementById("imgModal").style.display="none";}

// ── MOVE TO WISH ───────────────────────────────────────────────
function openMoveToWish(cat,id){
  mtwCat=cat;mtwId=id;
  const item=S.inventar[cat]?.items.find(i=>i.id===id);if(!item)return;
  document.getElementById("mtwItemName").textContent=`"${item.name}"`;
  document.getElementById("mtwPrio").value="3";
  document.getElementById("mtwPrice").value="";
  document.getElementById("mtwNote").value=item.note||"";
  // Check if already in zelje
  const alreadyInZelje=S.zelje.some(w=>w.code===item.code||w.name===item.name);
  const warn=document.getElementById("mtwWarn");
  if(alreadyInZelje){warn.style.display="block";warn.textContent="⚠️ Ovaj proizvod je već na popisu Želja!";}
  else warn.style.display="none";
  document.getElementById("moveToWishModal").style.display="flex";
}
function closeMoveToWishModal(){document.getElementById("moveToWishModal").style.display="none";}
function confirmMoveToWish(){
  const item=S.inventar[mtwCat]?.items.find(i=>i.id===mtwId);if(!item)return;
  S.zelje.push({id:"w_"+Date.now(),cat:mtwCat,code:item.code,name:item.name,desc:item.desc||"",
    price:document.getElementById("mtwPrice").value.trim()||"–",
    prio:parseInt(document.getElementById("mtwPrio").value),
    note:document.getElementById("mtwNote").value.trim()});
  S.inventar[mtwCat].items=S.inventar[mtwCat].items.filter(i=>i.id!==mtwId);
  save();closeMoveToWishModal();render();showToast(`→ Premješteno u Želje`);
}

// ── WISHES ─────────────────────────────────────────────────────
// Svede naziv na "goli" oblik za usporedbu - malim slovima, bez interpunkcije,
// razmaci stisnuti - da se npr. "MiniArt – StuG III..." poklopi sa "StuG III..."
function normalizeForMatch(s){
  return (s||"").toLowerCase().replace(/[^a-z0-9šđčćž]+/g," ").replace(/\s+/g," ").trim();
}
// Nazivi se smatraju istom stavkom ako je jedan (nakon normalizacije) u
// potpunosti sadržan u drugom - hvata čest slučaj kad je na Željama upisan
// naziv proizvođača ili neki dodatak ispred/iza pravog naziva (npr. "MiniArt
// – StuG III..." vs "StuG III..."). Kraći naziv mora imati barem 8 znakova
// da se izbjegnu lažni pogoci na prekratkim/generičkim nazivima.
function namesLikelyMatch(nameA,nameB){
  const a=normalizeForMatch(nameA),b=normalizeForMatch(nameB);
  if(!a||!b)return false;
  const shorter=a.length<=b.length?a:b,longer=a.length<=b.length?b:a;
  if(shorter.length<8)return false;
  return longer.includes(shorter);
}
// Provjeri je li stavka sa Želja u međuvremenu već "stigla" u Inventar ili
// Makete (kupljena mimo gumba "✓ kupljeno" - npr. ručno dodana) - traži
// prvo po šifri (ako postoji), inače po nazivu (dopušta da se nazivi ne
// poklapaju slovo-po-slovo, vidi namesLikelyMatch). Koristi se da se takva
// stavka na Željama označi crvenim fontom jer je vjerojatno višak.
function findWishDuplicate(w){
  // Korisnik je ručno označio da ovo NIJE duplikat (lažni pogodak) - preskoči.
  if(w.dupDismissed)return null;
  const code=(w.code||"").trim().toUpperCase();
  const hasCode=!!code&&code!=="–";
  for(const cd of Object.values(S.inventar)){
    for(const it of cd.items){
      const itCode=(it.code||"").trim().toUpperCase();
      if(hasCode&&itCode&&itCode===code)return{type:"inventar",label:it.name};
      if(!hasCode&&namesLikelyMatch(w.name,it.name))return{type:"inventar",label:it.name};
    }
  }
  for(const m of S.makete){
    const mCode=(m.code||"").trim().toUpperCase();
    if(hasCode&&mCode&&mCode===code)return{type:"makete",label:m.name};
    if(!hasCode&&namesLikelyMatch(w.name,m.name))return{type:"makete",label:m.name};
  }
  return null;
}
// Isto, ali unutar same liste Želja - hvata slučaj kad je ista stavka
// slučajno dodana dvaput (npr. dupli klik na "Dodaj" ili zaboravljeno da je
// već upisana). Provjerava i po šifri i po nazivu (namesLikelyMatch), bez
// obzira ima li konkretna stavka šifru upisanu ili ne. Ako je JEDNA od dvije
// stavke u paru ručno označena da nije duplikat, par se više ne prikazuje
// kao duplikat ni za jednu od njih (inače bi ostala "napola" označena).
function findWishSelfDuplicate(w,allWish){
  if(w.dupDismissed)return null;
  const code=(w.code||"").trim().toUpperCase();
  const hasCode=!!code&&code!=="–";
  for(const other of allWish){
    if(other.id===w.id)continue;
    if(other.dupDismissed)continue;
    const oCode=(other.code||"").trim().toUpperCase();
    const codeMatch=hasCode&&oCode&&oCode===code;
    if(codeMatch||namesLikelyMatch(w.name,other.name))return other;
  }
  return null;
}
async function dismissWishDup(id){
  const w=S.zelje.find(x=>x.id===id);if(!w)return;
  w.dupDismissed=true;
  save();renderZelje();
  showToastAction(`"${w.name}" nije duplikat`,"Poništi",()=>{
    w.dupDismissed=false;save();renderZelje();
  });
}
function renderZelje(){
  const tb=document.getElementById("wishBody");tb.innerHTML="";
  const q=search.toLowerCase();
  const filtered=[...S.zelje].filter(w=>!q||w.name.toLowerCase().includes(q)||(w.code||"").toLowerCase().includes(q)||(w.desc||"").toLowerCase().includes(q)||(w.note||"").toLowerCase().includes(q)||(w.cat||"").toLowerCase().includes(q));
  let dupCount=0;
  filtered.sort((a,b)=>a.prio-b.prio).forEach(w=>{
    const dup=findWishDuplicate(w);
    const selfDup=findWishSelfDuplicate(w,S.zelje);
    const isDup=!!(dup||selfDup);
    if(isDup)dupCount++;
    const dupCls=isDup?" wish-dup-text":"";
    const noteParts=[];
    if(dup)noteParts.push(`⚠ već ${dup.type==="inventar"?"u Inventaru":"u Maketama"}`);
    if(selfDup)noteParts.push(`⚠ duplikat na Željama`);
    const titleParts=[];
    if(dup)titleParts.push(`Već postoji u ${dup.type==="inventar"?"Inventaru":"Maketama"}${dup.label?': "'+dup.label+'"':""}`);
    if(selfDup)titleParts.push(`Duplikat unutar Želja: "${selfDup.name}"`);
    const dupNote=noteParts.length?`<div class="wish-dup-note" title="${esc(titleParts.join(" · ")+" — vjerojatno se može izbaciti sa Želja")}">${noteParts.join(" · ")} <span class="wish-dup-dismiss" onclick="event.stopPropagation();dismissWishDup('${w.id}')" title="Ovo NIJE duplikat — ukloni oznaku">✕ nije duplikat</span></div>`:"";
    const tr=document.createElement("tr");
    tr.dataset.id=w.id;
    if(isDup)tr.classList.add("wish-dup");
    tr.innerHTML=`<td class="wcode${dupCls}">${esc(w.code)}</td>
     <td><strong class="${dupCls.trim()}">${esc(w.name)}</strong>${w.forMaketa?`<span class="wish-for46">⬡ ${esc((S.makete.find(m=>m.id===w.forMaketa)||{}).name||"maketa")}</span>`:""}${dupNote}${w.desc?`<div class="wdesc">${esc(w.desc)}</div>`:""}</td>
     <td class="wcat${dupCls}">${esc(w.cat||"–")}</td>
     <td style="text-align:center"><span class="prio-badge prio-${w.prio}">${w.prio}</span></td>
     <td style="font-size:11px;color:var(--muted)">${esc(w.note||"")}</td>
     <td><div class="wish-act-row">
      <a class="wish-btn" href="https://www.makete.eu/shop_search.php?search=${encodeURIComponent(w.code&&w.code!=="–"?w.code:w.name)}" target="_blank" rel="noopener" title="Traži na makete.eu" style="text-decoration:none">🔎</a>
      <button class="wish-btn btn-account" onclick="quickAddWishToOrder('${w.id}')" title="Dodaj u račun">🧾</button>
      <button class="wish-btn kupljeno" onclick="openBuyModal('${w.id}')">✓ kupljeno</button>
      <button class="wish-btn del" onclick="delWish('${w.id}')">✕</button>
     </div></td>`;
    tb.appendChild(tr);
  });
  if(!S.zelje.length)tb.innerHTML='<tr><td colspan="6" style="padding:1rem;color:var(--muted);font-size:12px">Popis je prazan.</td></tr>';
  else if(!filtered.length)tb.innerHTML='<tr><td colspan="6" style="padding:1rem;color:var(--muted);font-size:12px">Nema rezultata za pretragu.</td></tr>';
  const wishHint=document.getElementById("wishDupHint");
  if(wishHint)wishHint.textContent=dupCount?`⚠ ${dupCount} stavk${dupCount===1?"a":dupCount<5?"e":"i"} na popisu je višak (već u Inventaru/Maketama ili duplikat unutar Želja) — pogledaj crveno označene retke.`:"";
}
function openWishModal(){
  const sel=document.getElementById("wmCat");sel.innerHTML="";
  [...orderedCats(),"Ostalo"].forEach(c=>{const o=document.createElement("option");o.value=c;o.textContent=c;sel.appendChild(o);});
  ["wmCode","wmName","wmDesc","wmPrice","wmNote"].forEach(i=>document.getElementById(i).value="");
  document.getElementById("wmPrio").value="3";
  document.getElementById("wishModal").style.display="flex";
  setTimeout(()=>document.getElementById("wmName").focus(),60);
}
function closeWishModal(){document.getElementById("wishModal").style.display="none";}
function submitWish(){
  const name=document.getElementById("wmName").value.trim();if(!name){document.getElementById("wmName").focus();return;}
  S.zelje.push({id:"w_"+Date.now(),cat:document.getElementById("wmCat").value,
    code:document.getElementById("wmCode").value.trim()||"–",name,
    desc:document.getElementById("wmDesc").value.trim(),
    price:document.getElementById("wmPrice").value.trim()||"–",
    prio:parseInt(document.getElementById("wmPrio").value),
    note:document.getElementById("wmNote").value.trim()});
  save();closeWishModal();renderZelje();renderStats();showToast("✓ Dodano u Želje");
}
async function delWish(id){
  const ok=await customConfirm("Ukloniti ovu stavku s popisa želja?","Ukloniti?");
  if(!ok)return;
  const idx=S.zelje.findIndex(w=>w.id===id);if(idx<0)return;
  const [removed]=S.zelje.splice(idx,1);
  save();renderZelje();renderStats();
  showToastAction(`Uklonjeno: ${removed.name}`,"Poništi",()=>{
    S.zelje.splice(Math.min(idx,S.zelje.length),0,removed);
    save();renderZelje();renderStats();
  });
}

// ── BUY ────────────────────────────────────────────────────────
function openBuyModal(id){
  wmBuyId=id;wmBuyStatus="imam";wmBuyDest="inventar";
  const w=S.zelje.find(x=>x.id===id);if(!w)return;
  document.getElementById("buyItemName").textContent=`"${w.name}"`;
  const sel=document.getElementById("buyCat");sel.innerHTML="";
  [...orderedCats(),"+ Nova kategorija"].forEach(c=>{const o=document.createElement("option");o.value=c;o.textContent=c;sel.appendChild(o);});
  if(w.cat&&S.inventar[w.cat])sel.value=w.cat;
  document.getElementById("buyMfr").value="";
  document.getElementById("buyComment").value=w.note||"";
  setBuyStatus("imam");setBuyDest("inventar");
  document.getElementById("buyModal").style.display="flex";
}
function closeBuyModal(){document.getElementById("buyModal").style.display="none";}
function setBuyDest(dest){
  wmBuyDest=dest;
  document.getElementById("buyDestInv").classList.toggle("active",dest==="inventar");
  document.getElementById("buyDestMak").classList.toggle("active",dest==="makete");
  document.getElementById("buyInvOpts").style.display=dest==="inventar"?"block":"none";
  document.getElementById("buyMakOpts").style.display=dest==="makete"?"block":"none";
  document.getElementById("buyConfirmBtn").textContent=dest==="inventar"?"↑ Inventar":"⬡ Makete";
}
function setBuyStatus(s){wmBuyStatus=s;document.getElementById("buyBtnImam").classList.toggle("active",s==="imam");document.getElementById("buyBtnNemam").classList.toggle("active",s==="nemam");}
async function confirmBuy(){
  const w=S.zelje.find(x=>x.id===wmBuyId);if(!w)return;
  if(wmBuyDest==="makete"){
    S.makete.push({id:"m_"+Date.now(),name:w.name,scale:document.getElementById("buyScale").value,code:w.code,
      mfr:document.getElementById("buyMfr").value.trim(),status:document.getElementById("buyModelStatus").value,
      comment:document.getElementById("buyComment").value.trim(),imgs:[],colors:[],createdAt:Date.now()});
    showToast("⬡ Dodano u Makete");
  }else{
    let cat=document.getElementById("buyCat").value;
    if(cat==="+ Nova kategorija"){
      const n=await customPrompt("Nova kategorija","Naziv nove kategorije:");
      if(!n?.trim())return;
      cat=n.trim();S.inventar[cat]={items:[]};if(!S.catOrder)S.catOrder=[];S.catOrder.push(cat);
    }
    if(!S.inventar[cat])S.inventar[cat]={items:[]};
    const newInvItem={id:"b_"+Date.now(),mfr:"AK Interactive",code:w.code,name:w.name,desc:w.desc||"",note:w.note||"",price:w.price&&w.price!=="–"?w.price:"",imgs:[],status:wmBuyStatus,tags:[],swatch:null,subgroup:null,createdAt:Date.now()};
    S.inventar[cat].items.push(newInvItem);
    // Ako kupljeni proizvod pripada već postojećem kompletu (nositelj grupe
    // ga navodi u svom opisu), automatski ga pridruži i posloži uz ostatak.
    const sg=linkItemToExistingHeaderIfMember(newInvItem,cat);
    showToast(sg?`↑ Dodano u Inventar · 🧩 pridruženo kompletu "${sg}"`:"↑ Dodano u Inventar");
  }
  S.zelje=S.zelje.filter(x=>x.id!==wmBuyId);
  save();closeBuyModal();render();
}

// ── NARUDŽBA (računi) ─────────────────────────────────────────
// Model: S.narudzbe = niz "narudžbi" (jedan zapis = jedan stvarni račun/kupnja).
// Svaka narudžba ima svoje stavke (roba s tog računa) i polje "paid" =
// stvarno plaćeni ukupni iznos s računa (ne mora se poklapati sa zbrojem
// pojedinačnih cijena stavki — vrijedi ono što je upisano u "paid").
// S.activeNarudzbaId označava u koju se narudžbu ubacuju nove stavke kad
// klikneš 🧾 na Želji/Inventaru — kao "trenutno otvorena košarica".
function fmtEUR(v){return v.toLocaleString("hr-HR",{minimumFractionDigits:2,maximumFractionDigits:2})+" €";}
function orderItemsSum(ord){return (ord.items||[]).reduce((s,it)=>s+parsePrice(it.price)*(it.qty||1),0);}
function orderPaidOrSum(ord){const p=parsePrice(ord.paid);return p>0?p:orderItemsSum(ord);}
// Koliko je (kroz Račune) stvarno plaćeno za određenu stavku iz Inventara/
// Maketa — zbraja sve stavke na svim računima koje na nju upućuju (source+
// refId). Koristi se kao "vrijednost" te stavke umjesto ručno upisane
// cijene na kartici proizvoda, tako da se cijena ne mora unositi dvaput.
function getReceiptPriceFor(source,refId){
  if(!refId)return 0;
  let sum=0;
  for(const ord of S.narudzbe||[]){
    for(const it of ord.items||[]){
      if(it.source===source&&it.refId===refId)sum+=parsePrice(it.price)*(it.qty||1);
    }
  }
  return sum;
}
function makeOrderObj(){
  return {id:"ord_"+Date.now()+"_"+Math.random().toString(36).slice(2,7),label:"Račun #"+((S.narudzbe?.length||0)+1),date:Date.now(),paid:"",items:[]};
}
function createOrder(){
  if(!S.narudzbe)S.narudzbe=[];
  const ord=makeOrderObj();
  S.narudzbe.push(ord);
  S.activeNarudzbaId=ord.id;
  save();renderStats();
  if(page==="narudzba")renderNarudzba();
  showToast("🧾 Novi račun otvoren");
  return ord;
}
function ensureActiveOrder(){
  if(!S.narudzbe)S.narudzbe=[];
  // Aktivna narudžba mora postojati I ne smije biti zaključena — ako je
  // zaključena ili ne postoji, uvijek se otvara NOVA narudžba umjesto da
  // se (pogrešno) nastavi ubacivati u stari, već zatvoreni račun.
  let ord=S.narudzbe.find(o=>o.id===S.activeNarudzbaId&&!o.closed);
  if(!ord){
    ord=makeOrderObj();
    S.narudzbe.push(ord);
    S.activeNarudzbaId=ord.id;
  }
  return ord;
}
function setActiveOrder(id){
  const ord=(S.narudzbe||[]).find(o=>o.id===id);if(!ord)return;
  ord.closed=false;
  S.activeNarudzbaId=id;save();renderNarudzba();showToast("🧾 Aktivan račun postavljen");
}
async function closeOrder(orderId){
  const ord=(S.narudzbe||[]).find(o=>o.id===orderId);if(!ord)return;
  ord.closed=true;
  if(S.activeNarudzbaId===orderId)S.activeNarudzbaId=null;
  save();renderNarudzba();renderStats();
  showToast("🔒 Račun zaključen — sljedeća stavka otvara novi");
}
function reopenOrder(orderId){
  const ord=(S.narudzbe||[]).find(o=>o.id===orderId);if(!ord)return;
  ord.closed=false;
  ord.collapsed=false;
  S.activeNarudzbaId=orderId;
  save();renderNarudzba();renderStats();
  showToast("🔓 Račun ponovno otvoren i postavljen kao aktivan");
}
function toggleOrderCollapsed(orderId){
  const ord=(S.narudzbe||[]).find(o=>o.id===orderId);if(!ord)return;
  ord.collapsed=!ord.collapsed;
  save();renderNarudzba();
}
function findOrderItem(ord,source,refId){return refId?ord.items.find(it=>it.source===source&&it.refId===refId):null;}
function addToActiveOrder(entry){
  const ord=ensureActiveOrder();
  const existing=entry.refId?findOrderItem(ord,entry.source,entry.refId):null;
  if(existing){
    existing.qty=(existing.qty||1)+1;
    save();showToast("🧾 Količina povećana na "+existing.qty);
  }else{
    ord.items.push(Object.assign({id:"oi_"+Date.now()+"_"+Math.random().toString(36).slice(2,7),qty:1},entry));
    save();showToast(`🧾 Dodano u "${ord.label}"`);
  }
  renderStats();
  if(page==="narudzba")renderNarudzba();
}
function quickAddWishToOrder(wishId){
  const w=S.zelje.find(x=>x.id===wishId);if(!w)return;
  addToActiveOrder({source:"zelje",refId:w.id,code:w.code||"–",name:w.name,cat:w.cat||"Ostalo",price:w.price&&w.price!=="–"?w.price:""});
}
function quickAddInvToOrder(cat,id){
  const item=S.inventar[cat]?.items.find(i=>i.id===id);if(!item)return;
  addToActiveOrder({source:"inventar",refId:item.id,code:item.code||"–",name:item.name,cat,price:item.price||""});
}
function quickAddModelToOrder(id){
  const m=S.makete.find(x=>x.id===id);if(!m)return;
  addToActiveOrder({source:"makete",refId:m.id,code:m.code||"–",name:m.name,cat:"Makete",price:m.price||""});
}
function openOrderModal(){
  ["omCode","omName","omCat","omPrice"].forEach(i=>document.getElementById(i).value="");
  document.getElementById("omQty").value="1";
  document.getElementById("orderModal").style.display="flex";
  setTimeout(()=>document.getElementById("omName").focus(),60);
}
function closeOrderModal(){document.getElementById("orderModal").style.display="none";}
function submitOrderManual(){
  const name=document.getElementById("omName").value.trim();if(!name){document.getElementById("omName").focus();return;}
  const ord=ensureActiveOrder();
  ord.items.push({id:"oi_"+Date.now()+"_"+Math.random().toString(36).slice(2,7),source:"rucno",refId:null,
    code:document.getElementById("omCode").value.trim()||"–",name,
    cat:document.getElementById("omCat").value.trim(),
    qty:Math.max(1,parseInt(document.getElementById("omQty").value)||1),
    price:document.getElementById("omPrice").value.trim()});
  save();closeOrderModal();renderNarudzba();renderStats();showToast(`🧾 Dodano u "${ord.label}"`);
}
function setOrderItemQty(orderId,itemId,val){
  const ord=(S.narudzbe||[]).find(o=>o.id===orderId);if(!ord)return;
  const it=ord.items.find(x=>x.id===itemId);if(!it)return;
  it.qty=Math.max(1,parseInt(val)||1);save();renderNarudzba();renderStats();
}
function setOrderItemPrice(orderId,itemId,val){
  const ord=(S.narudzbe||[]).find(o=>o.id===orderId);if(!ord)return;
  const it=ord.items.find(x=>x.id===itemId);if(!it)return;
  it.price=val.trim();save();renderNarudzba();renderStats();
}
async function delOrderItem(orderId,itemId){
  const ord=(S.narudzbe||[]).find(o=>o.id===orderId);if(!ord)return;
  const idx=ord.items.findIndex(x=>x.id===itemId);if(idx<0)return;
  const [removed]=ord.items.splice(idx,1);save();renderNarudzba();renderStats();
  showToastAction(`Uklonjeno: ${removed.name}`,"Poništi",()=>{
    ord.items.splice(Math.min(idx,ord.items.length),0,removed);save();renderNarudzba();renderStats();
  });
}
function setOrderPaid(orderId,val){
  const ord=(S.narudzbe||[]).find(o=>o.id===orderId);if(!ord)return;
  ord.paid=val.trim();save();renderNarudzba();renderStats();
}
function setOrderLabel(orderId,val){
  const ord=(S.narudzbe||[]).find(o=>o.id===orderId);if(!ord)return;
  ord.label=val.trim()||ord.label;save();renderNarudzba();
}
function fillPaidFromSum(orderId){
  const ord=(S.narudzbe||[]).find(o=>o.id===orderId);if(!ord)return;
  const sum=orderItemsSum(ord);
  ord.paid=sum>0?fmtEUR(sum):"";
  save();renderNarudzba();renderStats();
}
async function delOrder(orderId){
  const ok=await customConfirm("Obrisati cijeli račun i sve njegove stavke?","Obrisati račun?");
  if(!ok)return;
  const idx=(S.narudzbe||[]).findIndex(o=>o.id===orderId);if(idx<0)return;
  S.narudzbe.splice(idx,1);
  if(S.activeNarudzbaId===orderId)S.activeNarudzbaId=S.narudzbe.length?S.narudzbe[S.narudzbe.length-1].id:null;
  save();renderNarudzba();renderStats();showToast("Račun obrisan");
}
function renderNarudzba(){
  if(!S.narudzbe)S.narudzbe=[];
  const list=document.getElementById("narudzbaList");list.innerHTML="";
  let grandTotal=0;
  [...S.narudzbe].sort((a,b)=>(b.date||0)-(a.date||0)).forEach(ord=>{
    grandTotal+=orderPaidOrSum(ord);
    const isActive=ord.id===S.activeNarudzbaId&&!ord.closed;
    const itemsSum=orderItemsSum(ord);
    const itemsRows=ord.items.length?ord.items.map(it=>{
      const lineTotal=parsePrice(it.price)*(it.qty||1);
      return `<tr>
        <td class="wcode">${esc(it.code||"–")}</td>
        <td>${esc(it.name)}</td>
        <td class="wcat">${esc(it.cat||"–")}</td>
        <td><input type="number" min="1" class="ord-qty" value="${it.qty||1}" onchange="setOrderItemQty('${ord.id}','${it.id}',this.value)"></td>
        <td><input type="text" class="ord-price" value="${esc(it.price||"")}" placeholder="npr. 4,50 €" onchange="setOrderItemPrice('${ord.id}','${it.id}',this.value)"></td>
        <td class="wprice">${lineTotal>0?fmtEUR(lineTotal):"–"}</td>
        <td><button class="wish-btn del" onclick="delOrderItem('${ord.id}','${it.id}')">✕</button></td>
       </tr>`;
    }).join(""):`<tr><td colspan="7" style="padding:.6rem;color:var(--muted);font-size:12px">Nema stavki. Dodaj gumbom 🧾 iz Popisa želja/Inventara ili ručno preko "+ Dodaj ručno".</td></tr>`;
    const isCollapsed=!!ord.collapsed;
    const card=document.createElement("div");card.className="narudzba-card"+(isActive?" active":"")+(ord.closed?" closed":"")+(isCollapsed?" collapsed":"");
    card.dataset.id=ord.id;
    let statusHtml;
    if(ord.closed){
      statusHtml=`<span class="narudzba-closed-badge">✓ Zaključen</span><button class="btn-sm" onclick="reopenOrder('${ord.id}')" title="Ponovno otvori i postavi kao aktivan">↺ Ponovno otvori</button>`;
    }else if(isActive){
      statusHtml=`<span class="narudzba-active-badge">● Aktivan — nove stavke idu ovdje</span><button class="btn-sm" onclick="closeOrder('${ord.id}')" title="Zaključi — sljedeća stavka otvorit će novi račun">🔒 Zaključi</button>`;
    }else{
      statusHtml=`<button class="btn-sm" onclick="setActiveOrder('${ord.id}')">Postavi kao aktivan</button>`;
    }
    const collapseBtn=`<button class="narudzba-collapse-btn" onclick="toggleOrderCollapsed('${ord.id}')" title="${isCollapsed?"Prikaži stavke":"Sakrij stavke — prikaži samo naslov"}">${isCollapsed?"▸":"▾"}</button>`;
    const amtNow=orderPaidOrSum(ord);
    const amtHtml=amtNow>0?`<span class="narudzba-amount-inline">${fmtEUR(amtNow)}</span>`:"";
    card.innerHTML=`
     <div class="narudzba-card-hdr">
      ${collapseBtn}
      <input type="text" class="narudzba-label-input" value="${esc(ord.label)}" onchange="setOrderLabel('${ord.id}',this.value)">
      <span class="narudzba-date">${new Date(ord.date||Date.now()).toLocaleDateString("hr-HR")}</span>${ord.orderNo?`<span class="narudzba-ordno" title="${esc(ord.shop||"")} – broj narudžbe">#${esc(ord.orderNo)}</span>`:""}
      ${amtHtml}
      ${statusHtml}
      <button class="btn-icon del" onclick="delOrder('${ord.id}')" title="Obriši račun">✕</button>
     </div>
     ${isCollapsed?"":`
     <div class="narudzba-card-body">
      <table class="wish-table">
       <thead><tr><th>Šifra</th><th>Naziv</th><th>Kategorija</th><th>Kol.</th><th>Cijena/kom</th><th>Ukupno</th><th></th></tr></thead>
       <tbody>${itemsRows}</tbody>
      </table>
     </div>
     <div class="narudzba-card-foot">
      <span>Zbroj stavki: <b>${itemsSum>0?fmtEUR(itemsSum):"–"}</b></span>
      <span>Plaćeno (račun): <input type="text" class="narudzba-paid-input" value="${esc(ord.paid||"")}" placeholder="npr. 128,40 €" onchange="setOrderPaid('${ord.id}',this.value)"></span>
      ${itemsSum>0?`<button class="btn-sm" onclick="fillPaidFromSum('${ord.id}')" title="Prepiši zbroj stavki u polje Plaćeno">= Zbroj stavki</button>`:""}
     </div>`}
    `;
    list.appendChild(card);
  });
  if(!S.narudzbe.length)list.innerHTML='<div class="no-results">Nema računa. Klikni "+ Novi račun" ili dodaj stavku gumbom 🧾 iz Popisa želja/Inventara — račun će se otvoriti automatski.</div>';
  const totalEl=document.getElementById("narudzbaTotal");
  if(totalEl)totalEl.textContent=`${S.narudzbe.length} računa${grandTotal>0?` · Ukupno plaćeno: ${fmtEUR(grandTotal)}`:""}`;
}
function printOrderList(){
  const orders=S.narudzbe||[];
  if(!orders.length){showToast("Nema računa za ispis.");return;}
  let grand=0;
  const sections=orders.map(ord=>{
    const sum=orderItemsSum(ord),paid=orderPaidOrSum(ord);
    grand+=paid;
    const rows=(ord.items||[]).map(it=>{
      const lt=parsePrice(it.price)*(it.qty||1);
      return `<tr><td>${esc(it.code||"–")}</td><td>${esc(it.name)}</td><td>${esc(it.cat||"–")}</td><td>${it.qty||1}</td><td>${esc(it.price||"–")}</td><td>${lt>0?fmtEUR(lt):"–"}</td></tr>`;
    }).join("");
    return `<h3>${esc(ord.label)} <span style="font-weight:400;color:#777">(${new Date(ord.date||Date.now()).toLocaleDateString("hr-HR")})</span></h3>
     <table style="width:100%;border-collapse:collapse"><thead><tr><th>Šifra</th><th>Naziv</th><th>Kategorija</th><th>Kol.</th><th>Cijena/kom</th><th>Ukupno</th></tr></thead><tbody>${rows}</tbody></table>
     <div style="text-align:right;font-size:12px;margin:.35rem 0 1.25rem">Zbroj stavki: ${sum>0?fmtEUR(sum):"–"} &nbsp;·&nbsp; <b>Plaćeno: ${paid>0?fmtEUR(paid):"–"}</b></div>`;
  }).join("");
  const win=window.open("","_blank");
  if(!win){alert("Preglednik je blokirao otvaranje novog prozora za ispis. Dozvoli pop-up prozore za ovu stranicu.");return;}
  win.document.write(`<!DOCTYPE html><html lang="hr"><head><meta charset="UTF-8"><title>Računi – Makete &amp; Alati</title>
  <style>
    body{font-family:Arial,sans-serif;color:#111;padding:2rem;max-width:800px;margin:0 auto}
    h1{font-size:20px;border-bottom:2px solid #111;padding-bottom:.5rem}
    h3{font-size:14px;margin:0 0 .4rem}
    .meta{color:#777;font-size:11px;margin:.5rem 0 1rem}
    table{font-size:12px}
    th{text-align:left;padding:6px 8px;border-bottom:2px solid #111;text-transform:uppercase;font-size:10px;letter-spacing:.05em}
    td{padding:6px 8px;border-bottom:1px solid #ddd}
    .grand{font-weight:700;text-align:right;margin-top:.5rem;font-size:15px;border-top:2px solid #111;padding-top:.5rem}
    @media print{body{padding:0}}
  </style></head><body>
  <h1>Računi</h1>
  <div class="meta">Generirano ${new Date().toLocaleDateString("hr-HR")} · ${orders.length} računa</div>
  ${sections}
  <div class="grand">Ukupno plaćeno (svi računi): ${grand>0?fmtEUR(grand):"–"}</div>
  </body></html>`);
  win.document.close();
  win.focus();
  setTimeout(()=>win.print(),300);
}

// ── MAKETE ─────────────────────────────────────────────────────
function renderMakete(){
  const con=document.getElementById("modelContent");con.innerHTML="";
  const q=search.toLowerCase();
  const visible=S.makete.filter(m=>!q||m.name.toLowerCase().includes(q)||(m.code||"").toLowerCase().includes(q)||(m.mfr||"").toLowerCase().includes(q)||(m.comment||"").toLowerCase().includes(q)||(m.scale||"").toLowerCase().includes(q));
  const groups={wip:[],plan:[],pauza:[],done:[]};
  visible.forEach(m=>{(groups[m.status]||groups.wip).push(m);});
  const labels={wip:"🔨 U izgradnji",plan:"⬜ Planirane",pauza:"⏸ Na pauzi",done:"✅ Završene"};
  for(const [status,items] of Object.entries(groups)){
    if(!items.length)continue;
    const grp=document.createElement("div");grp.className="model-status-group";
    grp.innerHTML=`<div class="model-status-hdr">${labels[status]} <span style="color:var(--muted);font-weight:400">(${items.length})</span></div>`;
    const grid=document.createElement("div");grid.className="model-grid";
    items.forEach(m=>{grid.appendChild(buildModelCard(m));});
    grp.appendChild(grid);con.appendChild(grp);
  }
  if(!S.makete.length)con.innerHTML='<div class="no-results">Nema maketa.</div>';
  else if(!visible.length)con.innerHTML='<div class="no-results">Nema rezultata za pretragu.</div>';
  const totalEl=document.getElementById("modelValueTotal");
  if(totalEl){
    // Vrijednost se povlači iz Računa (vidi getReceiptPriceFor), ne iz
    // ručno upisane cijene na kartici makete.
    const withPrice=S.makete.map(m=>({m,val:getReceiptPriceFor("makete",m.id)})).filter(x=>x.val>0);
    const sum=withPrice.reduce((s,x)=>s+x.val,0);
    totalEl.textContent=sum>0?`Ukupna vrijednost maketa: ${sum.toLocaleString("hr-HR",{minimumFractionDigits:2,maximumFractionDigits:2})} € (${withPrice.length}/${S.makete.length} iz Računa)`:"";
  }
}
function buildModelCard(m){
  // Crveni obrub: maketa nema upisanu cijenu ni na kartici ni na nekom
  // Računu - njena vrijednost se trenutno ne broji nigdje.
  const missingPrice=getReceiptPriceFor("makete",m.id)===0&&!parsePrice(m.price);
  const d=document.createElement("div");d.className="model-card"+(missingPrice?" no-price-flag":"");
  if(missingPrice)d.title="⚠ Nema upisanu cijenu ni na kartici ni na Računu";
  d.dataset.id=m.id;
  const imgSrc=m.imgs&&m.imgs.length?m.imgs[0].url:(m.img||"");
  const statusLabels={plan:"⬜ Planirana",wip:"🔨 U izgradnji",done:"✅ Završena",pauza:"⏸ Na pauzi"};
  const colors=m.colors||[];
  let colorsHtml="";
  if(colors.length){
    const allInvItems=Object.values(S.inventar).flatMap(cd=>cd.items);
    const pills=colors.map(c=>{
      const invItem=allInvItems.find(i=>i.code===c);
      const sw=(invItem&&getSwatches(invItem)[0])||CODE_SWATCHES[c]||null;
      return `<span class="model-color-pill">${sw?`<span class="color-swatch" style="background:${sw}"></span>`:""}${esc(c)}</span>`;
    }).join("");
    colorsHtml=`<div class="model-colors"><div class="model-colors-lbl">Boje</div>${pills}</div>`;
  }
  const stage=m.stage||0;
  const curStep=stage>0?REDOSLIJED_STEPS[stage-1]:null;
  const nextStep=stage<REDOSLIJED_STEPS.length?REDOSLIJED_STEPS[stage]:null;
  const izvoriCount=(S.resursi||[]).filter(r=>r.maketaId===m.id).length;
  const receptiCount=(m.recepti||[]).length;
  const stageHtml=`
    <div class="model-stage-box">
      <div class="model-stage-bar"><div class="model-stage-fill" style="width:${Math.round(stage/REDOSLIJED_STEPS.length*100)}%"></div></div>
      <div class="model-stage-row">
        <span style="color:var(--muted)">${stage>0?`Faza ${stage}/${REDOSLIJED_STEPS.length}: <b style="color:var(--text)">${curStep.icon} ${esc(curStep.name)}</b>`:"Faza izrade: <b style=\"color:var(--text)\">nije započeto</b>"}</span>
      </div>
      ${nextStep?`<div class="model-stage-next" onclick="goToRedoslijedStep(${nextStep.n})" title="Otvori detalje ovog koraka u Redoslijedu izrade">➡ Sljedeće: ${nextStep.icon} ${esc(nextStep.name)}</div>`:`<div class="model-stage-next done">🎉 Svih 11 faza bojanja završeno!</div>`}
    </div>`;
  d.innerHTML=`
   ${imgSrc?`<img class="model-card-img" src="${esc(imgSrc)}" alt="${esc(m.name)}" style="cursor:zoom-in" onclick="openLightbox([{url:'${esc(imgSrc)}',caption:'${esc(m.name)}'}],0)" onerror="this.style.display='none'">`:""}
   <div class="model-card-img-ph" style="${imgSrc?"display:none":""}">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    <span style="font-size:11px">Nema slike</span>
   </div>
   <div class="model-card-body">
    <div class="model-badge ${m.status}">${statusLabels[m.status]||m.status}</div>
    <div class="model-card-name">${esc(m.name)}</div>
    <div class="model-card-meta">${esc(m.scale)} · ${esc(m.code||"–")} · ${esc(m.mfr||"–")}</div>
    ${m.comment?`<div class="model-card-comment">${esc(m.comment)}</div>`:""}
    ${stageHtml}
    ${colorsHtml}
    ${schemeCardHtml(m)}
    ${planCardHtml(m)}
    <div style="display:flex;gap:5px;margin-top:8px;flex-wrap:wrap">
     ${stage<REDOSLIJED_STEPS.length?`<button class="btn-sm" onclick="advanceModelStage('${m.id}')" style="color:var(--materijal);border-color:rgba(122,184,154,.35)" title="Označi sljedeći korak kao gotov">✓ Sljedeći korak</button>`:""}
     <button class="btn-sm" onclick="openNeed46('${m.id}')" style="color:#7fc9a8;border-color:rgba(127,201,168,.45)" title="Što od Inventara treba za sljedeći korak izrade i koje boje nedostaju">🧰 Što mi treba</button>
     <button class="btn-sm" onclick="openSchemeModal('${m.id}')" style="color:var(--model);border-color:rgba(198,124,78,.45)" title="Odaberi tip izrade boja (razdoblje / ratište) i dobij ponudu boja i materijala">🎨 Tip izrade${m.scheme?" ✓":""}</button>
     <button class="btn-sm" onclick="openPlanModal('${m.id}')" style="color:var(--accent);border-color:rgba(125,155,181,.4)" title="Odaberi što ćeš raditi na ovoj maketi i dobij ponudu boja i proizvoda iz inventara">🛠️ Plan radova${(m.plan&&(m.plan.tasks||[]).length)?` (${m.plan.tasks.length})`:""}</button>
     ${m.refUrl?`<a href="${esc(m.refUrl)}" target="_blank" rel="noopener" class="btn-sm" style="text-decoration:none;color:var(--upute)" title="Otvori spremljenu poveznicu">📷 Referenca</a>`:`<button class="btn-sm" onclick="window.open('https://www.google.com/search?tbm=isch&q='+encodeURIComponent('${esc(m.name)}'+' walkaround real vehicle'),'_blank','noopener')" title="Traži fotografije stvarnog vozila">🔍 Referenca</button>`}
     <button class="btn-sm" onclick="openIzvoriForMaketa('${m.id}')" style="color:var(--izvori);border-color:rgba(94,148,144,.35)" title="Poveznice (video/tekst/reference) spremljene za ovu maketu">🔗 Izvori${izvoriCount?` (${izvoriCount})`:""}</button>
     <button class="btn-sm" onclick="openReceptiModal('${m.id}')" style="color:var(--recept);border-color:rgba(199,125,171,.35)" title="Mješavine boja / recepti za ovu maketu">🧪 Recepti${receptiCount?` (${receptiCount})`:""}</button>
     <button class="btn-sm" onclick="openOznakeForModel('${m.id}')" style="color:var(--oznake);border-color:rgba(176,138,82,.35)" title="Referentne taktičke oznake (brojevi, amblemi, kamuflaža) za ovaj tip vozila">🎖️ Oznake${(typeof ozPinnedCount==="function"&&ozPinnedCount(m))?` (📌${ozPinnedCount(m)})`:""}</button>
     <button class="btn-sm btn-account" onclick="quickAddModelToOrder('${m.id}')" title="Dodaj u trenutno aktivan račun">🧾 Račun</button>
     <button class="btn-sm" onclick="openEditModel('${m.id}')">✎ Uredi</button>
     <button class="btn-sm" onclick="delModel('${m.id}')" style="margin-left:auto;color:var(--nemam-txt);border-color:rgba(248,113,113,.25)">✕</button>
    </div>
   </div>`;
  return d;
}
function openModelModal(){
  mmEditId=null;mmImgData=null;mmSelectedColors=new Set();
  document.getElementById("modelModalTitle").textContent="Dodaj maketu";
  ["mmName","mmCode","mmMfr","mmPrice","mmComment","mmImgUrl","mmColorSearch","mmRefUrl"].forEach(i=>document.getElementById(i).value="");
  document.getElementById("mmScale").value="1:35";document.getElementById("mmStatus").value="wip";
  document.getElementById("mmStage").value="0";
  document.getElementById("mmPreview").style.display="none";
  setModelImgTab("url");renderColorPicker("");renderColorChips();
  document.getElementById("modelModal").style.display="flex";
  setTimeout(()=>document.getElementById("mmName").focus(),60);
}
function openEditModel(id){
  const m=S.makete.find(x=>x.id===id);if(!m)return;
  mmEditId=id;mmImgData=null;
  mmSelectedColors=new Set(m.colors||[]);
  document.getElementById("modelModalTitle").textContent="Uredi maketu";
  document.getElementById("mmName").value=m.name||"";document.getElementById("mmScale").value=m.scale||"1:35";
  document.getElementById("mmCode").value=m.code||"";document.getElementById("mmMfr").value=m.mfr||"";
  document.getElementById("mmPrice").value=m.price||"";
  document.getElementById("mmStatus").value=m.status||"wip";document.getElementById("mmComment").value=m.comment||"";
  document.getElementById("mmStage").value=String(m.stage||0);
  document.getElementById("mmRefUrl").value=m.refUrl||"";
  document.getElementById("mmColorSearch").value="";
  const firstImg=m.imgs&&m.imgs.length?m.imgs[0].url:(m.img||"");
  document.getElementById("mmImgUrl").value=firstImg.startsWith("data:")?"":firstImg;
  const pv=document.getElementById("mmPreview");
  if(firstImg){pv.style.display="block";document.getElementById("mmPreviewEl").src=firstImg;}else pv.style.display="none";
  setModelImgTab("url");renderColorPicker("");renderColorChips();
  document.getElementById("modelModal").style.display="flex";
}
function closeModelModal(){document.getElementById("modelModal").style.display="none";}

// ── IZVORI (linkovi na tekstove/videa vezane uz makete) ──────────
const IZVOR_TIPOVI={video:{icon:"🎬",lbl:"Video"},tekst:{icon:"📄",lbl:"Tekst"},ostalo:{icon:"🔗",lbl:"Ostalo"}};
let izEditId=null;
// Ako korisnik ne upiše http(s):// na početku, dodaj ga automatski - inače
// <a href> tretira link kao relativnu putanju unutar aplikacije.
function normalizeIzvorUrl(u){
  u=(u||"").trim();
  if(!u)return u;
  if(!/^https?:\/\//i.test(u))u="https://"+u;
  return u;
}
function izvorHostname(u){
  try{return new URL(u).hostname.replace(/^www\./,"");}catch(e){return u;}
}
function setIzvorFilter(f){
  izvorFilter=f;
  document.querySelectorAll("#page-izvori .ftab").forEach(btn=>{
    btn.classList.toggle("active-izv",btn.dataset.ftype===f);
  });
  renderIzvori();
}
// Otvori stranicu Izvori filtriranu na poveznice vezane za JEDNU maketu -
// poziva se s kartice makete (gumb "🔗 Izvori"). Filter ostaje aktivan dok
// ga korisnik ručno ne ukloni (chip s ✕ na vrhu stranice).
function openIzvoriForMaketa(maketaId){
  izvoriMaketaFilter=maketaId;
  showPage("izvori",document.querySelector(".nav-tab.t-izvori"));
}
function clearIzvoriMaketaFilter(){
  izvoriMaketaFilter=null;
  renderIzvori();
}
function renderIzvori(){
  if(!S.resursi)S.resursi=[];
  const chipEl=document.getElementById("izvoriFilterChip");
  if(chipEl){
    const m=izvoriMaketaFilter?S.makete.find(x=>x.id===izvoriMaketaFilter):null;
    chipEl.innerHTML=m?`<div class="izv-filter-chip">🧩 Prikazane samo poveznice za maketu: <b style="color:var(--text)">${esc(m.name)}</b><button onclick="clearIzvoriMaketaFilter()" title="Ukloni filter">✕</button></div>`:"";
  }
  const body=document.getElementById("izvoriBody");
  if(!body)return;
  if(!S.resursi.length){
    body.innerHTML=`<tr><td colspan="4" style="color:var(--muted);text-align:center;padding:1.5rem">Nema spremljenih poveznica. Klikni "+ Dodaj poveznicu" za članak, video ili forum vezan uz maketarstvo.</td></tr>`;
    return;
  }
  const q=search.toLowerCase();
  const filtered=S.resursi.filter(r=>{
    const mQ=!q||r.title.toLowerCase().includes(q)||(r.note||"").toLowerCase().includes(q)||(r.url||"").toLowerCase().includes(q);
    const mF=izvorFilter==="sve"||r.type===izvorFilter;
    const mM=!izvoriMaketaFilter||r.maketaId===izvoriMaketaFilter;
    return mQ&&mF&&mM;
  });
  if(!filtered.length){
    body.innerHTML=`<tr><td colspan="4" style="color:var(--muted);text-align:center;padding:1.5rem">Nema rezultata.</td></tr>`;
    return;
  }
  body.innerHTML=[...filtered].sort((a,b)=>(b.createdAt||0)-(a.createdAt||0)).map(r=>{
    const t=IZVOR_TIPOVI[r.type]||IZVOR_TIPOVI.ostalo;
    const linkedMaketa=r.maketaId?S.makete.find(x=>x.id===r.maketaId):null;
    const modelTag=linkedMaketa?`<span class="izv-model-tag" onclick="event.stopPropagation();openIzvoriForMaketa('${esc(linkedMaketa.id)}')" title="Prikaži sve poveznice za ovu maketu">⬡ ${esc(linkedMaketa.name)}</span>`:"";
    return `<tr data-id="${esc(r.id)}">
      <td class="izvor-type-badge">${t.icon} ${t.lbl}</td>
      <td><strong>${esc(r.title)}</strong>${modelTag}${r.note?`<div class="wdesc">${esc(r.note)}</div>`:""}</td>
      <td><a href="${esc(r.url)}" target="_blank" rel="noopener" class="izvor-link" title="${esc(r.url)}">${esc(izvorHostname(r.url))} ↗</a></td>
      <td><div class="wish-act-row">
       <button class="wish-btn" onclick="openIzvorModal('${r.id}')">✎ Uredi</button>
       <button class="wish-btn del" onclick="delIzvor('${r.id}')">✕</button>
      </div></td>
     </tr>`;
  }).join("");
}
function populateIzMaketaSelect(selectedId){
  const sel=document.getElementById("izMaketa");
  if(!sel)return;
  sel.innerHTML='<option value="">— nije vezano za određenu maketu —</option>'+
    [...S.makete].sort((a,b)=>a.name.localeCompare(b.name,"hr")).map(m=>`<option value="${esc(m.id)}">${esc(m.name)}${m.scale?` (${esc(m.scale)})`:""}</option>`).join("");
  sel.value=selectedId||"";
}
function openIzvorModal(id=null){
  izEditId=id;
  const r=id?(S.resursi||[]).find(x=>x.id===id):null;
  document.getElementById("izvorModalTitle").textContent=r?`Uredi: ${r.title}`:"Dodaj poveznicu";
  document.getElementById("izNaziv").value=r?.title||"";
  document.getElementById("izUrl").value=r?.url||"";
  document.getElementById("izTip").value=r?.type||"video";
  document.getElementById("izNote").value=r?.note||"";
  populateIzMaketaSelect(r?r.maketaId:izvoriMaketaFilter);
  document.getElementById("izDeleteBtn").style.display=r?"inline-block":"none";
  document.getElementById("izvorModal").style.display="flex";
  setTimeout(()=>document.getElementById("izNaziv").focus(),60);
}
function closeIzvorModal(){document.getElementById("izvorModal").style.display="none";}
function submitIzvor(){
  const title=document.getElementById("izNaziv").value.trim();
  if(!title){document.getElementById("izNaziv").focus();return;}
  const url=normalizeIzvorUrl(document.getElementById("izUrl").value);
  if(!url){document.getElementById("izUrl").focus();return;}
  const type=document.getElementById("izTip").value;
  const note=document.getElementById("izNote").value.trim();
  const maketaId=document.getElementById("izMaketa").value||"";
  if(!S.resursi)S.resursi=[];
  if(izEditId){
    const r=S.resursi.find(x=>x.id===izEditId);
    if(r)Object.assign(r,{title,url,type,note,maketaId});
  }else{
    S.resursi.push({id:"iz_"+Date.now(),title,url,type,note,maketaId,createdAt:Date.now()});
  }
  save();closeIzvorModal();renderIzvori();
  showToast("✓ Spremljeno");
}
async function delIzvor(id){
  const idx=(S.resursi||[]).findIndex(x=>x.id===id);if(idx<0)return;
  const [removed]=S.resursi.splice(idx,1);
  save();renderIzvori();
  showToastAction(`Uklonjeno: ${removed.title}`,"Poništi",()=>{
    S.resursi.splice(Math.min(idx,S.resursi.length),0,removed);
    save();renderIzvori();
  });
}
async function deleteIzvorFromModal(){
  if(!izEditId)return;
  const ok=await customConfirm("Ukloniti ovu poveznicu s popisa?","Ukloniti?");
  if(!ok)return;
  S.resursi=(S.resursi||[]).filter(x=>x.id!==izEditId);
  save();closeIzvorModal();renderIzvori();
  showToast("✓ Uklonjeno");
}

// ── RECEPTI ZA MIJEŠANJE BOJA (po maketi) ─────────────────────────
// Svaka maketa (S.makete[i]) drži svoj vlastiti niz recepata u polju
// "recepti" - {id,name,sastojci,napomena,createdAt}. "sastojci" je slobodni
// tekst (jedan sastojak po retku), jer se omjeri miješanja u praksi bilježe
// kao "2 dijela X + 1 dio Y", a ne kao stroga struktura.
let receptiMaketaId=null,rcEditId=null;
// ── PLAN RADOVA (po maketi): odabir radova + ponuda boja/proizvoda iz inventara ──
const PLAN_TASKS=[
 {key:"priprema",icon:"🧼",name:"Priprema i kitanje",cats:/^(Putty|LJEPILO|Ljepila)/i,kw:/\b(kit|putty|ljepilo|cement|glue)\b/i},
 {key:"primer",icon:"🌫️",name:"Primer (temeljni premaz)",cats:/^(Primer|Temeljni)/i,kw:/primer|temeljn/i},
 {key:"airbrush",icon:"💨",name:"Airbrush, razrjeđivanje i čišćenje",cats:/^(Airbrush|Cleaner|Razrjeđ)/i,kw:/thinner|razrjeđ|cleaner|čistač|airbrush/i},
 {key:"osnovna",icon:"🎨",name:"Osnovna boja i kamuflaža",cats:/^(3Gen|Real Colors|VALLEJO|Model Air|ACRYLIC COLOR|QUICK GEN|Akrilne)/i,kw:null},
 {key:"modulacija",icon:"🌗",name:"Sjene, svjetla i filteri",cats:/^(QUICK GEN|AK Gouache|ACRYLIC COLOR|Gvaš)/i,kw:/filter|shade|shadow|highlight|svjetl|sjen/i},
 {key:"lak",icon:"✨",name:"Lak (gloss / satin / mat)",cats:/^(Varnish|Lakovi)/i,kw:/varnish|\blak\b/i},
 {key:"dekali",icon:"🏷️",name:"Dekali (naljepnice)",cats:/^Decal/i,kw:/decal|naljepnic/i},
 {key:"wash",icon:"🖌️",name:"Wash i panel linije",cats:/^(Washes|Precision Panel|Washevi)/i,kw:/wash|paneliner|panel liner/i},
 {key:"chipping",icon:"🪨",name:"Chipping i ogrebotine",cats:null,kw:/chipping|aging|ogrebot|scratch/i},
 {key:"hrdja",icon:"🟠",name:"Hrđa, dim, ulje i gorivo",cats:/^(Washes|Effects Brusher|Washevi)/i,kw:/rust|hrđ|rđ|streak|smoke|\bdim\b|ulje|\boil\b|fuel|gorivo|grease/i},
 {key:"prasina",icon:"💨",name:"Prašina i zemlja",cats:/^(Deposits|Pigments|Effects \(|AK Gouache|Pigmenti|Efekti|Gvaš)/i,kw:/dust|prašin|earth|zemlj|sand|pijesak/i},
 {key:"blato",icon:"🟤",name:"Blato, teren i baza (diorama)",cats:/^(Textures|Dual Exo|AMMO|Teren)/i,kw:/\bmud\b|blato|terrain|teren|diorama|voda|water|puddle|trava|grass/i},
 {key:"gusjenice",icon:"⚙️",name:"Gusjenice i kotači",cats:null,kw:/track|tračnic|kotač|wheel|gusjenic|steel|čelik/i},
 {key:"oznake",icon:"🎖️",name:"Oznake i markeri",cats:/^(AK Markeri|Playmarker|QUICK MARKER|Markeri)/i,kw:/marker|flomaster/i},
];
let planMaketaId=null,planDraft=null;
function planOwned(){
  const out=[];
  for(const [cat,cd] of Object.entries(S.inventar)){(cd.items||[]).forEach(it=>{if(it.status==="imam")out.push({cat,it});});}
  return out;
}
function planItemById(id){
  for(const cd of Object.values(S.inventar)){const f=(cd.items||[]).find(i=>i.id===id);if(f)return f;}
  return null;
}
const PLAN_COLOR_CATS=/^(3Gen|Real Colors|VALLEJO|Model Air|ACRYLIC COLOR|QUICK GEN|AK Gouache|Akrilne|Gvaš)/i;
function planItemCat(id){
  for(const [cat,cd] of Object.entries(S.inventar)){if((cd.items||[]).some(i=>i.id===id))return cat;}
  return "";
}
function planSuggest(task){
  const res=[];
  planOwned().forEach(({cat,it})=>{
    const byCat=task.cats?task.cats.test(cat):false;
    const text=[it.name,it.desc,(it.tags||[]).join(" "),it.code].join(" ");
    const byKw=task.kw?task.kw.test(text):false;
    if(byCat||byKw)res.push({cat,it,byCat});
  });
  res.sort((a,b)=>(Number(b.byCat)-Number(a.byCat))||a.cat.localeCompare(b.cat)||String(a.it.name).localeCompare(String(b.it.name)));
  return res;
}
function openPlanModal(id){
  const m=S.makete.find(x=>x.id===id);if(!m)return;
  planMaketaId=id;
  const p=m.plan||{};
  planDraft={tasks:[...(p.tasks||[])],products:JSON.parse(JSON.stringify(p.products||{})),extra:[...(p.extra||[])]};
  document.getElementById("planModalTitle").textContent="🛠️ Plan radova — "+m.name;
  document.getElementById("planNote").value=p.note||"";
  document.getElementById("planExtraSearch").value="";
  renderPlanTasks();renderPlanSections();renderPlanExtra("");
  document.getElementById("planModal").style.display="flex";
}
function closePlanModal(){
  document.getElementById("planModal").style.display="none";
  planMaketaId=null;planDraft=null;
}
function togglePlanTask(key){
  const i=planDraft.tasks.indexOf(key);
  if(i>=0)planDraft.tasks.splice(i,1);else planDraft.tasks.push(key);
  renderPlanTasks();renderPlanSections();
}
function renderPlanTasks(){
  document.getElementById("planTasks").innerHTML=PLAN_TASKS.map(t=>`<button type="button" class="plan-chip${planDraft.tasks.includes(t.key)?" on":""}" onclick="togglePlanTask('${t.key}')">${t.icon} ${esc(t.name)}</button>`).join("");
}
function renderPlanSections(){
  const wrap=document.getElementById("planSections");
  if(!planDraft.tasks.length){wrap.innerHTML='<div class="plan-empty">Označi barem jedan rad iznad — ovdje će se ponuditi boje i proizvodi iz tvog inventara.</div>';return;}
  wrap.innerHTML=PLAN_TASKS.filter(t=>planDraft.tasks.includes(t.key)).map(t=>{
    const sug=planSuggest(t);
    const chosen=new Set(planDraft.products[t.key]||[]);
    const rows=sug.length?sug.map(({cat,it})=>{
      const sw=getSwatches(it)[0];
      return `<label class="plan-prod"><input type="checkbox" ${chosen.has(it.id)?"checked":""} onchange="togglePlanProduct('${t.key}','${esc(it.id)}',this.checked)"><span class="color-swatch" style="${sw?`background:${esc(sw)}`:"visibility:hidden"}"></span><span class="pc">${esc(it.code||"–")}</span><span class="pn" title="${esc(it.name)}">${esc(it.name)}</span><span class="pk">${esc(cat.replace(/\s*\(.*$/,""))}</span></label>`;
    }).join(""):'<div class="plan-empty">Nemaš ništa u inventaru za ovaj rad — dodaj proizvod ispod ili ga stavi u Želje.</div>';
    return `<div class="plan-sec"><div class="plan-sec-h">${t.icon} ${esc(t.name)}<span class="plan-sec-n" data-plan-n="${t.key}">${chosen.size?"odabrano "+chosen.size:""}</span></div><div class="plan-list">${rows}</div></div>`;
  }).join("");
}
function togglePlanProduct(task,id,on){
  const a=planDraft.products[task]=planDraft.products[task]||[];
  const i=a.indexOf(id);
  if(on&&i<0)a.push(id);
  if(!on&&i>=0)a.splice(i,1);
  const el=document.querySelector('[data-plan-n="'+task+'"]');
  if(el)el.textContent=a.length?"odabrano "+a.length:"";
}
function renderPlanExtra(q){
  const box=document.getElementById("planExtraResults");
  const chips=planDraft.extra.map(id=>{
    const it=planItemById(id);if(!it)return "";
    const sw=getSwatches(it)[0];
    return `<span class="model-color-pill">${sw?`<span class="color-swatch" style="background:${esc(sw)}"></span>`:""}${esc(it.code&&it.code!=="–"?it.code:it.name)}<span class="color-chip-x" style="cursor:pointer;margin-left:4px" onclick="removePlanExtra('${esc(id)}')">✕</span></span>`;
  }).join("");
  let res="";
  q=(q||"").trim().toLowerCase();
  if(q.length>=2){
    const taken=new Set(planDraft.extra);
    const found=planOwned().filter(({it})=>!taken.has(it.id)&&[it.code,it.name,(it.tags||[]).join(" ")].join(" ").toLowerCase().includes(q)).slice(0,8);
    res=found.length?found.map(({cat,it})=>{
      const sw=getSwatches(it)[0];
      return `<div class="plan-prod" onclick="addPlanExtra('${esc(it.id)}')"><span class="color-swatch" style="${sw?`background:${esc(sw)}`:"visibility:hidden"}"></span><span class="pc">${esc(it.code||"–")}</span><span class="pn">${esc(it.name)}</span><span class="pk">${esc(cat.replace(/\s*\(.*$/,""))} · + dodaj</span></div>`;
    }).join(""):'<div class="plan-empty">Nema rezultata u tvom inventaru.</div>';
  }
  box.innerHTML=(chips?`<div style="margin:4px 0">${chips}</div>`:"")+res;
}
function addPlanExtra(id){
  if(!planDraft.extra.includes(id))planDraft.extra.push(id);
  renderPlanExtra(document.getElementById("planExtraSearch").value);
}
function removePlanExtra(id){
  planDraft.extra=planDraft.extra.filter(x=>x!==id);
  renderPlanExtra(document.getElementById("planExtraSearch").value);
}
function savePlan(){
  const m=S.makete.find(x=>x.id===planMaketaId);if(!m)return;
  const products={};
  planDraft.tasks.forEach(k=>{const a=(planDraft.products[k]||[]).filter(id=>planItemById(id));if(a.length)products[k]=a;});
  const note=document.getElementById("planNote").value.trim();
  m.plan={tasks:[...planDraft.tasks],products,extra:planDraft.extra.filter(id=>planItemById(id)),note};
  if(!m.plan.tasks.length&&!m.plan.extra.length&&!note)delete m.plan;
  let added=0;
  if(document.getElementById("planSyncColors").checked){
    const ids=new Set([...Object.values(products).flat(),...(m.plan?m.plan.extra:[])]);
    m.colors=m.colors||[];
    ids.forEach(id=>{
      const it=planItemById(id);if(!it)return;
      const code=(it.code||"").trim();
      if(!code||code==="–")return;
      if(!PLAN_COLOR_CATS.test(planItemCat(id)))return; // samo prave boje (akril, lak, gvaš, Vallejo, Quick Gen…), ne kit/pigmente/markere
      if(!m.colors.includes(code)){m.colors.push(code);added++;}
    });
  }
  save();closePlanModal();renderMakete();
  showToast("🛠️ Plan spremljen"+(added?` · ${added} boja dodano u BOJE`:""));
}
function planCardHtml(m){
  const p=m.plan;
  if(!p||(!(p.tasks||[]).length&&!(p.extra||[]).length&&!p.note))return "";
  const chip=id=>{
    const it=planItemById(id);if(!it)return "";
    const sw=getSwatches(it)[0];
    return `<span class="model-color-pill" title="${esc(it.name)}">${sw?`<span class="color-swatch" style="background:${esc(sw)}"></span>`:""}${esc(it.code&&it.code!=="–"?it.code:it.name)}</span>`;
  };
  const rows=(p.tasks||[]).map(k=>{
    const t=PLAN_TASKS.find(x=>x.key===k);if(!t)return "";
    const ids=(p.products||{})[k]||[];
    return `<div class="model-plan-row"><b>${t.icon} ${esc(t.name)}</b>${ids.map(chip).join("")}</div>`;
  }).join("");
  const ex=(p.extra||[]).length?`<div class="model-plan-row"><b>➕ Ostalo</b>${p.extra.map(chip).join("")}</div>`:"";
  const note=p.note?`<div class="model-plan-note">${esc(p.note)}</div>`:"";
  return `<div class="model-plan"><div class="model-colors-lbl">Plan radova</div>${rows}${ex}${note}</div>`;
}
// ── TIP IZRADE BOJA (po maketi): izvedba/razdoblje -> boje iz kataloga + materijali ──
const PAINT_SCHEMES=[
 {key:"dak",icon:"🏜️",name:"DAK – Afrika Korps (1941–43)",period:"Sjeverna Afrika · pustinjska kamuflaža",
  match:/sd\.?\s*kfz\.?\s*2\d\d|tiger/i,
  note:"Vozila DAK-a: osnova RAL 8000 Gelbbraun, često s kamuflažnim mrljama RAL 7008 Graugrün; od 1943. Dunkelgelb RAL 7028. Jako prašnjavo – puno pustinjske prašine i pijeska.",
  paints:[
   {role:"Osnovna boja – Gelbbraun (RAL 8000)",ak:"AK11327",rc:"RC861"},
   {role:"Kamuflažne mrlje – Graugrün (RAL 7008)",ak:"AK11313",rc:"RC853"},
   {role:"Alternativa od 1943. – Dunkelgelb (RAL 7028)",ak:"AK11318",rc:"RC859",alt:["RCM018","RC860"]},
   {role:"Gume i gumeni dijelovi",ak:"AK11027",rc:"RC805",alt:["RCM001"]},
   {role:"Oznake (križ, brojevi)",ak:"AK11001",rc:"RC806",alt:["RCM034"]}],
  mats:[
   {code:"AK022",name:"Africa Dust Effects",why:"prašina Sahare po cijelom vozilu"},
   {code:"AK041",name:"North Africa Dust (pigment)",why:"suhi pigment za nanose prašine"},
   {code:"AK015",name:"Dust Effects",why:"opća prašina"},
   {code:"AK4061",name:"Sand Yellow Deposit",why:"pješčani nanosi"},
   {code:"AK4062",name:"Light Dust Deposit",why:"svijetla prašina"},
   {code:"AMIG1001",name:"Afrika Korps Wash",why:"wash za pustinjske tonove"},
   {code:"AK2073",name:"Paneliner za pijesak i pustinju",why:"panel linije na svijetloj bazi"},
   {code:"AK10009",name:"Watercolor Pencil – Sand",why:"pješčani tragovi olovkom"},
   {code:"AK10026",name:"Watercolor Pencil – Dust/Rainmarks",why:"tragovi prašine i kiše"},
   {code:"AKG-03",name:"Sand (gvaš)",why:"pijesak u slojevima"},
   {code:"AK048",name:"Pigment Fixer",why:"fiksiranje pigmenata"},
   {code:"AK11237",name:"Matt Varnish",why:"završni mat lak"}]},
 {key:"poljska",icon:"🌾",name:"Poljska i Francuska (1939–40)",period:"Rani rat · Panzergrau",
  match:/sd\.?\s*kfz\.?\s*2\d\d/i,
  note:"Rani rat: vozila u jednobojnom tamnosivom (Panzergrau, RAL 7021) s bijelim Balkenkreuz oznakama. Suhe ceste – lagana prašina i zemlja, malo hrđe, vozilo uglavnom čisto održavano.",
  paints:[
   {role:"Osnovna boja – Panzergrau (RAL 7021)",ak:"AK11316",rc:"RC856",alt:["RCM017","RC057"]},
   {role:"Gume i gumeni dijelovi",ak:"AK11027",rc:"RC805",alt:["RCM001"]},
   {role:"Oznake (križevi, brojevi)",ak:"AK11001",rc:"RC806",alt:["RCM034"]}],
  mats:[
   {code:"AK042",name:"Europe Earth",why:"europska zemlja na donjem dijelu i gumama"},
   {code:"AK017",name:"Earth Effects",why:"zemlja i blato"},
   {code:"AK015",name:"Dust Effects",why:"lagana prašina"},
   {code:"AK4062",name:"Light Dust Deposit",why:"svijetla prašina"},
   {code:"AK046",name:"Light Rust Wash",why:"lagana hrđa na ispuhu i alatu"},
   {code:"AK12102",name:"Precision Paneliner – Black",why:"panel linije na tamnoj bazi"},
   {code:"AK10026",name:"Watercolor Pencil – Dust/Rainmarks",why:"tragovi prašine i kiše"},
   {code:"AK048",name:"Pigment Fixer",why:"fiksiranje pigmenata"},
   {code:"AK11237",name:"Matt Varnish",why:"završni mat lak"}]},
 {key:"barbarossa",icon:"🌲",name:"Istočno ratište – Operacija Barbarossa (1941)",period:"SSSR · Panzergrau, prašina i blato",
  match:/sd\.?\s*kfz\.?\s*2\d\d/i,
  note:"Ljeto/jesen 1941.: Panzergrau (RAL 7021) uz jako prašnjave ruske ceste, a u jesen blato. Vozila su često jako zaprljana, s tragovima kiše i zemlje.",
  paints:[
   {role:"Osnovna boja – Panzergrau (RAL 7021)",ak:"AK11316",rc:"RC856",alt:["RCM017","RC057"]},
   {role:"Gume i gumeni dijelovi",ak:"AK11027",rc:"RC805",alt:["RCM001"]},
   {role:"Oznake (križevi, taktički brojevi)",ak:"AK11001",rc:"RC806",alt:["RCM034"]}],
  mats:[
   {code:"AK015",name:"Dust Effects",why:"ljetna prašina cesta"},
   {code:"AK4062",name:"Light Dust Deposit",why:"svijetla prašina"},
   {code:"AK042",name:"Europe Earth",why:"zemlja"},
   {code:"AK078",name:"Damp Earth Effects",why:"vlažna zemlja / jesensko blato"},
   {code:"AK017",name:"Earth Effects",why:"zemlja i blato"},
   {code:"AK4063",name:"Brown Earth Deposit",why:"smeđe nanosi zemlje"},
   {code:"AK081",name:"Dark Earth (pigment)",why:"tamna zemlja"},
   {code:"AKG06",name:"Dry Mud (gvaš)",why:"osušeno blato"},
   {code:"AK046",name:"Light Rust Wash",why:"hrđa"},
   {code:"AK12102",name:"Precision Paneliner – Black",why:"panel linije"},
   {code:"AK048",name:"Pigment Fixer",why:"fiksiranje pigmenata"},
   {code:"AK11237",name:"Matt Varnish",why:"završni mat lak"}]},
 {key:"dunkelgelb",icon:"🟨",name:"Dunkelgelb 1943–45 (troton kamuflaža)",period:"Kasni rat · Dunkelgelb + Olivgrün + Rotbraun",
  match:/panzer\s*iv|stug|tiger/i,
  note:"Od 1943.: osnova Dunkelgelb (RAL 7028), preko nje mrlje ili linije Olivgrün (RAL 6003) i Rotbraun (RAL 8017). Tvornički Dunkelgelb često i bez kamuflaže (StuG III G 1943.).",
  paints:[
   {role:"Osnovna boja – Dunkelgelb (RAL 7028)",ak:"AK11318",rc:"RC859",alt:["RCM018"]},
   {role:"Dunkelgelb – izdanje 1944.",ak:"AK11319",rc:"RC860"},
   {role:"Kamuflaža – Olivgrün (RAL 6003)",ak:"AK11309",rc:"RC852"},
   {role:"Kamuflaža – Rotbraun (RAL 8017)",ak:"AK11330",rc:"RC864",alt:["RC862"]},
   {role:"Gume i gumeni dijelovi",ak:"AK11027",rc:"RC805",alt:["RCM001"]},
   {role:"Oznake",ak:"AK11001",rc:"RC806",alt:["RCM034"]}],
  mats:[
   {code:"AK046",name:"Light Rust Wash",why:"hrđa"},
   {code:"AK4063",name:"Brown Earth Deposit",why:"zemlja"},
   {code:"AK078",name:"Damp Earth Effects",why:"vlažna zemlja"},
   {code:"AK017",name:"Earth Effects",why:"zemlja i blato"},
   {code:"AK015",name:"Dust Effects",why:"prašina"},
   {code:"AK12102",name:"Precision Paneliner – Black",why:"panel linije"},
   {code:"AK10042",name:"Watercolor Pencil Set – Chipping & Aging",why:"chipping i starenje"},
   {code:"AK10041",name:"Watercolor Pencil Set – Rust & Streaking",why:"hrđa i tragovi"},
   {code:"AK048",name:"Pigment Fixer",why:"fiksiranje pigmenata"},
   {code:"AK11237",name:"Matt Varnish",why:"završni mat lak"}]},
 {key:"zima",icon:"❄️",name:"Istočna fronta – zima (bijela kamuflaža)",period:"1941–44 · bijeli premaz preko osnove",
  match:/panzer\s*iv|stug|tiger/i,
  note:"Bijela periva boja nanosi se preko osnove (Panzergrau do 1942., poslije Dunkelgelb) i djelomično se stanjuje i ljušti, pa ispod probija osnovna boja.",
  paints:[
   {role:"Osnova do 1942. – Panzergrau (RAL 7021)",ak:"AK11316",rc:"RC856",alt:["RCM017"]},
   {role:"Osnova od 1943. – Dunkelgelb (RAL 7028)",ak:"AK11318",rc:"RC859",alt:["RCM018"]},
   {role:"Bijela periva boja (Washable White)",ak:"AK11372",rc:"",alt:["AK751"]},
   {role:"Bijela – obične oznake i dodiri",ak:"AK11001",rc:"RC806",alt:["RCM034"]},
   {role:"Gume i gumeni dijelovi",ak:"AK11027",rc:"RC805",alt:["RCM001"]}],
  mats:[
   {code:"AK751",name:"Washable White (periva bijela)",why:"zimski premaz koji se može stanjiti vodom"},
   {code:"AK10041",name:"Watercolor Pencil Set – Rust & Streaking",why:"hrđa i tragovi ispod bijele"},
   {code:"AK11028",name:"Smoke Black",why:"čađ oko ispuha"},
   {code:"AK12102",name:"Precision Paneliner – Black",why:"panel linije"},
   {code:"AK10042",name:"Watercolor Pencil Set – Chipping & Aging",why:"ljuštenje bijele boje"},
   {code:"AK048",name:"Pigment Fixer",why:"fiksiranje pigmenata"},
   {code:"AK11237",name:"Matt Varnish",why:"završni mat lak"}]},
 {key:"nato",icon:"🛡️",name:"NATO troton kamuflaža (1980-ih)",period:"Hladni rat · zelena / smeđa / crna",
  match:/grizzly|leopard|marder|m113/i,
  note:"NATO shema: tamnozelena osnova s smeđim i crnim poljima nepravilnog oblika (RAL 6031 F9, 8027 F9, 9021 F9).",
  paints:[
   {role:"Osnova – NATO Green",ak:"AK11358",rc:"RC886",alt:["RC080"]},
   {role:"Kamuflaža – NATO Brown",ak:"AK11359",rc:"RC887",alt:["RC081"]},
   {role:"Kamuflaža – NATO Black",ak:"AK11360",rc:"RC888",alt:["RC082"]},
   {role:"Gume i gumeni dijelovi",ak:"AK11027",rc:"RC805",alt:["RCM001"]}],
  mats:[
   {code:"AK015",name:"Dust Effects",why:"prašina"},
   {code:"AK042",name:"Europe Earth",why:"europska zemlja"},
   {code:"AK078",name:"Damp Earth Effects",why:"vlažna zemlja"},
   {code:"AK4063",name:"Brown Earth Deposit",why:"zemlja"},
   {code:"AK12102",name:"Precision Paneliner – Black",why:"panel linije"},
   {code:"AK10042",name:"Watercolor Pencil Set – Chipping & Aging",why:"chipping"},
   {code:"AK048",name:"Pigment Fixer",why:"fiksiranje pigmenata"},
   {code:"AK11237",name:"Matt Varnish",why:"završni mat lak"}]},
 {key:"usmc",icon:"🪖",name:"Pustinjska shema (CARC Tan / Desert Sand)",period:"1990-ih i kasnije · pustinjska oklopna vozila",
  match:/m60|marine|abrams|bradley/i,
  note:"Moderna pustinjska vozila: CARC Tan 686A (FS 33446) ili Desert Sand (FS 30279) kao jednobojni premaz, uz jaku prašinu i pijesak.",
  paints:[
   {role:"Osnovna boja – CARC Tan 686A",ak:"AK11349",rc:"RC885",alt:["RC079"]},
   {role:"Alternativa – Desert Sand (FS 30279)",ak:"AK11340",rc:"RC897",alt:["RC032"]},
   {role:"Gume i gumeni dijelovi",ak:"AK11027",rc:"RC805",alt:["RCM001"]}],
  mats:[
   {code:"AK022",name:"Africa Dust Effects",why:"pustinjska prašina"},
   {code:"AK041",name:"North Africa Dust (pigment)",why:"suhi pigment prašine"},
   {code:"AK4061",name:"Sand Yellow Deposit",why:"pješčani nanosi"},
   {code:"AK015",name:"Dust Effects",why:"opća prašina"},
   {code:"AK2073",name:"Paneliner za pijesak i pustinju",why:"panel linije"},
   {code:"AK10009",name:"Watercolor Pencil – Sand",why:"pješčani tragovi"},
   {code:"AK11672",name:"Tracks And Wheels",why:"gusjenice i kotači"},
   {code:"AK8022",name:"Terrains Sandy Desert",why:"pjeskovita podloga / baza"},
   {code:"AK048",name:"Pigment Fixer",why:"fiksiranje pigmenata"},
   {code:"AK11237",name:"Matt Varnish",why:"završni mat lak"}]},
];
let schemeMaketaId=null,schemeSel=null;
const schNorm=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
function schOwned(){
  // normalizirana šifra -> {cat,it} za sve stavke koje imam
  const map={};
  for(const [cat,cd] of Object.entries(S.inventar)){(cd.items||[]).forEach(it=>{if(it.status==="imam"&&schNorm(it.code))map[schNorm(it.code)]={cat,it};});}
  return map;
}
function schEquiv(code){return (typeof EQUIV_DATA!=="undefined"&&EQUIV_DATA.find(e=>e.code===code))||null;}
function schRc(code){return (typeof REALCOLORS_DATA!=="undefined"&&REALCOLORS_DATA.find(e=>e.code===code))||null;}
function schPaintInfo(p,owned){
  const e=schEquiv(p.ak),r=p.rc?schRc(p.rc):null;
  const codes=[p.ak,p.rc,...(p.alt||[])].filter(Boolean);
  const hit=codes.find(c=>owned[schNorm(c)]);
  const sub=[];
  if(e){if(e.ral)sub.push("RAL "+e.ral);if(e.fs)sub.push("FS "+e.fs);if(e.vallejo)sub.push("Vallejo "+e.vallejo);if(e.tamiya)sub.push("Tamiya "+e.tamiya);}
  const hi=hit?owned[schNorm(hit)]:null;
  const isMarker=!!(hi&&/marker|flomaster/i.test(hi.cat));
  const setName=hi&&hi.it.subgroup&&hi.it.subgroup!==hi.it.name?hi.it.subgroup:"";
  return {name:e?e.name:(r?r.name:p.role),swatch:e?e.swatch:null,hit,hitCat:hi?hi.cat:"",isMarker,setName,sub:sub.join(" · "),codes};
}
function schWishCat(code){return mapCat45(_schWishCatOld(code));}
function _schWishCatOld(code){
  const c=schNorm(code);
  if(/^AK11\d{3}$/.test(c))return "3Gen Acrylic Colors (3. generacija akrilnih boja)";
  if(/^RC\d{3}$/.test(c))return "Real Colors";
  if(/^AK406\d$/.test(c))return "Deposits (naslage)";
  if(/^AK(041|081)$/.test(c))return "Pigments (pigmenti)";
  if(/^AK100\d\d$/.test(c))return "Oil Pencil (uljne bojice)";
  if(/^AMIG/.test(c))return "AMMO by Mig";
  if(/^AK80\d\d$/.test(c))return "Textures";
  if(/^AK(015|017|022|042|046|078|2073|12102)$/.test(c))return "Effects (efekti)";
  return "Ostalo";
}
function openSchemeModal(id){
  const m=S.makete.find(x=>x.id===id);if(!m)return;
  schemeMaketaId=id;schemeSel=m.scheme||null;
  document.getElementById("schemeModalTitle").textContent="🎨 Tip izrade boja — "+m.name;
  document.getElementById("schemeClearBtn").style.display=m.scheme?"":"none";
  renderSchemeTabs();renderSchemeDetail();
  document.getElementById("schemeModal").style.display="flex";
}
function closeSchemeModal(){document.getElementById("schemeModal").style.display="none";schemeMaketaId=null;schemeSel=null;}
function pickScheme(key){schemeSel=key;renderSchemeTabs();renderSchemeDetail();}
function renderSchemeTabs(){
  const m=S.makete.find(x=>x.id===schemeMaketaId);if(!m)return;
  const hay=[m.name,m.code,m.mfr].join(" ");
  const rec=PAINT_SCHEMES.filter(s=>s.match.test(hay)),oth=PAINT_SCHEMES.filter(s=>!s.match.test(hay));
  const chip=s=>`<button type="button" class="sch-chip${schemeSel===s.key?" on":""}" onclick="pickScheme('${s.key}')">${s.icon} ${esc(s.name)}</button>`;
  document.getElementById("schemeTabs").innerHTML=
    (rec.length?`<div class="sch-lbl">⭐ Preporučeno za ovu maketu</div><div class="sch-chips">${rec.map(chip).join("")}</div>`:"")+
    (oth.length?`<div class="sch-lbl">${rec.length?"Ostali tipovi izrade":"Tipovi izrade"}</div><div class="sch-chips">${oth.map(chip).join("")}</div>`:"");
}
function renderSchemeDetail(){
  const box=document.getElementById("schemeDetail");
  const s=PAINT_SCHEMES.find(x=>x.key===schemeSel);
  if(!s){box.innerHTML='<div class="plan-empty">Odaberi tip izrade iznad — prikazat će se boje i materijali.</div>';return;}
  const owned=schOwned();
  const paintRows=s.paints.map(p=>{
    const i=schPaintInfo(p,owned);
    return `<div class="sch-row"><span class="color-swatch" style="${i.swatch?`background:${esc(i.swatch)}`:"visibility:hidden"}"></span>
      <div class="sch-main"><div class="sch-role">${esc(p.role)}</div>
      <div class="sch-sub"><span class="sch-code">${esc(p.ak)}</span> ${esc(i.name)}${p.rc?` · Real Colors <span class="sch-code">${esc(p.rc)}</span>`:""}${i.sub?` · ${esc(i.sub)}`:""}${i.isMarker&&i.setName?` · <b>flomaster u kompletu: ${esc(i.setName)}</b>`:(i.isMarker?" · <b>imaš kao flomaster</b>":"")}</div></div>
      ${i.hit?`<span class="sch-st ok" title="${esc(i.hitCat)}${i.setName?" · "+esc(i.setName):""}">✓ imam (${esc(i.hit)}${i.isMarker?" · flomaster":""})</span>`:'<span class="sch-st no">✗ nemam</span>'}</div>`;
  }).join("");
  const matRows=s.mats.map(x=>{
    const o=owned[schNorm(x.code)];
    return `<div class="sch-row"><div class="sch-main"><div class="sch-role"><span class="sch-code">${esc(x.code)}</span> ${esc(o?o.it.name:x.name)}</div>
      <div class="sch-sub">${esc(x.why)}${o?` · ${esc(o.cat.replace(/\s*\(.*$/,""))}`:""}</div></div>
      ${o?'<span class="sch-st ok">✓ imam</span>':'<span class="sch-st no">✗ nemam</span>'}</div>`;
  }).join("");
  const pHave=s.paints.filter(p=>schPaintInfo(p,owned).hit).length,mHave=s.mats.filter(x=>owned[schNorm(x.code)]).length;
  box.innerHTML=`<div class="sch-detail"><h4>${s.icon} ${esc(s.name)}</h4><div class="sch-note">${esc(s.period)} — ${esc(s.note)}</div>
    <div class="sch-h">🎨 Boje (${pHave}/${s.paints.length} imaš)</div>${paintRows}
    <div class="sch-h">🧰 Materijali i efekti (${mHave}/${s.mats.length} imaš)</div>${matRows}</div>`;
}
function saveScheme(){
  const m=S.makete.find(x=>x.id===schemeMaketaId);if(!m)return;
  const s=PAINT_SCHEMES.find(x=>x.key===schemeSel);
  if(!s){showToast("Prvo odaberi tip izrade");return;}
  m.scheme=s.key;
  const owned=schOwned();
  let addedColors=0,addedWish=0;
  if(document.getElementById("schemeSyncColors").checked){
    m.colors=m.colors||[];
    s.paints.forEach(p=>{
      const i=schPaintInfo(p,owned);if(!i.hit)return;
      const oi=owned[schNorm(i.hit)];
      if(!PLAN_COLOR_CATS.test(oi.cat)&&!/marker|flomaster/i.test(oi.cat))return;   // boje i flomasteri u boji
      const code=oi.it.code;
      if(code&&code!=="–"&&!m.colors.includes(code)){m.colors.push(code);addedColors++;}
    });
  }
  if(document.getElementById("schemeAddWish").checked){
    const inWish=new Set((S.zelje||[]).map(w=>schNorm(w.code)));
    const add=(code,name)=>{
      const k=schNorm(code);if(!k||inWish.has(k)||owned[k])return;
      S.zelje.push({id:"w_"+Date.now()+"_"+Math.random().toString(36).slice(2,7),cat:schWishCat(code),code,name,desc:"",price:"–",prio:3,note:`Za: ${m.name} · ${s.name}`});
      inWish.add(k);addedWish++;
    };
    s.paints.forEach(p=>{const i=schPaintInfo(p,owned);if(!i.hit)add(p.ak,i.name);});
    s.mats.forEach(x=>{if(!owned[schNorm(x.code)])add(x.code,x.name);});
  }
  save();closeSchemeModal();renderMakete();
  if(typeof renderZelje==="function"&&addedWish)renderZelje();
  showToast(`🎨 ${s.name}`+(addedColors?` · ${addedColors} boja u BOJE`:"")+(addedWish?` · ${addedWish} u Želje`:""));
}
function clearScheme(){
  const m=S.makete.find(x=>x.id===schemeMaketaId);if(!m)return;
  delete m.scheme;save();closeSchemeModal();renderMakete();showToast("Tip izrade uklonjen");
}
function schemeCardHtml(m){
  const s=PAINT_SCHEMES.find(x=>x.key===m.scheme);if(!s)return "";
  const owned=schOwned();
  const infos=s.paints.map(p=>({p,i:schPaintInfo(p,owned)}));
  const pHave=infos.filter(x=>x.i.hit).length,mHave=s.mats.filter(x=>owned[schNorm(x.code)]).length;
  const chips=infos.map(({p,i})=>`<span class="model-color-pill${i.hit?"":" miss"}" title="${esc(p.role)}${i.hit?"":" – nemam"}">${i.swatch?`<span class="color-swatch" style="background:${esc(i.swatch)}"></span>`:""}${esc(i.hit||p.ak)}</span>`).join("");
  return `<div class="model-scheme" onclick="openSchemeModal('${m.id}')" title="Klikni za boje i materijale"><div class="model-colors-lbl">Tip izrade</div>
    <div class="model-scheme-title">${s.icon} ${esc(s.name)}</div>
    <div class="model-scheme-sub">Boje: ${pHave}/${s.paints.length} imaš · Materijali: ${mHave}/${s.mats.length} imaš</div>${chips}</div>`;
}
function openReceptiModal(maketaId){
  const m=S.makete.find(x=>x.id===maketaId);if(!m)return;
  receptiMaketaId=maketaId;
  document.getElementById("receptiModalTitle").textContent=`🧪 Recepti boja — ${m.name}`;
  cancelReceptForm();
  renderReceptiList();
  document.getElementById("receptiModal").style.display="flex";
}
function closeReceptiModal(){
  document.getElementById("receptiModal").style.display="none";
  receptiMaketaId=null;
}
function renderReceptiList(){
  const m=S.makete.find(x=>x.id===receptiMaketaId);
  const list=document.getElementById("receptiList");
  if(!list)return;
  if(!m){list.innerHTML="";return;}
  const recepti=m.recepti||[];
  if(!recepti.length){
    list.innerHTML='<div style="color:var(--muted);font-size:12px;padding:.25rem 0 .5rem">Još nema spremljenih recepata za ovu maketu.</div>';
    return;
  }
  list.innerHTML=[...recepti].sort((a,b)=>(b.createdAt||0)-(a.createdAt||0)).map(r=>`
    <div class="recept-card" data-id="${esc(r.id)}">
      <div class="recept-name">${esc(r.name)}</div>
      ${r.sastojci?`<div class="recept-sastojci">${esc(r.sastojci)}</div>`:""}
      ${r.napomena?`<div class="recept-note">${esc(r.napomena)}</div>`:""}
      <div class="recept-actions">
       <button class="wish-btn" onclick="openReceptForm('${esc(r.id)}')">✎ Uredi</button>
       <button class="wish-btn del" onclick="delRecept('${esc(r.id)}')">✕</button>
      </div>
    </div>`).join("");
}
function openReceptForm(id=null){
  rcEditId=id;
  const m=S.makete.find(x=>x.id===receptiMaketaId);
  const r=id&&m?(m.recepti||[]).find(x=>x.id===id):null;
  document.getElementById("rcNaziv").value=r?.name||"";
  document.getElementById("rcSastojci").value=r?.sastojci||"";
  document.getElementById("rcNapomena").value=r?.napomena||"";
  document.getElementById("receptFormWrap").style.display="block";
  setTimeout(()=>document.getElementById("rcNaziv").focus(),50);
}
function cancelReceptForm(){
  rcEditId=null;
  const wrap=document.getElementById("receptFormWrap");
  if(wrap)wrap.style.display="none";
  ["rcNaziv","rcSastojci","rcNapomena"].forEach(id=>{const el=document.getElementById(id);if(el)el.value="";});
}
function submitRecept(){
  const name=document.getElementById("rcNaziv").value.trim();
  if(!name){document.getElementById("rcNaziv").focus();return;}
  const sastojci=document.getElementById("rcSastojci").value.trim();
  const napomena=document.getElementById("rcNapomena").value.trim();
  const m=S.makete.find(x=>x.id===receptiMaketaId);
  if(!m)return;
  if(!m.recepti)m.recepti=[];
  if(rcEditId){
    const r=m.recepti.find(x=>x.id===rcEditId);
    if(r)Object.assign(r,{name,sastojci,napomena});
  }else{
    m.recepti.push({id:"rc_"+Date.now(),name,sastojci,napomena,createdAt:Date.now()});
  }
  save();cancelReceptForm();renderReceptiList();renderMakete();
  showToast("✓ Recept spremljen");
}
async function delRecept(id){
  const m=S.makete.find(x=>x.id===receptiMaketaId);if(!m)return;
  const idx=(m.recepti||[]).findIndex(x=>x.id===id);if(idx<0)return;
  const [removed]=m.recepti.splice(idx,1);
  save();renderReceptiList();renderMakete();
  showToastAction(`Uklonjen recept: ${removed.name}`,"Poništi",()=>{
    m.recepti.splice(Math.min(idx,m.recepti.length),0,removed);
    save();renderReceptiList();renderMakete();
  });
}

// ── KATALOG TAKTIČKIH OZNAKA (izvučeno iz Katalog_oznaka_MAKETE.docx) ──

// ── TAKTIČKE OZNAKE (galerija referentnih slika iz Katalog_oznaka_MAKETE.docx) ──
let oznakeFilter="sve";
function ozLabel(cat){const c=OZNAKE_CATS.find(x=>x.id===cat);return c?c.label:cat;}
function renderOznakeFilterTabs(){
  const el=document.getElementById("oznakeFilterTabs");
  if(!el)return;
  el.innerHTML='<button class="ftab active-izv" data-oz="sve" onclick="setOznakeFilter(\'sve\')">Sve ('+OZNAKE_DATA.length+')</button>'+
    OZNAKE_CATS.map(c=>{
      const cnt=OZNAKE_DATA.filter(o=>o.cat===c.id).length;
      return `<button class="ftab" data-oz="${c.id}" onclick="setOznakeFilter('${c.id}')">${esc(c.label)} (${cnt})</button>`;
    }).join("");
}
function setOznakeFilter(f){
  oznakeFilter=f;
  document.querySelectorAll("#oznakeFilterTabs .ftab").forEach(btn=>btn.classList.toggle("active-izv",btn.dataset.oz===f));
  renderOznake();
}
function oznakeFiltered(){
  const q=search.toLowerCase();
  return OZNAKE_DATA.filter(o=>{
    const mF=oznakeFilter==="sve"||o.cat===oznakeFilter;
    const mQ=!q||o.caption.toLowerCase().includes(q)||(o.subgroup||"").toLowerCase().includes(q)||ozLabel(o.cat).toLowerCase().includes(q);
    return mF&&mQ;
  });
}
function renderOznake(){
  const grid=document.getElementById("oznakeGrid");
  if(!grid)return;
  const filtered=oznakeFiltered();
  const countEl=document.getElementById("oznakeCount");
  if(countEl)countEl.textContent=`${filtered.length} od ${OZNAKE_DATA.length} slika`;
  if(!filtered.length){grid.innerHTML='<div class="no-results">Nema rezultata za pretragu/filter.</div>';return;}
  grid.innerHTML=filtered.map(o=>`
    <div class="oznake-card" data-id="${esc(o.id)}" onclick="openOznakaLightbox('${esc(o.id)}')" title="Klikni za uvećani prikaz">
      <img src="${o.src}" alt="${esc(o.caption)}">
      <span class="oznake-zoom-hint">🔍</span>
      <div class="oznake-cap">${esc(o.caption)}</div>
      ${o.subgroup?`<div class="oznake-src">${esc(o.subgroup)}</div>`:""}
    </div>`).join("");
}
function openOznakaLightbox(id){
  const filtered=oznakeFiltered();
  const idx=filtered.findIndex(o=>o.id===id);
  if(idx<0)return;
  openLightbox(filtered.map(o=>({url:o.src,caption:o.subgroup?`${o.caption} — ${o.subgroup}`:o.caption})),idx);
}
// Pogodi kategoriju kataloga prema nazivu/proizvođaču/komentaru makete, da
// gumb "🎖️ Oznake" na kartici odmah otvori relevantnu skupinu slika.
const OZNAKE_KEYWORDS={
  tiger:["tiger","königstiger","kingtiger","king tiger"],
  panther:["panther","panter","jagdpanther"],
  stug:["stug","sturmgeschütz","jagdpanzer","elefant","ferdinand","nashorn","hetzer","brummbär","marder"],
  poluguse:["sdkfz 251","sd.kfz. 251","sd.kfz.251","sdkfz251","halftrack","half-track","poluguse"],
};
function guessOznakeCat(m){
  const t=((m.name||"")+" "+(m.mfr||"")+" "+(m.comment||"")).toLowerCase();
  for(const [cat,kws] of Object.entries(OZNAKE_KEYWORDS)){
    if(kws.some(k=>t.includes(k)))return cat;
  }
  return "sve";
}
function openOznakeForModel(maketaId){
  const m=S.makete.find(x=>x.id===maketaId);
  const cat=m?guessOznakeCat(m):"sve";
  search="";
  const si=document.getElementById("searchInput");if(si)si.value="";
  showPage("oznake",document.querySelector(".nav-tab.t-oznake"));
  setOznakeFilter(cat);
}
(function initOznakeFilterTabs(){renderOznakeFilterTabs();})();

function setModelImgTab(tab,btn){
  document.getElementById("mImgUrlDiv").style.display=tab==="url"?"block":"none";
  document.getElementById("mImgUpDiv").style.display=tab==="upload"?"block":"none";
  document.querySelectorAll("#modelModal .img-tab").forEach(t=>t.classList.remove("active"));
  const el=document.getElementById(tab==="url"?"mImgTabUrl":"mImgTabUp");if(el)el.classList.add("active");
}
function previewModelImg(){
  const url=document.getElementById("mmImgUrl").value.trim(),pv=document.getElementById("mmPreview"),pvEl=document.getElementById("mmPreviewEl");
  if(!url){pv.style.display="none";return;}pvEl.src=url;pvEl.onload=()=>pv.style.display="block";pvEl.onerror=()=>pv.style.display="none";
}
function handleModelDrop(e){e.preventDefault();const f=e.dataTransfer.files[0];if(!f||!f.type.startsWith("image/"))return;const r=new FileReader();r.onload=ev=>{mmImgData=ev.target.result;document.getElementById("mmPreviewEl").src=mmImgData;document.getElementById("mmPreview").style.display="block";};r.readAsDataURL(f);}
function handleModelFile(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{mmImgData=ev.target.result;document.getElementById("mmPreviewEl").src=mmImgData;document.getElementById("mmPreview").style.display="block";};r.readAsDataURL(f);}
function renderColorPicker(q){
  const list=document.getElementById("colorPickerList");list.innerHTML="";
  const allItems=Object.values(S.inventar).flatMap(cd=>cd.items);
  const items=allItems.filter(i=>{
    const qq=q.toLowerCase();
    return !qq||i.name.toLowerCase().includes(qq)||i.code.toLowerCase().includes(qq);
  }).slice(0,50);
  items.forEach(item=>{
    const sel=mmSelectedColors.has(item.code);
    const sw=getSwatches(item)[0]||null;
    const row=document.createElement("div");
    row.className=`color-pick-item${sel?" sel":""}`;
    row.innerHTML=`<input type="checkbox" ${sel?"checked":""}>
     ${sw?`<span class="color-swatch" style="background:${sw};width:14px;height:14px"></span>`:""}
     <span style="font-family:'DM Mono',monospace;font-size:10px;color:var(--muted);margin-right:4px">${esc(item.code)}</span>
     <span style="font-size:12px">${esc(item.name)}</span>`;
    row.onclick=()=>{
      if(mmSelectedColors.has(item.code))mmSelectedColors.delete(item.code);
      else mmSelectedColors.add(item.code);
      renderColorPicker(document.getElementById("mmColorSearch").value);
      renderColorChips();
    };
    list.appendChild(row);
  });
  if(!items.length)list.innerHTML='<div style="padding:8px 10px;font-size:12px;color:var(--muted)">Nema rezultata.</div>';
}
function renderColorChips(){
  const bar=document.getElementById("colorChipBar");if(!bar)return;
  if(!mmSelectedColors.size){bar.innerHTML='<span style="color:var(--muted);font-size:11px">Nema odabranih boja</span>';return;}
  const allItems=Object.values(S.inventar).flatMap(cd=>cd.items);
  bar.innerHTML=[...mmSelectedColors].map(code=>{
    const item=allItems.find(i=>i.code===code);
    const sw=item?(getSwatches(item)[0]||null):null;
    return `<span class="color-chip">${sw?`<span class="color-swatch" style="background:${sw}"></span>`:""}${esc(code)}<span class="color-chip-x" onclick="event.stopPropagation();mmSelectedColors.delete('${esc(code)}');renderColorPicker(document.getElementById('mmColorSearch').value);renderColorChips();">✕</span></span>`;
  }).join("");
}
function filterColorPicker(q){renderColorPicker(q);}
function submitModel(){
  const name=document.getElementById("mmName").value.trim();if(!name){document.getElementById("mmName").focus();return;}
  const imgUrl=document.getElementById("mmImgUrl").value.trim();
  const imgs=mmImgData?[{url:mmImgData}]:imgUrl?[{url:imgUrl}]:[];
  const obj={name,scale:document.getElementById("mmScale").value,code:document.getElementById("mmCode").value.trim(),
    mfr:document.getElementById("mmMfr").value.trim(),price:document.getElementById("mmPrice").value.trim(),status:document.getElementById("mmStatus").value,
    comment:document.getElementById("mmComment").value.trim(),refUrl:document.getElementById("mmRefUrl").value.trim(),
    stage:parseInt(document.getElementById("mmStage").value,10)||0,
    imgs,colors:[...mmSelectedColors]};
  if(mmEditId){const m=S.makete.find(x=>x.id===mmEditId);if(m)Object.assign(m,obj);}
  else S.makete.push({id:"m_"+Date.now(),...obj,createdAt:Date.now()});
  save();closeModelModal();renderMakete();renderStats();
}
function searchRefPhotos(){
  const name=document.getElementById("mmName").value.trim();
  if(!name){showToast("Prvo upiši naziv makete");return;}
  window.open("https://www.google.com/search?tbm=isch&q="+encodeURIComponent(name+" walkaround real vehicle"),"_blank","noopener");
}
async function delModel(id){
  const ok=await customConfirm("Ukloniti ovu maketu?","Ukloniti maketu?");
  if(!ok)return;
  const idx=S.makete.findIndex(x=>x.id===id);if(idx<0)return;
  const [removed]=S.makete.splice(idx,1);
  save();renderMakete();renderStats();
  showToastAction(`Uklonjeno: ${removed.name}`,"Poništi",()=>{
    S.makete.splice(Math.min(idx,S.makete.length),0,removed);
    save();renderMakete();renderStats();
  });
}

function goToProduct(code){
  // Find product in inventar
  let foundCat=null;
  for(const [cat,cd] of Object.entries(S.inventar)){
    if(cd.items.find(i=>i.code===code)){foundCat=cat;break;}
  }
  if(!foundCat){showToast(`${code} nije u inventaru`);return;}
  // Switch to inventar, search for code
  showPage("inventar",document.querySelector(".nav-tab.t-inv"));
  document.querySelector(".nav-tab.t-inv").classList.add("active");
  document.getElementById("searchInput").value=code;
  search=code;
  // Open that category
  safeSessionSet("o_"+foundCat,"1");
  render();
  // Scroll to it
  setTimeout(()=>{
    const el=document.querySelector(`[data-id]`);
    if(el)el.scrollIntoView({behavior:"smooth",block:"center"});
  },200);
  showToast(`→ ${code} u kategoriji "${foundCat}"`);
}
// 15 koraka redoslijeda bojanja — kratki podaci za praćenje faze izrade po maketi
// (puni opisi i vremena ostaju samo u HTML tablici na stranici "Redoslijed izrade",
// ovdje se ne dupliciraju da se izbjegne nesklad ako se tablica ikad izmijeni).
const REDOSLIJED_STEPS=[
  {n:1,icon:"🧼",name:"Pranje modela"},
  {n:2,icon:"🌫️",name:"Primer (temeljni premaz)"},
  {n:3,icon:"🌑",name:"Pre-shading"},
  {n:4,icon:"🎨",name:"Osnovna boja (base coat)"},
  {n:5,icon:"🦎",name:"Kamuflažni uzorak"},
  {n:6,icon:"✨",name:"Gloss lak (sjajni lak)"},
  {n:7,icon:"🏷️",name:"Dekali (naljepnice)"},
  {n:8,icon:"🔒",name:"Gloss zatvaranje dekala"},
  {n:9,icon:"🌗",name:"Filter tehnika (opcionalno)"},
  {n:10,icon:"🖌️",name:"Wash"},
  {n:11,icon:"🔲",name:"Matt / satin lak"},
  {n:12,icon:"🪨",name:"Chipping"},
  {n:13,icon:"🚜",name:"Weathering"},
  {n:14,icon:"🧱",name:"Pigmenti"},
  {n:15,icon:"🛡️",name:"Završni zaštitni lak"},
];
// Faze spremljene prije dodavanja 4 nova koraka (stara numeracija 1–11) -> nova numeracija 1–15
// Jednokratno (na zahtjev korisnika): iz Inventara se uklanjaju svi proizvodi koji se nalaze na Računima.
// Računi ostaju netaknuti. Uklonjene stavke čuvaju se u S.uklonjeno i mogu se vratiti gumbom "↩ Vrati uklonjene".
// Svaka kategorija iz inventara mora biti u catOrder, inače se ne prikazuje (npr. nova kategorija u starom spremljenom stanju)
function ensureCatOrder(state){
  if(!state||!state.inventar)return;
  if(!Array.isArray(state.catOrder))state.catOrder=[];
  Object.keys(state.inventar).forEach(c=>{if(!state.catOrder.includes(c))state.catOrder.push(c);});
}
function removeReceiptItems448(state){
  if(!state||state._mig448)return;
  state._mig448=true;
  const ids=new Set();
  (state.narudzbe||[]).forEach(o=>(o.items||[]).forEach(l=>{if(l.source==="inventar"&&l.refId)ids.add(l.refId);}));
  if(!ids.size)return;
  state.uklonjeno=state.uklonjeno||[];
  for(const [cat,cd] of Object.entries(state.inventar||{})){
    const keep=[];
    (cd.items||[]).forEach(it=>{if(ids.has(it.id))state.uklonjeno.push({cat,item:it});else keep.push(it);});
    cd.items=keep;
  }
}
// Nastavak: iz Maketa se uklanjaju sve makete koje se nalaze na Računima (zajedno s fotografijama, planom, bojama...).
// Čuvaju se u S.uklonjeno (kind:"makete") i vraćaju se istim gumbom "↩ Vrati uklonjene".
function removeReceiptMakete449(state){
  if(!state||state._mig449)return;
  state._mig449=true;
  const ids=new Set();
  (state.narudzbe||[]).forEach(o=>(o.items||[]).forEach(l=>{if(l.source==="makete"&&l.refId)ids.add(l.refId);}));
  if(!ids.size)return;
  state.uklonjeno=state.uklonjeno||[];
  const keep=[];
  (state.makete||[]).forEach(m=>{if(ids.has(m.id))state.uklonjeno.push({kind:"makete",item:m});else keep.push(m);});
  state.makete=keep;
}
// Na zahtjev korisnika: sve što je ostalo u Inventaru i Maketama prebacuje se u "uklonjeno" (vraća se gumbom "↩ Vrati uklonjene").
function archiveAll450(state){
  if(!state||state._mig450)return;
  state._mig450=true;
  state.uklonjeno=state.uklonjeno||[];
  for(const [cat,cd] of Object.entries(state.inventar||{})){
    (cd.items||[]).forEach(it=>state.uklonjeno.push({cat,item:it}));
    cd.items=[];
  }
  (state.makete||[]).forEach(m=>state.uklonjeno.push({kind:"makete",item:m}));
  state.makete=[];
}
async function purgeRemoved(){
  const n=(S.uklonjeno||[]).length;
  if(!n)return;
  const ok=await customConfirm("Trajno obrisati "+n+" uklonjenih stavki i maketa (s fotografijama)? Ovo se više ne može poništiti.","Trajno obrisati?");
  if(!ok)return;
  S.uklonjeno=[];
  save();render();
  showToast("🗑 Trajno obrisano: "+n);
}
// Na zahtjev korisnika: briše se i sve grupe (kategorije) proizvoda u Inventaru. Briše samo PRAZNE grupe, pa se nijedan proizvod ne gubi.
function deleteEmptyCategories451(state){
  if(!state||state._mig451)return;
  state._mig451=true;
  state._seedOff=true;
  const inv=state.inventar||{};
  Object.keys(inv).forEach(c=>{if(!(inv[c].items||[]).length)delete inv[c];});
  state.catOrder=(state.catOrder||[]).filter(c=>inv[c]);
  if(state.catSort)Object.keys(state.catSort).forEach(c=>{if(!inv[c])delete state.catSort[c];});
}
// Svježe stanje se gradi iz datoteke koja već sadrži sve ranije dopune, pa se jednokratne migracije ne smiju ponovno izvoditi
function markSeedMigrations(state){
  if(!state)return;
  ["_mig441","_mig442","_mig443","_mig445","_mig447"].forEach(k=>{state[k]=true;});
}
// Slaganje Inventara i Maketa na osnovu Računa: svaka stavka na računu postaje proizvod (ili maketa).
// Ako zapis još postoji u "uklonjeno", vraća se sa svim podacima (fotografije, opis, uzorak...); ako ne, stvara se iz retka računa.
// Uz zaglavlje kupljenog kompleta vraćaju se i članovi tog kompleta.
function rebuildFromReceipts(state){
  const res={inv:0,mk:0,members:0,created:0};
  if(!state)return res;
  state.uklonjeno=state.uklonjeno||[];state.inventar=state.inventar||{};state.makete=state.makete||[];
  if(!Array.isArray(state.catOrder))state.catOrder=[];
  const arch=state.uklonjeno;
  const take=pred=>{const i=arch.findIndex(pred);return i>=0?arch.splice(i,1)[0]:null;};
  const addInv=(cat,item)=>{
    if(!state.inventar[cat])state.inventar[cat]={items:[]};
    if(!state.catOrder.includes(cat))state.catOrder.push(cat);
    state.inventar[cat].items.push(item);
  };
  const haveInv=id=>Object.values(state.inventar).some(c=>(c.items||[]).some(i=>i.id===id));
  for(const o of state.narudzbe||[])for(const l of o.items||[]){
    if(!l.refId)continue;
    if(l.source==="makete"){
      if(state.makete.some(m=>m.id===l.refId))continue;
      const a=take(e=>e.kind==="makete"&&e.item.id===l.refId);
      if(a){state.makete.push(a.item);res.mk++;}
      else{state.makete.push({id:l.refId,name:l.name||l.code||"Maketa",scale:"",code:l.code||"",mfr:"",status:"plan",comment:"",imgs:[],colors:[],price:l.price||"",createdAt:Date.now()});res.mk++;res.created++;}
    }else if(l.source==="inventar"){
      if(haveInv(l.refId))continue;
      const a=take(e=>e.kind!=="makete"&&e.item&&e.item.id===l.refId);
      if(a){addInv(a.cat,a.item);res.inv++;}
      else{
        const m=/^([^-–]{2,32}?)\s+[-–]\s+(.+)$/.exec(l.name||"");
        addInv((l.cat&&l.cat!=="Makete")?l.cat:"Ostalo",{id:l.refId,mfr:m?m[1].trim():"",code:l.code||"",name:m?m[2].trim():(l.name||l.code||"Proizvod"),desc:"",note:"",price:l.price||"",opened:"",pdfUrl:"",imgs:[],status:"imam",tags:[],swatches:[],subgroup:null,isSetHeader:false,createdAt:Date.now()});
        res.inv++;res.created++;
      }
    }
  }
  // članovi kupljenih kompleta (zaglavlja u Inventaru): po podgrupi, a bojice Oil Pencil po rasponu šifri seta
  const pencils={"AK10041":["AK10011","AK10012","AK10013","AK10014","AK10015"],"AK10042":["AK10016","AK10017","AK10018","AK10019","AK10020"]};
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  for(const [cat,cd] of Object.entries(state.inventar)){
    (cd.items||[]).filter(i=>i.isSetHeader).forEach(h=>{
      const codes=(pencils[h.code]||[]).map(nk);
      let a;
      while((a=take(e=>e.kind!=="makete"&&e.item&&!e.item.isSetHeader&&((h.subgroup&&e.item.subgroup===h.subgroup)||(e.cat===cat&&codes.includes(nk(e.item.code))))))){
        addInv(a.cat,a.item);res.members++;   // član ide u svoju grupu (može biti druga od zaglavlja)
      }
    });
  }
  return res;
}
// ── v45 migracija: račun 33907-885211 (Hobby Chest, 08.10.2026., 106,49 €) ──
// Jednokratno (oznaka _mig45_885211): dodaje račun, stavke u Inventar (status "imam"),
// makete u Makete (planirane) i uklanja kupljeno s popisa Želja.
// Ne stvara duplikate: ako proizvod/maketa s istom šifrom već postoji, račun se veže na postojeći zapis.
function addReceipt885211(state){
  if(!state||state._mig45_885211)return;
  state._mig45_885211=true;
  if(window.NO_HD)return; // javna (web) verzija: bez osobnog računa u početnim podacima
  state.narudzbe=state.narudzbe||[];state.inventar=state.inventar||{};state.makete=state.makete||[];state.zelje=state.zelje||[];
  if(!Array.isArray(state.catOrder))state.catOrder=[];
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  // već unesen (ručno ili ranije)?
  if(state.narudzbe.some(o=>o.id==="ord_inv885211"||(o.items||[]).some(l=>nk(l.code)==="TAK2184")))return;

  const T=Date.now();
  const INV=[
    {cat:"Washes",id:"ak083",mfr:"AK Interactive",code:"AK083",name:"Track Wash",price:"3.42 €",tags:["wash","gusjenice"],desc:"Enamel wash za gusjenice i kotače."},
    {cat:"Washes",id:"amig0701",mfr:"AMMO by Mig",code:"AMIG0701",name:"Afrika Korps Wash (Acrylic Wash)",price:"2.90 €",tags:["wash","akril","DAK"],desc:"Akrilni wash za vozila Afrika Korpsa."},
    {cat:"Textures",id:"ak8013",mfr:"AK Interactive",code:"AK8013",name:"Terrains Asphalt",price:"8.67 €",tags:["terrain","diorama","asfalt"],desc:"Terrains Asphalt - 250Ml (Acrylic)"},
    {cat:"Textures",id:"ak8026",mfr:"AK Interactive",code:"AK8026",name:"Splatter Effects Wet Mud",price:"6.34 €",tags:["blato","splatter"],desc:"Splatter Effects Wet Mud - 100Ml - Base Product"},
    {cat:"Textures",id:"ak8027",mfr:"AK Interactive",code:"AK8027",name:"Splatter Effects Dry Mud",price:"6.34 €",tags:["blato","splatter"],desc:"Splatter Effects Dry Mud - 100Ml (Acrylic)"},
    {cat:"AMMO by Mig",id:"amig2103",mfr:"AMMO by Mig",code:"AMIG2103",name:"Turned Earth Ground",price:"8.85 €",tags:["ammo","zemlja","diorama","akril"],desc:"AMMO by Mig akrilna boja za teren – preorana zemlja."},
    {cat:"Oil Pencil (uljne bojice)",id:"ak10027",mfr:"AK Interactive",code:"AK10027",name:"Watercolor Pencil – Concrete Marks",price:"1.14 €",tags:["olovka","beton"],desc:"Vodena bojica za tragove betona."},
    {cat:"Primer and Microfiller (temeljni premaz i mikropunilo)",id:"ak758",mfr:"AK Interactive",code:"AK758",name:"GREY PRIMER AND MICROFILLER",price:"7.25 €",tags:["primer","temeljni","microfiller"],desc:"Ultrafini visokokvalitetni automatski nivelirajuci sivi temeljni premaz, s velikom prihvatnom snagom i otpornoscu. Moze se razrijediti s AK470 Xtreme Cleanerom."},
    {cat:"Playmarker",id:"akm005",mfr:"AK Interactive",code:"AKM005",name:"LIGHT GREY – PLAYMARKER",price:"2.30 €",tags:["flomaster","marker"],desc:""},
  ];
  const MAK=[
    {id:"m_ac13205",name:"M2A2 Bradley OIF",scale:"1:35",code:"AC13205",mfr:"Academy",price:"21.70 €"},
    {id:"m_tak2184",name:"Sd.Kfz.250/1",scale:"1:35",code:"TAK2184",mfr:"Takom",price:"29.48 €"},
  ];

  const findInv=code=>{for(const [cat,cd] of Object.entries(state.inventar))for(const it of cd.items||[])if(nk(it.code)===nk(code))return {cat,it};return null;};
  const idTaken=id=>Object.values(state.inventar).some(cd=>(cd.items||[]).some(i=>i.id===id))||state.makete.some(m=>m.id===id);
  const uniq=id=>{let u=id,n=2;while(idTaken(u))u=id+"_"+(n++);return u;};
  const lines=[];let n=0;
  const line=(src,refId,code,name,cat,price)=>lines.push({id:"oi_inv885211_"+String(++n).padStart(2,"0"),qty:1,source:src,refId,code,name,cat,price});

  INV.forEach(p=>{
    const ex=findInv(p.code);
    if(ex){ex.it.status="imam";if(!ex.it.price)ex.it.price=p.price;line("inventar",ex.it.id,p.code,ex.it.name,ex.cat,p.price);return;}
    const item={id:uniq(p.id),mfr:p.mfr,code:p.code,name:p.name,desc:p.desc,note:"",price:p.price,opened:"",pdfUrl:"",imgs:[],status:"imam",tags:p.tags,swatches:[],subgroup:null,isSetHeader:false,createdAt:T};
    if(!state.inventar[p.cat])state.inventar[p.cat]={items:[]};
    if(!state.catOrder.includes(p.cat))state.catOrder.push(p.cat);
    state.inventar[p.cat].items.push(item);
    line("inventar",item.id,p.code,p.name,p.cat,p.price);
  });
  MAK.forEach(m=>{
    const ex=state.makete.find(x=>nk(x.code)===nk(m.code));
    if(ex){line("makete",ex.id,m.code,ex.name,"Makete",m.price);return;}
    const mk={id:uniq(m.id),name:m.name,scale:m.scale,code:m.code,mfr:m.mfr,price:m.price,status:"plan",comment:"",refUrl:"",stage:0,imgs:[],colors:[],createdAt:T};
    state.makete.push(mk);
    line("makete",mk.id,m.code,m.name,"Makete",m.price);
  });
  // Račun: tražimo prvi slobodan broj
  let num=state.narudzbe.length+1;
  while(state.narudzbe.some(o=>o.label==="Račun #"+num))num++;
  state.narudzbe.push({id:"ord_inv885211",label:"Račun #"+num,date:Date.UTC(2026,9,8,16,7),paid:"106.49",closed:true,collapsed:true,items:lines});
  // kupljeno više nije želja
  const bought=new Set([...INV,...MAK].map(p=>nk(p.code)));
  state.zelje=state.zelje.filter(w=>!bought.has(nk(w.code)));
  if(typeof showToast==="function")setTimeout(()=>showToast("✓ Dodan račun 33907-885211 (11 stavki, 106,49 €)"),1200);
}

// ── v45 migracija: lokalne slike proizvoda i maketa (_mig45_imgs) ──
// 1) stavke bez slike dobivaju službenu fotografiju (prema šifri)
// 2) slike koje su bile samo vanjski link zamjenjuju se lokalnom kopijom (rade bez interneta)
// Slike koje je korisnik sam učitao (data:) ili lokalne (img/) se ne diraju.
// (funkcija, ne konstanta — loadS() se izvodi prije nego što bi konstanta bila inicijalizirana)
function img45Map(){return {
"codes": {
"AK015": "img/d53f637531f764.jpg",
"AK042": "img/d6f2d5a9ec8d32.jpg",
"AK083": "img/9d935dd44e4fe3.jpg",
"AK10009": "img/48c019f124ba36.jpg",
"AK10026": "img/c736998ab55b3f.jpg",
"AK10027": "img/95212a9ea4b2b8.jpg",
"AK104": "img/18ad0d0ec86f4c.jpg",
"AK11115": "img/b84d2cb5360e7e.jpg",
"AK11121": "img/1bbe79d4e54695.jpg",
"AK11336": "img/a975ac474eccd9.jpg",
"AK11672": "img/8c8d5b8652ccd3.jpg",
"AK2073": "img/e1ea843fc81858.jpg",
"AK758": "img/0a9a980db13c40.jpg",
"AK8013": "img/cc0c138353d706.jpg",
"AK8022": "img/905448c390658d.jpg",
"AK8026": "img/b705d550d85070.jpg",
"AK8027": "img/35a266d9ef9437.jpg",
"AKM005": "img/79879b2d652849.jpg",
"AMIG0701": "img/53391a3514531f.jpg",
"AMIG2102": "img/51a28b27dc02a2.jpg",
"AMIG2103": "img/154444af5d60d0.jpg",
"AMIG7408": "img/bdb106415586ce.jpg",
"73826": "img/5ed59b337f9ca6.jpg",
"AC13205": "img/4cacf12f8e080a.jpg",
"TAK2184": "img/2e472e90b7ae72.jpg"
},
"urls": {
"https://ak-interactive.com/wp-content/uploads/2024/04/RC123_web.jpg": "img/359cce76ade4a4.jpg",
"https://ak-interactive.com/wp-content/uploads/2025/05/AK103_.jpg": "img/84b2515b977f49.jpg",
"https://ak-interactive.com/wp-content/uploads/2020/06/AK11237_web.jpg": "img/9f5ad4aaff43e6.jpg",
"https://ak-interactive.com/wp-content/uploads/2020/06/AK11239_web.jpg": "img/2cf9a6b3f6c865.jpg",
"https://ak-interactive.com/wp-content/uploads/2019/01/AK11240.jpg": "img/fdd627b04ddcc7.jpg",
"https://ak-interactive.com/wp-content/uploads/2025/02/RC701.jpg": "img/4e8ddd61a98986.jpg",
"https://ak-interactive.com/wp-content/uploads/2020/06/AK11500_web.jpg": "img/dc747129d8c125.jpg",
"https://ak-interactive.com/wp-content/uploads/2021/03/AK11505_web.jpg": "img/25c6d243fe1030.jpg",
"https://ak-interactive.com/wp-content/uploads/2024/11/AK4063.jpg": "img/3812f1551abe0b.jpg",
"https://ak-interactive.com/wp-content/uploads/2014/12/AK4060-3.jpg": "img/84ed59fc994130.jpg",
"https://ak-interactive.com/wp-content/uploads/2026/03/AK11316.jpg": "img/6ad2480e4cfc01.jpg",
"https://ak-interactive.com/wp-content/uploads/2025/08/AK9519-scaled.jpg": "img/45c42f36b7bfcb.jpg",
"https://ak-interactive.com/wp-content/uploads/2025/11/AK048.jpg": "img/4a9fb25f3e3c82.jpg",
"https://ak-interactive.com/wp-content/uploads/2016/12/AK8015-3.jpg": "img/a454ebc01c801a.jpg",
"https://ak-interactive.com/wp-content/uploads/2016/12/AK8028-4.jpg": "img/de83334cc31181.jpg",
"https://ak-interactive.com/wp-content/uploads/2016/12/AK8033-2.jpg": "img/ee662346b6ca62.jpg",
"https://ak-interactive.com/wp-content/uploads/2016/12/AK8020-3.jpg": "img/85ac105036ddd9.jpg",
"https://ak-interactive.com/wp-content/uploads/2014/09/AK046-3.jpg": "img/8e7746c2d5f949.jpg",
"https://ak-interactive.com/wp-content/uploads/2024/06/RCM106.jpg": "img/dfad98a4fd3632.jpg",
"https://ak-interactive.com/wp-content/uploads/2024/06/RCM101.jpg": "img/a122b5f1ad47ff.jpg",
"https://ak-interactive.com/wp-content/uploads/2026/05/RCM003.jpg": "img/7c40f9397f314e.jpg",
"https://ak-interactive.com/wp-content/uploads/2026/05/RCM004.jpg": "img/23c6bad90385ed.jpg",
"https://ak-interactive.com/wp-content/uploads/2026/05/RCM034.jpg": "img/50139883045de7.jpg",
"https://ak-interactive.com/wp-content/uploads/2025/10/AK329.jpg": "img/9948ec8895d5d0.jpg",
"https://ak-interactive.com/wp-content/uploads/2025/10/AK330.jpg": "img/e0b4f6bf718770.jpg",
"https://ak-interactive.com/wp-content/uploads/2025/05/AK17514.jpg": "img/7439347e97b6d7.jpg",
"https://ak-interactive.com/wp-content/uploads/2026/03/AK17054.jpg": "img/63cb0805159d6f.jpg",
"https://ak-interactive.com/wp-content/uploads/2026/03/AK17059.jpg": "img/b4cc049b403e7f.jpg",
"https://ak-interactive.com/wp-content/uploads/2026/03/AK17063.jpg": "img/c1955ff77a3a3d.jpg",
"https://ak-interactive.com/wp-content/uploads/2025/02/AKAD17.jpg": "img/2716c1a62a752f.jpg",
"https://ak-interactive.com/wp-content/uploads/2025/12/AKMQ029.jpg": "img/70f1d3aa29d85b.jpg",
"https://cdn11.bigcommerce.com/s-0iq5oprw98/images/stencil/500x500/products/4819/5449/3646_fx__53280.1727624018.png?c=1": "img/a90dcd909ec74a.jpg",
"https://forums.kitmaker.net/uploads/default/original/3X/4/6/463235aa09a6339b12bc94cea9c28b69a3505ead.jpeg": "img/9bee89bc1d2f7f.jpg",
"https://www.gaahleri.com/cdn/shop/files/01_Advanced_Seeker.jpg?v=1771247497&width=1946": "img/2146db2a83d463.jpg",
"https://www.migjimenez.com/21176-large_default/effects-brusher-fuel-stains.jpg": "img/ddf9cf4f9197ca.jpg",
"https://www.migjimenez.com/4811-large_default/slow-river-waters.jpg": "img/b7b07d9108ae73.jpg",
"https://www.migjimenez.com/46773-large_default/afrika-korps-wash.jpg": "img/9712d0a84f4c41.jpg",
"https://acrylicosvallejo.com/wp-content/uploads/2025/05/71209-AFV-colors-US-Modern-Desert-Colors-Front.jpg": "img/3357bc32fdc54a.jpg",
"https://d7z22c0gz59ng.cloudfront.net/japan_contents/img/usr/item/8/87038/87038_1.jpg": "img/b5dd70be19a668.jpg",
"https://d7z22c0gz59ng.cloudfront.net/japan_contents/img/usr/item/3/35268/35268_1.jpg": "img/a6f8a7c45a971c.jpg",
"https://d7z22c0gz59ng.cloudfront.net/japan_contents/img/usr/item/3/35157/35157_1.jpg": "img/6cf7805a701a3d.jpg",
"https://www.super-hobby.com/zdjecia/8/8/2/2048_rd.jpg": "img/62daf43d1b28fc.jpg",
"https://www.wiltec.de/media/f6/70/c0/1783417937/wplm_34205_01_en.jpg?ts=1783426026": "img/424ebb54ea2992.jpg",
"https://www.wiltec.de/thumbnail/59/5f/df/1760012806/b4a87387a9bd470c86786f57f1e53901_280x280.jpg?ts=1760012807": "img/3a13f192a8a92d.jpg"
}
};}
function attachImages45(state){
  if(!state||state._mig45_imgs)return;
  state._mig45_imgs=true;
  const IMG45=img45Map();
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  const codes={};Object.entries(IMG45.codes).forEach(([c,f])=>codes[nk(c)]=f);
  let added=0,localized=0;
  const fix=(obj)=>{
    const imgs=(obj.imgs&&obj.imgs.length)?obj.imgs:(obj.img?[{url:obj.img}]:[]);
    if(!imgs.length){
      const f=codes[nk(obj.code)];
      if(f){obj.imgs=[{url:f}];delete obj.img;added++;}
      return;
    }
    let changed=false;
    const next=imgs.map(im=>{const f=im&&IMG45.urls[im.url];if(f){changed=true;localized++;return {url:f,src:im.url};}return im;});
    if(changed){obj.imgs=next;delete obj.img;}
  };
  Object.values(state.inventar||{}).forEach(cd=>(cd.items||[]).forEach(fix));
  (state.makete||[]).forEach(fix);
  (state.uklonjeno||[]).forEach(e=>e&&e.item&&fix(e.item));
  if((added||localized)&&typeof showToast==="function")setTimeout(()=>showToast(`🖼 Slike: ${added} dodano, ${localized} spremljeno lokalno`),2200);
}

// ── v45 migracija: kompleti bojica (Oil Pencil) — članovi ispod zaglavlja kompleta (_mig45_pencilsets) ──
// Zaglavlje dobiva popis šifri i boja u opisu (isti mehanizam kao ostali kompleti), a pojedinačne
// bojice dobivaju istu podgrupu pa se prikazuju uvučeno ispod kompleta (↳).
function groupPencilSets45(state){
  if(!state||!state.inventar||state._mig45_pencilsets)return;
  state._mig45_pencilsets=true;
  const SETS={
    AK10041:{sg:"AK10041 – RUST & STREAKING set",intro:"Set akrilnih olovaka za efekte hrđe i curenja (5 bojica).",
      m:[["AK10011","LIGHT RUST"],["AK10012","MEDIUM RUST"],["AK10013","DARK RUST"],["AK10014","STRONG OCHER"],["AK10015","VIVID ORANGE"]]},
    AK10042:{sg:"AK10042 – CHIPPING & AGING set",intro:"Set akrilnih olovaka za oštećenja boje i starenje, posebno za drvo (5 bojica).",
      m:[["AK10016","LIGHT CHIPPING FOR WOOD"],["AK10017","DARK CHIPPING FOR WOOD"],["AK10018","GUN METAL (GRAPHITE)"],["AK10019","CHIPPING COLOR"],["AK10020","RED PRIMER"]]},
  };
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  const all=Object.values(state.inventar).flatMap(cd=>cd.items||[]);
  const touched=new Set();
  for(const [hcode,set] of Object.entries(SETS)){
    const hdr=all.find(i=>nk(i.code)===hcode);
    if(!hdr)continue;
    const old=hdr.subgroup;
    hdr.isSetHeader=true;
    hdr.subgroup=set.sg;
    // opis: uvod + popis bojica (šifre u opisu povezuju članove i kasnije, npr. kad se doda nova bojica)
    const list=set.m.map(([c,n])=>c+" "+n).join("\n");
    const base=String(hdr.desc||"").split("\n")[0]||set.intro;
    if(!set.m.every(([c])=>String(hdr.desc||"").toUpperCase().includes(c)))hdr.desc=base+"\n"+list;
    // uzorci boja na zaglavlju = boje članova
    const sw=set.m.map(([c])=>{const it=all.find(i=>nk(i.code)===c);return it&&it.swatches&&it.swatches[0];}).filter(Boolean);
    if(sw.length)hdr.swatches=sw;
    for(const [c] of set.m){
      const it=all.find(i=>nk(i.code)===c&&i!==hdr);
      if(it){it.subgroup=set.sg;it.isSetHeader=false;}
    }
    // članovi koji su bili vezani uz staro ime podgrupe
    if(old&&old!==set.sg)all.forEach(i=>{if(i.subgroup===old)i.subgroup=set.sg;});
    touched.add(set.sg);
  }
  if(!touched.size)return;
  for(const cd of Object.values(state.inventar)){
    if((cd.items||[]).some(i=>touched.has(i.subgroup)))cd.items=regroupByFirstOccurrence(cd.items);
  }
}

// ── v45 migracija: rubrike Inventara po VRSTI proizvoda umjesto po proizvođaču (_mig45_cats) ──
function cats45Order(){return ["Akrilne boje","Real Colors (lak boje)","Quick Gen boje","Markeri","Weathering bojice (olovke)","Gvaš boje",
  "Washevi i paneliner","Efekti (emajl)","Pigmenti","Teren i diorama","Temeljni premazi (primer)","Lakovi",
  "Razrjeđivači i čistači","Ljepila i kitovi","Decal sredstva","Dekali i dodaci","Airbrush i alati"];}
// staro ime rubrike (ili početak imena) -> nova rubrika
function mapCat45(name){
  const n=String(name||"").trim();
  if(!n)return n;
  if(cats45Order().includes(n))return n;
  const R=[
    [/^3Gen|^VALLEJO|^Model Air|^ACRYLIC COLOR|^Akril/i,"Akrilne boje"],
    [/^Real Colors/i,"Real Colors (lak boje)"],
    [/^QUICK GEN/i,"Quick Gen boje"],
    [/^AK (Markeri|Flomasteri)|^Playmarker|^QUICK MARKER|^Marker/i,"Markeri"],
    [/^Oil Pencil|^Bojice|^Weathering Pencil/i,"Weathering bojice (olovke)"],
    [/^AK Gouache|^Gouache/i,"Gvaš boje"],
    [/^Washes|^Precision Panel|^Panel/i,"Washevi i paneliner"],
    [/^Effect|^Deposits|^Effects Brusher/i,"Efekti (emajl)"],
    [/^Pigment/i,"Pigmenti"],
    [/^Textures|^Dual Exo|^AMMO|^Teren|^Diorama/i,"Teren i diorama"],
    [/^Primer/i,"Temeljni premazi (primer)"],
    [/^Varnish|^Lak/i,"Lakovi"],
    [/^Cleaner|^Thinner/i,"Razrjeđivači i čistači"],
    [/^Putty|^LJEPILO|^Glue/i,"Ljepila i kitovi"],
    [/^Decal/i,"Decal sredstva"],
    [/^Airbrush|^Alat/i,"Airbrush i alati"],
  ];
  for(const [re,to] of R)if(re.test(n))return to;
  return n;   // nepoznata (korisnikova) rubrika ostaje kakva jest
}
// pojedini proizvodi koji pripadaju drugoj vrsti od svoje stare rubrike
function codeCat45(){return {AK042:"Pigmenti",AK2073:"Washevi i paneliner",AK12102:"Washevi i paneliner",
  "73826":"Efekti (emajl)",AMIG7408:"Pigmenti",AMIG1801:"Efekti (emajl)"};}
function recategorize45(state){
  if(!state||!state.inventar||state._mig45_cats)return;
  state._mig45_cats=true;
  const CATS45_ORDER=cats45Order(),CODE_CAT45=codeCat45();
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  const MFR={AMIG1001:"AMMO by Mig",AMIG1801:"AMMO by Mig",AMIG2204:"AMMO by Mig"};
  const oldOrder=[...(state.catOrder||[]),...Object.keys(state.inventar)].filter((c,i,a)=>a.indexOf(c)===i&&state.inventar[c]);
  const fresh={};
  const where={};   // id -> nova rubrika (za račune)
  for(const oldCat of oldOrder){
    for(const it of state.inventar[oldCat].items||[]){
      const target=(!it.isSetHeader&&CODE_CAT45[nk(it.code)])||mapCat45(oldCat);
      if(MFR[nk(it.code)])it.mfr=MFR[nk(it.code)];
      if(/gaahleri/i.test(it.name)&&(!it.mfr||it.mfr==="Ostalo"))it.mfr="Gaahleri";
      if(/wiltec/i.test(it.name)||/34205/.test(it.code||""))it.mfr="Wiltec";
      (fresh[target]=fresh[target]||{items:[]}).items.push(it);
      where[it.id]=target;
    }
  }
  for(const c of Object.keys(fresh))fresh[c].items=regroupByFirstOccurrence(fresh[c].items);
  state.inventar=fresh;
  state.catOrder=[...CATS45_ORDER.filter(c=>fresh[c]),...Object.keys(fresh).filter(c=>!CATS45_ORDER.includes(c))];
  const cs={};Object.entries(state.catSort||{}).forEach(([c,v])=>{const t=mapCat45(c);if(fresh[t]&&!cs[t])cs[t]=v;});state.catSort=cs;
  // reference na rubrike u Željama, Računima i uklonjenim stavkama
  (state.zelje||[]).forEach(w=>{if(w.cat){const t=CODE_CAT45[nk(w.code)]||mapCat45(w.cat);w.cat=t;}});
  (state.narudzbe||[]).forEach(o=>(o.items||[]).forEach(l=>{
    if(l.source==="inventar"&&l.refId&&where[l.refId])l.cat=where[l.refId];
    else if(l.cat&&l.cat!=="Makete")l.cat=CODE_CAT45[nk(l.code)]||mapCat45(l.cat);
  }));
  (state.uklonjeno||[]).forEach(e=>{if(e&&e.cat)e.cat=(e.item&&!e.item.isSetHeader&&CODE_CAT45[nk(e.item.code)])||mapCat45(e.cat);});
  if(typeof showToast==="function")setTimeout(()=>showToast("🗂 Inventar presložen u rubrike po vrsti proizvoda"),3000);
}

// ── v45 migracija: popis boja ispod kompleta DAK 78.410, AK11672 Tracks & Wheels, Vallejo 71.209 (_mig45_sets2) ──
function setImgs45(){return {
"AK11029": "img/4626f75a7fd22d.jpg",
"AK11027": "img/33f692a7b438a3.jpg",
"AK11108": "img/1f34794dd90a46.jpg",
"AK11111": "img/0fdc8fcdc07436.jpg",
"AK11008": "img/c5d67dbae43fab.jpg",
"AK11058": "img/08a14b2158e0a3.jpg",
"71.029": "img/4998fdc1f5e1d7.jpg",
"71.140": "img/804b3efc64d054.jpg",
"71.122": "img/c1fc3c8d1db889.jpg",
"71.291": "img/7f0a75cadfe737.jpg",
"71.075": "img/93ef3e5471b28a.jpg",
"71.132": "img/dc179edb2011cf.jpg",
"71.117": "img/372db0cf7a817a.jpg",
"71.118": "img/63799e68009fca.jpg",
"71.028": "img/2ca2b5b9481087.jpg",
"70.520": "img/b1ca623bfb9021.jpg"
};}
function fillSets45(state){
  if(!state||!state.inventar||state._mig45_sets2)return;
  state._mig45_sets2=true;
  const IM=setImgs45();
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  const SETS=[
    {code:"78.410",sg:null,intro:"Vallejo Armour set (Model Air) – 6 boca: temeljni premaz, 4 boje i mat lak.",mfr:"Vallejo",
     m:[["70.603","German Panzer Grey (primer, RAL 7021)","#454547",["primer","vallejo"]],
        ["71.117","Camouflage Brown RAL 8020","#b29172",["model air","DAK"]],
        ["71.118","Camouflage Grey RAL 7027","#887d6b",["model air","DAK"]],
        ["71.223","Green","#006400",["model air"]],
        ["71.028","Sand Yellow","#a18d74",["model air","DAK"]],
        ["70.520","Matt Varnish","",["lak"],"520"]]},
    {code:"AK11672",sg:"AK11672 – TRACKS & WHEELS set",intro:"3Gen set za gusjenice i kotače (6 boja).",mfr:"AK Interactive",
     m:[["AK11029","Black","#010302",["3gen","guma"]],
        ["AK11027","Rubber Black (Rubber/Tires)","#1d1d1b",["3gen","guma"]],
        ["AK11108","Hull Red (Rusty Tracks)","#382312",["3gen","gusjenice","hrđa"]],
        ["AK11111","Burnt Umber (Dark Tracks)","#262719",["3gen","gusjenice"]],
        ["AK11008","Grimy Grey (Dust Color)","#d9c5ac",["3gen","prašina"]],
        ["AK11058","Decomposed Flesh (Dry Light Mud)","#b4996c",["3gen","blato"]]]},
    {code:"VAL71.209",sg:"71.209 – US Modern Desert Colors",intro:"Vallejo Model Air set (6 × 18 ml) za moderna US vozila u pustinji.",mfr:"Vallejo",
     m:[["71.029","Dark Earth","#635747",["model air"]],
        ["71.140","US Desert Sand","#a88c7e",["model air","pustinja"]],
        ["71.291","US Earth Yellow","#b88e5c",["model air","pustinja"]],
        ["71.122","US Desert Armour 686","#ae9a81",["model air","pustinja"]],
        ["71.075","Ivory","#c1af89",["model air"]],
        ["71.132","Aged White","#e3d3b2",["model air"]]]},
  ];
  const all=()=>Object.entries(state.inventar).flatMap(([c,cd])=>(cd.items||[]).map(it=>({c,it})));
  const T=Date.now();let n=0;
  for(const set of SETS){
    const h=all().find(x=>nk(x.it.code)===nk(set.code));
    if(!h)continue;
    const hdr=h.it,cat=h.c;
    hdr.isSetHeader=true;
    if(!hdr.subgroup)hdr.subgroup=set.sg||hdr.name;
    const sg=hdr.subgroup;
    const lines=set.m.map(m=>m[0]+" "+m[1]).join("\n");
    if(!String(hdr.desc||"").includes(set.m[1][0]))hdr.desc=(String(hdr.desc||"").trim()&&!/^\d{2}\.\d{3}/.test(String(hdr.desc).trim())?String(hdr.desc).trim().split("\n")[0]:set.intro)+"\n"+lines;
    hdr.swatches=set.m.map(m=>m[2]).filter(Boolean);
    for(const [code,name,sw,tags,alt] of set.m){
      const ex=all().find(x=>nk(x.it.code)===nk(code)||(alt&&nk(x.it.code)===nk(alt)));
      if(ex){ex.it.subgroup=sg;ex.it.isSetHeader=false;if(!(ex.it.imgs&&ex.it.imgs.length)&&IM[code])ex.it.imgs=[{url:IM[code]}];if(sw&&!(ex.it.swatches&&ex.it.swatches.length))ex.it.swatches=[sw];continue;}
      state.inventar[cat].items.push({id:"set45_"+nk(code).toLowerCase(),mfr:set.mfr,code,name,desc:"Dio kompleta "+hdr.code+" ("+hdr.name+")",note:"",price:"",opened:"",pdfUrl:"",
        imgs:IM[code]?[{url:IM[code]}]:[],status:hdr.status||"imam",tags,swatches:sw?[sw]:[],subgroup:sg,isSetHeader:false,createdAt:T});
      n++;
    }
    state.inventar[cat].items=regroupByFirstOccurrence(state.inventar[cat].items);
  }
  if(n&&typeof showToast==="function")setTimeout(()=>showToast("🎨 Kompletima dodan popis boja ("+n+" boja)"),3800);
}

// ── v45.8 migracija: pravi datumi i brojevi narudžbi računa (iz PDF-ova Hobby Chest / makete.eu) (_mig45_dates) ──
function fixReceiptDates45(state){
  if(!state||!Array.isArray(state.narudzbe)||state._mig45_dates)return;
  state._mig45_dates=true;
  // [plaćeno, broj narudžbe, datum (lokalno vrijeme Zagreb)]
  const R=[["50.12","33907-414861","2025-02-17T13:48:00+01:00"],["115.41","33907-418690","2026-02-18T19:21:00+01:00"],
    ["128.37","33907-472701","2026-03-17T10:24:00+01:00"],["37.12","33907-209263","2026-03-30T13:51:00+02:00"],
    ["44.44","33907-314718","2026-06-07T09:43:00+02:00"],["54.88","33907-727664","2026-07-16T18:38:00+02:00"],
    ["80.24","33907-293365","2026-09-09T16:25:00+02:00"],["106.49","33907-885211","2026-10-08T18:07:00+02:00"]];
  const num=v=>{const s=String(v||"").replace(/[^\d,.\-]/g,"");return parseFloat(s.includes(",")&&!s.includes(".")?s.replace(",","."):s.replace(/,/g,""))||0;};
  const used=new Set();
  for(const [paid,no,iso] of R){
    const o=state.narudzbe.find(x=>!used.has(x.id)&&(x.orderNo===no||Math.abs(num(x.paid)-num(paid))<0.015));
    if(!o)continue;
    used.add(o.id);
    o.orderNo=no;o.shop=o.shop||"Hobby Chest (makete.eu)";o.date=new Date(iso).getTime();
  }
}

// ── v45.10 migracija: vrati sve iz "uklonjeno" (na zahtjev korisnika) (_mig45_restore) ──
function restoreAll45(state){
  if(!state||state._mig45_restore)return;
  state._mig45_restore=true;
  const list=state.uklonjeno||[];
  state.inventar=state.inventar||{};state.makete=state.makete||[];
  if(!Array.isArray(state.catOrder))state.catOrder=[];
  list.forEach(e=>{
    if(!e||!e.item)return;
    if(e.kind==="makete"){
      if(!state.makete.some(m=>m.id===e.item.id))state.makete.push(e.item);
    }else{
      const cat=(typeof mapCat45==="function")?mapCat45(e.cat||"Ostalo"):(e.cat||"Ostalo");
      if(!state.inventar[cat]){state.inventar[cat]={items:[]};if(!state.catOrder.includes(cat))state.catOrder.push(cat);}
      if(!Object.values(state.inventar).some(cd=>(cd.items||[]).some(i=>i.id===e.item.id)))state.inventar[cat].items.push(e.item);
    }
  });
  state.uklonjeno=[];
}

// ── v45.12 migracija: slike za 70.603 i 71.223 iz kompleta DAK (_mig45_imgs2) ──
function setImgs2_45(state){
  if(!state||!state.inventar||state._mig45_imgs2)return;
  state._mig45_imgs2=true;
  const M={"70603":"img/41a80df5843738.jpg","71223":"img/ab4717a840c774.jpg"};
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  Object.values(state.inventar).forEach(cd=>(cd.items||[]).forEach(it=>{
    const f=M[nk(it.code)];if(f&&!(it.imgs&&it.imgs.length))it.imgs=[{url:f}];
  }));
}

// ── v45.13 migracija: nazivi boja u kompletu DAK 78.410 prema kutiji (_mig45_daknames) ──
function dakNames45(state){
  if(!state||!state.inventar||state._mig45_daknames)return;
  state._mig45_daknames=true;
  const N={"70603":"603 – Primer Dunkelgrau RAL 7021","71117":"117 – Braun RAL 8020","71118":"118 – Grau RAL 7027",
           "71223":"223 – Green","71028":"028 – Yellow Sand","520":"520 – Mat Varnish","70520":"520 – Mat Varnish"};
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  Object.values(state.inventar).forEach(cd=>(cd.items||[]).forEach(it=>{
    if(!/Afrika Korps/i.test(it.subgroup||""))return;
    const n=N[nk(it.code)];if(n&&!it.isSetHeader)it.name=n;
  }));
  Object.values(state.inventar).forEach(cd=>(cd.items||[]).forEach(it=>{
    if(it.code==="78.410"&&it.isSetHeader)it.desc="Vallejo Armour set (Model Air) – 6 boca, sadržaj prema kutiji:\n70.603 – 603 Primer Dunkelgrau RAL 7021\n71.117 – 117 Braun RAL 8020\n71.118 – 118 Grau RAL 7027\n71.223 – 223 Green\n71.028 – 028 Yellow Sand\n70.520 – 520 Mat Varnish";
  }));
}

// ── v45.15 migracija: mat lak iz kompleta DAK je Model Air 71.520 (_mig47_520) ──
function fix520_47(state){
  if(!state||!state.inventar||state._mig47_520)return;
  state._mig47_520=true;
  Object.values(state.inventar).forEach(cd=>(cd.items||[]).forEach(it=>{
    if(!/Afrika Korps/i.test(it.subgroup||"")&&it.code!=="78.410")return;
    if(!it.isSetHeader&&(it.code==="520"||it.code==="70.520"))it.code="71.520";
    if(it.isSetHeader&&it.desc)it.desc=it.desc.replace("70.520 – 520","71.520 – 520");
  }));
}

// ── v45.16 migracija: Dekali i dodaci, nove makete, reference za Sd.Kfz.223 (_mig48_items) ──
function items48(state){
  if(!state||!state.inventar||state._mig48_items)return;
  state._mig48_items=true;
  state.makete=state.makete||[];if(!Array.isArray(state.catOrder))state.catOrder=[];
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  const T=Date.now(),CAT="Dekali i dodaci";
  const has=code=>Object.values(state.inventar).some(cd=>(cd.items||[]).some(i=>nk(i.code)===nk(code)||i.id===code));
  const IT=[
    {id:"d48_ps35001",mfr:"Print Scale",code:"PS35-001",name:"German Panzer division marking – Part 1",st:"nemam",img:"img/p48_ps35001.jpg",tags:["dekali","1:35","divizije"],desc:"Dekali divizijskih amblema (1:35, uz 1:72 i 1:87 na istom listu). Iz mape „dak proba” — označi ✓ ako ga imaš."},
    {id:"d48_ps35002",mfr:"Print Scale",code:"PS35-002",name:"German Panzer division marking – Part 2",st:"nemam",img:"img/p48_ps35002.jpg",tags:["dekali","1:35","divizije","DAK"],desc:"Dekali divizijskih amblema, uključuje D.A.K. palmu (1:35). Označi ✓ ako ga imaš."},
    {id:"d48_ar35500",mfr:"Archer Fine Transfers",code:"AR35500",name:"DAK palme (Afrika Korps) – suhi prijenos",st:"nemam",img:"img/p48_ar35500.jpg",tags:["dekali","1:35","DAK"],desc:"Archer AR35500 – bijele palme Afrika Korpsa. Označi ✓ ako ga imaš."},
    {id:"d48_vl_brojevi",mfr:"Vlastiti ispis",code:"VL-135-1",name:"Vlastiti dekali 1:35 – taktički brojevi i križevi",st:"imam",img:"img/p48_vl_brojevi.jpg",tags:["dekali","1:35","ispis"],desc:"Ispisani dekali (mapa „decal 135”). PDF predlošci: njemacke_oznake_135_A4.pdf, DAK_sa_registracijama_135_A4.pdf, Decal_Sheet_1_35_Professional.pdf."},
    {id:"d48_vl_zastave",mfr:"Vlastiti ispis",code:"VL-135-2",name:"Vlastiti dekali 1:35 – zastave i zapovjedni plamenci",st:"imam",img:"img/p48_vl_zastave.jpg",tags:["dekali","1:35","ispis","zastave"],desc:"Reichskriegsflagge, zastava za raspoznavanje iz zraka i plamenci (1:35). Vidi priručnik „Signalne zastave”."},
    {id:"d48_afv",mfr:"Academy",code:"AC-AFV-ACC1",name:"A.F.V. Miniature Accessories – Allied & German Tank Supplies Set I",st:"imam",img:"img/p48_afv.jpg",tags:["dodaci","1:35","oprema"],desc:"Oprema za tenkove 1:35: mitraljezi, kanistri, sanduci, ceradi, alat."},
    {id:"d48_zica",mfr:"",code:"PROD00122",name:"Set za dioramu – bodljikava žica i protutenkovske prepreke",st:"imam",img:"img/p48_zica.jpg",tags:["diorama","dodaci"],desc:""},
    {id:"d48_vrece",mfr:"",code:"PROD00125",name:"Set za dioramu – vreće s pijeskom",st:"imam",img:"img/p48_vrece.jpg",tags:["diorama","dodaci"],desc:""},
    {id:"d48_alati",mfr:"",code:"PROD00127",name:"Set za dioramu – alati i radionička oprema",st:"imam",img:"img/p48_alati.jpg",tags:["diorama","dodaci"],desc:""},
  ];
  IT.forEach(p=>{
    if(has(p.code)||has(p.id))return;
    if(!state.inventar[CAT]){state.inventar[CAT]={items:[]};}
    if(!state.catOrder.includes(CAT)){const i=state.catOrder.indexOf("Decal sredstva");i>=0?state.catOrder.splice(i+1,0,CAT):state.catOrder.push(CAT);}
    state.inventar[CAT].items.push({id:p.id,mfr:p.mfr,code:p.code,name:p.name,desc:p.desc,note:"",price:"",opened:"",pdfUrl:"",imgs:[{url:p.img}],status:p.st,tags:p.tags,swatches:[],subgroup:null,isSetHeader:false,createdAt:T,...(p.mfr==="Vlastiti ispis"?{noPrice:true}:{})});
  });
  const MK=[
    {id:"m_rv05824",name:"USS Enterprise CV-6",scale:"1:1200",code:"Revell 05824",mfr:"Revell",img:"img/p48_enterprise.jpg",comment:"Level 4 · 38 dijelova · 20,5 cm"},
    {id:"m_ac12264",name:"F-15E Strike Eagle (with weapon)",scale:"1:48",code:"AC12264",mfr:"Academy",img:"img/p48_f15e.jpg",comment:""},
  ];
  MK.forEach(m=>{
    if(state.makete.some(x=>x.id===m.id||nk(x.code)===nk(m.code)||nk(x.code).endsWith(nk(m.code).replace(/^\D+/,""))&&/enterprise|f-?15/i.test(x.name)))return;
    state.makete.push({id:m.id,name:m.name,scale:m.scale,code:m.code,mfr:m.mfr,price:"",status:"plan",comment:m.comment,refUrl:"",stage:0,imgs:[{url:m.img}],colors:[],createdAt:T});
  });
  const s223=state.makete.find(x=>/sd\.?\s?kfz\.?\s?223/i.test(x.name)||nk(x.code)==="TA35268");
  if(s223&&!(s223.refs48&&s223.refs48.length)){
    s223.refs48=[
      {id:"rf_223a",url:"img/p48_223_tunis.jpg",caption:"Sd.Kfz.223 u Tunisu 1943. (stvarna fotografija)"},
      {id:"rf_223b",url:"img/p48_ar35500.jpg",caption:"DAK palme – Archer AR35500"},
      {id:"rf_223c",url:"img/p48_ps35002.jpg",caption:"Divizijske oznake (D.A.K.) – Print Scale 35-002"},
    ];
  }
}

// ── v45.17 migracija: setovi za dioramu iz Inventara u Makete (_mig48_dio) ──
function dioToMakete48(state){
  if(!state||!state.inventar||state._mig48_dio)return;
  state._mig48_dio=true;state.makete=state.makete||[];
  const CODES={"PROD00122":"Bodljikava žica i protutenkovske prepreke","PROD00125":"Vreće s pijeskom","PROD00127":"Alati i radionička oprema"};
  for(const [cat,cd] of Object.entries(state.inventar)){
    const keep=[];
    (cd.items||[]).forEach(it=>{
      const n=CODES[it.code];
      if(!n){keep.push(it);return;}
      if(!state.makete.some(m=>m.code===it.code))
        state.makete.push({id:"m_"+it.code.toLowerCase(),name:"Set za dioramu – "+n,scale:"1:35",code:it.code,mfr:it.mfr||"",price:it.price||"",
          status:"plan",comment:"Dodatak za dioramu (provjeri mjerilo na kutiji).",refUrl:"",stage:0,imgs:(it.imgs||[]).slice(),colors:[],createdAt:it.createdAt||Date.now()});
    });
    cd.items=keep;
  }
}

// ── v45.18 migracija: Academy AFV Accessories iz Inventara u Makete (_mig48_afv) ──
function afvToMakete48(state){
  if(!state||!state.inventar||state._mig48_afv)return;
  state._mig48_afv=true;state.makete=state.makete||[];
  for(const cd of Object.values(state.inventar)){
    const i=(cd.items||[]).findIndex(it=>it.code==="AC-AFV-ACC1"||it.id==="d48_afv");
    if(i<0)continue;
    const [it]=cd.items.splice(i,1);
    if(!state.makete.some(m=>m.code===it.code))
      state.makete.push({id:"m_ac_afv_acc1",name:it.name,scale:"1:35",code:it.code,mfr:it.mfr||"Academy",price:it.price||"",
        status:"plan",comment:it.desc||"",refUrl:"",stage:0,imgs:(it.imgs||[]).slice(),colors:[],createdAt:it.createdAt||Date.now()});
  }
}

// ── v45.21 migracija: provjera rubrika, duplikata i šifri (_mig49_audit) ──
function audit49(state){
  if(!state||!state.inventar||state._mig49_audit)return;
  state._mig49_audit=true;
  const nk=s=>String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  const all=()=>Object.entries(state.inventar).flatMap(([c,cd])=>(cd.items||[]).map(it=>({c,it})));
  const refs=new Set((state.narudzbe||[]).flatMap(o=>(o.items||[]).map(l=>l.refId)));
  const move=(it,from,to,afterCode)=>{
    const src=state.inventar[from];if(!src)return;const i=src.items.indexOf(it);if(i<0)return;src.items.splice(i,1);
    if(!state.inventar[to]){state.inventar[to]={items:[]};if(Array.isArray(state.catOrder)&&!state.catOrder.includes(to))state.catOrder.push(to);}
    const dst=state.inventar[to].items;const j=afterCode?dst.findIndex(x=>x.code===afterCode):-1;
    j>=0?dst.splice(j+1,0,it):dst.push(it);
  };
  // 1) 71.520 Mat Varnish je član DAK kompleta (78.410) — vrati ga uz komplet
  all().forEach(({c,it})=>{
    if(nk(it.code)==="71520"&&/Afrika Korps/i.test(it.subgroup||"")){
      const h=all().find(x=>x.it.code==="78.410"&&x.it.isSetHeader);
      if(h&&h.c!==c)move(it,c,h.c,"71.028");
      if(!it.tags||!it.tags.length)it.tags=["model air","lak"];
    }
  });
  // 2) AMIG7408 Europe Earth (3 × 35 ml) je set pigmenata
  all().forEach(({c,it})=>{if(nk(it.code)==="AMIG7408"&&c!=="Pigmenti")move(it,c,"Pigmenti");});
  // 3) dvostruki unosi istog proizvoda (na Računu je kupljen 1 komad) — zadrži onaj vezan uz Račun
  state.uklonjeno48=state.uklonjeno48||[];
  const groups={};
  all().forEach(x=>{if(x.it.isSetHeader||!nk(x.it.code)||x.it.code==="–")return;const k=x.c+"|"+nk(x.it.code)+"|"+(x.it.subgroup||"");(groups[k]=groups[k]||[]).push(x);});
  Object.values(groups).forEach(g=>{
    if(g.length<2)return;
    const keep=g.find(x=>refs.has(x.it.id))||g[0];
    g.forEach(x=>{
      if(x===keep)return;
      const k=keep.it,d=x.it;
      if(!k.desc&&d.desc)k.desc=d.desc;
      if(!(k.imgs&&k.imgs.length)&&d.imgs&&d.imgs.length)k.imgs=d.imgs;
      (d.tags||[]).forEach(t=>{k.tags=k.tags||[];if(!k.tags.includes(t))k.tags.push(t);});
      const L=state.inventar[x.c].items,i=L.indexOf(d);if(i>=0){L.splice(i,1);state.uklonjeno48.push({cat:x.c,item:d,reason:"duplikat od "+k.id});}
    });
  });
  // 4) šifre, nazivi i opisi
  all().forEach(({it})=>{
    if(it.code==="AKG-03")it.code="AKG03";
    if(/^ITEM NO\.: ?34205/.test(it.code||"")){it.code="WT34205";it.ean="4250390802036";}
    if(it.mfr==="MIG Productions")it.mfr="AMMO by Mig";
    if(it.code==="AK17054"&&/^AK17054 /.test(it.name))it.name="ORANGE BROWN – QUICK GEN COLOR";
    if(it.code==="RCM101"&&/^RCM101 – /.test(it.name))it.name="TOOLS – RC MARKERS SET";
    if(it.code==="AK11052"&&/nijansa kose/.test(it.desc||""))it.desc=it.desc.replace("nijansa kose","nijansa kože");
    if(it.code==="AK042"&&/^Emajl boja/.test(it.desc||""))it.desc="Pigment za simulaciju europskih tipova zemlje/tla na vozilima i dioramama.";
    if(it.code==="AK4063"&&/^Brown Earth Deposit$/.test(it.name))it.name="BROWN EARTH DEPOSIT";
  });
}

// ── v45.22 migracija: šifra Gaahleri airbrusha s računa 33907-472701 (_mig50_codes) ──
function codes50(state){
  if(!state||!state.inventar||state._mig50_codes)return;
  state._mig50_codes=true;
  Object.values(state.inventar).forEach(cd=>(cd.items||[]).forEach(it=>{
    if(it.mfr==="Gaahleri"&&(!it.code||it.code==="–")&&/Seeker/i.test(it.name))it.code="GAA46807";
  }));
}

// ── v45.30 migracija: kategorije na Željama (makete, dodaci, boje po šifri) (_mig55_wishcat) ──
function wishCat55(w,invCats){
  const code=String(w.code||"").replace(/^Šifra:\s*/i,"").trim(),C=code.toUpperCase().replace(/[^A-Z0-9]/g,""),N=String(w.name||"");
  const has=re=>re.test(N);
  if(has(/rolling pin|valjak/i))return "Airbrush i alati";
  const kitCode=/^(TAM|ITA|MNA|TRU|HB|AC|TAK|ZVE|RV|REV|DML|MENG|RFM)\d/.test(C)&&!has(/paint|color|colour|cement|glue|wash/i);
  if(kitCode&&!has(/\btracks?\b|vitrin|\bcase\b|display/i))return "Makete (kitovi)";
  if(has(/\btracks?\b|gusjenic|photo.?etch|metal barrel|vitrin|\bcase\b|display/i)&&!has(/wash|paint|boja|effects/i)&&!has(/\b1[:\/]\d+\b.*\b(tank|vehicle|car|kit)\b/i))return "Dodaci i pribor za makete";
  if(has(/\b1[:\/](16|24|35|48|72|76|100|144|200|350|700|1200)\b/)&&!has(/case|vitrin/i))return "Makete (kitovi)";
  if(/^RCM|^AKM/.test(C))return "Markeri";
  if(/^AKG\d/.test(C))return "Gvaš boje";
  if(/^AK10\d{3}$/.test(C))return "Weathering bojice (olovke)";
  if(/^AK17\d{3}$/.test(C))return "Quick Gen boje";
  if(/^AK8\d{3}$/.test(C))return "Teren i diorama";
  if(/^AK(12\d{3}|20\d\d)$/.test(C))return "Washevi i paneliner";
  if(/^AK4\d{3}$/.test(C))return "Efekti (emajl)";
  if(/^AMIG/.test(C)){const d=+(C.match(/\d+/)||[0])[0];return d>=2100&&d<2300?"Teren i diorama":d>=3000&&d<3100?"Pigmenti":(d>=700&&d<800)||(d>=1000&&d<1100)?"Washevi i paneliner":"Efekti (emajl)";}
  if(/^AK0\d\d$/.test(C)&&has(/effects|earth|dust|mud/i))return "Efekti (emajl)";
  return "";
}
function wishCats55(state){
  if(!state||!Array.isArray(state.zelje)||state._mig55_wishcat)return;
  state._mig55_wishcat=true;
  const invCats=Object.keys(state.inventar||{});
  state.zelje.forEach(w=>{
    if(/^Šifra:\s*/i.test(w.code||""))w.code=w.code.replace(/^Šifra:\s*/i,"").trim();
    if(/^ita\d/.test(w.code||""))w.code=w.code.toUpperCase();
    const g=wishCat55(w,invCats),cur=w.cat||"";
    const wrongMarker=cur==="Markeri"&&!/^(RCM|AKM)/i.test(String(w.code||"").replace(/[^A-Za-z0-9]/g,""));
    const isKitOrExtra=g==="Makete (kitovi)"||g==="Dodaci i pribor za makete";
    if(g&&(!cur||cur==="Ostalo"||wrongMarker||(isKitOrExtra&&cur!==g)))w.cat=g;
  });
}

function rebuildReceipts452(state){
  if(!state||state._mig452)return;
  state._mig452=true;
  rebuildFromReceipts(state);
}
function rebuildNow(){
  const r=rebuildFromReceipts(S);
  save();render();
  if(!r.inv&&!r.mk&&!r.members){showToast("Sve s računa već je u Inventaru i Maketama");return;}
  showToast("🧾 Složeno: "+r.inv+" stavki"+(r.members?" (+"+r.members+" članova kompleta)":"")+", "+r.mk+" maketa"+(r.created?" · "+r.created+" stvoreno iz računa":""));
}
function restoreRemoved(){
  const list=S.uklonjeno||[];
  if(!list.length){showToast("Nema uklonjenih stavki");return;}
  let nInv=0,nMk=0;
  list.forEach(e=>{
    if(e.kind==="makete"){
      if(!S.makete.some(m=>m.id===e.item.id)){S.makete.push(e.item);nMk++;}
    }else{
      const cat=e.cat;
      if(!S.inventar[cat]){S.inventar[cat]={items:[]};if(S.catOrder&&!S.catOrder.includes(cat))S.catOrder.push(cat);}
      if(!S.inventar[cat].items.some(i=>i.id===e.item.id)){S.inventar[cat].items.push(e.item);nInv++;}
    }
  });
  S.uklonjeno=[];
  save();render();
  showToast("↩ Vraćeno: "+nInv+" stavki"+(nMk?" i "+nMk+" maketa":""));
}
function migrateStages446(state){
  if(!state||state._mig446)return;
  const map={8:9,9:10,10:13,11:14};
  (state.makete||[]).forEach(m=>{if(m&&map[m.stage])m.stage=map[m.stage];});
  state._mig446=true;
}
(function populateStageSelect(){
  const sel=document.getElementById("mmStage");
  if(!sel)return;
  REDOSLIJED_STEPS.forEach(s=>{
    const opt=document.createElement("option");
    opt.value=s.n;opt.textContent=`${s.n}. ${s.icon} ${s.name}`;
    sel.appendChild(opt);
  });
})();
function goToRedoslijedStep(n){
  if(!n){showToast("Nema sljedećeg koraka — izrada je gotova 🎉");return;}
  showPage("redoslijed",document.querySelector(".nav-tab.t-redoslijed"));
  document.querySelector(".nav-tab.t-redoslijed").classList.add("active");
  setTimeout(()=>{
    const row=document.getElementById("rs-step-"+n);
    if(row){
      row.classList.add("upute-row-highlight");
      setTimeout(()=>row.classList.remove("upute-row-highlight"),1800);
      try{row.scrollIntoView({behavior:"smooth",block:"center"});}catch(e){}
    }
  },150);
}
function advanceModelStage(id){
  const m=S.makete.find(x=>x.id===id);if(!m)return;
  const cur=m.stage||0;
  if(cur>=REDOSLIJED_STEPS.length){showToast("Već je na zadnjem koraku ("+REDOSLIJED_STEPS[REDOSLIJED_STEPS.length-1].name+")");return;}
  m.stage=cur+1;
  save();renderMakete();
  showToast(`✓ Korak ${m.stage}: ${REDOSLIJED_STEPS[m.stage-1].name}`);
}
const CAT_TO_UPUTE={
  "AK Markeri – Kompleti":{section:"up-2",row:"Real Colors Markers"},
  "AK Markeri – Odvojeni":{section:"up-2",row:"Real Colors Markers"},
  "Playmarker":{section:"up-2",row:"Playmarkers"},
  "Oil Pencil (uljne bojice)":{section:"up-3",row:"Weathering Pencil"},
  "AK Gouache (gvaš boje)":{section:"up-1",row:"Gouache"},
  "Real Colors":{section:"up-2",row:"Real Colors"},
  "3Gen Acrylic Colors (3. generacija akrilnih boja)":{section:"up-1",row:"3GEN akril"},
  "Effects (efekti)":{section:"up-7",row:"Effects (Rust Streaks, Streaking Grime…)"},
  "Deposits (naslage)":{section:"up-7",row:"Deposits"},
  "Pigments (pigmenti)":{section:"up-4",row:"Dry Pigments"},
  "Primer – Ready for Airbrush (temeljni premaz za airbrush)":{section:"up-8",row:"Primeri (Primers)"},
  "Primer and Microfiller (temeljni premaz i mikropunilo)":{section:"up-8",row:"Primeri (Primers)"},
  "Precision Panel Liner (obrub panela)":{section:"up-7",row:"Panel Liners"},
  "Varnish (lak)":{section:"up-8",row:"Varnish (lak)"},
  "Cleaner & Thinner (čistač i razrjeđivač)":{section:"up-8",row:"Cleaner"},
  "Dual Exo Scenery (boje za dioramu/scenografiju)":{section:"up-1",row:"Dual EXO"},
  "Washes":{section:"up-7",row:"Washes (enamel)"},
  "Textures":{section:"up-6",row:"Terrain paste (Dry/Wet/Muddy Ground, Dark Earth…)"},
  "Effects Brusher":{section:"up-7",row:"Effects (Rust Streaks, Streaking Grime…)"},
  "Putty":{section:"up-8",row:"Putty (kit/glit)"},
  "LJEPILO":{section:"up-8",row:"Plastično ljepilo (cement)"},
  "Airbrush":{section:"up-8",row:"Airbrush (uređaj)"},
  "VALLEJO - ACRYLIC COLORS":{section:"up-1",row:"Vallejo / druge marke akrila"},
  "Decals":{section:"up-8",row:"Decal Setter / Softener"},
  "QUICK GEN":{section:"up-1",row:"Quick Gen"},
  "Model Air":{section:"up-1",row:"Vallejo / druge marke akrila"},
  "ACRYLIC COLOR":{section:"up-1",row:"Artist Dense"},
  "QUICK MARKER":{section:"up-2",row:"Quick Markers"},
};

Object.assign(CAT_TO_UPUTE,{
  "Akrilne boje":{section:"up-1",row:"3GEN akril"},
  "Real Colors (lak boje)":{section:"up-2",row:"Real Colors"},
  "Quick Gen boje":{section:"up-1",row:"Quick Gen"},
  "Markeri":{section:"up-2",row:"Real Colors Markers"},
  "Weathering bojice (olovke)":{section:"up-3",row:"Weathering Pencil"},
  "Gvaš boje":{section:"up-1",row:"Gouache"},
  "Washevi i paneliner":{section:"up-7",row:"Washes (enamel)"},
  "Efekti (emajl)":{section:"up-7",row:"Effects (Rust Streaks, Streaking Grime…)"},
  "Pigmenti":{section:"up-4",row:"Dry Pigments"},
  "Teren i diorama":{section:"up-6",row:"Terrain paste (Dry/Wet/Muddy Ground, Dark Earth…)"},
  "Temeljni premazi (primer)":{section:"up-8",row:"Primeri (Primers)"},
  "Lakovi":{section:"up-8",row:"Varnish (lak)"},
  "Razrjeđivači i čistači":{section:"up-8",row:"Cleaner"},
  "Ljepila i kitovi":{section:"up-8",row:"Plastično ljepilo (cement)"},
  "Decal sredstva":{section:"up-8",row:"Decal Setter / Softener"},
  "Airbrush i alati":{section:"up-8",row:"Airbrush (uređaj)"},
});
// v45: rubrike su po vrsti proizvoda — za pojedinačni proizvod biraj najbliži redak uputa po šifri
function uputeCatFor(cat,item){
  const c=String(item&&item.code||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  if(/^AKMQ/.test(c))return "QUICK MARKER";
  if(/^AKM\d/.test(c))return "Playmarker";
  if(/^AKAD/.test(c))return "ACRYLIC COLOR";
  if(/^AK406\d$/.test(c))return "Deposits (naslage)";
  if(/^AK15\d\d$/.test(c))return "Dual Exo Scenery (boje za dioramu/scenografiju)";
  if(/^AMIG18/.test(c))return "Effects Brusher";
  if(/^(AK12102|AK2073)$/.test(c))return "Precision Panel Liner (obrub panela)";
  if(/^AK10[34]$/.test(c))return "Putty";
  if(/^AK11\d{3}$/.test(c)&&cat==="Akrilne boje")return cat;
  if(cat==="Akrilne boje"&&(/vallejo/i.test(item.mfr||"")))return "VALLEJO - ACRYLIC COLORS";
  return cat;
}
function goToUpute(cat){
  const map=CAT_TO_UPUTE[cat];
  if(!map){showToast(`Nema posebnih uputa za "${cat}"`);return;}
  showPage("upute",document.querySelector(".nav-tab.t-upute"));
  document.querySelector(".nav-tab.t-upute").classList.add("active");
  setTimeout(()=>{
    scrollToUpute(map.section);
    setTimeout(()=>{
      const allWraps=[...document.querySelectorAll("#page-upute .ekv-table-wrap")];
      for(const wrap of allWraps){
        const tr=[...wrap.querySelectorAll("tbody tr")].find(r=>r.firstElementChild&&r.firstElementChild.textContent.trim().startsWith(map.row));
        if(tr){
          tr.classList.add("upute-row-highlight");
          setTimeout(()=>tr.classList.remove("upute-row-highlight"),1800);
          break;
        }
      }
    },450);
  },50);
  showToast(`→ Upute: "${cat}"`);
}
function goToCategory(cat){
  if(!S.inventar[cat]){showToast(`Kategorija "${cat}" nije u tvom inventaru`);return;}
  showPage("inventar",document.querySelector(".nav-tab.t-inv"));
  document.querySelector(".nav-tab.t-inv").classList.add("active");
  document.getElementById("searchInput").value="";
  search="";
  safeSessionSet("o_"+cat,"1");
  render();
  setTimeout(()=>{
    const el=document.querySelector(`[data-cat="${CSS.escape(cat)}"]`);
    if(el)el.scrollIntoView({behavior:"smooth",block:"start"});
  },200);
  showToast(`→ Kategorija "${cat}"`);
}
function scrollToUpute(id){
  const el=document.getElementById(id);
  if(el)el.scrollIntoView({behavior:"smooth",block:"start"});
}
function filterUpute(q){
  const query=q.trim().toLowerCase();
  const page=document.getElementById("page-upute");
  if(!page)return;
  let totalMatches=0;
  page.querySelectorAll(".ekv-table-wrap").forEach(wrap=>{
    let sectionMatches=0;
    wrap.querySelectorAll("tbody tr").forEach(tr=>{
      const hit=!query||tr.textContent.toLowerCase().includes(query);
      tr.style.display=hit?"":"none";
      if(hit)sectionMatches++;
    });
    totalMatches+=sectionMatches;
    // sakrij cijeli blok (naslov + tablicu) ako nema pogodaka u toj sekciji
    let block=wrap.previousElementSibling;
    while(block&&!block.classList.contains("section-hdr"))block=block.previousElementSibling;
    if(block)block.style.display=sectionMatches===0&&query?"none":"";
    wrap.style.display=sectionMatches===0&&query?"none":"";
  });
  const countEl=document.getElementById("uputeSearchCount");
  if(countEl)countEl.textContent=query?`${totalMatches} redaka odgovara pojmu "${q}"`:"";
}

// ── LIGHTBOX ───────────────────────────────────────────────────
function openLightboxForItem(cat,id,startIdx){
  const item=S.inventar[cat]?.items.find(i=>i.id===id);if(!item)return;
  let sources=getImgs(item).map(i=>({url:i.url,caption:item.code+" – "+item.name}));
  if(!sources.length&&IC[item.code]&&IC[item.code]!=="X")sources=[{url:IC[item.code],caption:item.code+" – "+item.name}];
  if(!sources.length){
    const el=document.querySelector(`.product-img[alt="${CSS.escape(item.code)}"]`);
    if(el&&el.src&&el.style.display!=="none")sources=[{url:el.src,caption:item.code+" – "+item.name}];
  }
  if(!sources.length){showToast("Nema slike za uvećati");return;}
  openLightbox(sources,startIdx||0);
}
function openLightbox(sources,idx){lbImgs=sources;lbIdx=Math.min(idx,sources.length-1);lbRender();document.getElementById("lightbox").classList.add("show");document.addEventListener("keydown",lbKeyHandler);}
function lbRender(){
  const img=document.getElementById("lbImg"),cap=document.getElementById("lbCaption");
  const dots=document.getElementById("lbDots"),prev=document.getElementById("lbPrev"),next=document.getElementById("lbNext");
  img.src=lbImgs[lbIdx].url;
  cap.textContent=lbImgs[lbIdx].caption+(lbImgs.length>1?" ("+(lbIdx+1)+"/"+lbImgs.length+")":"");
  dots.innerHTML=lbImgs.length>1?lbImgs.map((_,i)=>`<div class="lightbox-dot${i===lbIdx?" active":""}" onclick="event.stopPropagation();lbGoto(${i})"></div>`).join(""):"";
  prev.style.display=next.style.display=lbImgs.length>1?"flex":"none";
  prev.style.opacity=lbIdx>0?"1":"0.3";next.style.opacity=lbIdx<lbImgs.length-1?"1":"0.3";
}
function lbNav(dir){lbIdx=Math.max(0,Math.min(lbImgs.length-1,lbIdx+dir));lbRender();}
function lbGoto(i){lbIdx=i;lbRender();}
function closeLightbox(){document.getElementById("lightbox").classList.remove("show");document.removeEventListener("keydown",lbKeyHandler);}
function lbKeyHandler(e){if(e.key==="Escape")closeLightbox();if(e.key==="ArrowLeft")lbNav(-1);if(e.key==="ArrowRight")lbNav(1);}

// ── NAV ────────────────────────────────────────────────────────
function showPage(p,btn){
  page=p;
  document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
  document.getElementById("page-"+p).classList.add("active");
  document.querySelectorAll(".nav-tab").forEach(t=>t.classList.remove("active"));
  if(btn)btn.classList.add("active");
  else{const t=document.querySelector(".nav-tab.t-"+p.replace("inventar","inv"));if(t)t.classList.add("active");}
  const isInv=p==="inventar";
  document.getElementById("filterTabs").style.display=isInv?"flex":"none";
  document.getElementById("viewToggle").style.display=isInv?"flex":"none";
  document.getElementById("bottomBar").style.display=isInv?"flex":"none";
  document.getElementById("filterPanelBtn").style.display=isInv?"inline-block":"none";
  closeFilterPanel();
  document.getElementById("bulkToggleBtn").style.display=isInv?"inline-block":"none";
  if(!isInv){bulkMode=false;bulkSelected.clear();document.getElementById("bulkToggleBtn").classList.remove("active");}
  if(p==="ekvivalencije"){
    // Uvijek osvježi (ne samo prvi put) da "već imaš" oznake prate trenutno
    // stanje inventara, npr. nakon što korisnik kupi zamjensku boju.
    const q=document.getElementById("ekvSearch")?.value||"";
    renderEkvTable(q);
  }
  else render();
  updateBulkBar();
}
function setFilter(f){filter=f;document.querySelectorAll(".ftab").forEach(btn=>{btn.className="ftab";if(btn.dataset.filter===f)btn.classList.add("active-"+f);});render();}
let _searchDebounce=null;
function onSearch(v){
  clearTimeout(_searchDebounce);
  _searchDebounce=setTimeout(()=>{search=v;render();renderSearchDropdown(v);},180);
}

// ── PRETRAGA KROZ SVE RUBRIKE ────────────────────────────────────
// Svaka pojedina stranica filtrira samo svoj vlastiti sadržaj prema
// globalnoj varijabli "search" (vidi renderInv/renderZelje/renderMakete).
// Ovaj dio dodatno prikazuje padajući izbornik s
// rezultatima IZ SVIH rubrika odjednom (bez obzira koja je stranica
// trenutno aktivna) - klik na rezultat prebacuje na tu stranicu i
// skrolira/istakne pronađenu stavku.
function closeSearchDropdown(){
  const dd=document.getElementById("searchDropdown");
  if(dd){dd.classList.remove("open");dd.innerHTML="";}
}
function renderSearchDropdown(v){
  const dd=document.getElementById("searchDropdown");
  if(!dd)return;
  const q=(v||"").trim().toLowerCase();
  if(!q){closeSearchDropdown();return;}
  const MAXG=6;
  const groups=[];

  const invMatches=[];
  for(const [cat,cd] of Object.entries(S.inventar)){
    for(const it of cd.items){
      if(it.name.toLowerCase().includes(q)||it.code.toLowerCase().includes(q)||(it.mfr||"").toLowerCase().includes(q)||(it.note||"").toLowerCase().includes(q)||(it.tags||[]).some(t=>t.toLowerCase().includes(q))){
        invMatches.push({cat,it});
      }
    }
  }
  if(invMatches.length)groups.push({label:`Inventar (${invMatches.length})`,extra:invMatches.length-MAXG,
    rows:invMatches.slice(0,MAXG).map(({cat,it})=>`<div class="search-dropdown-item" onclick="jumpToSearchResult('inventar','${esc(cat)}','${it.id}')"><span class="sdi-name">${esc(it.name)}</span><span class="sdi-meta">${esc(it.code)} · ${esc(cat)}</span></div>`)});

  const zeljaMatches=S.zelje.filter(w=>w.name.toLowerCase().includes(q)||(w.code||"").toLowerCase().includes(q)||(w.desc||"").toLowerCase().includes(q)||(w.note||"").toLowerCase().includes(q)||(w.cat||"").toLowerCase().includes(q));
  if(zeljaMatches.length)groups.push({label:`Želje (${zeljaMatches.length})`,extra:zeljaMatches.length-MAXG,
    rows:zeljaMatches.slice(0,MAXG).map(w=>`<div class="search-dropdown-item" onclick="jumpToSearchResult('zelje',null,'${w.id}')"><span class="sdi-name">✦ ${esc(w.name)}</span><span class="sdi-meta">${esc(w.code||"–")}${w.cat?` · ${esc(w.cat)}`:""}</span></div>`)});

  const maketeMatches=S.makete.filter(m=>m.name.toLowerCase().includes(q)||(m.code||"").toLowerCase().includes(q)||(m.mfr||"").toLowerCase().includes(q)||(m.comment||"").toLowerCase().includes(q)||(m.scale||"").toLowerCase().includes(q));
  if(maketeMatches.length)groups.push({label:`Makete (${maketeMatches.length})`,extra:maketeMatches.length-MAXG,
    rows:maketeMatches.slice(0,MAXG).map(m=>`<div class="search-dropdown-item" onclick="jumpToSearchResult('makete',null,'${m.id}')"><span class="sdi-name">⬡ ${esc(m.name)}</span><span class="sdi-meta">${esc(m.code||"–")}${m.scale?` · ${esc(m.scale)}`:""}</span></div>`)});

  const ordMatches=(S.narudzbe||[]).filter(o=>(o.label||"").toLowerCase().includes(q)||(o.items||[]).some(it=>(it.name||"").toLowerCase().includes(q)||(it.code||"").toLowerCase().includes(q)));
  if(ordMatches.length)groups.push({label:`Računi (${ordMatches.length})`,extra:ordMatches.length-MAXG,
    rows:ordMatches.slice(0,MAXG).map(o=>`<div class="search-dropdown-item" onclick="jumpToSearchResult('narudzba',null,'${o.id}')"><span class="sdi-name">🧾 ${esc(o.label)}</span><span class="sdi-meta">${new Date(o.date||Date.now()).toLocaleDateString("hr-HR")}</span></div>`)});

  const izvorMatches=(S.resursi||[]).filter(r=>r.title.toLowerCase().includes(q)||(r.note||"").toLowerCase().includes(q)||(r.url||"").toLowerCase().includes(q));
  if(izvorMatches.length)groups.push({label:`Izvori (${izvorMatches.length})`,extra:izvorMatches.length-MAXG,
    rows:izvorMatches.slice(0,MAXG).map(r=>`<div class="search-dropdown-item" onclick="jumpToSearchResult('izvori',null,'${r.id}')"><span class="sdi-name">🔗 ${esc(r.title)}</span><span class="sdi-meta">${esc((IZVOR_TIPOVI[r.type]||IZVOR_TIPOVI.ostalo).lbl)} · ${esc(izvorHostname(r.url))}</span></div>`)});

  const oznakeMatches=OZNAKE_DATA.filter(o=>o.caption.toLowerCase().includes(q)||(o.source||"").toLowerCase().includes(q));
  if(oznakeMatches.length)groups.push({label:`Oznake (${oznakeMatches.length})`,extra:oznakeMatches.length-MAXG,
    rows:oznakeMatches.slice(0,MAXG).map(o=>`<div class="search-dropdown-item" onclick="jumpToSearchResult('oznake',null,'${o.id}')"><span class="sdi-name">🎖️ ${esc(o.caption)}</span><span class="sdi-meta">${esc(o.source||"")}</span></div>`)});

  if(!groups.length){
    dd.innerHTML='<div class="search-dropdown-empty">Nema rezultata ni u jednoj rubrici.</div>';
    dd.classList.add("open");
    return;
  }
  dd.innerHTML=groups.map(g=>`<div class="search-dropdown-group-lbl">${g.label}</div>${g.rows.join("")}${g.extra>0?`<div class="search-dropdown-more">+ još ${g.extra}…</div>`:""}`).join("");
  dd.classList.add("open");
}
function _searchJumpHighlight(sel){
  setTimeout(()=>{
    const el=document.querySelector(sel);
    if(!el)return;
    el.scrollIntoView({behavior:"smooth",block:"center"});
    el.classList.add("search-jump-highlight");
    setTimeout(()=>el.classList.remove("search-jump-highlight"),1800);
  },150);
}
function jumpToSearchResult(type,catOrNull,id){
  closeSearchDropdown();
  const si=document.getElementById("searchInput");if(si)si.blur();
  if(type==="inventar"){
    safeSessionSet("o_"+catOrNull,"1");
    showPage("inventar",document.querySelector(".nav-tab.t-inv"));
    _searchJumpHighlight(`.product[data-id="${CSS.escape(id)}"]`);
  }else if(type==="zelje"){
    showPage("zelje",document.querySelector(".nav-tab.t-zelje"));
    _searchJumpHighlight(`#wishBody tr[data-id="${CSS.escape(id)}"]`);
  }else if(type==="makete"){
    showPage("makete",document.querySelector(".nav-tab.t-makete"));
    _searchJumpHighlight(`.model-card[data-id="${CSS.escape(id)}"]`);
  }else if(type==="narudzba"){
    const ord=(S.narudzbe||[]).find(o=>o.id===id);
    if(ord&&ord.collapsed){ord.collapsed=false;save();}
    showPage("narudzba",document.querySelector(".nav-tab.t-narudzba"));
    _searchJumpHighlight(`.narudzba-card[data-id="${CSS.escape(id)}"]`);
  }else if(type==="izvori"){
    izvorFilter="sve";
    izvoriMaketaFilter=null;
    showPage("izvori",document.querySelector(".nav-tab.t-izvori"));
    _searchJumpHighlight(`#izvoriBody tr[data-id="${CSS.escape(id)}"]`);
  }else if(type==="oznake"){
    oznakeFilter="sve";
    showPage("oznake",document.querySelector(".nav-tab.t-oznake"));
    setTimeout(()=>{if(typeof ozView==="function")ozView(id);},150);
  }
}
document.addEventListener("click",e=>{
  const wrap=document.querySelector(".nav-search-wrap");
  if(!wrap||wrap.contains(e.target))return;
  closeSearchDropdown();
});
async function openNewCatModal(){
  const n=await customPrompt("Nova kategorija","Naziv nove kategorije:");
  if(!n?.trim())return;
  if(S.inventar[n.trim()]){await customConfirm("Kategorija već postoji!","Greška",{okOnly:true});return;}
  S.inventar[n.trim()]={items:[]};if(!S.catOrder)S.catOrder=Object.keys(S.inventar);S.catOrder.push(n.trim());save();render();
}
async function resetData(){
  const ok=await customConfirm("Ovo će trajno obrisati sve tvoje promjene i vratiti tvornički popis podataka. Prije toga preporučamo napraviti Backup. Nastaviti s resetiranjem?","Resetirati sve podatke?");
  if(!ok)return;
  S=JSON.parse(JSON.stringify(DD));S.narudzbe=[];S.activeNarudzbaId=null;S.resursi=S.resursi||[];save();render();
}

// ── HELP MODAL ─────────────────────────────────────────────────
function openHelpModal(){document.getElementById("helpModal").style.display="flex";}
function closeHelpModal(){document.getElementById("helpModal").style.display="none";}

// ── CUSTOM CONFIRM / PROMPT (zamjena za window.confirm/prompt) ─
function customConfirm(message,title="Potvrda",opts={}){
  return new Promise(resolve=>{
    const modal=document.getElementById("customDialogModal");
    document.getElementById("cdTitle").textContent=title;
    document.getElementById("cdMessage").textContent=message;
    const input=document.getElementById("cdInput");input.style.display="none";
    const okBtn=document.getElementById("cdOkBtn"),cancelBtn=document.getElementById("cdCancelBtn");
    okBtn.textContent="Potvrdi";cancelBtn.style.display=opts.okOnly?"none":"inline-block";
    modal.style.display="flex";
    const cleanup=(val)=>{modal.style.display="none";okBtn.onclick=null;cancelBtn.onclick=null;resolve(val);};
    okBtn.onclick=()=>cleanup(true);
    cancelBtn.onclick=()=>cleanup(false);
  });
}
function customPrompt(title,message,defaultVal=""){
  return new Promise(resolve=>{
    const modal=document.getElementById("customDialogModal");
    document.getElementById("cdTitle").textContent=title;
    document.getElementById("cdMessage").textContent=message;
    const input=document.getElementById("cdInput");input.style.display="block";input.value=defaultVal;
    const okBtn=document.getElementById("cdOkBtn"),cancelBtn=document.getElementById("cdCancelBtn");
    okBtn.textContent="Spremi";cancelBtn.style.display="inline-block";
    modal.style.display="flex";
    setTimeout(()=>input.focus(),50);
    const cleanup=(val)=>{modal.style.display="none";okBtn.onclick=null;cancelBtn.onclick=null;input.onkeydown=null;resolve(val);};
    okBtn.onclick=()=>cleanup(input.value);
    cancelBtn.onclick=()=>cleanup(null);
    input.onkeydown=(e)=>{if(e.key==="Enter"){e.preventDefault();cleanup(input.value);}};
  });
}

// ── KEYBOARD ───────────────────────────────────────────────────
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){closeProdModal();closeImgModal();closeWishModal();closeBuyModal();closeModelModal();closeMoveToWishModal();closeLightbox();closeHelpModal();}
  if(e.key==="Enter"&&!e.shiftKey){
    if(document.getElementById("prodModal").style.display!=="none")submitProd();
    else if(document.getElementById("wishModal").style.display!=="none")submitWish();
    else if(document.getElementById("modelModal").style.display!=="none")submitModel();
    else if(document.getElementById("moveToWishModal").style.display!=="none")confirmMoveToWish();
  }
});

// ── CHECK IF PRODUCT EXISTS IN INVENTAR ───────────────────────
function checkWishExists(){
  const code=document.getElementById("wmCode").value.trim().toUpperCase();
  const name=document.getElementById("wmName").value.trim().toLowerCase();
  const warn=document.getElementById("wmWarn");
  if(!code&&!name){warn.style.display="none";return;}
  
  let foundInInv=null;
  for(const [cat,cd] of Object.entries(S.inventar)){
    for(const item of cd.items){
      const codeMatch=code&&item.code.toUpperCase()===code;
      const nameMatch=name.length>2&&item.name.toLowerCase().includes(name);
      if(codeMatch||nameMatch){foundInInv={item,cat};break;}
    }
    if(foundInInv)break;
  }
  
  const alreadyInZelje=S.zelje.some(w=>(code&&w.code.toUpperCase()===code)||(name.length>2&&w.name.toLowerCase().includes(name)));
  
  if(foundInInv){
    const {item,cat}=foundInInv;
    const status=item.status==="imam"?"✓ IMAM":"✗ NEMAM";
    warn.style.display="block";
    warn.style.color=item.status==="imam"?"var(--imam-txt)":"var(--nemam-txt)";
    warn.style.background=item.status==="imam"?"rgba(34,197,94,0.08)":"rgba(248,113,113,0.08)";
    warn.style.borderColor=item.status==="imam"?"rgba(34,197,94,0.3)":"rgba(248,113,113,0.3)";
    warn.textContent=`${status} u inventaru – kategorija "${cat}"${alreadyInZelje?" · već na popisu Želja":""}`;
  }else if(alreadyInZelje){
    warn.style.display="block";
    warn.style.color="var(--gold)";
    warn.style.background="rgba(194,160,74,0.08)";
    warn.style.borderColor="rgba(194,160,74,0.3)";
    warn.textContent="⚠️ Već je na popisu Želja!";
  }else{
    warn.style.display="none";
  }
}


buildColorSearchIndex();
render();
