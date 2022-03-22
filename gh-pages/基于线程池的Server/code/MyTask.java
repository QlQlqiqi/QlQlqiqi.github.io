import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

final public class MyTask extends Thread implements Runnable {

    // 通信 socket
    private final Socket socket;

    public MyTask(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        MyThread myThread = new MyThread(socket);
        myThread.start();
    }
}
