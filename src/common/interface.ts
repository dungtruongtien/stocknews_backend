export interface IStockNews {
    link: string
    title: string
    originLink: string
    shortDescription: string
    createdDate: Date
    image: string
}
export interface INewsQueryInput {
    from?: number
    size?: number
}

export interface IStockTradingHistoryOptions {
    limit: number
    page: number
}

export interface IStockTradingHistoryParams {
    tradingKey: string
    options: IStockTradingHistoryOptions
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
