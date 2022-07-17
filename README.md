# lionking

멋쟁이사자처럼 명지대(자연) lionTown server

## Requirements

## How to start development server

## Commit conventions

- feat : 기능 추가
- refactor : 리팩토링, 기능은 그대로 두고 코드를 수정
- fix : 버그 수정
- style : 코드에 지장 안 가는 스타일적 코드 수정
- setting : eslint 변경, 라이브러리 설치 등
- docs : 주석 추가삭제, readme 변경 등

## .env
```
EMAIL_AUTH_EMAIL=                 // gmail
EMAIL_AUTH_PASSWORD=              // gmail 패스워드
EMAIL_HOST=smtp.gmail.com         // host방식
EMAIL_FROM_USER_NAME=             // 메일 전송 이름 
SECRET_KEY=                       // JWT SecretKey
DB_NAME=                          // MySQL DB 이름
DB_PASSWORD=                      // MySQL Password 
```

## Pre-installation
DB, Cache 선행 설치가 필요합니다
```
MySql
Redis
```
