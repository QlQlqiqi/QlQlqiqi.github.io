import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.Topic;
import java.lang.Thread;
import java.util.Random;

import org.apache.activemq.ActiveMQConnectionFactory;

public class SignPublisher {
	private static String brokerURL = "tcp://localhost:61616";
	private static String TOPIC = "Sign";
	private static ConnectionFactory factory;
	private Connection connection;
	private Session session;
	private MessageProducer producer;
	private Topic topic;

	public SignPublisher(String topicName) throws JMSException {
		factory = new ActiveMQConnectionFactory(brokerURL);
		connection = factory.createConnection();
		session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
		topic = session.createTopic(topicName);
		producer = session.createProducer(topic);
		connection.start();
	}

	public void close() throws JMSException {
		if (connection != null) {
			connection.close();
		}
	}

	public void sendMessage(double num) throws JMSException {
		Message message = session.createTextMessage(num + "");
		producer.send(message);
		System.out.println("send num: " + num);
	}

	public static void main(String[] args) throws JMSException {
		SignPublisher signPublisher = new SignPublisher(TOPIC);
		// 每 100ms 产生均值为 0 方差为 1 的数字
		Random random = new Random();
		try {
			while (true) {
				signPublisher.sendMessage(random.nextGaussian());
				Thread.sleep(100);
			}
		} catch (Exception err) {
			err.printStackTrace();
		} finally {
			signPublisher.close();
		}
	}
}
