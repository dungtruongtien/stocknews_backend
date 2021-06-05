import mongoose from 'mongoose';

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
    query?: IStockNewsInputQuery
}

interface IStockNewsInputQuery {
    bool?: IStockNewsShouldFilter
}
interface IStockNewsShouldFilter {
    should?: [IStockNewsShouldFilterOptions]
}

interface IStockNewsShouldFilterOptions {
    match?: IStockNewsFilterFields
}

interface IStockNewsFilterFields {
    link?: string
    title?: string
    shortDescription?: string
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
    _id: string
    tradingKey: string
    stock: string
    action: string
    status: string
    tradingTax: number
    totalStockTradeAmount: number
    stockTradeAmount: number
    stockTradePrice: number
    stockTotalTradePrice: number
    closingPrice: number
    stockTotalClosingPrice: number
    profitPercent: number
    createdAt: Date
    updatedAt: Date
}

export interface IStockInfoModel extends mongoose.Document {
    _id: string
    tradingKey: string
    stock: string
    action: string
    status: string
    tradingTax: number
    totalStockTradeAmount: number
    stockTradeAmount: number
    stockTradePrice: number
    stockTotalTradePrice: number
    closingPrice: number
    stockTotalClosingPrice: number
    profitPercent: number
    createdAt: Date
    updatedAt: Date
}

export interface ICoinModel extends mongoose.Document {
    currentPrice: number
    profit: number
    name: string
    abbreviations: string
    costPrice: number
    totalCostPrice: number
}
export interface IPersonalPropertyModel extends mongoose.Document {
    price: number
    date: string
    financialPlanning: IFinancialPlanning
}

export interface IPersonalProperty {
    id: string
    price: number
    date: any
    financialPlanning: IFinancialPlanning
}

interface IFinancialPlanning {
    targetPercent: number
    targetPrice: number
    actualResultMonthPercent: number
}


export interface IStockTradingSessionInput {
    filter: IStockTradingSessionFilterInput
  }

export interface IStockTradingSessionFilterInput {
    limit: number
    page: number
  }


export interface IPersonalPropertyQueryInput {
    filter: IPersonalPropertyFilterInput
  }

export interface IPersonalPropertyFilterInput {
    aggType: string
}
