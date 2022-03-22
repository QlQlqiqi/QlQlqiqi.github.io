import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

final public class MyThread extends Thread {

    private final Socket socket;

    public MyThread(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        BufferedReader bufferedReader = null;
        PrintWriter printWriter = null;
        try {
            bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            printWriter = new PrintWriter(socket.getOutputStream());
            String info = "";
            while((info = bufferedReader.readLine()) != null) {
                System.out.println("message from client is: " + info);
                printWriter.println(info);
                printWriter.flush();
            }
        } catch (IOException e) {
//            e.printStackTrace();
        } finally {
            System.out.println("server has disconnected");
            try {
                if(bufferedReader != null)
                    bufferedReader.close();
                if(printWriter != null)
                    printWriter.close();
                if(socket != null)
                    socket.close();
            } catch (IOException e) {
//                e.printStackTrace();
            }
        }
    }
}
