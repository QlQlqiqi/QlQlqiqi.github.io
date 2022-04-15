import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;
import javax.jms.MessageConsumer;
import javax.jms.Session;

import org.apache.activemq.ActiveMQConnectionFactory;

public class ASyncConsumer {

	public static void main(String[] args) throws JMSException {

		try {
			String brokerURL = "tcp://localhost:61616";
			ConnectionFactory factory = new ActiveMQConnectionFactory(brokerURL);
			Connection connection = factory.createConnection();
			connection.start();
			Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
			MessageConsumer messageConsumer = session.createConsumer(session.createQueue("Sign"));
			MyListenerQueue listener = new MyListenerQueue();
			messageConsumer.setMessageListener(listener);
			while (true) {
				System.in.read();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
