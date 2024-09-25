// Interface ------------------------------------
interface Handler {
    handleRequest(request: string);
    setNext(nextHandler: Handler);
}

class ConcreteHandler1 implements Handler {
    private next: Handler;

    public handleRequest(request: string) {
        if (request === 'Handler1') {
            console.log("ConcreteHandler1 đã xử lý yêu cầu.");
        } else if (this.next != null) {
            this.next.handleRequest(request);
        }
    }

    public setNext(nextHandler: Handler) {
        this.next = nextHandler;
    }
}

class ConcreteHandler2 implements Handler {
    private next: Handler;

    public handleRequest(request: string) {
        if (request === 'Handler2') {
            console.log("ConcreteHandler2 đã xử lý yêu cầu.");
        } else if (this.next != null) {
            this.next.handleRequest(request);
        }
    }

    public setNext(nextHandler: Handler) {
        this.next = nextHandler;
    }
}


class ClientOfCoR {
    private handler: Handler;

    constructor(handler: Handler) {
        this.handler = handler;
    }

    public makeRequest(request: string) {
        this.handler.handleRequest(request);
    }
}

let handler1 = new ConcreteHandler1();
let handler2 = new ConcreteHandler2();

handler1.setNext(handler2);

let client = new ClientOfCoR(handler1);
client.makeRequest("Handler1");
client.makeRequest("Handler2");
client.makeRequest("Unknown"); // Sẽ không được xử lý bởi bất kỳ handler nào