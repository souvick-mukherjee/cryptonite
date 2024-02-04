import { ethers } from 'ethers'
import address from '@/contracts/contractAddress.json'
import cryptoniteAbi from '@/artifacts/contracts/Cryptonite.sol/Cryptonite.json'
import { globalActions } from '@/store/globalSlices'
import { store } from '@/store'
import {
  EventParams,
  EventStruct,
  UserParams,
  UserStruct,
  DonorParams,
  SupportStruct,
} from '@/utils/type.dt'

const toWei = (num: number) => ethers.parseEther(num.toString())
const fromWei = (num: number) => ethers.formatEther(num)
const { setSupports, setCharity } = globalActions

let ethereum: any
let tx: any

if (typeof window !== 'undefined') ethereum = (window as any).ethereum

const getEthereumContracts = async () => {
  const accounts = await ethereum?.request?.({ method: 'eth_accounts' })

  if (accounts?.length > 0) {
    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner()
    const contracts = new ethers.Contract(address.cryptonite, cryptoniteAbi.abi, signer)

    return contracts
  } else {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
    const wallet = ethers.Wallet.createRandom()
    const signer = wallet.connect(provider)
    const contracts = new ethers.Contract(address.cryptonite, cryptoniteAbi.abi, signer)

    return contracts
  }
}

const getAdmin = async (): Promise<string> => {
  const contract = await getEthereumContracts()
  const owner = await contract.owner()
  return owner
}

const getEvents = async (): Promise<EventStruct[]> => {
  const contract = await getEthereumContracts()
  const myEvents = await contract.getEvents()
  return structuredEvents(myEvents)
}

const getMyEvents = async (): Promise<EventStruct[]> => {
  const contract = await getEthereumContracts()
  const events = await contract.getMyEvents()
  return structuredEvents(events)
}

const getEvent = async (id: string): Promise<EventStruct> => {
  const contract = await getEthereumContracts()
  const events = await contract.getEvent(id)
  return structuredEvents([events])[0]
}

// const getSupporters = async (id: number): Promise<SupportStruct[]> => {
//   const contract = await getEthereumContracts()
//   const supporters = await contract.getSupports(id)
//   return structuredSupporters(supporters)
// }

const createEvent = async (event: EventParams): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.createEvent(
      event.name,
      event.description,
      event.image,
      event.location,
      toWei(Number(event.amount))
    )
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const updateEvent = async (event: EventParams): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.updateCharity(
      event.id,
      event.name,
      event.description,
      event.image,
      toWei(Number(event.amount))
    )
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

// const makeDonation = async (donor: DonorParams): Promise<void> => {
//   if (!ethereum) {
//     reportError('Please install a browser provider')
//     return Promise.reject(new Error('Browser provider not installed'))
//   }

//   try {
//     const contract = await getEthereumContracts()
//     tx = await contract.donate(donor.id, donor.fullname, donor.comment, {
//       value: toWei(Number(donor.amount)),
//     })
//     await tx.wait()

//     const supports = await getSupporters(Number(donor.id))
//     store.dispatch(setSupports(supports))

//     const charity = await getCharity(Number(donor.id))
//     store.dispatch(setCharity(charity))

//     return Promise.resolve(tx)
//   } catch (error) {
//     reportError(error)
//     return Promise.reject(error)
//   }
// }

const deleteEvent = async (id: number): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.deleteEvent(id)
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const toggleEventStatus = async (id: number): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.toggleIsLive(id)
    await tx.wait()

    const event = await getEvent(Number(id))
    store.dispatch(setCharity(event))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const structuredEvents = (events: EventStruct[]):  [] =>
  events?.map((event) => ({
    id: Number(event.id),
    owner: event.owner,

    name: event.name,
    image: event.image,
    profile: event.profile,
    location: event.location,
    description: event.description,

    donations: Number(event.donations),
    raised: parseFloat(fromWei(event.raised)),
    amount: parseFloat(fromWei(event.amount)),

    deleted: event.deleted,
    banned: event.banned,
  }))

const createUser = async (user: UserParams): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.createUser(user.userName, user.email, user.phone)
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const updateUser = async (user: UserParams): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.updateUser(user.userName, user.email, user.phone)
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const getUser = async (id: number): Promise<UserStruct> => {
  const contract = await getEthereumContracts()
  const user = await contract.getUser(id)
  return UserStruct(user)
}

export {
  getEvents,
  getEvent,
  getMyEvents,
  createEvent,
  updateEvent,
  //   makeDonation,
  deleteEvent,
  toggleEventStatus,
  getAdmin,
}
