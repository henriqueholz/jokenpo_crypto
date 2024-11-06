import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import { doLogin, doLogout } from '../services/Web3Service';

function Header() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem("account") !== null) {
                if (localStorage.getItem("isAdmin") === "true") {
                    doLogin()
                        .then(result => {
                            if (!result.isAdmin) {
                                localStorage.setItem("isAdmin", "false");
                                router.push("/app");
                            }
                        })
                        .catch(err => {
                            console.error(err);
                            onLogoutClick();
                        });
                } else {
                    router.push("/app");
                }
            } else {
                router.push("/");
            }
        }
    }, []);

    function onLogoutClick() {
        doLogout();
        router.push("/");
    }

    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4">
            <a href="/app" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-light text-decoration-none">
                <span className="fs-4">Dapp JoKenPo</span>
            </a>

            <div className="col-md-3 text-end">
                <button type="button" className="btn btn-outline-danger me-2" onClick={onLogoutClick}>Logout</button>
            </div>
        </header>
    );
}

export default Header;
