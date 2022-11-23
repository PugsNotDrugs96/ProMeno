import React from "react";
import { CDBFooter, CDBFooterLink, CDBBox } from 'cdbreact';
import UserContext from "./../../UserContext";
import { useContext } from "react";



function Footer ()  {
   // const { user, setUser } = useContext(UserContext);

    return (
        <CDBFooter className="shadow">
        <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '90%' }}>
            <CDBBox display="flex" justifyContent="between" className="flex-wrap">
                <CDBBox>
                    <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                    ProMeno
                    </p>
                    <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
                    <CDBFooterLink href="/">Om oss</CDBFooterLink>
                    <CDBFooterLink href="/">Kontakta</CDBFooterLink>
                    <CDBFooterLink href="/">Blog</CDBFooterLink>
                    </CDBBox>
                    </CDBBox>
                <CDBBox>
                    <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                    Hjälp
                    </p>
                    <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
                    <CDBFooterLink href="/">Support</CDBFooterLink>
                    </CDBBox>
                </CDBBox>
            </CDBBox>
            <small className="text-center mt-5">&copy; ProMeno, 2022. All rights reserved.</small>
        </CDBBox>
        </CDBFooter>
    );
};
export default Footer();