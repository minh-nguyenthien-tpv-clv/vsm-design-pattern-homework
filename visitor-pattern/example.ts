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
    constructor(public radius: number) { }

    accept(visitor: ShapeVisitor): void {
        visitor.visitCircle(this);
    }
}

// Concrete Element - Rectangle
class Rectangle implements Shape {
    constructor(public width: number, public height: number) { }

    accept(visitor: ShapeVisitor): void {
        visitor.visitRectangle(this);
    }
}

// Concrete Visitor - Area Calculation (Tính diện tích)
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

// Concrete Visitor - Perimeter Calculation (Tính chu vi)
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

// Sử dụng Visitor Pattern
const shapes: Shape[] = [
    new Circle(5),
    new Rectangle(10, 20),
];

// Tính diện tích
const areaCalculator = new AreaCalculator();
shapes.forEach(shape => shape.accept(areaCalculator));

console.log('-----');

// Tính chu vi
const perimeterCalculator = new PerimeterCalculator();
shapes.forEach(shape => shape.accept(perimeterCalculator));
