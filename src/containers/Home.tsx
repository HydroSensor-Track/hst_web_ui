import {HomeButton, HomeContainer, HomeText} from "../styled-components/Home.tsx";
import {useTranslation} from "react-i18next";
import {RootState} from "../redux/store.ts";
import {useSelector} from "react-redux";

const Home = () => {

    const {t} = useTranslation();
    const isAuthenticatedState = useSelector((state: RootState) => state.auth.isAuthenticated);
    return (
        <HomeContainer>
            <HomeText>{t('homeTitle')}</HomeText>
            <HomeButton onClick={() => isAuthenticatedState ? console.log('Yes'): console.log('No')}>Am I logged in ?</HomeButton>
        </HomeContainer>
    );
};

export default Home;