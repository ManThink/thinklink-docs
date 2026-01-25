# 1. ThinkLink Docker
thinklink-docker contains the Docker installation and configuration files for thinklink.
 Currently, only the x64 platform is supported.
Docker repo ：https://github.com/ManThink/ThinkLink-docker
## 1.1. Instructions
1. Clone the repository to your local machine.
2. Run `docker-compose up`.
3. The images have been uploaded to Docker Hub and will be automatically pulled by docker-compose.
4. If you are unable to pull the images from Docker Hub due to network issues, download the image files and manually import them using the command: `docker load -i imagename.tar`.
5. Download link for image files: https://www.jianguoyun.com/p/DfMDLSgQjJyUBxj__5QGIAA
6. After importing the images, run `docker-compose up` to start the services.