# 第二次作业

## 要求：

![要求](https://s2.loli.net/2022/03/22/ouV8XEStgw3rMdU.jpg)



### 循序渐进

---

不使用线程池的 Server ：

​		监听端口，建立监听 socket，每次有请求连接时，则从中取出并新建一个通信 socket，与客户端通过字符流通信。

​		**问题**：因为每次新建通信 socket 时都会新建一个线程，大大增加了线程**创建-销毁**的开销。



使用线程池的 Server：

​		在上面的基础上，建立一个线程池，因为线程池中有一些一直休眠的线程，所以产生连接请求时，可以大大减少线程创建-销毁的开销。

note：

- 线程池中的任务必要实现 Runnable 接口
- 子线程需要继承 Thread 基类



大致流程：Server 中创建线程池，有连接请求时取出一个线程执行任务，任务内容就是服务该请求。

### 运行结果

![image-20220322165328393](https://s2.loli.net/2022/03/22/8bGDCmWQSehPlsi.png)



> 代码如下

[Server.java](./code/Server.java)

[Client.java](./code/Client.java)

[MyTask.java](./code/MyTask.java)

[MyThread.java](./code/MyThread.java)