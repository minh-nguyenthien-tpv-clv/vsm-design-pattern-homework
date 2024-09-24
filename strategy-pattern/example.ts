interface PaymentStrategy {
    pay(amount: number): void;
}

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

class ShoppingCart {
    private paymentStrategy: PaymentStrategy;

    constructor(paymentStrategy: PaymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    checkout(amount: number): void {
        this.paymentStrategy.pay(amount);
    }
}

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

