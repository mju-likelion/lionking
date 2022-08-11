INSERT INTO lionking.user (phone, name, password, email, createAt, updateAt) VALUES ('01053262151', '강민정', '$2a$10$6CSmtGRQCqOfDYGLfrAlOOOnZ3gPdjl9BwEJh.awmdPzlU/ZKhExm', 'ypd06021@naver.com', '2022-08-10 00:00:00', '2022-08-10 00:00:00');
INSERT INTO lionking.user (phone, name, password, email, createAt, updateAt) VALUES ('01093202207', '박재민', '$2a$10$q5z9Pk/ApVXO1.cRk.uZeunUGc6pxDYbFlk8DChOOZ/fx/Hvhy8wi', 'pjm2207@naver.com', '2022-08-10 00:00:00', '2022-08-10 00:00:00');
INSERT INTO lionking.user (phone, name, password, email, createAt, updateAt) VALUES ('01033119451', '유예빈', '$2a$10$7vDjCLkgyEbK/ZtnawI5Peg8RD1G94hjHCisfo31V2L3SQInE0mcq', 'yuyaebean@gmail.com', '2022-08-10 00:00:00', '2022-08-10 00:00:00');

INSERT INTO lionking.lounge (id, name, `limit`, createAt, updateAt) VALUES ('RN1K3Z', '멋쟁이사자처럼', 40, '2022-08-10 00:00:00', '2022-08-10 00:00:00');
INSERT INTO lionking.lounge (id, name, `limit`, createAt, updateAt) VALUES ('ABCDEF', '라운지이름을길게지어보자', 40, '2022-08-10 00:00:00', '2022-08-10 00:00:00');

INSERT INTO lionking.room (userId, admin, loungeId) VALUES (3, 1, 1);
INSERT INTO lionking.room (userId, admin, loungeId) VALUES (1, 0, 1);
INSERT INTO lionking.room (userId, admin, loungeId) VALUES (2, 0, 1);
INSERT INTO lionking.room (userId, admin, loungeId) VALUES (1, 1, 2);
INSERT INTO lionking.room (userId, admin, loungeId) VALUES (2, 0, 2);
INSERT INTO lionking.room (userId, admin, loungeId) VALUES (3, 0, 2);
