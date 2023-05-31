import styled from 'styled-components';

import Navbar from './Navbar'
import DashboardProfile from './DashboardProfile'


const Wrapper = styled.div`
padding: 4em;
`;

function DashboardMain({children}) {
    return (
    <Wrapper>
        <Navbar />
        <DashboardProfile />
        {children}
    </Wrapper>
    )
}

export default DashboardMain
