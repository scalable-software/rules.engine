import { Pin } from "@scalable.software/pin.component";

await Pin.Template.load("Pin.template.html");
customElements.define(Pin.Tag, Pin);
