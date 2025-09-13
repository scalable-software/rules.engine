import * as help from "./Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

const Type = {
  CONFIG: "Configuration",
  STATE: "State",
  OPERATION: "Operation",
  EVENT: "Event",
  GESTURE: "Gesture",
  COMPOSITION: "Composition",
};

import { Template } from "@scalable.software/component";

import {
  Pin,
  Tag,
  Attribute,
  Visible,
  State,
  Operation,
  Event,
  Gesture,
} from "@scalable.software/pin.component";

given("Tag Type.CONFIG test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CONFIG);
    setSpecProperty("spec", "Tag");
  });
  and("Pin imported", () => {
    then("Pin is defined", () => {
      expect(Pin).toBeDefined();
    });
    and("Pin is defined", () => {
      then("Pin.Tag static getter is defined", () => {
        expect(Pin.Tag).toBeDefined();
      });
      and("Pin.Tag static getter is defined", () => {
        then("Pin.Tag is Tag", () => {
          expect(Pin.Tag).toBe(Tag);
        });
      });
    });
  });
});

given("Attributes Type.CONFIG test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CONFIG);
    setSpecProperty("spec", "Attributes");
  });
  and("Pin imported", () => {
    then("Pin is defined", () => {
      expect(Pin).toBeDefined();
    });
    and("Pin is defined", () => {
      then("Pin.Attributes static getter is defined", () => {
        expect(Pin.Attributes).toBeDefined();
      });
      and("Pin.Attributes static getter is defined", () => {
        then("Pin.Attributes is Attribute", () => {
          expect(Pin.Attributes).toBe(Attribute);
        });
      });
    });
  });
});

given("Template Type.CONFIG test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CONFIG);
    setSpecProperty("spec", "Template");
  });
  and("Pin imported", () => {
    then("Pin is defined", () => {
      expect(Pin).toBeDefined();
    });
    and("Pin is defined", () => {
      then("Pin.Template static getter is defined", () => {
        expect(Pin.Template).toBeDefined();
      });
      and("Pin.Template static getter is defined", () => {
        then("Pin.Template is an instance of Template", () => {
          expect(Pin.Template).toBeInstanceOf(Template);
        });
      });
    });
  });
});

given("on Type.EVENT test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.EVENT);
    setSpecProperty("spec", "on");
  });
  and("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      help.define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Pin.Template.load("Pin.template.html");
      });
      afterEach(() => {
        help.remove(Pin.Tag);
      });
      and("a new pin is added to DOM", () => {
        let pin: Pin;
        beforeEach(() => {
          pin = help.add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          pin.remove();
        });
        then("pin.onhide setter is defined", () => {
          expect(help.hasSetter(pin, Event.ONHIDE)).toBeTrue();
        });
        then("pin.onshow setter is defined", () => {
          expect(help.hasSetter(pin, Event.ONSHOW)).toBeTrue();
        });
        then("pin.onpin setter is defined", () => {
          expect(help.hasSetter(pin, Event.ONPIN)).toBeTrue();
        });
        then("pin.onunpin setter is defined", () => {
          expect(help.hasSetter(pin, Event.ONUNPIN)).toBeTrue();
        });
        and("pin.on is defined and used with '*'", () => {
          let on: jasmine.Spy;
          beforeEach(() => {
            on = jasmine.createSpy("on");
            pin.on("*", on);
          });
          when("pin.hide()", () => {
            beforeEach(() => {
              pin.hide();
            });
            then("on is called", () => {
              expect(on).toHaveBeenCalled();
            });
          });
          when("pin.pin()", () => {
            beforeEach(() => {
              pin.pin();
            });
            then("on is called", () => {
              expect(on).toHaveBeenCalled();
            });
          });
          when("pin.toggle()", () => {
            beforeEach(() => {
              pin.toggle();
            });
            then("on is called", () => {
              expect(on).toHaveBeenCalled();
            });
          });
          and("pin.visible is Visible.NO", () => {
            beforeEach(() => {
              pin.visible = Visible.NO;
            });
            when("pin.show()", () => {
              beforeEach(() => {
                pin.show();
              });
              then("on is called", () => {
                expect(on).toHaveBeenCalled();
              });
            });
          });
          and("pin.state is State.PINNED", () => {
            beforeEach(() => {
              pin.state = State.PINNED;
            });
            when("pin.unpin()", () => {
              beforeEach(() => {
                pin.unpin();
              });
              then("on is called", () => {
                expect(on).toHaveBeenCalled();
              });
            });
          });
        });
        and("pin.on is defined and used with 'onpin'", () => {
          let onpin: jasmine.Spy;
          beforeEach(() => {
            onpin = jasmine.createSpy("onpin");
            pin.on(Event.ONPIN, onpin);
          });
          when("pin.pin()", () => {
            beforeEach(() => {
              pin.pin();
            });
            then("onpin is called", () => {
              expect(onpin).toHaveBeenCalled();
            });
          });
        });
      });
    });
  });
});

