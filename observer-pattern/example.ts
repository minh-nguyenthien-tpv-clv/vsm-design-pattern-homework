// Observer Class
class Observer {
    private subscribers: { productId: string; callbacks: Array<() => void> }[] = [];

    public subscribe(productId: string, callback: () => void): void {
        const existingSubscriber = this.subscribers.find(sub => sub.productId === productId);
        if (existingSubscriber) {
            existingSubscriber.callbacks.push(callback);
        } else {
            this.subscribers.push({ productId, callbacks: [callback] });
        }
    }

    public notify(productId: string): void {
        const subscriber = this.subscribers.find(sub => sub.productId === productId);
        if (subscriber) {
            subscriber.callbacks.forEach(callback => callback());
        }
    }
}

// Create an instance of the Observer
const observer = new Observer();

// Simulate subscribing to products
observer.subscribe("Laptop", () => {
    console.log("Notification: Great news! Smartphone is now available!");
});

observer.subscribe("Phone", () => {
    console.log("Notification: Great news! Laptop is now available!");
});

// Simulate notifying product availability
const notifyProductAvailability = (productId: string) => {
    console.log(`Notifying subscribers for product ${productId}...`);
    observer.notify(productId);
};

// Simulate the product availability notifications
notifyProductAvailability("Laptop");
notifyProductAvailability("Phone");
