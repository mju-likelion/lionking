REPOSITORY1=/home/ec2-user
REPOSITORY=/home/ec2-user/liontown
PROJECT_NAME=liontown

# 실행
cd REPOSITORY
yarn install
yarn start

# nginx 연결

# echo "> 현재 구동중인 애플리케이션 pid 확인"
# CURRENT_PID=$(pgrep -fl $PROJECT_NAME | grep java | awk '{print $1}')

# if [ -z $CURRENT_PID ]; then
#     echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."
# else
#     echo "> kill -15 $CURRENT_PID"
#     kill -15 $CURRENT_PID
#     sleep 5
# fi

# echo "> 새 어플리케이션 배포"
# JAR_NAME=$(ls -tr $REPOSITORY/*.jar | tail -n 1)

# echo "> $JAR_NAME에 실행권한 추가"
# chmod +x $JAR_NAME

# echo "> $JAR_NAME 실행"
# nohup java -jar $JAR_NAME > $REPOSITORY1/nohup.out 2>&1 &