given("Template Type.COMPOSITION test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.COMPOSITION);
    setSpecProperty("spec", "Template");
  });
  and("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      help.define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      let template: HTMLTemplateElement;
      beforeEach(async () => {
        template = (await Pin.Template.load(
          "Pin.template.html"
        )) as HTMLTemplateElement;
      });
      afterEach(() => {
        help.remove(Pin.Tag);
      });
      then("template is defined", () => {
        expect(template).toBeDefined();
      });
      then("template contains element with class 'icon'", () => {
        expect(template.innerHTML).toContain('class="icon"');
      });
      then("template contains element with class 'pinned'", () => {
        expect(template.innerHTML).toContain('class="pinned"');
      });
      then("template contains element with class 'unpinned'", () => {
        expect(template.innerHTML).toContain('class="unpinned"');
      });
      and("a new pin is added to DOM", () => {
        let pin: Pin;
        beforeEach(() => {
          pin = help.add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          pin.remove();
        });
        then("pin.root contains template", () => {
          expect(pin.root.innerHTML).toContain(template.innerHTML);
        });
        then("pin.root contains a linked stylesheet", () => {
          expect(pin.root.innerHTML).toContain("stylesheet");
        });
      });
    });
  });
});

given("Attribute.VISIBLE Type.STATE test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATE);
    setSpecProperty("spec", Attribute.VISIBLE);
  });
  and("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      help.define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Pin.Template.load("Pin.template.html");
      });
      afterEach(() => {
        help.remove(Pin.Tag);
      });
      and("a new pin is added to DOM", () => {
        let pin: Pin;
        beforeEach(() => {
          pin = help.add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          pin.remove();
        });
        then("pin.visible property is defined", () => {
          expect(pin.visible).toBeDefined();
        });
        and("pin.visible property is defined", () => {
          then("pin.visible is Visible.YES", () => {
            expect(pin.visible).toEqual(Visible.YES);
          });
        });
      });
    });
  });
});

given("Attribute.STATE Type.STATE test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATE);
    setSpecProperty("spec", Attribute.STATE);
  });
  and("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      help.define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Pin.Template.load("Pin.template.html");
      });
      afterEach(() => {
        help.remove(Pin.Tag);
      });
      and("a new pin is added to DOM", () => {
        let pin: Pin;
        beforeEach(() => {
          pin = help.add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          pin.remove();
        });
        then("pin.state property is defined", () => {
          expect(pin.state).toBeDefined();
        });
        and("pin.state property is defined", () => {
          then("pin.state is State.UNPINNED", () => {
            expect(pin.state).toEqual(State.UNPINNED);
          });
          then("attribute state is State.UNPINNED", () => {
            expect(pin.getAttribute(Attribute.STATE)).toEqual(State.UNPINNED);
          });
        });
      });
    });
  });
});

given("Operation.HIDE Type.OPERATION test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.OPERATION);
    setSpecProperty("spec", Operation.HIDE);
  });
  and("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      help.define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Pin.Template.load("Pin.template.html");
      });
      afterEach(() => {
        help.remove(Pin.Tag);
      });
      and("a new pin is added to DOM", () => {
        let pin: Pin;
        beforeEach(() => {
          pin = help.add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          pin.remove();
        });
        then("pin.hide() method is defined", () => {
          expect(pin.hide).toBeDefined();
        });
        when("pin.hide()", () => {
          beforeEach(() => {
            pin.hide();
          });
          then("pin.visible is Visible.NO", () => {
            expect(pin.visible).toEqual(Visible.NO);
          });
          then("attribute visible is Visible.NO", () => {
            expect(pin.getAttribute(Attribute.VISIBLE)).toEqual(Visible.NO);
          });
        });
      });
    });
  });
});

