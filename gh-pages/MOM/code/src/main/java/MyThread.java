import java.util.ArrayList;
import javax.jms.JMSException;

// import org.apache.activemq.ActiveMQConnectionFactory;

public class MyThread extends Thread {

  ArrayList<Double> nums;
	double max = Integer.MIN_VALUE;
	double min = Integer.MAX_VALUE;
	double expect;
	double variance;
  SendQueue sendQueue;
  int N;

  @Override
  public void run() {
    while (true) {
			try {
        if(this.calcExAndVar())
          this.send();
				Thread.sleep(1000);
			} catch (Exception err) {
				err.printStackTrace();
			}
		}
  }

	// 发送均值和方差到队列
	public void send() throws JMSException {
    System.out.println("send expect: " + expect + "; variance: " + variance);
		sendQueue.sendMessage(expect + " " + variance);
	}

	// 计算均值方差
	public Boolean calcExAndVar() {
    int size = nums.size();
		if(size != N)
			return false;
    expect = 0;
		for(double num: nums) {
			expect += num;
		}
		expect /= size;
		variance = 0;
		for(double num: nums) {
			variance += Math.pow(num - expect, 2);
		}
		if(size == 1)
			variance = 0;
		else variance /= (size - 1);
		nums.clear();
		return true;
	}

  public void addNum(double num) {
		if(nums.size() >= N)
			nums.remove(0);
    nums.add(num);
  }

  public MyThread(String brokerURL, String queueName, int N) {
    nums = new ArrayList<Double>();
    this.N = N;
    try {
      sendQueue = new SendQueue(brokerURL, queueName);
    } catch(JMSException err) {
      err.printStackTrace();
    }
  }
}
