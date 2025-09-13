/**
 * @module Component
 */
import { Component, Template } from "@scalable.software/component";
import { Attribute, Visible, State, Event, Gesture } from "./Index.js";
/**
 * Configuration required for components with custom layout and style
 * @category Configuration
 */
export const configuration = {
    url: import.meta.url,
    template: {
        id: "pin-component",
    },
    css: {
        name: "./Pin.style.css",
    },
};
/**
 * A button that can be toggled on and off
 * @category Components
 */
export class Pin extends Component {
    /**
     * The tag name of the component
     * @category Configuration
     */
    static get Tag() {
        return "pin-component";
    }
    /**
     * Only attributes defined the Attributes object will be observed in DOM
     * @category Attributes
     * @hidden
     */
    static get Attributes() {
        return Attribute;
    }
    /**
     * `Template.load(filename)` is used to load an HTML template packaged with the component.
     * @category Template
     * @hidden
     */
    static Template = new Template(import.meta.url);
    /**
     * Default visibility is `yes`
     * @category State
     * @hidden
     */
    _visible = Visible.YES;
    /**
     * Default state is `off`
     * @category State
     * @hidden
     */
    _state = State.UNPINNED;
    /**
     * onhide
     * @category Events
     * @hidden
     */
    _onhide = null;
    /**
     * onshow
     * @category Events
     * @hidden
     */
    _onshow = null;
    /**
     * onon
     * @category Events
     * @hidden
     */
    _onpin = null;
    /**
     * onoff
     * @category Events
     * @hidden
     */
    _onunpin = null;
    /**
     * Elements within the component
     * @category Elements
     * @hidden
     */
    _elements = {
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
    get visible() {
        return this.hasAttribute(Attribute.VISIBLE)
            ? this.getAttribute(Attribute.VISIBLE)
            : this._visible;
    }
    set visible(visible) {
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
    get state() {
        return this.hasAttribute(Attribute.STATE)
            ? this.getAttribute(Attribute.STATE)
            : this._state;
    }
    set state(state) {
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
    set onhide(handler) {
        this._onhide && this.removeEventListener(Event.ONHIDE, this._onhide);
        this._onhide = handler;
        this._onhide && this.addEventListener(Event.ONHIDE, this._onhide);
    }
    /**
     * Triggered via `.show()`
     * @event
     * @category Events
     */
    set onshow(handler) {
        this._onshow && this.removeEventListener(Event.ONSHOW, this._onshow);
        this._onshow = handler;
        this._onshow && this.addEventListener(Event.ONSHOW, this._onshow);
    }
    /**
     * Triggered via `.on()`
     * @event
     * @category Events
     */
    set onpin(handler) {
        this._onpin && this.removeEventListener(Event.ONPIN, this._onpin);
        this._onpin = handler;
        this._onpin && this.addEventListener(Event.ONPIN, this._onpin);
    }
    /**
     * Triggered via `.off()`
     * @event
     * @category Events
     */
    set onunpin(handler) {
        this._onunpin && this.removeEventListener(Event.ONUNPIN, this._onunpin);
        this._onunpin = handler;
        this._onunpin && this.addEventListener(Event.ONUNPIN, this._onunpin);
    }
    /**
     * Add a handler to all events at the same time or to a specific event
     * @event
     * @category Events
     */
    on = (type, handler) => {
        type === "*" &&
            Object.values(Event).forEach((type) => (this[type] = handler));
        Object.values(Event).includes(type) && (this[type] = handler);
    };
    /**
     * Change the visibility of the button to `no`
     * @category Operations
     */
    hide = () => (this.visible = Visible.NO);
    /**
     * Change the visibility of the button to `yes`
     * @category Operations
     */
    show = () => (this.visible = Visible.YES);
    /**
     * Change the state of the button to `on`
     * @category Operations
     */
    pin = () => (this.state = State.PINNED);
    /**
     * Change the state of the button to `off`
     * @category Operations
     */
    unpin = () => (this.state = State.UNPINNED);
    /**
     * Toggle the state of the button
     * @category Operations
     */
    toggle = () => (this.state = this.state === State.PINNED ? State.UNPINNED : State.PINNED);
    /**
     * List operations to perform for selected attributes being observed in the DOM.
     * @category Configuration
     * @hidden
     */
    _attributeHandlers = {
        [Attribute.STATE]: (value) => (this.state = value),
        [Attribute.VISIBLE]: (value) => (this.visible = value),
    };
    /**
     * Initialize component attributes with default values
     * @category Configuration
     * @hidden
     */
    _initialize = () => {
        this.setAttribute(Attribute.STATE, this.state);
    };
    _cacheElements = () => {
        this._elements.icon = this.root.querySelector(".icon");
    };
    /**
     * Called by the connectedCallback prototypical method
     * @category Configuration
     * @hidden
     */
    _addEventListeners = () => this._elements.icon.addEventListener(Gesture.CLICK, this._handleClick);
    /**
     * Called by the disconnectedCallback prototypical method
     * @category Configuration
     * @hidden
     */
    _removeEventListeners = () => this._elements.icon.removeEventListener(Gesture.CLICK, this._handleClick);
    /**
     * Handles the click event
     * @category Gesture
     * @hidden
     */
    _handleClick = (event) => this.toggle();
}
