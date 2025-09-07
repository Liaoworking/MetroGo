// metro.ts
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

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  iconPath?: string;
  width?: number;
  height?: number;
  callout?: {
    content: string;
    color?: string;
    fontSize?: number;
    borderRadius?: number;
    bgColor?: string;
    display?: string;
  };
}

Component({
  data: {
    // 上海地铁线路数据
    lines: [
      { id: '1', name: '1号线', color: '#FF4D4F' },
      { id: '2', name: '2号线', color: '#73D13D' },
      { id: '3', name: '3号线', color: '#722ED1' },
      { id: '4', name: '4号线', color: '#1890FF' },
      { id: '5', name: '5号线', color: '#FAAD14' },
      { id: '6', name: '6号线', color: '#13C2C2' },
      { id: '7', name: '7号线', color: '#52C41A' },
      { id: '8', name: '8号线', color: '#FA8C16' },
      { id: '9', name: '9号线', color: '#722ED1' },
      { id: '10', name: '10号线', color: '#D897EB' },
      { id: '11', name: '11号线', color: '#EB2F96' },
      { id: '12', name: '12号线', color: '#0FC6C2' },
      { id: '13', name: '13号线', color: '#A0D911' },
      { id: '14', name: '14号线', color: '#F5222D' },
      { id: '15', name: '15号线', color: '#F7BA1E' },
      { id: '16', name: '16号线', color: '#2F54EB' },
      { id: '17', name: '17号线', color: '#52C41A' },
      { id: '18', name: '18号线', color: '#722ED1' },
      { id: '浦江线', name: '浦江线', color: '#86909C' },
      { id: '磁悬浮', name: '磁悬浮', color: '#E8684A' }
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
      ]
      // 这里可以继续添加其他线路的站点信息
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
    // 当前选中的线路和站点
    selectedLine: '',
    selectedStation: null as Station | null,
    // 显示的换乘信息
    showTransferInfo: false,
    currentTransferInfo: null as TransferInfo | null,
    // 地铁图数据
    metroMapImage: '/assets/images/metro_map.svg',
    // 地图标记数据
    markers: [] as Marker[]
  },

  methods: {
    // 选择线路
    onSelectLine(e: any) {
      const lineId = e.currentTarget.dataset.id;
      this.setData({
        selectedLine: lineId,
        selectedStation: null,
        showTransferInfo: false,
        currentTransferInfo: null
      });
    },

    // 选择站点
    onSelectStation(e: any) {
      const station = e.currentTarget.dataset.station;
      this.setData({
        selectedStation: station,
        showTransferInfo: false,
        currentTransferInfo: null
      });
    },
    
    // 地图标记点击事件
    onMarkerTap(e: any) {
      const markerId = e.markerId;
      // 查找点击的标记对应的站点名称
      const clickedMarker = this.data.markers.find(marker => marker.id === markerId);
      if (!clickedMarker) return;
      
      const stationName = clickedMarker.title;
      
      // 在所有线路中查找该站点
      let foundStation: Station | null = null;
      let foundLine: Line | null = null;
      
      for (const [lineId, stations] of Object.entries(this.data.stationsByLine)) {
        const station = stations.find(s => s.name === stationName);
        if (station) {
          foundStation = station;
          foundLine = this.data.lines.find(line => line.id === lineId) || null;
          break;
        }
      }
      
      if (foundStation && foundLine) {
        this.setData({
          selectedLine: foundLine.id,
          selectedStation: foundStation,
          showTransferInfo: false,
          currentTransferInfo: null
        });
        
        wx.showToast({
          title: `已选择${foundLine.name} ${foundStation.name}站`,
          icon: 'none'
        });
      }
    },

    // 获取换乘信息
    getTransferInfo(toLineId: string) {
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
          currentTransferInfo: transferInfo,
          showTransferInfo: true
        });
      } else {
        // 如果没有预设的换乘信息，生成通用的提示信息
        const fromLine = this.data.lines.find(line => line.id === this.data.selectedLine)?.name || '';
        const toLine = this.data.lines.find(line => line.id === toLineId)?.name || '';
        
        this.setData({
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
    
    // 初始化地图标记
    attached() {
      // 为主要站点添加位置信息（这里使用的是模拟的经纬度数据）
      const stationLocations = {
        '人民广场': { latitude: 31.230416, longitude: 121.473701 },
        '徐家汇': { latitude: 31.199076, longitude: 121.438016 },
        '陆家嘴': { latitude: 31.239965, longitude: 121.508842 },
        '南京东路': { latitude: 31.233224, longitude: 121.475098 },
        '静安寺': { latitude: 31.221732, longitude: 121.457965 },
        '世纪大道': { latitude: 31.223312, longitude: 121.501993 },
        '上海火车站': { latitude: 31.245585, longitude: 121.455286 },
        '虹桥火车站': { latitude: 31.194157, longitude: 121.396412 },
        '上海南站': { latitude: 31.194625, longitude: 121.434542 },
        '龙阳路': { latitude: 31.206993, longitude: 121.535205 }
      };
      
      // 构建标记数组
      const markers: Marker[] = [];
      let markerId = 1;
      
      for (const [stationName, location] of Object.entries(stationLocations)) {
        markers.push({
          id: markerId++,
          latitude: location.latitude,
          longitude: location.longitude,
          title: stationName,
          callout: {
            content: stationName,
            color: '#000000',
            fontSize: 12,
            borderRadius: 5,
            bgColor: '#ffffff',
            display: 'BYCLICK'
          }
        });
      }
      
      this.setData({
        markers
      });
    }
  }
});