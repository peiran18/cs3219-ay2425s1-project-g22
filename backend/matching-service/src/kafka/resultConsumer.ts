import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { sendMessage } from './producer';

const kafka = new Kafka({
    clientId: 'matching-results-consumer',
    brokers: ['localhost:9092'],
});

const consumer: Consumer = kafka.consumer({ groupId: 'matching-results-group' });

export async function connectResultConsumer(
    io: any,
    userSocketMap: Map<string, string>
): Promise<void> { 
    await consumer.connect();
    console.log('Result Consumer connected');

    await consumer.subscribe({ topic: 'matching-results', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        if (topic === 'matching-results') {
            console.log({
                "[CONSUMER]":
                topic,
                partition,
                key: message.key?.toString(), // Check for possible undefined
                value: message.value?.toString(), // Check for possible undefined
            });
            const matchResult = JSON.parse(message.value?.toString()!);
            
            console.log("---------------------[MATCHING_RESULT_CONSUMER]----------------------")
            console.log(matchResult);
            console.log('---------------------------------------------------------------------');
            console.log();

            const { userId, matchUserId } = matchResult;
            const socketId = userSocketMap.get(userId);
            if (socketId) {
                io.to(socketId).emit('match-result', matchResult);
            }
        
        }},        
    });
}

export async function disconnectResultConsumer(): Promise<void> {
    await consumer.disconnect();
    console.log('Result Consumer disconnected');
}
