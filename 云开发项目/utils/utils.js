/**
 * 当前时间格式化
 */
export const formatDate = () => {
  const pad = num => String(num).padStart(2, '0'); // 封装一个通用的补零函数

  const date = new Date();
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 月份从0开始，需要+1
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 计算图片容器高度，保持图片原始比例
 * @param {Object} e 事件对象
 */
export const handleImageLoad = (e) => {
  const { windowWidth } = wx.getWindowInfo(); // 获取屏幕宽度
  const { height: imgHeight, width: imgWidth } = e.detail; // 解构图片宽高

  // 计算保持比例的高度
  const containerHeight = (windowWidth * imgHeight) / imgWidth;

  this.setData({
    Height: `${containerHeight}px`, // 使用模板字符串
  });
}

/**
 * 判断点是否在多边形内部
 * @param {{longitude: number, latitude: number}} point - 待检测点
 * @param {{longitude: number, latitude: number}[]} polygon - 多边形顶点数组
 */
export const isPointInPolygon = (point, polygon) => {
  // 预处理：全部转为数值
  const toNum = ({ longitude, latitude }) => ({
    longitude: +longitude,
    latitude: +latitude,
  });
  point = toNum(point);
  polygon = polygon.map(v => toNum(v));

  // 检查顶点
  for (const v of polygon) {
    if (
      Math.abs(v.longitude - point.longitude) < 1e-9 &&
      Math.abs(v.latitude - point.latitude) < 1e-9
    ) {
      return true;
    }
  }

  // 检查边
  const n = polygon.length;
  for (let i = 0; i < n; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % n];
    if (this.isPointOnSegment(point, a, b)) return true;
  }

  // 射线法核心逻辑
  let crossings = 0;
  for (let i = 0; i < n; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % n];
    const [aLat, bLat] = [a.latitude, b.latitude];
    const pLat = point.latitude;

    // 边跨越射线时才处理
    if (aLat >= pLat === bLat >= pLat) continue;

    // 排除水平边
    if (aLat === bLat) continue;

    // 计算交点经度
    const t = (pLat - aLat) / (bLat - aLat);
    const intersectLon = a.longitude + t * (b.longitude - a.longitude);

    // 交点在射线右侧（经度更大）
    if (intersectLon > point.longitude + 1e-9) {
      crossings++;
    }
  }

  return crossings % 2 === 1;
}

/**
 * 判断点是否在多边形边上
 * @param {{longitude: number, latitude: number}} p - 待检测点
 * @param {{longitude: number, latitude: number}} a - 线段起点
 * @param {{longitude: number, latitude: number}} b - 线段终点
 */
export const isPointOnSegment = (p, a, b) => {
  // 强制转换为数值
  const toNum = obj => ({
    longitude: +obj.longitude,
    latitude: +obj.latitude,
  });
  p = toNum(p);
  a = toNum(a);
  b = toNum(b);

  // 叉积判共线
  const cross =
    (p.longitude - a.longitude) * (b.latitude - a.latitude) -
    (p.latitude - a.latitude) * (b.longitude - a.longitude);
  if (Math.abs(cross) > 1e-9) return false;

  // 包围盒检查
  const minLon = Math.min(a.longitude, b.longitude);
  const maxLon = Math.max(a.longitude, b.longitude);
  const minLat = Math.min(a.latitude, b.latitude);
  const maxLat = Math.max(a.latitude, b.latitude);

  return (
    p.longitude >= minLon - 1e-9 &&
    p.longitude <= maxLon + 1e-9 &&
    p.latitude >= minLat - 1e-9 &&
    p.latitude <= maxLat + 1e-9
  );
}
