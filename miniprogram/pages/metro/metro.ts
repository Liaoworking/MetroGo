// metro.ts
// 超级有用的地铁线路图网站
// https://commons.m.wikimedia.org/wiki/Category:Maps_of_Shanghai_Metro
// 定义类型接口
interface Line {
  id: string;
  name: string;
  color: string;
}

interface Station {
  id: string;
  name: string;
  transfers: string[];
  longitude?: number;  // 经度
  latitude?: number;   // 纬度
}

interface TransferInfo {
  fromLine: string;
  toLine: string;
  fromStation: string;
  toStation: string;
  bestCarriage: string;
  description: string;
}

interface StationMap {
  [key: string]: Station[];
}

interface TransferInfoMap {
  [key: string]: TransferInfo;
}


Component({
  data: {
    // 上海地铁线路数据
    lines: [
      { id: '1', name: '1号线', color: '#FF4D4F' }, // 红色
      { id: '2', name: '2号线', color: '#73D13D' }, // 绿色
      { id: '3', name: '3号线', color: '#FFDE59' }, // 黄色
      { id: '4', name: '4号线', color: '#722ED1' }, // 紫色
      { id: '5', name: '5号线', color: '#FAAD14' }, // 紫红色
      { id: '6', name: '6号线', color: '#13C2C2' }, // 品红色
      { id: '7', name: '7号线', color: '#FF8C00' }, // 橙色
      { id: '8', name: '8号线', color: '#007AFF' }, // 蓝色
      { id: '9', name: '9号线', color: '#D4AF37' }, // 金色
      { id: '10', name: '10号线', color: '#D897EB' }, // 淡紫色
      { id: '11', name: '11号线', color: '#A52A2A' }, // 棕色
      { id: '12', name: '12号线', color: '#0FC6C2' }, // 深绿色
      { id: '13', name: '13号线', color: '#FF9999' }, // 粉色
      { id: '14', name: '14号线', color: '#4169E1' }, // 深蓝色
      { id: '15', name: '15号线', color: '#F7BA1E' }, // 金色
      { id: '16', name: '16号线', color: '#2F54EB' }, // 深蓝色
      { id: '17', name: '17号线', color: '#00FFFF' }, // 青色
      { id: '18', name: '18号线', color: '#556B2F' }, // 橄榄绿
      { id: '浦江线', name: '浦江线', color: '#86909C' }, // 灰色
      { id: '磁悬浮', name: '磁悬浮', color: '#E8684A' } // 橙色
    ] as Line[],
    // 各线路的站点信息
    stationsByLine: {
      '1': [
        { id: '1-1', name: '莘庄', transfers: ['5'] },
        { id: '1-2', name: '外环路', transfers: [] },
        { id: '1-3', name: '莲花路', transfers: [] },
        { id: '1-4', name: '锦江乐园', transfers: [] },
        { id: '1-5', name: '上海南站', transfers: ['3'] },
        { id: '1-6', name: '漕宝路', transfers: ['12'] },
        { id: '1-7', name: '上海体育馆', transfers: ['4'] },
        { id: '1-8', name: '徐家汇', transfers: ['9', '11'] },
        { id: '1-9', name: '衡山路', transfers: [] },
        { id: '1-10', name: '常熟路', transfers: ['7'] },
        { id: '1-11', name: '陕西南路', transfers: ['10'] },
        { id: '1-12', name: '黄陂南路', transfers: [] },
        { id: '1-13', name: '人民广场', transfers: ['2', '8'] },
        { id: '1-14', name: '新闸路', transfers: [] },
        { id: '1-15', name: '汉中路', transfers: ['12', '13'] },
        { id: '1-16', name: '上海火车站', transfers: ['3', '4'] },
        { id: '1-17', name: '中山北路', transfers: [] },
        { id: '1-18', name: '延长路', transfers: [] },
        { id: '1-19', name: '上海马戏城', transfers: [] },
        { id: '1-20', name: '汶水路', transfers: [] },
        { id: '1-21', name: '彭浦新村', transfers: [] },
        { id: '1-22', name: '共康路', transfers: [] },
        { id: '1-23', name: '通河新村', transfers: [] },
        { id: '1-24', name: '呼兰路', transfers: [] },
        { id: '1-25', name: '共富新村', transfers: [] },
        { id: '1-26', name: '宝安公路', transfers: [] },
        { id: '1-27', name: '友谊西路', transfers: [] },
        { id: '1-28', name: '富锦路', transfers: [] }
      ],
      '2': [
        { id: '2-1', name: '徐泾东', transfers: [] },
        { id: '2-2', name: '虹桥火车站', transfers: ['10', '17'] },
        { id: '2-3', name: '虹桥2号航站楼', transfers: ['10', '17'] },
        { id: '2-4', name: '淞虹路', transfers: [] },
        { id: '2-5', name: '北新泾', transfers: [] },
        { id: '2-6', name: '威宁路', transfers: [] },
        { id: '2-7', name: '娄山关路', transfers: [] },
        { id: '2-8', name: '中山公园', transfers: ['3', '4'] },
        { id: '2-9', name: '江苏路', transfers: ['11'] },
        { id: '2-10', name: '静安寺', transfers: ['7', '14'] },
        { id: '2-11', name: '南京西路', transfers: ['12', '13'] },
        { id: '2-12', name: '人民广场', transfers: ['1', '8'] },
        { id: '2-13', name: '南京东路', transfers: ['10'] },
        { id: '2-14', name: '陆家嘴', transfers: [] },
        { id: '2-15', name: '东昌路', transfers: [] },
        { id: '2-16', name: '世纪大道', transfers: ['4', '6', '9'] },
        { id: '2-17', name: '上海科技馆', transfers: [] },
        { id: '2-18', name: '世纪公园', transfers: [] },
        { id: '2-19', name: '龙阳路', transfers: ['7', '16', '磁悬浮'] },
        { id: '2-20', name: '张江高科', transfers: [] },
        { id: '2-21', name: '金科路', transfers: [] },
        { id: '2-22', name: '广兰路', transfers: [] },
        { id: '2-23', name: '唐镇', transfers: [] },
        { id: '2-24', name: '创新中路', transfers: [] },
        { id: '2-25', name: '华夏东路', transfers: [] },
        { id: '2-26', name: '川沙', transfers: [] },
        { id: '2-27', name: '凌空路', transfers: [] },
        { id: '2-28', name: '远东大道', transfers: [] },
        { id: '2-29', name: '海天三路', transfers: [] },
        { id: '2-30', name: '浦东国际机场', transfers: [] }
      ],
      // 3号线站点数据
      '3': [
        { id: '3-1', name: '上海南站', transfers: ['1'] },
        { id: '3-2', name: '石龙路', transfers: [] },
        { id: '3-3', name: '龙漕路', transfers: ['12'] },
        { id: '3-4', name: '漕溪路', transfers: [] },
        { id: '3-5', name: '宜山路', transfers: ['4', '9'] },
        { id: '3-6', name: '虹桥路', transfers: ['4', '10'] },
        { id: '3-7', name: '延安西路', transfers: [] },
        { id: '3-8', name: '中山公园', transfers: ['2', '4'] },
        { id: '3-9', name: '金沙江路', transfers: ['4', '13'] },
        { id: '3-10', name: '曹杨路', transfers: ['4', '11'] },
        { id: '3-11', name: '镇坪路', transfers: ['4', '7'] },
        { id: '3-12', name: '中潭路', transfers: [] },
        { id: '3-13', name: '上海火车站', transfers: ['1', '4'] },
        { id: '3-14', name: '宝山路', transfers: ['4', '10'] },
        { id: '3-15', name: '东宝兴路', transfers: [] },
        { id: '3-16', name: '虹口足球场', transfers: ['8'] },
        { id: '3-17', name: '赤峰路', transfers: [] },
        { id: '3-18', name: '大柏树', transfers: [] },
        { id: '3-19', name: '江湾镇', transfers: [] },
        { id: '3-20', name: '殷高西路', transfers: [] },
        { id: '3-21', name: '长江南路', transfers: [] },
        { id: '3-22', name: '淞发路', transfers: [] },
        { id: '3-23', name: '张华浜', transfers: [] },
        { id: '3-24', name: '淞滨路', transfers: [] },
        { id: '3-25', name: '水产路', transfers: [] },
        { id: '3-26', name: '宝杨路', transfers: [] },
        { id: '3-27', name: '友谊路', transfers: [] },
        { id: '3-28', name: '铁力路', transfers: [] },
        { id: '3-29', name: '江杨北路', transfers: [] }
      ],
      // 4号线站点数据（环线）
      '4': [
        { id: '4-1', name: '宜山路', transfers: ['3', '9'] },
        { id: '4-2', name: '虹桥路', transfers: ['3', '10'] },
        { id: '4-3', name: '延安西路', transfers: ['3'] },
        { id: '4-4', name: '中山公园', transfers: ['2', '3'] },
        { id: '4-5', name: '金沙江路', transfers: ['3', '13'] },
        { id: '4-6', name: '曹杨路', transfers: ['3', '11'] },
        { id: '4-7', name: '镇坪路', transfers: ['3', '7'] },
        { id: '4-8', name: '中潭路', transfers: ['3'] },
        { id: '4-9', name: '上海火车站', transfers: ['1', '3'] },
        { id: '4-10', name: '宝山路', transfers: ['3', '10'] },
        { id: '4-11', name: '海伦路', transfers: ['10'] },
        { id: '4-12', name: '临平路', transfers: [] },
        { id: '4-13', name: '大连路', transfers: ['12'] },
        { id: '4-14', name: '杨树浦路', transfers: [] },
        { id: '4-15', name: '浦东大道', transfers: [] },
        { id: '4-16', name: '世纪大道', transfers: ['2', '6', '9'] },
        { id: '4-17', name: '浦电路', transfers: [] },
        { id: '4-18', name: '蓝村路', transfers: ['6'] },
        { id: '4-19', name: '塘桥', transfers: [] },
        { id: '4-20', name: '南浦大桥', transfers: [] },
        { id: '4-21', name: '西藏南路', transfers: ['8'] },
        { id: '4-22', name: '鲁班路', transfers: [] },
        { id: '4-23', name: '大木桥路', transfers: [] },
        { id: '4-24', name: '东安路', transfers: ['7'] },
        { id: '4-25', name: '上海体育馆', transfers: ['1'] },
        { id: '4-26', name: '宜山路', transfers: ['3', '9'] }
      ],
      // 5号线站点数据
      '5': [
        { id: '5-1', name: '莘庄', transfers: ['1'] },
        { id: '5-2', name: '春申路', transfers: [] },
        { id: '5-3', name: '银都路', transfers: [] },
        { id: '5-4', name: '颛桥', transfers: [] },
        { id: '5-5', name: '北桥', transfers: [] },
        { id: '5-6', name: '剑川路', transfers: [] },
        { id: '5-7', name: '东川路', transfers: [] },
        { id: '5-8', name: '金平路', transfers: [] },
        { id: '5-9', name: '华宁路', transfers: [] },
        { id: '5-10', name: '文井路', transfers: [] },
        { id: '5-11', name: '闵行开发区', transfers: [] },
        { id: '5-12', name: '东川路', transfers: [] },
        { id: '5-13', name: '江川路', transfers: [] },
        { id: '5-14', name: '西渡', transfers: [] },
        { id: '5-15', name: '萧塘', transfers: [] },
        { id: '5-16', name: '奉浦大道', transfers: [] },
        { id: '5-17', name: '环城东路', transfers: [] },
        { id: '5-18', name: '望园路', transfers: [] },
        { id: '5-19', name: '金海湖', transfers: [] },
        { id: '5-20', name: '奉贤新城', transfers: [] }
      ],
      // 8号线站点数据
      '8': [
        { id: '8-1', name: '沈杜公路', transfers: ['浦江线'] },
        { id: '8-2', name: '联航路', transfers: [] },
        { id: '8-3', name: '江月路', transfers: [] },
        { id: '8-4', name: '浦江镇', transfers: [] },
        { id: '8-5', name: '芦恒路', transfers: [] },
        { id: '8-6', name: '凌兆新村', transfers: [] },
        { id: '8-7', name: '东方体育中心', transfers: ['6', '11'] },
        { id: '8-8', name: '杨思', transfers: [] },
        { id: '8-9', name: '成山路', transfers: ['13'] },
        { id: '8-10', name: '耀华路', transfers: ['7'] },
        { id: '8-11', name: '周家渡', transfers: [] },
        { id: '8-12', name: '西藏南路', transfers: ['4'] },
        { id: '8-13', name: '大世界', transfers: [] },
        { id: '8-14', name: '人民广场', transfers: ['1', '2'] },
        { id: '8-15', name: '曲阜路', transfers: ['12'] },
        { id: '8-16', name: '中兴路', transfers: [] },
        { id: '8-17', name: '西藏北路', transfers: ['12'] },
        { id: '8-18', name: '虹口足球场', transfers: ['3'] },
        { id: '8-19', name: '曲阳路', transfers: [] },
        { id: '8-20', name: '四平路', transfers: ['10'] },
        { id: '8-21', name: '鞍山新村', transfers: [] },
        { id: '8-22', name: '江浦路', transfers: [] },
        { id: '8-23', name: '黄兴路', transfers: [] },
        { id: '8-24', name: '延吉中路', transfers: [] },
        { id: '8-25', name: '黄兴公园', transfers: [] },
        { id: '8-26', name: '翔殷路', transfers: [] },
        { id: '8-27', name: '嫩江路', transfers: [] },
        { id: '8-28', name: '市光路', transfers: [] }
      ],
      // 9号线站点数据
      '9': [
        { id: '9-1', name: '松江南站', transfers: [] },
        { id: '9-2', name: '醉白池', transfers: [] },
        { id: '9-3', name: '松江体育中心', transfers: [] },
        { id: '9-4', name: '松江新城', transfers: [] },
        { id: '9-5', name: '洞泾', transfers: [] },
        { id: '9-6', name: '佘山', transfers: [] },
        { id: '9-7', name: '泗泾', transfers: [] },
        { id: '9-8', name: '九亭', transfers: [] },
        { id: '9-9', name: '中春路', transfers: [] },
        { id: '9-10', name: '七宝', transfers: [] },
        { id: '9-11', name: '星中路', transfers: [] },
        { id: '9-12', name: '合川路', transfers: [] },
        { id: '9-13', name: '漕河泾开发区', transfers: [] },
        { id: '9-14', name: '桂林路', transfers: [] },
        { id: '9-15', name: '宜山路', transfers: ['3', '4'] },
        { id: '9-16', name: '徐家汇', transfers: ['1', '11'] },
        { id: '9-17', name: '肇嘉浜路', transfers: [] },
        { id: '9-18', name: '嘉善路', transfers: ['12'] },
        { id: '9-19', name: '打浦桥', transfers: [] },
        { id: '9-20', name: '马当路', transfers: ['13'] },
        { id: '9-21', name: '陆家浜路', transfers: ['8'] },
        { id: '9-22', name: '小南门', transfers: [] },
        { id: '9-23', name: '商城路', transfers: [] },
        { id: '9-24', name: '世纪大道', transfers: ['2', '4', '6'] },
        { id: '9-25', name: '杨高中路', transfers: [] },
        { id: '9-26', name: '芳甸路', transfers: [] },
        { id: '9-27', name: '蓝天路', transfers: [] },
        { id: '9-28', name: '台儿庄路', transfers: [] },
        { id: '9-29', name: '金桥', transfers: [] },
        { id: '9-30', name: '金海路', transfers: [] },
        { id: '9-31', name: '顾唐路', transfers: [] },
        { id: '9-32', name: '民雷路', transfers: [] },
        { id: '9-33', name: '曹路', transfers: [] }
      ],
      // 10号线站点数据
      '10': [
        { id: '10-1', name: '新江湾城', transfers: [] },
        { id: '10-2', name: '殷高东路', transfers: [] },
        { id: '10-3', name: '三门路', transfers: [] },
        { id: '10-4', name: '江湾体育场', transfers: [] },
        { id: '10-5', name: '五角场', transfers: [] },
        { id: '10-6', name: '国权路', transfers: [] },
        { id: '10-7', name: '同济大学', transfers: [] },
        { id: '10-8', name: '四平路', transfers: ['8'] },
        { id: '10-9', name: '邮电新村', transfers: [] },
        { id: '10-10', name: '海伦路', transfers: ['4'] },
        { id: '10-11', name: '四川北路', transfers: [] },
        { id: '10-12', name: '天潼路', transfers: [] },
        { id: '10-13', name: '南京东路', transfers: ['2'] },
        { id: '10-14', name: '豫园', transfers: [] },
        { id: '10-15', name: '老西门', transfers: ['8', '13'] },
        { id: '10-16', name: '新天地', transfers: [] },
        { id: '10-17', name: '陕西南路', transfers: ['1'] },
        { id: '10-18', name: '上海图书馆', transfers: [] },
        { id: '10-19', name: '交通大学', transfers: ['11'] },
        { id: '10-20', name: '虹桥路', transfers: ['3', '4'] },
        { id: '10-21', name: '宋园路', transfers: [] },
        { id: '10-22', name: '伊犁路', transfers: [] },
        { id: '10-23', name: '水城路', transfers: [] },
        { id: '10-24', name: '龙溪路', transfers: [] },
        { id: '10-25', name: '上海动物园', transfers: [] },
        { id: '10-26', name: '虹桥1号航站楼', transfers: [] },
        { id: '10-27', name: '虹桥2号航站楼', transfers: ['2', '17'] },
        { id: '10-28', name: '虹桥火车站', transfers: ['2', '17'] }
      ],
      // 6号线站点数据
      '6': [
        { id: '6-1', name: '港城路', transfers: ['10'] },
        { id: '6-2', name: '外高桥保税区北站', transfers: [] },
        { id: '6-3', name: '航津路', transfers: [] },
        { id: '6-4', name: '外高桥保税区南站', transfers: [] },
        { id: '6-5', name: '洲海路', transfers: [] },
        { id: '6-6', name: '五洲大道', transfers: [] },
        { id: '6-7', name: '东靖路', transfers: [] },
        { id: '6-8', name: '巨峰路', transfers: ['12'] },
        { id: '6-9', name: '五莲路', transfers: [] },
        { id: '6-10', name: '博兴路', transfers: [] },
        { id: '6-11', name: '金桥路', transfers: [] },
        { id: '6-12', name: '云山路', transfers: [] },
        { id: '6-13', name: '德平路', transfers: [] },
        { id: '6-14', name: '北洋泾路', transfers: [] },
        { id: '6-15', name: '民生路', transfers: [] },
        { id: '6-16', name: '源深体育中心', transfers: [] },
        { id: '6-17', name: '世纪大道', transfers: ['2', '4', '9'] },
        { id: '6-18', name: '浦电路', transfers: [] },
        { id: '6-19', name: '蓝村路', transfers: ['4'] },
        { id: '6-20', name: '上海儿童医学中心', transfers: [] },
        { id: '6-21', name: '临沂新村', transfers: [] },
        { id: '6-22', name: '高科西路', transfers: ['7'] },
        { id: '6-23', name: '东明路', transfers: ['13'] },
        { id: '6-24', name: '高青路', transfers: [] },
        { id: '6-25', name: '华夏西路', transfers: [] },
        { id: '6-26', name: '上南路', transfers: [] },
        { id: '6-27', name: '灵岩南路', transfers: [] }
      ],
      // 7号线站点数据
      '7': [
        { id: '7-1', name: '美兰湖', transfers: [] },
        { id: '7-2', name: '罗南新村', transfers: [] },
        { id: '7-3', name: '潘广路', transfers: [] },
        { id: '7-4', name: '刘行', transfers: [] },
        { id: '7-5', name: '顾村公园', transfers: [] },
        { id: '7-6', name: '祁华路', transfers: [] },
        { id: '7-7', name: '上海大学', transfers: [] },
        { id: '7-8', name: '南陈路', transfers: [] },
        { id: '7-9', name: '上大路', transfers: [] },
        { id: '7-10', name: '场中路', transfers: [] },
        { id: '7-11', name: '大场镇', transfers: [] },
        { id: '7-12', name: '行知路', transfers: [] },
        { id: '7-13', name: '大华三路', transfers: [] },
        { id: '7-14', name: '新村路', transfers: [] },
        { id: '7-15', name: '岚皋路', transfers: [] },
        { id: '7-16', name: '镇坪路', transfers: ['3', '4'] },
        { id: '7-17', name: '长寿路', transfers: ['13'] },
        { id: '7-18', name: '昌平路', transfers: [] },
        { id: '7-19', name: '静安寺', transfers: ['2', '14'] },
        { id: '7-20', name: '常熟路', transfers: ['1'] },
        { id: '7-21', name: '肇嘉浜路', transfers: [] },
        { id: '7-22', name: '东安路', transfers: ['4'] },
        { id: '7-23', name: '龙华中路', transfers: ['12'] },
        { id: '7-24', name: '后滩', transfers: [] },
        { id: '7-25', name: '长清路', transfers: [] },
        { id: '7-26', name: '耀华路', transfers: ['8'] },
        { id: '7-27', name: '云台路', transfers: [] },
        { id: '7-28', name: '高科西路', transfers: ['6'] },
        { id: '7-29', name: '杨高南路', transfers: [] },
        { id: '7-30', name: '锦绣路', transfers: [] },
        { id: '7-31', name: '芳华路', transfers: [] },
        { id: '7-32', name: '龙阳路', transfers: ['2', '16', '18'] },
        { id: '7-33', name: '花木路', transfers: [] }
      ],
      // 11号线站点数据
      '11': [
        { id: '11-1', name: '嘉定北站', transfers: [] },
        { id: '11-2', name: '嘉定西站', transfers: [] },
        { id: '11-3', name: '白银路', transfers: [] },
        { id: '11-4', name: '嘉定新城', transfers: [] },
        { id: '11-5', name: '马陆', transfers: [] },
        { id: '11-6', name: '南翔', transfers: [] },
        { id: '11-7', name: '桃浦新村', transfers: [] },
        { id: '11-8', name: '武威路', transfers: [] },
        { id: '11-9', name: '祁连山路', transfers: [] },
        { id: '11-10', name: '李子园', transfers: [] },
        { id: '11-11', name: '上海西站', transfers: ['15'] },
        { id: '11-12', name: '真如', transfers: ['14'] },
        { id: '11-13', name: '枫桥路', transfers: [] },
        { id: '11-14', name: '曹杨路', transfers: ['3', '4'] },
        { id: '11-15', name: '隆德路', transfers: ['13'] },
        { id: '11-16', name: '江苏路', transfers: ['2'] },
        { id: '11-17', name: '交通大学', transfers: ['10'] },
        { id: '11-18', name: '徐家汇', transfers: ['1', '9'] },
        { id: '11-19', name: '上海游泳馆', transfers: [] },
        { id: '11-20', name: '龙华', transfers: ['12'] },
        { id: '11-21', name: '云锦路', transfers: [] },
        { id: '11-22', name: '龙耀路', transfers: [] },
        { id: '11-23', name: '东方体育中心', transfers: ['6', '8'] },
        { id: '11-24', name: '三林', transfers: [] },
        { id: '11-25', name: '三林东站', transfers: [] },
        { id: '11-26', name: '浦三路', transfers: [] },
        { id: '11-27', name: '御桥', transfers: ['18'] },
        { id: '11-28', name: '罗山路', transfers: [] },
        { id: '11-29', name: '秀沿路', transfers: [] },
        { id: '11-30', name: '康新公路', transfers: [] },
        { id: '11-31', name: '迪士尼', transfers: [] }
      ],
      // 12号线站点数据
      '12': [
        { id: '12-1', name: '金海路', transfers: ['9'] },
        { id: '12-2', name: '申江路', transfers: [] },
        { id: '12-3', name: '金京路', transfers: [] },
        { id: '12-4', name: '杨高北路', transfers: [] },
        { id: '12-5', name: '巨峰路', transfers: ['6'] },
        { id: '12-6', name: '东陆路', transfers: [] },
        { id: '12-7', name: '复兴岛', transfers: [] },
        { id: '12-8', name: '爱国路', transfers: [] },
        { id: '12-9', name: '隆昌路', transfers: [] },
        { id: '12-10', name: '宁国路', transfers: [] },
        { id: '12-11', name: '江浦公园', transfers: [] },
        { id: '12-12', name: '大连路', transfers: ['4'] },
        { id: '12-13', name: '提篮桥', transfers: [] },
        { id: '12-14', name: '国际客运中心', transfers: [] },
        { id: '12-15', name: '天潼路', transfers: ['10', '19'] },
        { id: '12-16', name: '曲阜路', transfers: ['8'] },
        { id: '12-17', name: '汉中路', transfers: ['1', '13'] },
        { id: '12-18', name: '南京西路', transfers: ['2', '13', '14'] },
        { id: '12-19', name: '陕西南路', transfers: ['1', '10'] },
        { id: '12-20', name: '嘉善路', transfers: ['9'] },
        { id: '12-21', name: '大木桥路', transfers: ['4', '19'] },
        { id: '12-22', name: '龙华中路', transfers: ['7'] },
        { id: '12-23', name: '龙华', transfers: ['11'] },
        { id: '12-24', name: '龙漕路', transfers: ['3', '15'] },
        { id: '12-25', name: '漕宝路', transfers: ['1'] },
        { id: '12-26', name: '虹梅路', transfers: [] },
        { id: '12-27', name: '东兰路', transfers: [] },
        { id: '12-28', name: '顾戴路', transfers: [] },
        { id: '12-29', name: '虹莘路', transfers: [] },
        { id: '12-30', name: '七莘路', transfers: [] }
      ],
      // 13号线站点数据
      '13': [
        { id: '13-1', name: '金运路', transfers: [] },
        { id: '13-2', name: '金沙江西路', transfers: [] },
        { id: '13-3', name: '丰庄', transfers: [] },
        { id: '13-4', name: '祁连山南路', transfers: [] },
        { id: '13-5', name: '真北路', transfers: [] },
        { id: '13-6', name: '大渡河路', transfers: [] },
        { id: '13-7', name: '金沙江路', transfers: ['3', '4'] },
        { id: '13-8', name: '隆德路', transfers: ['11'] },
        { id: '13-9', name: '武宁路', transfers: [] },
        { id: '13-10', name: '长寿路', transfers: ['7'] },
        { id: '13-11', name: '汉中路', transfers: ['1', '12'] },
        { id: '13-12', name: '自然博物馆', transfers: [] },
        { id: '13-13', name: '南京西路', transfers: ['2', '12', '14'] },
        { id: '13-14', name: '淮海中路', transfers: [] },
        { id: '13-15', name: '一大会址·新天地', transfers: ['10'] },
        { id: '13-16', name: '马当路', transfers: ['9'] },
        { id: '13-17', name: '世博会博物馆', transfers: [] },
        { id: '13-18', name: '世博大道', transfers: [] },
        { id: '13-19', name: '长清路', transfers: [] },
        { id: '13-20', name: '成山路', transfers: ['8'] },
        { id: '13-21', name: '东明路', transfers: ['6'] },
        { id: '13-22', name: '华鹏路', transfers: [] },
        { id: '13-23', name: '下南路', transfers: [] },
        { id: '13-24', name: '北蔡', transfers: [] },
        { id: '13-25', name: '陈春路', transfers: [] },
        { id: '13-26', name: '莲溪路', transfers: [] },
        { id: '13-27', name: '华夏中路', transfers: ['16'] },
        { id: '13-28', name: '中科路', transfers: [] },
        { id: '13-29', name: '学林路', transfers: [] },
        { id: '13-30', name: '金运路', transfers: [] }
      ],
      // 14号线站点数据
      '14': [
        { id: '14-1', name: '封浜', transfers: [] },
        { id: '14-2', name: '乐秀路', transfers: [] },
        { id: '14-3', name: '临洮路', transfers: [] },
        { id: '14-4', name: '嘉怡路', transfers: [] },
        { id: '14-5', name: '定边路', transfers: [] },
        { id: '14-6', name: '真新新村', transfers: [] },
        { id: '14-7', name: '曹安公路', transfers: [] },
        { id: '14-8', name: '真光路', transfers: [] },
        { id: '14-9', name: '铜川路', transfers: [] },
        { id: '14-10', name: '真如', transfers: ['11'] },
        { id: '14-11', name: '中宁路', transfers: [] },
        { id: '14-12', name: '曹杨路', transfers: ['3', '4', '11'] },
        { id: '14-13', name: '武宁路', transfers: [] },
        { id: '14-14', name: '武定路', transfers: [] },
        { id: '14-15', name: '静安寺', transfers: ['2', '7'] },
        { id: '14-16', name: '黄陂南路', transfers: [] },
        { id: '14-17', name: '大世界', transfers: ['8'] },
        { id: '14-18', name: '豫园', transfers: ['10'] },
        { id: '14-19', name: '陆家嘴', transfers: ['2'] },
        { id: '14-20', name: '浦东南路', transfers: [] },
        { id: '14-21', name: '浦东足球场', transfers: [] },
        { id: '14-22', name: '云山路', transfers: [] },
        { id: '14-23', name: '蓝天路', transfers: [] },
        { id: '14-24', name: '黄杨路', transfers: [] },
        { id: '14-25', name: '红枫路', transfers: [] },
        { id: '14-26', name: '金港路', transfers: [] },
        { id: '14-27', name: '桂桥路', transfers: [] },
        { id: '14-28', name: '金粤路', transfers: [] },
        { id: '14-29', name: '浦东金桥', transfers: [] }
      ],
      // 15号线站点数据
      '15': [
        { id: '15-1', name: '顾村公园', transfers: ['7'] },
        { id: '15-2', name: '锦秋路', transfers: [] },
        { id: '15-3', name: '丰翔路', transfers: [] },
        { id: '15-4', name: '南大路', transfers: [] },
        { id: '15-5', name: '祁安路', transfers: [] },
        { id: '15-6', name: '古浪路', transfers: [] },
        { id: '15-7', name: '武威东路', transfers: [] },
        { id: '15-8', name: '上海西站', transfers: ['11'] },
        { id: '15-9', name: '铜川路', transfers: [] },
        { id: '15-10', name: '梅岭北路', transfers: [] },
        { id: '15-11', name: '大渡河路', transfers: ['13'] },
        { id: '15-12', name: '长风公园', transfers: [] },
        { id: '15-13', name: '娄山关路', transfers: [] },
        { id: '15-14', name: '红宝石路', transfers: [] },
        { id: '15-15', name: '姚虹路', transfers: [] },
        { id: '15-16', name: '吴中路', transfers: [] },
        { id: '15-17', name: '桂林路', transfers: ['9'] },
        { id: '15-18', name: '桂林公园', transfers: [] },
        { id: '15-19', name: '顾戴路', transfers: ['12'] },
        { id: '15-20', name: '白樟路', transfers: [] },
        { id: '15-21', name: '虹梅南路', transfers: [] },
        { id: '15-22', name: '景洪路', transfers: [] },
        { id: '15-23', name: '双柏路', transfers: [] },
        { id: '15-24', name: '元江路', transfers: [] },
        { id: '15-25', name: '永德路', transfers: [] },
        { id: '15-26', name: '紫竹高新区', transfers: [] }
      ],
      // 16号线站点数据
      '16': [
        { id: '16-1', name: '龙阳路', transfers: ['2', '7', '18'] },
        { id: '16-2', name: '华夏中路', transfers: ['13'] },
        { id: '16-3', name: '罗山路', transfers: ['11'] },
        { id: '16-4', name: '周浦东', transfers: [] },
        { id: '16-5', name: '鹤沙航城', transfers: [] },
        { id: '16-6', name: '航头东', transfers: [] },
        { id: '16-7', name: '新场', transfers: [] },
        { id: '16-8', name: '野生动物园', transfers: [] },
        { id: '16-9', name: '惠南', transfers: [] },
        { id: '16-10', name: '惠南东', transfers: [] },
        { id: '16-11', name: '书院', transfers: [] },
        { id: '16-12', name: '临港大道', transfers: [] },
        { id: '16-13', name: '滴水湖', transfers: [] }
      ],
      // 17号线站点数据
      '17': [
        { id: '17-1', name: '东方绿舟', transfers: [] },
        { id: '17-2', name: '朱家角', transfers: [] },
        { id: '17-3', name: '淀山湖大道', transfers: [] },
        { id: '17-4', name: '漕盈路', transfers: [] },
        { id: '17-5', name: '青浦新城', transfers: [] },
        { id: '17-6', name: '汇金路', transfers: [] },
        { id: '17-7', name: '赵巷', transfers: [] },
        { id: '17-8', name: '嘉松中路', transfers: [] },
        { id: '17-9', name: '徐盈路', transfers: [] },
        { id: '17-10', name: '蟠龙路', transfers: [] },
        { id: '17-11', name: '诸光路', transfers: [] },
        { id: '17-12', name: '虹桥火车站', transfers: ['2', '10'] }
      ],
      // 18号线站点数据
      '18': [
        { id: '18-1', name: '御桥', transfers: ['11'] },
        { id: '18-2', name: '莲溪路', transfers: [] },
        { id: '18-3', name: '芳芯路', transfers: [] },
        { id: '18-4', name: '北中路', transfers: [] },
        { id: '18-5', name: '龙阳路', transfers: ['2', '7', '16'] },
        { id: '18-6', name: '迎春路', transfers: [] },
        { id: '18-7', name: '杨高中路', transfers: ['9'] },
        { id: '18-8', name: '民生路', transfers: ['6'] },
        { id: '18-9', name: '昌邑路', transfers: [] },
        { id: '18-10', name: '丹阳路', transfers: [] },
        { id: '18-11', name: '平凉路', transfers: [] },
        { id: '18-12', name: '江浦路', transfers: ['8'] },
        { id: '18-13', name: '鞍山新村', transfers: [] },
        { id: '18-14', name: '复旦大学', transfers: [] },
        { id: '18-15', name: '国权路', transfers: ['10'] },
        { id: '18-16', name: '上海财经大学', transfers: [] },
        { id: '18-17', name: '殷高路', transfers: [] },
        { id: '18-18', name: '上海大学', transfers: ['7'] },
        { id: '18-19', name: '锦秋路', transfers: ['15'] },
        { id: '18-20', name: '南陈路', transfers: [] },
        { id: '18-21', name: '上大路', transfers: [] },
        { id: '18-22', name: '场中路', transfers: [] },
        { id: '18-23', name: '阳曲路', transfers: [] },
        { id: '18-24', name: '爱辉路', transfers: [] },
        { id: '18-25', name: '通河新村', transfers: [] },
        { id: '18-26', name: '呼兰路', transfers: [] },
        { id: '18-27', name: '长江南路', transfers: ['3'] },
        { id: '18-28', name: '殷高东路', transfers: ['10'] },
        { id: '18-29', name: '御桥', transfers: ['11'] }
      ],
      // 浦江线站点数据
      '浦江线': [
        { id: 'pj-1', name: '沈杜公路', transfers: ['8'] },
        { id: 'pj-2', name: '三鲁公路', transfers: [] },
        { id: 'pj-3', name: '闵瑞路', transfers: [] },
        { id: 'pj-4', name: '浦航路', transfers: [] },
        { id: 'pj-5', name: '东城一路', transfers: [] },
        { id: 'pj-6', name: '汇臻路', transfers: [] }
      ],
      // 磁悬浮站点数据
      '磁悬浮': [
        { id: 'cf-1', name: '龙阳路', transfers: ['2', '7', '16', '18'] },
        { id: 'cf-2', name: '浦东国际机场', transfers: ['2'] }
      ]
    } as StationMap,
    // 换乘信息数据 - 模拟数据
    transferInfo: {
      '1-13-2': {
        fromLine: '1号线',
        toLine: '2号线',
        fromStation: '人民广场',
        toStation: '人民广场',
        bestCarriage: '4-5号车厢',
        description: '下车后直接走到对面站台即可换乘2号线'
      },
      '1-13-8': {
        fromLine: '1号线',
        toLine: '8号线',
        fromStation: '人民广场',
        toStation: '人民广场',
        bestCarriage: '1-2号车厢',
        description: '下车后从车头方向楼梯上行，步行约3分钟到达8号线站台'
      },
      '2-12-1': {
        fromLine: '2号线',
        toLine: '1号线',
        fromStation: '人民广场',
        toStation: '人民广场',
        bestCarriage: '4-5号车厢',
        description: '下车后直接走到对面站台即可换乘1号线'
      },
      '2-12-8': {
        fromLine: '2号线',
        toLine: '8号线',
        fromStation: '人民广场',
        toStation: '人民广场',
        bestCarriage: '1-2号车厢',
        description: '下车后从车头方向楼梯上行，步行约3分钟到达8号线站台'
      }
    } as TransferInfoMap,
    // 当前选中的线路、站点和方向
    selectedLine: '',
    selectedStation: null as Station | null,
    selectedDirection: '', // 当前选中的方向
    selectedTransferLine: '', // 当前选中的换乘线路
    currentLineDirections: null as { direction1: string; direction2: string } | null, // 当前线路的两个方向
    // 显示的换乘信息
    showTransferInfo: false,
    currentTransferInfo: null as TransferInfo | null,
    // 地铁图数据
    metroMapImage: '/assets/images/map.jpg',
    // 时间戳用于避免缓存
    timestamp: Date.now(),
    // 地图缩放相关配置
    scaleMin: 0.8,      // 最小缩放比例
    scaleMax: 4.0,      // 最大缩放比例
    scaleValue: 1.0,    // 当前缩放比例
    damping: 20,        // 阻尼系数
    friction: 2,        // 摩擦系数
    // 双击相关配置
    lastTapTime: 0,     // 上次点击时间
    doubleTapInterval: 300, // 双击间隔时间（毫秒）
    isZoomedIn: false,  // 是否处于放大状态
    normalScale: 1.0,   // 正常缩放比例
    zoomedScale: 2.5,   // 放大缩放比例
    // 动画相关配置
    useAnimation: true, // 是否使用动画
    animationDuration: 250  // 动画持续时间（毫秒）
  },

  methods: {
    // 动态获取线路的两个方向（起点站和终点站）
    getLineDirections(lineId: string) {
      const stationsByLine = this.data.stationsByLine as StationMap;
      const stations = stationsByLine[lineId];
      
      if (!stations || stations.length === 0) {
        return { direction1: '未知', direction2: '未知' };
      }
      
      // 对于4号线和13号线等环线，第一站和最后一站相同，需要特殊处理
      if (lineId === '4' || lineId === '13') {
        // 环线情况：取中间某个站点作为另一个方向
        const middleIndex = Math.floor(stations.length / 2);
        return {
          direction1: stations[0].name,
          direction2: stations[middleIndex].name
        };
      }
      
      return {
        direction1: stations[0].name, // 第一个站点
        direction2: stations[stations.length - 1].name // 最后一个站点
      };
    },

    // 选择线路
    onSelectLine(e: any) {
      const lineId = e.currentTarget.dataset.id;
      const directions = this.getLineDirections(lineId);
      
      // 检查当前选择的站点是否属于新选择的线路
      let newSelectedStation = null;
      if (this.data.selectedStation) {
        const stationsByLine = this.data.stationsByLine as StationMap;
        const stationsInNewLine = stationsByLine[lineId] || [];
        const stationExists = stationsInNewLine.some(station => station.id === this.data.selectedStation?.id);
        
        // 如果当前站点属于新选择的线路，保持选择；否则重置
        if (stationExists) {
          newSelectedStation = this.data.selectedStation;
        }
      }
      
      this.setData({
        selectedLine: lineId,
        selectedStation: newSelectedStation,
        selectedDirection: '', // 重置方向选择
        selectedTransferLine: '', // 重置换乘线路选择
        currentLineDirections: directions, // 设置当前线路的方向信息
        showTransferInfo: false,
        currentTransferInfo: null
      });
    },

    // 选择列车方向
    onSelectDirection(e: any) {
      const direction = e.currentTarget.dataset.direction;
      this.setData({
        selectedDirection: direction
      });
      
      // 显示方向选择成功的提示
      wx.showToast({
        title: `已选择${direction}方向`,
        icon: 'success',
        duration: 1500
      });
      
      // 检查当前站点是否只有一条换乘线路，如果是则自动选择当前线路
      if (this.data.selectedStation && this.data.selectedStation.transfers.length === 1) {
        const transferLineId = this.data.selectedStation.transfers[0];
        // 自动触发换乘信息获取
        setTimeout(() => {
          this.getTransferInfo(transferLineId);
        }, 300); // 延迟300ms，让用户看到方向选择的反馈
      }
    },

    // 选择站点
    onSelectStation(e: any) {
      const station = e.currentTarget.dataset.station;
      console.log('选择的站点:', station);
      
      // 如果已经选择了线路，需要重新设置方向信息
      let directions = null;
      if (this.data.selectedLine) {
        directions = this.getLineDirections(this.data.selectedLine);
      }
      
      this.setData({
        selectedStation: station,
        selectedTransferLine: '', // 重置换乘线路选择
        currentLineDirections: directions, // 确保方向信息可用
        showTransferInfo: false,
        currentTransferInfo: null
      }, () => {
        console.log('设置后的 selectedStation:', this.data.selectedStation);
      });
    },
    
    // 图片加载成功事件
    onMapImageLoad(e: any) {
      console.log('地图图片加载成功', e);
      wx.showToast({
        title: '地图加载成功',
        icon: 'success',
        duration: 1000
      });
    },

    // 图片加载失败事件
    onMapImageError(e: any) {
      console.error('地图图片加载失败', e);
      wx.showToast({
        title: '地图加载失败，请检查图片路径',
        icon: 'none',
        duration: 2000
      });
    },

    // 图片点击事件 - 实现双击检测
    onImageTap(_e: any) {
      const currentTime = Date.now();
      const timeDifference = currentTime - this.data.lastTapTime;
      
      if (timeDifference < this.data.doubleTapInterval && timeDifference > 50) {
        // 双击事件 - 阻止事件冒泡，防止与拖拽冲突
        this.handleDoubleTap();
      }
      
      this.setData({
        lastTapTime: currentTime
      });
    },

    // 处理双击事件 - 切换放大缩小
    handleDoubleTap() {
      const newIsZoomedIn = !this.data.isZoomedIn;
      const newScale = newIsZoomedIn ? this.data.zoomedScale : this.data.normalScale;
      
      // 添加触觉反馈
      wx.vibrateShort({
        type: 'light'
      });
      
      // 使用自定义平滑动画
      this.animateScale(this.data.scaleValue, newScale, 250, () => {
        this.setData({
          isZoomedIn: newIsZoomedIn
        });
      });

      // 显示提示 - 使用更友好的图标
      wx.showToast({
        title: newIsZoomedIn ? '🔍 已放大' : '🔎 已还原',
        icon: 'none',
        duration: 600
      });

      console.log(`双击${newIsZoomedIn ? '放大' : '缩小'}，缩放比例: ${newScale}，使用自定义动画: 250ms`);
    },

    // 自定义平滑缩放动画
    animateScale(fromScale: number, toScale: number, duration: number, callback?: () => void) {
      const startTime = Date.now();
      const scaleDiff = toScale - fromScale;
      const frameTime = 16; // 约60fps
      
      // 先关闭系统动画
      this.setData({
        useAnimation: false
      });
      
      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // 使用 easeOutCubic 缓动函数，让动画更平滑
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentScale = fromScale + scaleDiff * easeProgress;
        
        this.setData({
          scaleValue: currentScale
        });
        
        if (progress < 1) {
          setTimeout(animate, frameTime);
        } else {
          // 动画完成后，保持系统动画关闭状态，避免二次动画
          this.setData({
            scaleValue: toScale,
            // 不立即重新启用动画，让movable-view的内部状态稳定
          });
          
          // 等待一段时间让movable-view内部状态同步，然后再启用动画
          setTimeout(() => {
            this.setData({
              useAnimation: true
            });
          }, 100);
          
          if (callback) callback();
        }
      };
      
      animate();
    },

    // 处理缩放事件
    onScale(e: any) {
      console.log('地图缩放中', e.detail);
      const currentScale = e.detail.scale;
      
      // 只有在系统动画启用时才同步状态，避免与自定义动画冲突
      if (this.data.useAnimation) {
        // 不要重新设置 scaleValue，让 movable-view 自己管理手势操作时的缩放
        // 只更新我们的双击状态追踪
        
        // 根据当前缩放比例更新放大状态
        // 如果缩放比例接近放大状态，则认为是放大状态
        const isCurrentlyZoomed = Math.abs(currentScale - this.data.zoomedScale) < Math.abs(currentScale - this.data.normalScale);
        if (this.data.isZoomedIn !== isCurrentlyZoomed) {
          this.setData({
            isZoomedIn: isCurrentlyZoomed
          });
        }
      }
    },

    // 处理移动和缩放变化事件
    onChange(e: any) {
      console.log('地图位置/缩放变化', e.detail);
      
      // 只有在系统动画启用时才处理变化事件，避免与自定义动画冲突
      if (this.data.useAnimation && e.detail.scale !== undefined) {
        // 手势操作结束时，同步最终的缩放值到我们的状态
        // 但不要在操作过程中频繁同步，避免冲突
        const currentScale = e.detail.scale;
        
        // 更新双击状态
        const isCurrentlyZoomed = Math.abs(currentScale - this.data.zoomedScale) < Math.abs(currentScale - this.data.normalScale);
        this.setData({
          isZoomedIn: isCurrentlyZoomed,
          scaleValue: currentScale
        });
      }
    },

    // 重置地图位置和缩放
    resetMapPosition() {
      this.animateScale(this.data.scaleValue, this.data.normalScale, 250, () => {
        this.setData({
          isZoomedIn: false
        });
      });
      wx.showToast({
        title: '地图已重置',
        icon: 'success',
        duration: 1000
      });
    },

    // 获取换乘信息 - 支持事件调用和直接调用
    getTransferInfo(toLineIdOrEvent: string | any) {
      // 处理参数：如果是事件对象，从dataset中获取；否则直接使用
      const toLineId = typeof toLineIdOrEvent === 'string' 
        ? toLineIdOrEvent 
        : toLineIdOrEvent.currentTarget.dataset.lineId;
        
      if (!this.data.selectedLine || !this.data.selectedStation) {
        wx.showToast({
          title: '请先选择出发线路和站点',
          icon: 'none'
        });
        return;
      }

      // 构建查询键
      const fromStationId = this.data.selectedStation.id;
      const key = `${fromStationId}-${toLineId}`;
      const reverseKey = `${fromStationId.split('-')[0]}-${fromStationId.split('-')[1]}-${toLineId}`;
      
      // 在换乘信息中查找
      const transferInfoMap = this.data.transferInfo as TransferInfoMap;
      let transferInfo = transferInfoMap[key] || transferInfoMap[reverseKey];
      
      if (transferInfo) {
        this.setData({
          selectedTransferLine: toLineId, // 设置选中的换乘线路
          currentTransferInfo: transferInfo,
          showTransferInfo: true
        });
      } else {
        // 如果没有预设的换乘信息，生成通用的提示信息
        const fromLine = this.data.lines.find(line => line.id === this.data.selectedLine)?.name || '';
        const toLine = this.data.lines.find(line => line.id === toLineId)?.name || '';
        
        this.setData({
          selectedTransferLine: toLineId, // 设置选中的换乘线路
          currentTransferInfo: {
            fromLine: fromLine,
            toLine: toLine,
            fromStation: this.data.selectedStation.name,
            toStation: this.data.selectedStation.name,
            bestCarriage: '请查看站内指引',
            description: '请根据站内标识前往换乘通道，或咨询工作人员获取最佳换乘路线'
          } as TransferInfo,
          showTransferInfo: true
        });
      }
    },
    
    // 快速切换到放大状态 - 用于外部调用
    quickZoomIn() {
      if (!this.data.isZoomedIn) {
        this.animateScale(this.data.scaleValue, this.data.zoomedScale, 250, () => {
          this.setData({
            isZoomedIn: true
          });
        });
      }
    },

    // 快速切换到正常状态 - 用于外部调用  
    quickZoomOut() {
      if (this.data.isZoomedIn) {
        this.animateScale(this.data.scaleValue, this.data.normalScale, 250, () => {
          this.setData({
            isZoomedIn: false
          });
        });
      }
    },

    // 组件初始化
    attached() {
      console.log('地铁页面组件初始化完成');
      
      // 显示使用提示
      wx.showToast({
        title: '💡 双击地图可放大缩小',
        icon: 'none',
        duration: 2000
      });
    }
  }
});