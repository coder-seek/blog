---
title: 文章标题
date: 2026-07-28
updated: 
category: 分类
tags: ["标签1", "标签2"]
summary: 文章摘要，会显示在文章卡片和搜索结果的描述中
draft: false
pinned: false
cover: 
---

## 引言

开篇段落，引出你要写的主题。

可以用引用（如果有出处）：

> 引用内容
>
> —— 出处

---

## 一、第一部分

### 1.1 小标题

正文内容。**加粗**、*斜体*、~~删除线~~。

- 无序列表项
- 无序列表项
  - 嵌套项
  - 嵌套项

1. 有序列表项
2. 有序列表项

### 1.2 代码示例

行内代码：`npm run dev`

代码块（指定语言）：

```javascript
// JavaScript / TypeScript
function greet(name) {
  return `Hello, ${name}!`;
}
```

```bash
# Shell 命令
git add .
git commit -m "feat: add new feature"
git push origin main
```

```python
# Python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b
```

---

## 二、第二部分

### 2.1 插入图片

![图片描述](image/文章名/图片文件名.jpg)

> 💡 图片放在 `src/content/posts/image/<文章名>/` 目录下，用相对路径引用。

### 2.2 表格

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容 | 内容 | 内容 |
| 内容 | 内容 | 内容 |

### 2.3 告示块

> ⚠️ **注意**：这是一个注意事项。

> 💡 **提示**：这是一个提示信息。

> ✅ **完成**：这是一个完成状态的说明。

---

## 三、总结

总结文章核心观点，可以补充后续计划或延伸阅读。

---

**参考链接：**

- [链接标题](https://example.com)
- [链接标题](https://example.com)
