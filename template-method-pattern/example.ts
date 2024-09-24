// Abstract class defining the template method pattern
abstract class CaffeineBeverage {
    // Template method defining the steps for preparing the beverage
    public prepareRecipe(): void {
        this.boilWater();      // Step 1: Boil water
        this.brew();          // Step 2: Brew the beverage
        this.pourInCup();     // Step 3: Pour into cup
        this.addCondiments();  // Step 4: Add condiments
    }

    // Abstract methods that must be implemented by subclasses
    protected abstract brew(): void;
    protected abstract addCondiments(): void;

    // Common method for all beverages
    private boilWater(): void {
        console.log("Boiling water");
    }

    private pourInCup(): void {
        console.log("Pouring into cup");
    }
}

// Concrete class for Tea
class Tea extends CaffeineBeverage {
    // Implementation of brewing method for tea
    protected brew(): void {
        console.log("Steeping the tea");
    }

    // Implementation of adding condiments for tea
    protected addCondiments(): void {
        console.log("Adding lemon");
    }
}

// Concrete class for Coffee
class Coffee extends CaffeineBeverage {
    // Implementation of brewing method for coffee
    protected brew(): void {
        console.log("Dripping coffee through filter");
    }

    // Implementation of adding condiments for coffee
    protected addCondiments(): void {
        console.log("Adding sugar and milk");
    }
}

// Usage
const tea = new Tea();
tea.prepareRecipe();  // Prepare tea

console.log("\n");   // Print a new line for separation

const coffee = new Coffee();
coffee.prepareRecipe();  // Prepare coffee