given("Operation.SHOW Type.OPERATION test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.OPERATION);
    setSpecProperty("spec", Operation.SHOW);
  });
  and("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      help.define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Pin.Template.load("Pin.template.html");
      });
      afterEach(() => {
        help.remove(Pin.Tag);
      });
      and("a new pin is added to DOM", () => {
        let pin: Pin;
        beforeEach(() => {
          pin = help.add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          pin.remove();
        });
        then("pin.show() method is defined", () => {
          expect(pin.show).toBeDefined();
        });
        and("pin.visible is Visible.NO", () => {
          beforeEach(() => {
            pin.visible = Visible.NO;
          });
          when("pin.show()", () => {
            beforeEach(() => {
              pin.show();
            });
            then("pin.visible is Visible.YES", () => {
              expect(pin.visible).toEqual(Visible.YES);
            });
            then("attribute visible does not is defined", () => {
              expect(pin.getAttribute(Attribute.VISIBLE)).toBeNull();
            });
          });
        });
      });
    });
  });
});

given("Operation.PIN Type.OPERATION test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.OPERATION);
    setSpecProperty("spec", Operation.PIN);
  });
  and("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      help.define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Pin.Template.load("Pin.template.html");
      });
      afterEach(() => {
        help.remove(Pin.Tag);
      });
      and("a new pin is added to DOM", () => {
        let pin: Pin;
        beforeEach(() => {
          pin = help.add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          pin.remove();
        });
        then("pin.pin() method is defined", () => {
          expect(pin.pin).toBeDefined();
        });
        when("pin.pin()", () => {
          beforeEach(() => {
            pin.pin();
          });
          then("pin.state is State.PINNED", () => {
            expect(pin.state).toEqual(State.PINNED);
          });
          then("attribute state is State.PINNED", () => {
            expect(pin.getAttribute(Attribute.STATE)).toEqual(State.PINNED);
          });
        });
      });
    });
  });
});

given("Operation.UNPIN Type.OPERATION test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.OPERATION);
    setSpecProperty("spec", Operation.UNPIN);
  });
  and("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      help.define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Pin.Template.load("Pin.template.html");
      });
      afterEach(() => {
        help.remove(Pin.Tag);
      });
      and("a new pin is added to DOM", () => {
        let pin: Pin;
        beforeEach(() => {
          pin = help.add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          pin.remove();
        });
        then("pin.unpin() method is defined", () => {
          expect(pin.unpin).toBeDefined();
        });
        given("pin.state is State.PINNED", () => {
          beforeEach(() => {
            pin.state = State.PINNED;
          });
          when("pin.unpin()", () => {
            beforeEach(() => {
              pin.unpin();
            });
            then("pin.state is State.UNPINNED", () => {
              expect(pin.state).toEqual(State.UNPINNED);
            });
            then("attribute state is State.UNPINNED", () => {
              expect(pin.getAttribute(Attribute.STATE)).toEqual(State.UNPINNED);
            });
          });
        });
      });
    });
  });
});

given("Operation.TOGGLE Type.OPERATION test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.OPERATION);
    setSpecProperty("spec", Operation.TOGGLE);
  });
  and("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      help.define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Pin.Template.load("Pin.template.html");
      });
      afterEach(() => {
        help.remove(Pin.Tag);
      });
      and("a new pin is added to DOM", () => {
        let pin: Pin;
        beforeEach(() => {
          pin = help.add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          pin.remove();
        });
        then("pin.toggle() method is defined", () => {
          expect(pin.toggle).toBeDefined();
        });
        when("pin.toggle()", () => {
          beforeEach(() => {
            pin.toggle();
          });
          then("pin.state is State.PINNED", () => {
            expect(pin.state).toEqual(State.PINNED);
          });
          then("attribute state is State.PINNED", () => {
            expect(pin.getAttribute(Attribute.STATE)).toEqual(State.PINNED);
          });
          and("pin.toggle()", () => {
            beforeEach(() => {
              pin.toggle();
            });
            then("pin.state is State.UNPINNED", () => {
              expect(pin.state).toEqual(State.UNPINNED);
            });
            then("attribute state is State.UNPINNED", () => {
              expect(pin.getAttribute(Attribute.STATE)).toEqual(State.UNPINNED);
            });
          });
        });
      });
    });
  });
});

