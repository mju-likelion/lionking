REPOSITORY1=/home/ec2-user
REPOSITORY=/home/ec2-user/liontown
PROJECT_NAME=liontown

ssh -i lionking-lightsail.pem ubuntu@api.liontown.city
cd lionking
git pull
sudo docker compose down
sudo docker compose up -d