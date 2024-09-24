
# Visitor Pattern in TypeScript

## What is the Visitor Pattern?

The **Visitor Pattern** is one of the **Behavioral Design Patterns**. Its main goal is to separate an algorithm from the object structure it operates on. This is useful when you want to add new behavior to existing objects without modifying their code.

### How the Visitor Pattern Works:

1. You have a group of objects (different classes) on which you want to perform various operations.
2. Instead of implementing the methods within the objects themselves, you define them in a separate **Visitor** object.
3. Each object will have an `accept` method to accept a visitor, and the visitor will have corresponding methods to handle the object.

### Structure of the Visitor Pattern:

- **Visitor Interface**: Defines a set of methods to perform operations on different object classes.
- **Concrete Visitor**: Implements these operations.
- **Element Interface**: Defines an `accept` method to receive a visitor.
- **Concrete Element**: Implements the specific object that requires the operation.

### Example in TypeScript

Let’s consider an example where we have geometric shapes like `Circle` and `Rectangle`. We will use the Visitor Pattern to add behaviors to these shapes, such as calculating the area, perimeter, or drawing them on the screen.

```typescript
// Visitor Interface
interface ShapeVisitor {
    visitCircle(circle: Circle): void;
    visitRectangle(rectangle: Rectangle): void;
}

// Element Interface
interface Shape {
    accept(visitor: ShapeVisitor): void;
}

// Concrete Element - Circle
class Circle implements Shape {
    constructor(public radius: number) {}

    accept(visitor: ShapeVisitor): void {
        visitor.visitCircle(this);
    }
}

// Concrete Element - Rectangle
class Rectangle implements Shape {
    constructor(public width: number, public height: number) {}

    accept(visitor: ShapeVisitor): void {
        visitor.visitRectangle(this);
    }
}

// Concrete Visitor - Area Calculation
class AreaCalculator implements ShapeVisitor {
    visitCircle(circle: Circle): void {
        const area = Math.PI * circle.radius * circle.radius;
        console.log(`Area of Circle: ${area}`);
    }

    visitRectangle(rectangle: Rectangle): void {
        const area = rectangle.width * rectangle.height;
        console.log(`Area of Rectangle: ${area}`);
    }
}

// Concrete Visitor - Perimeter Calculation
class PerimeterCalculator implements ShapeVisitor {
    visitCircle(circle: Circle): void {
        const perimeter = 2 * Math.PI * circle.radius;
        console.log(`Perimeter of Circle: ${perimeter}`);
    }

    visitRectangle(rectangle: Rectangle): void {
        const perimeter = 2 * (rectangle.width + rectangle.height);
        console.log(`Perimeter of Rectangle: ${perimeter}`);
    }
}

// Using the Visitor Pattern
const shapes: Shape[] = [
    new Circle(5),
    new Rectangle(10, 20),
];

// Calculate area
const areaCalculator = new AreaCalculator();
shapes.forEach(shape => shape.accept(areaCalculator));

console.log('-----');

// Calculate perimeter
const perimeterCalculator = new PerimeterCalculator();
shapes.forEach(shape => shape.accept(perimeterCalculator));
```

### Explanation:

- **ShapeVisitor** is the interface for the Visitor, defining methods for different types of objects (`visitCircle`, `visitRectangle`).
- The **Circle** and **Rectangle** objects implement the **Shape** interface and define the `accept` method, which takes a visitor and calls the appropriate method on the visitor.
- **AreaCalculator** and **PerimeterCalculator** are concrete visitors that implement behaviors like calculating the area or perimeter.
- At the end, we can use the same `shapes[]` collection with different visitors without modifying the logic inside the `Circle` and `Rectangle` classes.

### Benefits of the Visitor Pattern:

1. **Separation of Logic and Data**: The Visitor helps separate algorithms (logic) from the classes containing the data (elements).
2. **Easily Add New Functionality**: You can easily add new behaviors by creating new visitors without changing the existing structure.
3. **Minimizes Changes to Existing Code**: When you need to add new behaviors, you only need to create new visitors instead of modifying individual classes.

However, a downside is that if you add many new types (elements), you’ll need to update every visitor to support these new objects.