given("Event.ONHIDE Type.EVENT test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.EVENT);
    setSpecProperty("spec", Event.ONHIDE);
  });
  and("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      help.define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Pin.Template.load("Pin.template.html");
      });
      afterEach(() => {
        help.remove(Pin.Tag);
      });
      and("a new pin is added to DOM", () => {
        let pin: Pin;
        beforeEach(() => {
          pin = help.add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          pin.remove();
        });
        then("pin.onhide setter is defined", () => {
          expect(help.hasSetter(pin, Event.ONHIDE)).toBeTrue();
        });
        and("and pin.onhide setter is defined", () => {
          let onhide: jasmine.Spy;
          beforeEach(() => {
            onhide = jasmine.createSpy("onhide");
            pin.onhide = onhide;
          });
          when("pin.hide()", () => {
            beforeEach(() => {
              pin.hide();
            });
            then("onhide is called", () => {
              expect(onhide).toHaveBeenCalled();
            });
          });
          and("pin.onhide is set to new listener ", () => {
            let onhide2: jasmine.Spy;
            beforeEach(() => {
              onhide2 = jasmine.createSpy("onhide2");
              pin.onhide = onhide2;
            });
            when("pin.hide()", () => {
              beforeEach(() => {
                pin.hide();
              });
              then("onhide is not called", () => {
                expect(onhide).not.toHaveBeenCalled();
              });
              then("onhide2 is called", () => {
                expect(onhide2).toHaveBeenCalled();
              });
            });
          });
        });
      });
    });
  });
});

given("Event.ONSHOW Type.EVENT test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.EVENT);
    setSpecProperty("spec", Event.ONSHOW);
  });
  and("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      help.define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Pin.Template.load("Pin.template.html");
      });
      afterEach(() => {
        help.remove(Pin.Tag);
      });
      and("a new pin is added to DOM", () => {
        let pin: Pin;
        beforeEach(() => {
          pin = help.add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          pin.remove();
        });
        then("pin.onshow setter is defined", () => {
          expect(help.hasSetter(pin, Event.ONSHOW)).toBeTrue();
        });
        and("pin.onshow setter is defined", () => {
          let onshow: jasmine.Spy;
          beforeEach(() => {
            onshow = jasmine.createSpy("onshow");
            pin.onshow = onshow;
          });
          and("pin.visible is Visible.NO", () => {
            beforeEach(() => {
              pin.visible = Visible.NO;
            });
            when("pin.show()", () => {
              beforeEach(() => {
                pin.show();
              });
              then("onshow is called", () => {
                expect(onshow).toHaveBeenCalled();
              });
            });
            and("pin.onshow is set to new listener ", () => {
              let onshow2: jasmine.Spy;
              beforeEach(() => {
                onshow2 = jasmine.createSpy("onshow2");
                pin.onshow = onshow2;
              });
              when("pin.show()", () => {
                beforeEach(() => {
                  pin.show();
                });
                then("onshow is not called", () => {
                  expect(onshow).not.toHaveBeenCalled();
                });
                then("onshow2 is called", () => {
                  expect(onshow2).toHaveBeenCalled();
                });
              });
            });
          });
        });
      });
    });
  });
});

given("Event.ONPIN Type.EVENT test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.EVENT);
    setSpecProperty("spec", Event.ONPIN);
  });
  and("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      help.define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Pin.Template.load("Pin.template.html");
      });
      afterEach(() => {
        help.remove(Pin.Tag);
      });
      and("a new pin is added to DOM", () => {
        let pin: Pin;
        beforeEach(() => {
          pin = help.add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          pin.remove();
        });
        then("pin.onpin setter is defined", () => {
          expect(help.hasSetter(pin, Event.ONPIN)).toBeTrue();
        });
        and("pin.onpin setter is defined", () => {
          let onpin: jasmine.Spy;
          beforeEach(() => {
            onpin = jasmine.createSpy("onpin");
            pin.onpin = onpin;
          });
          when("pin.pin()", () => {
            beforeEach(() => {
              pin.pin();
            });
            then("onpin is called", () => {
              expect(onpin).toHaveBeenCalled();
            });
          });
          when("pin.toggle()", () => {
            beforeEach(() => {
              pin.toggle();
            });
            then("onpin is called", () => {
              expect(onpin).toHaveBeenCalled();
            });
          });
          and("pin.onpin is set to new listener ", () => {
            let onpin2: jasmine.Spy;
            beforeEach(() => {
              onpin2 = jasmine.createSpy("onpin2");
              pin.onpin = onpin2;
            });
            when("pin.pin()", () => {
              beforeEach(() => {
                pin.pin();
              });
              then("onpin is not called", () => {
                expect(onpin).not.toHaveBeenCalled();
              });
              then("onpin2 is called", () => {
                expect(onpin2).toHaveBeenCalled();
              });
            });
          });
        });
      });
    });
  });
});

