// @flow
import isEqual from "lodash/isEqual";
import { Component } from "react";
import { connect } from "react-redux";
import type { ActionFormat } from "../actions/action-flow";


type Props = {
    usingAction: ActionFormat,
    storeKey: string,
    subIndex?: string,
    render: (any, ?boolean, ?Object) => any,
    onUpdate?: Function,
    alwaysReload?: boolean,

    // injected
    dispatch?: Function,
    data?: any,
    isLoading?: boolean,
    isUpdating?: boolean,
    isDirty?: boolean,
    timestamp?: number,
}

export class FetchData extends Component<Props, Object> {

    constructor(props: Props) {
        super(props);

        this.callAction = this.callAction.bind(this);
        this.fetch = this.fetch.bind(this);
    }

    componentDidMount() {
        // if no data or if alwaysReload flag is set, fetch a fresh data
        if ( ! this.props.timestamp || this.props.alwaysReload) {
            this.fetch();
        }

        if (this.props.data && this.props.data.length && this.props.onUpdate) { // if data already loaded update the parent
            this.props.onUpdate(this.props.data);
        }
    }

    componentDidUpdate(prevProps: Props)  {

        const isActionChanged = ! isEqual(this.props.usingAction, prevProps.usingAction);
        const isDataChanged = (this.props.isDirty && ! this.props.isLoading);

        if (isActionChanged || isDataChanged) { // re-fetch the data
            this.fetch();
        }

        // $FlowFixMe (flow doesn't understand that timestamp is injected through connect)
        if (this.props.timestamp > prevProps.timestamp && this.props.onUpdate) {
            this.props.onUpdate(this.props.data);
        }
    }

    // fetch the data
    fetch() {
        this.callAction(this.props.usingAction);
    }

    // dispatch the given action
    callAction(action: ActionFormat) {
        // $FlowFixMe (flow doesn't understand that dispatch is injected through connect)
        this.props.dispatch(action);
    }

    render() {
        const params = {
            timestamp: this.props.timestamp,
            isUpdating: this.props.isUpdating,
            callAction: this.callAction,
            fetch: this.fetch,
        };

        return this.props.render(this.props.data, this.props.isLoading, params);
    }
}

const  mapStateToProps = (state,  ownProps) => {
    const key = ownProps.storeKey;
    const subIndex = ownProps.subIndex;

    let mapping = {
        isLoading: state[key].isLoading,
        isUpdating: state[key].isUpdating,
        isDirty: state[key].isDirty,
        timestamp: state[key].timestamp,
        data: undefined,
    };

    if (subIndex) {
        mapping.data = (state[key].data && state[key].data[subIndex]) ? state[key].data[subIndex] : undefined;
    } else {
        mapping.data = state[key].data;
    }

    return mapping;
};


export default connect(mapStateToProps)(FetchData);