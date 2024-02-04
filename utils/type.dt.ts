export interface TruncateParams {
  text: string
  startChars: number
  endChars: number
  maxLength: number
}

export interface DonorParams {
  id?: number
  comment: string
  fullname: string
  amount: number | string
}

export interface EventParams {
  id?: number
  name: string
  amount: number | string
  description: string
  image: string
  location: string
}

export interface UserParams {
  id?: number
  userName: string
  email: string
  phone: string
}

export interface EventStruct {
  id: number
  image: string
  name: string
  profile: string
  description: string
  location: string
  donations: number
  raised: number
  amount: number
  owner: string
  deleted: boolean
  banned: boolean
}

export interface UserStruct {
  id: number
  owner: string
  userName: string
  email: string
  phone: string
}

export interface SupportStruct {
  id: number
  cid: number
  fullname: string
  amount: number
  timestamp: number
  comment: string
  supporter: string
}

export interface GlobalState {
  charities: CharityStruct[]
  charity: CharityStruct | null
  supports: SupportStruct[]
  deleteModal: string
  donorsModal: string
  supportModal: string
  banModal: string
  owner: string
}

export interface RootState {
  globalStates: GlobalState
}