given("Event.ONUNPIN Type.EVENT test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.EVENT);
    setSpecProperty("spec", Event.ONUNPIN);
  });
  and("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      help.define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Pin.Template.load("Pin.template.html");
      });
      afterEach(() => {
        help.remove(Pin.Tag);
      });
      and("a new pin is added to DOM", () => {
        let pin: Pin;
        beforeEach(() => {
          pin = help.add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          pin.remove();
        });
        then("pin.onunpin setter is defined", () => {
          expect(help.hasSetter(pin, Event.ONUNPIN)).toBeTrue();
        });
        and("pin.onunpin setter is defined", () => {
          let onunpin: jasmine.Spy;
          beforeEach(() => {
            onunpin = jasmine.createSpy("onunpin");
            pin.onunpin = onunpin;
          });
          and("pin.state is State.PINNED", () => {
            beforeEach(() => {
              pin.state = State.PINNED;
            });
            when("pin.unpin()", () => {
              beforeEach(() => {
                pin.unpin();
              });
              then("onunpin is called", () => {
                expect(onunpin).toHaveBeenCalled();
              });
            });
            when("pin.toggle()", () => {
              beforeEach(() => {
                pin.toggle();
              });
              then("onunpin is called", () => {
                expect(onunpin).toHaveBeenCalled();
              });
            });
            and("pin.onunpin is set to new listener ", () => {
              let onunpin2: jasmine.Spy;
              beforeEach(() => {
                onunpin2 = jasmine.createSpy("onunpin2");
                pin.onunpin = onunpin2;
              });
              when("pin.unpin()", () => {
                beforeEach(() => {
                  pin.unpin();
                });
                then("onunpin is not called", () => {
                  expect(onunpin).not.toHaveBeenCalled();
                });
                then("onunpin2 is called", () => {
                  expect(onunpin2).toHaveBeenCalled();
                });
              });
            });
          });
        });
      });
    });
  });
});

given("Gesture.CLICK Type.GESTURE test", () => {
  beforeEach(() => {
    setSpecProperty("type", Type.GESTURE);
    setSpecProperty("spec", Gesture.CLICK);
  });
  and("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      help.define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Pin.Template.load("Pin.template.html");
      });
      afterEach(() => {
        help.remove(Pin.Tag);
      });
      and("a new pin is added to DOM", () => {
        let pin: Pin;
        beforeEach(() => {
          pin = help.add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          pin.remove();
        });
        when("user click on icon", () => {
          let onpin: jasmine.Spy;
          beforeEach(() => {
            onpin = jasmine.createSpy("onpin");
            pin.onpin = onpin;
            const icon = pin.root.querySelector(".icon") as HTMLElement;
            icon.click();
          });
          then("pin.state is State.PINNED", () => {
            expect(pin.state).toEqual(State.PINNED);
          });
          then("attribute state is State.PINNED", () => {
            expect(pin.getAttribute(Attribute.STATE)).toEqual(State.PINNED);
          });
          then("onpin is called", () => {
            expect(onpin).toHaveBeenCalled();
          });
          and("user clicks on pin", () => {
            let onunpin: jasmine.Spy;
            beforeEach(() => {
              onunpin = jasmine.createSpy("onunpin");
              pin.onunpin = onunpin;
              const icon = pin.root.querySelector(".icon") as HTMLElement;
              icon.click();
            });
            then("pin.state is State.UNPINNED", () => {
              expect(pin.state).toEqual(State.UNPINNED);
            });
            then("attribute state is State.UNPINNED", () => {
              expect(pin.getAttribute(Attribute.STATE)).toEqual(State.UNPINNED);
            });
            then("onunpin is called", () => {
              expect(onunpin).toHaveBeenCalled();
            });
          });
        });
      });
    });
  });
});
