// metro.ts
// 超级有用的地铁线路图网站
// https://commons.m.wikimedia.org/wiki/Category:Maps_of_Shanghai_Metro

// 导入类型定义和数据
import { Line, Station, TransferInfo, StationMap, TransferInfoMap } from '../../types/metro';
import { lines, stationsByLine } from '../../data/metro-lines';
import { transferInfo } from '../../data/transfer-info';

Component({
  data: {
    // 使用从外部文件导入的地铁线路数据
    lines: lines as Line[],
    // 使用从外部文件导入的站点数据
    stationsByLine: stationsByLine as StationMap,
    // 使用从外部文件导入的换乘信息数据
    transferInfo: transferInfo as TransferInfoMap,
    // 当前选中的线路、站点和方向
    selectedLine: '',
    selectedStation: null as Station | null,
    selectedDirection: '', // 当前选中的方向
    selectedTransferLine: '', // 当前选中的换乘线路
    currentLineDirections: null as { direction1: string; direction2: string } | null, // 当前线路的两个方向
    // 显示的换乘信息
    showTransferInfo: false,
    currentTransferInfo: null as TransferInfo | null,
    // 计算得出的最佳车厢门信息
    bestCarriageDoorText: '',
    // 地铁图数据
    metroMapImage: '/assets/images/map.jpg',
    // 时间戳用于避免缓存
    timestamp: Date.now(),
    // 地图缩放和位置相关配置
    scaleMin: 0.8,      // 最小缩放比例
    scaleMax: 4.0,      // 最大缩放比例
    scaleValue: 1.0,    // 当前缩放比例
    mapX: 0,            // 地图X坐标位置
    mapY: 0,            // 地图Y坐标位置
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
    // 计算最佳车厢门文本
    calculateBestCarriageDoorText(transferInfo: TransferInfo | null): string {
      if (!transferInfo || !transferInfo.bestCarriage || !transferInfo.bestDoor) {
        return '';
      }
      return `${transferInfo.bestCarriage}车厢，${transferInfo.bestDoor}号车门`;
    },

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
        currentTransferInfo: null,
        bestCarriageDoorText: ''
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
        currentTransferInfo: null,
        bestCarriageDoorText: ''
      }, () => {
        console.log('设置后的 selectedStation:', this.data.selectedStation);
      });
    },
    
    // 图片加载成功事件
    onMapImageLoad(e: any) {
      console.log('地图图片加载成功', e);
      
      // 获取图片尺寸信息
      const imageInfo = e.detail;
      console.log('图片尺寸信息:', imageInfo);
      
      // 计算居中位置
      this.centerMapImage();
      
      wx.showToast({
        title: '地图加载成功',
        icon: 'success',
        duration: 1000
      });
    },

    // 居中显示地图图片
    centerMapImage() {
      // 获取系统信息
      const systemInfo = wx.getSystemInfoSync();
      const screenWidth = systemInfo.windowWidth;
      const screenHeight = systemInfo.windowHeight;
      
      // 获取容器高度（屏幕高度的一半，因为下半部分是换乘信息）
      const containerHeight = screenHeight * 0.5;
      
      // movable-view的尺寸是150%，所以计算居中位置
      // 让movable-view居中显示，需要将其向左上偏移25%的距离
      const centerX = -(screenWidth * 0.25); // 向左偏移25%
      const centerY = -(containerHeight * 0.25); // 向上偏移25%
      
      console.log('居中位置计算:', {
        screenWidth,
        screenHeight,
        containerHeight,
        centerX,
        centerY
      });
      
      // 设置居中位置
      this.setData({
        mapX: centerX,
        mapY: centerY
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
      
      // 重置到居中位置
      this.centerMapImage();
      
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
      const key = `${fromStationId}-${toLineId}-0`;
      const reverseKey = `${fromStationId}-${toLineId}-1`;
      
      console.log(key,reverseKey)

      // 在换乘信息中查找
      const transferInfoMap = this.data.transferInfo as TransferInfoMap;
      let transferInfo = transferInfoMap[key] || transferInfoMap[reverseKey];
      
      if (transferInfo) {
        this.setData({
          selectedTransferLine: toLineId, // 设置选中的换乘线路
          currentTransferInfo: transferInfo,
          bestCarriageDoorText: this.calculateBestCarriageDoorText(transferInfo),
          showTransferInfo: true
        });
      } else {
        // 如果没有预设的换乘信息，生成通用的提示信息
        const emptyTransferInfo = {
          bestCarriage: '',
          bestDoor: '',
          doorNumber: '',
          description: ''
        } as TransferInfo;
        
        this.setData({
          selectedTransferLine: toLineId, // 设置选中的换乘线路
          currentTransferInfo: emptyTransferInfo,
          bestCarriageDoorText: this.calculateBestCarriageDoorText(emptyTransferInfo),
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
      
      // 初始化地图居中位置
      setTimeout(() => {
        this.centerMapImage();
      }, 100);
      
      // 显示使用提示
      wx.showToast({
        title: '💡 双击地图可放大缩小',
        icon: 'none',
        duration: 2000
      });
    }
  }
});
