// 地铁换乘信息数据
import { TransferInfo, TransferInfoMap } from '../types/metro';

// 换乘信息数据 - 模拟数据
export const transferInfo: TransferInfoMap = {
  '1-13-2-0': 
    {
      bestCarriage: '1',
      bestDoor: '1',
      doorNumber: '12',
      description: '下车后直接走到对面站台即可换乘2号线'
    },
    '1-13-2-1': 
    {
      bestCarriage: '1',
      bestDoor: '1',
      doorNumber: '13',
      description: '下车后直接走到对面站台即可换乘2号线'
    }
};
