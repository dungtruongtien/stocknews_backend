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
    investDate: Date
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
    investDate: Date
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
    closingPrice: number
    maximumBudget: number
    availabelBudget: number
    action: number
    tradingAmount: number
    tradingQuantity: number
    tradingPrice: number
    tradingTax: number
    tradingFee: number
    profitAmount: number
    profitPercent: number
    totalProfitAmount: number
    totalTradingQuantity: number
    totalCapital: number
    averageStockPrice: number
    createdAt?: Date
    updatedAt?: Date
}

export interface ICreateStockTradingItemInput {
    tradingKey: string
    closingPrice: number
    maximumBudget: number
    availabelBudget: number
    action: string
    tradingAmount: number
    tradingQuantity: number
    tradingPrice: number
    tradingTax: number
    tradingFee: number
    profitAmount: number
    profitPercent: number
    totalTradingQuantity: number
    totalCapital: number
    totalProfitAmount: number
    averageStockPrice: number
    createdAt?: Date
    updatedAt?: Date
}

export interface APIServiceResp {
    status: number
    message?: string
    data?: any
    total?: number
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
