import React, {useLayoutEffect, useState} from "react";
import classes from './CustomTable.module.scss'

type TItemState = 'danger' | 'warning' | 'normal'

export type TItem = {
    state?: TItemState
} & { [key: string]: string | boolean | TItemState | Date | Array<string | number> }

interface IComponentProps {
    pageSize: number,
    items: Array<TItem>,
    cols: Array<string>

}

const getMeValidateDate = (date: string) => {
    return date.split('.').reverse().join('-')
}


const CustomTable: React.FC<IComponentProps> = (props) => {

    const [start, setStart] = useState(0)
    const [nowPage, setNowPage] = useState(0)
    const [sizePage, setSizePage] = useState(0)

    useLayoutEffect(() => {
        setSizePage(Math.ceil(props.items.length / props.pageSize))
    }, [])



    const paginationHandler = (forward: boolean) => {
        if (forward) {
            setStart(prev => prev + props.pageSize)
            setNowPage(prev => prev + 1)
            return

        }

        setStart(prev => prev - props.pageSize)
        setNowPage(prev => prev - 1)
        return

    }

    const getMeValue = (rowElement: string | boolean | "danger" | "warning" | "normal" | Date | Array<string | number>) => {
        if (typeof rowElement === 'string') {
            if (rowElement.includes('http')) {
                return <a href={rowElement} target={'_blank'}>{rowElement}</a>
            }
            return rowElement
        }
        if (Object.prototype.toString.call(rowElement) === '[object Date]') {
            return getMeValidateDate(new Date(rowElement.toString()).toLocaleDateString())
        }
        if (Array.isArray(rowElement)) {
            return (
                <ul>
                    {rowElement.map((liItem, liIndex) => (
                        <li key={liIndex}>
                            {liItem.toString()}
                        </li>
                    ))}
                </ul>
            )
        }
        if (typeof rowElement === 'boolean') {
            return rowElement ? '☑ ' : '☐ '
        }

    }

    const getMeColor = (state: TItemState | '') => {
        switch (state) {
            case 'danger' : {
                return 'red'
            }
            case 'warning' : {
                return 'yellow'
            }
            case 'normal' : {
                return 'green'
            }

            default :
                return ''
        }
    }


    return (
        <div className={classes.CustomTable}>
            <article className={classes.tableWrapper}>
                <table>
                    <thead>
                    <tr>
                        {props.cols.map((col, indexCol) => (
                            <th key={indexCol}>
                                {col}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {sizePage !== 0 && props.items.slice((start), start + props.pageSize).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {props.cols.map((col, colIndex) => (
                                <td key={colIndex} style={{borderBottomColor: getMeColor(row.state || '')}}>
                                    {getMeValue(row[col])}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </article>
            <article className={classes.btnPagination}>
                <button style={{opacity: nowPage <= 0 ? '0.3' : ''}}
                        onClick={() => nowPage !== 0 && paginationHandler(false)}
                >
                    Назад
                </button>
                <button style={{opacity: nowPage === sizePage - 1 ? '0.3' : ''}}
                        onClick={() => nowPage !== sizePage - 1 && paginationHandler(true)}
                >
                    Вперед
                </button>
            </article>
        </div>
    )
}

export default CustomTable