
# Strategy Pattern

The **Strategy Pattern** is a behavioral design pattern in object-oriented programming. It allows selecting an algorithm at runtime, instead of being hardcoded into the source code. The goal of the Strategy Pattern is to separate the logic of different algorithms so that they can be easily changed, extended, or maintained without affecting the rest of the system.

## Components of the Strategy Pattern:
1. **Context**: This class contains the Strategy object and typically represents the main entity that uses different algorithms.
2. **Strategy (interface or abstract class)**: Defines the methods that all algorithms must implement.
3. **Concrete Strategies**: These are specific classes that implement the Strategy interface, each providing a different algorithm.

## Example: Payment strategies in an e-commerce system

Imagine you have an online shopping system where users can pay via different methods such as **credit card, e-wallet, or cash on delivery**.

### Step 1: Define the Strategy interface (Payment strategy)
```typescript
interface PaymentStrategy {
    pay(amount: number): void;
}
```

### Step 2: Implement concrete strategies
```typescript
// Credit card payment
class CreditCardPayment implements PaymentStrategy {
    private cardNumber: string;

    constructor(cardNumber: string) {
        this.cardNumber = cardNumber;
    }

    pay(amount: number): void {
        console.log(`Paying ${amount} using credit card with card number ${this.cardNumber}`);
    }
}

// E-wallet payment
class EWalletPayment implements PaymentStrategy {
    private walletId: string;

    constructor(walletId: string) {
        this.walletId = walletId;
    }

    pay(amount: number): void {
        console.log(`Paying ${amount} using e-wallet with ID ${this.walletId}`);
    }
}

// Cash on delivery payment
class CashOnDeliveryPayment implements PaymentStrategy {
    pay(amount: number): void {
        console.log(`Paying ${amount} by cash on delivery.`);
    }
}
```

### Step 3: Define the Context class (Shopping Cart)
```typescript
class ShoppingCart {
    private paymentStrategy: PaymentStrategy;

    constructor(paymentStrategy: PaymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    checkout(amount: number): void {
        this.paymentStrategy.pay(amount);
    }
}
```

### Step 4: Use the Strategy Pattern in the application
```typescript
const amount = 1000;

// User selects credit card payment
const cardPayment = new CreditCardPayment("1234-5678-9101-1121");
const cartWithCard = new ShoppingCart(cardPayment);
cartWithCard.checkout(amount);

// User selects e-wallet payment
const eWalletPayment = new EWalletPayment("mywallet123");
const cartWithWallet = new ShoppingCart(eWalletPayment);
cartWithWallet.checkout(amount);

// User selects cash on delivery
const cashPayment = new CashOnDeliveryPayment();
const cartWithCash = new ShoppingCart(cashPayment);
cartWithCash.checkout(amount);
```

### Output:
```
Paying 1000 using credit card with card number 1234-5678-9101-1121
Paying 1000 using e-wallet with ID mywallet123
Paying 1000 by cash on delivery.
```

### Advantages of the Strategy Pattern:
- **Easy to extend**: You can add new strategies without changing the core system code.
- **Flexible**: Strategies can be selected or changed at runtime.

### Disadvantages:
- **Increases the number of classes**: Each algorithm requires its own class, which could result in more classes in the system.
