import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;
import javax.jms.Session;
import javax.jms.MessageConsumer;
import javax.jms.Topic;

import org.apache.activemq.ActiveMQConnectionFactory;

public class SignAnalyze {
	private static String brokerURL = "tcp://localhost:61616";
	private static String TOPIC = "Sign";
	private Connection connection;
	private Session session;

	public SignAnalyze() throws JMSException {
		ConnectionFactory factory = new ActiveMQConnectionFactory(brokerURL);
		connection = factory.createConnection();
		session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
		connection.start();
	}

	public void receive(final int N) throws JMSException {
		Topic topic = connection.createSession(false, Session.AUTO_ACKNOWLEDGE).createTopic(TOPIC);
		MessageConsumer messageConsumer = session.createConsumer(topic);
		messageConsumer.setMessageListener(new MyListener(N));
		connection.start();
	}

	public static void main(String[] args) throws JMSException {
		int N = 1;
		if(args.length > 0) {
			N = Integer.parseInt(args[0]);
			N = N > 0? N: 0;
		}
		SignAnalyze publisher = new SignAnalyze();
		publisher.receive(N);
	}
}
