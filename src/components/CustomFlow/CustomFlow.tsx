import React from "react";
import {TFlow} from "../../App";
import classes from './CustomFlow.module.scss'
import ReactFlow, {Background, EdgeChange, NodeChange, OnEdgesChange, OnNodesChange} from 'reactflow';
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
interface IComponentProps  {
    nodesChange: (evt: Array<NodeChange>) => void,
    edgesChange: (evt: Array<EdgeChange>) => void,
    onConnect: (params: any) => void,
    data: TFlow,
    onChange:(changedFlow: TFlow) => void
}

const nodeTypes = {
    custom: CustomNode
};

const CustomFlow:React.FC<IComponentProps> = (props) =>  {
    return (
        <div className={classes.CustomFlow}>
            <ReactFlow
                nodeTypes={nodeTypes}
                onNodesChange={props.nodesChange}
                onEdgesChange={props.edgesChange}
                onConnect={props.onConnect}
                nodes={props.data.nodes}
                edges={props.data.edges}
            >
                <Background/>
            </ReactFlow>
        </div>
    )
}

export default CustomFlow