REPOSITORY1=/home/ec2-user
REPOSITORY=/home/ec2-user/liontown
PROJECT_NAME=liontown

cd lionking
git pull
sudo docker compose down
sudo docker compose up -d