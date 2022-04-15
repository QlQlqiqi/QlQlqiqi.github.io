# 第四次作业

| 学号        | 姓名   | 班级           |
| ----------- | ------ | -------------- |
| 19030100358 | 吴起龙 | 周一上午1、2节 |

> 作业要求

![image-20220415105034114](https://s2.loli.net/2022/04/15/Mp1nAJ8TUaFkmYw.png)

### 具体实现

1. 
   
    1. 通过 nextGaussian 产生符和正态分布的数据。
    2. 每 100ms 向 Topic 为 Sign 的主题发送一个数据。
2. 

    1. 订阅 Topic 为 Sign 主题的消息。
    2. 计算均值、方差、和最值。
    3. 通过 MOM 向队列名为 Sign 的 Queues 中发送计算值。

3. 
    1. 通过 MOM 向队列名为 Sign 的 Queues 中取数据。

### tips&bug

- 第二部分不能在一个线程里处理接收消息和发送数据，因为发送数据需要 Thread.sleep 延迟，会阻塞消息的接收，所以新建一个线程处理发送/接收消息。
- 将数据存在一个 ArrayList 中，可能会出现竞争情况：计算均值和方差的函数正在执行，然后执行一半，OS 调度切换线程，接收数据并存入 ArrayList 中，造成出错；所以需要使用二段锁协议，防止调度导致错误。

### 效果图

![image-20220415134742835](https://s2.loli.net/2022/04/15/uc3BaAwQYPLzomI.png)

![image-20220415135827776](https://s2.loli.net/2022/04/15/DyWnB7ujwmMqeac.png)

![image-20220415135837822](https://s2.loli.net/2022/04/15/6VqIxHvOWQoDTsj.png)

> 代码见 ./code
