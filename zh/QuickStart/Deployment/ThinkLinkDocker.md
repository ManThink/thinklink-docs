## 介绍
thinklink-docker 是thinklink的docker安装配置文件,当前只支持x64平台
Docker 仓库的地址为：https://gitee.com/manthink_bj/thinklink-docker 
## 安装说明
1.  将仓库clone到本地
2.  执行docker-compose up
3.  镜像已上传至dockerhub,docker-compose会自动拉取
4.  如果因为网络问题无法从dockerhub拉取镜像，请下载镜像文件手动导入，镜像导入命令：“docker load -i imagename.tar”
5.  镜像文件下载链接：https://www.jianguoyun.com/p/DfMDLSgQjJyUBxj__5QGIAA
6.  镜像导入完成后执行docker-compose up