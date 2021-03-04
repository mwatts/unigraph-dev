import { IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React, { FC, ReactElement } from 'react';
import ReactJson from 'react-json-view';
import { BookmarkItem } from '../../examples/bookmarks/Bookmarks';
import { TodoItem } from '../../examples/todo/TodoList';
import { DynamicViewRenderer } from '../../global';
import { DefaultObjectContextMenu } from './DefaultObjectContextMenu';
import { filterPresets } from './objectViewFilters';

type ObjectViewOptions = {
    viewer?: "string" | "json-tree" | "dynamic-view",
    unpad?: boolean,
    showContextMenu?: boolean,
};

type ObjectListViewOptions = {
    filters?: {
        showDeleted?: boolean,
    },
}

type DefaultObjectViewProps = {
    object: any,
    options: ObjectViewOptions,
};

type DefaultObjectListViewProps = {
    component: (...args: any[]) => ReactElement<any, any>,
    objects: any[],
    options: ObjectListViewOptions,
};

const StringObjectViewer = ({object}: {object: any}) => {
    const finalObject = window.unigraph.unpad(object)

    return <div>
        Type: {object?.type?.["unigraph.id"]}<br/>
        {JSON.stringify(finalObject, null, 2)}
    </div>;
}

const JsontreeObjectViewer = ({object}: {object: any}) => {
    return <div>
        <ReactJson src={object} />
    </div>
}

const DynamicViews: Record<string, DynamicViewRenderer> = {
    "$/schema/todo": TodoItem,
    "$/schema/web_bookmark": BookmarkItem
}

const AutoDynamicView: DynamicViewRenderer = ({ object, callbacks }) => {
    console.log(object)
    if (object?.type && object.type['unigraph.id'] && Object.keys(DynamicViews).includes(object.type['unigraph.id'])) {
        return React.createElement(DynamicViews[object.type['unigraph.id']], {
            data: object, callbacks: callbacks ? callbacks : undefined
        });
    } else {
        return <StringObjectViewer object={object}/>
    }
}

const DefaultObjectView: FC<DefaultObjectViewProps> = ({ object, options }) => {
    //const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const finalObject = options.unpad ? window.unigraph.unpad(object) : object
    let FinalObjectViewer;
    const ContextMenuButton: any = options.showContextMenu ? <IconButton 
        aria-label="context-menu"
        onClick={(ev) => {
            setContextMenu(<DefaultObjectContextMenu 
                uid={object.uid}
                object={object} 
                anchorEl={ev.currentTarget} 
                handleClose={()=>{setContextMenu(null)}}/>)
        }}
    >
        <MoreVert />
    </IconButton> : null
    const [ContextMenu, setContextMenu] = React.useState<any>(null);

    switch (options.viewer) {
        case "dynamic-view":
            FinalObjectViewer = <AutoDynamicView object={object} />;
            break;

        case "json-tree":
            FinalObjectViewer = <JsontreeObjectViewer object={finalObject}/>;
            break;
    
        default:
            FinalObjectViewer = <StringObjectViewer object={finalObject}/>;
            break;
    }

    return <div style={{display: "flex", flexDirection: "row"}}>
        {ContextMenuButton} {ContextMenu}
        <div style={{alignSelf: "center",width: "100%",
                alignItems: "center",
                display: "flex"}}>{FinalObjectViewer}</div>
    </div>
}

const DefaultObjectListView: FC<DefaultObjectListViewProps> = ({component, objects, options}) => {
    let finalObjects = objects;
    if (!options.filters?.showDeleted) finalObjects = filterPresets['no-deleted'](finalObjects);

    return <div>{finalObjects.map(obj => React.createElement(
        component, {}, 
        [<DefaultObjectView object={obj} 
            options={{
                unpad: false, 
                showContextMenu: true,
                viewer: "dynamic-view",
            }} />]))}</div>
}

export { DefaultObjectView, DefaultObjectListView};