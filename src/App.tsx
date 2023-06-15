import React, {useCallback, useState} from 'react';
import classes from './App.module.scss'
import CustomTable, {TItem} from "./components/CustomTable/CustomTable";
import CustomFlow from "./components/CustomFlow/CustomFlow";
import {addEdge, useEdgesState, useNodesState} from "reactflow";


const initialNodes: Array<TNode> = [
    { id: '1',type: 'input', position: { x: 200, y: 50 }, data: { label: 'Блок 1' }},
    { id: '2', position: { x: 200, y: 200 }, data: { label: 'Блок 2' }},
    { id: '3', position: { x: 300, y: 300 }, data: { label: 'Блок 6' }},
    { id: '4', type:'custom', position: { x: 200, y: 400 }, data: { label: 'Зашитый кастомный блок' }},
];
const initialEdges: Array<TEdge> = [{ id: 'e1-2', source: '1', target: '2' }, { id: 'e1-4', source: '1', target: '3' , animated: true}];

export type TNode = {
    id: string,
    data: {label: string}
    position: { x: number; y: number; }
    type?:string
}


export type TEdge = {
    id: string, source: string, target: string, animated?: boolean
}

export type TFlow = {
    nodes: Array<TNode>,
    edges: Array<TEdge>
}


const itemsArr: Array<TItem> = [
    {
        state: 'warning',
        Column_1: false,
        Column_2: ['пункт - 1', 'пункт - 2', 'пункт - 3', 'пункт - 4', 'пункт - 1', 'пункт - 2', 'пункт - 3', 'пункт - 4'],
        Column_3: 'Не валидная ссылка',
        Column_4: new Date('1994-02-18')
    },
    {
        state: 'normal',
        Column_1: true,
        Column_2: ['пункт - 1', 'пункт - 2', 'пункт - 3', 'пункт - 4'],
        Column_3: 'https://google.com',
        Column_4: new Date('2021-02-05')
    },
    {
        state: 'danger',
        Column_1: false,
        Column_2: ['пункт - 1', 'пункт - 2', 'пункт - 3', 'пункт - 4', 'пункт - 5'],
        Column_3: 'Не валидная ссылка',
        Column_4: new Date('1999-08-19')
    },
    {
        Column_1: true,
        Column_2: ['пункт - 1', 'пункт - 2', 'пункт - 3', 'пункт - 4'],
        Column_3: 'http://ссылка.ru',
        Column_4: new Date()
    },
    {
        state: 'warning',
        Column_1: false,
        Column_2: [1, 2, 3, 4, 5],
        Column_3: 'Не валидная ссылка',
        Column_4: new Date('1994-02-18')
    },
    {
        state: 'normal',
        Column_1: true,
        Column_2: ['пункт - 1', 'пункт - 2', 'пункт - 3', 'пункт - 4'],
        Column_3: 'https://google.com',
        Column_4: new Date('2021-02-05')
    },
    {
        state: 'danger',
        Column_1: false,
        Column_2: ['пункт - 1', 'пункт - 2', 'пункт - 3', 'пункт - 4', 'пункт - 5'],
        Column_3: 'Не валидная ссылка',
        Column_4: new Date('1999-08-19')
    },
    {
        Column_1: true,
        Column_2: ['пункт - 1', 'пункт - 2', 'пункт - 3', 'пункт - 4'],
        Column_3: 'http://ссылка.ru',
        Column_4: new Date()
    },
    {
        state: 'warning',
        Column_1: false,
        Column_2: [54, 23, 62, 34, 5, 4, 'Рандомные числа и строки', 'Пункт 43'],
        Column_3: 'Не валидная ссылка',
        Column_4: new Date('1994-02-18')
    },
    {
        state: 'normal',
        Column_1: true,
        Column_2: ['пункт - 1', 'пункт - 2', 'пункт - 3', 'пункт - 4'],
        Column_3: 'https://google.com',
        Column_4: new Date('2021-02-05')
    },
    {
        state: 'danger',
        Column_1: false,
        Column_2: ['пункт - 1', 'пункт - 2', 'пункт - 3', 'пункт - 4', 'пункт - 5'],
        Column_3: 'Не валидная ссылка',
        Column_4: new Date('1999-08-19')
    },
    {
        Column_1: true,
        Column_2: ['пункт - 1', 'пункт - 2', 'пункт - 3', 'пункт - 4'],
        Column_3: 'http://ссылка.ru',
        Column_4: new Date()
    },
]

const colsArr: Array<string> = [
    'Column_1', 'Column_2', 'Column_3', 'Column_4'
]



const App: React.FC = () => {
    const [nowTab, setNowTab] = useState<'tabOne' | 'tabTwo'>('tabOne')

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);



    const getMeTabContent = () => {
        switch (nowTab) {
            case 'tabTwo' : {
                return <CustomFlow
                    nodesChange={onNodesChange}
                    edgesChange={onEdgesChange}
                    data={{nodes, edges}}
                    onConnect={onConnect}
                    onChange={(changedFlow) => {}}
                />
            }
            case 'tabOne' : {
                return <CustomTable
                    items={itemsArr}
                    cols={colsArr}
                    pageSize={3}
                />
            }
            default :
                return null
        }
    }


    return (
        <div className={classes.App}>
            <div className={classes.background}/>

            <article className={classes.mainWrapper}>
                <section className={classes.main}>
                    <header className={classes.headerMain}>
                        <h1>Тестовое задание для Ростелеком.</h1>
                        <article className={classes.inputButton}>
                            <div className={classes.checkboxItem}>
                                <input
                                    type="radio"
                                    id={'tabOne'}
                                    name={'tabs'}
                                    checked={nowTab === 'tabOne'}
                                    onChange={(evt) => setNowTab('tabOne')}
                                />
                                <label htmlFor="tabOne">Задача 1</label>
                            </div>
                            <div className={classes.checkboxItem}>
                                <input
                                    type="radio"
                                    id={'tabTwo'}
                                    name={'tabs'}
                                    checked={nowTab === 'tabTwo'}
                                    onChange={(evt) => setNowTab('tabTwo')}
                                />
                                <label htmlFor="tabTwo">задача 2</label>
                            </div>
                        </article>
                    </header>
                    <main className={classes.mainContent}>
                        {getMeTabContent()}
                    </main>
                </section>
            </article>
        </div>
    )
}


export default App;
