import javax.jms.TextMessage;
import javax.jms.Message;
import javax.jms.MessageListener;

public class MyListenerQueue implements MessageListener {

  public void onMessage(Message message) {
		try {
      String text = ((TextMessage) message).getText();
      String tmp[] = text.split("\\s+");
			System.out.println("expect: " + tmp[0] + "; variance: " + tmp[1]);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
