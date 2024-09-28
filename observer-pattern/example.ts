// Interface for Observer
interface Observer {
    update(product: string): void;
}

// Interface for Subject
interface Subject {
    subscribe(observer: Observer): void;
    unsubscribe(observer: Observer): void;
    notify(): void;
}

// Concrete Subject (Store)
class Store implements Subject {
    private observers: Observer[] = [];
    private newProduct: string = "";

    // Add an Observer
    subscribe(observer: Observer): void {
        this.observers.push(observer);
    }

    // Remove an Observer
    unsubscribe(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Notify all Observers about the new product
    notify(): void {
        this.observers.forEach(observer => observer.update(this.newProduct));
    }

    // Add a new product and notify customers
    addNewProduct(product: string): void {
        console.log(`Store: New product available - ${product}`);
        this.newProduct = product;
        this.notify();
    }
}

// Concrete Observer (Customer)
class Customer implements Observer {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    // Receive notification from the store
    update(product: string): void {
        console.log(`${this.name} received notification: New product available - ${product}`);
    }
}

// Using the Observer Pattern

const store = new Store();

// Create customers
const customer1 = new Customer("Customer 1");
const customer2 = new Customer("Customer 2");

// Customers subscribe to receive notifications from the store
store.subscribe(customer1);
store.subscribe(customer2);

// Store adds a new product
store.addNewProduct("Phone"); // Both customers will receive the notification

// Customer 1 unsubscribes from receiving notifications
store.unsubscribe(customer1);

// Store adds another new product
store.addNewProduct("Laptop"); // Only customer 2 will receive the notification
