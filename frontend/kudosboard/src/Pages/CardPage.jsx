import Banner from "../components/Banner"
import Header from "../components/Header"
import Footer from "../components/Footer"
import KudoCard from "../components/KudoCard"
import { useParams } from 'react-router-dom';

const CardPage = () => {
    const { boardId } = useParams();
    return (
        <div>
            <Header />
            <Banner />
            <KudoCard boardId={boardId}/>
            <Footer />
        </div>
    )
}

export default CardPage