import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

public class MyListener implements MessageListener {
	MyThread thread;
	double max = Integer.MIN_VALUE;
	double min = Integer.MAX_VALUE;

	public void onMessage(Message message) {
		try {
			double num = Double.parseDouble(((TextMessage) message).getText());
			System.out.println("receive: " + num);
			max = Math.max(max, num);
			min = Math.min(min, num);
			System.out.println("max: " + max + "; min: " + min);
			thread.addNum(num);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void work(int N) {
		thread = new MyThread("tcp://localhost:61616", "Sign", N);
		thread.start();
	}

	public MyListener() {
		work(0);
	}

	public MyListener(final int N) {
		work(N);
	}
}
