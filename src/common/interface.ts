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

export interface IStockTradingParams {
    filter: IStockTradingFilter
    offset: number
    limit: number
}

export interface IStockTradingItemParams {
    filter: IStockTradingItemFilter
    offset: number
    limit: number
}

export interface ICreateStockTradingInput {
    _id: mongoose.Types.ObjectId
    tradingKey: string
    stockName: string
    status: string
    totalQuantity: number
    totalAmount: number
    investDate: Date
    profitPercent?: number
    averageStockPrice?: number
}

export interface ICreateStockTradingItemInput {
    _id: mongoose.Types.ObjectId
    tradingKey: string
    action: string
    tradingTax: number
    tradingAmount: number
    tradingQuantity: number
    closingPrice: number 
}


export interface ICreateStockTradingAgrs {
    input: ICreateStockTradingInput
}

export interface ICreateStockTradingItemAgrs {
    input: ICreateStockTradingItemInput
}

export interface IStockTradingItemFilter {
    tradingKey: string
}

export interface IStockTradingFilter {
}

export interface IStockTradingItemFilter {
    limit: number
    offset: number
}


export interface IStockTradingModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId
    tradingKey: string
    stockName: string
    status: string
    totalQuantity: number
    totalAmount: number
    investDate: Date
    profitPercent?: number
    averageStockPrice?: number
    createdAt?: Date
    updatedAt?: Date
}

export interface IIdGenModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId
    value: number
}


export interface IStockTradingItemModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId
    tradingKey: string
    action: string
    tradingTax: number
    tradingAmount: number
    tradingQuantity: number
    closingPrice: number
    createdAt?: Date
    updatedAt?: Date
}

export interface APIServiceResp {
    statusCode: number
    pageInfo?: PageInfo
    message?: string
    data?: any
    errorCode?: string
}

export interface IDBContext {
    StockTradingModel: mongoose.Model<IStockTradingModel>
    StockTradingItemModel: mongoose.Model<IStockTradingItemModel>
    IdGen: mongoose.Model<IIdGenModel>
}

export interface IContext {
    db: IDBContext
}

interface PageInfo {
    total: number
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
    offset: number
  }


export interface IPersonalPropertyQueryInput {
    filter: IPersonalPropertyFilterInput
  }

export interface IPersonalPropertyFilterInput {
    aggType: string
}
