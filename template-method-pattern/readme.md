# Template Method Pattern in TypeScript

## Overview

The Template Method Pattern is a behavioral design pattern that defines the skeleton of an algorithm in a base class, allowing subclasses to redefine specific steps of the algorithm without changing its overall structure. This pattern is useful when you want to enforce a specific sequence of operations while allowing flexibility in the implementation of certain steps.

## Structure

1. **Abstract Class (CaffeineBeverage)**:
   - Defines the template method `prepareRecipe()` which outlines the steps for preparing a caffeinated beverage.
   - Contains abstract methods `brew()` and `addCondiments()` that subclasses must implement.
   - Provides common methods like `boilWater()` and `pourInCup()`.

2. **Concrete Classes (Tea and Coffee)**:
   - Implement the abstract methods with specific behaviors for brewing and adding condiments.

## Example Code

```typescript
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
```

## Benefits

- **Code Reusability**: Allows for the reuse of common steps in different subclasses without rewriting code.
- **Ease of Maintenance**: Changes in the algorithm can be made in the base class, ensuring that all subclasses remain consistent.
- **Structural Integrity**: Ensures that certain steps of the algorithm are executed in a specific order.

## Conclusion

The Template Method Pattern is an effective way to create a consistent algorithm structure while providing flexibility for subclasses. It is widely used in scenarios where the sequence of operations is crucial, and specific implementations can vary.

