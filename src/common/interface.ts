export interface IStockNews {
    link: string
    title: string
    originLink: string
    shortDescription: string
    createdDate: Date
    image: string
}
export interface INewsQueryInput {
    filter?: INewsFilterInput
    sort?: string
}

interface INewsFilterInput {
    from?: number
    size?: number
}

export interface IStockTradingHistoryFilter {
    limit: number
    page: number
}

export interface IStockTradingHistoryParams {
    tradingKey: string
    filter: IStockTradingHistoryFilter
}

export interface IStockInfo {
    _id: string,
    tradingKey: string,
    stock: string,
    action: string,
    status: string,
    tradingTax: number,
    totalStockTradeAmount: number,
    stockTradeAmount: number,
    stockTradePrice: number,
    stockTotalTradePrice: number,
    closingPrice: number,
    stockTotalClosingPrice: number,
    profitOrLostPercent: number,
    createdAt: Date,
    updatedAt: Date
}
