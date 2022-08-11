create table lounge
(
    id       varchar(6)                               not null
        primary key,
    name     varchar(20)                              null,
    `limit`  int         default 100                  null,
    createAt datetime(6) default CURRENT_TIMESTAMP(6) not null,
    updateAt datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint IDX_b4f1c745f02781ffca67b67e11
        unique (name)
);

create table user
(
    id       int auto_increment
        primary key,
    phone    varchar(11)                              null,
    name     varchar(10)                              null,
    password varchar(255)                             null,
    email    varchar(30)                              null,
    createAt datetime(6) default CURRENT_TIMESTAMP(6) not null,
    updateAt datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint IDX_e12875dfb3b1d92d7d7c5377e2
        unique (email)
);

create table room
(
    id       int auto_increment
        primary key,
    admin    tinyint     default 0                    not null,
    createAt datetime(6) default CURRENT_TIMESTAMP(6) not null,
    updateAt datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    userId   int                                      null,
    loungeId varchar(6)                               null,
    constraint FK_0468c843ad48d3455e48d40ddd4
        foreign key (userId) references user (id),
    constraint FK_e05a996ab3e01f6cc966bd27fa2
        foreign key (loungeId) references lounge (id)
);

create table memo
(
    id        int auto_increment
        primary key,
    title     varchar(20)                              null,
    content   varchar(1000)                            null,
    createdAt datetime(6) default CURRENT_TIMESTAMP(6) not null,
    updatedAt datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    userId    int                                      null,
    roomId    int                                      null,
    constraint FK_4d208b85f5cbf3ffb6c392362ab
        foreign key (roomId) references room (id),
    constraint FK_4e7b587791c6bd79494072dfe97
        foreign key (userId) references user (id)
);
