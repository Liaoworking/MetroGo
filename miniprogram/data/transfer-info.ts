// 地铁换乘信息数据
import { TransferInfo, TransferInfoMap } from '../types/metro';

// 换乘信息数据 - 模拟数据
export const transferInfo: TransferInfoMap = {
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
};
