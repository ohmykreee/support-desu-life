export const extractMdxText = (raw: string | undefined) => {
  if (!raw) return "";
  return (
    raw
      // 移除 import/export 行
      .replace(/^import\s.*?from\s.*?;?$/gm, "")
      .replace(/^export\s.*$/gm, "")
      // 移除所有 HTML/JSX 起始标签
      .replace(/<[\w-]+[^>]*>/g, "")
      // 移除所有结束标签
      .replace(/<\/[\w-]+>/g, "")
      // 移除空标签（<Tag />）
      .replace(/<[\w-]+[^>]*\/>/g, "")
      // 可选：去除花括号表达式
      .replace(/{.*?}/g, "")
      // \r\n 替换为 \n
      .replace(/\r\n/g, "\n")
      // 多余空行合并
      .replace(/\n{2,}/g, "\n")
      .trim()
  );
};
