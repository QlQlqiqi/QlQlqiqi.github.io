import java.io.*;
import java.net.Socket;

final public class Client {

    public static void main(String []args) throws Exception {
        // 向服务器请求
        final String IP = "127.0.0.1";
        final int PORT = 8000;
        Socket socket = new Socket(IP, PORT);

        // 键盘字符输入流
        BufferedReader stdIn = new BufferedReader(new InputStreamReader(System.in));
        // socket 字符输入输出流
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        PrintWriter printWriter = new PrintWriter(socket.getOutputStream());

        System.out.println("input your message to send to the server");
        String userInput = "", echoMessage = "";
        while((userInput = stdIn.readLine()) != "") {
            printWriter.println(userInput);
            printWriter.flush();
            echoMessage = bufferedReader.readLine();
            System.out.println("message from server is: " + echoMessage);
        }
        socket.close();
    }
}
