# 闲鱼交易平台

这是一个 `Java Web + Vue` 的前后端项目，当前已经整理成可直接通过 `Tomcat` 部署运行的版本。

## 项目结构

- `src/main/java`：后端 Servlet、Service、DAO、实体类
- `frontend/dist`：已经打包好的前端页面和静态资源
- `sql/goofish.sql`：当前数据库导出文件
- `pom.xml`：Maven 构建配置，已配置打包为 `ROOT.war`

说明：

- 当前仓库里可用的是前端打包产物，`frontend` 下没有完整的 Vue 源码工程文件
- Maven 打包时会自动把 `frontend/dist` 合并进最终的 `ROOT.war`

## 已验证环境

- JDK 21
- Maven 3.9.x
- Tomcat 9.0.x
- MySQL 8.x

## 默认数据库配置

后端默认连接：

- 数据库地址：`localhost:3306`
- 数据库名：`goofish`
- 用户名：`root`
- 密码：`123456`

如需修改，可通过 JVM 参数或环境变量覆盖：

- `db.host` / `DB_HOST`
- `db.port` / `DB_PORT`
- `db.name` / `DB_NAME`
- `db.username` / `DB_USERNAME`
- `db.password` / `DB_PASSWORD`

## 启动方式

1. 确保 MySQL 已启动，并导入 `sql/goofish.sql`
2. 在项目根目录执行：

```bash
mvn -DskipTests package
```

3. 将生成的 `target/ROOT.war` 部署到 Tomcat 的 `webapps/ROOT.war`
4. 启动 Tomcat
5. 浏览器访问：

```text
http://localhost:8080
```

## 当前已打通的功能

- 用户注册、登录、退出、个人信息查询与更新
- 钱包充值
- 商品发布、编辑、删除、推荐、搜索、详情
- 收藏、评论、关注
- 下单、支付、取消、订单列表、订单删除
- 管理员注册与管理接口
- 前端路由刷新回退到 `index.html`
- 本地开发常见跨域预检请求

## 演示账号

当前数据库里已经准备了以下账号：

- 普通卖家：`seller_demo / 123456`
- 普通买家：`buyer_demo / 123456`
- 管理员：`admin_demo / 123456`
- 管理员：`admin2_demo / 123456`

当前还有一条可展示的在售商品：

- `SampleCamera`

## 注意事项

- Tomcat 必须占用可用的 `8080` 端口
- 如果你重新清空数据库，管理员首个账号需要重新初始化
- 如果后续要继续开发前端，建议补回完整 Vue 源码工程，而不是直接在 `dist` 上维护
