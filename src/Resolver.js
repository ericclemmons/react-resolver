/* eslint-disable no-underscore-dangle */

import React from "react";

// react-dom seems to be clashing with react-native, no idea why
// so I'll just comment them out to make it work in react-native.
//import ReactDOM from "react-dom";
//import {renderToStaticMarkup} from "react-dom/server";

let ReactDOM;
let renderToStaticMarkup

const ID = "ReactResolver.ID";
const CHILDREN = "ReactResolver.CHILDREN";
const HAS_RESOLVED = "ReactResolver.HAS_RESOLVED";
const IS_CLIENT = "ReactResolver.IS_CLIENT";
const PAYLOAD = "__REACT_RESOLVER_PAYLOAD__";

/**
 * Check if we're running under a ReactNative enviroment;
 * @return {boolean}
 *
 * https://stackoverflow.com/questions/39468022/how-do-i-know-if-my-code-is-running-as-react-native
 */
function isReactNative() {
    return (typeof navigator != 'undefined' && navigator.product == 'ReactNative');
}


export default class Resolver extends React.Component {
    static childContextTypes = {
        resolver: React.PropTypes.instanceOf(Resolver),
    }

    static contextTypes = {
        resolver: React.PropTypes.instanceOf(Resolver),
    }

    static defaultProps = {
        data: {},
        props: {},
        resolve: {},
    }

    static displayName = "Resolver"

    static propTypes = {
        children: React.PropTypes.func.isRequired,
        data: React.PropTypes.object.isRequired,
        props: React.PropTypes.object,
        resolve: React.PropTypes.object,
    }

    static render = function(render, node, data = window[PAYLOAD]) {
        ReactDOM.render((
            <Resolver data={data}>
                {render}
            </Resolver>
        ), node);

        delete window[PAYLOAD];
    }

    static resolve = function(render, initialData = {}) {
        const queue = [];

        if (!isReactNative() && renderToStaticMarkup) {
            renderToStaticMarkup(
                <Resolver data={initialData} onResolve={((promise) => {
                    queue.push(promise);
                    return Promise.resolve(true);
                })}>
                    {render}
                </Resolver>
            );
        }

        return Promise.all(queue).then((results) => {
            const data = { ...initialData };

            results.forEach(({ id, resolved }) => data[id] = resolved);

            if (Object.keys(initialData).length < Object.keys(data).length) {
                return Resolver.resolve(render, data);
            }

            class Resolved extends React.Component {
                static displayName = "Resolved"

                render() {
                    return (
                        <Resolver data={data}>
                            {render}
                        </Resolver>
                    );
                }
            }

            return { data, Resolved };
        });
    }

    constructor(props, context) {
        super(props, context);

        // Internal tracking variables
        this[ID] = this.generateId();
        this[CHILDREN] = [];
        this[HAS_RESOLVED] = false;
        this[IS_CLIENT] = false;

        this.state = this.computeState(this.props, {
            pending: {},
            resolved: this.cached() || {},
        });

        if (this.isPending(this.state)) {
            this.resolve(this.state);
            this[HAS_RESOLVED] = false;
        } else {
            this[HAS_RESOLVED] = true;
        }
    }

    cached(resolver = this) {
        const id = resolver[ID];

        if (this.props.data.hasOwnProperty(id)) {
            return { ...this.props.data[id] };
        } else if (this.context.resolver) {
            return this.context.resolver.cached(resolver);
        }
    }

    clearData(resolver = this) {
        const id = resolver[ID];

        if (this.props.data.hasOwnProperty(id)) {
            delete this.props.data[id];
        } else if (this.context.resolver) {
            return this.context.resolver.clearData(resolver);
        }
    }

    componentDidMount() {
        this[IS_CLIENT] = true;
    }

    componentWillReceiveProps(nextProps) {
        const cleanState = {
            pending: {},
            resolved: {},
        };

        const { pending, resolved } = this.computeState(nextProps, cleanState);

        // Next state will resolve async props again, but update existing sync props
        const nextState = {
            pending,
            resolved: { ...this.state.resolved, ...resolved },
        };

        this.setState(nextState);
    }

    computeState(thisProps, nextState) {
        const { props, resolve } = thisProps;

        Object.keys(resolve).forEach(name => {
            // Ignore existing supplied props or existing resolved values
            if (!nextState.resolved.hasOwnProperty(name)) {
                const factory = resolve[name];
                const value = factory(props);
                const isPromise = (
                    value instanceof Promise
                    ||
                    (
                        (
                            typeof value === "object" && value !== null
                            ||
                            typeof value === "function"
                        )
                        &&
                        typeof value.then === "function"
                    )
                );

                if (isPromise) {
                    nextState.pending[name] = value;
                } else {
                    // Synchronous values are immediately assigned
                    nextState.resolved[name] = value;
                }
            }
        });

        return nextState;
    }

    generateId() {
        const { resolver } = this.context;

        if (!resolver) {
            return ".0";
        }

        const id = `${resolver[ID]}.${resolver[CHILDREN].length}`;

        if (resolver && resolver[CHILDREN].indexOf(this) === -1) {
            resolver[CHILDREN].push(this);
        }

        return id;
    }

    getChildContext() {
        return { resolver: this };
    }

    isPending(state = this.state) {
        return Object.keys(state.pending).length > 0;
    }

    isParentPending() {
        const { resolver } = this.context;

        if (resolver) {
            return resolver.isPending() || resolver.isParentPending();
        }

        return false;
    }

    onResolve(state) {
        if (this.props.onResolve) {
            return this.props.onResolve(state);
        } else if (this.context.resolver) {
            return this.context.resolver.onResolve(state);
        } else {
            return state;
        }
    }

    render() {
        // Avoid rendering until ready
        if (!this[HAS_RESOLVED]) {
            return false;
        }

        // If render is called again (e.g. hot-reloading), re-resolve
        if (this.isPending(this.state)) {
            this.resolve(this.state);
        }

        // Both those props provided by parent & dynamically resolved
        return this.props.children({
            ...this.props.props,
            ...this.state.resolved,
        });
    }

    resolve(state) {
        const pending = Object.keys(state.pending).map(name => {
            const promise = state.pending[name];

            return { name, promise };
        });

        const promises = pending.map(({ promise }) => promise);

        var resolving = Promise.all(promises).then(values => {
            const id = this[ID];
            const resolved = values.reduce((resolved, value, i) => {
                const { name } = pending[i];

                resolved[name] = value;

                return resolved;
            }, {});

            return { id, resolved };
        });

        // Resolve listeners get the current ID + resolved
        resolving = this.onResolve(resolving);

        // Update current component with new data (on client)
        resolving.then(({ resolved }) => {
            this[HAS_RESOLVED] = true;

            if (!this[IS_CLIENT]) {
                return false;
            }

            const nextState = {
                pending: {},
                resolved: { ...state.resolved, ...resolved },
            };

            this.setState(nextState);
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Prevent updating when parent is changing values
        if (this.isParentPending()) {
            return false;
        }

        // Prevent rendering until pending values are resolved
        if (this.isPending(nextState)) {
            this.resolve(nextState);

            return false;
        }

        // Update if we have resolved successfully
        return this[HAS_RESOLVED];
    }
}