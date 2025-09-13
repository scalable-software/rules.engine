/**
 * @module Component
 */
export const Tag = "pin-component";
/**
 * HTML Attributes available to set
 * @category Metadata: Attributes
 * @enum
 */
export const Attribute = {
    VISIBLE: "visible",
    STATE: "state",
};
/**
 * @category Metadata: State
 * @enum
 */
export const State = {
    PINNED: "pinned",
    UNPINNED: "unpinned",
};
/**
 * Attribute only visible when set to NO
 * @category Metadata: State
 * @enum
 */
export const Visible = {
    YES: "yes",
    NO: "no",
};
/**
 * @category Metadata: Operations
 * @enum
 */
export const Operation = {
    SHOW: "show",
    HIDE: "hide",
    PIN: "pin",
    UNPIN: "unpin",
    TOGGLE: "toggle",
};
/**
 * @category Metadata: Behavior
 * @enum
 */
export const Event = {
    ONHIDE: "onhide",
    ONSHOW: "onshow",
    ONPIN: "onpin",
    ONUNPIN: "onunpin",
};
/**
 * @category Metadata: Behavior
 * @enum
 */
export const Gesture = {
    CLICK: "click",
};
