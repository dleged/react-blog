启动mongodb的配置文件mongdb.conf文件 mongodb -f ./mongodb.conf
`#数据库数据存放目录
dbpath=/home/mongodb-database/react-blog-db/data
#数据库日志存放目录
logpath=/home/mongodb-database/react-blog-db/logs/mongodb.log
#以追加的方式记录日志
logappend = true
#端口号 默认为27017
port=27017
#以后台方式运行进程
fork=true
#开启用户认证
auth=true
#关闭http接口，默认关闭http端口访问
nohttpinterface=true
#mongodb所绑定的ip地址
bind_ip = http://47.94.234.96/
#启用日志文件，默认启用
journal=true
#这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false
quiet=tru`


linx 系统下
vi ./etc/rc.local

/usr/local/mongodb/bin/mongod --dbpath=/home/mongodb-database/react-blog-db/data --logpath=/home/mongodb-database/react-blog-db/logs/mongod.log --logappend  --auth  --port=27017 --fork

mogodb启动脚步

#!/bin/bash
#
#chkconfig: 2345 80 90
#description: mongodb

/usr/local/bin/mongod --repair -f /home/mongodb-database/react-blog-db/mongod.conf
start() {
    /usr/local/mongodb/bin/mongod -f /home/mongodb-database/react-blog-db/mongod.conf
}

stop() {
    /usr/local/mongodb/bin/mongod -f /home/mongodb-database/react-blog-db/mongod.conf --shutdown
}

case "$1" in
    start)
    start
;;
    stop)
    stop
;;
    restart)
    stop
    start
;;
    *)
    echo $"Usage:$0 {start|stop|restart}"
    exit 1
esac



use admin
db.createUser(
  {
    user: "admin",
    pwd: "password",
    roles: [ { role: "root", db: "admin" } ]
  }
);
