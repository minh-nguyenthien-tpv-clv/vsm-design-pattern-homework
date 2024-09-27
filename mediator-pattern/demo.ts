// vessel code
// vvd
// checkbox trunk feed

interface Mediator {
  notify(sender: object, event: string): void;
}

class UIMediator implements Mediator {
  private vesselCode: VesselCodeSelectComponent;
  private vvd: VvdSelectComponent;
  private trunkFeeder: CheckboxComponent;

  constructor(
    _vesselCode: VesselCodeSelectComponent,
    _vvd: VvdSelectComponent,
    _trunkFeeder: CheckboxComponent
  ) {
    this.vesselCode = _vesselCode;
    this.vesselCode.setMediator(this);
    this.vvd = _vvd;
    this.vvd.setMediator(this);
    this.trunkFeeder = _trunkFeeder;
    this.trunkFeeder.setMediator(this);
  }

  public notify(sender: object, event: string): void {
    if (event === 'vCode') {
      console.log('Mediator reacts on vCode and triggers follwing operations:');
      this.vvd.canFill();
    }

    if (event === 'vvd') {
      console.log('Mediator reacts on vvd and triggers follwing operations:');
      this.trunkFeeder.set(true);
    }
  }
}

class BaseUIComponent {
  protected mediator: Mediator;

  constructor(mediator?: Mediator) {
    this.mediator = mediator;
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

class VesselCodeSelectComponent extends BaseUIComponent {
  private isFilled: boolean;

  get() {
    return this.isFilled;
  }

  set(_isFilled: boolean) {
    this.isFilled = _isFilled;
  }

  public fill(): void {
    console.log('Vessel code filled');
    this.set(true);
    this.mediator.notify(this, 'vCode');
  }
}

class VvdSelectComponent extends BaseUIComponent {
  private isFilled: boolean;

  get() {
    return this.isFilled;
  }

  set(_isFilled: boolean) {
    this.isFilled = _isFilled;
  }

  public canFill(): void {
    console.log('Vdd can fill');
    this.set(true);
    console.log('Vdd can filled');
    this.mediator.notify(this, 'vvd');
  }
}

class CheckboxComponent extends BaseUIComponent {
  private isChecked: boolean;

  get() {
    return this.isChecked;
  }

  set(_isChecked: boolean) {
    this.isChecked = _isChecked;
  }
}

const vesselCode = new VesselCodeSelectComponent();
const vvd = new VvdSelectComponent();
const trunkFeeder = new CheckboxComponent();
const mediator = new UIMediator(vesselCode, vvd, trunkFeeder);

console.log('Client fill vessel code.');
vesselCode.fill();

console.log('Current state of checkbox:', trunkFeeder.get());
