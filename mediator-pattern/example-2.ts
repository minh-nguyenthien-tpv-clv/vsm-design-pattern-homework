// Mediator Interface
interface ChatRoom {
    showMessage(user: User, message: string): void;
}

// Concrete Mediator
class ConcreteChatRoom implements ChatRoom {
    showMessage(user: User, message: string): void {
        const time = new Date().toLocaleTimeString();
        const sender = user.getName();
        console.log(`${time} [${sender}]: ${message}`);
    }
}

// Colleague Interface
class User {
    private name: string;
    private chatMediator: ChatRoom;

    constructor(name: string, chatMediator: ChatRoom) {
        this.name = name;
        this.chatMediator = chatMediator;
    }

    getName(): string {
        return this.name;
    }

    sendMessage(message: string): void {
        this.chatMediator.showMessage(this, message);
    }
}

// Usage
const chatRoom: ChatRoom = new ConcreteChatRoom();
const user1: User = new User("Alice", chatRoom);
const user2: User = new User("Bob", chatRoom);

user1.sendMessage("Hello Bob!");
user2.sendMessage("Hi Alice!");
