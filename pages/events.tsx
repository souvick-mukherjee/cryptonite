import Cards from "@/components/Cards";
import { generateCharities } from '@/utils/fakeData'
import { CharityStruct } from '@/utils/type.dt'
import { NextPage } from 'next'

const Events: NextPage<{ charitiesData: CharityStruct[] }> = ({ charitiesData }) => {
    return (
        <div>
            <Cards charities={charitiesData} />
        </div>
    );
};
export const getServerSideProps = async () => {
    const charitiesData: CharityStruct[] = generateCharities(15)
    return {
      props: { charitiesData: JSON.parse(JSON.stringify(charitiesData)) },
    }
  }
export default Events;