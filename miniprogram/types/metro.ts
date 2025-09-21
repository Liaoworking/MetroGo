// 地铁相关类型定义
export interface Line {
  id: string;
  name: string;
  color: string;
}

export interface Station {
  id: string;
  name: string;
  transfers: string[];
  longitude?: number;  // 经度
  latitude?: number;   // 纬度
}

export interface TransferInfo {
  bestCarriage: string;
  bestDoor: string;
  doorNumber: string;
  description: string;
}

export interface StationMap {
  [key: string]: Station[];
}

export interface TransferInfoMap {
  [key: string]: TransferInfo;
}
