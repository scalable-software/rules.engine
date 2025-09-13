/**
 * @module Component
 */
import { Component, Template } from "@scalable.software/component";

import { Attribute, Visible, State, Event, Gesture } from "./Index.js";
import {
  type Configuration,
  type Attributes,
  type Visibility,
  type States,
  type Events,
  type Handler,
} from "./Index.js";

/**
 * Configuration required for components with custom layout and style
 * @category Configuration
 */
export const configuration: Configuration = {
  url: import.meta.url,
  template: {
    id: "pin-component",
  },
  css: {
    name: "./Pin.style.css",
  },
} as const;

/**
 * A button that can be toggled on and off
 * @category Components
 */
export class Pin extends Component {
  /**
   * The tag name of the component
   * @category Configuration
   */
  public static get Tag() {
    return "pin-component";
  }

  /**
   * Only attributes defined the Attributes object will be observed in DOM
   * @category Attributes
   * @hidden
   */
  public static get Attributes(): Attributes {
    return Attribute;
  }

  /**
   * `Template.load(filename)` is used to load an HTML template packaged with the component.
   * @category Template
   * @hidden
   */
  public static Template = new Template(import.meta.url);

  /**
   * Default visibility is `yes`
   * @category State
   * @hidden
   */
  private _visible: Visibility = Visible.YES;

  /**
   * Default state is `off`
   * @category State
   * @hidden
   */
  private _state: States = State.UNPINNED;

  /**
   * onhide
   * @category Events
   * @hidden
   */
  private _onhide: Handler = null;

  /**
   * onshow
   * @category Events
   * @hidden
   */
  private _onshow: Handler = null;

  /**
   * onon
   * @category Events
   * @hidden
   */
  private _onpin: Handler = null;

  /**
   * onoff
   * @category Events
   * @hidden
   */
  private _onunpin: Handler = null;

  /**
   * Elements within the component
   * @category Elements
   * @hidden
   */
  private _elements = {
    icon: this.root.querySelector(".icon"),
  };

  /**
   * @hidden
   */
  constructor() {
    super(configuration);
  }

  /**
   * Get and Sets the visibility of the button
   * @category State
   */
  public get visible(): Visibility {
    return this.hasAttribute(Attribute.VISIBLE)
      ? (this.getAttribute(Attribute.VISIBLE) as Visibility)
      : this._visible;
  }
  public set visible(visible: Visibility) {
    visible = visible || Visible.YES;
    if (this.visible !== visible) {
      this._visible = visible;
      visible == Visible.YES && this.removeAttribute(Attribute.VISIBLE);
      visible == Visible.YES &&
        this._dispatchEvent(Event.ONSHOW, { detail: visible });
      visible == Visible.NO && this.setAttribute(Attribute.VISIBLE, visible);
      visible == Visible.NO &&
        this._dispatchEvent(Event.ONHIDE, { detail: visible });
    }
  }

  /**
   * Get or Set state of the component
   * @category State
   */
  public get state(): States {
    return this.hasAttribute(Attribute.STATE)
      ? (this.getAttribute(Attribute.STATE) as States)
      : this._state;
  }
  public set state(state: States) {
    if (this.state !== state) {
      this._state = state;
      this.setAttribute(Attribute.STATE, state);
      state === State.PINNED &&
        this._dispatchEvent(Event.ONPIN, { detail: { state } });
      state === State.UNPINNED &&
        this._dispatchEvent(Event.ONUNPIN, { detail: { state } });
    }
  }

  /**
   * Triggered via `.hide()`
   * @event
   * @category Events
   */
  public set onhide(handler: Handler) {
    this._onhide && this.removeEventListener(Event.ONHIDE, this._onhide);
    this._onhide = handler;
    this._onhide && this.addEventListener(Event.ONHIDE, this._onhide);
  }

  /**
   * Triggered via `.show()`
   * @event
   * @category Events
   */
  public set onshow(handler: Handler) {
    this._onshow && this.removeEventListener(Event.ONSHOW, this._onshow);
    this._onshow = handler;
    this._onshow && this.addEventListener(Event.ONSHOW, this._onshow);
  }

  /**
   * Triggered via `.on()`
   * @event
   * @category Events
   */
  public set onpin(handler: Handler) {
    this._onpin && this.removeEventListener(Event.ONPIN, this._onpin);
    this._onpin = handler;
    this._onpin && this.addEventListener(Event.ONPIN, this._onpin);
  }

  /**
   * Triggered via `.off()`
   * @event
   * @category Events
   */
  public set onunpin(handler: Handler) {
    this._onunpin && this.removeEventListener(Event.ONUNPIN, this._onunpin);
    this._onunpin = handler;
    this._onunpin && this.addEventListener(Event.ONUNPIN, this._onunpin);
  }

  /**
   * Add a handler to all events at the same time or to a specific event
   * @event
   * @category Events
   */
  public on = (type: string, handler: Handler) => {
    type === "*" &&
      Object.values(Event).forEach((type) => (this[type] = handler));
    Object.values(Event).includes(type as Events) && (this[type] = handler);
  };

  /**
   * Change the visibility of the button to `no`
   * @category Operations
   */
  public hide = () => (this.visible = Visible.NO);

  /**
   * Change the visibility of the button to `yes`
   * @category Operations
   */
  public show = () => (this.visible = Visible.YES);

  /**
   * Change the state of the button to `on`
   * @category Operations
   */
  public pin = () => (this.state = State.PINNED);

  /**
   * Change the state of the button to `off`
   * @category Operations
   */
  public unpin = () => (this.state = State.UNPINNED);

  /**
   * Toggle the state of the button
   * @category Operations
   */
  public toggle = () =>
    (this.state = this.state === State.PINNED ? State.UNPINNED : State.PINNED);

  /**
   * List operations to perform for selected attributes being observed in the DOM.
   * @category Configuration
   * @hidden
   */
  protected _attributeHandlers = {
    [Attribute.STATE]: (value: string) => (this.state = <States>value),
    [Attribute.VISIBLE]: (value: string) => (this.visible = <Visibility>value),
  };

  /**
   * Initialize component attributes with default values
   * @category Configuration
   * @hidden
   */
  protected _initialize = () => {
    this.setAttribute(Attribute.STATE, this.state);
  };

  protected _cacheElements = () => {
    this._elements.icon = this.root.querySelector(".icon");
  };

  /**
   * Called by the connectedCallback prototypical method
   * @category Configuration
   * @hidden
   */
  protected _addEventListeners = () =>
    this._elements.icon.addEventListener(Gesture.CLICK, this._handleClick);

  /**
   * Called by the disconnectedCallback prototypical method
   * @category Configuration
   * @hidden
   */
  protected _removeEventListeners = () =>
    this._elements.icon.removeEventListener(Gesture.CLICK, this._handleClick);

  /**
   * Handles the click event
   * @category Gesture
   * @hidden
   */
  private _handleClick = (event: MouseEvent | TouchEvent) => this.toggle();
}
