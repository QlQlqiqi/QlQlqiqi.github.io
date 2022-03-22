import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

final public class Server {

    public static void main(String[] args) throws Exception {
        // 绑定 8000 端口
        final int PORT = 8000;
        ServerSocket listenSocket = new ServerSocket(PORT);
        System.out.println("server bind " + PORT);
        ThreadPoolExecutor executor = new ThreadPoolExecutor(3, 5, 500,
                TimeUnit.MILLISECONDS, new ArrayBlockingQueue<Runnable>(3));
        // 连接数
        int count = 0;

        Socket socket = null;

        while(true) {
            socket = listenSocket.accept();
            System.out.println("the total num of clients is: " + ++count);
            MyTask myTask = new MyTask(socket);
            executor.execute(myTask);
            System.out.println("the number of threads in the ThreadPool is: " + executor.getPoolSize());
            System.out.println("the number of tasks in the Queue is: " + executor.getQueue().size());
            System.out.println("the number of tasks completed is: " + executor.getCompletedTaskCount());
        }
    }
}