import { AppRoot } from '../../lib/decorators/app-root';
import { Injectable } from '../../lib/decorators/injectable';

export class SimpleService {
  text = 'I am the simplest';
  calls = 0;
  constructor() {
    console.log(this.text);
  }
}

@Injectable()
export class DummyService {
  constructor(public s: SimpleService) {
    console.log('This is the dummy service', s);
    s.calls++;
    this.do();
  }
  do() {
    console.log(this.s.calls);
  }
}

@Injectable()
export class TestService {
  constructor(s: SimpleService) {
    console.log('This is the test service', s);
  }
}

@AppRoot({
  services: [DummyService, TestService]
})
export class App { }

const app = new App();
