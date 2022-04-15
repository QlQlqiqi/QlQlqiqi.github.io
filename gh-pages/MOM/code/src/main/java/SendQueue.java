import javax.jms.Connection;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageProducer;
import javax.jms.Session;

import org.apache.activemq.ActiveMQConnectionFactory;

public class SendQueue {
	private Connection connection;
	private Session session;
	private MessageProducer producer;
  private Destination destination;

	public SendQueue(String brokerURL, String queueName) throws JMSException {
		connection = (new ActiveMQConnectionFactory(brokerURL)).createConnection();
		connection.start();
		session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
		producer = session.createProducer(null);
		destination = session.createQueue(queueName);
	}

	public void close() throws JMSException {
		if (connection != null) {
			connection.close();
		}
	}

	public void sendMessage(String string) throws JMSException {
		Message message = session.createTextMessage(string);
    producer.send(destination, message);
	}
}
