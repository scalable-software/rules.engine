/**
 * @module Component
 */
import { Component, Template } from "@scalable.software/component";
import { type Configuration, type Attributes, type Visibility, type States, type Handler } from "./Index.js";
/**
 * Configuration required for components with custom layout and style
 * @category Configuration
 */
export declare const configuration: Configuration;
/**
 * A button that can be toggled on and off
 * @category Components
 */
export declare class Pin extends Component {
    /**
     * The tag name of the component
     * @category Configuration
     */
    static get Tag(): string;
    /**
     * Only attributes defined the Attributes object will be observed in DOM
     * @category Attributes
     * @hidden
     */
    static get Attributes(): Attributes;
    /**
     * `Template.load(filename)` is used to load an HTML template packaged with the component.
     * @category Template
     * @hidden
     */
    static Template: Template;
    /**
     * Default visibility is `yes`
     * @category State
     * @hidden
     */
    private _visible;
    /**
     * Default state is `off`
     * @category State
     * @hidden
     */
    private _state;
    /**
     * onhide
     * @category Events
     * @hidden
     */
    private _onhide;
    /**
     * onshow
     * @category Events
     * @hidden
     */
    private _onshow;
    /**
     * onon
     * @category Events
     * @hidden
     */
    private _onpin;
    /**
     * onoff
     * @category Events
     * @hidden
     */
    private _onunpin;
    /**
     * Elements within the component
     * @category Elements
     * @hidden
     */
    private _elements;
    /**
     * @hidden
     */
    constructor();
    /**
     * Get and Sets the visibility of the button
     * @category State
     */
    get visible(): Visibility;
    set visible(visible: Visibility);
    /**
     * Get or Set state of the component
     * @category State
     */
    get state(): States;
    set state(state: States);
    /**
     * Triggered via `.hide()`
     * @event
     * @category Events
     */
    set onhide(handler: Handler);
    /**
     * Triggered via `.show()`
     * @event
     * @category Events
     */
    set onshow(handler: Handler);
    /**
     * Triggered via `.on()`
     * @event
     * @category Events
     */
    set onpin(handler: Handler);
    /**
     * Triggered via `.off()`
     * @event
     * @category Events
     */
    set onunpin(handler: Handler);
    /**
     * Add a handler to all events at the same time or to a specific event
     * @event
     * @category Events
     */
    on: (type: string, handler: Handler) => void;
    /**
     * Change the visibility of the button to `no`
     * @category Operations
     */
    hide: () => "no";
    /**
     * Change the visibility of the button to `yes`
     * @category Operations
     */
    show: () => "yes";
    /**
     * Change the state of the button to `on`
     * @category Operations
     */
    pin: () => "pinned";
    /**
     * Change the state of the button to `off`
     * @category Operations
     */
    unpin: () => "unpinned";
    /**
     * Toggle the state of the button
     * @category Operations
     */
    toggle: () => "pinned" | "unpinned";
    /**
     * List operations to perform for selected attributes being observed in the DOM.
     * @category Configuration
     * @hidden
     */
    protected _attributeHandlers: {
        state: (value: string) => States;
        visible: (value: string) => Visibility;
    };
    /**
     * Initialize component attributes with default values
     * @category Configuration
     * @hidden
     */
    protected _initialize: () => void;
    protected _cacheElements: () => void;
    /**
     * Called by the connectedCallback prototypical method
     * @category Configuration
     * @hidden
     */
    protected _addEventListeners: () => void;
    /**
     * Called by the disconnectedCallback prototypical method
     * @category Configuration
     * @hidden
     */
    protected _removeEventListeners: () => void;
    /**
     * Handles the click event
     * @category Gesture
     * @hidden
     */
    private _handleClick;
}
